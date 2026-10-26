# GitHub Pages validation, publication, and rollback

## Repository and publication status

The public repository is [DavidSchargel/repoprompt-ce-user-docs](https://github.com/DavidSchargel/repoprompt-ce-user-docs), and the site is published on GitHub Pages. Initial publication is complete. This runbook covers validating changes, updating the live site, and rolling back a release. A successful validation run or a locally generated artifact does not update the live deployment.

The source of truth for CI behavior is [`.github/workflows/pages.yml`](../../.github/workflows/pages.yml). Use GitHub Actions and the `github-pages` environment to identify the current deployed commit and URL. Check those records before reporting a new release as live.

## What runs and what gets skipped

| Trigger | Build and validation | Pages deployment |
| --- | --- | --- |
| Pull request | Runs | Skipped |
| Push to `main` | Runs | Skipped |
| Push to another branch without a pull request | No push-triggered run | No deployment |
| Manual run, `publish` unchecked | Runs on the selected ref | Skipped |
| Manual run, `publish` checked | Runs publication checks and then builds | Runs only when every publication gate passes |

The `deploy` job requires a manual `workflow_dispatch` run on `main`, `publish` enabled, both approval variables exactly `true`, and a successful `build` job. **“This job was skipped” is expected on validation-only runs.** It is not a build failure.

For a publish-enabled run, **Check publication confirmations** also checks that `PAGES_OWNER/PAGES_REPOSITORY` exactly matches GitHub's `GITHUB_REPOSITORY`. A wrong ref, missing approval, or mismatched repository fails that build step. An unsuccessful build prevents deployment. Environment protection rules can require a separate reviewer approval; those rules are configured in GitHub, not created by the workflow.

## Local configuration

Run commands from the repository root. Use the Node.js major in [`.node-version`](../../.node-version) and pnpm version in [`package.json`](../../package.json), then install with `pnpm install --frozen-lockfile`.

No configuration file is required for local work. The defaults are `https://example.invalid`, base path `/`, site-wide `noindex`, and local docs search. To preview a GitHub project-site layout, create an ignored `.env.local` containing shell-compatible assignments:

```sh
export PAGES_OWNER=DavidSchargel
export PAGES_REPOSITORY=repoprompt-ce-user-docs
export SITE_URL="https://${PAGES_OWNER}.github.io"
export SITE_BASE_URL=/repoprompt-ce-user-docs/
export SITE_INDEXABLE=false
export ALGOLIA_APP_ID=''
export ALGOLIA_SEARCH_API_KEY=''
export ALGOLIA_INDEX_NAME=''
```

This previews the repository's default GitHub Pages project path. For a production-equivalent preview, use the active `SITE_URL` and `SITE_BASE_URL` repository variables; a configured custom domain may use a different origin and `/` as its base path. Do not change the live domain or DNS as part of local preview setup.

`.env.local` is **not loaded automatically**. Source it in each terminal before starting Docusaurus:

```sh
source .env.local
pnpm start
```

Open the URL printed by Docusaurus, including the base path. `SITE_URL` controls generated URLs, not the development server's listening address. Stop and restart the server after changing environment variables. Empty Algolia assignments clear inherited credentials and select local search.

## Validate a release artifact

```sh
source .env.local
pnpm run build
pnpm run serve
```

The build runs tests, content checks, Docusaurus compilation, redirect finalization, LLM export finalization, and artifact checks. `serve` previews the existing `build/`; it does not rebuild it. Inspect navigation, images, version switching, deep-page refreshes, search, and legacy links. Check canonical URLs, `sitemap.xml`, `robots.txt`, `llms.txt`, and page-level robots metadata against the selected configuration.

For changes to deployment paths, theme adapters, or generated URLs, validate both layouts:

```sh
SITE_URL=https://example.invalid SITE_BASE_URL=/ SITE_INDEXABLE=false pnpm run build
SITE_URL=https://example.invalid SITE_BASE_URL=/repoprompt-ce-user-docs/ SITE_INDEXABLE=false pnpm run build
```

Each build replaces `build/`. Preview or inspect each artifact before creating the next one. A separate `pnpm run check:artifacts` must receive the same environment values as the build it checks. Restore the intended settings and rebuild before the final preview.

Additional configuration checks:

- To test derived Pages URLs, set `PAGES_OWNER` and `PAGES_REPOSITORY`, unset `SITE_URL` and `SITE_BASE_URL` in a subshell, and build. A repository named `OWNER.github.io` uses `/`; other repository names use `/REPOSITORY/`.
- `SITE_URL` must be an HTTP(S) origin with no credentials, path other than `/`, query, or fragment. `SITE_BASE_URL` must start and end with `/` and contain no query or fragment.
- Only the exact string `true` enables `SITE_INDEXABLE`. Test an indexable fixture when changing SEO behavior; it is not permission to publish. Privacy and terms retain their own exclusions.
- Supply either all three Algolia values or none. Partial configuration fails immediately. A build with complete values does not verify the remote index; follow the [search runbook](search-and-redirects.md).

## Maintain the GitHub configuration

Review or update the live site's repository variables under **Settings → Secrets and variables → Actions → Variables**. These are different from shell variables in `.env.local`. Preserve the existing production origin and base path unless the change intentionally moves the site.

| Variable | Purpose |
| --- | --- |
| `PAGES_OWNER` | Exact GitHub owner; `DavidSchargel` for the configured origin. |
| `PAGES_REPOSITORY` | Repository name only; `repoprompt-ce-user-docs` for the configured origin. |
| `SITE_URL` | Optional canonical-origin override, such as an approved custom domain. |
| `SITE_BASE_URL` | Optional base-path override. Use `/` for a root site or `/REPOSITORY/` for a project site. |
| `SITE_INDEXABLE` | Set to `true` only when search-engine indexing is intended. It is independent of deployment approval. |
| `PUBLISH_APPROVED` | Must equal `true` for publication. |
| `LEGAL_TEXT_APPROVED` | Must equal `true` for publication, after review of the legal content. |
| `ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_API_KEY`, `ALGOLIA_INDEX_NAME` | All empty for local search, or all set for Algolia. The key must be search-only; these values are included in the client build. |

Keep **Settings → Pages → Build and deployment → Source** set to **GitHub Actions**. Maintain the `github-pages` environment, its reviewer and branch restrictions, and protection of `main` according to repository policy. These are existing repository settings; the workflow does not configure them.

GitHub supplies `GITHUB_TOKEN`, `GITHUB_REF`, and `GITHUB_REPOSITORY`; the setup action manages Node.js and pnpm. Do not add these generated values to `.env.local`. The checked-in workflow already pins its external actions to immutable commit SHAs; version comments are labels, not the executed refs.

## Deploy an update

1. Review the intended commit on `main`, the active production origin/base path, legal content, asset attribution, and validation results. Privacy and terms currently contain review warnings and explicit `noindex`; deployment does not remove those source-level notices. Change them only as part of approved content changes. Setting an approval variable does not edit these pages.
2. Verify the existing Pages, environment, and repository-variable settings. Change them only when the release needs a configuration change. Local shell exports do not configure Actions.
3. Open **Actions → Validate and optionally publish Pages → Run workflow**, choose `main`, and leave **publish** unchecked. Confirm the build succeeds using the production configuration. A skipped deploy job is expected here.
4. Run the workflow again on the reviewed `main` commit with **publish** checked. The publication checks must pass; the build then configures Pages and uploads `build/`. The deploy job uses `pages: write` and `id-token: write`. Approve the environment deployment if its protection rules require it.
5. Open the deployment URL from the run. Check the homepage, current and Classic docs, blog, legal pages, a deep-page refresh, search, redirects, images, and machine-readable exports. Confirm that the deployed commit is the one reviewed.
6. Record the commit, Actions run URL, deployment URL, configuration, and checks performed. A successful deployment alone does not establish accessibility conformance or correct Algolia results.

Validation runs for the same ref share a concurrency group. Publish-enabled manual runs share a separate publication group. A newer run in the same group can cancel one already in progress; inspect the latest run before interpreting cancellation or deployment status.

## Rollback

Identify the last known-good deployed commit from Actions and the Pages environment. Revert the defective change through normal review, validate the resulting `main`, and publish it with the same manual procedure. Do not force-push or treat a failed build as a rollback; the existing deployment remains the live version until a replacement deployment succeeds.

At a project subpath, the generated `robots.txt` does not control the host's root `robots.txt`. Page-level `noindex` also does not make public content private. Keep sensitive information out of every published artifact.

Reference: [GitHub custom Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
