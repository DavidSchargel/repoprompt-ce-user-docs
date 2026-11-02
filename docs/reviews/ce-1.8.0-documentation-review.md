# CE 1.8.0 documentation review ledger

## Scope and status

Item 2 implementation record, 2026-11-01. Item 1's complete handoff inventory is preserved below, including its 248 changed-path classifications, 17 feature groups, commit-pinned evidence links, destination routes, 234-image asset inventory, hashes, and existing crop provenance. Its historical future-tense instructions describe the inventory stage; the implementation dispositions here supersede those proposed actions. No application code, historical collection, historical sidebar, or source capture is edited.

- Plan: `prompt-exports/oracle-plan-2026-11-01-114803-published-release-do-94d9.md`, item 1 completion and execution clarification read.
- Handoff: `/tmp/ce-1.8.0-documentation-inventory.md`; preserved in full below so review does not depend on a temporary file.
- Instructions: root `AGENTS.md`, supplied global instructions, and `docs/runbooks/{content-and-media,maintenance,publishing}.md` read. No nested tracked documentation AGENTS file was found. App instructions were read from the pinned release object; they do not authorize application execution.
- Item 3 is **not performed**: no unit tests, full builds, artifact inspection, Oracle review, browser/assistive-technology review, or publication. Lightweight content-check results are recorded separately below.
- No app launch, UI capture, Swift execution, diagnostics, app tests/builds, dependency installation, commit, push, PR, deployment, sibling edit, or worktree rebinding.

## Execution-location safety attestation

All repository operations used the explicit intended documentation root, never implicit primary-root routing:

```text
resolved cwd / repository root:
/Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs
absolute Git directory:
/Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs/.git
common directory returned by Git: .git
resolved common directory:
/Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs/.git
branch: main
HEAD: c1534583abc590f2a527dd0a71311316436919e0
full git status --porcelain=v1 --untracked-files=all: <empty>
git branch --list content/1.8.0-update: <empty>
git worktree list --porcelain:
worktree /Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs
HEAD c1534583abc590f2a527dd0a71311316436919e0
branch refs/heads/main
```

The first sandboxed branch switch failed to create `.git/index.lock` because Git metadata is read-only in the sandbox. The sequence stopped before copying or registration. One-time elevated access was then used only for this exact local command (no persistent prefix):

```sh
git -C /Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs switch -c content/1.8.0-update c1534583abc590f2a527dd0a71311316436919e0
```

It succeeded. Branch/HEAD/empty full porcelain were checked again before the copy. No reset, stash, discard, checkout fallback, or binding attempt was used.

### Copy/register/edit sequence

1. Copied the **entire** `versioned_docs/version-1.7.0/` to `versioned_docs/version-1.8.0/`: **344 files**, verified byte-identical immediately after copying, including all Settings and image files.
2. Copied the explicit `versioned_sidebars/version-1.7.0-sidebars.json` to `versioned_sidebars/version-1.8.0-sidebars.json`.
3. Prepended `1.8.0` to `versions.json`, before any copied-content edit. Order: `1.8.0`, `1.7.0`, `1.6.0`, `classic-2.1.0`.
4. Edited only copied 1.8.0 content and this new ledger. Sidebar IDs and routes are preserved; no new navigation page is needed. The existing config derives current-version routing from `versions.json`, and the decorative-image validator already derives eligible directories from registered versions and checks image bytes. No shared-site or validation compatibility change was necessary.

## Publication evidence

Read-only GitHub release-page/API and appcast retrieval on 2026-11-01 independently confirms publication, not execution of the distributed app:

