'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import QuestionCard from '@/components/QuestionCard';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import questionsData from '../../data/questions.json';
import { QuestionsData } from '@/types/question';
import { questionHasCategory } from '@/lib/categoryUtils';
import { siteConfig } from '@/config/site';

const data = questionsData as QuestionsData;
const QUESTIONS_PER_PAGE = 20;

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredQuestions = useMemo(() => {
    let filtered = data.questions;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((q) => questionHasCategory(q, selectedCategory));
    }

    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      const numericQuery = parseInt(searchQuery, 10);
      filtered = filtered.filter(
        (q) =>
          (!isNaN(numericQuery) && q.id === numericQuery) ||
          q.question.toLowerCase().includes(lowerQuery) ||
          q.shortAnswer.toLowerCase().includes(lowerQuery) ||
          q.memoryHook.toLowerCase().includes(lowerQuery) ||
          q.categories.some((cat) => cat.toLowerCase().includes(lowerQuery)) ||
          q.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory]);

  const totalPages = Math.ceil(filteredQuestions.length / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const paginatedQuestions = filteredQuestions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteConfig.url}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const renderPagination = (position: 'top' | 'bottom') => {
    if (totalPages <= 1) return null;
    return (
      <div className={position === 'top' ? 'mb-6' : 'mt-8'}>
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <p className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </p>
          <nav className="inline-flex rounded-md shadow-sm -space-x-px">
            <button
              onClick={() => {
                setCurrentPage((p) => Math.max(1, p - 1));
                scrollToTop();
              }}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number;
              if (totalPages <= 5) pageNum = i + 1;
              else if (currentPage <= 3) pageNum = i + 1;
              else if (currentPage >= totalPages - 2) pageNum = totalPages - 4 + i;
              else pageNum = currentPage - 2 + i;

              return (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    scrollToTop();
                  }}
                  className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                    currentPage === pageNum
                      ? 'z-10 bg-primary-600 border-primary-600 text-white'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => {
                setCurrentPage((p) => Math.min(totalPages, p + 1));
                scrollToTop();
              }}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Hero */}
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">React Interview Questions</h1>
          <p className="text-xl md:text-2xl text-primary-100 mb-4">
            {data.metadata.totalQuestions} questions. Every one has a one-line answer you can
            actually remember.
          </p>
          <p className="text-lg text-primary-200 max-w-3xl mb-8">
            Hooks, rendering, reconciliation, performance, state management, Server Components and
            more — each answer comes with a spoken version, a memory hook, and the full explanation
            behind it.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/flashcards/"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-semibold text-primary-800 hover:bg-primary-50 transition-colors shadow-lg"
            >
              Drill with flashcards
            </Link>
            <Link
              href="/cheatsheet/"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-white/60 px-6 py-3 font-semibold text-white hover:bg-white/10 transition-colors"
            >
              One-page cheat sheet
            </Link>
          </div>
        </div>
      </div>

      {/* How to use */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="font-semibold text-gray-900 mb-1">1. Read the short answer</div>
              <p className="text-gray-600">
                Two sentences you can say out loud. That is the interview answer.
              </p>
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-1">2. Anchor it with the hook</div>
              <p className="text-gray-600">
                A contrast or mnemonic so recall survives the pressure of the room.
              </p>
            </div>
            <div>
              <div className="font-semibold text-gray-900 mb-1">3. Drill until automatic</div>
              <p className="text-gray-600">
                Flashcard mode shuffles and tracks what you already know.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <CategoryFilter
                categories={data.categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                totalQuestions={data.metadata.totalQuestions}
              />
            </div>
          </aside>

          <div className="lg:col-span-3">
            <div className="mb-6">
              <SearchBar
                onSearch={setSearchQuery}
                placeholder="Search by keyword, tag, category, or question number..."
              />
            </div>

            <div className="mb-6">
              <p className="text-gray-600">
                Showing {filteredQuestions.length} question
                {filteredQuestions.length !== 1 ? 's' : ''}
                {searchQuery && ` for "${searchQuery}"`}
              </p>
            </div>

            {renderPagination('top')}

            {paginatedQuestions.length > 0 ? (
              <div className="space-y-4">
                {paginatedQuestions.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No questions found</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}

            {renderPagination('bottom')}
          </div>
        </div>
      </div>
    </div>
  );
}
