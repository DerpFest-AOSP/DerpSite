const fs = require("fs");
const path = require("path");

const PRIMARY_REPO_OWNER = "DerpFest-AOSP";
const PRIMARY_REPO_NAME = "Updater-Stuff";
const PRIMARY_REPO_BRANCH = "master";
const OUT_ACTIVE       = path.join(process.cwd(), "public", "active-devices.json");
const OUT_DISCONTINUED = path.join(process.cwd(), "public", "discontinued-devices.json");
const REPO_MAP_FILE    = path.join(process.cwd(), "repo_map.json");
const OVERRIDE_FILE    = path.join(process.cwd(), "public", "devices-override.json");

const DEVICE_INFO_SUBPATH = path.join("info", "device-info.json");

function readJsonSafe(p) {
  try { return JSON.parse(fs.readFileSync(p, "utf8") || "{}"); } catch { return {}; }
}

function writeJsonSafe(p, obj) {
  try { fs.writeFileSync(p, JSON.stringify(obj, null, 2), "utf8"); } catch (e) { /* ignore */ }
}

function walkDir(dir) {
  if (!fs.existsSync(dir)) return [];
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) results.push(...walkDir(full));
    else if (e.isFile()) results.push(full);
  }
  return results;
}

function pickLatest(parsed) {
  if (!parsed) return null;
  if (Array.isArray(parsed.response) && parsed.response.length) {
    return parsed.response.reduce((a, b) => ((b.datetime || 0) > (a.datetime || 0) ? b : a), parsed.response[0]);
  }
  return parsed;
}

// Strip leading "v" or "V" from version strings
function normalizeVersion(raw) {
  if (!raw) return raw;
  return String(raw).replace(/^[vV]/, "");
}

// "POCO F3 / Xiaomi Mi 11X / Redmi K40"
function normalizeAliases(nameRaw, codename) {
  if (!nameRaw) return [codename];
  if (Array.isArray(nameRaw)) return nameRaw.map(s => String(s).trim()).filter(Boolean);
  if (typeof nameRaw === "string") return nameRaw.split(/\s*\/\s*|,\s*/).map(s => s.trim()).filter(Boolean);
  return [String(nameRaw)];
}

// "Poco/Xiaomi/Redmi" -> ["Poco", "Xiaomi", "Redmi"]
function normalizeOem(oemRaw) {
  if (!oemRaw) return [];
  if (Array.isArray(oemRaw)) return oemRaw.map(s => String(s).trim()).filter(Boolean);
  return String(oemRaw).split("/").map(s => s.trim()).filter(Boolean);
}

