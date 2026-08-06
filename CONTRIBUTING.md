# Contributing

Thanks for helping. The most valuable contribution is a React question you were actually asked in a real interview that is not covered here.

---

## Adding a question

1. Pick the right file in `data/questions/` (one per topic)
2. Add an object with the next unused `id` — the build fails on duplicates
3. Run `npm run validate`
4. Open a pull request describing what you added

---

## The three layers

Every question must have all three. This is the whole point of the project, and a PR missing one will be sent back.

### `shortAnswer` — what you say out loud

- **One to two sentences.** Roughly fifteen seconds of speech.
- **Max 400 characters**, enforced by the validator.
- **Plain prose.** No markdown headings, no code fences. Inline backticks are fine.
- It must be a *complete* answer, not a teaser. Someone who reads only this should be able to answer the question acceptably.

```
✅ "useMemo caches the value a function returns; useCallback caches the function
   itself. useCallback(fn, deps) is exactly useMemo(() => fn, deps)."

❌ "There are some important differences between useMemo and useCallback that
   relate to what gets cached."          ← says nothing
```

### `memoryHook` — the anchor

- **Max 180 characters.** It has to fit on a flashcard.
- A mnemonic, a sharp contrast, or an image.
- Its job is to keep two similar facts from blurring together.

```
✅ "useMemo remembers the RESULT, useCallback remembers the FUNCTION."
✅ "A key is a name tag, not a seat number."
❌ "Remember the difference between these two hooks."    ← not an anchor
```

### `answer` — the full explanation

- Markdown. Start headings at `##` — `#` is reserved for the page title.
- **Every code block needs a language label**: ` ```jsx `, ` ```ts `, ` ```bash `.
- Use a table for any "X vs Y" question.
- Include the common mistake, not just the correct usage. `// ❌` and `// ✅` comments read well.
- Aim for 200–500 words. Longer than that usually means it should be two questions.

---

## Style rules

**Phrase the question the way it is actually asked.** "What is the difference between useMemo and useCallback?" — not "Explain memoisation hooks."

**Explain why, not just what.** The reason index keys break is more useful than the instruction not to use them.

**Say the honest thing.** If a technique is usually unnecessary, say so. If two options are both defensible, say that too. Answers that oversell a tool make candidates sound naive.

**No screenshots or images.** They are not rendered.

---

## Difficulty

| Level | Means |
|-------|-------|
| `Easy` | A junior developer should know this |
| `Medium` | Requires real working experience |
| `Hard` | Senior-level, or an implementation detail most people never hit |

Be honest. Inflated difficulty makes the flashcard filters useless.

---

## Categories

Use existing categories from `data/categories.json`. The build **fails** on an unknown category rather than silently creating one.

A question can belong to several. Add `"Most Asked"` only if you genuinely encounter it in most interviews — it is meant to stay a drillable shortlist, not a second copy of everything.

To propose a new category, open an issue first.

---

## Code changes

- TypeScript strict mode; avoid `any` outside the markdown renderer, which needs it
- Server Components by default; add `'use client'` only where interactivity requires it
- Tailwind classes, no inline styles
- Run `npm run lint` and `npm run build` before pushing

---

## Licensing

Contributions are accepted under the project's licenses: MIT for code, CC BY-SA 4.0 for question content. Do not paste text from other sites, courses or books — write it in your own words.
