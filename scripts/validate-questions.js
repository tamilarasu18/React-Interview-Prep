#!/usr/bin/env node

/**
 * Validates the compiled data/questions.json.
 * Run: node scripts/validate-questions.js   (or `npm run validate`)
 * Used in CI to catch broken question submissions.
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'data', 'questions.json');

let data;
try {
  data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
} catch (err) {
  console.error('FAIL: data/questions.json is missing or not valid JSON.');
  console.error('      Run `npm run build-questions` first.');
  console.error(`      ${err.message}`);
  process.exit(1);
}

const errors = [];
const warnings = [];

if (!Array.isArray(data.questions)) errors.push('Missing or invalid "questions" array');
if (!Array.isArray(data.categories)) errors.push('Missing or invalid "categories" array');
if (!data.metadata || typeof data.metadata !== 'object') errors.push('Missing "metadata" object');

if (errors.length > 0) {
  errors.forEach((e) => console.error(`FAIL: ${e}`));
  process.exit(1);
}

const VALID_DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const SHORT_ANSWER_MAX = 400;
const MEMORY_HOOK_MAX = 180;
const categoryNames = new Set(data.categories.map((c) => c.name));
const ids = new Set();

data.questions.forEach((q, index) => {
  const prefix = `Question index ${index} (id: ${q.id})`;

  if (typeof q.id !== 'number') {
    errors.push(`${prefix}: "id" must be a number`);
  }
  if (ids.has(q.id)) {
    errors.push(`${prefix}: duplicate id ${q.id}`);
  }
  ids.add(q.id);

  if (!q.question || typeof q.question !== 'string') {
    errors.push(`${prefix}: missing "question"`);
  }

  // The memorization layer is the point of this project — both fields required.
  if (!q.shortAnswer || typeof q.shortAnswer !== 'string') {
    errors.push(`${prefix}: missing "shortAnswer"`);
  } else if (q.shortAnswer.length > SHORT_ANSWER_MAX) {
    errors.push(
      `${prefix}: "shortAnswer" is ${q.shortAnswer.length} chars (max ${SHORT_ANSWER_MAX}) — it must stay speakable`
    );
  } else if (q.shortAnswer.includes('```')) {
    errors.push(`${prefix}: "shortAnswer" must be plain prose, no code fences`);
  }

  if (!q.memoryHook || typeof q.memoryHook !== 'string') {
    errors.push(`${prefix}: missing "memoryHook"`);
  } else if (q.memoryHook.length > MEMORY_HOOK_MAX) {
    errors.push(
      `${prefix}: "memoryHook" is ${q.memoryHook.length} chars (max ${MEMORY_HOOK_MAX}) — hooks must fit on a card`
    );
  }

  if (!q.answer || typeof q.answer !== 'string') {
    errors.push(`${prefix}: missing "answer"`);
  } else {
    const fenceCount = (q.answer.match(/```/g) || []).length;
    if (fenceCount % 2 !== 0) {
      errors.push(`${prefix}: unclosed code fence (odd number of \`\`\` markers)`);
    }
    // Walk the lines tracking fence state. Both checks below must ignore
    // anything inside a code block: a naive regex would flag every closing
    // fence as "unlabelled", and would read a shell `# comment` as an H1.
    let inFence = false;
    let unlabelled = 0;
    let usesH1 = false;
    for (const line of q.answer.split('\n')) {
      if (line.startsWith('```')) {
        if (!inFence && line.trim() === '```') unlabelled++;
        inFence = !inFence;
        continue;
      }
      if (!inFence && line.startsWith('# ')) usesH1 = true;
    }
    if (usesH1) {
      warnings.push(`${prefix}: uses H1 in the answer — start at "##"`);
    }
    if (unlabelled > 0) {
      warnings.push(`${prefix}: ${unlabelled} code block(s) without a language label`);
    }
  }

  if (!Array.isArray(q.categories) || q.categories.length === 0) {
    errors.push(`${prefix}: missing or empty "categories" array`);
  } else {
    q.categories.forEach((c) => {
      if (!categoryNames.has(c)) {
        errors.push(`${prefix}: unknown category "${c}"`);
      }
    });
  }

  if (!VALID_DIFFICULTIES.includes(q.difficulty)) {
    errors.push(`${prefix}: invalid difficulty "${q.difficulty}" (Easy, Medium or Hard)`);
  }
  if (!Array.isArray(q.tags)) {
    errors.push(`${prefix}: missing "tags" array`);
  }
  if (!Array.isArray(q.resources)) {
    errors.push(`${prefix}: missing "resources" array`);
  }

  // hasCode / hasLinks must describe the answer, since the UI renders badges from them.
  const answerHasCode = typeof q.answer === 'string' && q.answer.includes('```');
  if (q.hasCode !== answerHasCode) {
    warnings.push(`${prefix}: "hasCode" is ${q.hasCode} but answer ${answerHasCode ? 'does' : 'does not'} contain code`);
  }
});

if (data.metadata.totalQuestions !== data.questions.length) {
  errors.push(
    `metadata.totalQuestions (${data.metadata.totalQuestions}) does not match questions length (${data.questions.length})`
  );
}

if (warnings.length > 0) {
  console.warn(`\n${warnings.length} warning(s):\n`);
  warnings.forEach((w) => console.warn(`  WARNING: ${w}`));
}

if (errors.length > 0) {
  console.error(`\nValidation FAILED with ${errors.length} error(s):\n`);
  errors.forEach((e) => console.error(`  ERROR: ${e}`));
  process.exit(1);
}

console.log(
  `\nValidation PASSED: ${data.questions.length} questions, ${data.categories.length} categories.`
);
