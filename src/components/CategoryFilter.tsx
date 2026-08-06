'use client';

import { Category } from '@/types/question';

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  totalQuestions: number;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  totalQuestions,
}: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Filter by category</h3>

      <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-220px)] pr-1">
        <button
          onClick={() => onSelectCategory('all')}
          className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
            selectedCategory === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="font-medium">All questions</span>
          <span className="float-right text-sm tabular-nums">{totalQuestions}</span>
        </button>

        {categories.map((category) => (
          <button
            key={category.slug}
            onClick={() => onSelectCategory(category.slug)}
            className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
              selectedCategory === category.slug
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span className="font-medium">{category.name}</span>
            <span className="float-right text-sm tabular-nums">{category.count}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
