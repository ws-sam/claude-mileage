# Roadmap

This roadmap is intentionally narrow. The goal is to improve the current local preparation loop without changing the product shape.

## Current v0

- [x] Local `.mileage/` workspace
- [x] One-shot execution through `claude -p`
- [x] Brief, history, pinned files, and diff prompt composition
- [x] Prompt preview with section metrics
- [x] Basic truncation guardrails
- [x] Local request history

## Near-Term Cleanup

- [ ] Improve missing-path and missing-binary errors
- [ ] Tighten tests around prompt construction and workspace state
- [ ] Refine preview output where it helps decision-making
- [ ] Keep docs aligned with actual command behavior

## Later, If Still In Scope

- [ ] Better diff fallback behavior
- [ ] More precise file inclusion controls
- [ ] Small quality-of-life improvements that preserve determinism and inspectability
