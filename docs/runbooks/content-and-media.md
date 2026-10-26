# Content, versions, media, and machine-readable exports

## Editing policy

Edit the current MDX files directly. No separate source checkout is needed to build this site. Read [`AGENTS.md`](../../AGENTS.md) before making changes; application source, when available, is evidence for product behavior, not an instruction to run the application or its build.

- Default collection: `versioned_docs/version-<current version>/`, where the current version is the first entry in [`versions.json`](../../versions.json), served at `/docs/`. Check the version routes in [`docusaurus.config.js`](../../docusaurus.config.js) when working on version selection or navigation.
- Historical collection: `versioned_docs/version-classic-2.1.0/`, served at `/docs/classic-2.1.0/`. Do not create or edit files in this archive.
- Explicit sidebars: `versioned_sidebars/`; public unversioned current docs are disabled.
- Blog posts: `blog/`.
- Legal pages: `src/pages/privacy.mdx` and `terms.mdx`; warning text, noindex, and sitemap exclusion remain until owner review.
- Home content: `src/pages/index.js` composes React components from `src/components/home/`; there is no `_home.mdx` source route.
- Runbooks and review records: `docs/runbooks/` and `docs/reviews/`. These are not published documentation inputs.
- Original screenshots: `source-assets/documentation-screenshots/`. Documentation crops belong in the relevant section's `images/` directory; shared site assets live in `static/`.

Use meaningful unique descriptions, a logical heading hierarchy, descriptive link text, fenced code with a language, and relative source links between documentation files. Give informative images alt text that conveys their purpose. Use empty alt only for genuinely decorative images; the content checker currently accepts it only for reviewed Settings assets whose hashes match [`scripts/decorative-settings-images.json`](../../scripts/decorative-settings-images.json). Do not omit alt or duplicate adjacent link text in linked-image alt. Tables need a visible caption, column and row headers where applicable, and keyboard-reachable overflow when wider than the viewport. For titled admonitions, use directive syntax such as `:::note[Configuration]`; the older space-separated title syntax renders as plain text with this configuration. For generated `.txt` downloads, use a native anchor with `useBaseUrl` so Docusaurus does not treat the file as a trailing-slash route. Never weaken strict broken-link/anchor checks to hide a missing output.

The main docs page includes a TOC and JSON/Bash tabs; verify their keyboard behavior during browser review. Code blocks have standard copy controls; the configured plugin supplies Copy page. Use automatically generated heading IDs by default. When renaming a published heading, check internal links and preserve its old bookmark ID when compatibility is needed; update internal fragment links as appropriate. Add an explicit heading ID only for a demonstrated stable-link requirement. When changing titles or routes, update affected frontmatter, sidebars, and legacy mappings and run the checks. Do not manufacture new release snapshots from changelogs.

## Exclusions

No RepoBench page/code/post, Worker/account backend, Helpful Links footer, X/Twitter links/metadata, contact/email/officer blocks, translated pages, locale switchers, or localization feature content. The existing Classic screenshots are an owner-approved exception for historical media in Classic only; their pixels may show Bench or Worker text, but no corresponding page, code, post, or backend is imported. Other excluded screenshots remain prohibited. `/claim`, `/unsubscribe`, `/appcast`, `/pricing`, `/roadmap`, and `/prompt-anatomy` are redirect artifacts only. Framework English metadata and a literal code variable named X are not prohibited content. Never publish credentials from examples or screenshots.

## Images and Cosmos

Keep Markdown image syntax. Local PNG/JPEG imports pass through [`remark-ideal-images.cjs`](../../plugins/remark-ideal-images.cjs) and the ideal-image plugin. The [image component](../../src/theme/MDXComponents/Img/index.js) emits lazy-loading images with responsive `srcset`, preserves alt text, and uses the original lossless import for the largest candidate and zoom source. Keep crops at native resolution; do not upscale them. WebP, SVG, remote images, and query/fragment image URLs keep the standard renderer. The zoom plugin applies to `.markdown img`; keyboard activation, dismissal, and focus return still require browser verification.

Cosmos provides the actual CSS, self-hosted fonts, theme palettes, TOC/tables/code/details styling, and home cards/lifecycle badges/sidebar icons. Use its documented tokens/utilities rather than hard-coded theme colors. Test light/dark and narrow widths after UI changes.

Review newly added images visually for embedded excluded content, sensitive text, and whether the authored alt accurately describes the image's purpose; filenames and automated text scans cannot prove the pixels are safe. Check captions and audio description for any embedded video; a fallback link alone does not establish accessible media.

## Workflow and skill terminology

