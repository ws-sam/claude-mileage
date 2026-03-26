# claude-mileage

> **Better mileage for Claude CLI workflows.**  
> An unofficial, open-source local wrapper for Claude CLI focused on usage efficiency.

---

### ⚠️ UNOFFICIAL COMMUNITY PROJECT
**This is an unofficial, community-driven open-source project.**
- It is **NOT** affiliated with, endorsed by, sponsored by, or supported by Anthropic.
- It does **NOT** provide Claude access; you must have your own Claude account/subscription and the Claude CLI installed.
- It does **NOT** bypass, circumvent, or defeat usage limits.
- It is a local workflow wrapper designed to help you use your existing Claude CLI workflow more efficiently.
- See [DISCLAIMER.md](./DISCLAIMER.md) and [TRADEMARK_NOTICE.md](./TRADEMARK_NOTICE.md) for full details.

---

## The Thesis
`claude-mileage` is an unofficial, open-source local wrapper for the Claude CLI. It is built for users who want to improve the efficiency of their existing workflow by reducing waste in context, output, and task flow.

Most usage is often spent on unnecessary context, repeated raw data, and "chatty" thread histories. We believe in **mileage**: the practice of getting higher utility out of your message limit through better discipline and local-first tooling.

> **Note on "Mileage over Max":** This is our internal shorthand for an efficiency-first workflow philosophy. It does not imply opposition to Anthropic’s pricing or a replacement for any Anthropic subscription tier. It simply means we prioritize reducing waste in the workflow a user already uses.

## What it is
A terminal-native wrapper and workflow layer for the Claude CLI that encourages efficient usage habits:
- **Tighter Context:** Automated pruning and context preview before sending.
- **Smaller Tasks:** Breaking large requests into high-probability successes.
- **Local Memory:** Keeping project-specific state locally instead of in the thread history.
- **Summarization Pipeline:** Feeding Claude summaries of previous work instead of raw logs.
- **Diff-First Coding:** Focused code updates that minimize output tokens.
- **Launcher Mode:** (Optional) An opt-in dispatcher that lets `claude` act as a gateway to either the normal CLI or Mileage mode.

## What it does NOT do
- It does **not** provide Claude access or sell Claude usage.
- It does **not** bypass, alter, or defeat Anthropic’s limits, billing, or policies.
- It does **not** proxy Anthropic accounts or subscriptions.
- It does **not** replace the official Claude CLI; it prepares prompts locally and calls the real binary.

## Who it is for
- Terminal-native developers and writers.
- Claude Pro ($20/mo) subscribers in the US/supported regions.
- People who want better ROI on their daily message allotment.
- Users who prefer local, inspectable, and hackable tools.

## Who it is NOT for
- Enterprise users with uncapped budgets.
- Users looking for "jailbreaks" or TOS-evasive tools.
- People who want a GUI-first "AI Platform."

## Fully Open Source & Community Driven
This project is built in public. We welcome contributors who care about CLI UX, efficiency-first workflows, and keeping AI tools local and honest. If you have a better strategy for reducing context waste or a cleaner way to handle local memory, we want your PRs.

---
**Trademark Notice:** "Claude" is a trademark of Anthropic. This project uses the name nominatively to describe compatibility and its function as a wrapper for the Claude CLI.
