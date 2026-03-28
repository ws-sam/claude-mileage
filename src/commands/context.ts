import chalk from 'chalk';
import { 
  getContextData, 
  saveContextData, 
  readBrief, 
  readRecentHistory, 
  getFileContent 
} from '../lib/workspace.js';
import { buildPromptPayload, type PromptSectionMetric } from '../lib/prompt.js';

function formatMetric(metric: PromptSectionMetric): string {
  return metric.included ? `${metric.chars}` : 'omitted';
}

export function contextCommand(action?: string, filePath?: string) {
  const data = getContextData();

  if (action === 'pin' && filePath) {
    const existing = data.files.find(f => f.path === filePath);
    if (!existing) {
      data.files.push({ path: filePath, pinned: true, lastIncludedAt: new Date().toISOString() });
      saveContextData(data);
      console.log(chalk.green(`✔ Pinned ${filePath}`));
    }
    return;
  }

  if (action === 'unpin' && filePath) {
    data.files = data.files.filter(f => f.path !== filePath);
    saveContextData(data);
    console.log(chalk.yellow(`✔ Unpinned ${filePath}`));
    return;
  }

  // Default: Statistics and Preview
  console.log(chalk.bold('\n--- Pinned Files ---'));
  data.files.filter(f => f.pinned).forEach(f => {
    console.log(`${chalk.green('✔')} ${f.path} ${chalk.dim(`(Last: ${f.lastIncludedAt?.slice(0,10) || 'never'})`)}`);
  });
  
  if (data.files.filter(f => f.pinned).length === 0) {
    console.log(chalk.dim('No files pinned. Use: context pin <path>'));
  }

  const brief = readBrief();
  const history = readRecentHistory();
  const files = data.files.filter(f => f.pinned).map(f => ({ path: f.path, content: getFileContent(f.path) }));
  const payload = buildPromptPayload({ brief, history, files, userRequest: 'DRY_RUN_PREVIEW' });

  console.log(chalk.bold('\n--- Metrics ---'));
  console.log(`Project Brief Chars: ${formatMetric(payload.metrics.brief)}`);
  console.log(`History Chars: ${formatMetric(payload.metrics.history)}`);
  console.log(`Pinned File Chars: ${formatMetric(payload.metrics.pinnedFiles)}`);
  console.log(`Diff Chars: ${formatMetric(payload.metrics.diff)}`);
  console.log(`Request Chars: ${formatMetric(payload.metrics.request)}`);
  console.log(`Total Payload Chars: ${payload.metrics.totalChars}`);

  console.log(chalk.bold('\n--- Warnings ---'));
  if (payload.warnings.length === 0) {
    console.log(chalk.dim('None'));
  } else {
    payload.warnings.forEach(warning => console.log(chalk.yellow(`! ${warning}`)));
  }

  console.log(chalk.bold('\n--- Dry-Run Preview ---'));
  console.log(chalk.dim(payload.prompt.slice(0, 500) + '\n... [TRUNCATED]'));
}