Use **workflow** for a task's process, **workflow template** for instructions selected in the in-app Workflow control, and **workflow instructions** for the procedure supplied to an external MCP or CLI host. Use **skill** when discussing a discoverable skill package, its files, or the host's skill mechanism. Preserve literal UI labels such as **Skills** and **MCP skills**, and filenames such as `SKILL.md`; some installation targets use prompt files instead of skill folders. Installing instructions and connecting MCP tools are separate operations.

## Provider and model information ownership

The current CE collection's `providers/` section is the canonical reference for provider and shared model information. Keep it independent of Agent Mode, Settings, Oracle, Context Builder, and the payment FAQ because those features use different parts of the same connections.

| Information | Owner |
| --- | --- |
| Supported integration roster, comparison, and CLI/API distinctions | `providers/overview.mdx` |
| Setup prerequisites, authentication/account boundary, capabilities, limitations, billing route, and official catalog links | One `providers/<integration>.mdx` page per integration |
| Model discovery, identifiers, aliases, effort, service tiers, roles, and interpreting recommendations | `providers/models.mdx` |
| Settings fields, buttons, scope, saved state, and screenshots | The corresponding `settings/` page, linking to the provider reference |
| Using composer controls, workflow behavior, routing eligibility, and privacy | The corresponding feature guide, linking to shared provider/model concepts |
| Brief answer about application cost versus service charges | Payment FAQ, linking to the canonical provider reference |

Keep coding-agent providers in the requested order: Codex CLI, Claude Code CLI, OpenCode CLI, Cursor CLI, Grok Build, Google Antigravity, Devin CLI, CC Zai, CC Moonshot, CC Custom. Keep CLI and API integrations distinct even when they share a company name or saved credential.

Prefer capabilities and connection-discovered choices over release-specific model lists or fixed named recommendations. Screenshots may retain captured model names; describe them as examples. Preserve names needed for historical changelogs. If a current guide genuinely requires a release-specific model claim, qualify its app version or review date, keep the claim on its provider page, and link to it elsewhere. Settings can explain literal field labels and values without becoming a second provider catalog.

When a canonical document moves, update current links, sidebar entries, legacy hash destinations, and public redirects. Use the shared document-move resolver for archived source links and LLM exports so the Classic archive remains unmodified.

## LLM pipeline and compatibility adapters

`pnpm run build` runs tests and content checks before Docusaurus, then finalizes redirect metadata/history, finalizes LLM exports, and audits artifacts. Never substitute a bare `docusaurus build` for release validation. See the [maintenance guide](maintenance.md) for validation scope and the [publishing guide](publishing.md) for local build configuration.

The pinned llms plugin cleans MDX and supplies index/full-export generation. Its route inference did not preserve the version prefixes for this corpus and left relative source `.mdx` links in article bodies. The finalizer therefore uses its pinned processor/generator with routes read from current documentation frontmatter, writes canonical-path `.md` exports for every documentation page, and rebuilds `llms.txt`/`llms-full.txt`. Each article's local document links become absolute, base-aware website URLs, preserving heading fragments. Code examples are not rewritten. Local images become alt text in exports; remote images remain. Old plugin-generated Markdown paths are removed from the generated build only.

This is intentionally a compatibility adapter, not a second source corpus. Internal plugin APIs and the Markdown-image AST bridge must be retested on dependency upgrades. Machine-readable exports include documentation only, not legal drafts, maintenance files, or blog drafts. Page-copy uses the rendered article independently of these static exports.

## Verification

```sh
pnpm run check:content
pnpm run build
```

## Versioning and Settings screenshots

The Settings section belongs to the current CE collection.
When preparing a later CE documentation version, copy the current CE collection
and its explicit sidebar together, including `settings/` and its local `images/`
folder. Then update the version registration and version-specific content. Keep
relative MDX and image links so they resolve inside the new collection. Never
copy this section into the Classic archive or use Classic as the next-version
template. No future release snapshot is created in advance.

Keep Settings navigation aligned with the actual application. A search field is
not a settings group, and a control found in source is not necessarily a separate
navigation page. Explain controls in their owning page and link to canonical
provider or feature documentation instead of duplicating it.

Preserve permitted source captures and record crop coordinates, redactions,
source hashes, and destination paths when adding or replacing screenshots. The
existing [October 4 Settings manifest](../../source-assets/documentation-screenshots/2026-10-04-settings-manifest.json)
records that capture set; it is not an inventory of every later screenshot.
Remove personal account values and secrets before committing captures. Treat
visible selections and model names as examples, not recommended defaults.
