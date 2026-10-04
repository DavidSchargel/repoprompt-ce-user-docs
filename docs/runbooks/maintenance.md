# Validation and maintenance

## Validation layers

1. `pnpm test`: metadata policy, image rendering, and LLM transformation.
2. `pnpm run check:content`: current documentation, sidebar, link, and asset checks.
3. `pnpm run build`: tests, strict production build, redirect/LLM finalizers, image/SEO artifact checks.
4. Owner-authorized live Pages and Algolia tests remain separate.

`pnpm run check:artifacts` is read-only, but must receive the same SITE_URL/SITE_BASE_URL/SITE_INDEXABLE values used to build. The build directory always contains only the most recent configuration. Do not compare a project-path artifact against default root config.

## Cosmos rendering contract

`package.json` targets `defaults and supports css-cascade-layers` in production and development. Native cascade-layer support is required; legacy browsers outside that intersection are not supported. Keep `future.v4: true` and the actual Cosmos theme. Do not replace this with a font override or switch off v4 layers: a missing browser policy lets PostCSS polyfill separate CSS modules independently, raising Infima specificity above unlayered Cosmos. The generated-artifact audit requires native Infima layers and the unlayered Cosmos Outfit token. Tests process the installed Infima/Cosmos CSS through the actual PostCSS plugins.

Cosmos 2.2.6 supplies Outfit for body/headings and IBM Plex Mono for code, with local WOFF2 assets. Imported MDX in custom JSX pages must render inside `@theme/MDXContent`, otherwise ideal-image objects can reach native img elements as `[object Object]`. The home SSR regression covers this provider/adapter boundary.

`src/css/responsive-tables.css`, loaded through preset-classic customCss, contains wide Markdown tables locally with horizontal scrolling at every viewport. Its `main .markdown table` selector and important declarations deliberately outrank Cosmos's important table rules without clipping the page or rewriting code. Keep this fix scoped: do not substitute body/html overflow hiding.

References: [Docusaurus cascade-layer configuration](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-css-cascade-layers), [upstream browser-target discussion](https://github.com/facebook/docusaurus/discussions/11700). Installed package source and generated output, rather than theme branding alone, establish these contracts.

## Upgrades

Update exact package pins and lockfile together in a reviewed change. Confirm peer compatibility, v4 flags, and the actual Cosmos package. Recheck the shared Head alias, ideal-image AST adaptation, LLM plugin internal processor/generator calls, redirects template finalization, and Copy-page behavior. Use both root and project builds and both themes before approval. Run a separately authorized dependency vulnerability audit; do not confuse a successful build with a security audit.

If a framework update breaks an adapter, isolate a regression fixture, keep the old locked release, and fix/review before publication.

## Legal and editorial maintenance

The legal text is application prose, not a verified website policy. The owner must review controller obligations, jurisdiction, dates, analytics/crash statements, GitHub hosting, future Algolia processing, and license/prompt-content clauses. No contact mechanism should be invented to fill removed sections. Keep publication approvals unset until review is complete.

Descriptions on the CE collection and duplicate Classic overview pages were improved without rewriting bodies. Other historical descriptions retain generic boilerplate and can be refined incrementally. Historical model availability, prices, limits, and transport advice are not re-certified by automated checks.