function ensureDir(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function rawUrlForChangelog(owner, repo, branch, relPath) {
  return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${relPath}`;
}

function detectRepoFolders() {
  return fs.readdirSync(process.cwd(), { withFileTypes: true })
    .filter(d => d.isDirectory() && d.name.startsWith("repo_"))
    .map(d => ({ name: d.name, full: path.join(process.cwd(), d.name) }));
}

function loadRepoMap() {
  if (!fs.existsSync(REPO_MAP_FILE)) return null;
  const raw = readJsonSafe(REPO_MAP_FILE);
  if (!Array.isArray(raw)) return null;
  const map = {};
  for (const ent of raw) {
    const folder = ent.path || ent.folder || ent.pathname;
    if (!folder) continue;
    const base = path.basename(folder);
    map[base] = {
      folderName: base,
      path: path.join(process.cwd(), folder),
      owner: ent.owner || ent.repo_owner || ent.owner_name || null,
      repo:  ent.repo  || ent.name       || null,
      branch: ent.branch || ent.ref || "master"
    };
  }
  return map;
}

function findFileAtSameFolder(filePath, targetFilename) {
  const candidate = path.join(path.dirname(filePath), targetFilename);
  return fs.existsSync(candidate) ? candidate : null;
}

function findFileAnywhere(repoRoot, targetFilename) {
  const found = walkDir(repoRoot).find(f => path.basename(f).toLowerCase() === targetFilename.toLowerCase());
  return found || null;
}

function collectOems(deviceList) {
  const s = new Set();
  deviceList.forEach(d => (d.oem || []).forEach(o => s.add(o)));
  return Array.from(s).sort();
}

// Load devices-override.json
function loadOverrides() {
  const overrideMap = new Map();
  if (!fs.existsSync(OVERRIDE_FILE)) return overrideMap;
  const raw = readJsonSafe(OVERRIDE_FILE);
  if (!Array.isArray(raw)) return overrideMap;
  for (const entry of raw) {
    if (!entry.codename) continue;
    overrideMap.set(entry.codename, {
      latest: entry.latest ?? null,
      changelog_raw_url: entry.changelog_raw_url ?? null,
    });
  }
  return overrideMap;
}

// Apply override entries on top of the built device list.
// Devices in the override that have no matching built entry are ignored.
function applyOverrides(devices, overrideMap) {
  return devices.map(device => {
    const ov = overrideMap.get(device.codename);
    if (!ov) return device;

    const overriddenLatest = ov.latest
      ? {
          filename: ov.latest.filename || device.latest.filename || "",
          id:       ov.latest.id       || device.latest.id       || "",
          romtype:  ov.latest.romtype  || device.latest.romtype  || "",
          size:     ov.latest.size     || device.latest.size     || 0,
          url:      ov.latest.url      ?? device.latest.url,
          version:  normalizeVersion(ov.latest.version ?? device.latest.version),
          datetime: ov.latest.datetime !== undefined ? ov.latest.datetime : device.latest.datetime,
        }
      : device.latest;

    return {
      ...device,
      latest: overriddenLatest,
      changelog_raw_url: ov.changelog_raw_url ?? device.changelog_raw_url,
    };
  });
}

function build() {
  const repoMap = loadRepoMap();
  const repoFolders = detectRepoFolders();
  const repoDescriptors = repoFolders.map(r => {
    const base = path.basename(r.full);
    if (repoMap && repoMap[base]) {
      return {
        folderName: base,
        path: repoMap[base].path,
        owner: repoMap[base].owner,
        repo:  repoMap[base].repo,
        branch: repoMap[base].branch
      };
    }
    return { folderName: base, path: r.full, owner: null, repo: null, branch: null };
  });

  if (repoDescriptors.length === 0) {
    console.error("No repo_* folders found. Ensure workflow checks out repos with path: repo_<n>.");
    process.exit(1);
  }

  let primaryDescriptor = repoDescriptors.find(d => d.folderName === "repo_primary");
  if (!primaryDescriptor) primaryDescriptor = repoDescriptors[0];

  const primaryPath = primaryDescriptor.path;

  // device-info.json is the master list — every codename here will appear in output
  const deviceInfoPath = path.join(primaryPath, DEVICE_INFO_SUBPATH);
  const deviceInfoRaw  = fs.existsSync(deviceInfoPath) ? readJsonSafe(deviceInfoPath) : {};
  const deviceInfoMap  = {};
  if (Array.isArray(deviceInfoRaw.devices)) {
    for (const d of deviceInfoRaw.devices) {
      if (d.codename) deviceInfoMap[d.codename] = d;
    }
  }

  const codenameMap = fs.existsSync(path.join(primaryPath, "codename.json"))
    ? readJsonSafe(path.join(primaryPath, "codename.json")) : {};
  const maintMap = Object.assign(
    {},
    fs.existsSync(path.join(primaryPath, "maintainer.json"))  ? readJsonSafe(path.join(primaryPath, "maintainer.json"))  : {},
    fs.existsSync(path.join(primaryPath, "maintainers.json")) ? readJsonSafe(path.join(primaryPath, "maintainers.json")) : {}
  );

  const SKIP_FILES = new Set(["codename.json", "maintainer.json", "maintainers.json", "device-info.json"]);

  // Scan all repo JSON files and bucket them by codename
  const devicesMap = {};

  for (const repo of repoDescriptors) {
    const jsonFiles = walkDir(repo.path).filter(f => f.toLowerCase().endsWith(".json"));
    for (const filePath of jsonFiles) {
      const name = path.basename(filePath);
      if (SKIP_FILES.has(name.toLowerCase())) continue;
      const codename  = name.replace(/\.json$/i, "");
      const parsedRaw = readJsonSafe(filePath);
      const latest    = pickLatest(parsedRaw);
      if (!latest) continue;
      if (!devicesMap[codename]) devicesMap[codename] = [];
      devicesMap[codename].push({ latest, repo, filePath });
    }
  }

  for (const codename of Object.keys(deviceInfoMap)) {
    if (!devicesMap[codename]) {
      devicesMap[codename] = [];
    }
  }

  const devices = [];

  for (const [codename, entries] of Object.entries(devicesMap)) {
    // Pick the entry with the newest datetime across all repos
    let best = null;
    let bestEntry = null;
    for (const e of entries) {
      const cand = e.latest;
      if (!best || (cand.datetime || 0) > (best.datetime || 0)) {
        best = cand;
        bestEntry = e;
      }
    }

    const info         = deviceInfoMap[codename] || {};
    const rawName      = info.device_name || codenameMap[codename] || codename;
    const aliases      = normalizeAliases(rawName, codename);
    const maint        = info.maintainer  || maintMap[codename] || "Unknown";
    const oem          = normalizeOem(info.oem);
    const supportGroup = info.support_group || null;
    const status       = info.status || "Active";

    // Try to find changelog
    const fname = `changelog_${codename}.txt`;
    let changelogRaw = null;

    if (bestEntry) {
      const sameFolder = findFileAtSameFolder(bestEntry.filePath, fname);
      if (sameFolder) {
        const rel    = path.relative(bestEntry.repo.path, sameFolder).split(path.sep).join("/");
        const owner  = bestEntry.repo.owner  || primaryDescriptor.owner;
        const repo   = bestEntry.repo.repo   || primaryDescriptor.repo;
        const branch = bestEntry.repo.branch || primaryDescriptor.branch || "master";
        if (owner && repo) changelogRaw = rawUrlForChangelog(owner, repo, branch, rel);
      }
    }

    if (!changelogRaw) {
      for (const repo of repoDescriptors) {
        const foundAny = findFileAnywhere(repo.path, fname);
        if (foundAny) {
          const rel      = path.relative(repo.path, foundAny).split(path.sep).join("/");
          const owner    = repo.owner    || primaryDescriptor.owner;
          const repoName = repo.repo     || primaryDescriptor.repo;
          const branch   = repo.branch   || primaryDescriptor.branch || "master";
          if (owner && repoName) changelogRaw = rawUrlForChangelog(owner, repoName, branch, rel);
          break;
        }
      }
    }

    devices.push({
      codename,
      aliases,
      oem,
      maintainer: maint,
      support_group: supportGroup,
      status,
      latest: {
        filename: best?.filename || "",
        id:       best?.id       || "",
        romtype:  best?.romtype  || "",
        size:     best?.size     || 0,
        url:      best?.url      || null,
        version:  normalizeVersion(best?.version || ""),
        datetime: best?.datetime || null
      },
      changelog_raw_url: changelogRaw || null,
      sources: entries.map(e => ({ repoFolder: e.repo.folderName, filePath: path.relative(process.cwd(), e.filePath) }))
    });
  }

  devices.sort((a, b) => (a.aliases[0] || a.codename).localeCompare(b.aliases[0] || b.codename, undefined, { sensitivity: "base" }));

  // Load overrides and apply them on top
  const overrideMap = loadOverrides();
  const devicesWithOverrides = applyOverrides(devices, overrideMap);

  const activeDevices       = devicesWithOverrides.filter(d => (d.status || "Active") === "Active");
  const discontinuedDevices = devicesWithOverrides.filter(d => d.status === "Discontinued");

  const meta = {
    generated_at: new Date().toISOString(),
    primary_repo:   `${PRIMARY_REPO_OWNER}/${PRIMARY_REPO_NAME}@${PRIMARY_REPO_BRANCH}`,
    detected_repos: repoDescriptors.map(r => ({ folder: r.folderName, owner: r.owner, repo: r.repo, branch: r.branch }))
  };

  ensureDir(OUT_ACTIVE);
  writeJsonSafe(OUT_ACTIVE, {
    ...meta,
    oems: collectOems(activeDevices),
    devices: activeDevices
  });

  ensureDir(OUT_DISCONTINUED);
  writeJsonSafe(OUT_DISCONTINUED, {
    ...meta,
    oems: collectOems(discontinuedDevices),
    devices: discontinuedDevices
  });

  const noRepoFile = Object.keys(deviceInfoMap).filter(c => !devicesMap[c] || devicesMap[c].length === 0);
  console.log(`Wrote active-devices.json (${activeDevices.length}) and discontinued-devices.json (${discontinuedDevices.length})`);
  if (noRepoFile.length > 0) {
    console.log(`Devices with no repo file (override-only): ${noRepoFile.join(", ")}`);
  }
  if (overrideMap.size > 0) {
    console.log(`Applied overrides for: ${Array.from(overrideMap.keys()).join(", ")}`);
  }
}

build();
