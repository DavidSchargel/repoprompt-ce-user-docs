# Third-party notices

Original documentation and site code are licensed under [Apache-2.0](LICENSE).
That license does not replace the terms for third-party dependencies, fonts,
quoted material, or marks shown in screenshots.

## Direct site dependencies

The table below records licensing information for the listed direct site
dependencies. `package.json` records the direct dependency versions, and
`pnpm-lock.yaml` records the resolved dependency graph. License copies preserve
the upstream text from the installed packages.

| Component | Declared license | Preserved upstream notices |
| --- | --- | --- |
| [@docusaurus/core](https://github.com/facebook/docusaurus) | MIT | [LICENSE](ThirdPartyLicenses/docusaurus__core/LICENSE) |
| [@docusaurus/faster](https://github.com/facebook/docusaurus) | MIT | [LICENSE](ThirdPartyLicenses/docusaurus__faster/LICENSE) |
| [@docusaurus/plugin-client-redirects](https://github.com/facebook/docusaurus) | MIT | [LICENSE](ThirdPartyLicenses/docusaurus__plugin-client-redirects/LICENSE) |
| [@docusaurus/plugin-ideal-image](https://github.com/facebook/docusaurus) | MIT | [LICENSE](ThirdPartyLicenses/docusaurus__plugin-ideal-image/LICENSE) |
| [@docusaurus/preset-classic](https://github.com/facebook/docusaurus) | MIT | [LICENSE](ThirdPartyLicenses/docusaurus__preset-classic/LICENSE) |
| [@easyops-cn/docusaurus-search-local](https://github.com/easyops-cn/docusaurus-search-local) | MIT | [Upstream v0.55.3 LICENSE](ThirdPartyLicenses/docusaurus-search-local/LICENSE) |
| [@mdx-js/react](https://github.com/mdx-js/mdx) | MIT | [license](ThirdPartyLicenses/mdx-js__react/license) |
| [cosmos-docusaurus-theme](https://github.com/SckyzO/cosmos-docusaurus-theme) | MIT | [LICENSE](ThirdPartyLicenses/cosmos-docusaurus-theme/LICENSE) |
| [docusaurus-plugin-copy-page-button](https://github.com/portdeveloper/docusaurus-plugin-copy-page-button) | MIT | License file absent from installed package; see note below. |
| [docusaurus-plugin-image-zoom](https://github.com/gabrielcsapo/docusaurus-plugin-image-zoom) | MIT | [LICENSE](ThirdPartyLicenses/docusaurus-plugin-image-zoom/LICENSE) |
| [docusaurus-plugin-llms](https://github.com/rachfop/docusaurus-plugin-llms) | MIT | License file absent from installed package; see note below. |
| [react](https://github.com/facebook/react) | MIT | [LICENSE](ThirdPartyLicenses/react/LICENSE) |
| [react-dom](https://github.com/facebook/react) | MIT | [LICENSE](ThirdPartyLicenses/react-dom/LICENSE) |
| [react-icons](https://github.com/react-icons/react-icons) | MIT for package code; icon-set licenses apply separately | [LICENSE and icon-set notices](ThirdPartyLicenses/react-icons/LICENSE) |
| [react-tweet](https://github.com/vercel/react-tweet) | MIT | [license.md](ThirdPartyLicenses/react-tweet/license.md) |

The local-search package declares MIT but does not ship a root license file; its
preserved license is from the upstream v0.55.3 release. It ships JavaScript,
CSS, and locale data, but no separate fonts or image assets. Its newly resolved
transitive packages retain their own licenses as recorded in package metadata.

The installed `docusaurus-plugin-copy-page-button` and `docusaurus-plugin-llms`
packages declare MIT in their package metadata and READMEs but do not ship a
standalone license file at the package root. Their source repositories are linked
above. This inventory records that gap rather than inventing copyright notices;
obtain the applicable upstream license text before redistributing those packages
or their code as a separate bundle.

## Search runtime dependencies

The local-search dependency brings these packages into its search/build runtime.
Their upstream license files are preserved from the installed packages;
`pnpm-lock.yaml` records the resolved versions. No separate fonts or image
assets were found in the installed local-search package.

| Component | Declared license | Preserved upstream notice |
| --- | --- | --- |
| [@easyops-cn/autocomplete.js](https://github.com/easyops-cn/autocomplete.js) | MIT | [LICENSE](ThirdPartyLicenses/search-runtime/autocomplete.LICENSE) |
| [Comlink](https://github.com/GoogleChromeLabs/comlink) | Apache-2.0 | [LICENSE](ThirdPartyLicenses/search-runtime/comlink.LICENSE) |
| [entities](https://github.com/fb55/entities) | BSD-2-Clause | [LICENSE](ThirdPartyLicenses/search-runtime/entities.LICENSE) |
| [lunr](https://github.com/olivernn/lunr.js) | MIT | [LICENSE](ThirdPartyLicenses/search-runtime/lunr.LICENSE) |
| [lunr-languages](https://github.com/MihaiValentin/lunr-languages) | MPL-1.1 | [LICENSE](ThirdPartyLicenses/search-runtime/lunr-languages.LICENSE) |
| [mark.js](https://github.com/julmot/mark.js) | MIT | [LICENSE](ThirdPartyLicenses/search-runtime/mark.js.LICENSE) |

## Icons supplied through react-icons

The site's source imports the following icon sets. Their licenses are identified
in the installed `react-icons` package; the package's MIT license does not
replace these icon licenses.

| Icon set | License | Preserved upstream notices |
| --- | --- | --- |
| [Feather](https://feathericons.com/) (`react-icons/fi`) | MIT | [LICENSE](ThirdPartyLicenses/feather/LICENSE) |
| [Font Awesome Free](https://fontawesome.com/) (`react-icons/fa`) | CC BY 4.0 for SVG/JS icons | [Upstream license notice](ThirdPartyLicenses/font-awesome/LICENSE.txt), [CC BY 4.0 text](ThirdPartyLicenses/font-awesome/CC-BY-4.0.txt) |

Feather is copyright (c) 2013–2023 Cole Bemis. The homepage uses its
`FiArrowDown`, `FiArrowUpRight`, `FiCheck`, `FiDownload`, and `FiGithub` icons.
The header also uses `FiGithub`.

Font Awesome Free icons are by [Font Awesome](https://fontawesome.com/), licensed
under [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).
The homepage uses `FaApple`; retained component source also imports
`FaArrowRight` and `FaChartBar`. These icons are provided as React components by
`react-icons` and styled and sized by the site; this repository does not edit
their path geometry. Brand icons remain trademarks of their respective owners.
The upstream notice also describes font and code licenses; the site's
`react-icons/fa` imports use SVG/JS icons, not Font Awesome font files.

See [source provenance](ThirdPartyLicenses/homepage-sources.md) for the package
files and upstream revisions used to preserve these notices.

## Embedded posts

The `react-tweet` MIT license covers the rendering package, not the posts,
avatars, linked media, or trademarks displayed through it. Those materials
retain their respective rights and attribution. The site's testimonial embeds
retain author names and links to the original posts.

## Bundled fonts

The Cosmos theme includes Outfit and IBM Plex Mono, licensed under the SIL Open
Font License 1.1. The theme's [font notices and full license text](ThirdPartyLicenses/cosmos-fonts/OFL.txt)
are preserved together, including each font's copyright attribution. The font
license is separate from the theme's MIT license.

## Documentation, screenshots, and trademarks

The [Code of Conduct](CODE_OF_CONDUCT.md) is adapted from
[Contributor Covenant 3.0](https://www.contributor-covenant.org/version/3/0/),
stewarded by the Organization for Ethical Source and licensed under
[Creative Commons Attribution-ShareAlike 4.0 International](https://creativecommons.org/licenses/by-sa/4.0/).
It retains that license rather than Apache-2.0. The adaptation removes the
template's editorial note about selecting an enforcement process.

RepoPrompt screenshots and examples may depict third-party product names,
interfaces, and logos. Their inclusion explains how to use RepoPrompt and does
not imply endorsement or grant rights to third-party trademarks. Retain any
source-specific attribution when reusing quoted or adapted material.

The native application's dependencies are documented separately in the
[RepoPrompt CE third-party notices](https://github.com/repoprompt/repoprompt-ce/blob/main/THIRD_PARTY_NOTICES.md).
Describing the application here does not make its native dependency inventory
the inventory for this website.

## Maintaining and redistributing notices

This is an inventory of direct dependencies, imported icon sets, and bundled fonts, not an exhaustive
license inventory of every transitive dependency or generated website asset.
Build tooling and transitive packages retain their own licenses even when they
are absent from this table.

When updating dependencies, review the declared licenses and refresh preserved
notices from the actual packages. Before redistributing a built site or
dependency bundle, review the components included in that output and carry
forward their required license, copyright, and NOTICE material, including
notices in generated JavaScript and font assets. Keep [LICENSE](LICENSE) and
[NOTICE](NOTICE) with distributions of this repository. These attribution files
do not change upstream license terms.
