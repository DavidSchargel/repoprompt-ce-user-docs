# Security policy

## Scope

This policy covers the documentation website, its build and deployment workflow,
and files in this repository. Examples include injected scripts, exposed
credentials, compromised dependencies, or documentation that directs readers to
run unsafe commands.

Report vulnerabilities in the macOS application through the
[RepoPrompt CE security policy](https://github.com/repoprompt/repoprompt-ce/blob/main/SECURITY.md).
Ordinary typos, broken links, and usability problems belong in public issues;
see [SUPPORT.md](SUPPORT.md).

## Report privately

Use this repository's **Security → Report a vulnerability** option on GitHub
when available. If that option is absent, ask a maintainer in an issue to enable
private vulnerability reporting, without describing the vulnerability or sharing
sensitive details. This file does not itself enable GitHub's reporting feature.

Include the affected page or file, commit or deployment if known, reproduction
steps, potential impact, and any suggested fix. Use a minimal example with sample
data. Do not include live credentials, private keys, customer data, or exploit
details in public issues or pull requests.

Keep testing limited to systems you own or have permission to test. Do not access
other people's data or disrupt the live documentation site.

## Fixes and disclosure

Security fixes target the current site and default branch. Archived documentation
is historical reference, not a separately maintained security release. Report
risks involving archived pages as well so maintainers can assess the affected
site or deployment.

Maintainers can coordinate remediation and disclosure with the reporter through
the private report. No guaranteed response time or paid bounty is offered by
this policy.
