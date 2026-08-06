import { Question } from '@/types/question';

/**
 * Converts a category name to a URL-friendly slug.
 * Kept in sync with the same helper in scripts/build-questions.js.
 */
export function categoryToSlug(categoryName: string): string {
  return categoryName
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[/.]/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Recalculates category counts from an array of questions.
 * A question can belong to several categories, so the sum of all counts
 * is usually greater than the total number of questions.
 */
export function recalculateCategoryCounts(questions: Question[]): Map<string, number> {
  const categoryMap = new Map<string, number>();

  questions.forEach((question) => {
    question.categories.forEach((category) => {
      categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
    });
  });

  return categoryMap;
}

/** Checks if a question belongs to a specific category slug. */
export function questionHasCategory(question: Question, categorySlug: string): boolean {
  return question.categories.some((cat) => categoryToSlug(cat) === categorySlug);
}

/** The first category, used for breadcrumbs and other single-category contexts. */
export function getPrimaryCategory(question: Question): string {
  return question.categories[0] || '';
}
