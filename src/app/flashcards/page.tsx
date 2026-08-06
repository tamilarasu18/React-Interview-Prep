import FlashcardDeck from '@/components/FlashcardDeck';
import questionsData from '../../../data/questions.json';
import { QuestionsData } from '@/types/question';

const data = questionsData as QuestionsData;

export const metadata = {
  title: 'Flashcards',
  description: `Drill all ${data.metadata.totalQuestions} React interview questions in flashcard mode. Shuffle, filter by topic and difficulty, and track what you already know.`,
  alternates: { canonical: '/flashcards/' },
};

export default function FlashcardsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-3">Flashcards</h1>
          <p className="text-lg text-primary-100 max-w-2xl">
            Answer out loud before you flip. Marking a card as known hides it from future rounds,
            and your progress is stored in this browser only.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <FlashcardDeck questions={data.questions} categories={data.categories} />
      </div>
    </div>
  );
}
