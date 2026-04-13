# Sabia Data — Copilot Instructions

## Project Overview

A Brazilian financial operations dashboard for managing **FIDC** (Fundos de Investimento em Direitos Creditórios) operations. Integrates multiple external APIs (Black, CreditHub, Mantyz) and Supabase for authentication.

**Domain vocabulary (PT-BR)**:

- _cedente_ — assignor
- _sacado_ — debtor
- _operação / aditivo_ — operation / additive
- _recebível_ — receivable
- _duplicata_ — trade bill

---

## Tech Stack

| Package               | Version                                |
| --------------------- | -------------------------------------- |
| React                 | ^19.1.0                                |
| TypeScript            | ~5.8.3                                 |
| Vite                  | ^6.3.5                                 |
| TailwindCSS           | ^4 (CSS-first via `@tailwindcss/vite`) |
| React Router          | ^7                                     |
| TanStack Query        | ^5                                     |
| Axios                 | ^1.9                                   |
| Supabase JS           | ^2.50                                  |
| react-hook-form + Zod | ^7.60 + ^4.0                           |
| dayjs                 | ^1.11                                  |
| lucide-react          | ^0.514                                 |
| recharts              | ^2.15                                  |
| sonner                | ^2.0                                   |
| shadcn/ui             | new-york style, neutral base           |

---

## Folder Structure

Every feature domain follows a **3-file pattern** inside a kebab-case folder:

```
src/
  api/<name>/
    index.ts         # axios instance + all API functions
    types.ts         # response & param types
  pages/<name>/
    index.tsx        # page component
    helpers.ts       # page-scoped constants / pure functions
  components/<name>/
    index.tsx
    types.ts
    helpers.ts
  providers/<name>/
    index.tsx        # provider component
    types.ts         # props + context state types
    helpers.ts       # createContext() lives here
  hooks/use-<name>/
    index.ts
  constants/         # app-wide named constants (paths, events, storage keys)
  utils/             # pure utility functions
  lib/               # singleton clients (supabase, react-query, utils)
```

---

## TypeScript Conventions

- Use **`type`**, never `interface`
- Use **`import type`** for all type-only imports (`verbatimModuleSyntax: true` is enabled)
- Strict mode: `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`
- Path alias: `@/*` → `./src/*`
- Name response types `Get<Resource>Response`, param types `Get<Resource>Params`
- Constants: `SCREAMING_SNAKE_CASE`

---

## Naming Conventions

| Entity          | Convention                | Example                          |
| --------------- | ------------------------- | -------------------------------- |
| Files / folders | kebab-case                | `use-local-storage/index.ts`     |
| Components      | Named PascalCase exports  | `export function DataTable<T>`   |
| Pages           | `<Name>Page` named export | `export function OperationsPage` |
| Hooks           | `use<Name>`               | `useUser`, `useLocalStorage`     |
| Types           | PascalCase                | `DataTableProps<T>`              |
| Constants       | SCREAMING_SNAKE_CASE      | `OPERATIONS_PAGE_SIZE`           |

**No default exports** for components or pages.

---

## Import Ordering

1. React built-ins (`useState`, `useEffect`, `lazy`, `Suspense`)
2. Third-party: react-router → dayjs → lucide-react → tanstack/react-query
3. `@/constants/*`
4. `@/utils/*`
5. `@/api/*`
6. `@/hooks/*`
7. `@/components/*`
8. Relative: `./types`, `./helpers`

---

## API Layer

- Each API domain has its **own `axios.create()`** instance — no shared instance
- Auth token injected in `interceptors.request` from `localStorage`
- On 401 / network error: dispatch the custom `'unauthorized'` DOM event (with a 5-second deduplication flag `_unauthorizedPending`) — do **not** call logout or navigate directly from an interceptor
- Functions are plain top-level `async function`s — no classes
- Return `response.data.model` (Black / Mantyz) or `response.data.data` (CreditHub)
- GET params passed as `{ params: { ... } }`
- All env vars via `import.meta.env.VITE_*`

---

## State Management

- **TanStack Query** for all server/async state — no Redux, Zustand, or global Context for server data
- `QueryClient` config: `refetchOnWindowFocus: false`, `retry: false`
- `queryKey` pattern: `[resourceName, ...params]` — e.g. `['operations', page, search]`
- Local UI state: `useState` (pagination, search string)
- Persisted client state: `useLocalStorage<T>(key, initialValue)` custom hook
- For parallel homogeneous fetches: `useQueries`

---

## Routing

- React Router 7 with `<BrowserRouter>` → `<Routes>` / `<Route>`
- All pages **lazy-loaded** via `React.lazy()`
- Route table is a `RouteConfig[]` array — data-driven
- `Router` component acts as auth guard + layout wrapper (Sidebar / Header)
- Auth: unauthenticated → redirect to `/login`; authenticated on `/login` → redirect to `/`
- Route path constants: `src/constants/paths.ts`
- Dynamic path builders: `src/utils/paths.ts` (e.g. `getOperationPath(id)`)

---

## Component Patterns

- Generic components use TypeScript generics (`DataTable<T>`)
- Props typed in a co-located `types.ts`

---

## Provider Patterns

Three-file structure for every provider:

| File         | Responsibility                                             |
| ------------ | ---------------------------------------------------------- |
| `helpers.ts` | `createContext<State \| undefined>(undefined)`             |
| `types.ts`   | Provider props type + context state type                   |
| `index.tsx`  | Provider component; uses `useLocalStorage` for persistence |

The consuming hook lives in `src/hooks/use-<name>/index.ts` and throws a descriptive error if the context is `undefined`.

---

## Styling

- **Tailwind CSS 4**, CSS-first config in `src/main.css`
- **shadcn/ui** `new-york` style, `neutral` base color, CSS variables
- `cn()` from `@/lib/utils` (= `clsx` + `tailwind-merge`) for conditional class merging
- Dark / light / system theme: `ThemeProvider` toggles `dark` class on `<html>`
- Icons: `lucide-react` exclusively
- `prettier-plugin-tailwindcss` keeps class order consistent

---

## Error Handling

- **Unauthorized event system**: axios interceptors dispatch `CustomEvent('unauthorized')`, `UserProvider` listens with `window.addEventListener` — keeps API layer decoupled from auth state
- **Critical errors** (page's primary query fails): use `useEffect` watching `[isLoading, hasError, data]` to navigate away and show a toast
- **Partial errors** (secondary query fails): show a warning toast but continue rendering
- Login flow: Supabase auth → fetch Black token → fetch Mantyz token → store all three in localStorage

---

## Build & Tooling

- Build: `tsc -b && vite build` — TypeScript is checked before Vite bundles
- ESLint: flat config (`eslint.config.js`), `@typescript-eslint/no-explicit-any: 'off'` (intentional — untyped API fields)
