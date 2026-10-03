#!/bin/sh
set -eu
cd "$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
test "$(uname -sm)" = 'Darwin arm64'
test "$(node --version)" = v26.10.0
test -f pnpm-lock.yaml
if test -e package-lock.json || test -e .npmrc; then
  printf '%s\n' 'Remove only the retired package-lock.json and .npmrc files as documented in the maintenance runbook, then retry.' >&2
  exit 1
fi
work=$(mktemp -d /private/tmp/repoprompt-pnpm12-validation.XXXXXX)
printf 'Validation logs, standalone tool, store and previous dependencies: %s\n' "$work"
node_binary=$(node -p 'process.execPath')
curl --proto '=https' --tlsv1.2 -fsSL https://github.com/pnpm/pnpm/releases/download/v12.8.1/pnpm-darwin-arm64.tar.gz -o "$work/pnpm.tar.gz"
printf '%s  %s\n' 8eeeae4cd714b2f1755750d303f5b1bcfe23d95ed7245536305d0c3877c5ce41 "$work/pnpm.tar.gz" | shasum -a 256 -c -
tar -xzf "$work/pnpm.tar.gz" -C "$work"
export PATH="$work:$(dirname "$node_binary"):$PATH"
export PNPM_HOME="$work/home" XDG_CACHE_HOME="$work/cache" XDG_STATE_HOME="$work/state" XDG_CONFIG_HOME="$work/config" PNPM_CONFIG_STORE_DIR="$work/store"
test "$(pnpm --version)" = 12.8.1
test "$(node --version)" = v26.10.0
if test -e node_modules; then
  mv node_modules "$work/previous-node_modules"
fi
run_logged() {
  log=$1
  shift
  if "$@" > "$work/$log.log" 2>&1; then
    tail -n 20 "$work/$log.log"
  else
    cat "$work/$log.log"
    exit 1
  fi
}
run_logged install pnpm install --frozen-lockfile --ignore-scripts
run_logged native pnpm run setup:native
unset ALGOLIA_APP_ID ALGOLIA_SEARCH_API_KEY ALGOLIA_INDEX_NAME PAGES_OWNER PAGES_REPOSITORY BROWSERSLIST BROWSERSLIST_ENV
export SITE_URL=https://example.invalid SITE_BASE_URL=/ SITE_INDEXABLE=false
run_logged root-clear pnpm run clear
run_logged root-build pnpm run build
if test -d ../RepoPromptWeb/src/docs; then
  run_logged source-parity node migration/check-docs.cjs . ../RepoPromptWeb
fi
run_logged compile node migration/check-docusaurus-docs.cjs
export SITE_BASE_URL=/repoprompt-ce-user-docs/ SITE_INDEXABLE=true
run_logged subpath-clear pnpm run clear
run_logged subpath-build pnpm run build
run_logged browser node scripts/browser-audit.mjs
printf 'All validation commands passed. Inspect full logs and browser report: %s\n' "$work"
