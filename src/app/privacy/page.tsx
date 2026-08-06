import { siteConfig } from '@/config/site';

export const metadata = {
  title: 'Privacy Policy',
  description: 'What this site stores, what it does not, and where your flashcard progress lives.',
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: August 6, 2026</p>

          <div className="space-y-8 text-gray-700 leading-relaxed">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">The short version</h2>
              <p>
                This is a static site. There is no account system, no database, and no server that
                receives anything you type. Your flashcard progress never leaves your browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Local storage</h2>
              <p>
                Flashcard mode saves which cards you have marked as known under the key{' '}
                <code className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                  rip:known-cards:v1
                </code>{' '}
                in your browser&apos;s local storage. It is a list of question IDs and nothing else.
                It is not transmitted anywhere. Clearing your browser data — or pressing{' '}
                <strong>Reset</strong> on the flashcards page — deletes it permanently.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Analytics</h2>
              <p>
                {siteConfig.analytics.gaMeasurementId ? (
                  <>
                    This deployment runs Google Analytics, which collects aggregate traffic data
                    (pages viewed, approximate region, device type) subject to{' '}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:underline"
                    >
                      Google&apos;s privacy policy
                    </a>
                    . No personally identifying information is collected by this site.
                  </>
                ) : (
                  <>
                    No analytics are enabled on this deployment. Analytics are opt-in via the{' '}
                    <code className="font-mono text-sm bg-gray-100 px-1.5 py-0.5 rounded">
                      NEXT_PUBLIC_GA_MEASUREMENT_ID
                    </code>{' '}
                    environment variable and are disabled when it is unset.
                  </>
                )}
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Hosting</h2>
              <p>
                Whoever hosts this site may keep standard server access logs (IP address, user agent,
                requested path) as part of normal operation. That is outside this project&apos;s
                control and governed by the host&apos;s own policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">External links</h2>
              <p>
                Answers link to external documentation such as react.dev and MDN. Those sites have
                their own privacy policies.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
