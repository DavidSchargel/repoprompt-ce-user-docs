# Validation and maintenance

## Validation layers

Use the Node.js version in [`.node-version`](../../.node-version) and the pnpm version in [`package.json`](../../package.json). Install the locked graph with `pnpm install --frozen-lockfile`. Run checks from the repository root and read [`AGENTS.md`](../../AGENTS.md) for execution restrictions.

| Command | What it checks |
| --- | --- |
| `pnpm test` | Metadata filtering, image and theme adapters, LLM transformations, document moves, search helpers, and source/SSR interaction contracts. It does not test a running browser or assistive technology. |
| `pnpm run check:content` | All registered documentation versions, sidebars, MDX compilation, relative document links, heading fragments, images, and legacy mapping destinations. It does not validate README/runbook links or remote websites. |
| `pnpm run build` | Runs both checks above, compiles with strict link/anchor checks, finalizes redirects and LLM exports, then audits generated images, metadata, routes, and local search results. |
| `pnpm run serve` | Serves the existing production artifact for manual review. It does not rebuild it. |

For README or runbook edits, also verify every changed local path and heading link directly. For site changes, use the complete build when permitted, followed by browser checks appropriate to the change. Record commands actually run and any untested portions; do not reuse old pass counts as current results. Deploying an update to the live site and verifying remote Algolia results are separate steps in the [publishing](publishing.md) and [search](search-and-redirects.md) runbooks.

Keep unit tests independent of current editorial content. Use synthetic Markdown, image bytes, versions, and temporary files instead of reading published articles or screenshots. Assert behavior rather than exact copy, testimonial counts, or incidental spacing. Validate the real content, assets, and routes through the content and artifact checks; compatibility URLs may remain explicit test cases because they are a navigation contract.

`pnpm run check:artifacts` is read-only, but must receive the same SITE_URL/SITE_BASE_URL/SITE_INDEXABLE values used to build. The build directory always contains only the most recent configuration. Do not compare a project-path artifact against default root config.

## Cosmos rendering contract

`package.json` targets `defaults and supports css-cascade-layers` in production and development. Native cascade-layer support is required; legacy browsers outside that intersection are not supported. Keep `future.v4: true` and the actual Cosmos theme. Do not replace this with a font override or switch off v4 layers: a missing browser policy lets PostCSS polyfill separate CSS modules independently, raising Infima specificity above unlayered Cosmos. The generated-artifact audit requires native Infima layers and the unlayered Cosmos Outfit token. Tests process the installed Infima/Cosmos CSS through the actual PostCSS plugins.

The installed Cosmos theme supplies Outfit and IBM Plex Mono with local WOFF2 assets; site CSS can override their use in individual components. Imported MDX in custom JSX pages must render inside `@theme/MDXContent`, otherwise ideal-image objects can reach native img elements as `[object Object]`. The synthetic MDX-provider regression covers this adapter boundary; homepage SSR does not exercise MDX.

[`src/css/responsive-tables.css`](../../src/css/responsive-tables.css), loaded through preset-classic `customCss`, constrains wide Markdown tables to local horizontal scrolling. Its unlayered `main .markdown table` important declarations deliberately outrank Cosmos's important table rules. It also supports a focusable, caption-labelled `.accessible-table-scroll` wrapper where authored. Keep these fixes scoped: do not substitute body/html overflow hiding. Verify keyboard scrolling, header announcements, and 320px/400% reflow in a real browser; CSS declarations alone do not establish those behaviors.

