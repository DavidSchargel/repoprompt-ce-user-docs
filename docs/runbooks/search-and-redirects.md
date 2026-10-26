# Site search and legacy links

## Default local docs search

When the three Algolia variables are absent or empty, the site builds a local, full-text
index of the published `/docs/` routes. The navbar search control appears only
on docs routes, immediately before the version menu. It requires no external
service or browser credentials, and its results stay within docs. The local
index is intentionally generated even when the site's `noIndex` flag is set;
`noIndex` still controls search-engine indexing of the site.

All three Algolia variables may instead be supplied together to use DocSearch.
Partial configuration fails immediately. The classic preset supplies the
Algolia theme; the local-search theme is disabled in that case to avoid duplicate
search providers. Credentials alone do not prove Algolia search works: a real
crawl and result verification are still required.

The switch is configured in [`docusaurus.config.js`](../../docusaurus.config.js),
and [`SearchNavbarItem`](../../src/theme/NavbarItem/SearchNavbarItem.js) limits the
control to docs routes, including the Classic archive. Test local search against
a production build; a development preview alone does not verify the generated index.

## Configure optional Algolia search

1. Confirm the public canonical origin/base path and the site's privacy disclosures before activating the external service. Apply to the DocSearch program or arrange a crawler/index. Eligibility is a service-owner decision; deploying this repository does not provision an Algolia index.
2. Start with the official [Docusaurus v3 crawler template](https://docsearch.algolia.com/docs/templates/#docusaurus-v3-template). Set its start URL and sitemap to the exact approved base path, not the whole organization domain.
3. Crawl only canonical HTML under the configured base path plus `/docs/`, including each published version. Do not index Home, Blog, or standalone pages: the search control is docs-only, and Docusaurus contextual filtering can otherwise surface non-docs results. Exclude redirect paths, 404, search results, LLM text/Markdown exports, assets, and maintenance paths.
4. Retain the template's heading hierarchy/content selectors and Docusaurus language/version metadata extraction. Configure `language`, `docusaurus_tag`, and `type` facets as required by the template. Preserve distinct version tags for every published collection listed in [`versions.json`](../../versions.json). Confirm the exact tags against rendered metadata before crawling; do not hard-code the current release's tag into crawler instructions. English metadata is framework context, not a translated-site feature.
5. Use index-scoped search-only browser credentials. Restrict the key to the approved index and permitted origins/referrers where supported. Keep crawler/admin/write keys only in the service's secure configuration, never in source, GitHub public variables, build logs, or client bundles. Rotate a leaked admin key immediately.
6. Set `ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_API_KEY`, and `ALGOLIA_INDEX_NAME` together as repository variables for Actions, or export them locally before building (the search key is public by design). `.env.local` is not loaded automatically; follow the [configuration procedure](publishing.md#local-configuration). No real credential values belong in committed example files.
7. Build using the actual production base. `contextualSearch: true` is intentional; `insights: false` avoids enabling optional analytics. Do not enable Ask AI or tracking as part of this handoff.
8. Trigger a crawl. In the resulting index, check unique canonical URLs, section hierarchy, all published version tags, and absence of excluded/draft content. Changes to initial index settings may require an index update/recreation through the service; do not assume a crawler edit updates existing settings.

## Acceptance tests

- With all Algolia variables absent or empty, run `pnpm run build` and preview with `pnpm run serve`. Confirm the generated local indexes contain CE and Classic docs content. Search a distinctive phrase in each version, open a result, and check its version, heading anchor, keyboard focus, Escape, mobile layout, and empty states. Confirm Home and Blog have no search control.
- With real Algolia credentials and a completed docs-only crawl, search a distinctive phrase on CE and on Classic; confirm the appropriate version filter, no non-docs hits, and no duplicate cross-edition hits.
- Open results and heading anchors under the project prefix. Check desktop modal, mobile search, keyboard focus/Escape, and empty/error states.
- Verify normal navigation with search requests blocked/offline.
- Check the search control's accessible name, keyboard entry, result navigation and activation, Escape behavior, and focus return. Review how loading, empty results, and errors are communicated without relying only on color or animation. Test both narrow and wide layouts at zoom; an automated index check does not establish that the search interface is accessible.
- Confirm no Algolia requests occur when all credentials are removed; local index requests are expected on docs routes. Partial configuration must fail; complete test values validate shape only, not service behavior.
- Recheck disclosures before enabling or changing the external search service on the live site. Record the commit, search mode, base path, tested routes, and result. For Algolia, also record the crawl date and index name, never keys.

Reference: [Docusaurus search integration and contextual filtering](https://docusaurus.io/docs/search).

## Legacy routes

[`src/utils/resolveLegacyHash.cjs`](../../src/utils/resolveLegacyHash.cjs) contains the legacy `#s=...&ss=...` route mapping. Keep destinations allowlisted and test them against the registered documentation routes. Section-only links select the recorded section landing. Unknown section/subsection combinations, missing sections, or duplicate `s`/`ss` parameters fall back to `/docs/`. Ordinary heading fragments are untouched. The [client module](../../src/clientModules/legacyHashRedirect.js) preserves the URL query without logging it.

The client module runs after route changes and on hashchange, adding baseUrl exactly once. Example project URL:

```text
/repoprompt-ce-user-docs/documentation/?source=old#s=mcp-server&ss=code-reviews
→ /repoprompt-ce-user-docs/docs/classic-2.1.0/code-reviews/overview/?source=old
```

Path aliases are declared in [`docusaurus.config.js`](../../docusaurus.config.js) and generated as static HTML client redirects, not server 301s. [`finalize-redirects.cjs`](../../scripts/finalize-redirects.cjs) adds `noindex,follow` and history replacement. The configured aliases cover:

- `/documentation` → `/docs/`.
- The former Agent Mode sessions/providers routes and their short section routes → the current section overview pages.
- `/privacy-policy` and `/terms-and-conditions` → the corresponding standalone pages.
- `/claim`, `/unsubscribe`, `/appcast`, `/pricing`, `/roadmap`, and `/prompt-anatomy` → the homepage.

Legacy hash conversion requires JavaScript. Redirects from another domain require configuration at that domain's host; this repository only controls its own generated paths.

For renamed source documents, [`remark-doc-moves.cjs`](../../plugins/remark-doc-moves.cjs) resolves the recorded old links during MDX compilation and LLM export. Update current references directly; use this adapter for links in the immutable Classic archive. Keep source moves, public aliases, and legacy hash destinations consistent.

After editing mappings, run the unit/content checks and a full build. Manually check initial loads, in-session hash changes, pathname aliases carrying hashes, back navigation, query retention, and ordinary heading links. Prefer generated heading IDs; when renaming a published heading, preserve its old ID where needed for existing bookmarks and update internal fragment links. Verify redirects again on the live deployment after publishing.
