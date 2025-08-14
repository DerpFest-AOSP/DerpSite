const fs = require("fs");
const path = require("path");

const PRIMARY_REPO_OWNER = "DerpFest-AOSP";
const PRIMARY_REPO_NAME = "Updater-Stuff";
const PRIMARY_REPO_BRANCH = "master";
const OUT_PATH = path.join(process.cwd(), "public", "devices-index.json");
const REPO_MAP_FILE = path.join(process.cwd(), "repo_map.json");

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
    return parsed.response.reduce((a,b) => ((b.datetime||0) > (a.datetime||0) ? b : a), parsed.response[0]);
  }
  return parsed;
}

function normalizeAliases(aliasRaw, codename) {
  if (!aliasRaw) return [codename];
  if (Array.isArray(aliasRaw)) return aliasRaw.map(s => String(s).trim()).filter(Boolean);
  if (typeof aliasRaw === "string") return aliasRaw.split(/[\/,]+/).map(s => s.trim()).filter(Boolean);
  return [String(aliasRaw)];
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
      repo: ent.repo || ent.name || null,
      branch: ent.branch || ent.ref || "master"
    };
  }
  return map;
}

function findFileAtSameFolder(filePath, targetFilename) {
  const dir = path.dirname(filePath);
  const candidate = path.join(dir, targetFilename);
  if (fs.existsSync(candidate)) return candidate;
  return null;
}

function findFileAnywhere(repoRoot, targetFilename) {
  const all = walkDir(repoRoot);
  const found = all.find(f => path.basename(f).toLowerCase() === targetFilename.toLowerCase());
  return found || null;
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
        repo: repoMap[base].repo,
        branch: repoMap[base].branch
      };
    }
    return { folderName: base, path: r.full, owner: null, repo: null, branch: null };
  });

  if (repoDescriptors.length === 0) {
    console.error("No repo_* folders found. Ensure workflow checks out repos with path: repo_<name>.");
    process.exit(1);
  }

  let primaryDescriptor = repoDescriptors.find(d => d.folderName === "repo_primary");
  if (!primaryDescriptor) primaryDescriptor = repoDescriptors[0];

  const primaryPath = primaryDescriptor.path;
  const codenamePath = path.join(primaryPath, "codename.json");
  const codenameMap = fs.existsSync(codenamePath) ? readJsonSafe(codenamePath) : {};
  const maint1 = path.join(primaryPath, "maintainer.json");
  const maint2 = path.join(primaryPath, "maintainers.json");
  const maintMap1 = fs.existsSync(maint1) ? readJsonSafe(maint1) : {};
  const maintMap2 = fs.existsSync(maint2) ? readJsonSafe(maint2) : {};
  const maintMap = Object.assign({}, maintMap1, maintMap2);

  const devicesMap = {};

  for (const repo of repoDescriptors) {
    const jsonFiles = walkDir(repo.path).filter(f => f.toLowerCase().endsWith(".json"));
    for (const filePath of jsonFiles) {
      const name = path.basename(filePath);
      const lower = name.toLowerCase();
      if (["codename.json","maintainer.json","maintainers.json"].includes(lower)) continue;
      const codename = name.replace(/\.json$/i, "");
      const parsedRaw = readJsonSafe(filePath);
      const latest = pickLatest(parsedRaw);
      if (!latest) continue;
      if (!devicesMap[codename]) devicesMap[codename] = [];
      devicesMap[codename].push({
        latest,
        repo,
        filePath
      });
    }
  }

  const devices = [];

  for (const [codename, entries] of Object.entries(devicesMap)) {
    let best = null;
    let bestEntry = null;
    for (const e of entries) {
      const cand = e.latest;
      if (!best || (cand.datetime || 0) > (best.datetime || 0)) {
        best = cand;
        bestEntry = e;
      }
    }
    if (!best) continue;
    const aliasRaw = codenameMap[codename] || codename;
    const aliases = normalizeAliases(aliasRaw, codename);
    const displayName = aliases[0] || codename;
    const maint = maintMap[codename] || "Unknown";

    const fname = `changelog_${codename}.txt`;
    let changelogRaw = null;

    const sameFolder = findFileAtSameFolder(bestEntry.filePath, fname);
    if (sameFolder) {
      const rel = path.relative(bestEntry.repo.path, sameFolder).split(path.sep).join("/");
      if (bestEntry.repo.owner && bestEntry.repo.repo) {
        changelogRaw = rawUrlForChangelog(bestEntry.repo.owner, bestEntry.repo.repo, bestEntry.repo.branch || "master", rel);
      } else if (primaryDescriptor && primaryDescriptor.owner && primaryDescriptor.repo) {
        changelogRaw = rawUrlForChangelog(primaryDescriptor.owner, primaryDescriptor.repo, primaryDescriptor.branch || "master", rel);
      } else {
        changelogRaw = null;
      }
    } else {
      for (const repo of repoDescriptors) {
        const foundAny = findFileAnywhere(repo.path, fname);
        if (foundAny) {
          const rel = path.relative(repo.path, foundAny).split(path.sep).join("/");
          if (repo.owner && repo.repo) {
            changelogRaw = rawUrlForChangelog(repo.owner, repo.repo, repo.branch || "master", rel);
          } else if (primaryDescriptor && primaryDescriptor.owner && primaryDescriptor.repo) {
            changelogRaw = rawUrlForChangelog(primaryDescriptor.owner, primaryDescriptor.repo, primaryDescriptor.branch || "master", rel);
          } else {
            changelogRaw = null;
          }
          break;
        }
      }
    }

    devices.push({
      codename,
      aliases,
      displayName,
      maintainer: maint,
      latest: {
        filename: best.filename || "",
        id: best.id || "",
        romtype: best.romtype || "",
        size: best.size || 0,
        url: best.url || "",
        version: best.version || "",
        datetime: best.datetime || 0
      },
      changelog_raw_url: changelogRaw || null,
      sources: entries.map(e => ({ repoFolder: e.repo.folderName, filePath: path.relative(process.cwd(), e.filePath) }))
    });
  }

  devices.sort((a,b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: "base" }));

  ensureDir(OUT_PATH);
  writeJsonSafe(OUT_PATH, {
    generated_at: new Date().toISOString(),
    primary_repo: `${PRIMARY_REPO_OWNER}/${PRIMARY_REPO_NAME}@${PRIMARY_REPO_BRANCH}`,
    detected_repos: repoDescriptors.map(r => ({ folder: r.folderName, owner: r.owner, repo: r.repo, branch: r.branch })),
    devices
  });

  console.log(`Wrote ${OUT_PATH} with ${devices.length} devices (repos: ${repoDescriptors.map(r=>r.folderName).join(", ")})`);
}

build();