# Contributing to claude-mileage

`claude-mileage` is a small tool with a narrow scope. Contributions are welcome when they improve the existing preparation loop without expanding the product.

## Good Contribution Targets

- prompt composition clarity
- preview and payload transparency
- local state handling
- error handling
- focused tests
- docs that make the current behavior easier to understand

## Avoid

- broad product expansion
- hidden automation
- cloud or service features
- replacing the Claude CLI
- speculative abstractions
- heavy dependencies

## Working Style

- Keep changes small and direct.
- Preserve the current command surface unless there is a clear bug.
- Prefer deterministic behavior over clever behavior.
- Update docs when behavior or expectations change.

## Local Checks

```bash
npm install
npm test
```

## Tone

- Direct
- Technical
- Restrained
- Honest
