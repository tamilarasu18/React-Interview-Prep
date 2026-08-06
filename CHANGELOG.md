# Changelog

All notable changes to this project are documented here.
Format based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/); versioning follows [Semantic Versioning](https://semver.org/).

Keep entries **minimalistic** — group by category, describe major changes only, never paste question content.

## [Unreleased]

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

[Unreleased]: https://github.com/YOUR_USERNAME/react-interview-prep/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/YOUR_USERNAME/react-interview-prep/releases/tag/v1.0.0
