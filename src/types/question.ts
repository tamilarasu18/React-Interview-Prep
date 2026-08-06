export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: number;
  /** The interview question, phrased the way it actually gets asked. */
  question: string;
  /**
   * The ~15 second spoken answer. This is what you memorize and say out loud.
   * Plain text, 1-3 sentences, no markdown blocks.
   */
  shortAnswer: string;
  /**
   * A mnemonic, contrast, or one-line anchor that makes the answer stick.
   * Kept deliberately short so it fits on a flashcard.
   */
  memoryHook: string;
  /** Full markdown explanation with code, tables and caveats. */
  answer: string;
  categories: string[];
  difficulty: Difficulty;
  tags: string[];
  hasCode: boolean;
  hasLinks: boolean;
  resources: (string | { title: string; url: string })[];
}

export interface Category {
  name: string;
  count: number;
  slug: string;
  description: string;
}

export interface Resource {
  title: string;
  url: string;
  description: string;
}

export interface QuestionsData {
  questions: Question[];
  categories: Category[];
  resources: Resource[];
  metadata: {
    totalQuestions: number;
    totalCategories: number;
    lastUpdated: string;
    version: string;
  };
}
