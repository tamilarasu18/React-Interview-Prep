import Link from 'next/link';
import { APP_VERSION, getVersionDate } from '@/lib/version';
import { siteConfig } from '@/config/site';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{siteConfig.name}</h3>
            <p className="text-gray-400 text-sm">
              React interview questions with a one-line answer and a memory hook for every
              question. {siteConfig.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Study</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white text-sm">
                  All Questions
                </Link>
              </li>
              <li>
                <Link href="/flashcards/" className="text-gray-400 hover:text-white text-sm">
                  Flashcards
                </Link>
              </li>
              <li>
                <Link href="/cheatsheet/" className="text-gray-400 hover:text-white text-sm">
                  Cheat Sheet
                </Link>
              </li>
              <li>
                <Link href="/categories/" className="text-gray-400 hover:text-white text-sm">
                  Categories
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Project</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about/" className="text-gray-400 hover:text-white text-sm">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy/" className="text-gray-400 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
              {siteConfig.repoUrl && (
                <li>
                  <a
                    href={siteConfig.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white text-sm"
                  >
                    Contribute on GitHub
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Version {APP_VERSION} • Updated {getVersionDate()}
          </p>
          <p className="text-gray-500 text-xs mt-2">
            Built for the React community. React is a trademark of Meta Platforms, Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