- [Application v1.8.0 release](https://github.com/repoprompt/repoprompt-ce/releases/tag/v1.8.0), [release API](https://api.github.com/repos/repoprompt/repoprompt-ce/releases/tags/v1.8.0): tag `v1.8.0`, `draft=false`, `prerelease=false`, build **41**, `Release-Commit: 37c06d9a7d798373b55d4294474b7f2a9aedcbde`. Published **2026-11-01 11:20:57 UTC / 2026-11-01 03:20:57 America/Los_Angeles (PST)**.
- The distinct [updater repository v1.8.0 release](https://github.com/repoprompt/repoprompt-ce-updates/releases/tag/v1.8.0), [updater release API](https://api.github.com/repos/repoprompt/repoprompt-ce-updates/releases/tags/v1.8.0): `draft=false`, `prerelease=false`, stable update assets for **1.8.0 (41)**. Published **2026-11-01 11:20:55 UTC / 2026-11-01 03:20:55 America/Los_Angeles (PST)**. Its repository/tag identity is not the application source commit.
- [Stable appcast](https://github.com/repoprompt/repoprompt-ce-updates/releases/latest/download/appcast.xml) and [release-specific appcast](https://github.com/repoprompt/repoprompt-ce-updates/releases/download/v1.8.0/appcast.xml): channel `RepoPrompt CE Stable`, short version `1.8.0`, build `41`, enclosure `RepoPrompt-1.8.0-41.zip`. Stable-feed response SHA-256: `3ed434d308d4b337b77bb0344d31480b40dfd3d986b8c6a24d17646c077f30d8`. The pinned app's `AppBundle/Info.plist.template:29` selects this stable feed. An initial guessed raw `main/appcast.xml` URL returned 404; the release asset is the evidenced feed, not that guessed path. No archive was installed or run.
- [Baseline v1.7.0 release](https://github.com/repoprompt/repoprompt-ce/releases/tag/v1.7.0), [baseline release API](https://api.github.com/repos/repoprompt/repoprompt-ce/releases/tags/v1.7.0): `draft=false`, `prerelease=false`, build **40**, `Release-Commit: 3253f289a69a366b3e55bd28f47d024f932d77a5`. Published **2026-10-27 08:52:52 UTC / 2026-10-27 01:52:52 America/Los_Angeles (PDT)**.

Behavioral evidence is exclusively immutable Git objects in `/Users/david/Developer/Projects/synced-repos/repoprompt/repoprompt-ce`: baseline `3253f289a69a366b3e55bd28f47d024f932d77a5` versus release `37c06d9a7d798373b55d4294474b7f2a9aedcbde`. Both were rechecked as commit objects. No later live HEAD file was used. Item 2 spot-checks included E01–E03 eligibility/call seam, E13/E15 retention/partial fork, E23–E26 quiet certification/outbound grant, E28 catalog, E34–E36 mode encoding/disabled streaming/Oracle settlement, E37/E39 backend semantics, and review-target authorization/error source. Source inspection is not runtime or visual verification.

## Implemented and no-doc dispositions

Paths here are relative to `versioned_docs/version-1.8.0/`; exact routes and commit-pinned source ranges are in the preserved inventory.

| ID | Disposition | Files / reason |
| --- | --- | --- |
| F01 | Implemented | `settings/agent-mode/agent-decisions.mdx`, `settings/agent-mode/agent-workflows.mdx`, `agent-mode/{workflow-templates,model-router,auto-effort,re-prompter}.mdx`: off-by-default matching, fresh-local eligibility, manual precedence, normal-send fallback, shared routing service versus independent effort service, metadata sharing and privacy. No invented navigation, service chip, or app_settings key. |
| F02 | Implemented | `agent-mode/{image-support,message-editor}.mdx`, `providers/grok-build.mdx`: pane-wide drops, idle/admission checks, per-file errors, staged input, provider boundary. Local references are not universal native uploads; Oracle validation is unchanged. |
| F03 | Implemented | `agent-mode/{image-support,session-history}.mdx`, `mcp-server/mcp-tools.mdx`: preview controls, missing/decode recovery, bounded retained copies, deletion/privacy, independent handoff copies and partial-fork warning. No indefinite archive or strict 20 MiB stored-file promise. |
| F04 | Implemented | `agent-mode/re-prompter.mdx`, `settings/agent-mode/agent-models.mdx`: workspace activation versus profile inheritance, completion/read-rewrite controls, guarded automatic sending. |
| F05 | Implemented | `agent-mode/{message-editor,session-history}.mdx`: Markdown user messages and non-duplicated tagged-file display, not a change to access or saved input. |
| F06 | Implemented | `overseer/best-practices.mdx`, `agent-mode/session-history.mdx`, `mcp-server/{mcp-tools,mcp-settings}.mdx`, `settings/mcp-server/tools.mdx`: qualified explicit self_noop, conservative visible fallback, history/usage limits, outbound and backend gates. Counts updated to 32 total / 11 internal / 21 standard (3 global + 18 window-scoped). |
| F07 | Implemented | `agent-mode/approvals.mdx`, `providers/codex-cli.mdx`, `settings/general/notifications.mdx`, `mcp-server/mcp-tools.mdx`: request-advertised actions, current-response checks, amendments and Computer Use restrictions. No extension to unrelated provider protocols. |
| F08 | Implemented | Canonical `providers/{openai-api,models}.mdx`; `settings/models-and-providers/model-config.mdx`, `agent-mode/oracle.mdx` link there. Mode versus actual ID/effort/tier, nonstream polling, runtime identity, Azure/custom/API billing limits. `providers/azure-openai.mdx` inspected and unchanged: already resource/deployment-specific, no false all-model inheritance claim. No repeated fixed model roster. |
| F09 | Implemented | `agent-mode/oracle.mdx`: settled awaiting group versus durable completion; unavailable usage is not zero or no charge. Text status, not color alone. |
| F10 | Implemented | `mcp-server/{mcp-tools,mcp-connections}.mdx`, `settings/mcp-server/tools.mdx`: app window capture and explicit binding, array/string root semantics, headless window rejection/no implicit creation. `mcp-setup.mdx` already uses the preferred array example and links Connection Management; unchanged. |
| F11 | Implemented | Same MCP reference/connection/settings pages: visibility-aware headless inventory/switch, UUID ambiguity recovery, required tab, ignored/rejected flags, delete caveat. No invented workspace UI change. |
| F12 | Implemented | `agent-mode/context-builder.mdx`, `mcp-server/mcp-tools.mdx`: each contributing root remains authorized; stale/ambiguous review scope fails before packaging; reload/reselect and start a new review. No promise to review all roots/worktrees. |
| F13 | No separate guide edit | Saved oversight recovery changes do not add a control. Existing recovery/unavailable/saving guidance remains; no guaranteed restore-all claim. Compact changelog reliability note only. |
| F14 | No separate guide edit | Turn/correlation and Computer Use dispatch fixes do not establish new overall minimum runtime versions or capabilities. Existing stop/reconnect/safety guidance retained; compact changelog note only. |
| F15 | No separate guide edit | Index/search/tree correctness and performance internals do not change public controls. No unrun benchmark/performance guarantee; compact changelog indexing note only. |
| F16 | No separate guide edit | Shutdown/update cleanup retains existing user controls and remains best effort. No save guarantee or quit setting; compact changelog note only. |
| F17 | No separate guide edit | Contributor CI/diagnostics/tests are not ordinary user procedures. No dependency or attribution change; no notices rewrite/install. Release identity recorded here and in the compact changelog. |

`changelog/ce-version-1-0.mdx` has a compact 1.8.0/build-41 section with links to the canonical guides and published release. All copied 1.7.0-and-older history is preserved. Optional index/overview discoverability and extra lane/worktree cross-links were not needed: existing workflow, image, context, and MCP routes carry the material instructions without duplicating them.

## Screenshot dispositions and unresolved evidence

For the human capture pass, use the [CE 1.8.0 screenshot operator checklist](ce-1.8.0-screenshot-checklist.md) for navigation, framing comparisons, priorities, filenames, and provenance handoff.

**No stable 1.8.0 captures are available. Every copied screenshot remains not visually verified for 1.8.0.** No screenshot was fabricated, captured, modified, recropped, upscaled, or certified in item 2. All 234 local image assets were copied and preserved; omission below means removal of the prose reference, not deletion of bytes. Original source captures and manifests remain untouched. No new capture manifest was created because there are no new captures.

| Inventory ID | Implemented disposition | Remaining evidence needed |
| --- | --- | --- |
| S01 | Omitted `agent-mode/images/workflow-selector.png` from Workflow Templates. Text explains Auto Workflow. | Approved stable dropdown including its toggle if illustration is desired. |
| S02 | Omitted `settings/images/agent-decisions.png`, `agent-decisions-jev.png`, and `agent-decisions-openai.png` from Agent Decisions. Retained isolated router/effort/usage-balancing examples without complete-pane claims. | Stable pane, Auto Workflow card, and service-selection badges; retained crops still unverified. |
| S03 | Retained attachment-button and idle-composer examples for those narrow purposes. | Pane-drop overlay and staged/transcript thumbnails if illustrated. |
| S04 | Preview/missing-state recovery documented in text only. | Optional approved viewer capture; no current viewer image. |
| S05 | Retained Re-prompt disclosure and model-profile crops; distinguished activation from inherited profile settings. | Optional completed strip/Read rewrite preview capture. |
| S06 | Retained oversight-controls example; no owning-layout change evidenced. | Stable pixels/privacy/alt review remains outstanding; source cannot establish quiet qualification visually. |
| S07 | Retained standard-client status/count and tools-controls examples; count 21 remains appropriate. Full tools pane omitted under S11. | Stable visual review of retained controls; no fabricated 22-tool display. |
| S08 | Existing permission/settings examples retained; no approval-card screenshot added. | Optional request-specific approval-card capture and manual interaction review. |
| S09 | Retained generic Model Config crop, explicitly not the disabled-streaming example. | Optional stable polling/disabled-toggle capture. |
| S10 | Retained Oracle toolbar example, not a lane-result example. | Optional settled/group-result/usage capture. |
| S11 | Omitted `settings/images/tools-manage-workspaces.png` and full `settings/images/tools.png` from MCP Tools to avoid stale close_tab wording. Retained narrowly captioned app-backed bind_context example; prose supplies headless distinctions. | Stable expanded lifecycle contract/full tools pane if restored; bind crop remains unverified. |
| S12 | Retained Context Builder/selection/worktree examples; no new controls evidenced. | Stable visual/privacy/alt review, not source-only certification. |
| S13 | Other copied assets retained unchanged as examples; individual hashes/provenance in full inventory. | All remain visually unverified. Publishing-stage pixel, alt, exclusion, and privacy review is outstanding. |

Known-inaccurate full panes are not presented as historical substitutes for current instructions. No essential new instruction relies only on an image, icon, or color. WCAG 2.2 AA is the authoring target, not a conformance claim: keyboard/focus, screen readers, light/dark contrast, zoom, reflow, text spacing, image zoom/escape/focus return, tables, and navigation remain **not tested** in item 2.

## Item 2 checks and handoff

Results and final full porcelain are appended after the preserved inventory. Item 3 must independently run its required tests/content checks and both full builds, inspect each artifact before replacement, perform scoped manual review, and record actual results and limitations. No validation readiness or publication claim is made here.

---

## Preserved item 1 inventory (verbatim)

The following is the complete prior-stage handoff, not a second claim that item 2 was read-only. Its proposed actions and temporary-only status are superseded by this ledger’s dispositions above.

# CE v1.8.0 documentation handoff — item 1 only

## Scope and attestation

Read-only inventory of baseline **v1.7.0 `3253f289a69a366b3e55bd28f47d024f932d77a5`** → published-release source **v1.8.0 `37c06d9a7d798373b55d4294474b7f2a9aedcbde`**. Release status/URLs were supplied by the coordinator, not independently network-verified here: [app release](https://github.com/repoprompt/repoprompt-ce/releases/tag/v1.8.0), [updates release](https://github.com/repoprompt/repoprompt-ce-updates/releases/tag/v1.8.0).

| Repository | Actual root / Git directory | Observed branch / HEAD / worktrees |
| --- | --- | --- |
| Documentation | `/Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs`; `<root>/.git`; common directory `.git` | `main`, `c1534583abc590f2a527dd0a71311316436919e0`; one worktree at this exact root; clean tracked/untracked porcelain |
| Application object repository | `/Users/david/Developer/Projects/synced-repos/repoprompt/repoprompt-ce`; `<root>/.git`; common directory `.git` | `main`, **later HEAD `88a23062e285e8c6e5d03a9595f4a25601c37995`**; one worktree at this exact root; clean tracked/untracked porcelain |

Application origin is `https://github.com/repoprompt/repoprompt-ce.git`. Both supplied revisions were confirmed as commit objects with `cat-file -t`. No later live application files were used as product evidence. All app reads/searches/diffs used explicit `git -C <app-root> show <commit>:<path>`, `grep <commit> -- <paths>`, `ls-tree <commit>`, or `diff <baseline> <release>`; no checkout switches. The only output file created is this temporary inventory. No branches, collection copies, Git index changes, repository edits, app execution, tests/builds, installations, network publication, or sibling agents.

Instructions read: supplied global AGENTS instructions; docs-root `AGENTS.md`; root app `AGENTS.md` from the release object (unchanged in this comparison); docs `docs/runbooks/content-and-media.md`, `maintenance.md`, and relevant publishing procedure. Root instruction discovery found no nested AGENTS files in either relevant tree. Docs `versions.json` is `["1.7.0","1.6.0","classic-2.1.0"]`. This inventory does **not** authorize editing 1.7.0: later child must attest clean baseline anew, perform plan item 2's branch/copy/sidebar/register sequence, then edit **only the registered 1.8.0 collection**. No ADR.

### Evidence level

- **Established:** immutable source differences, reachable call sites and static guards, literal UI strings, docs frontmatter/routes, existing asset presence/provenance, and the old pixels explicitly listed below.
- **Not established:** running-app behavior, successful provider API calls, actual runtime capability advertisements, macOS UI accessibility, performance results, v1.8.0 visual appearance, or website/browser conformance.
- No approved stable-v1.8.0 visual captures were supplied or found in the documentation screenshot assets/manifests. Every image is therefore **not visually verified for v1.8.0**. Old-pixel inspection is not release verification.
- Source tests were treated as supporting specification/coverage context only, never as tests run. Documentation validation belongs to item 3.

## Executive implementation scope

Priority content changes: Auto Workflow; image drop/preview/storage; Re-prompt activation and completion UI; qualified quiet check-ins and new internal MCP tool; request-specific approval choices; API execution-mode streaming behavior; MCP app/headless binding contracts. Smaller clarifications: full Markdown user messages, multi-Oracle settlement/usage display, multi-root review authority. Restoration, search/index, shutdown, correlation, and CI changes mostly preserve documented workflows and need reasons in the ledger, not invented new controls.

Keep Providers & Models canonical, use capability-led evergreen language, and link there from feature/settings pages. Do not scatter a named-model roster or copy architecture/release prose verbatim. UI labels quoted below are source labels, not visual verification.

## Feature / behavior / documentation inventory

IDs F01–F17 are used in the exhaustive path appendix. E-links resolve to commit-pinned source ranges in the evidence section.

### F01 — Auto Workflow: new opt-in automatic template selection (required)

**Delta and reachability.** New `AutoWorkflowDecisionPolicy` plus `chooseAutoWorkflow` is called by the local claimed-composer submission seam before fresh-task model routing. Original slash-leading input skips it, including when rewriting would otherwise remove the slash. It is not merely an unused type. [E01] [E02] [E03]

**Gates and semantics.**
- Default **off**, app-wide persisted enablement shared by Settings and the Workflow dropdown. Uses **Model Router's selected decision service**, even with Model Router off; independent enablement, revision, request, cancellation. Auto Effort retains its independent service. No new `app_settings` allowlisted key is evidenced.
- Only the first nonempty, non-slash local composer request in a positively fresh session: persisted state loaded, no provider conversation/session IDs, no MCP origin/context, parent, handoff payload, active/previous turn, or transcript/items. Saved/resumed, child, handoff, follow-up and MCP-started sessions are excluded.
- Manual selection always wins, including user select-then-clear while matching is pending. Automatic selection is submission-local, **not** a persistent manual picker change.
- Candidates: visible built-ins + sorted custom workflows, duplicate IDs excluded, plus **no workflow**. Whole request must fit service limits; no truncated catalog. Current two backend capability objects allow at most 12 choices including none (do not hard-code this in user prose). Low/invalid confidence (<0.7 when confidence is present), no match, oversized catalog, service absence/unreadiness or invalid response all fall back to normal send. Do not describe missing confidence as automatic rejection; the source only thresholds supplied confidence.
- Bounded, best-effort-masked task excerpt and workflow names/descriptions are sent; custom metadata is masked before truncation. **Not** templates, image/file payloads, tool results or previous chat. Typed sensitive text can still leak. Auto Effort considers the effective workflow and discards stale advice if it changes.
- Both existing backends satisfy primitive finite-choice requirements and are reached via the registry. Their service cards still advertise only Model Router/Auto Effort capability chips and retain older disclosure copy. Do not invent an Auto Workflow capability chip or silently claim every legacy card disclosure was updated. [E04] [E05]

**UI inventory.** New **Auto Workflow** switch at the **top of the Workflow dropdown**, before the workflow list. New **Auto Workflow** card **between Model Router and Auto Effort** in **Settings → Agent Mode → Agent Decisions**; **Enable Auto Workflow**, **Off / On / Paused — configure the selected decision service below.**, shared Decision service/Configure controls, and **What Auto Workflow shares** disclosure. Existing Settings navigation is not renamed/moved; no new navigation pane. Service-use badges add **Used by Auto Workflow / Selected for Auto Workflow**. Pending send adds **Sending… Choosing workflow**. [E01] [E06]

**Docs:** `settings/agent-mode/agent-decisions.mdx` (feature matrix, section, shared service, privacy, service comparison from “both features” to actual consumer relationships); `agent-mode/workflow-templates.mdx` (enable, eligible start, manual precedence/fallback); `settings/agent-mode/agent-workflows.mdx` (link to matching and note visible built-ins/custom metadata without implying new controls on this settings pane); `agent-mode/model-router.mdx` and `agent-mode/auto-effort.mdx` (short distinction/cross-links); `agent-mode/re-prompter.mdx` (decision evaluation after rewriting/privacy link). Optional brief entry in `agent-mode/overview.mdx` / index; no new standalone page is necessary.

**Screenshots:** S01/S02 below. Fresh stable captures needed to illustrate new controls; old dropdown/full-pane images cannot show them. Without approved captures, omit misleading full-current-pane claims and use prose; do not synthesize UI.

### F02 — Pane-wide file/image drop and shared admission (required)

Drop ownership moves from the composer band to the Agent Mode pane, with a single owner forwarded to by the native text editor. Source adds **Drop files to attach** outline/overlay. Plain text/web links remain editor content. File URLs/raw images go through intake; per-item validation reports failures instead of silently filtering by extension. Picker/paste/drop converge on admission: active chat, not running, provider supports images, and current submission/rewrite/binding owner. Grok Build is explicitly blocked; do not equate “all other providers pass this composer guard” with universal format/model support. Busy paste/drop gives a composer notice (“Files can't be attached while the agent is working…”), rather than corrupting the last streaming transcript row. Delayed intake retains its drag-start tab, but refuses replaced session/workspace/binding authority. [E07] [E08] [E09]

**Docs:** `agent-mode/image-support.mdx` change “drag … into the message editor” to pane-wide behavior; explain staged not sent, guards, failure recovery, non-image references vs native content. `agent-mode/message-editor.mdx` one-line link. `providers/grok-build.mdx` retains/clarifies no composer attachments; other provider pages do not gain a fixed extension allowlist.

**Provider boundary:** Codex encoder uses native `localImage` only for classified images; accepting other local files is not a native document-upload promise. Oracle has a different, stricter validation contract and was **not** broadened by this diff. [E10] No new attachment support claim for API/Oracle based on Agent Mode intake.

**Screenshots:** S03; existing icon crop can stay as a button example, but supplies no evidence for the new drop affordance.

### F03 — Clickable image thumbnails, viewer and session-lifetime retention (required)

New fixed thumbnail cards in composer **and transcript** open an image preview sheet; missing files show **Image no longer available** and cannot be opened. Viewer has title, pixel dimensions, **Reveal in Finder**, **Close**, Escape and ⌘W dismissal; failed decode says **This image couldn't be displayed**. These are source-defined controls only; keyboard/focus/AT behavior untested. [E11] [E12]

Finished consumed managed copies are moved to `<workspace-storage>/AgentSessions/attachments/<sessionID>/`, not the user's original workspace source file. Persistence-suppressed/no captured-root/non-live-owner cases retain prior cleanup behavior. Stored path repair supports hydration; not an unlimited image archive. Source defaults: >20 MiB images attempt downscaling to 4096-pixel long edge, 200 MiB per-session folder cap with oldest retained files evicted; downscaling can fail and fall back to placement, so do not promise a strict 20 MiB stored-image cap. Deleting a successfully deleted session removes its attachment folder; failed deletion preserves it. Delayed sweep removes orphan folders after grace and unprotected temporary files older than seven days, protecting live drafts/reservations across windows. [E13] [E14]

Handoff/fork gets independent owned image copies; missing/unauthorized source, cap, cancellation or destination drift can fail the copy with a **partial fork** error (a child may already exist). Do not tell users to delete it as rollback or promise successful transfer when storage is unavailable. [E15]

**Docs:** `agent-mode/image-support.mdx` viewer, retention/privacy, limits/eviction/missing-state recovery; `agent-mode/session-history.mdx` saved image/deletion caveat; `overseer/lanes.mdx` / `mcp-server/mcp-tools.mdx` handoff/fork notes only where those workflows are explained. No need to expose internal storage choreography in every provider page.

**Screenshots:** S03/S04. New preview/thumbnail examples need approved captures; a missing-state image is optional because concise prose can describe recovery.

### F04 — Re-prompt activation survives workspace reuse; completion is clearer (required)

Baseline enablement was a window VM Boolean; release getter/setter stores optional activation on the **workspace**, default off, independent of global/workspace **model-profile inheritance**. Unscoped tabs keep window-local unsaved activation. No new settings checkbox is added by this change. Do not confuse activation with inherited model/mode/context/guidance. [E16]

Streaming strip shows spinner; completed strip adds checkmark and **Rewrite complete — ready to send** / **Draft ready to send**, with **Read rewrite…** opening **Rewritten prompt**, **Done**, and instruction to edit/send back in the composer. Auto-send moves after publication and rechecks enabled/current tab/request, matching draft and no marked IME composition. This is safer existing automatic mode, not “all rewrites now auto-send.” [E17] [E18]

**Docs:** `agent-mode/re-prompter.mdx` activation scope, ready-state, preview and automatic-mode caveats; `settings/agent-mode/agent-models.mdx` distinguish model-profile settings from workspace activation. Existing review/send and custom shortcut guidance remains. **Screenshots:** S05; existing disclosure screenshot is still a disclosure example, not a completed rewrite.

### F05 — User-message rendering and duplicate tagged-file display (small required clarification)

Both Agent Mode and built-in Chat replace `CollapsibleUserMessage` with interactive Markdown rendering; Agent Mode tagged files appear once as the badge, not duplicated in attachment strip. Do not retain instructions to expand/collapse user-message prose if present in copied pages. This does not change provider input, saved chat content, or grant file permissions. [E19] [E20]

**Docs:** `agent-mode/message-editor.mdx` / `agent-mode/session-history.mdx`: short note that submitted user messages render Markdown; link image handling. No standalone guide or screenshot necessary. Existing composer screenshots are not affected by transcript-only rendering.

### F06 — Quiet check-ins now require explicit qualified `self_noop` (required)

Deleted text classifier is replaced by an exact accepted declaration/body/tool-result proof. **Silence or `[ack]` alone no longer qualifies.** Routine idle-follow-up wakes with no attention/ordinary work may receive **Nothing needed? Call self_noop.** on supported first-party Codex/Claude Code paths. Other providers (including Claude-compatible alternatives and Devin) remain disabled for quiet classification/copy. This does not mean Codex/Claude always hide every check-in. [E21] [E22]

Eligibility depends on actual current-route returned catalog definition, exact run/session/connection/offer and tool enabled state, no stale offer or ordinary-occurrence veto; no new automatic relist/wait. Exactly one empty-body declaration, accepted same-run origin, successful exactly correlated canonical result, complete/drained range, normal completed terminal state and no queued successor are required. Other tool activity, interactions, uncertainty, errors/cancellation, leading assistant output, stale/ambiguous identities fail open to ordinary visible transcript. Text closing **after** declaration need not be a magic keyword. Acknowledgement `{"result":"done"}` is only call acknowledgement, **not** proof the display was classified quiet. [E23] [E24] [E25]

New `self_noop` is Agent Mode/control-relationship policy-gated, advertised only with an **active outbound link** (not merely inbound). App provider requires Agent Mode; direct-headless installer denies it, even though canonical catalog includes it. It is not a general external-client toggle/command to erase conversation. Canonical saved/exported history remains; local projection and quiet summaries suppress certified noise, including persisted host-certified metadata. Do not claim tool call deletes data, eliminates a model turn, saves usage by itself, disables notifications, or replaces wake/snooze controls. Quiet close accounting now pairs status/facts atomically and avoids losing unpaid real updates. [E26] [E27]

**Docs:** `overseer/best-practices.mdx#keep-routine-check-ins-quiet` update “recognize nothing actionable” to bounded explicit qualified mechanism, still keep usage/history warning; `agent-mode/session-history.mdx` brief local-display distinction; `mcp-server/mcp-tools.mdx` internal tool entry, gates, empty schema and acknowledgement. General catalog increases **31 → 32 total**, **10 → 11 policy-gated/internal**, while standard advertised surface remains **21** (3 global/18 window); update repeated counts in `mcp-server/mcp-settings.mdx` and `settings/mcp-server/tools.mdx`. Source policy catalog derives gated names by capability; `self_noop` uses gated `agentSessionLinkControl`. Do not add a normal Settings toggle to the visible 21-tool list. [E28]

**Screenshots:** S06/S07. Oversight-controls pixels need no replacement solely for this behind-the-scenes change; no visual proof of quiet qualification available. Tool count shown as 21 remains legitimate standard-client context.

### F07 — Codex approvals follow advertised choices (required)

Parser preserves absent choices (legacy behavior) vs explicit empty/invalid choices (none), and actual advertised accept, session accept, decline, cancel, or execpolicy amendment payload. UI only offers allowed actions; may show **Cancel**, omit **Decline** or ordinary **Approve**, and use **Approve & Remember** for an advertised amendment. Remember action must match allowed payload. Notifications likewise omit unsupported approve/decline. MCP interaction options and response validation intersect current request authority; stale/unsupported answers report **No response was applied**. Computer Use forbids session grants/amendments even when a provider offers them. Do not generalize Codex availableDecisions to ACP or Claude control protocols. [E29] [E30] [E31]

**Docs:** `agent-mode/approvals.mdx`, `providers/codex-cli.mdx` (brief capability caveat), `mcp-server/mcp-tools.mdx` respond/options contract, `settings/general/notifications.mdx` (actions depend on supported current request); retain separate workspace approval and permission-level distinctions. **Screenshots:** no existing in-turn approval-card capture found in current collection; permissions/settings popovers are not these cards. New capture optional, prose sufficient (S08).

### F08 — OpenAI API execution mode, polling and identity (required canonical reference)

Added mode-bearing built-in API selections map to a **shared actual API model ID + reasoning.mode="pro"**, independent effort and service tier—not a new Codex CLI model family. In this source the selections are `gpt-6-astra-pro*`, and request base is `gpt-6-astra`; include names only as source evidence here, not a new repeated fixed catalog in docs. Model capability forces streaming off before saved override; **Use Streaming** is disabled with polling explanation for these rows. Responses background create/poll returns output on completion; actual queued/in-progress status responses renew transport activity (a dead/failed poll does not fabricate liveness). Foreground requests also preserve mode encoding; do not claim every direct completion call necessarily uses the streaming-request path's background job. Readable Oracle/MCP exports preserve selected mode identity when execution uses shared base ID, but a genuinely different runtime model stays authoritative. [E32] [E33] [E34] [E35]

Azure generated variants/default descriptors explicitly **exclude mode-bearing selections**; do not mirror them into Azure or OpenAI-compatible providers, and do not claim subscription/Codex auth funds direct API mode. Source capability inclusion does not verify account/endpoint availability or real API success. Legacy separate Pro model IDs keep their older behavior.

**Docs:** canonical `providers/openai-api.mdx` (execution mode vs effort/tier, availability/billing), `providers/models.mdx` (identifier vs actual execution identity, short canonical link), `settings/models-and-providers/model-config.mdx` (forced-disabled streaming/polling exception). `providers/azure-openai.mdx` only if a generic statement would falsely imply all OpenAI selections are copied; otherwise no new named list. `agent-mode/oracle.mdx` link to canonical info rather than duplicating modes. **Screenshots:** S09, no compulsory replacement of a different-provider example.

### F09 — Multi-Oracle lane status and unknown token usage (small required)

Live lane settlement becomes **Settled · awaiting group**, not durable **Completed**. Oracle pill uses a blue dot for settled, but documentation must not rely on color alone. Completed outcome still comes from durable group results. Chat token display now says **Usage unavailable**, or labels an unavailable side explicitly; known small counts/zero are exact, not “0.00k.” [E36] [E20]

**Docs:** `agent-mode/oracle.mdx` explain settled ≠ group success, unknown usage ≠ zero/no charge. No provider/billing promise. No new Settings control. No existing progress/result screenshot in this collection needs mandatory replacement; optional approved capture S10.

### F10 — App-backed vs headless binding/schema semantics (required correction)

Published canonical schema now restores app-backed `window_id` and `working_dirs` array-or-string semantics, instead of removing window selector from a common schema. Existing app route **actually** handles list filter, context ID, root matching and window-current-tab capture; visible tab changes later do not redirect explicit binding. Exact root set, then unambiguous superset; descendants are not root selectors. Prefer array, especially commas in root paths. Headless rejects **any supplied** window_id; binds saved canonical context/root inventory; no implicit workspace creation even with create_if_missing/tab_name. These flags can be accepted/ignored on an existing headless match. This is primarily a publication/docs correction, **not** newly invented UI ability. [E37] [E38] [E39]

**Docs:** `mcp-server/mcp-tools.mdx#bind_context`, `mcp-server/mcp-connections.mdx#context-binding`, `settings/mcp-server/tools.mdx#bind_context` replace “global schema does not accept window_id”; reconcile lifecycle table’s “separate from bind_context” language. `mcp-server/mcp-setup.mdx` example can prefer array with link to backend-specific differences. Existing window-affinity vs explicit-binding guidance remains.

**Screenshots:** S11; inspected old bind_context screenshot **already shows** window_id and array; prose currently contradicts its pixels. Its content is still an app-backed historical example, not a verified new-release schema rendering.

### F11 — Workspace lifecycle visibility and headless parameter differences (required reference)

Headless `manage_workspaces list` now hides hidden workspaces unless include_hidden, while `bind_context list` and `list_tabs` retain full saved inventory. Name-based switch uses visibility-aware resolution. Unhide resolves hidden names without include_hidden; hide uses unique visible match then hidden fallback, ambiguity still errors; exact UUID disambiguates. Canonical definitions distinguish headless canonical UUID select_tab vs app UUID/name, require tab for close_tab, reject headless window selectors/new-window=true, accept-and-ignore focus/close_window without UI effect, and describe switch_to_created binding. **Ignoring close_window does not prevent delete.** [E37] [E40]

**Docs:** `mcp-server/mcp-tools.mdx#manage_workspaces`, `mcp-server/mcp-connections.mdx` lifecycle/backend section; `settings/mcp-server/tools.mdx#manage_workspaces` short backend qualifier. No change to app's Settings workspace library UI is evidenced. **Screenshots:** S11, specifically old manage-workspaces image says close_tab parameter optional; remove/replace that misinformation rather than relying only on new prose.

### F12 — Multi-root Context Builder review authority (small required clarification)

Selected roots contributing to the same checkout are merged into one checkout target while retaining **every** root authority; most-specific physical root selected per path, consistent aliases coalesced, conflicting mapping rejected. Revalidation checks every captured authorization and checkout. Automatic review authorization failure now propagates before packaging (MCP invalid params), rather than silently assembling a review lacking authorized Git context. Nested Agent Mode context compares captured full logical roots, not only unbound retained subset. [E41] [E42]

**Docs:** `agent-mode/context-builder.mdx`, `mcp-server/mcp-tools.mdx#context_builder`: multi-root/selected-root review can fail when mapping is ambiguous/stale; reload/reselect intended roots and start a new review. `worktrees/review-and-merge.mdx` only needs link if it discusses automatic review scope. Do not promise all roots or worktrees are reviewed automatically or source authority follows later selection. No new control/navigation/screenshot requirement (S12).

### F13 — Saved oversight restoration/recovery (no new walkthrough)

Window restoration now tracks pending/in-flight/abandoned execution independently of persistence gate, avoiding declaring topology complete too soon. A recovered initial intent-store read seeds launch entries once; later save notifications do not create new authority; invalid rows remain inactive/preserved, valid rows can restore. Diagnostics added for stages/failures. [E43] [E44]

**No separate docs change needed:** `overseer/linking-sessions.mdx` already says restored relationships depend on currently available sessions and warns about unavailable/saving states; `overseer/best-practices.mdx` already covers recovery. Retain these limits, optionally source-backed changelog fix note. No new “restore all now” UI, no guaranteed continuity, no screenshot replacement solely for internal recovery.

### F14 — Native provider turn/correlation robustness (no new user procedure)

Claude runtime gains UUID-keyed input/result ownership **only** when init reports `msg_lifecycle_v1` and version ≥2.1.292; older unsupported runtimes retain acceptance-order behavior. Multiple answered inputs settle together, stale/provider/sub-agent output cannot settle newer host work; strongest outstanding failure/cancellation is retained. Correlation failure requests process restart. Claude-compatible codec/translator carry correlation/uncertainty data but do not thereby enable quiet mode for compatible integrations. [E45] [E46]

Codex uses bounded resume/thread metadata pages with runtime ≥0.164.0, legacy path otherwise; interrupt reconciliation validates exactly one current active turn and shared deadline; incomplete history is not absence proof. Current native-tool probes hydrate only needed items; actual current IDs/correlation guard against stale termination. [E47]

**No new setup docs required:** existing `providers/claude-code-cli.mdx`, `providers/codex-cli.mdx`, `agent-mode/session-history.mdx` reconnect/stop guidance remains. These thresholds gate *specific implementation behavior*, not new overall minimum-supported-version claims. Optional source-backed bugfix changelog entry; no new settings or screenshots.

Computer Use waits through **transient** controller-retirement/ownership fences, rechecks actual admission/Stop/current run before physical dispatch and retry; structural refusal still disarms/refuses. [E48] **No new Computer Use capability or toggle:** preserve existing eligible direct local-session/safety requirements in `agent-mode/computer-use.mdx`, not new automatic access.

### F15 — Search/index/file-tree performance and correctness (no user-facing settings)

Bounded overlay/rebase storage limits retained path keys and candidate overfetch; UTF-8 byte-exact records prevent normalization-equal paths from being mistaken for unchanged records; authoritative patch merging validates identities/parents, preserves ordering and resync fallback. Removed-folder matching handles separators/combining characters and batches missing-folder rebuild checks. Workspace expanded-folder order is retained for equal sets, avoiding spurious saves. [E49] [E50]

**No docs edits required:** search behavior, indexing controls and filesystem filtering semantics did not gain new controls/commands. Do not turn internal ratios, debug work counters, or unrun regression tests into public performance claims. ContextDrawer observer segmentation is type-checking refactor without changed controls; screenshots can remain historical examples (S12).

### F16 — Shutdown/update handoff and output drain (no new settings)

AppKit quit and Sparkle update installation now share one irreversible bounded cleanup path: freeze, persist/settle, stop processes/servers, resume updater continuation; timeout is best effort, not save guarantee. Captured CLI output drains before descriptors close, rather than losing queued bytes; cancellation and bounded drain errors remain. [E51] [E52]

**No docs change required:** existing `settings/general/updates.mdx` stable/tip/automatic-check controls are unchanged. Do not introduce a new quit setting or guarantee all unacknowledged work survives. Optional changelog fix note only; screenshots remain historical controls.

### F17 — Contributor tooling, diagnostics, tests and release metadata (no standalone user docs)

CI adds job admission/integration products coverage and modifies gates/scripts; tests expand coverage of the above behavior, including deletion, input correlation, review authority, watchdogs and search. Diagnostics add startup/restore/catalog counters; no new ordinary user preferences. Source-generated canonical-tool JSON mirrors F06/F10/F11, not independent UI. version.env and CLI_VERSION advance to release identity. No dependency package/license/asset changes are in this 248-path diff, so this inventory calls for **no dependency installation or notices rewrite**.

**No docs edits needed** to build FAQ/contributor walkthrough based solely on CI topology, harnesses or implementation refactors. App diagnostic tests/builds were not run. `changelog/ce-version-1-0.mdx` may receive a compact source-backed 1.8.0 section after version creation; do not use it as source for the feature inventory.

## Exact destination map

All paths below are relative to the **future** `versioned_docs/version-1.8.0/`. They were checked against the same paths/frontmatter in the current 1.7.0 template. Routes are the planned current `/docs` prefix plus existing slug, not a claim that 1.8.0 routes currently exist.

| Destination file | Current-version public route | Work |
| --- | --- | --- |
| `agent-mode/workflow-templates.mdx` | `/docs/agent-mode/workflow-templates` | F01 primary usage |
| `settings/agent-mode/agent-decisions.mdx` | `/docs/settings/agent-decisions` | F01 canonical controls/privacy/service sharing |
| `settings/agent-mode/agent-workflows.mdx` | `/docs/settings/agent-workflows` | F01 link/visibility distinction; no invented switch here |
| `agent-mode/model-router.mdx` | `/docs/agent-mode/model-router` | F01 service distinction/link |
| `agent-mode/auto-effort.mdx` | `/docs/agent-mode/auto-effort` | F01 effective workflow/link, no changed independent service |
| `agent-mode/image-support.mdx` | `/docs/agent-mode/image-support` | F02/F03 main guide |
| `agent-mode/message-editor.mdx` | `/docs/agent-mode/message-editor` | F02/F05 concise interaction/rendering |
| `agent-mode/session-history.mdx` | `/docs/agent-mode/session-history` | F03/F05/F06 persistence vs display |
| `agent-mode/re-prompter.mdx` | `/docs/agent-mode/re-prompter` | F01 privacy cross-link; F04 scope/preview |
| `settings/agent-mode/agent-models.mdx` | `/docs/settings/agent-models` | F04 model-profile vs activation scope |
| `overseer/best-practices.mdx` | `/docs/overseer/best-practices` | F06 quiet declaration and limits |
| `overseer/lanes.mdx` | `/docs/overseer/lanes` | F03 handoff caveat where relevant |
| `agent-mode/approvals.mdx` | `/docs/agent-mode/approvals` | F07 supported/request-current actions |
| `settings/general/notifications.mdx` | `/docs/settings/notifications` | F07 action availability qualifier |
| `providers/openai-api.mdx` | `/docs/providers/openai-api` | F08 canonical API mode/capability |
| `providers/models.mdx` | `/docs/providers/models` | F08 identity vs mode/effort/tier |
| `settings/models-and-providers/model-config.mdx` | `/docs/settings/model-config` | F08 disabled-streaming exception |
| `providers/codex-cli.mdx` | `/docs/providers/codex-cli` | F07 short request-choice qualifier |
| `providers/grok-build.mdx` | `/docs/providers/grok-build` | F02 check/retain explicit attachment limit |
| `providers/azure-openai.mdx` | `/docs/providers/azure-openai` | F08 conditional correction only; do not copy API mode roster |
| `agent-mode/oracle.mdx` | `/docs/agent-mode/oracle` | F09 settlement/unknown usage; F08 canonical link |
| `mcp-server/mcp-tools.mdx` | `/docs/mcp-server/mcp-tools` | F03/F06/F07/F10/F11/F12 reference |
| `mcp-server/mcp-connections.mdx` | `/docs/mcp-server/mcp-connections` | F10/F11 backend contracts |
| `mcp-server/mcp-setup.mdx` | `/docs/mcp-server/mcp-setup` | F10 optional array example/link |
| `mcp-server/mcp-settings.mdx` | `/docs/mcp-server/mcp-settings` | F06 total/internal counts, historical image note |
| `settings/mcp-server/tools.mdx` | `/docs/settings/tools` | F06 counts, F10/F11 descriptions/images |
| `agent-mode/context-builder.mdx` | `/docs/agent-mode/context-builder` | F12 review scope/recovery |
| `worktrees/review-and-merge.mdx` | `/docs/worktrees/review-and-merge` | F12 optional link, no broader merge changes |
| `agent-mode/overview.mdx` / `index.mdx` | `/docs/agent-mode/overview` / `/docs/` | Optional discoverability only |
| `changelog/ce-version-1-0.mdx` | `/docs/changelog/ce-version-1-0` | Optional concise source-backed release summary |

No compulsory new page/slug/sidebar item is necessary. New headings should retain meaningful existing bookmarks. Do not edit old collections/sidebar, shared theme/site code or existing provenance assets.

## UI/screenshot decisions

All destinations below refer to copies in the future 1.8.0 collection. **No screenshot is visually verified for v1.8.0.** “Retain candidate” means source comparison found no material reason to replace that example, not a verified visual pass.

| ID | Existing asset / UI region | Old artifact evidence | Action / fresh capture |
| --- | --- | --- | --- |
| S01 | `agent-mode/images/workflow-selector.png` | Old pixels inspected: begins “Built-in”, no Auto Workflow toggle; current source puts toggle above list (E06). Original release provenance not established in supplied manifests. | **Replace** with approved stable dropdown, or remove image and use prose. Cannot recrop old pixels into new toggle. Capture required if illustrating complete new dropdown. |
| S02 | `settings/images/agent-decisions.png`, `agent-decisions-jev.png`, `agent-decisions-openai.png` | Whole-pane old pixels inspected: Model Router → Auto Effort → Usage Balancing → services; no new card. Oct 27 decisions manifest explicitly baseline commit, source `2026-10-27_15-07-17.png`. Full pane/selection-badge copy affected; backend capability chips remain old two-feature chips in source. | **Replace full pane** and capture new Auto Workflow card/badges if needed. Without approved new pixels, omit stale full-pane image or label limited historical example, add prose. No upscaling/synthetic addition. Router/effort/balancing isolated crops are retain candidates, not mandatory new captures. |
| S03 | `agent-mode/images/image-attachment.png` and `composer.png` | Old pixels inspected: attachment-button icon / idle toolbar only, no attached thumbnail/drop overlay. | **Retain** as button/idle example with accurate alt. New pane-overlay/thumbnail capture optional but needed if showing new affordance. Do not caption icon as preview/retention evidence. |
| S04 | No current thumbnail viewer/missing-state screenshot | New E11/E12 controls not depicted by current asset set. | **New capture optional**, recommended viewer with harmless example image + dimensions/Close; missing-state prose sufficient. No supplied source: unresolved, no invented image. |
| S05 | `agent-mode/images/re-prompt.png`; settings `agent-models-reprompt.png` | Disclosure old pixels inspected; no completion strip/Read rewrite. Settings crop provenance: Oct 27 settings manifest; model-profile controls not newly moved. | **Retain disclosure/model-profile examples** if prose distinguishes activation; optional new complete-state + preview capture. No capture supplied; don't claim new ready-state illustrated. |
| S06 | `overseer/images/oversight-controls.png` | Existing image referenced by three oversight pages; no changed popover layout source in diff. Pixels not inspected here. | **Retain candidate**. No new image needed for behind-scenes self_noop; explicitly unverified. |
| S07 | `settings/images/tools.png`, `tools-controls.png`; MCP `mcp-server-popover.png`, `mcp-window-access.png` | Visible 21 standard-tool count is not the internal-tool total. Existing prose already identifies historical captures. Pixels not inspected here. | **Retain candidate**, correct prose total to 32/internal 11, do not alter pixels to show 22. Expanded tool details affected separately in S11. |
| S08 | No current request-specific approval card image; `agent-mode/images/permissions.png` and Agent Permissions settings crops are distinct UI | E29/E30 concern in-turn choices; Settings permission labels not changed. | **No mandatory capture**. Retain settings/popover examples; optional approved card with limited choices. Not verified. |
| S09 | `settings/images/model-config.png` | Old pixels inspected: expanded Claude-compatible model, not mode-bearing OpenAI API row; Oct 27 settings provenance. | **Retain** as generic per-model example. Add canonical prose for polling exception. Optional approved disabled-toggle/tooltip capture; unavailable now. |
| S10 | `agent-mode/images/composer.png` (Oracle toolbar); no result/group-status shot | Old toolbar pixels inspected, no lane/result/token states. | **Retain** as toolbar example; new status capture optional, not required to explain F09 in prose. |
| S11 | `settings/images/tools-bind-context.png`, `tools-manage-workspaces.png`, plus full `tools.png` expanded descriptions | Old pixels inspected: bind_context already shows window_id + array; manage_workspaces says tab optional for close_tab. Old app-backed prose lacks headless distinctions. | **Replace/remove stale manage_workspaces detail**; fresh capture if retaining expanded current contract. Bind crop can remain explicitly app-backed historical example, or replace with approved new copy. Inspect full tools image before reuse because affected expanded descriptions may be visible. Captures unavailable. |
| S12 | `agent-mode/images/context-selections.png`, `context-builder.png`, `context-prompt.png`, worktree/execution images | No new visual controls from review-authority/index fixes; ContextDrawer source refactor preserves control composition. Pixels not inspected here. | **Retain candidates**; no new capture required for error/revalidation prose. |
| S13 | All other template assets (enumerated in asset appendix) | No material owning-control changes identified in this diff; older examples/provenance only. Most pixels not inspected in this task. | **Retain candidates**, source comparison only; preserve originals and review alt/privacy when actually publishing. Do not blanket-certify them. |

Old pixels actually inspected in this run: image-attachment.png, workflow-selector.png, re-prompt.png, agent-decisions.png, tools-bind-context.png, tools-manage-workspaces.png, model-config.png, composer.png. No other pixel review is claimed.

Existing original sets/manifests live in `source-assets/documentation-screenshots/`: Oct 4 manifest lacks a release source revision; Oct 27 settings canonical_source.revision and separate decisions manifest point to baseline. File presence/date/hash does not establish stable-v1.8.0 appearance. Do not overwrite these originals/manifests. Later additions need approved release provenance, source/destination hashes, dimensions, native-resolution crop coordinates, redactions and destination paths. New crops belong in owning new-version section `images/`. Before publishing review pixels for secrets/exclusions and alt accuracy; preserve keyboard-reachable image handling and WCAG 2.2 AA authoring, but do not claim conformance from this inventory.

## Coordinator spot-check and remaining work

1. Spot-check F01 call seam, F06 outbound grant + exact declaration proof, F08 forced polling/Azure exclusion, F10 actual route vs common schema, and F03 partial fork storage. These are easy to overstate from surface labels alone.
2. Choose screenshot fallback explicitly: approved release capture, omit misleading image, or narrowly retain labelled historical example. Missing visuals do **not** prevent source-backed prose; they prevent claims of new-release visual verification.
3. After safe branch/copy/register, materialize this ledger at `docs/reviews/ce-1.8.0-documentation-review.md`, with implemented/deferred dispositions and limitations. This temporary handoff does not perform that stage.
4. Item 3 must run required docs-only checks/full builds at both base paths, record each artifact before replacement, and perform/record actual manual browser/AT review. None was performed here.
5. Later app HEAD, release-note prose, source tests, old manifests, and mock UI are not substitutes for missing stable capture evidence.


## Commit-pinned source evidence index

Every E reference below is a source object at the release commit; supplemental baseline links show replaced behavior. Line ranges are source lines, not diff lines. URLs are constructed from the attested origin, not claimed HTTP-fetch verification.
- **E01** — New Auto Workflow card, placement, shared controls, fallback/privacy text: [Sources/RepoPrompt/Features/Settings/Views/Router/RouterSettingsView.swift:560–593](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Settings/Views/Router/RouterSettingsView.swift#L560-L593)
[E01]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Settings/Views/Router/RouterSettingsView.swift#L560-L593
- **E02** — Fresh-session gates, catalog, manual precedence, readiness/cancellation/currentness: [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+AutoWorkflow.swift:16–126](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BAutoWorkflow.swift#L16-L126)
[E02]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BAutoWorkflow.swift#L16-L126
- **E03** — Actual local composer call seam and original slash gate: [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel.swift:18765–18806](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel.swift#L18765-L18806)
[E03]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel.swift#L18765-L18806
- **E04** — Finite-choice workflow metadata/no-workflow, confidence, complete catalog validation: [Sources/RepoPrompt/Features/AgentMode/Routing/AutoWorkflowDecisionPolicy.swift:1–76](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Routing/AutoWorkflowDecisionPolicy.swift#L1-L76)
[E04]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Routing/AutoWorkflowDecisionPolicy.swift#L1-L76
- **E05** — Concrete service capability limits, older card chips/disclosures, reachable generic decide: [Sources/RepoPrompt/Features/AgentMode/Routing/Backends/OpenAIDecisions/OpenAIDecisionsDecisionService.swift:5–100](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Routing/Backends/OpenAIDecisions/OpenAIDecisionsDecisionService.swift#L5-L100)
[E05]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Routing/Backends/OpenAIDecisions/OpenAIDecisionsDecisionService.swift#L5-L100
- **E06** — New dropdown toggle: [Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentWorkflowsPopoverView.swift:140–149](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentWorkflowsPopoverView.swift#L140-L149)
[E06]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentWorkflowsPopoverView.swift#L140-L149
- **E07** — Pane/native-editor shared drop owner and overlay: [Sources/RepoPrompt/Features/AgentMode/Views/AgentAttachmentDropTarget.swift:87–176](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentAttachmentDropTarget.swift#L87-L176)
[E07]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentAttachmentDropTarget.swift#L87-L176
- **E08** — Shared admission and busy notice; identity-captured intake: [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+DraftsAttachments.swift:419–508](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BDraftsAttachments.swift#L419-L508)
[E08]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BDraftsAttachments.swift#L419-L508
- **E09** — Drop classifier, tracking and exact block messages: [Sources/RepoPromptDomainRuntime/ProviderContent/AgentImageAttachmentIntake.swift:4–84](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/ProviderContent/AgentImageAttachmentIntake.swift#L4-L84)
[E09]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/ProviderContent/AgentImageAttachmentIntake.swift#L4-L84
- **E10** — Actual native image encoder; only image-kind attachments: [Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift:2658–2700](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift#L2658-L2700)
[E10]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift#L2658-L2700
- **E11** — Image card/preview, missing/loading/loaded state and removal controls: [Sources/RepoPrompt/Features/AgentMode/Views/AgentAttachmentsStrip.swift:183–381](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentAttachmentsStrip.swift#L183-L381)
[E11]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentAttachmentsStrip.swift#L183-L381
- **E12** — Viewer controls, dimensions, dismissal and unavailable states: [Sources/RepoPrompt/Features/AgentMode/Views/AgentImagePreviewSheet.swift:1–173](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentImagePreviewSheet.swift#L1-L173)
[E12]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentImagePreviewSheet.swift#L1-L173
- **E13** — Storage ownership/default limits/grace periods: [Sources/RepoPromptDomainRuntime/ProviderContent/AgentSessionAttachmentStore.swift:5–90](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/ProviderContent/AgentSessionAttachmentStore.swift#L5-L90)
[E13]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/ProviderContent/AgentSessionAttachmentStore.swift#L5-L90
- **E14** — Retention guards, managed-copy repair and protected sweep: [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+DraftsAttachments.swift:595–799](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BDraftsAttachments.swift#L595-L799)
[E14]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BDraftsAttachments.swift#L595-L799
- **E15** — Independent handoff copy and partial-fork errors: [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel.swift:25438–25490](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel.swift#L25438-L25490)
[E15]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel.swift#L25438-L25490
- **E16** — Workspace activation separate from effective model-profile context settings: [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+RepromptUI.swift:38–60](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BRepromptUI.swift#L38-L60)
[E16]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BRepromptUI.swift#L38-L60
- **E17** — Completed strip/read-rewrite sheet and dismissal: [Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentRepromptComposerStrip.swift:42–170](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentRepromptComposerStrip.swift#L42-L170)
[E17]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentRepromptComposerStrip.swift#L42-L170
- **E18** — Post-publication auto-send validation: [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+Reprompt.swift:28–42](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BReprompt.swift#L28-L42)
[E18]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BReprompt.swift#L28-L42
- **E19** — Single tagged-file badge and full Markdown user message: [Sources/RepoPrompt/Features/AgentMode/Views/AgentMessageBubble.swift:353–400](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentMessageBubble.swift#L353-L400)
[E19]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentMessageBubble.swift#L353-L400
- **E20** — Token unknown-vs-zero presentation; Markdown change additionally at 399–405: [Sources/RepoPrompt/Features/Chat/Views/Bubbles.swift:13–50](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Chat/Views/Bubbles.swift#L13-L50)
[E20]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Chat/Views/Bubbles.swift#L13-L50
- **E21** — Exact provider eligibility for quiet check-ins: [Sources/RepoPrompt/Infrastructure/AI/Prompts/AgentSessionLinkPrompts.swift:21–30](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Prompts/AgentSessionLinkPrompts.swift#L21-L30)
[E21]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Prompts/AgentSessionLinkPrompts.swift#L21-L30
- **E22** — New self_noop hint replacing ack: [Sources/RepoPrompt/Infrastructure/AI/Prompts/AgentSessionLinkPrompts.swift:485–504](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Prompts/AgentSessionLinkPrompts.swift#L485-L504)
[E22]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Prompts/AgentSessionLinkPrompts.swift#L485-L504
- **E23** — Leading text veto/exactly one declaration requirement: [Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunQuietLedger.swift:223–233](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunQuietLedger.swift#L223-L233)
[E23]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunQuietLedger.swift#L223-L233
- **E24** — Complete correlated result/range and terminal certification: [Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunQuietLedger.swift:375–465](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunQuietLedger.swift#L375-L465)
[E24]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunQuietLedger.swift#L375-L465
- **E25** — Actual returned-catalog route proof/currentness and conservative fallback: [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentModeViewModel+SessionLinkPrompt.swift:963–1058](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentModeViewModel%2BSessionLinkPrompt.swift#L963-L1058)
[E25]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentModeViewModel%2BSessionLinkPrompt.swift#L963-L1058
- **E26** — Additional self_noop grant requires active outbound relationship: [Sources/RepoPrompt/Infrastructure/MCP/MCPConnectionManager.swift:3309–3335](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/MCPConnectionManager.swift#L3309-L3335)
[E26]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/MCPConnectionManager.swift#L3309-L3335
- **E27** — Local projection/baseline rather than deletion of canonical conversation: [Sources/RepoPrompt/Features/AgentMode/Runtime/Transcript/AgentTranscriptServices.swift:2394–2456](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Transcript/AgentTranscriptServices.swift#L2394-L2456)
[E27]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Transcript/AgentTranscriptServices.swift#L2394-L2456
- **E28** — Catalog total/control capability; policy classification also linked below: [Sources/RepoPromptDomainRuntime/MCPDomainToolCatalog.swift:298–343](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/MCPDomainToolCatalog.swift#L298-L343)
[E28]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/MCPDomainToolCatalog.swift#L298-L343
- **E29** — Request-specific allowed actions and remembered payload: [Sources/RepoPrompt/Features/AgentMode/Models/UserInteractionModels.swift:1122–1193](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Models/UserInteractionModels.swift#L1122-L1193)
[E29]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Models/UserInteractionModels.swift#L1122-L1193
- **E30** — Conditional UI choices and labels: [Sources/RepoPrompt/Infrastructure/UI/Agent/AgentApprovalCard.swift:74–128](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/UI/Agent/AgentApprovalCard.swift#L74-L128)
[E30]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/UI/Agent/AgentApprovalCard.swift#L74-L128
- **E31** — Actual response boundary intersects Computer Use safety: [Sources/RepoPrompt/Features/AgentMode/Runtime/Codex/CodexAgentModeCoordinator.swift:12244–12275](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Codex/CodexAgentModeCoordinator.swift#L12244-L12275)
[E31]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Codex/CodexAgentModeCoordinator.swift#L12244-L12275
- **E32** — Mode-bearing selection IDs vs shared actual API identifier: [Sources/RepoPrompt/Infrastructure/AI/AIModel.swift:374–388](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/AIModel.swift#L374-L388)
[E32]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/AIModel.swift#L374-L388
- **E33** — Forced nonstream capability, effort, readable identity and mode: [Sources/RepoPrompt/Infrastructure/AI/AIModel.swift:1281–1370](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/AIModel.swift#L1281-L1370)
[E33]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/AIModel.swift#L1281-L1370
- **E34** — Mode-aware request transport/encoding: [Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIProvider.swift:199–226](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIProvider.swift#L199-L226)
[E34]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIProvider.swift#L199-L226
- **E35** — Disabled Use Streaming toggle and polling tooltip: [Sources/RepoPrompt/Features/Settings/Views/ModelOverrideSettingsView.swift:252–269](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Settings/Views/ModelOverrideSettingsView.swift#L252-L269)
[E35]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Settings/Views/ModelOverrideSettingsView.swift#L252-L269
- **E36** — Settled awaiting group vs terminal durable result: [Sources/RepoPrompt/Features/Chat/ViewModels/Oracle/OracleViewModel+GroupPresentation.swift:1–105](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Chat/ViewModels/Oracle/OracleViewModel%2BGroupPresentation.swift#L1-L105)
[E36]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Chat/ViewModels/Oracle/OracleViewModel%2BGroupPresentation.swift#L1-L105
- **E37** — Published app/headless binding and lifecycle qualifiers: [Sources/RepoPromptDomainRuntime/MCPDomainCanonicalToolDefinitions.swift:1669–1767](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/MCPDomainCanonicalToolDefinitions.swift#L1669-L1767)
[E37]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/MCPDomainCanonicalToolDefinitions.swift#L1669-L1767
- **E38** — Actual app binding/list/window/current-tab branches: [Sources/RepoPrompt/Infrastructure/MCP/WindowRoutingService.swift:1985–2115](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/WindowRoutingService.swift#L1985-L2115)
[E38]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/WindowRoutingService.swift#L1985-L2115
- **E39** — Actual headless binding behavior and window denial: [Sources/RepoPromptMCPCore/DirectHeadlessWorkspaceBackends.swift:101–145](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptMCPCore/DirectHeadlessWorkspaceBackends.swift#L101-L145)
[E39]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptMCPCore/DirectHeadlessWorkspaceBackends.swift#L101-L145
- **E40** — Visibility-aware list/switch/hide/unhide and window rejection: [Sources/RepoPromptMCPCore/DirectHeadlessWorkspaceBackends.swift:150–298](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptMCPCore/DirectHeadlessWorkspaceBackends.swift#L150-L298)
[E40]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptMCPCore/DirectHeadlessWorkspaceBackends.swift#L150-L298
- **E41** — Per-checkout contributor aggregation and all-root revalidation: [Sources/RepoPrompt/Features/ContextBuilder/Services/ContextBuilderReviewTarget.swift:550–689](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/ContextBuilder/Services/ContextBuilderReviewTarget.swift#L550-L689)
[E41]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/ContextBuilder/Services/ContextBuilderReviewTarget.swift#L550-L689
- **E42** — Authorization failure propagates before packaging: [Sources/RepoPrompt/Features/Prompt/Services/PromptContextPreAssemblyService.swift:330–355](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Prompt/Services/PromptContextPreAssemblyService.swift#L330-L355)
[E42]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Prompt/Services/PromptContextPreAssemblyService.swift#L330-L355
- **E43** — Restoration topology checks pending and abandoned execution: [Sources/RepoPrompt/App/WindowStateManager.swift:758–773](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/WindowStateManager.swift#L758-L773)
[E43]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/WindowStateManager.swift#L758-L773
- **E44** — Recovered initial load and once-only launch seeding: [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionLinkRuntimeBridge.swift:1887–1953](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionLinkRuntimeBridge.swift#L1887-L1953)
[E44]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionLinkRuntimeBridge.swift#L1887-L1953
- **E45** — Keyed ownership gated by lifecycle capability + version: [Sources/RepoPrompt/Infrastructure/AI/Providers/ClaudeCode/SDK/ClaudeNativeTurnCorrelation.swift:3–85](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/ClaudeCode/SDK/ClaudeNativeTurnCorrelation.swift#L3-L85)
[E45]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/ClaudeCode/SDK/ClaudeNativeTurnCorrelation.swift#L3-L85
- **E46** — Group-settled input outcomes and stale/superseded filtering: [Sources/RepoPrompt/Features/AgentMode/Runtime/Runners/ClaudeIntegratedAgentModeRunner.swift:498–591](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Runners/ClaudeIntegratedAgentModeRunner.swift#L498-L591)
[E46]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Runners/ClaudeIntegratedAgentModeRunner.swift#L498-L591
- **E47** — Bounded resume with fallback metadata page and common deadline: [Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift:1809–1873](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift#L1809-L1873)
[E47]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift#L1809-L1873
- **E48** — Transient Computer Use fence waits; structural gate still fails: [Sources/RepoPrompt/Features/AgentMode/Runtime/Codex/CodexAgentModeCoordinator.swift:2521–2555](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Codex/CodexAgentModeCoordinator.swift#L2521-L2555)
[E48]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Codex/CodexAgentModeCoordinator.swift#L2521-L2555
- **E49** — Bounded overlay/rebase compaction policy, not public benchmark: [Sources/RepoPrompt/Infrastructure/WorkspaceContext/Search/PathSearchIndex.swift:332–360](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/WorkspaceContext/Search/PathSearchIndex.swift#L332-L360)
[E49]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/WorkspaceContext/Search/PathSearchIndex.swift#L332-L360
- **E50** — Removed-folder path matcher and byte separators: [Sources/RepoPrompt/Features/WorkspaceFiles/ViewModels/WorkspaceFilesViewModel.swift:54–87](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/WorkspaceFiles/ViewModels/WorkspaceFilesViewModel.swift#L54-L87)
[E50]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/WorkspaceFiles/ViewModels/WorkspaceFilesViewModel.swift#L54-L87
- **E51** — Shared bounded quit/update cleanup/handoff: [Sources/RepoPrompt/App/AppTerminationCoordinator.swift:1–119](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/AppTerminationCoordinator.swift#L1-L119)
[E51]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/AppTerminationCoordinator.swift#L1-L119
- **E52** — Bounded captured-output drain before descriptors close: [Sources/RepoPromptProcess/CLIProcessRunner.swift:436–463](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptProcess/CLIProcessRunner.swift#L436-L463)
[E52]: https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptProcess/CLIProcessRunner.swift#L436-L463

### Supplemental call sites / gates / boundaries
- Auto Workflow default/save: [Sources/RepoPromptSettingsCore/GlobalSettingsStore.swift:1112–1121](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptSettingsCore/GlobalSettingsStore.swift#L1112-L1121)
- Shared Model Router service: [Sources/RepoPrompt/Features/Settings/Models/GlobalSettingsManager.swift:238–245](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Settings/Models/GlobalSettingsManager.swift#L238-L245)
- Demand active when router off: [Sources/RepoPrompt/Features/AgentMode/Routing/AgentTaskRouterDemandSource.swift:6–20](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Routing/AgentTaskRouterDemandSource.swift#L6-L20)
- Second concrete backend capabilities/old card chips: [Sources/RepoPrompt/Features/AgentMode/Routing/Backends/Jev/JevDecisionService.swift:9–46](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Routing/Backends/Jev/JevDecisionService.swift#L9-L46)
- Choosing-workflow label: [Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentPendingComposerSubmissionView.swift:12–27](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentPendingComposerSubmissionView.swift#L12-L27)
- Auto Workflow badges: [Sources/RepoPrompt/Features/Settings/Views/Router/RouterSettingsView.swift:890–910](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Settings/Views/Router/RouterSettingsView.swift#L890-L910)
- Pane installs single drop owner: [Sources/RepoPrompt/Features/AgentMode/Views/AgentModeView.swift:1780–1810](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentModeView.swift#L1780-L1810)
- Committed deletion removes retained images: [Sources/RepoPrompt/Features/AgentMode/Runtime/AgentSessionDataService.swift:1762–1806](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentSessionDataService.swift#L1762-L1806)
- Storage retention/eviction/downscaling: [Sources/RepoPromptDomainRuntime/ProviderContent/AgentSessionAttachmentStore.swift:212–486](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/ProviderContent/AgentSessionAttachmentStore.swift#L212-L486)
- Activation separate from model profile: [Sources/RepoPromptSettingsCore/GlobalSettingsDocument.swift:677–704](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptSettingsCore/GlobalSettingsDocument.swift#L677-L704)
- Workspace activation setter: [Sources/RepoPromptSettingsCore/GlobalSettingsStore.swift:306–318](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptSettingsCore/GlobalSettingsStore.swift#L306-L318)
- Auto-send after publication: [Sources/RepoPrompt/Features/AgentMode/Views/AgentInputBar.swift:633–650](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentInputBar.swift#L633-L650)
- Chat user Markdown: [Sources/RepoPrompt/Features/Chat/Views/Bubbles.swift:394–405](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Chat/Views/Bubbles.swift#L394-L405)
- self_noop schema/acknowledgement: [Sources/RepoPromptDomainRuntime/AgentSelfNoopTool.swift:1–16](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/AgentSelfNoopTool.swift#L1-L16)
- App route requires Agent Mode: [Sources/RepoPrompt/Infrastructure/MCP/WindowTools/MCPAgentSessionControlToolProvider.swift:16–43](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/WindowTools/MCPAgentSessionControlToolProvider.swift#L16-L43)
- Headless self_noop denial: [Sources/RepoPromptDomainRuntime/MCPDomainStandaloneCapabilityProvider.swift:325–340](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/MCPDomainStandaloneCapabilityProvider.swift#L325-L340)
- Acknowledgement is not quiet verdict: [Sources/RepoPrompt/Infrastructure/MCP/Agent/AgentSelfMCPToolService.swift:34–55](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/Agent/AgentSelfMCPToolService.swift#L34-L55)
- Policy gated capabilities: [Sources/RepoPromptDomainRuntime/MCPClientToolPolicy.swift:85–103](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/MCPClientToolPolicy.swift#L85-L103)
- Ordinary Settings excludes gated names: [Sources/RepoPrompt/Infrastructure/MCP/ToolAvailabilityStore.swift:43–51](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/ToolAvailabilityStore.swift#L43-L51)
- Codex approval parser: [Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift:5897–5947](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift#L5897-L5947)
- Notification request eligibility: [Sources/RepoPrompt/Features/AgentMode/Models/AgentNotificationActionEligibility.swift:170–186](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Models/AgentNotificationActionEligibility.swift#L170-L186)
- Streaming-request entry selects background path: [Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIProvider.swift:267–297](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIProvider.swift#L267-L297)
- Background response parameters: [Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIProvider.swift:709–743](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIProvider.swift#L709-L743)
- Actual polling status liveness: [Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIProvider.swift:864–928](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIProvider.swift#L864-L928)
- Mode JSON preserves SDK fields: [Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIResponseModeParameters.swift:1–25](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIResponseModeParameters.swift#L1-L25)
- Azure descriptor exclusion: [Sources/RepoPrompt/Infrastructure/AI/Providers/AzureOpenAIProvider.swift:960–975](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/AzureOpenAIProvider.swift#L960-L975)
- Azure generated selection exclusion: [Sources/RepoPrompt/Infrastructure/AI/AIModel.swift:546–565](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/AIModel.swift#L546-L565)
- MCP readable mode identity: [Sources/RepoPrompt/Infrastructure/MCP/ToolOutputFormatter.swift:4607–4622](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/ToolOutputFormatter.swift#L4607-L4622)
- Logical root set check: [Sources/RepoPrompt/Infrastructure/MCP/ViewModels/MCPServerViewModel+TabContext.swift:2152–2174](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/ViewModels/MCPServerViewModel%2BTabContext.swift#L2152-L2174)
- Codex bounded-page gate: [Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift:904–914](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift#L904-L914)
- Interrupt shared deadline: [Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift:2502–2589](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift#L2502-L2589)
- Computer Use dispatch revalidation: [Sources/RepoPrompt/Features/AgentMode/Runtime/Codex/CodexAgentModeCoordinator.swift:8260–8297](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Codex/CodexAgentModeCoordinator.swift#L8260-L8297)
- Catalog merge byte-exact checks: [Sources/RepoPrompt/Infrastructure/WorkspaceContext/WorkspaceFileContextStore.swift:9521–9820](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/WorkspaceContext/WorkspaceFileContextStore.swift#L9521-L9820)
- Equal expansion sets preserve order: [Sources/RepoPrompt/Features/Workspaces/ViewModels/WorkspaceManagerViewModel.swift:9865–9890](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Workspaces/ViewModels/WorkspaceManagerViewModel.swift#L9865-L9890)

### Baseline comparison anchors
- Former text classifier (deleted): [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentQuietCheckInClassifier.swift:1–85](https://github.com/repoprompt/repoprompt-ce/blob/3253f289a69a366b3e55bd28f47d024f932d77a5/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentQuietCheckInClassifier.swift#L1-L85)
- Former composer/drop and automatic-send implementation: [Sources/RepoPrompt/Features/AgentMode/Views/AgentInputBar.swift:620–680](https://github.com/repoprompt/repoprompt-ce/blob/3253f289a69a366b3e55bd28f47d024f932d77a5/Sources/RepoPrompt/Features/AgentMode/Views/AgentInputBar.swift#L620-L680)
- Former workflow dropdown: [Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentWorkflowsPopoverView.swift:138–160](https://github.com/repoprompt/repoprompt-ce/blob/3253f289a69a366b3e55bd28f47d024f932d77a5/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentWorkflowsPopoverView.swift#L138-L160)
- Former window-local Re-prompt activation: [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel.swift:2458–2470](https://github.com/repoprompt/repoprompt-ce/blob/3253f289a69a366b3e55bd28f47d024f932d77a5/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel.swift#L2458-L2470)
- Former common binding publication removed window_id: [Sources/RepoPromptDomainRuntime/MCPDomainCanonicalToolDefinitions.swift:1664–1683](https://github.com/repoprompt/repoprompt-ce/blob/3253f289a69a366b3e55bd28f47d024f932d77a5/Sources/RepoPromptDomainRuntime/MCPDomainCanonicalToolDefinitions.swift#L1664-L1683)

## Exhaustive changed-path coverage (248/248)

Coverage input: exact `git diff --name-status 3253f289a69a366b3e55bd28f47d024f932d77a5 37c06d9a7d798373b55d4294474b7f2a9aedcbde`; SHA-256 of its UTF-8 output: `75d67012849b34ede6298d86050a7e9c8c798ae939dfee46440f629e075ba509`. No renamed paths were reported. Top-level counts: `.agents` 2, `.github` 4, `Makefile` 1, `Packages` 5, `Scripts` 12, `Sources` 144, `Tests` 71, `docs` 8, `version.env` 1.

147 changed production source paths (144 under Sources, 3 package Sources), 73 test paths (71 root + 2 package), and 28 tooling/internal-doc/metadata paths. All are classified below. Tags overlap for common coordinators. T17 means test-only support, not independently shipped behavior. NREF is source-only view/type-checking refactor. Feature support is not an instruction to write a page for every file; follow the F-row and destination map. Each path link anchors its FIRST changed hunk for spot-checking; E-links supply substantive ranges. Deleted paths link to baseline.

| Status | Changed path (pinned first-hunk line) | Group | Documentation disposition / reason |
| --- | --- | --- | --- |
| M | [.agents/skills/rpce-contribution-check/references/validation-matrix.md](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/.agents/skills/rpce-contribution-check/references/validation-matrix.md#L21) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [.agents/skills/rpce-contribution-check/scripts/preflight.sh](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/.agents/skills/rpce-contribution-check/scripts/preflight.sh#L202) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| A | [.github/workflows/ci-integration-products.yml](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/.github/workflows/ci-integration-products.yml#L1) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [.github/workflows/ci-main.yml](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/.github/workflows/ci-main.yml#L11) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [.github/workflows/ci.yml](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/.github/workflows/ci.yml#L5) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [.github/workflows/release-candidate.yml](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/.github/workflows/release-candidate.yml#L9) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Makefile](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Makefile#L161) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Packages/RepoPromptAgentProviders/Sources/RepoPromptClaudeCompatibleProvider/ClaudeProviderStreamResult.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Packages/RepoPromptAgentProviders/Sources/RepoPromptClaudeCompatibleProvider/ClaudeProviderStreamResult.swift#L18) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Packages/RepoPromptAgentProviders/Sources/RepoPromptClaudeCompatibleProvider/ClaudeSDKNDJSONTranslator.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Packages/RepoPromptAgentProviders/Sources/RepoPromptClaudeCompatibleProvider/ClaudeSDKNDJSONTranslator.swift#L1) | F06/F14 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Packages/RepoPromptAgentProviders/Sources/RepoPromptClaudeCompatibleProvider/ClaudeSDKProtocolCodec.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Packages/RepoPromptAgentProviders/Sources/RepoPromptClaudeCompatibleProvider/ClaudeSDKProtocolCodec.swift#L189) | F14 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Packages/RepoPromptAgentProviders/Tests/RepoPromptClaudeCompatibleProviderTests/SDK/ClaudeSDKNDJSONTranslatorTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Packages/RepoPromptAgentProviders/Tests/RepoPromptClaudeCompatibleProviderTests/SDK/ClaudeSDKNDJSONTranslatorTests.swift#L6) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Packages/RepoPromptAgentProviders/Tests/RepoPromptClaudeCompatibleProviderTests/SDK/ClaudeSDKProtocolCodecTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Packages/RepoPromptAgentProviders/Tests/RepoPromptClaudeCompatibleProviderTests/SDK/ClaudeSDKProtocolCodecTests.swift#L73) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Scripts/Fixtures/codex-app-server-contract.json](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/Fixtures/codex-app-server-contract.json#L489) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| A | [Scripts/ci_admission.py](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/ci_admission.py#L1) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Scripts/ci_app_test_runner.py](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/ci_app_test_runner.py#L27) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Scripts/ci_test_coverage.py](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/ci_test_coverage.py#L57) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Scripts/modularization_ci_artifact.py](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/modularization_ci_artifact.py#L13) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Scripts/modularization_ci_build.py](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/modularization_ci_build.py#L14) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Scripts/source_layout_guardrails.sh](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/source_layout_guardrails.sh#L811) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| A | [Scripts/test_ci_admission.py](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/test_ci_admission.py#L1) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Scripts/test_ci_test_coverage.py](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/test_ci_test_coverage.py#L85) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Scripts/test_codex_app_server_schema.py](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/test_codex_app_server_schema.py#L99) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Scripts/test_contribution_preflight.py](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/test_contribution_preflight.py#L96) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Scripts/test_modularization_tooling.py](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Scripts/test_modularization_tooling.py#L333) | F17 | No user docs: contributor CI/admission/schema-fixture/tooling only; no install/build performed. |
| M | [Sources/RepoPrompt/App/AppDelegate.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/AppDelegate.swift#L25) | F16 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| A | [Sources/RepoPrompt/App/AppTerminationCoordinator.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/AppTerminationCoordinator.swift#L1) | F16 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/App/Sparkle/UpdateChannel.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/Sparkle/UpdateChannel.swift#L61) | F16 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/App/Views/ContentViewNotificationHandler.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/Views/ContentViewNotificationHandler.swift#L66) | NREF | No docs: opaque observer/notification-chain segmentation preserves control composition/order; type-checking refactor. |
| M | [Sources/RepoPrompt/App/WindowRestoreLifetime.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/WindowRestoreLifetime.swift#L6) | F13 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/App/WindowState.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/WindowState.swift#L594) | F13 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/App/WindowStateComposition.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/WindowStateComposition.swift#L278) | F03 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/App/WindowStateManager.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/App/WindowStateManager.swift#L79) | F13 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Models/AgentChatModels.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Models/AgentChatModels.swift#L254) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Models/AgentNotificationActionEligibility.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Models/AgentNotificationActionEligibility.swift#L73) | F07 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Models/AgentPendingInteractionDescriptor.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Models/AgentPendingInteractionDescriptor.swift#L33) | F07 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Models/AgentTranscriptModels.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Models/AgentTranscriptModels.swift#L114) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Models/UserInteractionModels.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Models/UserInteractionModels.swift#L934) | F07 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Routing/AgentTaskRouterDemandSource.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Routing/AgentTaskRouterDemandSource.swift#L9) | F01 | Feature support: new matching/configuration/runtime demand; see F01. |
| M | [Sources/RepoPrompt/Features/AgentMode/Routing/AgentTaskRouterRuntime.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Routing/AgentTaskRouterRuntime.swift#L229) | F01 | Feature support: new matching/configuration/runtime demand; see F01. |
| M | [Sources/RepoPrompt/Features/AgentMode/Routing/AgentTaskRoutingModels.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Routing/AgentTaskRoutingModels.swift#L4) | F01 | Feature support: new matching/configuration/runtime demand; see F01. |
| A | [Sources/RepoPrompt/Features/AgentMode/Routing/AutoWorkflowDecisionPolicy.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Routing/AutoWorkflowDecisionPolicy.swift#L1) | F01 | Feature support: new matching/configuration/runtime demand; see F01. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/AgentAttachmentStore.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentAttachmentStore.swift#L4) | F02/F03 | Feature support: attachment intake, preview, retention and deletion; see F02/F03. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/AgentModeRunService.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentModeRunService.swift#L70) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/AgentModeRunServiceHooks.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentModeRunServiceHooks.swift#L279) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunQuietLedger.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunQuietLedger.swift#L2) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunTerminalCommitBarrier.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunTerminalCommitBarrier.swift#L153) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunTerminalSessionBinding.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentRunTerminalSessionBinding.swift#L15) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| A | [Sources/RepoPrompt/Features/AgentMode/Runtime/AgentSessionDataService+Attachments.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentSessionDataService%2BAttachments.swift#L1) | F02/F03 | Feature support: attachment intake, preview, retention and deletion; see F02/F03. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/AgentSessionDataService.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/AgentSessionDataService.swift#L71) | F03 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/Claude/ClaudeAgentModeCoordinator.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Claude/ClaudeAgentModeCoordinator.swift#L411) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/Codex/CodexAgentModeCoordinator.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Codex/CodexAgentModeCoordinator.swift#L2521) | F06/F07/F14 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/Delegation/DelegationScopeRuntime.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Delegation/DelegationScopeRuntime.swift#L106) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/Runners/ACPIntegratedAgentModeRunner.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Runners/ACPIntegratedAgentModeRunner.swift#L2188) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/Runners/ClaudeIntegratedAgentModeRunner.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Runners/ClaudeIntegratedAgentModeRunner.swift#L356) | F06/F14 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentModeViewModel+SessionLinkAutoWake.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentModeViewModel%2BSessionLinkAutoWake.swift#L85) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentModeViewModel+SessionLinkPrompt.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentModeViewModel%2BSessionLinkPrompt.swift#L2) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentModeViewModel+SessionLinks.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentModeViewModel%2BSessionLinks.swift#L125) | F13 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| D | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentQuietCheckInClassifier.swift](https://github.com/repoprompt/repoprompt-ce/blob/3253f289a69a366b3e55bd28f47d024f932d77a5/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentQuietCheckInClassifier.swift#L1) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionDeletionRegistry.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionDeletionRegistry.swift#L156) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionLinkPassiveStatusNotices.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionLinkPassiveStatusNotices.swift#L148) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionLinkPromptContext.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionLinkPromptContext.swift#L719) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionLinkProviderInputRelease.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionLinkProviderInputRelease.swift#L8) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionLinkRuntimeBridge.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionLinkRuntimeBridge.swift#L840) | F06/F13 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionOversightIntentStore.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionOversightIntentStore.swift#L164) | F13 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionOversightLaunchCoordinator.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionOversightLaunchCoordinator.swift#L300) | F13 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionOversightState.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/SessionLinks/AgentSessionOversightState.swift#L26) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/ToolTracking/AgentToolTrackingContracts.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/ToolTracking/AgentToolTrackingContracts.swift#L19) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/ToolTracking/ClaudeAgentToolTrackingHandler.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/ToolTracking/ClaudeAgentToolTrackingHandler.swift#L52) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/Transcript/AgentTranscriptHistoricalTruncationPolicy.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Transcript/AgentTranscriptHistoricalTruncationPolicy.swift#L111) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Runtime/Transcript/AgentTranscriptServices.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Runtime/Transcript/AgentTranscriptServices.swift#L100) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/Services/SessionAdminStructureHost.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Services/SessionAdminStructureHost.swift#L29) | F03 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| A | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+AutoWorkflow.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BAutoWorkflow.swift#L1) | F01 | Feature support: new matching/configuration/runtime demand; see F01. |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+ComposerSubmission.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BComposerSubmission.swift#L45) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+ComposerUI.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BComposerUI.swift#L42) | F02 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+DraftsAttachments.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BDraftsAttachments.swift#L419) | F02/F03 | Feature support: attachment intake, preview, retention and deletion; see F02/F03. |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+Reprompt.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BReprompt.swift#L28) | F04 | Feature support: Re-prompt state/completion UI; see F04 (workflow interaction also F01). |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+RepromptAutomation.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BRepromptAutomation.swift#L130) | F01/F04 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+RepromptUI.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BRepromptUI.swift#L39) | F04 | Feature support: Re-prompt state/completion UI; see F04 (workflow interaction also F01). |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+Routing.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BRouting.swift#L171) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| A | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+SelfNoop.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BSelfNoop.swift#L1) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+TranscriptUI.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BTranscriptUI.swift#L47) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+Types.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BTypes.swift#L817) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel+UsageBalancing.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel%2BUsageBalancing.swift#L58) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentModeViewModel.swift#L679) | F01/F03/F04/F06/F07/F12 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentTabSession.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/AgentTabSession.swift#L3) | F03/F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/ViewModels/UI/AgentComposerUIModels.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/ViewModels/UI/AgentComposerUIModels.swift#L190) | F01/F02 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| A | [Sources/RepoPrompt/Features/AgentMode/Views/AgentAttachmentDropTarget.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentAttachmentDropTarget.swift#L1) | F02/F03 | Feature support: attachment intake, preview, retention and deletion; see F02/F03. |
| M | [Sources/RepoPrompt/Features/AgentMode/Views/AgentAttachmentsStrip.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentAttachmentsStrip.swift#L2) | F02/F03 | Feature support: attachment intake, preview, retention and deletion; see F02/F03. |
| A | [Sources/RepoPrompt/Features/AgentMode/Views/AgentImagePreviewSheet.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentImagePreviewSheet.swift#L1) | F03 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Views/AgentInputBar.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentInputBar.swift#L144) | F02/F04 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Views/AgentMessageBubble.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentMessageBubble.swift#L360) | F03/F05 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Views/AgentModeView.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/AgentModeView.swift#L217) | F02 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentOraclePill.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentOraclePill.swift#L298) | F09 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentPendingComposerSubmissionView.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentPendingComposerSubmissionView.swift#L19) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentRepromptComposerStrip.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentRepromptComposerStrip.swift#L12) | F04 | Feature support: Re-prompt state/completion UI; see F04 (workflow interaction also F01). |
| M | [Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentStatusPillsRow.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentStatusPillsRow.swift#L55) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentWorkflowPill.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentWorkflowPill.swift#L2) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentWorkflowsPopoverView.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/Components/AgentWorkflowsPopoverView.swift#L1) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/AgentMode/Views/ContextDrawer/AgentContextDrawerFilesTab.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/AgentMode/Views/ContextDrawer/AgentContextDrawerFilesTab.swift#L207) | NREF | No docs: opaque observer/notification-chain segmentation preserves control composition/order; type-checking refactor. |
| M | [Sources/RepoPrompt/Features/Chat/Services/OracleGroupLanePayloadLoader.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Chat/Services/OracleGroupLanePayloadLoader.swift#L76) | F08 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/Chat/ViewModels/Oracle/OracleViewModel+GroupPresentation.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Chat/ViewModels/Oracle/OracleViewModel%2BGroupPresentation.swift#L7) | F09 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/Chat/Views/Bubbles.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Chat/Views/Bubbles.swift#L15) | F05/F09 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/ContextBuilder/Services/ContextBuilderReviewTarget.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/ContextBuilder/Services/ContextBuilderReviewTarget.swift#L30) | F12 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/Diagnostics/AgentMode/AgentSessionLinkCatalogDiagnostics.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Diagnostics/AgentMode/AgentSessionLinkCatalogDiagnostics.swift#L74) | F17 | No user docs: instrumentation/debug stress harness only, not a new ordinary UI preference. |
| M | [Sources/RepoPrompt/Features/Diagnostics/AgentMode/Stress/AgentChatStressHarness.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Diagnostics/AgentMode/Stress/AgentChatStressHarness.swift#L1392) | F17 | No user docs: instrumentation/debug stress harness only, not a new ordinary UI preference. |
| M | [Sources/RepoPrompt/Features/Diagnostics/App/StartupPhaseLog.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Diagnostics/App/StartupPhaseLog.swift#L4) | F17 | No user docs: instrumentation/debug stress harness only, not a new ordinary UI preference. |
| M | [Sources/RepoPrompt/Features/Diagnostics/App/WorkspaceRestorePerfLog.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Diagnostics/App/WorkspaceRestorePerfLog.swift#L232) | F17 | No user docs: instrumentation/debug stress harness only, not a new ordinary UI preference. |
| M | [Sources/RepoPrompt/Features/Prompt/Services/PromptContextPreAssemblyService.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Prompt/Services/PromptContextPreAssemblyService.swift#L344) | F12 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/Prompt/ViewModels/PromptViewModel.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Prompt/ViewModels/PromptViewModel.swift#L7392) | F12 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/Settings/Models/GlobalSettingsManager.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Settings/Models/GlobalSettingsManager.swift#L236) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/Settings/ViewModels/Router/RouterSettingsViewModel.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Settings/ViewModels/Router/RouterSettingsViewModel.swift#L31) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/Settings/Views/AgentPermissionsSettingsView.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Settings/Views/AgentPermissionsSettingsView.swift#L201) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/Settings/Views/ModelOverrideSettingsView.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Settings/Views/ModelOverrideSettingsView.swift#L256) | F08 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/Settings/Views/Router/RouterSettingsView.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Settings/Views/Router/RouterSettingsView.swift#L43) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/WorkspaceFiles/ViewModels/WorkspaceFilesViewModel.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/WorkspaceFiles/ViewModels/WorkspaceFilesViewModel.swift#L55) | F15 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Features/Workspaces/ViewModels/WorkspaceManagerViewModel.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Features/Workspaces/ViewModels/WorkspaceManagerViewModel.swift#L9871) | F15 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/AI/ACP/ACPAgentSessionController.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/ACP/ACPAgentSessionController.swift#L2085) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/AI/AIModel.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/AIModel.swift#L93) | F08 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/AI/Agents/AgentToolTracker.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Agents/AgentToolTracker.swift#L153) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/AI/Decisions/DecisionModels.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Decisions/DecisionModels.swift#L24) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/AI/Prompts/AgentSessionLinkPrompts.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Prompts/AgentSessionLinkPrompts.swift#L260) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/AI/Providers/AzureOpenAIProvider.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/AzureOpenAIProvider.swift#L964) | F08 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/AI/Providers/ClaudeCode/ClaudeCompatibleProviderRuntimeBridge.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/ClaudeCode/ClaudeCompatibleProviderRuntimeBridge.swift#L281) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/AI/Providers/ClaudeCode/SDK/ClaudeNativeProcessSessionController.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/ClaudeCode/SDK/ClaudeNativeProcessSessionController.swift#L87) | F06/F14 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| A | [Sources/RepoPrompt/Infrastructure/AI/Providers/ClaudeCode/SDK/ClaudeNativeTurnCorrelation.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/ClaudeCode/SDK/ClaudeNativeTurnCorrelation.swift#L1) | F14 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/AI/Providers/ClaudeCode/SDK/ClaudeSDKProtocolCodec.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/ClaudeCode/SDK/ClaudeSDKProtocolCodec.swift#L65) | F14 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/Codex/AppServer/CodexNativeSessionController.swift#L161) | F06/F07/F14 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIProvider.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIProvider.swift#L97) | F08 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| A | [Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIResponseModeParameters.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/AI/Providers/OpenAIResponseModeParameters.swift#L1) | F08 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/Agent/AgentSelfMCPToolService.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/Agent/AgentSelfMCPToolService.swift#L25) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/AgentSessionLinkRunCatalogObservation.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/AgentSessionLinkRunCatalogObservation.swift#L19) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/MCPConnectionManager.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/MCPConnectionManager.swift#L439) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/MCPInvocationContext.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/MCPInvocationContext.swift#L2) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/MCPToolCardOwnershipLedger.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/MCPToolCardOwnershipLedger.swift#L74) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/ToolAvailabilityStore.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/ToolAvailabilityStore.swift#L13) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/ToolOutputFormatter.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/ToolOutputFormatter.swift#L4613) | F08 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/ViewModels/MCPServerViewModel+TabContext.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/ViewModels/MCPServerViewModel%2BTabContext.swift#L2155) | F12 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/ViewModels/MCPServerViewModel.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/ViewModels/MCPServerViewModel.swift#L1107) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/WindowRoutingService.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/WindowRoutingService.swift#L461) | F10/F11 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/WindowTools/MCPAgentSessionControlToolProvider.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/WindowTools/MCPAgentSessionControlToolProvider.swift#L23) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/WindowTools/MCPAppToolGroup.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/WindowTools/MCPAppToolGroup.swift#L64) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/MCP/WindowTools/MCPContextBuilderToolProvider.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/MCP/WindowTools/MCPContextBuilderToolProvider.swift#L370) | F12 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/UI/Agent/AgentApprovalCard.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/UI/Agent/AgentApprovalCard.swift#L77) | F07 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| A | [Sources/RepoPrompt/Infrastructure/UI/Components/AgentAttachmentImageCache.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/UI/Components/AgentAttachmentImageCache.swift#L1) | F02/F03 | Feature support: attachment intake, preview, retention and deletion; see F02/F03. |
| M | [Sources/RepoPrompt/Infrastructure/UI/Components/AttachmentTile.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/UI/Components/AttachmentTile.swift#L198) | F03 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/UI/TextField/ResizableTextField.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/UI/TextField/ResizableTextField.swift#L3) | F02 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/WorkspaceContext/Models/WorkspaceFileContextModels.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/WorkspaceContext/Models/WorkspaceFileContextModels.swift#L482) | F15 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/WorkspaceContext/Search/PathSearchIndex.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/WorkspaceContext/Search/PathSearchIndex.swift#L38) | F15 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPrompt/Infrastructure/WorkspaceContext/WorkspaceFileContextStore.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPrompt/Infrastructure/WorkspaceContext/WorkspaceFileContextStore.swift#L375) | F15 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| A | [Sources/RepoPromptDomainRuntime/AgentSelfNoopTool.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/AgentSelfNoopTool.swift#L1) | F06 | Feature support: conservative quiet qualification/catalog/correlation/local projection; no separate user control. |
| M | [Sources/RepoPromptDomainRuntime/DomainAgentSessionLinkAuthority.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/DomainAgentSessionLinkAuthority.swift#L44) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPromptDomainRuntime/DomainAgentSessionLinkModels.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/DomainAgentSessionLinkModels.swift#L1145) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPromptDomainRuntime/DomainDelegationScope.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/DomainDelegationScope.swift#L86) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPromptDomainRuntime/MCPDomainCanonicalToolDefinitions.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/MCPDomainCanonicalToolDefinitions.swift#L1116) | F06/F10/F11 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPromptDomainRuntime/MCPDomainStandaloneCapabilityProvider.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/MCPDomainStandaloneCapabilityProvider.swift#L329) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPromptDomainRuntime/MCPDomainToolCatalog.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/MCPDomainToolCatalog.swift#L38) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPromptDomainRuntime/ProviderContent/AIProviderResults.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/ProviderContent/AIProviderResults.swift#L127) | F06 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPromptDomainRuntime/ProviderContent/AgentAttachmentStore.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/ProviderContent/AgentAttachmentStore.swift#L116) | F02/F03 | Feature support: attachment intake, preview, retention and deletion; see F02/F03. |
| A | [Sources/RepoPromptDomainRuntime/ProviderContent/AgentImageAttachmentIntake.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/ProviderContent/AgentImageAttachmentIntake.swift#L1) | F02/F03 | Feature support: attachment intake, preview, retention and deletion; see F02/F03. |
| A | [Sources/RepoPromptDomainRuntime/ProviderContent/AgentSessionAttachmentStore.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptDomainRuntime/ProviderContent/AgentSessionAttachmentStore.swift#L1) | F02/F03 | Feature support: attachment intake, preview, retention and deletion; see F02/F03. |
| M | [Sources/RepoPromptInstrumentation/AgentSessionLinkCatalogInstrumentation.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptInstrumentation/AgentSessionLinkCatalogInstrumentation.swift#L21) | F17 | No user docs: instrumentation/debug stress harness only, not a new ordinary UI preference. |
| M | [Sources/RepoPromptInstrumentation/WorkspaceRestorePerfInstrumentation.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptInstrumentation/WorkspaceRestorePerfInstrumentation.swift#L3) | F17 | No user docs: instrumentation/debug stress harness only, not a new ordinary UI preference. |
| M | [Sources/RepoPromptMCPCore/DirectHeadlessWorkspaceBackends.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptMCPCore/DirectHeadlessWorkspaceBackends.swift#L158) | F10/F11 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPromptMCPCore/MCPCLIProcess.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptMCPCore/MCPCLIProcess.swift#L13) | F17 | No standalone prose: release/CLI identity metadata; not a new command. |
| M | [Sources/RepoPromptProcess/CLIProcessRunner.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptProcess/CLIProcessRunner.swift#L192) | F16 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPromptSettingsCore/GlobalSettingsDocument.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptSettingsCore/GlobalSettingsDocument.swift#L100) | F01/F04 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPromptSettingsCore/GlobalSettingsStore.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptSettingsCore/GlobalSettingsStore.swift#L51) | F01/F04 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| M | [Sources/RepoPromptSettingsCore/RoutingSettingsSnapshot.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Sources/RepoPromptSettingsCore/RoutingSettingsSnapshot.swift#L12) | F01 | Feature evidence/support: apply only the corresponding F-row disposition; no independent page for this implementation file. |
| A | [Tests/RepoPromptDomainRuntimeTests/AgentImageAttachmentIntakeTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptDomainRuntimeTests/AgentImageAttachmentIntakeTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| A | [Tests/RepoPromptDomainRuntimeTests/AgentSessionAttachmentStoreTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptDomainRuntimeTests/AgentSessionAttachmentStoreTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptDomainRuntimeTests/DomainAgentSessionLinkAuthorityTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptDomainRuntimeTests/DomainAgentSessionLinkAuthorityTests.swift#L3116) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptDomainRuntimeTests/MCPDomainStandaloneCompositionTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptDomainRuntimeTests/MCPDomainStandaloneCompositionTests.swift#L36) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| A | [Tests/RepoPromptMCPCoreTests/DirectHeadlessManageWorkspacesVisibilityTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptMCPCoreTests/DirectHeadlessManageWorkspacesVisibilityTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptMCPCoreTests/DirectHeadlessWorkingDirectoryBindingTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptMCPCoreTests/DirectHeadlessWorkingDirectoryBindingTests.swift#L57) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptProcessTests/CLIProcessRunnerCancellationTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptProcessTests/CLIProcessRunnerCancellationTests.swift#L175) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| A | [Tests/RepoPromptProcessTests/CLIProcessRunnerCapturedOutputTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptProcessTests/CLIProcessRunnerCapturedOutputTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptSettingsCoreTests/AgentRepromptSchemaTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptSettingsCoreTests/AgentRepromptSchemaTests.swift#L17) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| A | [Tests/RepoPromptSettingsCoreTests/AutoWorkflowPersistenceTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptSettingsCoreTests/AutoWorkflowPersistenceTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptSettingsCoreTests/SettingsCoreContractTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptSettingsCoreTests/SettingsCoreContractTests.swift#L20) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AI/CodexComputerUseCompanionToolNameTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AI/CodexComputerUseCompanionToolNameTests.swift#L55) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AI/CodexNativeSessionControllerInterruptTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AI/CodexNativeSessionControllerInterruptTests.swift#L260) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AI/CurrentModelCatalogTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AI/CurrentModelCatalogTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AI/ProviderStreamCompletionTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AI/ProviderStreamCompletionTests.swift#L49) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/ACPPermissionScopeTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/ACPPermissionScopeTests.swift#L943) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/AgentComposerSubmissionAttemptTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/AgentComposerSubmissionAttemptTests.swift#L1742) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/AgentOraclePillRoutingTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/AgentOraclePillRoutingTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/AgentRepromptSubmissionTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/AgentRepromptSubmissionTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/AgentSessionDataServiceDeletionTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/AgentSessionDataServiceDeletionTests.swift#L405) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/ClaudeCompatible/ClaudeNativeApprovalAndResumeTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/ClaudeCompatible/ClaudeNativeApprovalAndResumeTests.swift#L1374) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/Codex/CodexResumeWedgeCommitTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/Codex/CodexResumeWedgeCommitTests.swift#L1114) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/OpenCodeACPLaunchResolverTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/OpenCodeACPLaunchResolverTests.swift#L50) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/Routing/AgentTaskRouterCoreTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/Routing/AgentTaskRouterCoreTests.swift#L1088) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/Routing/AutoEffortPolicyTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/Routing/AutoEffortPolicyTests.swift#L469) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| D | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietCheckInClassifierTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/3253f289a69a366b3e55bd28f47d024f932d77a5/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietCheckInClassifierTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietCheckInDisplayMaskTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietCheckInDisplayMaskTests.swift#L2) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietCheckInLifecycleTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietCheckInLifecycleTests.swift#L41) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietCheckInModelTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietCheckInModelTests.swift#L35) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietCheckInTestSupport.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietCheckInTestSupport.swift#L2) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| A | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietDeclarationBodyFeasibilityTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietDeclarationBodyFeasibilityTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| A | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietInvocationFeasibilityTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentQuietInvocationFeasibilityTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentRunQuietLedgerTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentRunQuietLedgerTests.swift#L7) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionHandoffWorktreeBindingTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionHandoffWorktreeBindingTests.swift#L19) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkAutoWakeTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkAutoWakeTests.swift#L1867) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkCanonicalTranscriptTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkCanonicalTranscriptTests.swift#L2) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkCodexCatalogRepairIntegrationTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkCodexCatalogRepairIntegrationTests.swift#L588) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| A | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkLateQualificationTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkLateQualificationTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkPassiveStatusNoticeTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkPassiveStatusNoticeTests.swift#L1055) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkPromptAdapterTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkPromptAdapterTests.swift#L339) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkPromptSupplementTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkPromptSupplementTests.swift#L4587) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkRunnerPromptAdapterTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkRunnerPromptAdapterTests.swift#L186) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkRuntimeBridgeTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkRuntimeBridgeTests.swift#L4576) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkSendTransactionLiveTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionLinkSendTransactionLiveTests.swift#L538) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionOversightLaunchCoordinatorTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/SessionLinks/AgentSessionOversightLaunchCoordinatorTests.swift#L377) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/Transcript/AgentConversationReplaySerializationTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/Transcript/AgentConversationReplaySerializationTests.swift#L3) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/Transcript/AgentRetentionCompactionTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/Transcript/AgentRetentionCompactionTests.swift#L10) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/AgentMode/Transcript/AgentTranscriptDebugInstrumentationTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/AgentMode/Transcript/AgentTranscriptDebugInstrumentationTests.swift#L12) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/App/AppTerminationSignalRoutingTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/App/AppTerminationSignalRoutingTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/App/StartupPhaseLogTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/App/StartupPhaseLogTests.swift#L2) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/App/WindowSessionRestorePersistenceGateTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/App/WindowSessionRestorePersistenceGateTests.swift#L10) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/Chat/MessageBubbleActionPolicyTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/Chat/MessageBubbleActionPolicyTests.swift#L9) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/Chat/OracleExecutionResolverTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/Chat/OracleExecutionResolverTests.swift#L9) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/Chat/OracleLaneMarkdownFormatterTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/Chat/OracleLaneMarkdownFormatterTests.swift#L71) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/ContextBuilder/ContextBuilderMultiRootDiscoveryDriver.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/ContextBuilder/ContextBuilderMultiRootDiscoveryDriver.swift#L231) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/ContextBuilder/ContextBuilderMultiRootDiscoveryTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/ContextBuilder/ContextBuilderMultiRootDiscoveryTests.swift#L5) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/ContextBuilder/ContextBuilderWorkspaceReadinessTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/ContextBuilder/ContextBuilderWorkspaceReadinessTests.swift#L3) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/Helpers/AgentSessionLinkRunnerTestSupport.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/Helpers/AgentSessionLinkRunnerTestSupport.swift#L77) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/MCP/AgentSelfMCPToolServiceTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/MCP/AgentSelfMCPToolServiceTests.swift#L379) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/MCP/Control/BindContextFileAuthorityTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/MCP/Control/BindContextFileAuthorityTests.swift#L784) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/MCP/Control/MCPExportWatchdogIntegrationTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/MCP/Control/MCPExportWatchdogIntegrationTests.swift#L15) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/MCP/MCPContextBuilderGitReviewPolicyTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/MCP/MCPContextBuilderGitReviewPolicyTests.swift#L141) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/MCP/MCPStateSubscriptionTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/MCP/MCPStateSubscriptionTests.swift#L5) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/MCP/OracleGroupBoundaryTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/MCP/OracleGroupBoundaryTests.swift#L1293) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/MCP/SessionAdminScopeLifecycleTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/MCP/SessionAdminScopeLifecycleTests.swift#L8008) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/Settings/AutoEffortSettingsPersistenceTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/Settings/AutoEffortSettingsPersistenceTests.swift#L94) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/WorkspaceContext/Search/PathSearchIndexRecoveryTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/WorkspaceContext/Search/PathSearchIndexRecoveryTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/WorkspaceContext/WorkspaceFileContextCatalogReconciliationBatchTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/WorkspaceContext/WorkspaceFileContextCatalogReconciliationBatchTests.swift#L186) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/WorkspaceContext/WorkspaceRootCatalogAdmissibilityTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/WorkspaceContext/WorkspaceRootCatalogAdmissibilityTests.swift#L1) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/WorkspaceFiles/HiddenSessionSlicePathIndexTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/WorkspaceFiles/HiddenSessionSlicePathIndexTests.swift#L4) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [Tests/RepoPromptTests/Workspaces/WorkspaceEphemeralPersistenceTests.swift](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/Tests/RepoPromptTests/Workspaces/WorkspaceEphemeralPersistenceTests.swift#L1149) | T17 | No standalone docs: regression/specification support; not executed; see matching feature source. |
| M | [docs/architecture/agent-session-oversight-auto-wake.md](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/docs/architecture/agent-session-oversight-auto-wake.md#L936) | F06/F13 | No direct user-doc import: internal architecture/generated spec; corroborates source or contributor tooling. |
| A | [docs/architecture/ci-admission.md](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/docs/architecture/ci-admission.md#L1) | F17 | No direct user-doc import: internal architecture/generated spec; corroborates source or contributor tooling. |
| M | [docs/architecture/ci-test-gates.md](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/docs/architecture/ci-test-gates.md#L3) | F17 | No direct user-doc import: internal architecture/generated spec; corroborates source or contributor tooling. |
| M | [docs/architecture/model-routing.md](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/docs/architecture/model-routing.md#L7) | F01 | No direct user-doc import: internal architecture/generated spec; corroborates source or contributor tooling. |
| M | [docs/architecture/oracle-attachments.md](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/docs/architecture/oracle-attachments.md#L60) | F02/F03 | No direct user-doc import: internal architecture/generated spec; corroborates source or contributor tooling. |
| M | [docs/architecture/settings-persistence.md](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/docs/architecture/settings-persistence.md#L62) | F01/F04 | No direct user-doc import: internal architecture/generated spec; corroborates source or contributor tooling. |
| M | [docs/spec/mcp-domain-canonical-tool-definitions.generated.json](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/docs/spec/mcp-domain-canonical-tool-definitions.generated.json#L109) | F06/F10/F11 | No direct user-doc import: internal architecture/generated spec; corroborates source or contributor tooling. |
| M | [docs/testing.md](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/docs/testing.md#L90) | F17 | No direct user-doc import: internal architecture/generated spec; corroborates source or contributor tooling. |
| M | [version.env](https://github.com/repoprompt/repoprompt-ce/blob/37c06d9a7d798373b55d4294474b7f2a9aedcbde/version.env#L3) | F17 | No standalone prose: release/CLI identity metadata; not a new command. |

## Existing image-asset coverage

234 image assets in the template collection, including unreferenced files. Every asset is NOT VISUALLY VERIFIED FOR v1.8.0; dimensions/hashes are byte inventory, not privacy/accessibility/appearance review. No image was created, edited, resized or cropped. Future destination is the same relative path under version-1.8.0. Exact present MDX consumers are listed; their slugs are in frontmatter. Unreferenced means no Markdown image consumer found, not permission to delete an original.

| Template-relative image | Pixels / SHA-256 | MDX consumers (template-relative) | Decision |
| --- | --- | --- | --- |
| `agent-mode/images/auto-effort-confirmation.png` | 528×646; `436e91eb05e22e3dd30c621b572e5a9f4bbea4d54472458d315b55f82320e367` | `agent-mode/auto-effort.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `agent-mode/images/auto-effort.png` | 972×306; `4a58932bf6f814c6ecc101c22ac0939b956f661683383271ed6e1e666945dc61` | `agent-mode/auto-effort.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `agent-mode/images/composer.png` | 1764×304; `57c23e63ac3cd120c08b04b98e27edf24aa5ff7bf1423fa1d140c83559f3c4a7` | `agent-mode/message-editor.mdx`, `agent-mode/oracle.mdx`, `agent-mode/overview.mdx`, `index.mdx` | S03/S10: Retain idle/button example; not new drop/preview/result states. |
| `agent-mode/images/computer-use.png` | 72×76; `56ca17fddc27d755c30ea8c68ad0e0209ecc9ed75975734d62ae65f770b7a2c4` | `agent-mode/computer-use.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `agent-mode/images/context-builder.png` | 1170×800; `90a4ab8c738bc06389569bb82a82ba08fd09c022ab2d428569a835cb41ba4d14` | `agent-mode/context-builder.mdx` | S12: Retain candidate; no changed visual control from review/index fixes. |
| `agent-mode/images/context-prompt.png` | 1154×332; `b14e6ee1769a70df587f3135e46419624186a90eb59ce67af593aead8c56ed1f` | `agent-mode/context-builder.mdx` | S12: Retain candidate; no changed visual control from review/index fixes. |
| `agent-mode/images/context-selections.png` | 1110×1300; `a3f74d8e6279be6c4d188933707f2c2180dc647bf4d36ed46ba083e15695cdd3` | `agent-mode/context-builder.mdx` | S12: Retain candidate; no changed visual control from review/index fixes. |
| `agent-mode/images/context-usage.png` | 482×284; `a6b29a9d6efb9d383573757ed9d6ac74d65aba9e08b5ef1bd692c0fdfa6b1194` | `agent-mode/context-builder.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `agent-mode/images/execution-location.png` | 600×340; `b5914e09e5cf0d2f28fce9b4835bbaabd1ece9de19d0202726c49f4c3e114eb2` | `agent-mode/execution-location.mdx`, `worktrees/create-and-use.mdx` | S12: Retain candidate; no changed visual control from review/index fixes. |
| `agent-mode/images/image-attachment.png` | 84×76; `a969571535d9868babff3f55c18f06ab52a0bddfda7d11d1987ebcc1f1a604b9` | `agent-mode/image-support.mdx` | S03/S10: Retain idle/button example; not new drop/preview/result states. |
| `agent-mode/images/interview.png` | 578×176; `8c65ce27e783de259cb526aeb449a9cddb0981113e7ccce72f37c8323ac7898a` | `agent-mode/interviewer.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `agent-mode/images/model-effort.png` | 1350×85; `39e55f623e382fd6acbd79dae82af995a19058701a685a002b835a7c36b4244a` | `agent-mode/model-and-effort.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `agent-mode/images/model-router.png` | 952×320; `88d6e1dec6a8fab5d600b5c59282f235643fb5850412aeaf43598176c86596f3` | `agent-mode/model-router.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `agent-mode/images/permissions.png` | 572×626; `ffb0ac34135c3e992e461beb9d4647493162caf1e972a0e57c0766638142132f` | `agent-mode/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `agent-mode/images/re-prompt.png` | 746×714; `de70a8dcbd8e1702df39f5bb7b36bf4061796c8888513f5ae7b8a99c3148d543` | `agent-mode/re-prompter.mdx` | S05: Retain disclosure/profile example; new ready-state viewer absent. |
| `agent-mode/images/tools.png` | 604×744; `8140f0fd6a42a32dd7b8480f7633a94f9f46b2dc592732826e4e6f892de19ea8` | `agent-mode/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `agent-mode/images/workflow-cards-more.png` | 1344×582; `bef6d35bca2c79841f5e06afd15bb94b6b9e8bdf56a76a983bb2b3711d9d13d4` | `agent-mode/workflow-templates.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `agent-mode/images/workflow-cards.png` | 1338×598; `dbf2c263d5d298c816fea317a3503161b46bbfa8c675c9a9d17de83c01ec1659` | `agent-mode/overview.mdx`, `agent-mode/workflow-templates.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `agent-mode/images/workflow-selector.png` | 650×820; `034b86cf0824cf98568f673dae59fd41043196d08ea6eac4b3f09beeac8fa582` | `agent-mode/workflow-templates.mdx` | S01: Replace/remove complete-dropdown image; new toggle absent. |
| `mcp-server/images/mcp-context-builder.png` | 736×168; `952c87aa3c87d597e8b3e4db58fd047dfec38514b62f8744d6d55e53dfee84c9` | `mcp-server/mcp-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/mcp-install-menu.png` | 466×756; `f2cab8b1633f5fc7ec7cfeadc4a6f95e86674dbae1b5864ea4fbed8c3dc2b053` | `mcp-server/mcp-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/mcp-oracle-presets.png` | 736×276; `1c0f936518a5991897b29f668671876748ab2e092184ffd66d58e2bbbce9aff0` | `mcp-server/mcp-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/mcp-quick-setup.png` | 736×250; `21a6c9484e1df59f0cab1b8beb9c8fde6b7e55a45b9910adc7a4f7c50c8bdf63` | `mcp-server/mcp-setup.mdx`, `mcp-server/workflow-commands.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/mcp-server-popover.png` | 736×1122; `b1f884bbd69d831c7510a2736d118c284554e16b06f59b747d4001a980faa7b8` | `mcp-server/mcp-overview.mdx`, `mcp-server/mcp-settings.mdx` | S07: Retain candidate; standard-client 21 count is not total 32. |
| `mcp-server/images/mcp-skills-menu.png` | 506×528; `220d473a5e33ffe0d6d00f689738c268d3f86f680ed2bc6f634bbaf9d53430ed` | `mcp-server/mcp-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/mcp-toolbar.png` | 164×94; `57137c2a5766aaf5467259af7b341648aeccc2c14350bdf467b1082b12a0fa01` | `mcp-server/mcp-overview.mdx`, `mcp-server/setup-wizard.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/mcp-window-access.png` | 736×386; `dc18b483b6de6833330d73bce6e0063e39a5877ad02d60ea83003cf23683c4b5` | `mcp-server/mcp-settings.mdx`, `mcp-server/mcp-setup.mdx` | S07: Retain candidate; standard-client 21 count is not total 32. |
| `mcp-server/images/wizard-context-builder.png` | 938×968; `d0dc683bcba15c79780aec005ee6eb36ffab704c5a11c91b3836cf5cdec7990e` | `mcp-server/setup-wizard.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/wizard-context-recommendation.png` | 938×439; `944c9102e11232eb4892f3d86c2080d13dc83e25af4c69b295ba0cafc9536fa3` | `mcp-server/setup-wizard.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/wizard-intro.png` | 928×972; `01a893974f898fb4b361533d8030a7fb09bf9a5b337c63d092cae89c6a72dfad` | `mcp-server/setup-wizard.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/wizard-mute-menu.png` | 966×206; `a661ae18370cef696f8d7e62f9d2a5122716249f9860c3595c07c6ed32885742` | `mcp-server/setup-wizard.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/wizard-no-recommendations.png` | 932×916; `7008afb4fe17d0bef0818a2002ac4efd8f193ce1bf51ee104cfbc89e526a63c3` | `mcp-server/setup-wizard.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/wizard-providers.png` | 568×522; `d2bf0849a8a7cf711ffdc55ee166d772ac8882e782cd54440be05e182977dd6a` | `mcp-server/setup-wizard.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/wizard-role-defaults.png` | 936×968; `a7cced8878789993915622e0591fd699197f22c1133d2c6dcb61f4d840fa4988` | `mcp-server/setup-wizard.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/wizard-summary-next-steps.png` | 936×655; `9e2bd4cee05c3761fbf864bbf511840035a7c6c58a569ec3f01c5f4f73aa3578` | `mcp-server/setup-wizard.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `mcp-server/images/wizard-summary.png` | 936×966; `5281e01f83eadb175cdb6dd2e78391d135e14b78526f0ea2fb6969c803549685` | `mcp-server/setup-wizard.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `overseer/images/oversight-controls.png` | 1000×480; `725c7dbedfc125a97a8632afcea68e345194da743ccd85b1ffc5f55276dd55a0` | `agent-mode/overseer.mdx`, `overseer/linking-sessions.mdx`, `overseer/overview.mdx` | S06: Retain candidate; quiet mechanism not new popover control. |
| `settings/images/advanced-code-maps.png` | 1652×354; `9df2bb4cce15e060e217ba532f3f3e52c24b8784ce5aad82a1a9f41fc0a06f88` | `settings/general/advanced.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/advanced-history.png` | 1652×328; `ff845d8a44b0556cec69d304891452a5418d825f2c68152eb91ca704727d4fc9` | `settings/general/advanced.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/advanced-packaging.png` | 1652×258; `e07ff833cdbcb7bf683bd2d627e2260abe9c8003e439eb3c0b819edc66895105` | `settings/general/advanced.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/advanced-prompts.png` | 1652×183; `c1a116c1c7350d24b512a7b3d5177500d928452c773e8f00414da9ef40b85d48` | `settings/general/advanced.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/advanced-scanning.png` | 1652×631; `e148830a630b4a5b007572827e14b3d0fb5763f556aa98957d9a7306dd39cf6f` | `settings/general/advanced.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/advanced-shortcuts.png` | 1652×274; `dd571dc0952d85e05b481883dad8cdc436b217cd4f60b18987cc5c689864f355` | `settings/general/advanced.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/advanced-urls.png` | 1652×658; `04a93c0d6f24b405b31d1d6cffddef5ec1259217259f2a5174c64f67797a6a5f` | `settings/general/advanced.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/advanced.png` | 1670×3183; `856c3a37bd0e3fcb21c33c07cd048b9518bf0809e36e57fa8204441cbbcba70c` | `settings/general/advanced.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-decisions-auto-effort.png` | 1656×995; `657b38ac041fdb9af39a9835693ad962901ba0fd5506c56512098443e6d87418` | `settings/agent-mode/agent-decisions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-decisions-jev.png` | 1590×755; `80af8805f5ae206c0a4e1114bf96ce6f5a0b79086ccb8f8573a38cad2dbaf04d` | `settings/agent-mode/agent-decisions.mdx` | S02: Replace/omit full pane; service cards retain candidate only with qualified historical caption. |
| `settings/images/agent-decisions-openai.png` | 1590×1290; `929ed4ab7c7467c81cac9bd7f4aa0e81b8ccedc59f8ccb442881ac0fe80295a2` | `settings/agent-mode/agent-decisions.mdx` | S02: Replace/omit full pane; service cards retain candidate only with qualified historical caption. |
| `settings/images/agent-decisions-router.png` | 1656×1661; `7bfdcd07f1ee3cc93a3983806215694675612d477f84db24c6a80b3d8cb88c92` | `settings/agent-mode/agent-decisions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-decisions-usage-balancing.png` | 1656×1045; `8d72c655e6587815093b68eee6eb8d9684245646e2c38cd09da66aa6dfba6c34` | `settings/agent-mode/agent-decisions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-decisions.png` | 1672×6335; `6b0a1646eab8d5375c5f085cf6b44ab351a0cdf406ec2cc1cfdc8093f0cfdf7d` | `settings/agent-mode/agent-decisions.mdx` | S02: Replace/omit full pane; service cards retain candidate only with qualified historical caption. |
| `settings/images/agent-models-advanced.png` | 1625×156; `15ff31ca410115cc1a082ad06b9b8868ea069ccd078f710aed72de967144727d` | `settings/agent-mode/agent-models.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-models-context-builder.png` | 1625×202; `b1ade3c65d6800b7457669e26e427541ccaab2a87b57a3bc6495c4fcffb3088d` | `settings/agent-mode/agent-models.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-models-oracles.png` | 1695×405; `884f879d59bbadf2e5e1f18d5d99c8820c5a09588e95eb4ca0087a71d0b27f0e` | `settings/agent-mode/agent-models.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-models-recommendations.png` | 1625×118; `0d223b8dd82f0c65c75c6c2327ea7ba7df15cb14820ee5301faba1480eb33e09` | `settings/agent-mode/agent-models.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-models-related.png` | 1625×146; `07f61c73872e07c456bcf59a98ba27a5d879218824dc2d234fe49d5a19918718` | `settings/agent-mode/agent-models.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-models-reprompt.png` | 1680×982; `2060f08207f88924fb1b94fef9091608ccf433004c1f5e3bfdbfdf0ea694aa1b` | `settings/agent-mode/agent-models.mdx` | S05: Retain disclosure/profile example; new ready-state viewer absent. |
| `settings/images/agent-models-roles.png` | 1625×598; `d3ed1cd0730908cc46574428381cd10450d6e87d52e46f903071cee6dfa36b39` | `settings/agent-mode/agent-models.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-models-scope.png` | 1695×390; `387d160592b61c83f3d809ef159f1b694a131259f7d53d4abed90370cb78a28b` | `settings/agent-mode/agent-models.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-models.png` | 1695×1545; `261cb528f689ab4cd50197bbeb13fbe826993960eb234244db80f658831dc99a` | `settings/agent-mode/agent-models.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-antigravity.png` | 1532×173; `420cdce8ece926ba71fa5fb27a650246386e7577d141deca24fc698a3a14df5b` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-claude.png` | 1532×171; `be350b360f762c2dc96b666f97f80c0471cc870f47f71ff3c156907c30dc54e0` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-codex.png` | 1532×173; `78c07d84cd34b69ca3aafbd6568c8a6741b4cac4abeb4c885b5a6fff9a2ae196` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-disconnected.png` | 1532×413; `369d73bf9a15470800bfea09ccc4fe77f4f9d8054041b35f30297e4a7e7b9fe0` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-opencode.png` | 1532×173; `6856771edc7004fcb4fda82cfe79433e2e3f7b5330d09d4a2b966abc17bfb784` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-overseer.png` | 1680×178; `650feaf806f16d8a1f1a9b43ea53da5c3bf8e43e7877762feacb71602a55ead2` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-related.png` | 1601×593; `6d3d2bf1f1442524a9fb215a07b3cac5956998a0f8d18a898db616782dc944c3` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-subagents-policy.png` | 1595×258; `86cff1fbd182022825ad0420ac3cdfa5671ed5fc222a5c27538c5f30ab69fb99` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-subagents-preview.png` | 1690×360; `fd5257df3158a1d6d9a9ea24329787b784514634552e7684eeb6beb84f86b402` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-subagents-profiles.png` | 1690×720; `3345d79d95eba2a53fc3f5925bdb63879e3a23e8ba3cf4f61447c3bf1b648186` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-subagents.png` | 1690×1535; `a42bfd98cda172695093188212fe3f62d93845d15adec05362557a0323db6819` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions-tabs.png` | 1601×87; `099fb3abb74f9c0f5ab32341613c18ecebf7635fd30230b75f9493004b5668c9` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-permissions.png` | 1690×1485; `7bb2c718cda5ad2be16fce2aed6e79f90c9553a9b7b61ac1f5e4297bea432e73` | `settings/agent-mode/agent-permissions.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-workflows-built-in.png` | 1607×1059; `e00411663aa59debeb4fde5601c9bf6e5c4bc4b35408e9a4fa20967cb9e6e801` | `settings/agent-mode/agent-workflows.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-workflows-cleanup.png` | 1607×243; `17eb9d6d42e8e313b4600ccdda16bee546d0cbae7927cfc0c69938276fdd2b7b` | `settings/agent-mode/agent-workflows.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-workflows-custom.png` | 1607×221; `079b06735d22923be4d7014be380c946b6b0e3c712b5ab374fdf7db03774e2f3` | `settings/agent-mode/agent-workflows.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-workflows-featured.png` | 1607×579; `5b8095acd36a86bc2fa4e35e35e4bfea57e0eaf0a750cb4cbc1d825fcdfec81d` | `settings/agent-mode/agent-workflows.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/agent-workflows.png` | 1670×2387; `2edda630f1ab1960beef02a24465b24333c10b3b67b7dd3bbcc92cf4b92b2937` | `settings/agent-mode/agent-workflows.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/antigravity.png` | 1616×250; `0347d77715fd080758f6540b858bb91a3190a19742f3c4bb336379f3c32acbcd` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers-anthropic.png` | 1623×328; `97ae36f4c994fca184bdae310ed68e0717eb0e9147c7d01e2cdff448d7496bf2` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers-azure.png` | 1623×369; `4b284b356562cf26d91125d7cd2d1fc110f81237d8cb794ef306a9441f5deffe` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers-deepseek.png` | 1623×362; `90b965af7c9d371ef2f173ad027ef25ae27ddddf82088aafef99dacb28f62e0d` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers-fireworks.png` | 1623×259; `b34d23e2608d3769c4004b4c132dd055eff4b67f02fc60c419c8af7c9f45fb32` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers-gemini.png` | 1623×330; `7b2f189eedafde01356603d0c61e1f22f4218fed189eb2fcc283fc5ec02c6b85` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers-grok.png` | 1623×262; `4fe250447d87eaaf35aacca08bcfd8ebb743fa4c3e02c134d217fff648a57862` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers-groq.png` | 1623×268; `461b58ee1bb5cce8caa4e0a98e1e66a791e83d2559c2b4f459e1cee22c3ceb50` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers-local.png` | 1623×356; `dc77a837e3c683007a447ed6bab474f8088b5ad5617e12c4eac9ecc34f274fee` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers-openai.png` | 1623×592; `65fe5955ff36bc85fbcd9ab942dd0f1f0f5541b6c98531131f6895c0c310b861` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers-repair.png` | 1623×154; `d923bb231855cbdfbc09c857b59d3c61df28d4e657d4859810f79bf2568b7852` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers-zai.png` | 1623×362; `04271cdfda28b3318ddf4dbb046793c90de1c31dfb02aabbae8ca2b1ba3059cf` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/api-providers.png` | 1672×4390; `a3abad56f6499a7a35632555918686ad4b894db661d7e65203df0d72d60f73ff` | `settings/models-and-providers/api-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/appearance-display.png` | 1676×367; `cf954bbbd2ffa48511f7f8ed3fa9af07c054644acab986c15174ef6e723e8497` | `settings/general/appearance.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/appearance-editing.png` | 1676×435; `7d13f0348d4725efb71d2a55511e952a68f2f3a6985b168fce8feed4d5febfcc` | `settings/general/appearance.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/appearance-text-size.png` | 1676×210; `047b2189af8f9734b1bb8d4d64b930cb7cf30f1691bc4eecac7b60ceacc34f78` | `settings/general/appearance.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/appearance-theme.png` | 1676×190; `84bc4e9bd10e2a2165d77afb9e345b378dc8a16f0f8a1db552b4cff819f6decd` | `settings/general/appearance.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/appearance.png` | 1710×1600; `d056b3fbbee56b6dd51a526a2adbaa068eba17eaa86622985288ef2935864072` | `settings/general/appearance.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/cc-custom-limits.png` | 1595×290; `560eb097ace6bfd106a7039fcb6bff84a51f455825941f03ac760e47de06248a` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/cc-custom.png` | 1554×1145; `0abe706d8baa17021fad8f5daa9e04dc846a8cde88f1fe1430d8bf4e9ebd22bf` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/cc-moonshot.png` | 1565×912; `5e3ee5d8618c3c8c4e800ca5d4839cc3f09f2404dd4e21993543bff22346d891` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/cc-zai.png` | 1560×1240; `cfefa4a252319371191e88dc8e8439aac3066c3080b2262847fff4224905e9e3` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/chat-settings-edit-mode.png` | 1631×290; `1cff51d1041e3e1184f3ed5885eb3915e8bd7e685257ee5bae1d5da38c583e28` | `settings/prompting/chat-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/chat-settings-model.png` | 1631×119; `44f81b04aae24f402f834b89dee679e4146202643909d26ef8da0872abea8097` | `settings/prompting/chat-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/chat-settings-oracle.png` | 1631×270; `71f9a375edc91c26deb15c9fa7f4c6675ea1611b332e0f3f390378bb56eb4063` | `settings/prompting/chat-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/chat-settings-planning.png` | 1631×442; `8709048ff8f22d54a76c86145b37070718092c84c0594d309a5670b0eae7c7e9` | `settings/prompting/chat-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/chat-settings-recommendations.png` | 1631×118; `1ca43029a320c0b6016e370e152635df11d97b2f0252674a3d520c3baee02a1f` | `settings/prompting/chat-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/chat-settings-temperature.png` | 1631×147; `1b66fc8a23189adc1385f3e0b5d3eb5d8d81c51435fae813d8bdd9636106e06c` | `settings/prompting/chat-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/chat-settings.png` | 1670×1654; `db988082cf4bf75579c851e4072bfbffab99cbab07b58862ba78ee1925b443c1` | `settings/prompting/chat-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/claude.png` | 1638×959; `1577c23fcd0edcbc9942b99e5824235808f01f6cd9907c697b44b5897c4396b9` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/cli-providers.png` | 1690×1515; `abe2d6070fbf688e2fbc1f5cff258892f9c9511f69a9e0f2ec7d3f34c62b2162` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/codex-import-mcp.png` | 1665×113; `13e72c0f180abb4c49a6d3d0b28f0c7e304ff833d952e3065ddddc71b2a96d74` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/codex-optional-features.png` | 1665×612; `7d980234b4be5167fc796383c6b7d020f01e83eb3794c2a309ece2d5ac59d8d7` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/codex.png` | 1617×2316; `b58cfdc085141a0d374ebd74d4955a38d25ee44dbf731f84a1dc89bc9ee79c5f` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/context-builder-agent.png` | 1625×338; `75dab7647bce6dd758dbce6c358f4b40aff7906f5891e34273de411ea18f34e8` | `settings/agent-mode/context-builder.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/context-builder-analysis-budget.png` | 1625×169; `f64745cbe9c3942a7977eb5b3655a7295605c3339be2d2664e2942314341a9b5` | `settings/agent-mode/context-builder.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/context-builder-context-budget.png` | 1625×240; `e366a2b22226d50fe9eaaa77ad5f6a85e6b50d677761070aaf96b668debd2024` | `settings/agent-mode/context-builder.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/context-builder-enhancement.png` | 1625×173; `08a0fd80fe14a5b5e09388a64691288837bacf64689ca7aabd8606645d941215` | `settings/agent-mode/context-builder.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/context-builder-follow-up.png` | 1625×124; `62ed2007d6900ec0b370d8c6b902a2852a7a098926c207763a82890535b260e8` | `settings/agent-mode/context-builder.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/context-builder-instructions.png` | 1625×150; `b0d8b9e6a7e8a6677b2a54f1cefd563af4a6ef2f488391245fd77be113d74356` | `settings/agent-mode/context-builder.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/context-builder-mcp-questions.png` | 1625×223; `30c38005785fcc45708a30cf7cdf7f5726e64519cd12ab4a7651a488cdbe54a2` | `settings/agent-mode/context-builder.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/context-builder-timeout.png` | 1625×192; `58013704b6eebf0e108436d1d8935f077821ac4d4e3c8dafc5807b6051ba31c1` | `settings/agent-mode/context-builder.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/context-builder-ui-questions.png` | 1625×240; `ee241ac3525fe01e842e4203e11210821ecd37e82730519e612f6768e85dfbeb` | `settings/agent-mode/context-builder.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/context-builder.png` | 1670×2139; `2bf865aff0f444e7759f5bb02a1e0f5318de65ceab0ac7c4992de1c797c5a942` | `settings/agent-mode/context-builder.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/copy-prompt-order-duplicate.png` | 1662×202; `d9e89b5b7d7b4a45ae09d1465ada76d2c53a3ff6596df88e1d58f828519e6975` | `settings/prompting/copy-prompt-order.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/copy-prompt-order-reset.png` | 1662×78; `2d1010371a40ab7ea63ed7d83e7e005d36e6b68b96b619d0f8f11dafe8c66eb5` | `settings/prompting/copy-prompt-order.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/copy-prompt-order-sections.png` | 1662×657; `73891e8f35d533650f40666e368e52982cc8126f15d64759a804204bc1b09f0b` | `settings/prompting/copy-prompt-order.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/copy-prompt-order.png` | 1694×1574; `a8d3cfd5e4a1fe7b9a634f2a79ba59d7cfa4d18ce332584b69e80e020d37fc15` | `settings/prompting/copy-prompt-order.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/cursor.png` | 1616×84; `f5f81c4bc054aa5d1b9472ae3cce16390a79715ebae495a1cf5673a6bfe56987` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/custom-api-actions.png` | 1665×69; `2af12a8e70146a44a43fd51e1440066b47fe371df6ae4db8773932aa1f26349d` | `settings/models-and-providers/custom-api.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/custom-api-connection.png` | 1665×401; `0c1fc9d38263e6968da829b0ecb19e26d784c15b30380f0aaa905a80824f1ccc` | `settings/models-and-providers/custom-api.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/custom-api-tokens.png` | 1665×109; `f4f208e563398c4baf0598539df18ab02f5a40645008df76d680ad8e86ab6767` | `settings/models-and-providers/custom-api.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/custom-api.png` | 1702×640; `af28ccea0ea0d9cded3ce074962644dd464745202628fb2770353fd2bec8d77b` | `settings/models-and-providers/custom-api.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/devin.png` | 1615×93; `a034ac987c7e843733510f67ac5c4316b61d7b8134211ccee7982e650fa938dc` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/grok-build.png` | 1616×78; `f9f64030551a77cd79b0371d33186a9533fb34912249d3be216ebde677f875ae` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/keyboard-shortcuts-agent-layout.png` | 1695×785; `1a1526db014fb46c4cb745c91126d857e61a6a4ec7eece05f965450f2ec42201` | `settings/general/keyboard-shortcuts.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/keyboard-shortcuts-application.png` | 1695×1095; `73e9b48f26a22fc3b45b460471258ec5ed880323cbc0fc08b18a2a092aa39a7d` | `settings/general/keyboard-shortcuts.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/keyboard-shortcuts-composer.png` | 1695×305; `b2cf8f094b1b180df7a8fbe960a9bea21f181fdf208759805d33872ad93d303c` | `settings/general/keyboard-shortcuts.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/keyboard-shortcuts-display.png` | 1695×315; `6617217037b5dd1d49ceff41ae0c256ee761c815ebcfa73966d720313b8794e4` | `settings/general/keyboard-shortcuts.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/keyboard-shortcuts-enable.png` | 1649×217; `427ff9580f725fd0be16c4875c7fff2ccdc99e8431f0a089c84baca3580b7d44` | `settings/general/keyboard-shortcuts.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/keyboard-shortcuts-session-tabs.png` | 1649×1184; `d7a9d87ecd55b088ec016f2adac413ba14f354b68b7f53c9c55d9894c4401ba8` | `settings/general/keyboard-shortcuts.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/keyboard-shortcuts-workspace-presets.png` | 1649×979; `de04c0b0a2323a2b45ba55b831617d1ccec18e85da8eb1bac947c36e7ad89b63` | `settings/general/keyboard-shortcuts.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/keyboard-shortcuts.png` | 1695×1345; `b68ae88ca96429b80b212d32337c2f42d2085e523676e000801bf6ea59c513b5` | `settings/general/keyboard-shortcuts.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/manage-presets-empty.png` | 1219×80; `4f62c16df695627f9ed385b58a22c8601a8cdf7765db31f3f1966b98ba47dac7` | `settings/workspaces/manage-presets.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/manage-presets-workspace.png` | 1219×177; `6f661d2b7b34923eb8ada2eea14bf8c8ccde970070895619ca1e18513ee5cde3` | `settings/workspaces/manage-presets.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/manage-presets.png` | 1248×484; `492b587812b6913df9c9fd180c70e78e660d01132c85e4f089db8aae3e362e24` | `settings/workspaces/manage-presets.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/manage-workspaces-create.png` | 1630×270; `93f71f37989af9c496c3562ac0a6ec515213a0635a686e4ca9ffdc98867f6e38` | `settings/workspaces/manage-workspaces.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/manage-workspaces-library.png` | 1630×89; `39b099481692d27b52d7bf0126b8dfadacb282915973086f1cfdd483e2028b73` | `settings/workspaces/manage-workspaces.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/manage-workspaces-restore.png` | 1630×64; `2d04ea626a685a94050da509e7f71e703c632c95a6fe059878e4a0c55f4585d6` | `settings/workspaces/manage-workspaces.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/manage-workspaces-storage.png` | 1630×55; `205aa26abb9c3ac9888a119e3b771c51d163d1de6143ef7ef82f3255d4df52a2` | `settings/workspaces/manage-workspaces.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/manage-workspaces.png` | 1672×748; `5ea7164b656f049540a698bc92f2cbebdfff2c4a564c021171ff6c105270b967` | `settings/workspaces/manage-workspaces.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/mcp-server-cli.png` | 1616×349; `44b09717509e142ba317e2082ee0c25b466bb80ce50d733f167836b2ee31d31f` | `settings/mcp-server/mcp-server.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/mcp-server-context-builder.png` | 1616×181; `4fc28e5420b3042bfb4a562a6e128b3de8d12f513f7b6a9ebb89144cdcff8d1b` | `settings/mcp-server/mcp-server.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/mcp-server-json.png` | 1690×475; `35d3180e8a38b3213136fc5b0ba8a75389b010031ecf3f60c65336475a6dd017` | `settings/mcp-server/mcp-server.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/mcp-server-presets.png` | 1616×250; `9e9b9fb47d83ebd63399b1345f3a56bb5c1d93ae432063672ea58a555a712469` | `settings/mcp-server/mcp-server.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/mcp-server-setup.png` | 1616×186; `67e7e0f547a9c2f838e977317dd527f656ed814d52bbdf8ede4f2e77c81c0c17` | `settings/mcp-server/mcp-server.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/mcp-server-status.png` | 1616×246; `ff040663255d6fdbd599fb6f4f8b016221c53fdf0a1eda475b2ea33bfb886f00` | `settings/mcp-server/mcp-server.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/mcp-server-strict-approval.png` | 1695×200; `c0f4252d8e2a01250424a7863a6d3daa7ca90106b8d6163bf3990a594dea1133` | `settings/mcp-server/mcp-server.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/mcp-server.png` | 1695×1535; `49206474cbe6c512f163fc2b9f42f3fec614066781f7a9d3615b0a5e8dfe041b` | `settings/mcp-server/mcp-server.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-config.png` | 1690×445; `689fd86b856563c62d785c1ae2b0f8fdcef56e8c31763a0dd48bc49babf698b2` | `settings/models-and-providers/model-config.mdx` | S09: Retain different-provider example; add polling exception prose. |
| `settings/images/model-presets-default.png` | 1646×214; `3e7fbcf680e6458ecfea16d7ddf3783a3638cead84dc7b260509c2687ed17ea7` | `settings/mcp-server/model-presets.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-presets.png` | 1646×238; `7ce9a1d319cdef39ab819b60946a46fceabbba4c15a7c8e42dae1f9426f36891` | `settings/mcp-server/model-presets.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-router-auto-effort.png` | 1485×554; `d0043732aae64a832bfe02ec0f96800b484ce0664c97d750246bbaee807f9e92` | unreferenced | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-router-behavior.png` | 1485×329; `00b267e3a82c912c9cacd1b8899d402b35a0a84dcffd06100773955e8a60f0e8` | unreferenced | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-router-enable.png` | 1485×377; `84b6e448cb9a7a6e9be3b1d382fcbbdcd21b8caecb9d8bbd3316581e7974318c` | unreferenced | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-router-guidance.png` | 1485×481; `7906f81d2727386a4d900ea3fde2a077bb3f2cada2a18ef1405a1a6f81da43de` | unreferenced | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-router-model-selection.png` | 1485×377; `fd825e3510a725f17c2800d4178a4c9339d92c26adfbcfccb9e5ca0080ce4255` | unreferenced | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-router-paid-fast.png` | 1485×156; `e3c0e39aa70aee10b1354fc795904c2ecfe48222d9dddc0e465d6519da743dc0` | unreferenced | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-router-service.png` | 1485×684; `f8ea9716c2b6c482a9e12c66c82329e0c75f90e0eb80977767bf3b019f2b078f` | unreferenced | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-router-sharing.png` | 1485×146; `f25b6acf382c38f8ee53d201cd7362c37b922d98b15810a091f85e084f563b0f` | unreferenced | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-router-usage-balancing.png` | 1485×574; `0aee65ace30ed1636513fcfc937d79a80f4029a55e83ab65a5a1b95015f363d9` | unreferenced | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/model-router.png` | 1576×4155; `c4b06565a45752bb81ec21b23bd8ab4a7c74892335633bba84c3668090405e4f` | unreferenced | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/notifications-actions.png` | 1616×401; `b2e8f4b2f278dfcb715819706532a586f200517fd2c1c493e244a2610302f482` | `settings/general/notifications.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/notifications-chat.png` | 1616×273; `48a1317b97c3f9a868de3fa3a708d9d8ce473f5301d23a2bc8c5c6c9b013f9dd` | `settings/general/notifications.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/notifications-events.png` | 1616×802; `923f818c8eece7d297f7dc450e68e318452494494cb3f13dbc67f53bfc248d8a` | `settings/general/notifications.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/notifications-general.png` | 1616×597; `b4f9814745c3f10fb28ff3ebf6d90bbeba29eeddfdd5c15bb6bf378f41ca1abb` | `settings/general/notifications.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/notifications.png` | 1670×2255; `5727d7018461c1a464d6ac72d53dfcfdb40585979777fb1f55e07af199738e79` | `settings/general/notifications.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/opencode.png` | 1615×563; `bbe4886c708d1e6e75a68aab45e21b61911bc2d6b6123cc7521ee8c784c7d494` | `settings/agent-mode/cli-providers.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/openrouter-advanced.png` | 1665×65; `5ca0dbdfecd78401e4b56874a72ce151b90f3b6e365a2aa52d0b695f91862fb6` | `settings/models-and-providers/openrouter.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/openrouter-available.png` | 1665×1399; `5e042e248691c8a0828506370b4701cf42f71e696b0cf18401a36e1e078bb5f4` | `settings/models-and-providers/openrouter.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/openrouter-key.png` | 1665×180; `715316e0b3f605e325da41debc5ba8f47d43e3969d328f37a3c2a2344ff17284` | `settings/models-and-providers/openrouter.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/openrouter-registered.png` | 1665×215; `a223622bdea9662008cbb631befe6b7587b852da8d965509855bd26023eedcaf` | `settings/models-and-providers/openrouter.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/openrouter.png` | 1710×2232; `3a00fb622a4b4075d5bbda8ab978c73862b35769da66de689dbb5db02476e50a` | `settings/models-and-providers/openrouter.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview-chats.png` | 1626×214; `b5193efd807b1dd5cb491ba4fea11af5fba5c5a395078e8c722c7388de8b993f` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview-cleanup.png` | 1626×220; `87935e68b012755e1d55467119124a2a266de92fda796d6b68acd209951a6098` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview-context-budgets.png` | 1626×91; `c54e0ae2228ea534e6bc82badc954a736e32abfc6ee74f5fb8d795b5cc704cde` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview-environment-filtering.png` | 1680×547; `05daeb6690839052e0132edd9bfa19b61604957ca5684ccf01c68efffb87e7b7` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview-handoff.png` | 1626×587; `a0e58dfa6ffbd436185e36ab2e710eba4018062d900b811f1e3e5ea7f675ce62` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview-hook-approval.png` | 1626×211; `c55ea77eb16dba376be3b8e6be9b6e5f6aafa3912eba49d6ae2412ce5ae4278e` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview-permissions.png` | 1626×297; `67937396d393277a870bda862e469c8cb669f1b7b13b80595b368f7ec29620bd` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview-providers.png` | 1626×223; `3fde82e8d74b73f2c4c912626c61c873a9a5849a852b23ff07efd09452b2b892` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview-supervision.png` | 1626×240; `eed85ddc29cf8b38eb5ec166f51d700a68a37bdfe67caccfa4d8da7327f0c8c6` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview-usage-limits.png` | 1680×225; `b538d0696ec37980c2c1c009e8b400df675b7dabfd1573d85f5fe3a4b668c65d` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview-workflows.png` | 1626×127; `66e9ddab481f284123924d60e76101d3880d60f4a70a6d63daa1c5bfe37b0f08` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/overview.png` | 1695×1535; `3f0dbe0077eb711eee0822450f8bf675e7621a54bff92586cbc1766211ce8b54` | `settings/agent-mode/overview.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/search-settings.png` | 552×60; `8a0d864265a7cab15e4178ffb76fb33725f947dee22cfdbf09b6d8541bee2ee7` | `settings/search-settings.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/telemetry-controls.png` | 1645×301; `c21ca96ee0ee3383acb3fb75919c08032142bf26a8fccdf12c78b6544af84b79` | `settings/general/telemetry.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/telemetry-privacy.png` | 1645×450; `f0a8fe61ccf383845df87d327a4670415c366a24ae987314fa8e979f75182006` | `settings/general/telemetry.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/telemetry-status.png` | 1645×91; `f2acf55e620a5aeb7a64727e9514fbf31c1b4553de9533b58e536e3a95ef8e64` | `settings/general/telemetry.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/telemetry.png` | 1710×1040; `88e46ad66544e3fdc5288064ee4877575bff3ba381badc76af2a4172c1946b00` | `settings/general/telemetry.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-agent-explore.png` | 1604×826; `818d8e1e103e36d571651749edf1c95db8d49b116a911e3f4c53c84daf678d25` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-agent-manage.png` | 1604×1370; `a11af686d0a7a66333c6fe81dd7c98c3a7f78b05737e0355db9e8eb088e766dc` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-agent-run.png` | 1604×2424; `db33ad07b495294041ac799e26c89d01e01b0678bee902131d51ab2a5c77c551` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-app-settings.png` | 1604×826; `f484d2692cd0c6dc7567b6c8eb5b1ed46495eb0bd63c766ad26a12ee5f553764` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-apply-edits.png` | 1604×656; `bd2b6f3addb4b22c9fbf7f5783f9688024a90dca3871327aec6f29424c0e873f` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-bind-context.png` | 1604×1370; `e8d5455f05696c57d3c2f4c85016e9384686c92388e6a5e243db776f93311a80` | `settings/mcp-server/tools.mdx` | S11: Retain labelled app-backed historical example or replace; prose must not deny window_id. |
| `settings/images/tools-context-builder.png` | 1604×1506; `e426be4a8d225e01af134d38c365d61e727ceeadfa11769c56e463640718341b` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-controls.png` | 1610×345; `971218fefcafb0cb701684e75b0f00ff2fc8447d9290d8be07b602721f194cec` | `settings/mcp-server/tools.mdx` | S07: Retain candidate; standard-client 21 count is not total 32. |
| `settings/images/tools-file-actions.png` | 1604×758; `d6e6d6e6be46f258fe516e4c04f764609555d1b5f278da7e008cb6c3b213856f` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-file-search.png` | 1604×1268; `89e970a79e5c8f69ab3db2013702ce87f869b4a5115a7c4d2983d3c8eba27d7a` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-get-code-structure.png` | 1604×656; `d76a1b6272e6cfac935766ffa0951883d90512249122fafa03fbc851759893a7` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-get-file-tree.png` | 1604×996; `c1baece56f452a239085b2b1ce817cdd642099f06eb683ecf90ceb49e19ed5a2` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-git.png` | 1604×1982; `b8b73606afc3f7b395b845862ebcd8a03a4a57c84bdc479c75c091d560d828d5` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-history.png` | 1604×962; `7aa6ff51d08ab66456789c3e1752971b9fd679ef8f789c2458e40eae9cf8561a` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-manage-selection.png` | 1604×1506; `bd7d3d17786bbd95c9a14c700862d922cceb89cbe6aa1e483d11a3cd87d4fc24` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-manage-workspaces.png` | 1604×2186; `a58c28130906c301bc8780111a030aa45f5df9f5997dc2f4c06987713a57ddf1` | `settings/mcp-server/tools.mdx` | S11: Replace/remove stale optional close_tab parameter wording. |
| `settings/images/tools-manage-worktree.png` | 1604×1336; `f7dbcf8e1a3aef66c88e19b983d297c73ac7c9e83540efed10710a31bc946f74` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-oracle-send.png` | 1604×656; `55220c253dc0de282e24214c6cabdb365b33e3aabe780bd0ee666de6ae2ab337` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-oracle-utils.png` | 1604×384; `567edb64512f1ca03e86de65efb81126374bbb9ec518b2cd4343cc25195b8ae1` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-prompt.png` | 1604×894; `c7c8e92528abc0d6a5747490fff1f8a2d59bcd8b3aa0d15c77a3c0fcc96bf1d4` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-read-file.png` | 1604×928; `facb28a1c3f8deb834ee2494b08260ef4235dc62ffefd6be27395f035b713952` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools-workspace-context.png` | 1604×1263; `7ce0401df0ce4bcf0c42d482abde3d5bf794b9190064f9130ed23f903c1f57f5` | `settings/mcp-server/tools.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/tools.png` | 1710×25665; `4f737f0aa5e6f674d7b84beabe7c2c5e9ad0c00a3ea42152030e53dac47933c6` | `settings/mcp-server/tools.mdx` | S07/S11: Inspect affected expanded descriptions; replace/remove stale close_tab wording if shown. |
| `settings/images/updates-automatic.png` | 1664×51; `42a8e249cd000fad4c83df78968391bf1e2486c2a5a36ae2a87b54ae2ccc4a41` | `settings/general/updates.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/updates-channel.png` | 1664×107; `467add6051293e23e6460507366b493a87c553d7f4cbe3753b08ae87ef4fb7ad` | `settings/general/updates.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/updates-status.png` | 1664×67; `dc3731faa4f47241e9ff583b6b39fcbeead3e38aec1bfd2bfe5fcc54dc372f25` | `settings/general/updates.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/updates.png` | 1710×400; `e180c76fa339974099dd08fda335a38ace003148512df47d1f4164c55acc4760` | `settings/general/updates.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/workflow-presets-chat-rows.png` | 1655×368; `6c94f06fbbcd38ab69e39648c7c49d356f045ec7044c768ed3790d9c650a1f4e` | `settings/prompting/workflow-presets.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/workflow-presets-chat.png` | 1684×596; `b83b4024aff4c47e9a08f9fc53a36961ec502227d0ba9dc35b2cc3e56e69944e` | `settings/prompting/workflow-presets.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/workflow-presets-controls.png` | 1675×197; `47dc9d1a6003cdbc96aa57629ef64d5e85a67a8ab3a1828063cba10fb3e33baf` | `settings/prompting/workflow-presets.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/workflow-presets-copy.png` | 1660×475; `c6ec4b88db617499f0211bf22debb2b9682dced9e6de8983eb60b2371aa4496b` | `settings/prompting/workflow-presets.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/workflow-presets.png` | 1696×820; `3790fb06090b9f1080c56d62aeb0921f9904848f0f9de208578b92dd7afdfa3f` | `settings/prompting/workflow-presets.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/workspace-approvals-clients.png` | 1614×199; `6a4e27c3a9caa18fd952d98b39cdb7e3bbb55ee5cb62f7139839c96429bd0f36` | `settings/mcp-server/workspace-approvals.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/workspace-approvals-global.png` | 1614×177; `31424a273d4c2928cb9b49a906751d276e03b7a0cc16c4a38daa799fafc20d66` | `settings/mcp-server/workspace-approvals.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/workspace-approvals-operations.png` | 1614×508; `9d69361c15c39c0afef9abb2f16c4ea3efeb21fac0901003b4b7e6f8739ecc8a` | `settings/mcp-server/workspace-approvals.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |
| `settings/images/workspace-approvals.png` | 1710×1300; `46b4ac2057f5bedaf463fe6ca1785da55c25767726178835b87af92fe5d5bc87` | `settings/mcp-server/workspace-approvals.mdx` | S13: Retain candidate: no material owning-control change found; no v1.8 pixel verification. |

### Exact baseline crop mappings available in supplied manifests

These mappings are provenance metadata, NOT recertified crops. Oct 27 settings canonical_source.revision and decisions source_revision pin baseline. Detail crops with no row here have no exact 1.7.0 destination mapping in these two manifests; do not guess originals/coordinates. Oct 4 manifest records 1.6.0 destinations, not a complete later crop mapping.

| Existing destination | Manifest | Original source path | Crop box (existing metadata) |
| --- | --- | --- | --- |
| `versioned_docs/version-1.7.0/settings/images/agent-decisions-auto-effort.png` | `2026-10-27-agent-decisions-manifest.json` | `source-assets/documentation-screenshots/2026-10-27_15-07-17.png` | `[48, 1915, 1704, 2910]` |
| `versioned_docs/version-1.7.0/settings/images/agent-decisions-jev.png` | `2026-10-27-agent-decisions-manifest.json` | `source-assets/documentation-screenshots/2026-10-27_15-07-17.png` | `[80, 4235, 1670, 4990]` |
| `versioned_docs/version-1.7.0/settings/images/agent-decisions-openai.png` | `2026-10-27-agent-decisions-manifest.json` | `source-assets/documentation-screenshots/2026-10-27_15-07-17.png` | `[80, 5020, 1670, 6310]` |
| `versioned_docs/version-1.7.0/settings/images/agent-decisions-router.png` | `2026-10-27-agent-decisions-manifest.json` | `source-assets/documentation-screenshots/2026-10-27_15-07-17.png` | `[48, 199, 1704, 1860]` |
| `versioned_docs/version-1.7.0/settings/images/agent-decisions-usage-balancing.png` | `2026-10-27-agent-decisions-manifest.json` | `source-assets/documentation-screenshots/2026-10-27_15-07-17.png` | `[48, 2965, 1704, 4010]` |
| `versioned_docs/version-1.7.0/settings/images/agent-decisions.png` | `2026-10-27-agent-decisions-manifest.json` | `source-assets/documentation-screenshots/2026-10-27_15-07-17.png` | `[40, 35, 1712, 6370]` |
| `versioned_docs/version-1.7.0/settings/images/agent-models-oracles.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-agent-models-01.png` | `[550, 825, 2245, 1230]` |
| `versioned_docs/version-1.7.0/settings/images/agent-models-reprompt.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-agent-models-reprompt.png` | `[560, 540, 2240, 1522]` |
| `versioned_docs/version-1.7.0/settings/images/agent-models-scope.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-agent-models-01.png` | `[550, 210, 2245, 600]` |
| `versioned_docs/version-1.7.0/settings/images/agent-models.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-agent-models-01.png` | `[550, 85, 2245, 1630]` |
| `versioned_docs/version-1.7.0/settings/images/agent-permissions-overseer.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-agent-permissions-subagents-bottom.png` | `[560, 782, 2240, 960]` |
| `versioned_docs/version-1.7.0/settings/images/agent-permissions-subagents-preview.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-agent-permissions-subagents-recaptured.png` | `[550, 540, 2240, 900]` |
| `versioned_docs/version-1.7.0/settings/images/agent-permissions-subagents-profiles.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-agent-permissions-subagents-preview.png` | `[550, 900, 2240, 1620]` |
| `versioned_docs/version-1.7.0/settings/images/agent-permissions-subagents.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-agent-permissions-subagents-recaptured.png` | `[550, 85, 2240, 1620]` |
| `versioned_docs/version-1.7.0/settings/images/agent-permissions.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-agent-permissions-01.png` | `[550, 85, 2240, 1570]` |
| `versioned_docs/version-1.7.0/settings/images/cc-custom-limits.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-cli-providers-cc-custom.png` | `[595, 247, 2190, 537]` |
| `versioned_docs/version-1.7.0/settings/images/cli-providers.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-cli-providers-01.png` | `[550, 85, 2240, 1600]` |
| `versioned_docs/version-1.7.0/settings/images/codex-import-mcp.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-cli-providers-codex-01.png` | `[560, 1135, 2225, 1248]` |
| `versioned_docs/version-1.7.0/settings/images/codex-optional-features.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-cli-providers-codex-02.png` | `[560, 618, 2225, 1230]` |
| `versioned_docs/version-1.7.0/settings/images/keyboard-shortcuts-agent-layout.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-keyboard-shortcuts-composer.png` | `[550, 125, 2245, 910]` |
| `versioned_docs/version-1.7.0/settings/images/keyboard-shortcuts-application.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-keyboard-shortcuts-01.png` | `[550, 335, 2245, 1430]` |
| `versioned_docs/version-1.7.0/settings/images/keyboard-shortcuts-composer.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-keyboard-shortcuts-composer.png` | `[550, 915, 2245, 1220]` |
| `versioned_docs/version-1.7.0/settings/images/keyboard-shortcuts-display.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-keyboard-shortcuts-04.png` | `[550, 1280, 2245, 1595]` |
| `versioned_docs/version-1.7.0/settings/images/keyboard-shortcuts.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-keyboard-shortcuts-01.png` | `[550, 85, 2245, 1430]` |
| `versioned_docs/version-1.7.0/settings/images/mcp-server-json.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-mcp-server-json-recaptured.png` | `[550, 1155, 2240, 1630]` |
| `versioned_docs/version-1.7.0/settings/images/mcp-server-strict-approval.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-mcp-server-current.png` | `[550, 470, 2245, 670]` |
| `versioned_docs/version-1.7.0/settings/images/mcp-server.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-mcp-server-current.png` | `[550, 85, 2245, 1620]` |
| `versioned_docs/version-1.7.0/settings/images/model-config.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-model-config-recaptured.png` | `[550, 85, 2240, 530]` |
| `versioned_docs/version-1.7.0/settings/images/overview-environment-filtering.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-overview-environment.png` | `[560, 748, 2240, 1295]` |
| `versioned_docs/version-1.7.0/settings/images/overview-usage-limits.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-overview-environment.png` | `[560, 285, 2240, 510]` |
| `versioned_docs/version-1.7.0/settings/images/overview.png` | `2026-10-27-settings-manifest.json` | `source-assets/documentation-screenshots/2026-10-27-settings-overview-01.png` | `[550, 85, 2245, 1620]` |

## Final read-only check

Both repositories remained clean at attested HEADs immediately before this temporary handoff write. The 248 diff paths have 248 classification rows; substantive evidence ranges were checked against immutable release/baseline blobs. No v1.8.0 visual verification, provider live verification, app tests/builds, docs builds or manual accessibility testing was performed.


---

## Item 2 final check results

- Complete handoff preserved verbatim: 243,567 bytes / 934 lines, SHA-256 `65fab98b882b2a1b5226030bb230c5ef1b036498c55e5c66faede67aa31bbaf3`.
- `pnpm run check:content`: **blocked before running the script**, exit 1 (`ERR_PNPM_PRIVATE_INSTALL_CREATE`). The launcher tried to create a private pnpm 12.15.0 install under `/Users/david/Library/pnpm/package-manager-store/v11/tmp/private/`, denied by the sandbox. No installation or elevated retry was performed. Item 3 must resolve launcher availability without assuming this command passed.
- Existing Node `v26.13.0`; `node scripts/check-content.cjs`: **pass**, exit 0: “Validated 402 documents, sidebars, local links, images, anchors, and redirect destinations.” This is the exact script named by package.json’s check:content command, not the full validation pipeline.
- `git diff --check`: pass for tracked changes. Copy-scope/byte comparisons: 344 identical relative paths retained; all 234 image assets byte-identical to the template; explicit sidebar byte-identical; copied changelog from the 1.7.0 heading onward unchanged.
- Baseline comparison: only `versions.json` differs among tracked files. No staged changes. All other additions are the new collection, new sidebar, and this ledger. Thus prior collections/sidebars/source captures and shared-site files remain untouched.
- 25 copied documentation pages revised; no new page IDs/routes. Modified topics/files:

  - `versioned_docs/version-1.8.0/agent-mode/approvals.mdx`
  - `versioned_docs/version-1.8.0/agent-mode/auto-effort.mdx`
  - `versioned_docs/version-1.8.0/agent-mode/context-builder.mdx`
  - `versioned_docs/version-1.8.0/agent-mode/image-support.mdx`
  - `versioned_docs/version-1.8.0/agent-mode/message-editor.mdx`
  - `versioned_docs/version-1.8.0/agent-mode/model-router.mdx`
  - `versioned_docs/version-1.8.0/agent-mode/oracle.mdx`
  - `versioned_docs/version-1.8.0/agent-mode/re-prompter.mdx`
  - `versioned_docs/version-1.8.0/agent-mode/session-history.mdx`
  - `versioned_docs/version-1.8.0/agent-mode/workflow-templates.mdx`
  - `versioned_docs/version-1.8.0/changelog/ce-version-1-0.mdx`
  - `versioned_docs/version-1.8.0/mcp-server/mcp-connections.mdx`
  - `versioned_docs/version-1.8.0/mcp-server/mcp-settings.mdx`
  - `versioned_docs/version-1.8.0/mcp-server/mcp-tools.mdx`
  - `versioned_docs/version-1.8.0/overseer/best-practices.mdx`
  - `versioned_docs/version-1.8.0/providers/codex-cli.mdx`
  - `versioned_docs/version-1.8.0/providers/grok-build.mdx`
  - `versioned_docs/version-1.8.0/providers/models.mdx`
  - `versioned_docs/version-1.8.0/providers/openai-api.mdx`
  - `versioned_docs/version-1.8.0/settings/agent-mode/agent-decisions.mdx`
  - `versioned_docs/version-1.8.0/settings/agent-mode/agent-models.mdx`
  - `versioned_docs/version-1.8.0/settings/agent-mode/agent-workflows.mdx`
  - `versioned_docs/version-1.8.0/settings/general/notifications.mdx`
  - `versioned_docs/version-1.8.0/settings/mcp-server/tools.mdx`
  - `versioned_docs/version-1.8.0/settings/models-and-providers/model-config.mdx`

### Final checkout identity and full porcelain

```text
root: /Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs
gitdir: /Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs/.git
common dir (relative to root): .git
branch: content/1.8.0-update
HEAD: c1534583abc590f2a527dd0a71311316436919e0
worktree list --porcelain:
worktree /Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs
HEAD c1534583abc590f2a527dd0a71311316436919e0
branch refs/heads/content/1.8.0-update

status --porcelain=v1 --untracked-files=all (complete, no omitted entries):
 M versions.json
?? docs/reviews/ce-1.8.0-documentation-review.md
?? versioned_docs/version-1.8.0/agent-mode/approvals.mdx
?? versioned_docs/version-1.8.0/agent-mode/auto-effort.mdx
?? versioned_docs/version-1.8.0/agent-mode/computer-use.mdx
?? versioned_docs/version-1.8.0/agent-mode/context-builder.mdx
?? versioned_docs/version-1.8.0/agent-mode/context-composer.mdx
?? versioned_docs/version-1.8.0/agent-mode/execution-location.mdx
?? versioned_docs/version-1.8.0/agent-mode/image-support.mdx
?? versioned_docs/version-1.8.0/agent-mode/images/auto-effort-confirmation.png
?? versioned_docs/version-1.8.0/agent-mode/images/auto-effort.png
?? versioned_docs/version-1.8.0/agent-mode/images/composer.png
?? versioned_docs/version-1.8.0/agent-mode/images/computer-use.png
?? versioned_docs/version-1.8.0/agent-mode/images/context-builder.png
?? versioned_docs/version-1.8.0/agent-mode/images/context-prompt.png
?? versioned_docs/version-1.8.0/agent-mode/images/context-selections.png
?? versioned_docs/version-1.8.0/agent-mode/images/context-usage.png
?? versioned_docs/version-1.8.0/agent-mode/images/execution-location.png
?? versioned_docs/version-1.8.0/agent-mode/images/image-attachment.png
?? versioned_docs/version-1.8.0/agent-mode/images/interview.png
?? versioned_docs/version-1.8.0/agent-mode/images/model-effort.png
?? versioned_docs/version-1.8.0/agent-mode/images/model-router.png
?? versioned_docs/version-1.8.0/agent-mode/images/permissions.png
?? versioned_docs/version-1.8.0/agent-mode/images/re-prompt.png
?? versioned_docs/version-1.8.0/agent-mode/images/tools.png
?? versioned_docs/version-1.8.0/agent-mode/images/workflow-cards-more.png
?? versioned_docs/version-1.8.0/agent-mode/images/workflow-cards.png
?? versioned_docs/version-1.8.0/agent-mode/images/workflow-selector.png
?? versioned_docs/version-1.8.0/agent-mode/interviewer.mdx
?? versioned_docs/version-1.8.0/agent-mode/message-editor.mdx
?? versioned_docs/version-1.8.0/agent-mode/model-and-effort.mdx
?? versioned_docs/version-1.8.0/agent-mode/model-router.mdx
?? versioned_docs/version-1.8.0/agent-mode/oracle.mdx
?? versioned_docs/version-1.8.0/agent-mode/overseer.mdx
?? versioned_docs/version-1.8.0/agent-mode/overview.mdx
?? versioned_docs/version-1.8.0/agent-mode/re-prompter.mdx
?? versioned_docs/version-1.8.0/agent-mode/session-history.mdx
?? versioned_docs/version-1.8.0/agent-mode/skills.mdx
?? versioned_docs/version-1.8.0/agent-mode/tools.mdx
?? versioned_docs/version-1.8.0/agent-mode/workflow-templates.mdx
?? versioned_docs/version-1.8.0/changelog/ce-version-1-0.mdx
?? versioned_docs/version-1.8.0/faq/api-keys.mdx
?? versioned_docs/version-1.8.0/faq/chatgpt-pro.mdx
?? versioned_docs/version-1.8.0/faq/contributing.mdx
?? versioned_docs/version-1.8.0/faq/credential-recovery.mdx
?? versioned_docs/version-1.8.0/faq/how-to-build.mdx
?? versioned_docs/version-1.8.0/faq/mcp-troubleshooting.mdx
?? versioned_docs/version-1.8.0/faq/migrate-from-classic.mdx
?? versioned_docs/version-1.8.0/faq/paid-version.mdx
?? versioned_docs/version-1.8.0/faq/pay-for-services.mdx
?? versioned_docs/version-1.8.0/faq/report-issue.mdx
?? versioned_docs/version-1.8.0/faq/solo-project.mdx
?? versioned_docs/version-1.8.0/faq/tip-version.mdx
?? versioned_docs/version-1.8.0/faq/videos.mdx
?? versioned_docs/version-1.8.0/faq/what-is-an-oracle.mdx
?? versioned_docs/version-1.8.0/faq/windows-linux.mdx
?? versioned_docs/version-1.8.0/index.mdx
?? versioned_docs/version-1.8.0/mcp-server/images/mcp-context-builder.png
?? versioned_docs/version-1.8.0/mcp-server/images/mcp-install-menu.png
?? versioned_docs/version-1.8.0/mcp-server/images/mcp-oracle-presets.png
?? versioned_docs/version-1.8.0/mcp-server/images/mcp-quick-setup.png
?? versioned_docs/version-1.8.0/mcp-server/images/mcp-server-popover.png
?? versioned_docs/version-1.8.0/mcp-server/images/mcp-skills-menu.png
?? versioned_docs/version-1.8.0/mcp-server/images/mcp-toolbar.png
?? versioned_docs/version-1.8.0/mcp-server/images/mcp-window-access.png
?? versioned_docs/version-1.8.0/mcp-server/images/wizard-context-builder.png
?? versioned_docs/version-1.8.0/mcp-server/images/wizard-context-recommendation.png
?? versioned_docs/version-1.8.0/mcp-server/images/wizard-intro.png
?? versioned_docs/version-1.8.0/mcp-server/images/wizard-mute-menu.png
?? versioned_docs/version-1.8.0/mcp-server/images/wizard-no-recommendations.png
?? versioned_docs/version-1.8.0/mcp-server/images/wizard-providers.png
?? versioned_docs/version-1.8.0/mcp-server/images/wizard-role-defaults.png
?? versioned_docs/version-1.8.0/mcp-server/images/wizard-summary-next-steps.png
?? versioned_docs/version-1.8.0/mcp-server/images/wizard-summary.png
?? versioned_docs/version-1.8.0/mcp-server/mcp-app-settings.mdx
?? versioned_docs/version-1.8.0/mcp-server/mcp-connections.mdx
?? versioned_docs/version-1.8.0/mcp-server/mcp-overview.mdx
?? versioned_docs/version-1.8.0/mcp-server/mcp-settings.mdx
?? versioned_docs/version-1.8.0/mcp-server/mcp-setup.mdx
?? versioned_docs/version-1.8.0/mcp-server/mcp-tools.mdx
?? versioned_docs/version-1.8.0/mcp-server/mcp-transport.mdx
?? versioned_docs/version-1.8.0/mcp-server/setup-wizard.mdx
?? versioned_docs/version-1.8.0/mcp-server/workflow-commands.mdx
?? versioned_docs/version-1.8.0/overseer/best-practices.mdx
?? versioned_docs/version-1.8.0/overseer/images/oversight-controls.png
?? versioned_docs/version-1.8.0/overseer/lanes.mdx
?? versioned_docs/version-1.8.0/overseer/linking-sessions.mdx
?? versioned_docs/version-1.8.0/overseer/overview.mdx
?? versioned_docs/version-1.8.0/overview/getting-started.mdx
?? versioned_docs/version-1.8.0/overview/going-deeper.mdx
?? versioned_docs/version-1.8.0/overview/how-it-really-works.mdx
?? versioned_docs/version-1.8.0/overview/how-it-works.mdx
?? versioned_docs/version-1.8.0/overview/installation.mdx
?? versioned_docs/version-1.8.0/providers/anthropic-api.mdx
?? versioned_docs/version-1.8.0/providers/azure-openai.mdx
?? versioned_docs/version-1.8.0/providers/cc-custom.mdx
?? versioned_docs/version-1.8.0/providers/cc-moonshot.mdx
?? versioned_docs/version-1.8.0/providers/cc-zai.mdx
?? versioned_docs/version-1.8.0/providers/claude-code-cli.mdx
?? versioned_docs/version-1.8.0/providers/codex-cli.mdx
?? versioned_docs/version-1.8.0/providers/cursor-cli.mdx
?? versioned_docs/version-1.8.0/providers/custom-api.mdx
?? versioned_docs/version-1.8.0/providers/deepseek.mdx
?? versioned_docs/version-1.8.0/providers/devin-cli.mdx
?? versioned_docs/version-1.8.0/providers/fireworks-ai.mdx
?? versioned_docs/version-1.8.0/providers/gemini-api.mdx
?? versioned_docs/version-1.8.0/providers/google-antigravity.mdx
?? versioned_docs/version-1.8.0/providers/grok-build.mdx
?? versioned_docs/version-1.8.0/providers/groq.mdx
?? versioned_docs/version-1.8.0/providers/local-models.mdx
?? versioned_docs/version-1.8.0/providers/models.mdx
?? versioned_docs/version-1.8.0/providers/openai-api.mdx
?? versioned_docs/version-1.8.0/providers/opencode-cli.mdx
?? versioned_docs/version-1.8.0/providers/openrouter.mdx
?? versioned_docs/version-1.8.0/providers/overview.mdx
?? versioned_docs/version-1.8.0/providers/xai-api.mdx
?? versioned_docs/version-1.8.0/providers/zai-api.mdx
?? versioned_docs/version-1.8.0/reference/settings.mdx
?? versioned_docs/version-1.8.0/settings/agent-mode/agent-decisions.mdx
?? versioned_docs/version-1.8.0/settings/agent-mode/agent-models.mdx
?? versioned_docs/version-1.8.0/settings/agent-mode/agent-permissions.mdx
?? versioned_docs/version-1.8.0/settings/agent-mode/agent-workflows.mdx
?? versioned_docs/version-1.8.0/settings/agent-mode/cli-providers.mdx
?? versioned_docs/version-1.8.0/settings/agent-mode/context-builder.mdx
?? versioned_docs/version-1.8.0/settings/agent-mode/overview.mdx
?? versioned_docs/version-1.8.0/settings/general/advanced.mdx
?? versioned_docs/version-1.8.0/settings/general/appearance.mdx
?? versioned_docs/version-1.8.0/settings/general/keyboard-shortcuts.mdx
?? versioned_docs/version-1.8.0/settings/general/notifications.mdx
?? versioned_docs/version-1.8.0/settings/general/telemetry.mdx
?? versioned_docs/version-1.8.0/settings/general/updates.mdx
?? versioned_docs/version-1.8.0/settings/images/advanced-code-maps.png
?? versioned_docs/version-1.8.0/settings/images/advanced-history.png
?? versioned_docs/version-1.8.0/settings/images/advanced-packaging.png
?? versioned_docs/version-1.8.0/settings/images/advanced-prompts.png
?? versioned_docs/version-1.8.0/settings/images/advanced-scanning.png
?? versioned_docs/version-1.8.0/settings/images/advanced-shortcuts.png
?? versioned_docs/version-1.8.0/settings/images/advanced-urls.png
?? versioned_docs/version-1.8.0/settings/images/advanced.png
?? versioned_docs/version-1.8.0/settings/images/agent-decisions-auto-effort.png
?? versioned_docs/version-1.8.0/settings/images/agent-decisions-jev.png
?? versioned_docs/version-1.8.0/settings/images/agent-decisions-openai.png
?? versioned_docs/version-1.8.0/settings/images/agent-decisions-router.png
?? versioned_docs/version-1.8.0/settings/images/agent-decisions-usage-balancing.png
?? versioned_docs/version-1.8.0/settings/images/agent-decisions.png
?? versioned_docs/version-1.8.0/settings/images/agent-models-advanced.png
?? versioned_docs/version-1.8.0/settings/images/agent-models-context-builder.png
?? versioned_docs/version-1.8.0/settings/images/agent-models-oracles.png
?? versioned_docs/version-1.8.0/settings/images/agent-models-recommendations.png
?? versioned_docs/version-1.8.0/settings/images/agent-models-related.png
?? versioned_docs/version-1.8.0/settings/images/agent-models-reprompt.png
?? versioned_docs/version-1.8.0/settings/images/agent-models-roles.png
?? versioned_docs/version-1.8.0/settings/images/agent-models-scope.png
?? versioned_docs/version-1.8.0/settings/images/agent-models.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-antigravity.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-claude.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-codex.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-disconnected.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-opencode.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-overseer.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-related.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-subagents-policy.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-subagents-preview.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-subagents-profiles.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-subagents.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions-tabs.png
?? versioned_docs/version-1.8.0/settings/images/agent-permissions.png
?? versioned_docs/version-1.8.0/settings/images/agent-workflows-built-in.png
?? versioned_docs/version-1.8.0/settings/images/agent-workflows-cleanup.png
?? versioned_docs/version-1.8.0/settings/images/agent-workflows-custom.png
?? versioned_docs/version-1.8.0/settings/images/agent-workflows-featured.png
?? versioned_docs/version-1.8.0/settings/images/agent-workflows.png
?? versioned_docs/version-1.8.0/settings/images/antigravity.png
?? versioned_docs/version-1.8.0/settings/images/api-providers-anthropic.png
?? versioned_docs/version-1.8.0/settings/images/api-providers-azure.png
?? versioned_docs/version-1.8.0/settings/images/api-providers-deepseek.png
?? versioned_docs/version-1.8.0/settings/images/api-providers-fireworks.png
?? versioned_docs/version-1.8.0/settings/images/api-providers-gemini.png
?? versioned_docs/version-1.8.0/settings/images/api-providers-grok.png
?? versioned_docs/version-1.8.0/settings/images/api-providers-groq.png
?? versioned_docs/version-1.8.0/settings/images/api-providers-local.png
?? versioned_docs/version-1.8.0/settings/images/api-providers-openai.png
?? versioned_docs/version-1.8.0/settings/images/api-providers-repair.png
?? versioned_docs/version-1.8.0/settings/images/api-providers-zai.png
?? versioned_docs/version-1.8.0/settings/images/api-providers.png
?? versioned_docs/version-1.8.0/settings/images/appearance-display.png
?? versioned_docs/version-1.8.0/settings/images/appearance-editing.png
?? versioned_docs/version-1.8.0/settings/images/appearance-text-size.png
?? versioned_docs/version-1.8.0/settings/images/appearance-theme.png
?? versioned_docs/version-1.8.0/settings/images/appearance.png
?? versioned_docs/version-1.8.0/settings/images/cc-custom-limits.png
?? versioned_docs/version-1.8.0/settings/images/cc-custom.png
?? versioned_docs/version-1.8.0/settings/images/cc-moonshot.png
?? versioned_docs/version-1.8.0/settings/images/cc-zai.png
?? versioned_docs/version-1.8.0/settings/images/chat-settings-edit-mode.png
?? versioned_docs/version-1.8.0/settings/images/chat-settings-model.png
?? versioned_docs/version-1.8.0/settings/images/chat-settings-oracle.png
?? versioned_docs/version-1.8.0/settings/images/chat-settings-planning.png
?? versioned_docs/version-1.8.0/settings/images/chat-settings-recommendations.png
?? versioned_docs/version-1.8.0/settings/images/chat-settings-temperature.png
?? versioned_docs/version-1.8.0/settings/images/chat-settings.png
?? versioned_docs/version-1.8.0/settings/images/claude.png
?? versioned_docs/version-1.8.0/settings/images/cli-providers.png
?? versioned_docs/version-1.8.0/settings/images/codex-import-mcp.png
?? versioned_docs/version-1.8.0/settings/images/codex-optional-features.png
?? versioned_docs/version-1.8.0/settings/images/codex.png
?? versioned_docs/version-1.8.0/settings/images/context-builder-agent.png
?? versioned_docs/version-1.8.0/settings/images/context-builder-analysis-budget.png
?? versioned_docs/version-1.8.0/settings/images/context-builder-context-budget.png
?? versioned_docs/version-1.8.0/settings/images/context-builder-enhancement.png
?? versioned_docs/version-1.8.0/settings/images/context-builder-follow-up.png
?? versioned_docs/version-1.8.0/settings/images/context-builder-instructions.png
?? versioned_docs/version-1.8.0/settings/images/context-builder-mcp-questions.png
?? versioned_docs/version-1.8.0/settings/images/context-builder-timeout.png
?? versioned_docs/version-1.8.0/settings/images/context-builder-ui-questions.png
?? versioned_docs/version-1.8.0/settings/images/context-builder.png
?? versioned_docs/version-1.8.0/settings/images/copy-prompt-order-duplicate.png
?? versioned_docs/version-1.8.0/settings/images/copy-prompt-order-reset.png
?? versioned_docs/version-1.8.0/settings/images/copy-prompt-order-sections.png
?? versioned_docs/version-1.8.0/settings/images/copy-prompt-order.png
?? versioned_docs/version-1.8.0/settings/images/cursor.png
?? versioned_docs/version-1.8.0/settings/images/custom-api-actions.png
?? versioned_docs/version-1.8.0/settings/images/custom-api-connection.png
?? versioned_docs/version-1.8.0/settings/images/custom-api-tokens.png
?? versioned_docs/version-1.8.0/settings/images/custom-api.png
?? versioned_docs/version-1.8.0/settings/images/devin.png
?? versioned_docs/version-1.8.0/settings/images/grok-build.png
?? versioned_docs/version-1.8.0/settings/images/keyboard-shortcuts-agent-layout.png
?? versioned_docs/version-1.8.0/settings/images/keyboard-shortcuts-application.png
?? versioned_docs/version-1.8.0/settings/images/keyboard-shortcuts-composer.png
?? versioned_docs/version-1.8.0/settings/images/keyboard-shortcuts-display.png
?? versioned_docs/version-1.8.0/settings/images/keyboard-shortcuts-enable.png
?? versioned_docs/version-1.8.0/settings/images/keyboard-shortcuts-session-tabs.png
?? versioned_docs/version-1.8.0/settings/images/keyboard-shortcuts-workspace-presets.png
?? versioned_docs/version-1.8.0/settings/images/keyboard-shortcuts.png
?? versioned_docs/version-1.8.0/settings/images/manage-presets-empty.png
?? versioned_docs/version-1.8.0/settings/images/manage-presets-workspace.png
?? versioned_docs/version-1.8.0/settings/images/manage-presets.png
?? versioned_docs/version-1.8.0/settings/images/manage-workspaces-create.png
?? versioned_docs/version-1.8.0/settings/images/manage-workspaces-library.png
?? versioned_docs/version-1.8.0/settings/images/manage-workspaces-restore.png
?? versioned_docs/version-1.8.0/settings/images/manage-workspaces-storage.png
?? versioned_docs/version-1.8.0/settings/images/manage-workspaces.png
?? versioned_docs/version-1.8.0/settings/images/mcp-server-cli.png
?? versioned_docs/version-1.8.0/settings/images/mcp-server-context-builder.png
?? versioned_docs/version-1.8.0/settings/images/mcp-server-json.png
?? versioned_docs/version-1.8.0/settings/images/mcp-server-presets.png
?? versioned_docs/version-1.8.0/settings/images/mcp-server-setup.png
?? versioned_docs/version-1.8.0/settings/images/mcp-server-status.png
?? versioned_docs/version-1.8.0/settings/images/mcp-server-strict-approval.png
?? versioned_docs/version-1.8.0/settings/images/mcp-server.png
?? versioned_docs/version-1.8.0/settings/images/model-config.png
?? versioned_docs/version-1.8.0/settings/images/model-presets-default.png
?? versioned_docs/version-1.8.0/settings/images/model-presets.png
?? versioned_docs/version-1.8.0/settings/images/model-router-auto-effort.png
?? versioned_docs/version-1.8.0/settings/images/model-router-behavior.png
?? versioned_docs/version-1.8.0/settings/images/model-router-enable.png
?? versioned_docs/version-1.8.0/settings/images/model-router-guidance.png
?? versioned_docs/version-1.8.0/settings/images/model-router-model-selection.png
?? versioned_docs/version-1.8.0/settings/images/model-router-paid-fast.png
?? versioned_docs/version-1.8.0/settings/images/model-router-service.png
?? versioned_docs/version-1.8.0/settings/images/model-router-sharing.png
?? versioned_docs/version-1.8.0/settings/images/model-router-usage-balancing.png
?? versioned_docs/version-1.8.0/settings/images/model-router.png
?? versioned_docs/version-1.8.0/settings/images/notifications-actions.png
?? versioned_docs/version-1.8.0/settings/images/notifications-chat.png
?? versioned_docs/version-1.8.0/settings/images/notifications-events.png
?? versioned_docs/version-1.8.0/settings/images/notifications-general.png
?? versioned_docs/version-1.8.0/settings/images/notifications.png
?? versioned_docs/version-1.8.0/settings/images/opencode.png
?? versioned_docs/version-1.8.0/settings/images/openrouter-advanced.png
?? versioned_docs/version-1.8.0/settings/images/openrouter-available.png
?? versioned_docs/version-1.8.0/settings/images/openrouter-key.png
?? versioned_docs/version-1.8.0/settings/images/openrouter-registered.png
?? versioned_docs/version-1.8.0/settings/images/openrouter.png
?? versioned_docs/version-1.8.0/settings/images/overview-chats.png
?? versioned_docs/version-1.8.0/settings/images/overview-cleanup.png
?? versioned_docs/version-1.8.0/settings/images/overview-context-budgets.png
?? versioned_docs/version-1.8.0/settings/images/overview-environment-filtering.png
?? versioned_docs/version-1.8.0/settings/images/overview-handoff.png
?? versioned_docs/version-1.8.0/settings/images/overview-hook-approval.png
?? versioned_docs/version-1.8.0/settings/images/overview-permissions.png
?? versioned_docs/version-1.8.0/settings/images/overview-providers.png
?? versioned_docs/version-1.8.0/settings/images/overview-supervision.png
?? versioned_docs/version-1.8.0/settings/images/overview-usage-limits.png
?? versioned_docs/version-1.8.0/settings/images/overview-workflows.png
?? versioned_docs/version-1.8.0/settings/images/overview.png
?? versioned_docs/version-1.8.0/settings/images/search-settings.png
?? versioned_docs/version-1.8.0/settings/images/telemetry-controls.png
?? versioned_docs/version-1.8.0/settings/images/telemetry-privacy.png
?? versioned_docs/version-1.8.0/settings/images/telemetry-status.png
?? versioned_docs/version-1.8.0/settings/images/telemetry.png
?? versioned_docs/version-1.8.0/settings/images/tools-agent-explore.png
?? versioned_docs/version-1.8.0/settings/images/tools-agent-manage.png
?? versioned_docs/version-1.8.0/settings/images/tools-agent-run.png
?? versioned_docs/version-1.8.0/settings/images/tools-app-settings.png
?? versioned_docs/version-1.8.0/settings/images/tools-apply-edits.png
?? versioned_docs/version-1.8.0/settings/images/tools-bind-context.png
?? versioned_docs/version-1.8.0/settings/images/tools-context-builder.png
?? versioned_docs/version-1.8.0/settings/images/tools-controls.png
?? versioned_docs/version-1.8.0/settings/images/tools-file-actions.png
?? versioned_docs/version-1.8.0/settings/images/tools-file-search.png
?? versioned_docs/version-1.8.0/settings/images/tools-get-code-structure.png
?? versioned_docs/version-1.8.0/settings/images/tools-get-file-tree.png
?? versioned_docs/version-1.8.0/settings/images/tools-git.png
?? versioned_docs/version-1.8.0/settings/images/tools-history.png
?? versioned_docs/version-1.8.0/settings/images/tools-manage-selection.png
?? versioned_docs/version-1.8.0/settings/images/tools-manage-workspaces.png
?? versioned_docs/version-1.8.0/settings/images/tools-manage-worktree.png
?? versioned_docs/version-1.8.0/settings/images/tools-oracle-send.png
?? versioned_docs/version-1.8.0/settings/images/tools-oracle-utils.png
?? versioned_docs/version-1.8.0/settings/images/tools-prompt.png
?? versioned_docs/version-1.8.0/settings/images/tools-read-file.png
?? versioned_docs/version-1.8.0/settings/images/tools-workspace-context.png
?? versioned_docs/version-1.8.0/settings/images/tools.png
?? versioned_docs/version-1.8.0/settings/images/updates-automatic.png
?? versioned_docs/version-1.8.0/settings/images/updates-channel.png
?? versioned_docs/version-1.8.0/settings/images/updates-status.png
?? versioned_docs/version-1.8.0/settings/images/updates.png
?? versioned_docs/version-1.8.0/settings/images/workflow-presets-chat-rows.png
?? versioned_docs/version-1.8.0/settings/images/workflow-presets-chat.png
?? versioned_docs/version-1.8.0/settings/images/workflow-presets-controls.png
?? versioned_docs/version-1.8.0/settings/images/workflow-presets-copy.png
?? versioned_docs/version-1.8.0/settings/images/workflow-presets.png
?? versioned_docs/version-1.8.0/settings/images/workspace-approvals-clients.png
?? versioned_docs/version-1.8.0/settings/images/workspace-approvals-global.png
?? versioned_docs/version-1.8.0/settings/images/workspace-approvals-operations.png
?? versioned_docs/version-1.8.0/settings/images/workspace-approvals.png
?? versioned_docs/version-1.8.0/settings/mcp-server/mcp-server.mdx
?? versioned_docs/version-1.8.0/settings/mcp-server/model-presets.mdx
?? versioned_docs/version-1.8.0/settings/mcp-server/tools.mdx
?? versioned_docs/version-1.8.0/settings/mcp-server/workspace-approvals.mdx
?? versioned_docs/version-1.8.0/settings/models-and-providers/api-providers.mdx
?? versioned_docs/version-1.8.0/settings/models-and-providers/custom-api.mdx
?? versioned_docs/version-1.8.0/settings/models-and-providers/model-config.mdx
?? versioned_docs/version-1.8.0/settings/models-and-providers/openrouter.mdx
?? versioned_docs/version-1.8.0/settings/prompting/chat-settings.mdx
?? versioned_docs/version-1.8.0/settings/prompting/copy-prompt-order.mdx
?? versioned_docs/version-1.8.0/settings/prompting/workflow-presets.mdx
?? versioned_docs/version-1.8.0/settings/search-settings.mdx
?? versioned_docs/version-1.8.0/settings/workspaces/manage-presets.mdx
?? versioned_docs/version-1.8.0/settings/workspaces/manage-workspaces.mdx
?? versioned_docs/version-1.8.0/why-repoprompt.mdx
?? versioned_docs/version-1.8.0/worktrees/create-and-use.mdx
?? versioned_docs/version-1.8.0/worktrees/overview.mdx
?? versioned_docs/version-1.8.0/worktrees/review-and-merge.mdx
?? versioned_sidebars/version-1.8.0-sidebars.json
```

The ledger itself remains untracked while these results are appended; its porcelain entry is unchanged. No commit or staging occurred. Item 2 is complete with the explicit unverified screenshot dispositions; item 3/full validation and review remain outstanding.

---

## Item 3 — documentation validation and artifact audit

Recorded 2026-11-01. This section supersedes the earlier stage-specific statements that item 3 has not run; the preserved inventory and item 2 record are unchanged. Automated validation is complete for both requested configurations after the authorized review correction. Browser/assistive-technology and stable-release screenshot verification remain incomplete; this is not publication approval or a WCAG conformance claim.

### Scope, instructions, and checkout attestation

Read the exported three-item plan, this ledger, root `AGENTS.md`, and `docs/runbooks/{content-and-media,maintenance,publishing,search-and-redirects}.md`. All filesystem/repository operations targeted the absolute documentation root below. No implicit primary-repository Git operation, rebinding, alternate checkout, application-source execution, or sibling delegation was used.

Before validation and again at completion:

```text
resolved cwd / repository root:
/Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs
absolute Git directory and resolved common directory:
/Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs/.git
Git common-directory output: .git
branch: content/1.8.0-update
HEAD: c1534583abc590f2a527dd0a71311316436919e0
worktree list --porcelain:
worktree /Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs
HEAD c1534583abc590f2a527dd0a71311316436919e0
branch refs/heads/content/1.8.0-update

status --porcelain=v1 --untracked-files=normal:
 M versions.json
?? docs/reviews/ce-1.8.0-documentation-review.md
?? versioned_docs/version-1.8.0/
?? versioned_sidebars/version-1.8.0-sidebars.json
staged changes: none
```

The complete `--untracked-files=all` porcelain is byte-identical before and after this stage: **347 entries**, SHA-256 `5858513dea8feb46c7dc57f8567702124462681b99d0e844e227093849e4021d`. Its complete path list is the item 2 list immediately above; it was not silently collapsed for the comparison. Temporary copies are `before-status.txt` and `after-status.txt` in the log directory below. The only content change since the entry fingerprint, apart from appending this ledger, is the authorized one-sentence correction described next.

### Coordinator-owned Oracle review and authorized correction

Read `prompt-exports/oracle-review-2026-11-01-121813-published-release-do-7756.md`. The coordinator performed the single read-only Oracle review; no second review was requested here. Verdict: **approve with fixes**, one P1 in `settings/agent-mode/agent-decisions.mdx`, under **Decisions by OpenAI → Privacy and data controls**.

The old sentence conflated excluded attachment/tagged-file payloads with ineligibility of their containing request. With explicit coordinator authorization, replaced only that sentence with:

> Auto Workflow skips slash-leading requests. Attachment contents and tagged-file payloads are not included in decision requests; an otherwise eligible message can still have its text excerpt evaluated.

The coordinator independently confirmed the pinned eligibility behavior. The Oracle itself reviewed supplied content/ledger only and did not reopen linked source objects, run validation, or verify screenshots/browser/accessibility. Those limitations remain attached to its verdict. The first literal replacement missed the longer original sentence and made no change; the exact full-sentence replacement succeeded. Final page SHA-256: `7c6890a53c1a906e6c24a63fe09d5d9c7d002eca8dbfbae10d32248fd439a5aa`.

The correction was made while an unsuccessful root-build retry was in flight. That attempt is not accepted as post-correction evidence. Both successful full builds started afterward; the corrected wording is present in generated HTML and Markdown. No other content or shared-site fix was made.

### Existing tooling, environment, and reproducible commands

- Node **v26.13.0**, satisfying `.node-version` **26** and `engines.node >=26`.
- pnpm **12.15.0**, exactly the package pin. The normal mise `pnpm/12` launcher resolves to **12.17.0**, which had tried to materialize a private pinned install in item 2. Instead, an already-installed 12.15.0 native launcher was found and its `--version` returned 12.15.0, exit 0. No package-manager version deviation, download, installation, upgrade, lockfile change, or rebuild/install lifecycle command was needed.
- Docusaurus **3.10.2** from existing dependencies. Auxiliary static inspection used Python **3.15.2** and Node. Existing cached Playwright Core **1.62.1** was found; its browser launch was blocked as recorded below.
- Logs and temporary inspection utilities: `/tmp/ce-1.8.0-docs-validation/` (physical location `/private/tmp/ce-1.8.0-docs-validation/`). These are local, ephemeral evidence; the results and relevant hashes are preserved here.

Commands ran from the attested root. The following PATH applies to both the top-level launcher and nested `pnpm` commands in the unchanged build script:

```sh
cd /Users/david/Developer/Projects/Current/RepoPrompt/repoprompt-ce-user-docs
export PATH="/Users/david/Library/pnpm/package-manager-store/v11/links/@/pnpm/12.15.0/a2b4096fa6e437b284cd708deee144a3f3dfe0dc1df8155615f7bb32cc8b845b/node_modules/pnpm:$PATH"
export COREPACK_ENABLE_NETWORK=0
export SWC_NATIVE_BINDING_CACHE=/private/tmp/ce-1.8.0-docs-validation/swc-native

pnpm test
pnpm run check:content
SITE_URL=https://example.invalid SITE_BASE_URL=/ SITE_INDEXABLE=false \
  ALGOLIA_APP_ID='' ALGOLIA_SEARCH_API_KEY='' ALGOLIA_INDEX_NAME='' pnpm run build
# Inspect and record root artifacts before the following replaces build/.
SITE_URL=https://example.invalid SITE_BASE_URL=/repoprompt-ce-user-docs/ SITE_INDEXABLE=false \
  ALGOLIA_APP_ID='' ALGOLIA_SEARCH_API_KEY='' ALGOLIA_INDEX_NAME='' pnpm run build
```

Each producer's stdout/stderr was redirected directly to its log, immediately followed by `rc=$?` and an `.exit` file. Full-build wrappers exited with that captured producer status. No `tee`, grep pipeline, or last-command exit was substituted for a producer's exit. No bare Docusaurus build was substituted for `pnpm run build`; each successful full build ran tests, content checks, Docusaurus, redirect finalization, LLM finalization, and artifact checks. No separate mismatched-environment artifact command was used.

### Actual command results and failures retained

All log names below are relative to the temporary log directory. Initial and final standalone checks both ran; final standalone checks were repeated after the correction and both builds.

| Producer / attempt | Exit | Actual result / log |
| --- | --- | --- |
| Initial `pnpm test` | 0 | 32 passed, 0 failed/skipped; `test.log`. |
| Initial `pnpm run check:content` | 0 | 402 documents, sidebars, local links, images, anchors, and redirect destinations validated; `content.log`. |
| Root full build, default SWC cache | 1 | Failed loading SWC HTML native binding: cache pruning lock under `/Users/david/Library/Caches/swc-native-501/v1/` denied. `build-root.log`. Not a passing artifact. |
| Root full build, cache set to `/tmp/.../swc-native` | 1 | SWC rejects a symlink component in the custom cache path (`/tmp`); default-cache fallback was also denied. `build-root-retry.log`. No reinstall or elevation. |
| **Final root full build**, physical `/private/tmp/...` cache | **0** | 32 tests passed; 402 docs validated and exported; compilation, redirect/LLM finalizers, and artifact QA passed. `build-root-final.log`. |
| **Final project-base full build**, same physical cache | **0** | Same complete pipeline passed. `build-project-final.log`. |
| Final standalone `pnpm test` | 0 | 32 passed, 0 failed/skipped; `test-final.log`. |
| Final standalone `pnpm run check:content` | 0 | 402 documents validated; `content-final.log`. |

The cache override only materializes the existing installed native payload in a writable temporary cache; it does not install a dependency. Successful builds still emitted Node's experimental `localStorage` warning and Docusaurus's denied update-config-store warning. Neither was silently reported as a clean warning-free run, and neither prevented producer exit 0. No sudo, permission change, update command, or network publication was attempted.

Log SHA-256 values:

| Log | SHA-256 |
| --- | --- |
| `build-root.log` | `062de3b609d640044de6022c3339b313117264dc13a4e4f1384ff38e64290b19` |
| `build-root-retry.log` | `75e2063a1e7c2960aa85e04af41608a3cf5b1047952fe00137b0d9ad95afb491` |
| `build-root-final.log` | `791a9a11eec46de02bd36d4c603ac1afb86c27a3b6cdf0705c6a1fc9008a7c25` |
| `build-project-final.log` | `7a823c6ddb540ef1926d2b4930f55e548a548a1ad9cdd5aad91224dac05c4b6d` |
| `test-final.log` | `4825ccb639eea028b2aa2adf951a5f24eb1ed973dbf8ea5579bd7a5c08a682d6` |
| `content-final.log` | `e3c7749d7023896c57b4118db97759cd8b9582d83b5cb478b63f365b0d432219` |

### Artifact observations — root first, then project base

The root artifact was inspected and its route list, JSON observations, complete file-hash manifest, selected HTML/Markdown/redirect samples, and HTTP observations were written **before** the project build began. See `root-{routes.txt,artifact.json,build-sha256.json,version-content.json,http.json}`, `root-navigation-inspection.log`, and `root-samples/`. Project evidence is in corresponding `project-*` files, plus `project-extra-inspection.{json,log}`. The remaining `build/` is the **project-base** artifact, not the root configuration.

| Check | Root `/` | Project `/repoprompt-ce-user-docs/` |
| --- | --- | --- |
| Configuration | `https://example.invalid`, `SITE_INDEXABLE=false`, all three Algolia values empty | Same origin/indexability/search mode; project base supplied explicitly |
| Generated inventory | 462 HTML files; 402 document routes and Markdown exports | Same counts |
| Current vs archive | 110 current 1.8.0 docs at `/docs/`; historical 110 at `/docs/1.7.0/`, 110 at `/docs/1.6.0/`, 72 at `/docs/classic-2.1.0/`; no `/docs/1.8.0/` collection prefix | Same route structure under the project prefix exactly once |
| Navigation/resource inspection | 28,076 local anchor/resource references and 7,071 fragment references checked; zero missing targets | Same counts; zero missing targets or escaped base paths |
| Version navigation | Landing dropdown links to all four versions. Workflow Templates links to its 1.7.0 counterpart; versions without that page fall back to their landing | Same base-aware destinations |
| Redirects | Built-in QA verified all 40 configured aliases, refresh/canonical destinations, `noindex,follow`, history replacement, and fallback links | Same checks passed with the project prefix |
| Local search | Four nonempty indexes, correct-version existing destinations: 1.8.0 **1,796** records; 1.7.0 **1,778**; 1.6.0 **1,795**; Classic **1,377** | Same counts; static phrase inspection found 17 `Auto Workflow` records in current and none in historical indexes |
| Images | Built-in QA passed responsive candidates, lazy loading, alt presence/reviewed decorative exceptions, and file existence | Same checks; six intentionally omitted stale references absent in their current generated pages |
| Metadata | Representative current/archive canonicals use the correct origin and root base; current version tag is 1.8.0; `noindex, nofollow` | All 402 document canonicals, version tags, and robots metadata additionally checked against the route inventory |
| `robots.txt` | `User-agent: *` / `Disallow: /` | `User-agent: *` / `Disallow: /repoprompt-ce-user-docs/` |
| `sitemap.xml` | Absent, expected for `noIndex` | Absent, expected for `noIndex` |
| LLM exports | 402 canonical-path `.md` files plus nonempty `llms.txt` and `llms-full.txt`; current index starts with Community Edition 1.8.0 | Same; origin/base-aware links and version partitions retained |

Sitemap absence was checked against the **installed** `@docusaurus/plugin-sitemap/lib/index.js`: its `postBuild` returns immediately when `siteConfig.noIndex` is true. An indexable sitemap was not requested or built. Project-subpath robots output does not control a host-root robots file.

The root generated Agent Decisions HTML and Markdown contain the corrected privacy sentence; the historical 1.7.0 Markdown does not acquire Auto Workflow text. The project artifact also contains the correction. The new wake-controls table retains its caption, two column headers and six row headers with `scope` associations in generated HTML. This is static markup evidence, not proof of keyboard scrolling or spoken associations.

Supplemental inspection limitations and diagnostic failures are retained rather than hidden:

- The first temporary HTML scanner failed on a redirect directory named `repo-prompt-anatomy.html`; it was corrected to inspect files, not matching directories. A second run incorrectly assumed a sitemap exists under noindex; the installed plugin explains the absence. These were inspection-harness errors, not build failures.
- A broad local-reference scan returned exit 1 for three **404-page metadata** references ending in `/404.html/` (canonical and two hreflang links), while the physical output is `404.html`. The final navigation/resource scan intentionally excludes canonical/alternate metadata from navigable-target assertions and exited 0 for each base; metadata was inspected separately. This shared 404 metadata observation was reported to the coordinator and left unchanged. Host handling/SEO implications remain a follow-up; no baseline browser/deployed comparison is claimed. No actual document navigation/image/fragment error was found.
- An exact-string caption assertion initially failed because HTML minification legally omits the closing caption tag before `<thead>`. The inspection was corrected to accept that output, then passed (exit 0); no table/content change was made.
- Final auxiliary producer exits: `root-navigation-inspection.exit=0`, `project-navigation-inspection.exit=0`, `project-extra-inspection.exit=0`. Earlier diagnostic logs remain in the temporary directory.

Selected output SHA-256 values (identifying the separately inspected artifacts):

| Artifact | Root build | Project build |
| --- | --- | --- |
| `llms.txt` | `788043a683ee69a4c0e1b5717124d88fe14d18037a40db1e39cb9e819728e8f7` | `3379b70df4cfea62dd32ac76a680744efd9f1a184cb1c136faad1f12cc8dc50d` |
| `llms-full.txt` | `ad3be843032927bdca4dcd84245226a9dedb8cc637cba7420538d9179d32cd90` | `4cfd0712a0d21310bef82eb1213a7c069e66a1ca979d6662b36fcac8c7f8d684` |
| `robots.txt` | `331ea9090db0c9f6f597bd9840fd5b171830f6e0b3ba1cb24dfa91f0c95aedc1` | `8b736972a187352a770a0b6c29166f1f1f03629e0074af8249498c82759705ba` |

### HTTP preview versus browser and accessibility evidence

A temporary, loopback-only Node static server served the existing `build/` on `127.0.0.1:8768`, first root and then project prefix. Independent HTTP requests returned **200** for current Introduction, Agent Decisions, Image Support, all three archive landings, `/documentation/`, `/claim/`, and `llms.txt`; an unknown route returned **404** using the generated fallback. Prefixes were included for the second run. Redirect pages returned their HTML; HTTP retrieval does **not** execute their client redirects. Deep-page HTTP retrieval is not a browser refresh/hydration check. Both preview processes were stopped (exit 130 from explicit interrupt). An attempted process-list-based shutdown was denied by the sandbox; the tool session interrupt stopped the server without elevation.

Browser attempt: existing cached **Playwright Core 1.62.1**, Chromium headless-shell cache `chromium_headless_shell-1234`. Launch exited **1**, before opening a page, with macOS `bootstrap_check_in ... MachPortRendezvousServer ... Permission denied (1100)` and SIGTRAP. No browser version could be obtained from a running instance. No browser, package, or driver was installed; no elevated retry or personal browser profile was used. Therefore **no browser interaction, rendered screenshot, viewport/theme measurement, or assistive-technology pass is claimed**.

| Remaining review | Routes / scope | Status and reason |
| --- | --- | --- |
| Desktop/mobile navigation, version dropdown, skip link, focus order/visibility/return and obscuration; tabs and TOC | Current `/docs/`, Workflow Templates, Agent Decisions, archive representatives; Home/Blog/shared navigation | **Not tested** in a browser. Viewport/zoom/theme/browser version: unavailable. Static destinations are checked, interaction is not. WCAG 2.1.1, 2.4.1, 2.4.3, 2.4.7, 2.4.11. |
| Copy-code/page success and denied-clipboard feedback; local-search keyboard/results/Escape/empty/offline flows | Current docs/code tabs, Image Support, each version's search | **Not tested**; no executing browser. Static tests/indexes do not prove UI behavior. WCAG 2.1.1, 4.1.2, 4.1.3. Remote Algolia intentionally unconfigured and not verified. |
| Image zoom activation, Escape and focus return; alt against actual pixels; privacy/exclusions | Current image-bearing Agent Mode, Settings, MCP and representative archives/blog | **Not tested**; no browser/pixel review in this stage. Existing hashes/alt checks are supporting evidence only. WCAG 1.1.1, 2.1.1, 2.4.3. |
| Table keyboard scrolling and spoken row/column headers | Overseer Best Practices, Providers & Models, MCP reference | **Not tested**; static caption/header associations checked only. WCAG 1.3.1, 2.1.1. |
| Light/dark rendered contrast, 320 CSS-pixel reflow, 400% zoom, 200% text resizing, text-spacing overrides, reduced motion, forced colors | Changed routes and representative current/archive/shared routes | **Not tested**; no viewport/theme/contrast measurements. WCAG 1.4.3, 1.4.4, 1.4.10, 1.4.11, 1.4.12. |
| External-link announcement, dynamic links, accessible names and actual speech | Text/icon links, changelog, delayed links; VoiceOver/Safari and NVDA/Firefox | **Not tested**; no AT session or browser versions. WCAG 2.4.4, 2.5.3, 4.1.2; new-tab warning is advisory. |
| Home media/testimonials, legal/blog/changelog/actual-404 interactions and embedded third parties | Full release-review scope from maintenance runbook | **Not tested**; HTTP/static inventory does not certify keyboard/media/contrast or third-party behavior. No deployed-revision verification performed. |

No new stable-1.8.0 capture was supplied or produced. All **234** copied image assets remain unverified for release appearance, privacy and alt-to-pixel accuracy in this stage. The six stale prose references remain omitted; their bytes are preserved. Before making visual/publication claims, complete the earlier S01–S13 dispositions: obtain approved stable captures if restoring the Workflow dropdown, full Agent Decisions/service panes, or full/expanded MCP lifecycle panes; optional new drop/thumbnail/viewer, rewrite-complete, approval, polling and Oracle-result examples need separate provenance. Preserve originals, use native-resolution crops, record hashes/crop coordinates/redactions, and review retained pixels. No synthetic image or fabricated capture manifest was added.

### Final preservation and handoff

- Compared every tracked file's raw Git blob hash with **HEAD**, not merely timestamps: only `versions.json` differs. In particular **747 historical collection/sidebar files** and **167 original screenshot/manifest files** are byte-for-byte unchanged. Shared site code, validation scripts, dependency manifests/lockfile, notices and licenses are unchanged.
- Compared old/new collection path sets: **344 files each**, no missing or extra files. All **234** images are byte-identical to their 1.7.0 counterparts. The new explicit sidebar is byte-identical to the template. Existing assets were preserved even where instructional references were omitted.
- Compared 1,428 entry fingerprints (tracked files plus new collection/sidebar) against completion: only the specifically authorized Agent Decisions page changed during item 3. This ledger is the only other edited file. `git diff --check` passed; no staged changes, unexpected untracked source files, or unrelated tracked diffs. Generated `build/` and temporary logs are not staged.
- Branch, HEAD, Git/common directory, sole worktree, and complete dirty-path list remain as attested above. No commit, push, deployment, install/upgrade, remote mutation, app launch/build/test/diagnostic, Swift execution, or additional Oracle review occurred.
- **Handoff:** required automated commands and both artifact audits pass after the P1 fix. Manual browser/AT and release screenshot checks remain open; the shared 404 metadata observation is recorded for follow-up. Do not equate these automated passes with visual verification, accessibility certification, or a live-site update.

