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

Report suspected vulnerabilities privately rather than opening a public issue.
Use GitHub's private vulnerability reporting flow for this documentation repository:

1. Open this repository's **Security** tab.
2. Select **Report a vulnerability**.
3. Describe the affected page or file and documentation version, commit, or
   deployment if known. Include steps to reproduce the issue, its potential
   impact, and any proposed remediation.

If the reporting option is absent, ask a maintainer in an issue to enable private
vulnerability reporting, without describing the vulnerability or sharing sensitive
details. This file does not itself enable GitHub's reporting feature.

Use a minimal example with sample data. Keep live credentials, private keys,
customer data, and exploit details out of public issues and pull requests.

Keep testing limited to systems you own or have permission to test. Do not access
other people's data or disrupt the live documentation site.

## Fixes and disclosure

Security fixes target the current site and default branch. Archived documentation
is historical reference, not a separately maintained security release. Report
risks involving archived pages as well so maintainers can assess the affected
site or deployment.

Maintainers will acknowledge and investigate reports through the private reporting
channel. For confirmed vulnerabilities, they will work with the reporter on a fix
and agree on a disclosure timeline. No guaranteed response time or paid bounty is
offered by this policy.
