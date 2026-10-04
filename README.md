# RepoPrompt CE user documentation

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE.md)

Source code for https://repoprompt.com, the public-facing end user documentation for the [Community Edition of RepoPrompt](https://github.com/repoprompt/repoprompt-ce). Contains legacy documentation for the older "Classic" version of RepoPrompt.

RepoPrompt CE is a free, open-source native macOS app and agent orchestrator for context engineering. It helps coding agents understand your codebase before they act. It assembles focused, reviewable context from files, CodeMaps, repository structure, and Git diffs, then hands that context to AI tools and CLI agents.

RepoPrompt CE also builds an agent harness around its bundled MCP server. Connect MCP-compatible clients and CLI agents to search repositories, inspect files, curate context, run agent sessions, and orchestrate work through a shared native macOS interface.

## Local development

Use Node.js 26.x and pnpm 12.x series.

```sh
pnpm install
pnpm start
pnpm test
pnpm run check:content
pnpm run build
pnpm run serve
```

`pnpm run build` includes strict link/anchor/MDX checks, redirect finalization, version-correct LLM exports, and artifact audits. A bare `docusaurus build` is not the release pipeline. Local previews default to example.invalid with noindex. No secrets are required to build.

## Maintainer guide

- [Publishing, approvals, variables, and rollback](docs/runbooks/publishing.md)
- [Algolia credentials, DocSearch crawler, and legacy redirects](docs/runbooks/search-and-redirects.md)
- [Content/version policy, Markdown images, theme, and LLM exports](docs/runbooks/content-and-media.md)
- [Validation, upgrades, and legal review](docs/runbooks/maintenance.md)

## Contributing and support

See [CONTRIBUTING.md](CONTRIBUTING.md) to improve these docs and
[SUPPORT.md](SUPPORT.md) for help. Report vulnerabilities using
[SECURITY.md](SECURITY.md).

## License

Original documentation and site code in this repository are licensed under
[Apache-2.0](LICENSE.md), except where otherwise noted. Third-party material
retains its own license terms; see [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)
and [NOTICE](NOTICE). The license does not grant trademark rights.
