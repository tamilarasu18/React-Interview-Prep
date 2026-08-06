import questionsData from '../../data/questions.json';
import { QuestionsData, Question, Category } from '@/types/question';
import { questionHasCategory } from './categoryUtils';

const data = questionsData as QuestionsData;

export function getAllQuestions(): Question[] {
  return data.questions;
}

export function getQuestionById(id: number): Question | undefined {
  return data.questions.find((q) => q.id === id);
}

export function getQuestionsByCategory(categorySlug: string): Question[] {
  return data.questions.filter((q) => questionHasCategory(q, categorySlug));
}

export function getAllCategories(): Category[] {
  return data.categories;
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return data.categories.find((c) => c.slug === slug);
}

export function searchQuestions(query: string): Question[] {
  const lowerQuery = query.toLowerCase();
  return data.questions.filter(
    (q) =>
      q.question.toLowerCase().includes(lowerQuery) ||
      q.shortAnswer.toLowerCase().includes(lowerQuery) ||
      q.memoryHook.toLowerCase().includes(lowerQuery) ||
      q.categories.some((cat) => cat.toLowerCase().includes(lowerQuery)) ||
      q.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      q.answer.toLowerCase().includes(lowerQuery)
  );
}

export function getMetadata() {
  return data.metadata;
}

export function getResources() {
  return data.resources;
}
