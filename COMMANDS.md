# Command Reference

`claude-mileage` provides a minimal set of commands for context-focused workflows.

### init
Initializes the `.mileage/` directory in the current workspace. This directory stores the local memory and configuration used to ground requests.

### ask <request>
Prepare and send a request to the Claude CLI. This command automatically includes the local project brief and relevant history to provide orientation without broad, unfocused context.

### diff <request>
Similar to `ask`, but prioritizes the current `git diff` (staged or HEAD) as primary context. Ideal for reviewing or iterating on recent code changes.

### context [pin|unpin] [path]
Manage which files are pinned in your local memory. Pinned files are included in every request until unpinned. Running the command without arguments provides a summary of pinned files and a dry-run preview of the next payload.

### memory
Directly inspect the local project state, including the `brief.md` project overview and `history.log` request record.
