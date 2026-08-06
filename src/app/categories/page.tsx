import Link from 'next/link';
import questionsData from '../../../data/questions.json';
import { QuestionsData } from '@/types/question';

const data = questionsData as QuestionsData;

export const metadata = {
  title: 'All Categories',
  description: `Browse ${data.categories.length} categories of React interview questions covering hooks, rendering, performance, state management, Server Components and more.`,
  alternates: { canonical: '/categories/' },
};

export default function CategoriesPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Browse by category</h1>
          <p className="text-xl text-primary-100">
            {data.categories.length} topics covering {data.metadata.totalQuestions} questions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}/`}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow border-t-4 border-primary-500 flex flex-col"
            >
              <div className="flex justify-between items-start gap-2 mb-3">
                <h2 className="text-xl font-bold text-gray-900">{category.name}</h2>
                <span className="bg-primary-100 text-primary-800 text-sm font-semibold px-3 py-1 rounded-full shrink-0">
                  {category.count}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 flex-1">{category.description}</p>
              <div className="flex items-center text-primary-600 font-medium text-sm">
                Explore questions
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Collection at a glance</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {data.metadata.totalQuestions}
              </div>
              <div className="text-gray-600">Total questions</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {data.categories.length}
              </div>
              <div className="text-gray-600">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {data.metadata.totalQuestions}
              </div>
              <div className="text-gray-600">Memory hooks</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
