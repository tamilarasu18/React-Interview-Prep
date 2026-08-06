import { notFound } from 'next/navigation';
import Link from 'next/link';
import QuestionCard from '@/components/QuestionCard';
import questionsData from '../../../../data/questions.json';
import { QuestionsData } from '@/types/question';
import { questionHasCategory } from '@/lib/categoryUtils';
import { siteConfig } from '@/config/site';

const data = questionsData as QuestionsData;

export function generateStaticParams() {
  return data.categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = data.categories.find((c) => c.slug === slug);

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return {
    title: `${category.name} Interview Questions`,
    description: category.description,
    alternates: { canonical: `/category/${slug}/` },
    openGraph: {
      title: `${category.name} React Interview Questions`,
      description: `${category.count} questions about ${category.name}`,
      type: 'website',
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = data.categories.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  const categoryQuestions = data.questions.filter((q) => questionHasCategory(q, slug));
  const easyQuestions = categoryQuestions.filter((q) => q.difficulty === 'Easy');
  const mediumQuestions = categoryQuestions.filter((q) => q.difficulty === 'Medium');
  const hardQuestions = categoryQuestions.filter((q) => q.difficulty === 'Hard');

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category.name} React Interview Questions`,
    description: category.description,
    url: `${siteConfig.url}/category/${slug}/`,
    numberOfItems: categoryQuestions.length,
    itemListElement: categoryQuestions.slice(0, 10).map((q, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${siteConfig.url}/questions/${q.id}/`,
      name: q.question,
    })),
  };

  const sections: { label: string; bar: string; items: typeof categoryQuestions }[] = [
    { label: 'Easy', bar: 'bg-green-500', items: easyQuestions },
    { label: 'Medium', bar: 'bg-yellow-500', items: mediumQuestions },
    { label: 'Hard', bar: 'bg-red-500', items: hardQuestions },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="mb-6 text-sm">
          <ol className="flex items-center space-x-2 text-gray-500">
            <li>
              <Link href="/" className="hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/categories/" className="hover:text-primary-600">
                Categories
              </Link>
            </li>
            <li>/</li>
            <li className="text-gray-900">{category.name}</li>
          </ol>
        </nav>

        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{category.description}</p>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-green-600">{easyQuestions.length}</div>
              <div className="text-sm text-gray-600">Easy</div>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600">{mediumQuestions.length}</div>
              <div className="text-sm text-gray-600">Medium</div>
            </div>
            <div className="bg-red-50 p-4 rounded-lg">
              <div className="text-3xl font-bold text-red-600">{hardQuestions.length}</div>
              <div className="text-sm text-gray-600">Hard</div>
            </div>
          </div>

          <Link
            href="/flashcards/"
            className="mt-6 inline-block rounded-lg bg-primary-600 px-5 py-2.5 font-semibold text-white hover:bg-primary-700 transition-colors"
          >
            Drill this topic in flashcard mode &rarr;
          </Link>
        </div>

        <div className="space-y-8">
          {sections.map(
            (section) =>
              section.items.length > 0 && (
                <section key={section.label}>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className={`w-2 h-8 ${section.bar} rounded mr-3`} />
                    {section.label} ({section.items.length})
                  </h2>
                  <div className="space-y-4">
                    {section.items.map((question) => (
                      <QuestionCard key={question.id} question={question} />
                    ))}
                  </div>
                </section>
              )
          )}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore other categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.categories
              .filter((c) => c.slug !== slug)
              .slice(0, 9)
              .map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}/`}
                  className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-600">{cat.count} questions</p>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
