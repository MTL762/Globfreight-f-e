<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


# Project Engineering Rules (Globfreight Front-end)

These rules are **mandatory** for every change made by an agent (or human) in this repo. If a rule
conflicts with a direct user instruction, follow the user and mention the conflict. If you cannot
satisfy a rule, say so explicitly in your summary — never silently skip it.

Stack: Next.js 16 (App Router) · React 19 · TypeScript (strict) · Tailwind + shadcn/ui (Radix) ·
react-hook-form + zod · next-intl (ar, en, nl, fr, de — RTL + LTR) · TanStack Table · oxlint ·
Prettier.

---

## 0. Before Writing Any Code (Search-First Workflow)

1. **Read the Next.js docs first** for any routing, caching, data-fetching, metadata, middleware /
   proxy, or server-action work (`node_modules/next/dist/docs/`). Do not rely on memory.
2. **Search for an existing implementation before creating anything new.** Check, in order:
   - `components/ui/` — shadcn primitives + `dashboard-primitives.tsx` (`StatCard`, `SectionCard`,
     `EmptyState`, `ErrorState`, `FilterBar`, `SearchField`). See `components/ui/README.md`.
   - `components/common/` — `Form/` (`CustomForm`, `inputs-render`, `FormCard*`), `Inputs/*`
     (text, select, date, files, map, phone), `table/` (`TableBasic`, `columns/*`,
     `tableActions/*`, `tableFilters/*`, `tableHelperComponents/*`), `dialog/DialogWrapper`,
     `Buttons/*`, `Cards/*`, `Charts/*`.
   - `hooks/`, `lib/` (`cn`, `api-client`, `env`), `utils/` (`endpoints`, `slugify`,
     `extractForm*`, `FormActions`, `multilingual-slugs`, `*-seo`), `validations/` (shared zod
     schemas), `types/`, `features/*`.
   - Use `grep`/search for the component name, the prop name, and the UI text before concluding it
     does not exist.
3. **Check for an applicable skill.** If the task involves a domain with a skill (design/UI polish
   → `impeccable` / `DESIGN.md`; accessibility, performance, browser debugging → chrome-devtools
   skills; plugins/customizations → their skills), read its `SKILL.md` and follow it. If no
   installed skill covers it, search the marketplace before improvising.
4. **Read `DESIGN.md` and `PRODUCT.md`** before any UI work on public (`(site)`) pages.
5. **Plan briefly**: list the files you will touch and the components you will reuse vs. create.
   If you create a new shared component, justify why nothing existing fits.

---

## 1. Reusability Rules (Hard Constraints)

- **R1 — Never duplicate.** If the same JSX/logic appears (or would appear) in 2+ places, extract
  it into a shared component/hook/util. Copy-paste of >10 similar lines is a defect.
- **R2 — Extend, don't fork.** Prefer adding a prop/variant (via `class-variance-authority`) to an
  existing component over creating `ButtonV2`, `NewCard`, `CardCopy`, etc.
- **R3 — Never edit shadcn primitives for one-off needs.** Wrap them (`components/common/...`) or
  pass `className`. Only modify `components/ui/*` for app-wide changes.
- **R4 — Placement rules:**
  | Scope | Location |
  | --- | --- |
  | Generic, design-system level, no business logic | `components/ui/` |
  | Reusable across modules, app-aware (forms, tables, inputs) | `components/common/<Group>/` |
  | Used by one module/page only | `components/pages/_<module>/` or `features/<domain>/components/` |
  | Domain logic (api, config, hooks, types) | `features/<domain>/{api,config,hooks,types.ts}` |
  | Pure helpers (no React) | `utils/` or `lib/` |
  | Shared zod pieces | `validations/` |
  | Cross-module types | `types/` |
  Promote a module-local component to `common/` the moment a second module needs it.
- **R5 — Composition over configuration.** Prefer `children`, slots, and compound components
  (`<Card><Card.Header/>…`) over boolean-prop explosions. More than ~3 boolean props that toggle
  layout = refactor into composition or variants.
- **R6 — Components are agnostic of where they are used.** No hard-coded routes, endpoints,
  translation keys or business IDs inside shared components — pass them as props.
- **R7 — Forms follow the existing module pattern:** `<module>.inputs.ts` (input config),
  `<module>.schema.ts` (zod, receives `t`), `use<Module>Form.logic.tsx` (hook), `<module>Form.page.tsx`
  (view). Render fields via `CustomForm` / `inputs-render`; never hand-build an input that already
  exists in `components/common/Inputs`.
