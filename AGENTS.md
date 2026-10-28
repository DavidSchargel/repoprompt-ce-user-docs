# Instructions

- Only edit the current documentation version identified by the first entry in `versions.json`; do not edit classic-2.1.0 or any previous version.
- Keep documentation evergreen wherever possible; avoid release-specific wording except where version history or compatibility requires it.
- Must adhere to WCAG 2.2 AA guidelines.
- Maintain Providers & Models as the canonical reference; link to it and avoid fixed model lists and individual model names whenever possible.
- Do not use Xcode, execute application Swift code, run app diagnostic tests, invoke build scripts, or create/run self-contained Swift utilities unless instructed to do so. Prefer inspecting application source code (if available) and documentation assets directly.
- Keep original screenshots in `source-assets/documentation-screenshots/` and native-resolution crops in the target version’s section `images/` directory.
- When adding or updating dependencies, review their licenses, copyright notices, and bundled assets. Update `THIRD_PARTY_NOTICES.md`, `NOTICE`, and `ThirdPartyLicenses/` when the listed components or required attribution changes; a version-only bump does not require a text change when the notices remain valid.
- Do not use ADRs for this project.
