# React Interview Questions

> 229 React interview questions, written to be memorized rather than skimmed.

**[Live site → react-interview-prep-ivory.vercel.app](https://react-interview-prep-ivory.vercel.app/)**

Covers the full senior loop: React concepts, machine coding, frontend system design, DSA, security, architecture and behavioural rounds.

A free, open-source React interview preparation site. Every question has three layers:

1. **A short answer** — one or two sentences, roughly fifteen seconds of speech. This is what you say in the room.
2. **A memory hook** — a mnemonic or sharp contrast so recall survives interview pressure.
3. **A full explanation** — code, comparison tables, gotchas, and the reasoning behind the short answer.

Plus a **flashcard mode** that shuffles, filters by topic and difficulty, and remembers what you already know, and a **printable cheat sheet** of every short answer and memory hook.

It is also an **installable PWA** — add it to your home screen and revise on the train without a signal.

---

## Why this exists

Most interview question lists are written to be read. You skim a 900-word essay on reconciliation, nod along, and three days later produce nothing but "uh, it's a diffing thing?"

Recall under pressure is a different skill from comprehension. It needs short answers, distinct anchors, and repetition. That is what this collection is structured around.

---

## Quick start

```bash
git clone https://github.com/tamilarasu18/React-Interview-Prep.git
cd React-Interview-Prep

npm install
npm run dev      # http://localhost:3000
```

`npm run dev` and `npm run build` compile `data/questions/*.json` into `data/questions.json` automatically first.

---

## What is covered

A senior frontend loop is typically 4–5 rounds. This covers all of them.

### Round 1 — React & JavaScript concepts

| Category | Covers |
|----------|--------|
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

### Round 2 — Machine coding

Build-it-in-60-minutes challenges with the approach to state first, then a worked solution: debounce and throttle, typeahead, infinite scroll, virtualised list, accessible modal with focus trap, drag-and-drop, multi-step wizard, data table, toast system, tabs, carousel, `useFetch`, `Promise.all`, memoize, deep clone, LRU cache, URL-synced search.

### Round 3 — Frontend system design

News feed, real-time chat, e-commerce PLP/PDP, analytics dashboard, offline-first app, file upload with resumability, design system, image gallery, collaborative editor, notification system, caching strategy, i18n, A/B testing and feature flags — plus how to approach the round itself.

### Round 4 — DSA

The patterns that actually appear in frontend loops: hash maps, two pointers, sliding window, binary search, recursion, trees, backtracking, DP, heaps, graphs and topological sort — in JavaScript, with the complexity trade-offs stated.

### Cross-cutting

| Category | Covers |
|----------|--------|
| Security & Auth | Token storage, JWT vs sessions, XSS, CSRF, OAuth + PKCE, CSP, CORS, RBAC, supply chain |
| Architecture at Scale | Folder structure, monorepos, micro-frontends, migrations, observability, bundle budgets, CI/CD, deploy safety |
| Behavioral & Experience | Technical decisions, disagreement, incidents, code review, mentoring, failure, scope pushback |
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
public/
  manifest.json       PWA manifest
  sw.js               Service worker — hand-written, no build step
  icon-*.png          App icons, rendered from react-icon.svg
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
  "id": 230,
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

## Progressive web app

The site installs to a home screen and keeps working without a connection.

`public/sw.js` is written by hand rather than generated, because a static export makes the caching rules fall straight out of what each response is:

| Request | Strategy | Why |
|---------|----------|-----|
| `/_next/static/*` | Cache first | Filenames are content-hashed, so a URL never changes meaning |
| HTML documents | Network first, cache as backup | Deploys change them; the copy is what makes a page work offline |
| Icons, SVG, images | Stale while revalidate | Instant, refreshed in the background |
| Never visited, unreachable | `/offline/` | An honest fallback beats a browser error page |

Only the entry points are precached at install. Seeding all 229 question pages would cost megabytes for pages most people never open, so each page is cached the first time it is actually read.

The worker is registered in production builds only — under `next dev` it would cache modules the dev server is still rebuilding. To test it locally:

```bash
npm run build
npx serve out
```

Then use DevTools → Application → Service Workers, and Network → Offline.

**After changing anything cached at install**, bump `CACHE_VERSION` in `public/sw.js` so old caches are evicted on the next activation.

The PNG icons in `public/` are rendered from `public/react-icon.svg`; regenerate them with any SVG-to-PNG tool at 192px and 512px, keeping the maskable pair's artwork inside the middle 80% so Android's adaptive mask cannot crop it.

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
