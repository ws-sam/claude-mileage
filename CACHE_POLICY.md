# Cache Policy

`claude-mileage` caches for efficiency, not just speed.

### 1. Summary Caching
When a large file is processed via `compact`, the summary is cached locally. If the file hash hasn't changed, the summary is reused in future prompts.

### 2. Schema/Interface Caching
For large codebases, we cache the "Interface Map" (list of functions and signatures). Claude usually only needs to know *that* a function exists and what it takes, not how it's implemented.

### 3. Reusable Local Instructions
Commonly used instructions (e.g., "Format as a React component using Tailwind") are stored locally and injected via shortcodes to save the user from re-typing (and bloating) the prompt.
