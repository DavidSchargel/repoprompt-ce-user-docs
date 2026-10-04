# Third-party notices

Original documentation and site code are licensed under [Apache-2.0](LICENSE.md).
That license does not replace the terms for third-party dependencies, fonts,
quoted material, or marks shown in screenshots.

## Direct site dependencies

The inventory below records the versions declared in `package.json`, checked
against installed package metadata. License copies preserve the upstream text
from those installed packages. `pnpm-lock.yaml` records the resolved dependency
graph, including transitive dependencies.

| Component | Version | Declared license | Preserved upstream notices |
| --- | --- | --- | --- |
| [@docusaurus/core](https://github.com/facebook/docusaurus) | 3.10.2 | MIT | [LICENSE](ThirdPartyLicenses/docusaurus__core/LICENSE) |
| [@docusaurus/faster](https://github.com/facebook/docusaurus) | 3.10.2 | MIT | [LICENSE](ThirdPartyLicenses/docusaurus__faster/LICENSE) |
| [@docusaurus/plugin-client-redirects](https://github.com/facebook/docusaurus) | 3.10.2 | MIT | [LICENSE](ThirdPartyLicenses/docusaurus__plugin-client-redirects/LICENSE) |
| [@docusaurus/plugin-ideal-image](https://github.com/facebook/docusaurus) | 3.10.2 | MIT | [LICENSE](ThirdPartyLicenses/docusaurus__plugin-ideal-image/LICENSE) |
| [@docusaurus/preset-classic](https://github.com/facebook/docusaurus) | 3.10.2 | MIT | [LICENSE](ThirdPartyLicenses/docusaurus__preset-classic/LICENSE) |
| [@mdx-js/react](https://github.com/mdx-js/mdx) | 3.1.1 | MIT | [license](ThirdPartyLicenses/mdx-js__react/license) |
| [cosmos-docusaurus-theme](https://github.com/SckyzO/cosmos-docusaurus-theme) | 2.2.6 | MIT | [LICENSE](ThirdPartyLicenses/cosmos-docusaurus-theme/LICENSE) |
| [docusaurus-plugin-copy-page-button](https://github.com/portdeveloper/docusaurus-plugin-copy-page-button) | 0.8.4 | MIT | License file absent from installed package; see note below. |
| [docusaurus-plugin-llms](https://github.com/rachfop/docusaurus-plugin-llms) | 0.6.0 | MIT | License file absent from installed package; see note below. |
| [react](https://github.com/facebook/react) | 19.2.4 | MIT | [LICENSE](ThirdPartyLicenses/react/LICENSE) |
| [react-dom](https://github.com/facebook/react) | 19.2.4 | MIT | [LICENSE](ThirdPartyLicenses/react-dom/LICENSE) |

The installed `docusaurus-plugin-copy-page-button` and `docusaurus-plugin-llms`
packages declare MIT in their package metadata and READMEs but do not ship a
standalone license file at the package root. Their source repositories are linked
above. This inventory records that gap rather than inventing copyright notices;
obtain the applicable upstream license text before redistributing those packages
or their code as a separate bundle.

## Bundled fonts

Cosmos 2.2.6 includes Outfit and IBM Plex Mono, licensed under the SIL Open Font
License 1.1. The theme's [font notices and full license text](ThirdPartyLicenses/cosmos-fonts/OFL.txt)
are preserved together, including each font's copyright attribution. The font
license is separate from the theme's MIT license.

## Documentation, screenshots, and trademarks

RepoPrompt screenshots and examples may depict third-party product names,
interfaces, and logos. Their inclusion explains how to use RepoPrompt and does
not imply endorsement or grant rights to third-party trademarks. Retain any
source-specific attribution when reusing quoted or adapted material.

The native application's dependencies are documented separately in the
[RepoPrompt CE third-party notices](https://github.com/repoprompt/repoprompt-ce/blob/main/THIRD_PARTY_NOTICES.md).
Describing the application here does not make its native dependency inventory
the inventory for this website.

## Maintaining and redistributing notices

This is an inventory of direct dependencies and bundled fonts, not an exhaustive
license inventory of every transitive dependency or generated website asset.
Build tooling and transitive packages retain their own licenses even when they
are absent from this table.

When updating dependencies, refresh the versions and preserved notices from the
actual packages. Before redistributing a built site or dependency bundle, review
the components included in that output and carry forward their required license,
copyright, and NOTICE material, including notices in generated JavaScript and
font assets. Keep [LICENSE.md](LICENSE.md) and [NOTICE](NOTICE) with distributions
of this repository. These attribution files do not change upstream license terms.
