const fs = require("fs");
const path = require("path");

const REPO_PRIMARY_PATH = path.join(process.cwd(), "repo_primary");
const OUT_PATH = path.join(process.cwd(), "public", "devices-index.json");
const PRIMARY_REPO_OWNER = "DerpFest-AOSP";
const PRIMARY_REPO_NAME = "Updater-Stuff";
const PRIMARY_REPO_BRANCH = "master";

function readJsonSafe(p) {
  try {
    return JSON.parse(fs.readFileSync(p, "utf8") || "{}");
  } catch {
    return {};
  }
}

function walkDir(dir) {
  const results = [];
  if (!fs.existsSync(dir)) return results;
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      results.push(...walkDir(full));
    } else if (e.isFile()) {
      results.push(full);
    }
  }
  return results;
}

function pickLatestFromParsed(parsed) {
  if (!parsed) return null;
  if (Array.isArray(parsed.response) && parsed.response.length) {
    return parsed.response.reduce((a, b) => ((b.datetime || 0) > (a.datetime || 0) ? b : a), parsed.response[0]);
  }
  return parsed;
}

function normalizeAliases(aliasRaw, codename) {
  if (!aliasRaw) return [codename];
  if (Array.isArray(aliasRaw)) return aliasRaw.map(s => String(s).trim()).filter(Boolean);
  if (typeof aliasRaw === "string") {
    return aliasRaw.split(/[\/,]+/).map(s => s.trim()).filter(Boolean);
  }
  return [String(aliasRaw)];
}

function ensureDir(p) {
  const dir = path.dirname(p);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function buildChangelogRawUrl(codename) {
  return `https://raw.githubusercontent.com/${PRIMARY_REPO_OWNER}/${PRIMARY_REPO_NAME}/${PRIMARY_REPO_BRANCH}/changelog_${codename}.txt`;
}

function main() {
  const codenamePath = path.join(REPO_PRIMARY_PATH, "codename.json");
  const maintPath1 = path.join(REPO_PRIMARY_PATH, "maintainer.json");
  const maintPath2 = path.join(REPO_PRIMARY_PATH, "maintainers.json");

  const codenameMap = fs.existsSync(codenamePath) ? readJsonSafe(codenamePath) : {};
  const maint1 = fs.existsSync(maintPath1) ? readJsonSafe(maintPath1) : {};
  const maint2 = fs.existsSync(maintPath2) ? readJsonSafe(maintPath2) : {};
  const maintMap = Object.assign({}, maint1, maint2);

  const files = walkDir(REPO_PRIMARY_PATH);
  const jsonFiles = files.filter(f => f.toLowerCase().endsWith(".json"));

  const devicesMap = {}; // codename -> array of parsed entries (from different folders if any)

  for (const f of jsonFiles) {
    const name = path.basename(f);
    const lower = name.toLowerCase();
    if (["codename.json", "maintainer.json", "maintainers.json"].includes(lower)) continue;
    const codename = name.replace(/\.json$/i, "");
    try {
      const parsedRaw = readJsonSafe(f);
      const latest = pickLatestFromParsed(parsedRaw);
      if (!latest) continue;
      if (!devicesMap[codename]) devicesMap[codename] = [];
      devicesMap[codename].push({ sourceFile: f, latest });
    } catch {}
  }

  const devices = [];

  for (const [codename, entries] of Object.entries(devicesMap)) {
    let best = null;
    for (const e of entries) {
      const cand = e.latest;
      if (!best || (cand.datetime || 0) > (best.datetime || 0)) best = cand;
    }
    if (!best) continue;
    const aliasRaw = codenameMap[codename] || codename;
    const aliases = normalizeAliases(aliasRaw, codename);
    const displayName = aliases[0] || codename;
    const maint = maintMap[codename] || "Unknown";
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
      changelog_raw_url: buildChangelogRawUrl(codename)
    });
  }

  devices.sort((a, b) => a.displayName.localeCompare(b.displayName, undefined, { sensitivity: "base" }));

  const out = {
    generated_at: new Date().toISOString(),
    repo: `${PRIMARY_REPO_OWNER}/${PRIMARY_REPO_NAME}@${PRIMARY_REPO_BRANCH}`,
    devices
  };

  ensureDir(OUT_PATH);
  fs.writeFileSync(OUT_PATH, JSON.stringify(out, null, 2), "utf8");
  console.log(`Wrote ${OUT_PATH} with ${devices.length} devices`);
}

main();