References: [Docusaurus cascade-layer configuration](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-css-cascade-layers), [upstream browser-target discussion](https://github.com/facebook/docusaurus/discussions/11700). Installed package source and generated output, rather than theme branding alone, establish these contracts.

## Accessibility verification gate

The target is [WCAG 2.2 Level AA](https://www.w3.org/TR/WCAG22/) across the published site's content and interactions. Treat accessibility as a release concern, not a one-time audit. The target includes the user experience of the Classic archive and embedded third-party content; a read-only archive or third-party implementation does not establish an accessibility exception. Fix shared rendering where possible and record remaining barriers with their affected routes.

Keep three types of evidence distinct: source/unit checks, browser and assistive-technology checks, and checks against the deployed revision. A source test can verify an accessible label exists, but cannot establish that it is announced correctly, that focus moves as intended, or that rendered colors meet contrast requirements.

For a release or changes affecting shared rendering, run the **full** `pnpm run build` for both `SITE_BASE_URL=/` and `/repoprompt-ce-user-docs/`, following the [local build procedure](publishing.md#validate-a-release-artifact). Record `SITE_URL`, `SITE_BASE_URL`, and `SITE_INDEXABLE` for each artifact. The build already runs the unit and content checks. Inventory generated routes before testing; do not assume every source file becomes a page. Use the local build or record the exact deployed URL and revision. Never call the site WCAG 2.2 AA compliant from Node tests, Lighthouse, or screenshots alone.

For each result, record route, browser and assistive-technology versions, viewport/zoom, theme, keyboard sequence, observed behavior, criterion, status (`pass`, `fail`, `not tested`, or reasoned `not applicable`), and an issue link for failures. Check at minimum:

- Home: skip link, landmarks and heading navigation, diagrams in reading order, links, testimonial selection/status/focus, and rendered testimonial target boxes (at least 24×24 CSS pixels unless a documented WCAG 2.5.8 exception applies). For the prerecorded demo, record separate results for captions (1.2.2), a media alternative or audio description (1.2.3), and audio description of essential visual information (1.2.5), unless the existing soundtrack already conveys that information. Also check player keyboard access and blocked-embed behavior; a fallback link or transcript alone does not satisfy 1.2.5.
- Current `/docs/`: tabs, sidebar/TOC, copy-code and copy-page feedback including clipboard denial, image zoom activation/Escape/focus return, and theme switch.
- Tables and provider guides: focus and horizontal scrolling where needed, spoken row/column headers, and complete content at 320 CSS pixels and 400% zoom.
- Image-bearing CE docs and blog posts: alt against the pixels, zoom, headings, link purpose, and reflow.
- CE changelog, privacy, terms, blog index/listings, and an actual 404: headings, native details, navigation, focus, and reflow.
- Shared desktop/mobile navigation and version dropdown; local docs search by default, or Algolia when configured. Test Escape and focus return for overlays, and confirm search is absent outside docs routes.

### Link and navigation checks

The external-link behavior is a site design choice. W3C's [G201 guidance](https://www.w3.org/WAI/WCAG22/Techniques/general/G201) recommends advance warning for new tabs/windows; the technique is advisory, not a standalone AA conformance requirement.

- Check a text link, an icon-only link, an existing changelog link, and a link inserted dynamically after navigation. Each should show one `↗`, open externally when activated, and communicate the new-tab behavior once to a screen reader. Internal links and fragment links should keep their existing navigation behavior.
- Verify the visible label remains part of the accessible name. For a link with an `aria-label`, retain its meaningful description and append the warning. For ordinary text links, the warning uses a visually clipped span. It must not use `display: none`, `visibility: hidden`, or `aria-hidden`, which would also remove the warning from assistive technology.
- Confirm the clipped warning occupies no visible space at normal size or zoom, while the arrow stays visible. Test actual speech output; checking the DOM is only supporting evidence. W3C's [C7 technique](https://www.w3.org/WAI/WCAG22/Techniques/css/C7) describes this distinction between visually hidden and inaccessible text.
- The shared rule runs client-side after navigation and observes later link changes. Test initial load, client-side navigation, and delayed content; do not infer equivalent behavior before JavaScript runs or inside cross-origin iframes. Third-party iframe controls need their own review.
- On individual blog posts, check that **Intro** is first in the table of contents and returns to the article top without the fixed navbar obscuring it. Confirm post titles remain headings and keyboard focus remains understandable.

Test light and dark themes, keyboard-only use, VoiceOver/Safari and NVDA/Firefox, rendered contrast (record computed foreground/background and ratios), 200% text resizing, reduced motion, forced colors where available, and focus not obscured. Separately apply WCAG text-spacing overrides without lost content or functionality: line height 1.5× font size, paragraph spacing 2× font size, letter spacing 0.12× font size, and word spacing 0.16× font size. Use a view-only Classic regression check; never edit the archive. Record new evidence in `docs/reviews/`. The existing [accessibility ledger](../reviews/wcag-2.2-aa-remediation.md) is historical evidence for its stated revision, not proof that the current site passes. Keep untested combinations and unresolved third-party behavior explicit.

### Reporting and follow-through

For an accessibility report, capture the affected URL and revision, the user's task, expected and observed behavior, and the relevant browser/assistive technology when available. Link the report to a reproducible check and retest the fix. Do not close a barrier solely because a lint rule or unit test passes. Summarize unresolved barriers and untested combinations in the release notes or review record; make a conformance statement only when evidence supports its stated scope.

## Upgrades

Check available releases with `pnpm outdated` before changing versions. Update exact package pins and `pnpm-lock.yaml` together; keep the Docusaurus packages on compatible versions and confirm peer dependencies. Review changed packages' licenses, copyright notices, and bundled fonts, icons, or other assets. Update [`THIRD_PARTY_NOTICES.md`](../../THIRD_PARTY_NOTICES.md), [`NOTICE`](../../NOTICE), and [`ThirdPartyLicenses/`](../../ThirdPartyLicenses/) when the attribution changes; a version-only bump does not require rewriting unchanged notices.

Recheck the shared Head alias, ideal-image AST adaptation, LLM plugin internal processor/generator calls, redirect finalization, local search, and Copy-page behavior. Use both root and project builds and both themes. If updating workflow actions, preserve reviewed immutable SHA pins and verify their inputs against the action's source. A successful build is not a dependency vulnerability audit; report any such audit separately.

If a framework update breaks an adapter, isolate a regression fixture, keep the old locked release, and fix/review before deploying the update.

## Legal and editorial maintenance

The legal pages contain migrated application prose and explicit review notices; deployment is not evidence that those statements have been verified for the website. Changes require owner review of applicability, dates, hosting/search data practices, and license/prompt-content clauses. Do not invent contact information. Keep the workflow's approval variables aligned with the owner's decisions; this runbook does not change them or remove page-level warnings and indexing exclusions.

Keep the Classic archive unchanged. Historical model availability, prices, limits, and transport advice are not re-certified by automated checks. Correct current guidance in the CE collection and link to it without rewriting archived files.
