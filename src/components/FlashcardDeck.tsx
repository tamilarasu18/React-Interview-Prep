'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Category, Difficulty, Question } from '@/types/question';
import { questionHasCategory } from '@/lib/categoryUtils';

interface FlashcardDeckProps {
  questions: Question[];
  categories: Category[];
}

type Known = Record<number, boolean>;

const STORAGE_KEY = 'rip:known-cards:v1';
const DIFFICULTIES: Difficulty[] = ['Easy', 'Medium', 'Hard'];

const difficultyColors: Record<Difficulty, string> = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800',
};

/** Fisher-Yates, returns a new array. */
function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export default function FlashcardDeck({ questions, categories }: FlashcardDeckProps) {
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState<'all' | Difficulty>('all');
  const [hideKnown, setHideKnown] = useState(false);
  const [known, setKnown] = useState<Known>({});
  const [order, setOrder] = useState<number[]>([]);
  const [position, setPosition] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore progress. Runs once, client-side only, so static export is safe.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setKnown(JSON.parse(raw) as Known);
    } catch {
      // Corrupt or unavailable storage — start fresh rather than crash.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(known));
    } catch {
      // Private mode / quota — progress just won't persist.
    }
  }, [known, hydrated]);

  const pool = useMemo(() => {
    return questions.filter((q) => {
      if (category !== 'all' && !questionHasCategory(q, category)) return false;
      if (difficulty !== 'all' && q.difficulty !== difficulty) return false;
      if (hideKnown && known[q.id]) return false;
      return true;
    });
  }, [questions, category, difficulty, hideKnown, known]);

  const byId = useMemo(() => new Map(questions.map((q) => [q.id, q])), [questions]);

  // Reshuffle whenever the pool identity changes.
  const poolKey = useMemo(() => pool.map((q) => q.id).join(','), [pool]);
  useEffect(() => {
    setOrder(shuffle(pool.map((q) => q.id)));
    setPosition(0);
    setFlipped(false);
    // poolKey is the intentional dependency — it changes only when the set of
    // cards changes, not on every re-render of the same set.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [poolKey]);

  const total = order.length;
  const current = total > 0 ? byId.get(order[position]) : undefined;

  const goNext = useCallback(() => {
    setFlipped(false);
    setPosition((p) => (total === 0 ? 0 : (p + 1) % total));
  }, [total]);

  const goPrev = useCallback(() => {
    setFlipped(false);
    setPosition((p) => (total === 0 ? 0 : (p - 1 + total) % total));
  }, [total]);

  const markKnown = useCallback(
    (value: boolean) => {
      if (!current) return;
      setKnown((prev) => ({ ...prev, [current.id]: value }));
      goNext();
    },
    [current, goNext]
  );

  const reshuffle = useCallback(() => {
    setOrder((prev) => shuffle(prev));
    setPosition(0);
    setFlipped(false);
  }, []);

  // Keyboard shortcuts. Ignored while the user is typing in a control.
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      switch (e.key) {
        case ' ':
          e.preventDefault();
          setFlipped((f) => !f);
          break;
        case 'ArrowRight':
          goNext();
          break;
        case 'ArrowLeft':
          goPrev();
          break;
        case 'k':
        case 'K':
          markKnown(true);
          break;
        case 'a':
        case 'A':
          markKnown(false);
          break;
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [goNext, goPrev, markKnown]);

  const knownCount = useMemo(
    () => questions.filter((q) => known[q.id]).length,
    [questions, known]
  );

  return (
    <div>
      {/* Controls */}
      <div className="bg-white rounded-lg shadow-md p-5 mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Category</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-600"
            >
              <option value="all">All categories</option>
              {categories.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name} ({c.count})
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1">Difficulty</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as 'all' | Difficulty)}
              className="w-full rounded-lg border-2 border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-600"
            >
              <option value="all">All difficulties</option>
              {DIFFICULTIES.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </label>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={hideKnown}
                onChange={(e) => setHideKnown(e.target.checked)}
                className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Hide cards I know ({knownCount})
              </span>
            </label>
          </div>

          <div className="flex items-end gap-2">
            <button
              onClick={reshuffle}
              className="flex-1 rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-700 transition-colors"
            >
              Shuffle
            </button>
            <button
              onClick={() => setKnown({})}
              className="rounded-lg border-2 border-gray-300 px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              title="Clear saved progress"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {total === 0 || !current ? (
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <p className="text-lg font-medium text-gray-900 mb-2">No cards in this deck</p>
          <p className="text-gray-500">
            {hideKnown
              ? 'You have marked every matching card as known. Uncheck "Hide cards I know" to review them again.'
              : 'Try a different category or difficulty.'}
          </p>
        </div>
      ) : (
        <>
          {/* Progress */}
          <div className="mb-3 flex items-center justify-between text-sm text-gray-600">
            <span className="tabular-nums">
              Card {position + 1} of {total}
            </span>
            <span>{known[current.id] ? '✅ Marked known' : 'Not yet marked'}</span>
          </div>
          <div className="mb-6 h-2 w-full rounded-full bg-gray-200 overflow-hidden">
            <div
              className="h-full bg-primary-500 transition-all duration-300"
              style={{ width: `${((position + 1) / total) * 100}%` }}
            />
          </div>

          {/* Card */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setFlipped((f) => !f)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') setFlipped((f) => !f);
            }}
            className="min-h-[320px] cursor-pointer rounded-xl bg-white p-8 shadow-lg hover:shadow-xl transition-shadow flex flex-col"
          >
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-sm font-semibold text-gray-400">#{current.id}</span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  difficultyColors[current.difficulty]
                }`}
              >
                {current.difficulty}
              </span>
              {current.categories.slice(0, 2).map((c) => (
                <span
                  key={c}
                  className="px-2 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800"
                >
                  {c}
                </span>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              {current.question}
            </h2>

            {flipped ? (
              <div className="animate-flip-in space-y-4 flex-1">
                <div className="rounded-lg border-l-4 border-primary-500 bg-primary-50 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-primary-700 mb-1">
                    Say this
                  </div>
                  <p className="text-lg text-gray-900 leading-relaxed">{current.shortAnswer}</p>
                </div>
                <div className="rounded-lg border-l-4 border-amber-400 bg-amber-50 p-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1">
                    Memory hook
                  </div>
                  <p className="font-medium text-amber-900">{current.memoryHook}</p>
                </div>
                <Link
                  href={`/questions/${current.id}/`}
                  onClick={(e) => e.stopPropagation()}
                  className="inline-block text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Full explanation &rarr;
                </Link>
              </div>
            ) : (
              <div className="flex flex-1 items-center justify-center">
                <p className="text-gray-400">
                  Answer out loud, then click the card or press{' '}
                  <kbd className="rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-xs text-gray-700">
                    Space
                  </kbd>
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={goPrev}
              className="rounded-lg border-2 border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              &larr; Prev
            </button>
            <button
              onClick={() => markKnown(false)}
              className="rounded-lg bg-red-100 px-5 py-2.5 font-semibold text-red-800 hover:bg-red-200 transition-colors"
            >
              Again (A)
            </button>
            <button
              onClick={() => markKnown(true)}
              className="rounded-lg bg-green-100 px-5 py-2.5 font-semibold text-green-800 hover:bg-green-200 transition-colors"
            >
              I knew it (K)
            </button>
            <button
              onClick={goNext}
              className="rounded-lg border-2 border-gray-300 bg-white px-5 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Next &rarr;
            </button>
          </div>

          <p className="mt-4 text-center text-sm text-gray-500">
            Shortcuts: <strong>Space</strong> flip · <strong>&larr; &rarr;</strong> navigate ·{' '}
            <strong>K</strong> known · <strong>A</strong> again
          </p>
        </>
      )}
    </div>
  );
}
