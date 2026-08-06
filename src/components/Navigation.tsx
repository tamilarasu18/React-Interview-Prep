'use client';

import { useState } from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';

const links = [
  { href: '/', label: 'All Questions' },
  { href: '/flashcards/', label: 'Flashcards' },
  { href: '/cheatsheet/', label: 'Cheat Sheet' },
  { href: '/categories/', label: 'Categories' },
  { href: '/about/', label: 'About' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <svg className="h-7 w-7 text-primary-500" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <circle cx="12" cy="12" r="2.1" />
                <g fill="none" stroke="currentColor" strokeWidth="1">
                  <ellipse cx="12" cy="12" rx="10" ry="4.2" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
                  <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
                </g>
              </svg>
              <span className="text-lg sm:text-xl font-bold text-primary-700">
                {siteConfig.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
