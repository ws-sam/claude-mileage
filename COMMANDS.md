# Command Reference (Conceptual)

### `ask`
**Purpose:** The primary interaction.  
**How it reduces waste:** Injects local `.mileage/` memory and prunes context automatically.  
**Note:** Warns when a request includes more context than is likely necessary, and may require explicit confirmation.

### `diff`
**Purpose:** Focused coding.  
**How it reduces waste:** Requests that Claude only returns a `patch` or `diff` format. This drastically reduces output tokens and makes application safer.

### `plan`
**Purpose:** Strategy before execution.  
**How it reduces waste:** Uses a low-token "planning mode" to outline steps. Prevents the "coding-by-accident" loop that burns through message limits.

### `compact`
**Purpose:** Manual context Pruning.  
**How it reduces waste:** Takes a file or folder and creates a `.summary` version for Claude to read instead of the raw source.

### `context`
**Purpose:** Context management.  
**How it reduces waste:** Lets you "pin" or "unpin" files from the local session so you aren't sending them every time.

### `memory`
**Purpose:** Local state management.  
**How it reduces waste:** View or edit the local "Project Brief" that Claude uses to stay oriented without a long thread history.

### `budget`
**Purpose:** Awareness.  
**How it reduces waste:** Tracks estimated usage (based on local logs) to help you pace yourself throughout the day.
