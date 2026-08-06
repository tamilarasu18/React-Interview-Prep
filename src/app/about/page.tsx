import Link from 'next/link';
import questionsData from '../../../data/questions.json';
import { QuestionsData } from '@/types/question';
import { siteConfig } from '@/config/site';

const data = questionsData as QuestionsData;

export const metadata = {
  title: 'About',
  description:
    'Why this collection exists, how each answer is structured, and how to use it to actually remember React concepts under interview pressure.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-primary-700 to-primary-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About this collection</h1>
          <p className="text-xl text-primary-100">{siteConfig.tagline}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">The problem this solves</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Most interview question lists are written to be <em>read</em>. You skim a 900-word essay
            on reconciliation, nod along, and three days later in the actual interview you produce
            nothing but &ldquo;uh, it&apos;s like a diffing thing?&rdquo;
          </p>
          <p className="text-gray-700 leading-relaxed">
            Recall under pressure is a different skill from comprehension. It needs short answers,
            distinct anchors, and repetition. Every question here is structured for that.
          </p>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Every question has three layers</h2>

          <div className="space-y-6">
            <div className="rounded-lg border-l-4 border-primary-500 bg-primary-50 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-primary-700 mb-2">
                1. Say this in the interview
              </div>
              <p className="text-gray-800">
                One or two sentences, roughly fifteen seconds of speech. Complete enough to be a real
                answer, short enough to survive a nervous brain. This is the part you memorize.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                2. Memory hook
              </div>
              <p className="text-gray-800">
                A mnemonic, a sharp contrast, or an image. Facts that resemble each other blur
                together — the hook is what keeps <code className="font-mono text-sm">useMemo</code>{' '}
                and <code className="font-mono text-sm">useCallback</code> from collapsing into the
                same fuzzy memory.
              </p>
            </div>

            <div className="rounded-lg border-l-4 border-gray-300 bg-gray-50 p-5">
              <div className="text-xs font-bold uppercase tracking-wider text-gray-600 mb-2">
                3. Full explanation
              </div>
              <p className="text-gray-800">
                Code, comparison tables, gotchas and the reasoning behind the short answer. Read this
                once so the short answer means something. Follow-up questions come from here.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">A study routine that works</h2>
          <ol className="list-decimal list-outside ml-6 space-y-3 text-gray-700">
            <li>
              <strong>Read a category end to end</strong> on the{' '}
              <Link href="/categories/" className="text-primary-600 hover:underline">
                categories page
              </Link>
              . Understand before you memorize — hooks anchored to nothing fall out.
            </li>
            <li>
              <strong>Drill it in{' '}
              <Link href="/flashcards/" className="text-primary-600 hover:underline">
                flashcard mode
              </Link>
              </strong>, filtered to that category. Say the answer out loud before flipping. Silent
              recall feels easier than it is and will fool you.
            </li>
            <li>
              <strong>Mark honestly.</strong> Press <kbd className="rounded border px-1">K</kbd> only
              if what you said matched. Otherwise <kbd className="rounded border px-1">A</kbd> and
              see it again.
            </li>
            <li>
              <strong>Re-drill the next day</strong> with &ldquo;hide cards I know&rdquo; off. The
              gap between sessions is what moves things into long-term memory.
            </li>
            <li>
              <strong>Skim the{' '}
              <Link href="/cheatsheet/" className="text-primary-600 hover:underline">
                cheat sheet
              </Link>
              </strong>{' '}
              on the morning of the interview. It prints to a few pages.
            </li>
          </ol>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What is covered</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {data.categories.map((c) => (
              <Link
                key={c.slug}
                href={`/category/${c.slug}/`}
                className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:border-primary-500 transition-colors"
              >
                <span className="font-medium text-gray-900">{c.name}</span>
                <span className="text-sm text-gray-500 tabular-nums">{c.count}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Contributing</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Questions live as JSON in <code className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded">data/questions/</code>,
            one file per topic. Add an object, run{' '}
            <code className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded">npm run validate</code>,
            open a pull request. No database, no CMS.
          </p>
          <p className="text-gray-700 leading-relaxed">
            If you hit a React question in a real interview that is not here, it is worth adding —
            those are the most valuable contributions.
          </p>
          {siteConfig.repoUrl && (
            <a
              href={siteConfig.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-lg bg-primary-600 px-6 py-3 font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              View the repository
            </a>
          )}
        </section>

        <section className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-500">
          <p>
            React is a trademark of Meta Platforms, Inc. This project is not affiliated with or
            endorsed by Meta. Question text and explanations are original; official documentation is
            linked where relevant.
          </p>
        </section>
      </div>
    </div>
  );
}
