# Local Memory Model

A major source of workflow waste is the repeated re-explanation of project state. `claude-mileage` addresses this by moving working context from cloud thread history into small, explicit local files.

### The `.mileage/` Concept
Instead of relying on Claude to "remember" through a long chat history, we maintain a local directory that serves as the project's source of truth.

- **`brief.md`**: A concise overview of the project goals, tech stack, and progress.
- **`history.log`**: A compact, local log of every "Final Outcome" achieved in the session.
- **`context.json`**: A list of "pinned" files and their last-seen hashes for quick reference.

### Why Local Memory?
1. **Inspectable:** You can see exactly what Claude "knows" by reading a local file.
2. **Efficient:** We inject only the relevant snippets into the prompt, keeping the message size small.
3. **Independent Persistence:** Local memory persists independently of any single conversation thread.
4. **Sovereign:** Your project context stays in your environment, not just in a cloud log.

### Workflow Integration
After every successful interaction, the wrapper updates the local `history.log`. The next `ask` prepends the `brief.md` and relevant history entries, providing immediate orientation without the overhead of a large thread history.
