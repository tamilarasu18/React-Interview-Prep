import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Offline',
  description: 'You are offline. Pages you have already opened are still available.',
  robots: { index: false, follow: false },
};

export default function Offline() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center max-w-lg">
        <svg
          className="h-16 w-16 mx-auto text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18.364 5.636a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728M12 12h.01M3 3l18 18"
          />
        </svg>

        <h1 className="text-3xl font-semibold text-gray-900 mt-6 mb-2">You&apos;re offline</h1>
        <p className="text-lg text-gray-600 mb-8">
          This page hasn&apos;t been opened before, so there was nothing cached to show. Anything you
          have already read is still available.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            All questions
          </Link>
          <Link
            href="/cheatsheet/"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Cheat sheet
          </Link>
        </div>
      </div>
    </div>
  );
}
