'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Question } from '@/types/question';
import { categoryToSlug } from '@/lib/categoryUtils';

interface QuestionCardProps {
  question: Question;
  /** Start with the short answer revealed instead of hidden. */
  defaultRevealed?: boolean;
}

const difficultyColors: Record<Question['difficulty'], string> = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800',
};

export default function QuestionCard({ question, defaultRevealed = false }: QuestionCardProps) {
  const [revealed, setRevealed] = useState(defaultRevealed);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="text-sm font-semibold text-gray-500">#{question.id}</span>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            difficultyColors[question.difficulty]
          }`}
        >
          {question.difficulty}
        </span>
        {question.categories.slice(0, 3).map((category) => (
          <Link
            key={category}
            href={`/category/${categoryToSlug(category)}/`}
            className="px-2 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors"
          >
            {category}
          </Link>
        ))}
        {question.categories.length > 3 && (
          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600">
            +{question.categories.length - 3} more
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-3">{question.question}</h3>

      {/* Recall-first: try to answer before revealing. */}
      {revealed ? (
        <div className="animate-flip-in space-y-3">
          <div className="rounded-lg bg-primary-50 border-l-4 border-primary-500 p-4">
            <p className="text-gray-900 leading-relaxed">{question.shortAnswer}</p>
          </div>
          <p className="text-sm text-amber-900 bg-amber-50 border-l-4 border-amber-400 rounded-lg p-3">
            <span aria-hidden="true">🧠 </span>
            {question.memoryHook}
          </p>
        </div>
      ) : (
        <button
          onClick={() => setRevealed(true)}
          className="w-full rounded-lg border-2 border-dashed border-gray-300 py-3 text-sm font-medium text-gray-500 hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50 transition-colors"
        >
          Answer it in your head, then tap to check &darr;
        </button>
      )}

      {question.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {question.tags.slice(0, 5).map((tag) => (
            <span key={tag} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-4">
        <Link
          href={`/questions/${question.id}/`}
          className="text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          Full explanation &rarr;
        </Link>

        {revealed && !defaultRevealed && (
          <button
            onClick={() => setRevealed(false)}
            className="text-sm text-gray-400 hover:text-gray-600"
          >
            Hide
          </button>
        )}

        {question.hasCode && (
          <span className="text-xs text-gray-500 flex items-center gap-1 ml-auto">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            Code
          </span>
        )}
      </div>
    </div>
  );
}
