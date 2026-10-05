# Validation and maintenance

## Validation layers

1. `pnpm test`: metadata policy, image rendering, LLM transformation, and source/SSR accessibility contracts. These tests do not prove browser or assistive-technology behavior.
2. `pnpm run check:content`: current documentation, sidebar, link, and asset checks.
3. `pnpm run build`: tests, strict production build, redirect/LLM finalizers, image/SEO artifact checks.
4. Owner-authorized live Pages and Algolia tests remain separate.

`pnpm run check:artifacts` is read-only, but must receive the same SITE_URL/SITE_BASE_URL/SITE_INDEXABLE values used to build. The build directory always contains only the most recent configuration. Do not compare a project-path artifact against default root config.

## Cosmos rendering contract

`package.json` targets `defaults and supports css-cascade-layers` in production and development. Native cascade-layer support is required; legacy browsers outside that intersection are not supported. Keep `future.v4: true` and the actual Cosmos theme. Do not replace this with a font override or switch off v4 layers: a missing browser policy lets PostCSS polyfill separate CSS modules independently, raising Infima specificity above unlayered Cosmos. The generated-artifact audit requires native Infima layers and the unlayered Cosmos Outfit token. Tests process the installed Infima/Cosmos CSS through the actual PostCSS plugins.

Cosmos 2.2.6 supplies Outfit for body/headings and IBM Plex Mono for code, with local WOFF2 assets. Imported MDX in custom JSX pages must render inside `@theme/MDXContent`, otherwise ideal-image objects can reach native img elements as `[object Object]`. The synthetic MDX-provider regression covers this adapter boundary; homepage SSR does not exercise MDX.

`src/css/responsive-tables.css`, loaded through preset-classic customCss, contains wide Markdown tables locally with horizontal scrolling at every viewport. Its unlayered `main .markdown table` important declarations deliberately outrank Cosmos's important table rules. The authored Agent Mode provider comparison has a focusable, caption-labelled `.accessible-table-scroll` region; scoped rules put overflow on that region and restore native table display inside it. Keep these fixes scoped: do not substitute body/html overflow hiding. Verify keyboard scrolling, header announcements, and 320px/400% reflow in a real browser.

References: [Docusaurus cascade-layer configuration](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-css-cascade-layers), [upstream browser-target discussion](https://github.com/facebook/docusaurus/discussions/11700). Installed package source and generated output, rather than theme branding alone, establish these contracts.

## Accessibility verification gate

After `pnpm test` and `pnpm run check:content`, run the **full** `pnpm run build` for both `SITE_BASE_URL=/` and `/repoprompt-ce-user-docs/` with the same `SITE_URL` and `SITE_INDEXABLE` values recorded in the review. Inventory generated routes before testing; do not assume every source file becomes a page. Use the local build or record the exact deployed URL and revision. Never call the site WCAG 2.2 AA compliant from Node tests, Lighthouse, or screenshots alone.

For each result, record route, browser and assistive-technology versions, viewport/zoom, theme, keyboard sequence, observed behavior, criterion, status (`pass`, `fail`, `not tested`, or reasoned `not applicable`), and an issue link for failures. Check at minimum:

- Home: skip link, landmarks and heading navigation, diagrams in reading order, links, testimonial selection/status/focus, and rendered testimonial target boxes (at least 24×24 CSS pixels unless a documented WCAG 2.5.8 exception applies). For the prerecorded demo, record separate results for captions (1.2.2), audio description or an equivalent media alternative for essential visual information (1.2.5), player keyboard access, and blocked-embed behavior; a fallback link is not media-accessibility evidence.
- Current `/docs/`: tabs, sidebar/TOC, copy-code and copy-page feedback including clipboard denial, image zoom activation/Escape/focus return, and theme switch.
- Provider comparison: focus and horizontal scrolling, spoken row/column headers, and complete content at 320 CSS pixels and 400% zoom.
- Image-bearing CE docs and all three blog posts: alt against the pixels, zoom, headings, link purpose, and reflow.
- CE changelog, privacy, terms, blog index/listings, and an actual 404: headings, native details, navigation, focus, and reflow.
- Shared desktop/mobile navigation and version dropdown; search only if configured. Test Escape and focus return for overlays.

Test light and dark themes, keyboard-only use, VoiceOver/Safari and NVDA/Firefox, rendered contrast (record computed foreground/background and ratios), 200% text resizing, reduced motion, forced colors where available, and focus not obscured. Separately apply WCAG text-spacing overrides without lost content or functionality: line height 1.5× font size, paragraph spacing 2× font size, letter spacing 0.12× font size, and word spacing 0.16× font size. Use a view-only Classic regression check; never edit the archive. Keep unsupported third-party behavior or untested combinations open in `docs/reviews/wcag-2.2-aa-remediation.md`.

## Upgrades

Update exact package pins and lockfile together in a reviewed change. Confirm peer compatibility, v4 flags, and the actual Cosmos package. Recheck the shared Head alias, ideal-image AST adaptation, LLM plugin internal processor/generator calls, redirects template finalization, and Copy-page behavior. Use both root and project builds and both themes before approval. Run a separately authorized dependency vulnerability audit; do not confuse a successful build with a security audit.

If a framework update breaks an adapter, isolate a regression fixture, keep the old locked release, and fix/review before publication.

## Legal and editorial maintenance

The legal text is application prose, not a verified website policy. The owner must review controller obligations, jurisdiction, dates, analytics/crash statements, GitHub hosting, future Algolia processing, and license/prompt-content clauses. No contact mechanism should be invented to fill removed sections. Keep publication approvals unset until review is complete.

Descriptions on the CE collection and duplicate Classic overview pages were improved without rewriting bodies. Other historical descriptions retain generic boilerplate and can be refined incrementally. Historical model availability, prices, limits, and transport advice are not re-certified by automated checks.
