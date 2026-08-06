#!/usr/bin/env node

/**
 * Compiles data/questions/*.json into a single data/questions.json bundle.
 *
 * Splitting questions into one file per topic keeps pull requests small and
 * makes merge conflicts rare. The app only ever imports the compiled bundle.
 *
 * Run: node scripts/build-questions.js   (also runs automatically on dev/build)
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PARTS_DIR = path.join(ROOT, 'data', 'questions');
const CATEGORIES_FILE = path.join(ROOT, 'data', 'categories.json');
const META_FILE = path.join(ROOT, 'data', 'meta.json');
const OUT_FILE = path.join(ROOT, 'data', 'questions.json');

function categoryToSlug(name) {
  return name
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[/.]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
  } catch (err) {
    console.error(`FAIL: could not read ${path.relative(ROOT, file)}`);
    console.error(`      ${err.message}`);
    process.exit(1);
  }
}

const partFiles = fs
  .readdirSync(PARTS_DIR)
  .filter((f) => f.endsWith('.json'))
  .sort();

if (partFiles.length === 0) {
  console.error(`FAIL: no question files found in ${path.relative(ROOT, PARTS_DIR)}`);
  process.exit(1);
}

const questions = [];
const seenIds = new Map();

for (const file of partFiles) {
  const parsed = readJson(path.join(PARTS_DIR, file));
  const items = Array.isArray(parsed) ? parsed : parsed.questions;

  if (!Array.isArray(items)) {
    console.error(`FAIL: ${file} must be an array, or an object with a "questions" array`);
    process.exit(1);
  }

  for (const q of items) {
    if (seenIds.has(q.id)) {
      console.error(`FAIL: duplicate question id ${q.id} in ${file} (first seen in ${seenIds.get(q.id)})`);
      process.exit(1);
    }
    seenIds.set(q.id, file);
    questions.push(q);
  }
}

questions.sort((a, b) => a.id - b.id);

// Categories: counts are always derived, never hand-maintained.
const declaredCategories = readJson(CATEGORIES_FILE);
const counts = new Map();
for (const q of questions) {
  for (const name of q.categories || []) {
    counts.set(name, (counts.get(name) || 0) + 1);
  }
}

const declaredNames = new Set(declaredCategories.map((c) => c.name));
const unknown = [...counts.keys()].filter((name) => !declaredNames.has(name));
if (unknown.length > 0) {
  console.error(`FAIL: questions reference categories missing from data/categories.json:`);
  unknown.forEach((name) => console.error(`      - "${name}"`));
  process.exit(1);
}

const categories = declaredCategories
  .map((c) => ({
    name: c.name,
    slug: c.slug || categoryToSlug(c.name),
    description: c.description,
    count: counts.get(c.name) || 0,
  }))
  .filter((c) => c.count > 0)
  .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

const meta = readJson(META_FILE);

const bundle = {
  questions,
  categories,
  resources: meta.resources || [],
  metadata: {
    totalQuestions: questions.length,
    totalCategories: categories.length,
    lastUpdated: meta.lastUpdated,
    version: meta.version,
  },
};

fs.writeFileSync(OUT_FILE, JSON.stringify(bundle, null, 2) + '\n', 'utf-8');

console.log(
  `Built data/questions.json — ${questions.length} questions, ${categories.length} categories, ${partFiles.length} source files.`
);
