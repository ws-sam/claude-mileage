import assert from 'assert';
import { buildPromptPayload } from '../dist/lib/prompt.js';

function testSectionOrderAndMetrics() {
  const payload = buildPromptPayload({
    brief: 'Brief body',
    history: ['History line 1', 'History line 2'],
    files: [
      { path: 'src/a.ts', content: 'const a = 1;' },
      { path: 'src/b.ts', content: 'const b = 2;' }
    ],
    diff: 'diff --git a/src/a.ts b/src/a.ts',
    userRequest: 'Tighten the loop.'
  });

  const briefIndex = payload.prompt.indexOf('# Project brief');
  const historyIndex = payload.prompt.indexOf('# Recent local context');
  const filesIndex = payload.prompt.indexOf('# File context');
  const diffIndex = payload.prompt.indexOf('# Current changes (git diff)');
  const requestIndex = payload.prompt.indexOf('# Request');

  assert.ok(briefIndex > -1, 'Project brief should be included');
  assert.ok(historyIndex > briefIndex, 'History should follow brief');
  assert.ok(filesIndex > historyIndex, 'Pinned files should follow history');
  assert.ok(diffIndex > filesIndex, 'Diff should follow pinned files');
  assert.ok(requestIndex > diffIndex, 'Request should remain last');

  assert.strictEqual(payload.metrics.brief.chars, 'Brief body'.length);
  assert.strictEqual(payload.metrics.history.chars, 'History line 1\nHistory line 2'.length);
  assert.ok(payload.metrics.pinnedFiles.chars > 0, 'Pinned file metrics should be populated');
  assert.strictEqual(payload.metrics.diff.chars, 'diff --git a/src/a.ts b/src/a.ts'.length);
  assert.strictEqual(payload.metrics.request.chars, 'Tighten the loop.'.length);
  assert.strictEqual(payload.metrics.totalChars, payload.prompt.length);
}

function testOmittedSectionsStayOmitted() {
  const payload = buildPromptPayload({
    brief: '   ',
    history: [],
    files: [],
    userRequest: 'Preview only.'
  });

  assert.ok(!payload.prompt.includes('# Project brief'), 'Empty brief should be omitted');
  assert.ok(!payload.prompt.includes('# Recent local context'), 'Empty history should be omitted');
  assert.ok(!payload.prompt.includes('# File context'), 'Empty pinned files should be omitted');
  assert.ok(!payload.prompt.includes('# Current changes (git diff)'), 'Empty diff should be omitted');
  assert.ok(payload.prompt.includes('# Request\nPreview only.'), 'Request should remain prominent');

  assert.strictEqual(payload.metrics.brief.included, false);
  assert.strictEqual(payload.metrics.history.included, false);
  assert.strictEqual(payload.metrics.pinnedFiles.included, false);
  assert.strictEqual(payload.metrics.diff.included, false);
  assert.strictEqual(payload.metrics.request.included, true);
}

function testWarningsAreDeterministic() {
  const payload = buildPromptPayload({
    brief: '# Project Brief\nUpdate this with your project overview.',
    history: ['Recent line'],
    files: [{ path: 'big.txt', content: 'x'.repeat(2500) }],
    diff: 'y'.repeat(1500),
    userRequest: 'Check warnings.'
  });

  assert.ok(payload.warnings.includes('Project brief missing or placeholder-like.'));
  assert.ok(payload.warnings.includes('Pinned files dominate payload.'));
  assert.ok(payload.warnings.includes('Diff included and large.'));
}

function run() {
  console.log('Running prompt payload tests...');
  testSectionOrderAndMetrics();
  console.log('✔ Section order and metrics passed');
  testOmittedSectionsStayOmitted();
  console.log('✔ Omitted section behavior passed');
  testWarningsAreDeterministic();
  console.log('✔ Warning behavior passed');
  console.log('\nAll prompt payload tests passed successfully.');
}

run();
