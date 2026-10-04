# Algolia DocSearch and legacy links

## Search is configuration-ready, not provisioned

All three variables are currently absent, so no search UI or requests should appear. Partial configuration fails immediately. The classic preset supplies the Algolia theme; do not register a duplicate search theme. Credentials alone do not prove search works: a real crawl and result verification are still required.

## Provisioning after publication approval

1. Confirm the public canonical origin/base path and approved privacy disclosures. Apply to the DocSearch program or arrange a separately authorized crawler/index. Eligibility is a service-owner decision.
2. Start with the official [Docusaurus v3 crawler template](https://docsearch.algolia.com/docs/templates/#docusaurus-v3-template). Set its start URL and sitemap to the exact approved base path, not the whole organization domain.
3. Crawl canonical HTML docs, approved pages, and full blog articles. Exclude redirect paths (`claim`, `unsubscribe`, `appcast`, `pricing`, `roadmap`, `prompt-anatomy`, `documentation`, `privacy-policy`, `terms-and-conditions`), 404, draft legal pages, search results, tag/archive listings where redundant, LLM text/Markdown exports, assets, and maintenance paths.
4. Retain the template's heading hierarchy/content selectors and Docusaurus language/version metadata extraction. Configure `language`, `docusaurus_tag`, and `type` facets as required by the template. Preserve distinct version tags for every published collection listed in [`versions.json`](../../versions.json). Confirm the exact tags against rendered metadata before crawling; do not hard-code the current release's tag into crawler instructions. English metadata is framework context, not a translated-site feature.
5. Use index-scoped search-only browser credentials. Restrict the key to the approved index and permitted origins/referrers where supported. Keep crawler/admin/write keys only in the service's secure configuration, never in source, GitHub public variables, build logs, or client bundles. Rotate a leaked admin key immediately.
6. Set `ALGOLIA_APP_ID`, `ALGOLIA_SEARCH_API_KEY`, and `ALGOLIA_INDEX_NAME` together as repository variables (the search key is public by design). No real credential values belong in example files.
7. Build using the actual production base. `contextualSearch: true` is intentional; `insights: false` avoids enabling optional analytics. Do not enable Ask AI or tracking as part of this handoff.
8. Trigger a crawl. In the resulting index, check unique canonical URLs, section hierarchy, all published version tags, and absence of excluded/draft content. Changes to initial index settings may require an index update/recreation through the service; do not assume a crawler edit updates existing settings.

## Acceptance tests with real credentials

- Search a distinctive phrase on CE and on Classic; confirm the appropriate version filter and no duplicate cross-edition hits.
- Open results and heading anchors under the project prefix. Check desktop modal, mobile search, keyboard focus/Escape, and empty/error states.
- Verify normal navigation with search requests blocked/offline.
- Confirm no requests occur when all credentials are removed. Partial configuration must fail; complete test values validate shape only, not service behavior.
- Recheck legal disclosures before public activation. Record crawl date, index name (not keys), tested routes, and result.

Reference: [Docusaurus search integration and contextual filtering](https://docusaurus.io/docs/search).

## Legacy routes

`src/utils/resolveLegacyHash.cjs` contains the legacy route mapping. Keep destinations allowlisted and test them against the current documentation routes. Section-only links select the recorded section landing; unknown/malformed/duplicate parameters fall back to `/docs/`. Ordinary heading fragments are untouched. Queries are preserved but never logged by the resolver.

The client module runs after route changes and on hashchange, adding baseUrl exactly once. Example project URL:

```text
/repoprompt-ce-user-docs/documentation/?source=old#s=mcp-server&ss=code-reviews
→ /repoprompt-ce-user-docs/docs/classic-2.1.0/code-reviews/overview/?source=old
```

Path aliases are static HTML client redirects, not server 301s. The finalizer adds noindex and history replacement. Required removed paths go to the homepage; they are not recreated as content pages. Unknown fragments require JavaScript for compatibility. Old-domain redirects remain an owner task in another repository and were not changed here.


After editing mappings: run `pnpm test`, `pnpm run check:content`, and the full build. Manually check initial loads, in-session hash changes, pathname aliases carrying hashes, back navigation, query retention, and plain heading links.