- **R8 — Tables use `TableBasic`** + reusable `columns/*` cells + `tableActions/*`. Add a new column
  cell to `columns/` instead of inline cell renderers when it can be reused.
- **R9 — Multilingual fields** use `FORM_LANGUAGES` and the existing helpers — never hard-code
  `nameAr/nameEn/...` loops by hand in new code; generate them from the language list.

---

## 2. Clean Code Rules

### Size & Responsibility
- **C1** — One component per file (small private sub-components in the same file are OK if not
  reused and < 30 lines).
- **C2** — Component files ≤ **200 lines**, functions/hooks ≤ **50 lines**, JSX return ≤ **80 lines**.
  Exceeding = split.
- **C3** — Single responsibility: **view components render; hooks hold logic; utils are pure.**
  Data fetching, transformation, and side effects do not live inside JSX-heavy components.
- **C4** — Max nesting depth of 3 (if/loops/ternaries). Use early returns and guard clauses.
- **C5** — No nested ternaries in JSX. Extract to a variable, a lookup map, or a small component.
- **C6** — Max 4 positional parameters; use an options object beyond that.

### Naming
- **N1** — Components & types: `PascalCase`. Hooks: `useCamelCase`. Functions/vars: `camelCase`.
  Constants: `UPPER_SNAKE_CASE`. New files: `kebab-case.tsx` unless the folder already uses another
  convention (match the folder).
- **N2** — Names reveal intent: `isLoading`, `hasError`, `canEdit`, `handleSubmit`, `onChange`. No
  `data2`, `temp`, `x`, `obj`, `res1`.
- **N3** — Event props are `onX`; their implementations are `handleX`.
- **N4** — No abbreviations except well-known (`id`, `url`, `api`, `i18n`).

### TypeScript
- **T1** — **No new `any`.** Use precise types, generics, `unknown` + narrowing, or zod-inferred
  types (`z.infer<typeof Schema>`). When touching a file with `any`, type what you touch.
- **T2** — Every component has an explicit `Props` type (`type XProps = {...}`), exported if the
  component is shared. Extend native props where relevant
  (`React.ComponentProps<"button"> & {...}`).
- **T3** — No non-null assertions (`!`) or `as` casts unless justified with a comment.
- **T4** — Use discriminated unions for variant/state shapes instead of many optional fields.
- **T5** — API response shapes live in `types/` or `features/<domain>/types.ts`, never inline in
  components.
- **T6** — `import type` for type-only imports.

### Logic & Constants
- **L1** — No magic numbers/strings. Extract to named constants or config files
  (`*.config.ts`).
- **L2** — Replace `switch`/if-chains mapping values → UI with lookup objects
  (`Record<Status, Variant>`).
- **L3** — Pure functions for transforms (normalize, map, format) — placed in `utils/` and
  unit-testable.
- **L4** — No dead code, commented-out code, unused imports/vars/exports, or `console.log` in
  committed code.
- **L5** — Handle every async path: loading, empty, error, success. Use `EmptyState` /
  `ErrorState` / `skeleton` / `spinner` — don't invent new ones.
- **L6** — Don't swallow errors (`catch {}`); surface them via `sonner` toast or error state.

---

## 3. React & Next.js Rules

- **X1 — Server Components by default.** Add `"use client"` only when you need state, effects,
  browser APIs, or event handlers — and push it to the **smallest leaf** possible.
- **X2** — Data fetching on the server via `api/fetch.ts` (`fetchHelper`) with endpoints from
  `utils/endpoints.ts`. No hard-coded URLs. No `fetch` inside client components unless via the
  existing client helpers in `lib/api-client.ts`.
