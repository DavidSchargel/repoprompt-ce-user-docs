# Contributing

Help improve the end-user documentation for RepoPrompt CE: correct a confusing
step, update a screenshot, explain a workflow, or fix the documentation site.
Application changes belong in the [RepoPrompt CE repository](https://github.com/repoprompt/repoprompt-ce).

## Before you start

Search existing issues and pull requests. For a substantial rewrite, new section,
or site feature, open an issue in this repository to discuss the scope first.
Small corrections can go straight to a pull request.

Read [AGENTS.md](AGENTS.md) and the [content guide](docs/runbooks/content-and-media.md).
Keep changes focused on the reader's task. Use the application's actual labels
and verify instructions against the relevant app version. Do not present a
planned feature as available.

## Where to edit

- Current documentation: `versioned_docs/version-1.5.0/`.
- Navigation: `versioned_sidebars/` and `sidebars.js`.
- Blog posts: `blog/`.
- Site pages and styling: `src/`.
- Images: `static/images/`.
- Maintainer instructions: `docs/runbooks/`.

The Classic 2.1.0 documentation is an archive. Do not create or edit files in
`classic-2.1.0` or `versioned_docs/version-classic-2.1.0/`.
Do not edit generated files in `build/` or `.docusaurus/`. This project does not
use Architecture Decision Records (ADRs).

## Writing and screenshots

Use short, concrete instructions, descriptive headings, meaningful image alt
text, and fenced code blocks with a language. Preserve working links and anchors;
update navigation and redirects when a URL changes. Keep examples runnable and
identify any prerequisites.

Use sample data in screenshots. Remove credentials, private repository content,
personal details, and customer data. Include the source and license when adding
third-party text, code, or media; update [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)
when needed.

## Local checks

See [README.md](README.md#local-development) for setup. From the repository root:

```sh
pnpm install
pnpm test
pnpm run check:content
pnpm run build
```

Use `pnpm start` to review edits locally. For visual changes, check narrow and
wide screens and both light and dark themes. The full build includes link,
anchor, export, and artifact validation. If a check cannot run, describe why in
the pull request. See the [maintenance guide](docs/runbooks/maintenance.md) for
more detail.

## Pull requests

Explain the reader problem, what changed, and how you checked it. Link the
related issue if there is one. Include before/after screenshots for visible site
changes. AI-assisted contributions are welcome; verify their accuracy and
licensing and be able to explain the work you submit.

By intentionally submitting a contribution for inclusion, you agree to license
it under Apache-2.0, as described in Section 5 of [LICENSE.md](LICENSE.md), unless
you explicitly state otherwise. Only submit material you have the right to
contribute, and preserve existing third-party notices.

Be respectful and discuss the work rather than the person. Harassment, personal
attacks, and publication of private information are not welcome.
