# claude-mileage

![claude-mileage banner](public/token-tengu-banner.png)

`claude-mileage` is a local preparation layer for the Claude CLI. It improves workflow discipline by reducing context waste and grounding requests in specific local memory. 👺

## Concept

When using AI through a CLI, context threads can quickly become noisy and unfocused. `claude-mileage` solves this by preparing your tasks locally. It ensures only high-signal context is sent to the model, using one-shot execution for every task.

- **Local Memory**: Project state stays in your repository, not in cloud threads.
- **One-Shot**: Every run is a fresh `claude -p` call to avoid session drift.
- **Human-Driven**: You manually pin the files relevant to your current task.
- **Traceable**: A local `history.log` tracks attempted tasks and their outcomes.

### Workflow

```text
User Input → Local Preparation → Claude CLI → Result → Local Memory
```

## Install

### Requirements

- **Node.js**: version 20 or higher.
- **Claude CLI**: the [official Anthropic Claude CLI](https://docs.anthropic.com/en/docs/agents-and-tools/claude-cli) must be installed and authenticated.

### Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build

# (Optional) Link for global access
npm link
```

## Commands

- **init**: Set up the `.mileage/` workspace.
- **ask <request>**: Send a grounded task using project memory and pinned files.
- **diff <request>**: Send a task focused on the current `git diff` (staged or HEAD).
- **context [pin|unpin] [path]**: Manage pinned files or preview the next payload.
- **memory**: View or edit the local project brief and history.

## Basic Usage

1. **Initialize** your project:
   ```bash
   claude-mileage init
   ```
2. **Pin** the files you are currently working on:
   ```bash
   claude-mileage context pin src/index.ts
   ```
3. **Ask** a specific question or request a change:
   ```bash
   claude-mileage ask "Refactor the command registration to be more modular"
   ```
4. **Review** your current changes:
   ```bash
   claude-mileage diff "Explain these changes and check for regressions"
   ```

## Project Identity

- **What it is**: A tool for improving context discipline and workflow efficiency.
- **What it is not**: A proxy, an API bypass, a multi-agent orchestrator, or a replacement for the Claude CLI.

## Contributing

`claude-mileage` is a focused v0 project. We welcome contributions that improve the existing preparation loop, payload transparency, or reliability.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [ROADMAP.md](ROADMAP.md) for details.

## License

MIT