- **X3** — Mutations via server actions in `api/actions.ts` (or the feature's `api/`); revalidate
  with tags rather than full reloads.
- **X4** — No `useEffect` for derived state or data you can compute during render; no
  `useEffect` to sync props → state. Effects are only for real external side effects.
- **X5** — Don't add `useMemo`/`useCallback` without a reason (React 19 compiler-friendly code);
  never premature-optimize.
- **X6** — Stable, meaningful `key`s (ids), never array index for dynamic lists.
- **X7** — Use `next/image` for images and `Link` from `@/i18n/navigation` for internal links
  (locale-aware). Never `<a href>` for internal routes or `next/link` directly.
- **X8** — Every public page exports proper metadata (reuse `utils/*-seo.ts` helpers and
  multilingual slug helpers).
- **X9** — Add `loading.tsx` / `error.tsx` / `not-found` handling where a route fetches data.

---

## 4. Styling Rules

- **S1** — Tailwind only. No inline `style={{}}` except for truly dynamic values; no new CSS files
  for component styles.
- **S2** — Always merge classes with `cn()` from `@/lib/utils`; shared components accept
  `className`.
- **S3** — Use **semantic tokens** (`bg-background`, `text-muted-foreground`, `status.*`,
  `space-*`, `shadow-elevation-*`, `text-title`, brand `--logo-orange` / `--logo-navy`). **No raw
  hex colors or arbitrary values** (`text-[#123456]`, `mt-[13px]`) unless a token truly doesn't
  exist.
- **S4** — **RTL-safe utilities only:** `ms-/me-/ps-/pe-/start-/end-/text-start/text-end` — never
  `ml-/mr-/pl-/pr-/left-/right-/text-left/text-right` for directional spacing. Flip directional
  icons in RTL (`rtl:rotate-180`).
- **S5** — Variants via `cva`, not conditional class string soup.
- **S6** — Mobile-first responsive (`sm: md: lg:`); verify the layout at small widths.
- **S7** — Must support dark mode (`next-themes`) via tokens — no hard-coded light-only colors.

---

## 5. i18n Rules

- **I1** — **No hard-coded user-facing strings.** All text goes through `useTranslations` /
  `getTranslations`.
- **I2** — Every new key is added to **all five** files in `messages/` (`ar`, `en`, `nl`, `fr`,
  `de`) with real translations — not English copies — and the same nesting.
- **I3** — Keys are namespaced and descriptive (`services.form.title`), not sentence-as-key.
- **I4** — Dates, numbers and currency are formatted locale-aware (`date-fns` locale / `Intl` /
  `PriceAmount`).

---

## 6. Accessibility Rules

- **A1** — Semantic HTML first (`button`, `nav`, `main`, `section`, headings in order).
- **A2** — Icon-only buttons need `aria-label` (translated).
- **A3** — Every input has an associated label (`InputLabel` / `Label`) and error message wired
  with `aria-describedby` (existing form components already do this — use them).
- **A4** — Visible `focus-visible` states; full keyboard operability; no `div` with `onClick`.
- **A5** — Images have meaningful `alt` (empty `alt=""` for decorative).

---

## 7. Imports & Structure

- **M1** — Absolute imports via `@/` for anything outside the current folder; relative only for
  siblings in the same module.
- **M2** — Import order: React/Next → third-party → `@/` internal → relative → types → styles.
- **M3** — No circular imports; `components/ui` must never import from `components/common`,
  `features`, or `app`.
- **M4** — Do not add a new dependency if an existing one already solves it (icons: `lucide-react`;
  dates: `date-fns`; toasts: `sonner`; animation: `framer-motion`; forms: `react-hook-form` +
  `zod`). Ask before adding any package.

---

## 8. Definition of Done (run before finishing)

1. `npx tsc --noEmit` — zero new type errors in touched files.
2. `npm run lint` (oxlint) — zero new warnings/errors.
3. `npx prettier --check` on touched files (respect `.prettierrc`: double quotes, semicolons, no
   trailing commas, width 100).
4. All new strings exist in the 5 `messages/*.json` files.
5. Self-review checklist:
   - [ ] Searched for and reused existing components/hooks/utils
   - [ ] No duplicated logic; no file > 200 lines; no function > 50 lines
   - [ ] No new `any`, no magic values, no dead/commented code, no `console.log`
   - [ ] Server component unless client is required; `"use client"` at the leaf
   - [ ] RTL-safe, dark-mode-safe, responsive, accessible
   - [ ] Loading / empty / error states handled
6. Summarize: files changed, components **reused**, components **created** (with justification),
   and any rule you could not satisfy.

## 9. Never

- Never rewrite or reformat unrelated code in the same change.
- Never delete existing comments/docstrings unrelated to your change.
- Never remove the auto-generated Next.js block at the top of this file.
- Never commit secrets or hard-code environment values — use `lib/env.ts` / `.env`.
- Never bypass lint/type errors with `// @ts-ignore`, `eslint-disable`, or `oxlint-disable`
  without a written justification on the same line.
