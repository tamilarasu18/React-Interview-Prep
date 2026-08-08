# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [Semantic Versioning](https://semver.org/).

Keep entries **minimalistic** — group by category, describe major changes only, never paste question content.

## [Unreleased]

### Added

- Installable PWA — web app manifest, app icons, and home screen shortcuts to Flashcards, Cheat Sheet and Categories
- Offline support via a hand-written service worker: cache-first for hashed assets, network-first for pages, `/offline/` as the fallback
- Install prompt shown once the browser reports the app is installable, dismissible and remembered

## [1.1.0] - 2026-08-07

### Added

- 116 questions covering the rest of a senior interview loop, taking the total to 229
- Machine Coding category — 24 build-it challenges with approach-first answers and worked solutions
- Frontend System Design category — 16 questions from feed and chat design to caching, i18n and feature flags
- Security & Auth category — 16 questions on token storage, XSS, CSRF, OAuth/PKCE, CSP and CORS
- Architecture at Scale category — 16 questions on monorepos, micro-frontends, migrations, observability and deploy safety
- DSA category — 28 JavaScript algorithm questions covering the patterns that appear in frontend loops
- Behavioral & Experience category — 16 questions with answer structures rather than scripts

### Fixed

- Validator no longer reports false positives for shell comments and closing fences inside code blocks

## [1.0.0] - 2026-08-06

### Added

- 113 React interview questions across 14 categories
- Three-layer answer format: spoken short answer, memory hook, full explanation
- Flashcard mode with shuffle, category and difficulty filters, and known-card tracking in localStorage
- Printable cheat sheet of every short answer and memory hook, grouped by topic
- Search across questions, short answers, memory hooks, tags and categories
- Category pages grouped by difficulty, and per-question pages with related questions
- FAQPage, BreadcrumbList and CollectionPage structured data for SEO
- Split content source: one JSON file per topic, compiled by `scripts/build-questions.js`
- Content validation via `scripts/validate-questions.js` — enforces the short-answer and memory-hook limits, category existence, and code-fence correctness

[Unreleased]: https://github.com/tamilarasu18/React-Interview-Prep/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/tamilarasu18/React-Interview-Prep/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/tamilarasu18/React-Interview-Prep/releases/tag/v1.0.0
