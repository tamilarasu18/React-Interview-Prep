import Link from 'next/link';
import questionsData from '../../../data/questions.json';
import { QuestionsData } from '@/types/question';
import { questionHasCategory } from '@/lib/categoryUtils';

const data = questionsData as QuestionsData;

export const metadata = {
  title: 'Cheat Sheet',
  description: `Every React interview question condensed to one line, grouped by topic. Print it and read it on the way to the interview.`,
  alternates: { canonical: '/cheatsheet/' },
};

export default function CheatSheetPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold mb-3">Cheat sheet</h1>
          <p className="text-lg text-primary-100 max-w-2xl mb-6">
            All {data.metadata.totalQuestions} questions condensed to their spoken answer and memory
            hook, grouped by topic. Designed to be printed.
          </p>
          <p className="text-sm text-primary-200">
            Tip: use your browser&apos;s print dialog (Ctrl/Cmd + P) — navigation and footer are
            stripped automatically.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Table of contents */}
        <div className="mb-10 rounded-lg bg-white p-6 shadow-md print-compact">
          <h2 className="text-lg font-bold text-gray-900 mb-3">Contents</h2>
          <div className="flex flex-wrap gap-2">
            {data.categories.map((c) => (
              <a
                key={c.slug}
                href={`#${c.slug}`}
                className="rounded-full bg-primary-100 px-3 py-1 text-sm font-medium text-primary-800 hover:bg-primary-200 transition-colors"
              >
                {c.name} ({c.count})
              </a>
            ))}
          </div>
        </div>

        {data.categories.map((category) => {
          const items = data.questions.filter((q) => questionHasCategory(q, category.slug));
          if (items.length === 0) return null;

          return (
            <section key={category.slug} id={category.slug} className="mb-12 scroll-mt-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">{category.name}</h2>
              <p className="text-sm text-gray-500 mb-5">{category.description}</p>

              <div className="space-y-3">
                {items.map((q) => (
                  <div
                    key={q.id}
                    className="print-compact rounded-lg bg-white p-5 shadow-sm border border-gray-100"
                  >
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-xs font-semibold text-gray-400 shrink-0">#{q.id}</span>
                      <h3 className="font-semibold text-gray-900">{q.question}</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed mb-2 pl-7">{q.shortAnswer}</p>
                    <p className="text-sm text-amber-900 pl-7">
                      <span aria-hidden="true">🧠 </span>
                      {q.memoryHook}
                    </p>
                    <Link
                      href={`/questions/${q.id}/`}
                      className="no-print mt-2 ml-7 inline-block text-xs font-medium text-primary-600 hover:text-primary-700"
                    >
                      Full explanation &rarr;
                    </Link>
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
