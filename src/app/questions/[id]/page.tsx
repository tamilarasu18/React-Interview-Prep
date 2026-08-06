import { notFound } from 'next/navigation';
import Link from 'next/link';
import AnswerRenderer from '@/components/AnswerRenderer';
import MemoryHook from '@/components/MemoryHook';
import ShortAnswer from '@/components/ShortAnswer';
import questionsData from '../../../../data/questions.json';
import { QuestionsData } from '@/types/question';
import { categoryToSlug, getPrimaryCategory } from '@/lib/categoryUtils';
import { siteConfig } from '@/config/site';

const data = questionsData as QuestionsData;

export function generateStaticParams() {
  return data.questions.map((question) => ({ id: question.id.toString() }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const question = data.questions.find((q) => q.id === parseInt(id, 10));

  if (!question) {
    return { title: 'Question Not Found' };
  }

  return {
    title: `${question.question} - React Interview Question #${question.id}`,
    description: question.shortAnswer.substring(0, 160),
    alternates: { canonical: `/questions/${question.id}/` },
    openGraph: {
      title: question.question,
      description: question.shortAnswer.substring(0, 200),
      type: 'article',
    },
  };
}

const difficultyColors = {
  Easy: 'bg-green-100 text-green-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Hard: 'bg-red-100 text-red-800',
};

export default async function QuestionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const questionId = parseInt(id, 10);
  const question = data.questions.find((q) => q.id === questionId);

  if (!question) {
    notFound();
  }

  const currentIndex = data.questions.findIndex((q) => q.id === questionId);
  const prevQuestion = currentIndex > 0 ? data.questions[currentIndex - 1] : null;
  const nextQuestion =
    currentIndex < data.questions.length - 1 ? data.questions[currentIndex + 1] : null;

  const relatedQuestions = data.questions
    .filter((q) => q.id !== question.id && q.categories.some((c) => question.categories.includes(c)))
    .slice(0, 5);

  const primaryCategory = getPrimaryCategory(question);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: question.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: question.shortAnswer,
        },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/` },
      {
        '@type': 'ListItem',
        position: 2,
        name: primaryCategory,
        item: `${siteConfig.url}/category/${categoryToSlug(primaryCategory)}/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `Question #${question.id}`,
        item: `${siteConfig.url}/questions/${question.id}/`,
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-500 flex-wrap">
            <li>
              <Link href="/" className="hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/category/${categoryToSlug(primaryCategory)}/`}
                className="hover:text-primary-600"
              >
                {primaryCategory}
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">Question #{question.id}</li>
          </ol>
        </nav>

        <article className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <span className="text-sm font-semibold text-gray-500">
                Question #{question.id}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  difficultyColors[question.difficulty]
                }`}
              >
                {question.difficulty}
              </span>
              {question.categories.map((category) => (
                <Link
                  key={category}
                  href={`/category/${categoryToSlug(category)}/`}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-primary-100 text-primary-800 hover:bg-primary-200 transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.question}</h1>

            {question.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 bg-gray-100 text-gray-600 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Memorization layer comes first — this is the point of the site. */}
          <ShortAnswer text={question.shortAnswer} className="mb-4" />
          <MemoryHook hook={question.memoryHook} className="mb-8" />

          <h2 className="text-2xl font-semibold text-gray-900 mb-4 pt-6 border-t border-gray-200">
            Full explanation
          </h2>
          <AnswerRenderer answer={question.answer} />

          {question.resources.length > 0 && (
            <div className="mt-8 p-4 bg-primary-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Further reading</h3>
              <ul className="space-y-2">
                {question.resources.map((resource, index) => {
                  const url = typeof resource === 'string' ? resource : resource.url;
                  const title = typeof resource === 'string' ? resource : resource.title;
                  return (
                    <li key={index}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 flex items-center gap-2"
                      >
                        <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path
                            fillRule="evenodd"
                            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </article>

        {/* Prev / Next */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevQuestion ? (
            <Link
              href={`/questions/${prevQuestion.id}/`}
              className="flex items-center gap-2 px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="text-left min-w-0">
                <div className="text-xs text-gray-500">Previous</div>
                <div className="text-sm font-medium text-gray-900 truncate">
                  {prevQuestion.question}
                </div>
              </div>
            </Link>
          ) : (
            <div />
          )}

          {nextQuestion ? (
            <Link
              href={`/questions/${nextQuestion.id}/`}
              className="flex items-center justify-end gap-2 px-4 py-3 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="text-right min-w-0">
                <div className="text-xs text-gray-500">Next</div>
                <div className="text-sm font-medium text-gray-900 truncate">
                  {nextQuestion.question}
                </div>
              </div>
              <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ) : (
            <div />
          )}
        </div>

        {relatedQuestions.length > 0 && (
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Related questions</h2>
            <div className="space-y-3">
              {relatedQuestions.map((relatedQ) => (
                <Link
                  key={relatedQ.id}
                  href={`/questions/${relatedQ.id}/`}
                  className="block p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <span className="text-sm text-gray-500">#{relatedQ.id}</span>
                      <h3 className="text-lg font-medium text-gray-900 mt-1">
                        {relatedQ.question}
                      </h3>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold shrink-0 ${
                        difficultyColors[relatedQ.difficulty]
                      }`}
                    >
                      {relatedQ.difficulty}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
