# React Interview Questions

> 113 React interview questions, written to be memorized rather than skimmed.

A free, open-source React interview preparation site. Every question has three layers:

1. **A short answer** — one or two sentences, roughly fifteen seconds of speech. This is what you say in the room.
2. **A memory hook** — a mnemonic or sharp contrast so recall survives interview pressure.
3. **A full explanation** — code, comparison tables, gotchas, and the reasoning behind the short answer.

Plus a **flashcard mode** that shuffles, filters by topic and difficulty, and remembers what you already know, and a **printable cheat sheet** of every short answer and memory hook.

---

## Why this exists

Most interview question lists are written to be read. You skim a 900-word essay on reconciliation, nod along, and three days later produce nothing but "uh, it's a diffing thing?"

Recall under pressure is a different skill from comprehension. It needs short answers, distinct anchors, and repetition. That is what this collection is structured around.

---

## Quick start

```bash
git clone https://github.com/YOUR_USERNAME/react-interview-prep.git
cd react-interview-prep

npm install
npm run dev      # http://localhost:3000
```

`npm run dev` and `npm run build` compile `data/questions/*.json` into `data/questions.json` automatically first.

---

## What is covered

| Category | Questions |
|----------|-----------|
| React Fundamentals | Virtual DOM, reconciliation, purity, render vs commit phase |
| JSX & Rendering | Keys, conditional rendering, fragments, portals, what triggers a re-render |
| Components & Props | Composition, HOCs, compound components, TypeScript props |
| State & Events | Batching, immutability, `useReducer`, derived state, stale closures |
| Hooks | Every built-in hook, the rules of hooks, custom hooks |
| Effects & Lifecycle | Dependencies, cleanup, Strict Mode, error boundaries, Suspense |
| Performance | `memo`, profiling, virtualisation, code splitting, the React Compiler |
| State Management | Context vs stores, Redux Toolkit, Zustand, React Query |
| Routing & Forms | Client routing, protected routes, validation, accessibility |
| Advanced Patterns | Render props, `forwardRef`, modals, integrating imperative libraries |
| React 19 & Server Components | RSC, Server Actions, streaming SSR, App Router |
| Testing & Tooling | React Testing Library, Vite, debugging |
| JavaScript & TypeScript | Closures, equality, the event loop, async pitfalls |
| Most Asked | The cross-cutting set to drill first |

---

## Scripts

| Command | Does |
|---------|------|
| `npm run dev` | Build questions, start the dev server |
| `npm run build` | Build questions, build the static site, generate the sitemap |
| `npm run start` | Serve the production build |
| `npm run build-questions` | Compile `data/questions/*.json` → `data/questions.json` |
| `npm run validate` | Compile, then check every question against the schema rules |
| `npm run lint` | ESLint |

---

## Project structure

```
data/
  questions/          One JSON file per topic — this is where content lives
  categories.json     Category names and descriptions (counts are derived)
  meta.json           Version, last-updated date, external resources
  questions.json      Generated — do not edit by hand
scripts/
  build-questions.js  Merges the parts, derives category counts
  validate-questions.js
src/
  app/                Next.js App Router pages
  components/         QuestionCard, FlashcardDeck, AnswerRenderer, …
  lib/                Query helpers, slug utilities, version
  types/              Question and Category types
```

---

## Adding a question

1. Open the relevant file in `data/questions/`
2. Add an object with the next free `id`:

```json
{
  "id": 114,
  "question": "The question, phrased the way it actually gets asked",
  "shortAnswer": "One or two sentences. This is what you say out loud. Max 400 characters, no code fences.",
  "memoryHook": "A mnemonic or contrast. Max 180 characters — it has to fit on a flashcard.",
  "answer": "## Full explanation\n\nMarkdown. Code blocks need a language label.",
  "categories": ["Hooks"],
  "difficulty": "Medium",
  "tags": ["hooks"],
  "hasCode": true,
  "hasLinks": false,
  "resources": []
}
```

3. Run `npm run validate`
4. Open a pull request

Category names must already exist in `data/categories.json` — the build fails on unknown ones rather than silently creating a category. Counts are computed, never hand-maintained.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the writing style rules.

---

## Deploying

Static export — it works on any static host.

```bash
npm run build     # outputs to ./out
```

For Vercel, the included `vercel.json` is already configured. Set `NEXT_PUBLIC_SITE_URL` to your domain so the sitemap and canonical URLs are correct. Copy `.env.example` to `.env.local` for local overrides; every variable is optional.

---

## Tech stack

Next.js 15 (App Router, static export) · React 19 · TypeScript · Tailwind CSS · react-markdown

---

## License

Code is MIT. Question text and explanations are CC BY-SA 4.0 — see [LICENSE](LICENSE) and [LICENSE-CONTENT](LICENSE-CONTENT).

React is a trademark of Meta Platforms, Inc. This project is not affiliated with or endorsed by Meta.
