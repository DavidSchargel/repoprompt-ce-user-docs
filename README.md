# RepoPrompt CE user documentation

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

This public repository contains the RepoPrompt CE documentation website, published on GitHub Pages. It includes the Community Edition guides, the Classic archive, the blog, and the Docusaurus site. It is separate from the [RepoPrompt CE application repository](https://github.com/repoprompt/repoprompt-ce).

The [Classic documentation](versioned_docs/version-classic-2.1.0/) is read-only. **Classic 2.1.0** is an archive label; its guides may describe earlier Classic releases. The first entry in [`versions.json`](versions.json) selects the current CE collection, served at `/docs/`; Classic is served at `/docs/classic-2.1.0/`.

RepoPrompt CE is a free, open-source native macOS app and agent orchestrator for context engineering. It helps coding agents understand your codebase before they act. It assembles focused, reviewable context from files, CodeMaps, repository structure, and Git diffs, then hands that context to AI tools and CLI agents.

RepoPrompt CE also builds an agent harness around its bundled MCP server. Connect MCP-compatible clients and CLI agents to search repositories, inspect files, curate context, run agent sessions, and orchestrate work through a shared native macOS interface.

## Local documentation development

Node.js 26 or later is required. Use the Node.js version specified in [`.node-version`](.node-version) and the
pnpm version specified by `packageManager` in [`package.json`](package.json).
The Pages workflow uses these same sources. Run the following from the repository root:

```sh
pnpm install --frozen-lockfile
pnpm start
```

Open the local URL printed by Docusaurus. Stop the development server before using the same terminal for validation:

```sh
pnpm test
pnpm run check:content
```

To produce and preview a release artifact:

```sh
pnpm run build
pnpm run serve
```

`pnpm run build` runs the tests and content checks again, then compiles the site, finalizes redirects and LLM exports, and audits the generated artifacts. A bare `docusaurus build` omits those steps. No deployment occurs during local builds.

Without site environment variables, canonical URLs use `https://example.invalid`, the base path is `/`, and search-engine indexing is disabled. Local docs search needs no credentials. Environment files are not loaded automatically; see the [publishing runbook](docs/runbooks/publishing.md#local-configuration) for configuration and preview commands.

## GitHub Actions and publication

The [Pages workflow](.github/workflows/pages.yml) validates pull requests, pushes to `main`, and manual runs. **A skipped `deploy` job is expected for pull requests, pushes, and manual runs with `publish` unchecked.**

Initial publication required a manual run on `main` with `publish` checked, `PUBLISH_APPROVED=true`, `LEGAL_TEXT_APPROVED=true`, matching owner/repository variables, and a successful build. Updates to the live site use the same gates. Follow the [update procedure](docs/runbooks/publishing.md#deploy-an-update) to deploy a new revision; a push or merged pull request alone does not deploy it.

## Content and theme

Edit the current collection under `versioned_docs/`, its sidebar under `versioned_sidebars/`, and site components under `src/`. Preserve original screenshots under `source-assets/documentation-screenshots/`; put native-resolution crops beside the relevant documentation. Do not edit the Classic archive or generated `build/` and `.docusaurus/` files.

The site uses Cosmos with local theme overrides. Follow the [content guide](docs/runbooks/content-and-media.md) for images, terminology, links, and source layout, and the [maintenance guide](docs/runbooks/maintenance.md) for rendering and accessibility checks.

## Accessibility intent

Always aim to meet [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/), with readable content, keyboard navigation, visible focus, meaningful headings and link labels, and support for screen readers and zoom. External links show a ↗ indicator and provide a screen-reader warning before opening a new tab.

This is a design and maintenance goal, not a claim of verified conformance. Automated checks support manual review; they do not replace it. See the [accessibility verification guide](docs/runbooks/maintenance.md#accessibility-verification-gate) for the test process, and [SUPPORT.md](SUPPORT.md) to report a barrier.

## Runbooks

- [Publishing, approvals, variables, and rollback](docs/runbooks/publishing.md)
- [Local search, optional Algolia, and legacy redirects](docs/runbooks/search-and-redirects.md)
- [Content/version policy, Markdown images, theme, and LLM exports](docs/runbooks/content-and-media.md)
- [Validation, upgrades, and legal review](docs/runbooks/maintenance.md)

## Contributing and support

Keep documentation evergreen. Prefer capabilities over fixed model names, release numbers, or context-window sizes. Keep shared provider facts in the current collection's `providers/` section and link to that reference from feature guides.

See [CONTRIBUTING.md](CONTRIBUTING.md) to improve these docs and
[SUPPORT.md](SUPPORT.md) for help. Report vulnerabilities using
[SECURITY.md](SECURITY.md).

Community participation is governed by our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

Original documentation and site code in this repository are licensed under
[Apache-2.0](LICENSE), except where otherwise noted. Third-party material
retains its own license terms; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)
and [NOTICE](NOTICE). The license does not grant trademark rights.
