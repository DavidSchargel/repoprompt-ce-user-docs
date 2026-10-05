# GitHub Pages publication and rollback

## Current state and release gates

The owner ran `git init -b main` on 2026-10-02, and local commits were authorized on 2026-10-03. The repository has no remote; do not initialize it again. No push, remote creation, authentication, or deployment is authorized. Owner/repository/production URL are unprovided; privacy and terms remain drafts. A local indexable build on example.invalid is a validation fixture, not publication approval.


Before first publication, obtain:

- Confirmed GitHub owner/repository and origin/base path; custom domain and DNS authority only if explicitly requested.
- Approval of privacy/terms applicability, dates, hosting/search data practices, license/brand/asset reuse, and removal of draft warnings/noindex only after legal sign-off.
- Explicit authorization to create/configure a remote, push, and publish. These are separate from local commit authorization and validation.
- Protected `main`, a protected `github-pages` environment with required owner review, and Pages configured to use GitHub Actions.

## Local verification

Run from the repository root. Site variables are read when Docusaurus starts or builds; changing them requires a server restart or a new build. Local commands do not publish the site.

### Load local settings

Create `.env.local` in the repository root with shell-compatible values. This file is already ignored by Git, but it is not loaded automatically. Replace `YOUR_GITHUB_OWNER` below with the intended GitHub user or organization; confirm the intended production destination before publishing.

```sh
export PAGES_OWNER=YOUR_GITHUB_OWNER
export PAGES_REPOSITORY=repoprompt-ce-user-docs
export SITE_URL="https://${PAGES_OWNER}.github.io"
export SITE_BASE_URL=/repoprompt-ce-user-docs/
export SITE_INDEXABLE=false

# Leave all three empty to disable Algolia, or fill in all three to test it.
export ALGOLIA_APP_ID=''
export ALGOLIA_SEARCH_API_KEY=''
export ALGOLIA_INDEX_NAME=''
```

Use only an Algolia search-only API key, never an admin key: these values become part of the public client build. Empty assignments also clear values inherited from a previous shell session. See [Search and redirects](search-and-redirects.md) for search configuration.

Load the file explicitly in the terminal where you run the site:

```sh
source .env.local
pnpm start
```

Open the local URL printed by Docusaurus, including the configured base path. `SITE_URL` controls production URL generation; it does not bind the development server to that domain. After editing `.env.local`, stop the server, source the file again, and restart it. Each new terminal needs to load the file separately.

### Verify a production build

Development mode is useful for content and navigation checks; use a production build to verify generated URLs, indexing metadata, redirects, and exports:

```sh
source .env.local
pnpm run build
pnpm run serve
```

`pnpm run build` includes the test suite, content validation, redirect/export finalization, and artifact checks. Browse the local production preview and check navigation, images, version switching, deep-page refreshes, and old redirect links. Inspect generated canonical URLs, `build/sitemap.xml`, `build/robots.txt`, `build/llms.txt`, and page-source robots metadata against the intended origin, path, and indexing setting.

Test these configuration cases before publication:

| Setting | Local check |
| --- | --- |
| `PAGES_OWNER` / `PAGES_REPOSITORY` | In a subshell, run `(unset SITE_URL SITE_BASE_URL; pnpm run build)` to check derived URLs. A project repository should use `https://OWNER.github.io/REPOSITORY/`; a repository named `OWNER.github.io` should use `/`. |
| `SITE_URL` / `SITE_BASE_URL` | Build with the intended overrides. The origin must be HTTP(S) with no path other than `/`, query, fragment, or credentials; the base path must start and end with `/`. Check both root and project-path layouts if the destination is undecided. |
| `SITE_INDEXABLE` | Compare builds with `false` and `true`. Unset or any value other than the exact string `true` keeps site-wide `noindex`. Existing page-specific indexing exclusions still apply. An indexable local build is only a test, not approval to publish. |
| Algolia variables | First test with all three empty, then with all three valid values. Partial configuration should fail startup/build. With valid values, test search in the browser against the configured index; a successful build alone does not verify credentials or index contents. Search uses the remote Algolia service, so results may point to indexed production URLs. |

For example, these commands exercise root and project-path layouts without changing `.env.local`:

