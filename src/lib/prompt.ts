/**
 * Local prompt assembly and payload metrics.
 */

export interface PromptContext {
  brief: string;
  history: string[];
  files: { path: string; content: string }[];
  diff?: string;
  userRequest: string;
}

export interface PromptSectionMetric {
  label: string;
  chars: number;
  included: boolean;
}

export interface PromptPayload {
  prompt: string;
  metrics: {
    brief: PromptSectionMetric;
    history: PromptSectionMetric;
    pinnedFiles: PromptSectionMetric;
    diff: PromptSectionMetric;
    request: PromptSectionMetric;
    totalChars: number;
  };
  warnings: string[];
}

const PLACEHOLDER_BRIEF_MARKERS = [
  'update this with your project overview.',
  '# project brief'
];

function normalizeSection(value: string): string {
  return value.trim();
}

/**
 * Heuristic to detect if the brief is missing or still contains default placeholder text.
 */
function isPlaceholderLikeBrief(brief: string): boolean {
  const normalized = brief.trim().toLowerCase();

  if (!normalized) {
    return true;
  }

  return PLACEHOLDER_BRIEF_MARKERS.some(marker => normalized.includes(marker));
}

/**
 * Assembles the full prompt payload from local context and provides visibility into
 * the composition metrics.
 */
export function buildPromptPayload(ctx: PromptContext): PromptPayload {
  const brief = normalizeSection(ctx.brief);
  const history = normalizeSection(ctx.history.join('\n'));
  const fileBlocks = ctx.files
    .map(f => `## File: ${f.path}\n\`\`\`\n${f.content}\n\`\`\``)
    .join('\n\n');
  const pinnedFiles = normalizeSection(fileBlocks);
  const diff = normalizeSection(ctx.diff ?? '');
  const request = normalizeSection(ctx.userRequest);

  const orderedSections = [
    { heading: '# Project brief', content: brief },
    { heading: '# Recent local context', content: history },
    { heading: '# File context', content: pinnedFiles },
    { heading: '# Current changes (git diff)', content: diff },
    { heading: '# Request', content: request }
  ];

  const prompt = orderedSections
    .filter(section => section.content.length > 0)
    .map(section => `${section.heading}\n${section.content}`)
    .join('\n\n')
    .trim();

  const metrics = {
    brief: { label: 'Project brief', chars: brief.length, included: brief.length > 0 },
    history: { label: 'Recent history', chars: history.length, included: history.length > 0 },
    pinnedFiles: { label: 'Pinned files', chars: pinnedFiles.length, included: pinnedFiles.length > 0 },
    diff: { label: 'Diff', chars: diff.length, included: diff.length > 0 },
    request: { label: 'Request', chars: request.length, included: request.length > 0 },
    totalChars: prompt.length
  };

  const nonFileChars = metrics.brief.chars + metrics.history.chars + metrics.diff.chars + metrics.request.chars;
  const warnings: string[] = [];

  if (!metrics.pinnedFiles.included) {
    warnings.push('No pinned files.');
  }

  if (isPlaceholderLikeBrief(brief)) {
    warnings.push('Project brief missing or placeholder-like.');
  }

  if (metrics.pinnedFiles.included && metrics.pinnedFiles.chars > nonFileChars) {
    warnings.push('Pinned files dominate payload.');
  }

  if (metrics.diff.included && metrics.diff.chars >= 1500) {
    warnings.push('Diff included and large.');
  }

  return { prompt, metrics, warnings };
}

/**
 * Legacy wrapper for simple string-only assembly.
 */
export function composePrompt(ctx: PromptContext): string {
  return buildPromptPayload(ctx).prompt;
}
