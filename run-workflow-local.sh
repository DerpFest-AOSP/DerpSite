#!/usr/bin/env bash
# run-workflow-local.sh — Simulate GitHub Actions workflows locally
# Usage:
#   ./run-workflow-local.sh                        (interactive menu)
#   ./run-workflow-local.sh build-devices-index    (run specific workflow)
#   ./run-workflow-local.sh deploy                 (run specific workflow)

set -euo pipefail

# ─── Colours ──────────────────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ─── Helpers ──────────────────────────────────────────────────────────────────
step()  { echo -e "\n${CYAN}${BOLD}▶ $*${RESET}"; }
ok()    { echo -e "${GREEN}✔ $*${RESET}"; }
warn()  { echo -e "${YELLOW}⚠ $*${RESET}"; }
fail()  { echo -e "${RED}✘ $*${RESET}"; exit 1; }
skip()  { echo -e "${YELLOW}⊘ [SKIPPED — GitHub-only] $*${RESET}"; }

require() {
  command -v "$1" &>/dev/null || fail "Required tool '$1' not found. Please install it."
}

# ─── Workflow: build-devices-index ───────────────────────────────────────────
workflow_build_devices_index() {
  echo -e "\n${BOLD}═══ Workflow: Build Devices Index ═══${RESET}"

  require git
  require node

  # Step: Checkout DerpFest repo (primary)
  step "Checkout DerpFest repo (primary) → repo_primary/"
  if [[ -d "$REPO_ROOT/repo_primary/.git" ]]; then
    warn "repo_primary already exists — pulling latest"
    git -C "$REPO_ROOT/repo_primary" fetch --depth=1 origin master
    git -C "$REPO_ROOT/repo_primary" reset --hard origin/master
  else
    git clone --depth=1 -b master \
      https://github.com/DerpFest-AOSP/Updater-Stuff.git \
      "$REPO_ROOT/repo_primary"
  fi
  ok "repo_primary ready"

  # Step: Checkout Avalon extras (secondary)
  step "Checkout Avalon extras (secondary) → repo_avalon/"
  if [[ -d "$REPO_ROOT/repo_avalon/.git" ]]; then
    warn "repo_avalon already exists — pulling latest"
    git -C "$REPO_ROOT/repo_avalon" fetch --depth=1 origin "16.0"
    git -C "$REPO_ROOT/repo_avalon" reset --hard origin/16.0
  else
    git clone --depth=1 -b "16.0" \
      https://github.com/amanrajOO7/derpfest_avalon.git \
      "$REPO_ROOT/repo_avalon"
  fi
  ok "repo_avalon ready"

  # Step: Write repo_map.json
  step "Write repo_map.json"
  cat > "$REPO_ROOT/repo_map.json" <<'JSON'
  [
    {"path":"repo_primary","owner":"DerpFest-AOSP","repo":"Updater-Stuff","branch":"master"},
    {"path":"repo_avalon","owner":"amanrajOO7","repo":"derpfest_avalon","branch":"16.0"}
  ]
JSON
  ok "repo_map.json written"

  # Step: Run build-index
  step "Run build-index.cjs"
  node "$REPO_ROOT/scripts/build-index.cjs"
  ok "build-index.cjs completed"

  # Step: Commit & push (dry-run locally)
  step "Commit & push (local dry-run)"
  cd "$REPO_ROOT"
  git add public/devices-index.json repo_map.json
  if git diff --cached --quiet; then
    warn "No changes to commit"
  else
    warn "Changes staged. In CI these would be committed and pushed."
    warn "Run 'git commit -m \"ci: update devices-index.json\" && git push' manually if desired."
    git diff --cached --stat
  fi

  echo -e "\n${GREEN}${BOLD}✔ Workflow 'Build Devices Index' completed successfully${RESET}"
}

# ─── Workflow: deploy ─────────────────────────────────────────────────────────
workflow_deploy() {
  echo -e "\n${BOLD}═══ Workflow: Deploy (static content) ═══${RESET}"

  require node
  require npm

  # Step: Install dependencies (follow README: npm i)
  step "Install dependencies (npm i)"
  cd "$REPO_ROOT"
  npm i
  ok "Dependencies installed"

  # Step: Build
  step "Build (npm run build)"
  npm run build
  ok "Build succeeded → dist/"

  # Step: Setup Pages (GitHub-only)
  skip "Setup Pages (actions/configure-pages)"

  # Step: Upload artifact (GitHub-only)
  skip "Upload artifact (actions/upload-pages-artifact)"

  # Step: Deploy to GitHub Pages (GitHub-only)
  skip "Deploy to GitHub Pages (actions/deploy-pages)"

  echo -e "\n${GREEN}${BOLD}✔ Workflow 'Deploy' completed successfully (local build only)${RESET}"
  echo -e "   Build output: ${CYAN}${REPO_ROOT}/dist/${RESET}"
  echo -e "   To preview:   ${CYAN}npm run preview${RESET}"
}

# ─── Menu / entrypoint ────────────────────────────────────────────────────────
print_menu() {
  echo -e "\n${BOLD}Available workflows:${RESET}"
  echo "  1) build-devices-index"
  echo "  2) deploy"
  echo "  3) both (build-devices-index → deploy)"
  echo "  q) quit"
  echo ""
}

run_workflow() {
  case "$1" in
    build-devices-index|1) workflow_build_devices_index ;;
    deploy|2)              workflow_deploy ;;
    both|3)                workflow_build_devices_index; workflow_deploy ;;
    *) fail "Unknown workflow: $1. Choose: build-devices-index | deploy | both" ;;
  esac
}

main() {
  echo -e "${BOLD}${CYAN}╔══════════════════════════════════════════╗${RESET}"
  echo -e "${BOLD}${CYAN}║  Local GitHub Actions Simulator          ║${RESET}"
  echo -e "${BOLD}${CYAN}║  Repo: DerpFest-AOSP/DerpSite            ║${RESET}"
  echo -e "${BOLD}${CYAN}╚══════════════════════════════════════════╝${RESET}"

  if [[ $# -ge 1 ]]; then
    run_workflow "$1"
    return
  fi

  print_menu
  read -rp "Select workflow: " choice
  case "$choice" in
    q|Q) echo "Bye!"; exit 0 ;;
    *)   run_workflow "$choice" ;;
  esac
}

main "$@"