```sh
SITE_URL=https://example.invalid SITE_BASE_URL=/ SITE_INDEXABLE=false \
  pnpm run build
SITE_URL=https://example.invalid SITE_BASE_URL=/repoprompt-ce-user-docs/ SITE_INDEXABLE=true \
  pnpm run build
```

Each build replaces `build/`, so preview or inspect one case before building the next. If running `pnpm run check:artifacts` separately, pass the same `SITE_URL`, `SITE_BASE_URL`, and `SITE_INDEXABLE` values used for that build. Restore the intended settings with `source .env.local` and rebuild before the final preview.

### Settings that only apply in GitHub Actions

`PUBLISH_APPROVED` and `LEGAL_TEXT_APPROVED` are deployment gates, not Docusaurus settings. Setting them locally has no effect on `pnpm start`, `pnpm run build`, or `pnpm run serve`. The `publish` checkbox is a manual workflow input, not an environment variable.

After local verification, configure repository variables under **Settings → Secrets and variables → Actions → Variables** and manually run the workflow with `publish` unchecked to test the hosted build without deployment. This validates the build with repository variables, but does not exercise the publication-only approval checks or deployment permissions. Publishing separately requires `main`, both approval variables set to `true`, an exact owner/repository match, and `publish` checked.

GitHub supplies `GITHUB_TOKEN`, `GITHUB_REF`, and `GITHUB_REPOSITORY`; the pnpm setup action supplies `PNPM_HOME`. Do not copy these CI-generated values into `.env.local`.

In restricted orchestration, target build/install writes require owner-run one-time commands. Do not copy the project into the source tree to evade this boundary. The already completed initialization command was:

```sh
cd /path/to/repoprompt-ce-user-docs
git init -b main
```

For review only, `git status --short`, `git remote -v`, and `git symbolic-ref --short HEAD` do not create commits or remotes. Before a separately authorized initial commit, inspect ignored files and scan the staged diff for secrets. Never include node_modules, build, .docusaurus, environment files, or browser profiles.

## Repository variables

| Variable | Value/meaning |
| --- | --- |
| PAGES_OWNER | Approved owner |
| PAGES_REPOSITORY | Repository name alone |
| SITE_URL | Optional origin override; HTTP(S) origin only, no path/query |
| SITE_BASE_URL | Optional leading/trailing-slash path override |
| SITE_INDEXABLE | `true` only for approved indexable content |
| PUBLISH_APPROVED | `true` only after explicit owner approval |
| LEGAL_TEXT_APPROVED | `true` only after legal review |
| ALGOLIA_APP_ID / ALGOLIA_SEARCH_API_KEY / ALGOLIA_INDEX_NAME | All absent, or all configured per search runbook |

Without overrides, user/organization Pages (`OWNER.github.io`) uses `/`; a project uses `/REPOSITORY/`. Never commit a CNAME without approved DNS/certificate planning.

## Authorized publication procedure

1. Review changes and the complete local audit; approve legal text and asset use. Remove draft-specific exclusions only in that reviewed change.
2. Configure the confirmed repository and protected environment. The workflow must run from `main` with an exact owner/repository match.
3. Run validation with `publish: false`. Check the exact production canonical URLs, images, sitemap, robots, feeds, LLM links, version navigation, and search credentials.
4. Dispatch `.github/workflows/pages.yml` with `publish: true` only after approval. The build job uploads `build/`; deployment uses Pages write and OIDC permissions. PRs and pushes never publish.
5. Inspect the Actions result and live homepage, deep docs refresh, Classic archive, blog, legal routes, old hash plus pathname alias, all six home redirects, assets, and exports.
6. If any check fails, do not mark the release verified. Record the commit, workflow run, and observed URLs in the release record.

The workflow currently uses upstream major action tags; pin reviewed immutable action SHAs before enabling publication under a supply-chain policy that requires them. Do not silently select unrelated replacement actions.

## Rollback

Revert the defective content/configuration change through a reviewed commit or restore the known-good tree on main. Re-run the locked install/build/audit and manually deploy that artifact with the same approvals. Do not force-push or overwrite an existing artifact in place. A failed build must publish nothing. No known-good published release exists yet, so live rollback rehearsal is pending first authorized publication.

At a project subpath, the generated robots.txt does not control `https://OWNER.github.io/robots.txt`; coordinate origin-level crawling separately. Preview noindex metadata still protects the individual HTML pages.

Reference: [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
