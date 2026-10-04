# GitHub Pages publication and rollback

## Current state and release gates

The owner ran `git init -b main` on 2026-10-02, and local commits were authorized on 2026-10-03. The repository has no remote; do not initialize it again. No push, remote creation, authentication, or deployment is authorized. Owner/repository/production URL are unprovided; privacy and terms remain drafts. A local indexable build on example.invalid is a validation fixture, not publication approval.


Before first publication, obtain:

- Confirmed GitHub owner/repository and origin/base path; custom domain and DNS authority only if explicitly requested.
- Approval of privacy/terms applicability, dates, hosting/search data practices, license/brand/asset reuse, and removal of draft warnings/noindex only after legal sign-off.
- Explicit authorization to create/configure a remote, push, and publish. These are separate from local commit authorization and validation.
- Protected `main`, a protected `github-pages` environment with required owner review, and Pages configured to use GitHub Actions.

## Local verification

Run from the target root using its pinned toolchain; use the [maintenance setup](maintenance.md) for a fresh install.

```sh
pnpm test
pnpm run check:content
SITE_URL=https://example.invalid SITE_BASE_URL=/ SITE_INDEXABLE=false \
  pnpm run build
SITE_URL=https://example.invalid SITE_BASE_URL=/repoprompt-ce-user-docs/ SITE_INDEXABLE=true \
  pnpm run build
```

In restricted orchestration, target build/install writes require owner-run one-time commands. Do not copy the project into the source tree to evade this boundary. The already completed initialization command was:

```sh
cd /Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs
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
