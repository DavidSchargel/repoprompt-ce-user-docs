<!--
Use this template for documentation and Docusaurus website changes.
Read CONTRIBUTING.md, AGENTS.md, and docs/runbooks/content-and-media.md first.
Keep the description brief for small corrections; remove optional sections and
checklist items that do not apply. Explain any checks you could not complete.
-->

Application changes, including app bug fixes and new features, belong in the
[RepoPrompt CE repository](https://github.com/repoprompt/repoprompt-ce).
This repository accepts changes to the documentation and its Docusaurus website.

## Summary and reader benefit

<!-- Explain what was wrong or missing, what changed, and how this helps readers.
For a substantial rewrite, new section, or site feature, link the issue where
the scope was discussed before implementation. -->

## Affected pages and versions

<!-- List the page URLs or source paths and documentation versions affected.
For app workflows, identify the RepoPrompt version used to verify the steps.
For shared site changes, describe the affected components or routes. -->

## Related issues and references

<!-- Optional. Use "Closes #123" only when this fully resolves an issue here.
Link related application issues, release notes, or source evidence with full URLs.
Identify any dependency on another PR or release. -->

## Validation

<!-- Describe what you checked and the results, including anything not run and why.
`pnpm run build` runs the tests and content checks, builds Docusaurus, and checks
generated artifacts. The checks can also be run individually while iterating:
  pnpm test
  pnpm run check:content
Preview changed pages with `pnpm start`. Verify instructions and examples against
the app when applicable. For site behavior changes, describe reproduction steps
and relevant automated checks. -->

## Screenshots or preview

<!-- For visible site changes, include before/after screenshots or a preview URL
with review steps. Check narrow and wide screens in light and dark themes.
Describe important differences in text. Remove this section for prose-only edits.
Use sample data and remove credentials and private information. -->

## Review checklist

<!-- Check completed items. Remove items that do not apply instead of checking
them as if tested. Note any remaining work in the validation section above. -->

- [ ] Instructions match available app behavior and use the app's actual labels; examples have been verified.
- [ ] Markdown/MDX renders correctly, including headings, code blocks, images, and admonitions.
- [ ] Links and anchors work; sidebar entries and redirects are updated for added, moved, or renamed pages.
- [ ] Accessibility meets WCAG 2.2 AA for the affected content or UI, including meaningful alt text, descriptive links, keyboard access, visible focus, and contrast as applicable.
- [ ] Changes target the intended documentation version; Classic 2.1.0 archives and generated `build/` and `.docusaurus/` files are untouched.
- [ ] Added or updated dependencies have been reviewed for license, copyright, and bundled-asset changes; `THIRD_PARTY_NOTICES.md`, `NOTICE`, and `ThirdPartyLicenses/` are updated where attribution changed. Other third-party material retains its source and license attribution.
