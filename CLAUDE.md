# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Next.js (pages router) frontend for **ShareStock**, a personal stock-investing product. It is its own git repository nested inside the `stockholder/` umbrella directory; the backend it talks to is the sibling project `../fundamentus-consumer` (Koa API, expected on `http://localhost:4000` in development via `NEXT_PUBLIC_SHARE_API`).

## Commands

```bash
yarn dev                # next dev (http://localhost:3000)
yarn build              # production build
yarn start              # next start -p $PORT (PORT env var required)

yarn test               # jest (jsdom + testing-library)
yarn test:watch         # jest --watch
yarn test src/components/Button/Button.test.tsx   # single test file
yarn test -t "name"     # single test by name

yarn typecheck          # tsc --noEmit (what the pre-commit hook runs)
yarn ts-lint            # typecheck in --watch mode
yarn lint               # eslint --fix on src/**/*.{ts,tsx} + stylelint
yarn lint:js:check      # eslint without --fix
```

Husky pre-commit runs `ts-lint-commit-hook` (a full typecheck), so type errors block commits.

## Architecture

### Two data paths

Understanding which path a feature uses is the main thing to get right:

1. **Backend API** (`fundamentus-consumer`) — asset data, recommendations, user sector prefs. Plain `fetch`/axios calls to `${process.env.NEXT_PUBLIC_SHARE_API}/...` with a Firebase ID token as `Authorization: Bearer` header. These calls live in feature-level `requests.ts` files (e.g. `src/features/goals/InvestmentPercentages/requests.ts`) and data hooks (e.g. `src/hooks/useAssetTableData.tsx`).
2. **Firestore directly** (client SDK) — user-scoped writes/reads such as goals and per-user sector lists. Goes through the wrapper in `src/firebase/Firestore.tsx` (`Firestore().setData/getData` with `{ collection, id, item }`), never through the backend.

### Auth

- Firebase Auth, initialized lazily in `src/firebase/index.ts` from `NEXT_PUBLIC_FIREBASE_*` env vars (client config, not secret; see `.env.development`).
- `src/hooks/useFirebaseAuth.tsx` subscribes to auth state and writes the ID token to an `accessToken` cookie (1h max-age).
- `src/context/AuthUserContext.tsx` (`AuthUserProvider`, `useAuth()`) wraps the whole app in `_app.tsx` and handles redirecting unauthenticated users. Provider nesting in `_app.tsx`: `AuthUserProvider > UserDataProvider > SnackbarProvider`.

### Code organization

- `src/pages/` — routes only; thin wrappers around feature components. Asset-class pages are nested (e.g. `src/pages/invest/{stocks,reits,bonds,crypto,international}/`, `src/pages/indicators/{stocks,reits}/`).
- `src/features/<feature>/<Component>/` — feature UI with co-located hooks (`hooks/`), API calls (`requests.ts`, `firebase.ts`), and styles. Features: dashboard, goals, strategy, indicators, my-assets, login, definitions.
- `src/components/` — shared presentational components (AssetTable, Modal, Text, Navbar, etc.).
- `src/builders/` — pure calculation logic (asset percentages, points).
- `src/context/` — React contexts (auth, user data, invest flow, steps, wishlist).
- `src/const/` — asset-type enums, table columns, navbar config, definitions copy.

### Conventions

- Path aliases (defined in `tsconfig.json`, mirrored into jest via `pathsToModuleNameMapper`): `@components/*`, `@features/*`, `@hooks/*`, `@context/*`, `@builders/*`, `@const/*`, `@styles/*`, `@layout/*`, and notably `@firebaseLocal/*` → `src/firebase/*`.
- Styling is styled-components v5 (in `*.styles.ts` / `styles.ts` files) plus MUI components; stylelint lints the styled-components CSS inside ts/tsx files.
- User-facing notifications use notistack snackbars (`useSnackbar`), not `alert()`.
- ESLint uses flat config (`eslint.config.cjs`); the legacy `.eslintrc.js` is superseded.
