# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

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
    themeContext.tsx         # ThemeProvider + useTheme hook
  types/
    type.ts                 # Theme enum
    interface.ts            # AccordionItemData, ThemeContextType
```

### Path alias

`@/*` resolves to the project root. All internal imports use `@/src/...` or `@/app/...`.

### Styling

Tailwind v4 — no `tailwind.config.ts`. Custom tokens are declared via `@theme inline` in `app/globals.css`. Dark mode uses Tailwind's `dark:` variant, applied by adding/removing the `dark` class on `<body>` (not via `prefers-color-scheme`).

Font is Space Mono loaded via `next/font/google`, injected as `--font-space-mono` CSS variable and mapped to all font stacks in `@theme inline`.

### Theme system

`ThemeProvider` (in `src/hooks/themeContext.tsx`) wraps the entire app in `app/layout.tsx`. It:
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
- `Button` (`src/components/ui/button.tsx`) supports `primary | secondary | danger` variants and is built with `React.forwardRef`.
- Feature-specific sub-components (e.g. `CalculatorButton`, `CalculatorDisplay`) live alongside their parent in `src/components/feature/<name>/`.
- Complex co-located state uses `useReducer`; simple single-value state uses `useState`.

### Conventions

- All Markdown files (`.md`) must be written in English.
- All git commit messages must be written in English.
- Commit format: conventional commits — `feat`, `fix`, `refactor`, `chore`, etc. with a `(scope)` in parentheses.
