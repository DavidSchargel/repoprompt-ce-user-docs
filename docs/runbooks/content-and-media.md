# Content, versions, media, and machine-readable exports

## Editing policy

Edit the current MDX files directly. No separate source checkout is needed to build this site.

- Default collection: `versioned_docs/version-1.5.0/`, served at `/docs/`.
- Historical collection: `versioned_docs/version-classic-2.1.0/`, served at `/docs/classic-2.1.0/`.
- Explicit sidebars: `versioned_sidebars/`; public unversioned current docs are disabled.
- Three complete posts: `blog/`.
- Legal pages: `src/pages/privacy.mdx` and `terms.mdx`; warning text, noindex, and sitemap exclusion remain until owner review.
- Home content: `_home.mdx` imported by `index.js`, not a duplicate standalone route.
- Maintenance records: `maintainers/`, never public docs inputs.

Use meaningful unique descriptions, informative Markdown image alt text, fenced code with a language, accessible headings/tables, and relative source links for cross-version docs. Native anchors with `useBaseUrl` are reserved for generated `.txt` files so Docusaurus does not treat them as trailing-slash routes. Never weaken strict broken-link/anchor checks to hide a missing output.

The main docs page includes a TOC and keyboard-operable JSON/Bash tabs. Code blocks have standard copy controls; Copy page is supplied by the requested plugin. Changing a title/slug/heading can break bookmarks: update the frontmatter, sidebars, and legacy mapping together and run the checks. Do not manufacture new release snapshots from changelogs.

## Exclusions

No RepoBench page/code/post, Worker/account backend, Helpful Links footer, X/Twitter links/metadata, contact/email/officer blocks, translated pages, locale switchers, or localization feature content. The existing Classic screenshots are an owner-approved exception for historical media in Classic only; their pixels may show Bench or Worker text, but no corresponding page, code, post, or backend is imported. Other excluded screenshots remain prohibited. `/claim`, `/unsubscribe`, `/appcast`, `/pricing`, `/roadmap`, and `/prompt-anatomy` are redirect artifacts only. Framework English metadata and a literal code variable named X are not prohibited content. Never publish credentials from examples or screenshots.

## Images and Cosmos

Keep Markdown image syntax. Local PNG/JPEG imports pass through the remark adapter to the required ideal-image plugin. The image renderer emits native lazy-loading images with responsive srcset and informative alt text. Images do not open in a zoom overlay. WebP, SVG, remote images, and query/fragment image URLs keep the standard Docusaurus renderer because the pinned ideal-image pipeline does not support every format. Do not convert assets solely to make a plugin claim universal coverage.

Cosmos provides the actual CSS, self-hosted fonts, theme palettes, TOC/tables/code/details styling, and home cards/lifecycle badges/sidebar icons. Use its documented tokens/utilities rather than hard-coded theme colors. Test light/dark and narrow widths after UI changes.

Review newly added images visually for embedded excluded content and sensitive text; filenames and automated text scans cannot prove the pixels are safe.

## LLM pipeline and compatibility adapters

`pnpm run build` runs Docusaurus, finalizes redirect metadata/history, then finalizes LLM exports and audits all artifacts. Never substitute a bare `docusaurus build` for release validation.

The pinned llms plugin cleans MDX and supplies index/full-export generation. Its route inference did not preserve the version prefixes for this corpus and left relative source `.mdx` links in article bodies. The finalizer therefore uses its pinned processor/generator with routes read from current documentation frontmatter, writes 82 canonical-path `.md` exports, and rebuilds `llms.txt`/`llms-full.txt`. Each article's local document links become absolute, base-aware website URLs, preserving heading fragments. Code examples are not rewritten. Local images become alt text in exports; remote images remain. Old plugin-generated Markdown paths are removed from the generated build only.

This is intentionally a compatibility adapter, not a second source corpus. Internal plugin APIs and the Markdown-image AST bridge must be retested on dependency upgrades. Machine-readable exports include documentation only, not legal drafts, maintenance files, or blog drafts. Page-copy uses the rendered article independently of these static exports.

## Verification

```sh
pnpm run check:content
pnpm run build
```
