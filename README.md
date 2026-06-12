# react-lab

A personal lab for studying **React** and **TypeScript** by building small, self-contained UI demos from scratch.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS v4** — semantic color tokens with light/dark theming
- **Lucide React** — icons

## Demos

| Page | What it explores |
| --- | --- |
| `/` | Landing page |
| `/accordion` | Expand/collapse list driven by component state |
| `/calculator` | Co-located state with `useReducer` |
| `/counter` | Basic `useState` interaction |

## Getting Started

```bash
npm run dev      # start the dev server at http://localhost:3000
npm run build    # production build + TypeScript check
npm run lint     # ESLint (Next.js core-web-vitals + TypeScript)
```

## Project Structure

```
app/                  # App Router pages (layout, routes, globals.css)
src/
  components/
    ui/               # reusable primitives (Button, Accordion, Counter, ThemeButton)
    feature/          # feature-specific components (e.g. calculator/)
    layout/           # Header, Nav
  hooks/              # ThemeContext (ThemeProvider + useTheme)
  types/              # shared types, interfaces, enums
```

Theming is handled entirely through CSS variables and Tailwind v4 `@theme` tokens, so components stay theme-agnostic. See [`CLAUDE.md`](./CLAUDE.md) for the full architecture and conventions.
