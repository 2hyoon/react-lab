# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Working mode

This is a **learning repository**. The owner is studying React and TypeScript by writing the code themselves. Default to guiding, giving hints, and reviewing — let the owner write the implementation and check their work, rather than implementing directly. Only write code yourself when explicitly asked (e.g. "make this for me", or a larger refactor/migration).

## Commands

```bash
npm run dev      # start dev server (Turbopack)
npm run build    # production build + TypeScript check
npm run lint     # ESLint (Next.js core-web-vitals + TypeScript rules)
```

No test runner is configured.

## Architecture

**Stack:** Next.js 16 App Router · React 19 · TypeScript 5 · Tailwind CSS v4 · Lucide React

### Directory layout

```
app/                        # Next.js App Router pages
  layout.tsx                # root layout — ThemeProvider, Header, Nav, grid shell
  globals.css               # Tailwind v4 entry + sidebar CSS transition
  [route]/
    page.tsx                # page component (thin wrapper, imports from src/)
    loading.tsx             # Suspense fallback

src/
  components/
    ui/                     # reusable primitives: Button, Accordion, Counter, ThemeButton
    feature/
      calculator/           # feature-specific: Calculator, CalculatorButton, CalculatorDisplay
    layout/                 # Header, Nav
  hooks/
    ThemeContext.tsx         # ThemeProvider + useTheme hook
  types/
    type.ts                 # Theme enum
    interface.ts            # AccordionItemData, ThemeContextType
```

### Path alias

`@/*` resolves to the project root. All internal imports use `@/src/...` or `@/app/...`.

### Styling

Tailwind v4 — no `tailwind.config.ts`. Semantic color tokens are declared via `@theme inline` in `app/globals.css` (e.g. `--color-background`, `--color-surface`, `--color-foreground`, `--color-muted`, `--color-border`, `--color-primary`, `--color-accent`, `--color-danger`, `--color-success`). Each maps to a CSS variable whose value is set in `:root` (light) and overridden in `body.dark` (dark). Use the resulting utilities (`bg-surface`, `text-muted`, etc.) — **do not** use raw palette colors (`bg-gray-700`) or `dark:` variants; theme switching happens entirely through the token values, so components stay theme-agnostic.

Font is Geist Mono loaded via `next/font/google`, injected as the `--font-gaist-mono` CSS variable and mapped to all font stacks in `@theme inline`.

### Theme system

`ThemeProvider` (in `src/hooks/ThemeContext.tsx`) wraps the entire app in `app/layout.tsx`. It:
- Initialises to `Theme.LIGHT` on first render (avoids hydration mismatch)
- Syncs from `localStorage` or `prefers-color-scheme` after mount
- Toggles the `dark`/`light` class on `<body>` and persists to `localStorage`

Consume with `useTheme()` — throws if used outside the provider.

### Layout shell

`app/layout.tsx` is a Client Component (uses `useState` for nav toggle). The page grid is:
```
[200px sidebar] [2.5rem] [main content] [2.5rem]  ← lg breakpoint
[full-width]                                        ← below lg
```

The sidebar (`#aside`) slides in/out via a CSS `left` transition defined in `globals.css`, triggered by `data-sidebar="true/false"` on `<body>`.

### Component conventions

- All interactive components require `"use client"` at the top.
- Exports: use `export default` for components; named exports for types/interfaces.
- `Button` (`src/components/ui/Button.tsx`) supports `primary | secondary | danger` variants and is built with `React.forwardRef`.
- Feature-specific sub-components (e.g. `CalculatorButton`, `CalculatorDisplay`) live alongside their parent in `src/components/feature/<name>/`.
- Complex co-located state uses `useReducer`; simple single-value state uses `useState`.

### Naming conventions

- **Component files**: PascalCase matching the default-export component — `Button.tsx`, `ThemeButton.tsx`, `CalculatorButton.tsx`.
- **Context / provider modules**: PascalCase — `ThemeContext.tsx` (exports a Provider component + its hook).
- **Standalone hook files**: camelCase with `use` prefix — e.g. `useFetch.ts` (none yet; applies to future hooks).
- **Identifiers**: components PascalCase; hooks `use` + camelCase; types/interfaces/enums PascalCase.
- **Next.js special files & route folders**: lowercase, fixed by the framework — `page.tsx`, `layout.tsx`, `loading.tsx`, `app/accordion/`.
- **Non-component utility/type files**: camelCase — `interface.ts`, `type.ts`.

### Conventions

- All Markdown files (`.md`) must be written in English.
- All git commit messages must be written in English.
- Commit format: conventional commits — `feat`, `fix`, `refactor`, `chore`, etc. with a `(scope)` in parentheses.
