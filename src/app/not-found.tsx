import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-primary-600">404</h1>
        <h2 className="text-3xl font-semibold text-gray-900 mt-4 mb-2">Page not found</h2>
        <p className="text-lg text-gray-600 mb-8">
          That page doesn&apos;t exist. Nothing was re-rendered.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            All questions
          </Link>
          <Link
            href="/flashcards/"
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            Flashcards
          </Link>
        </div>
      </div>
    </div>
  );
}
