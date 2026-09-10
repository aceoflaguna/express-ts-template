# Express + TypeScript Starter Template

A minimal, production-leaning Express API scaffold with TypeScript and nodemon hot-reloading.

## Stack
- Express 4
- TypeScript 5 (strict mode)
- nodemon + ts-node (dev hot-reload, no manual rebuilds)
- helmet, cors, morgan (security/CORS/logging)
- dotenv (env vars)

## Getting started

```bash
npm install
cp .env.example .env
npm run dev        # starts on http://localhost:3000, auto-restarts on file changes
```

## Scripts
| Command | Description |
|---|---|
| `npm run dev` | Start dev server with nodemon (watches `src/**/*.ts`) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled JS from `dist/` (production) |
| `npm run type-check` | Type-check without emitting files |
| `npm run lint` | Run ESLint over `src/` |
| `npm run clean` | Remove `dist/` |

## Project structure
```
src/
  app.ts               # Express app config (middleware, routes) — no server binding, easy to test
  index.ts             # Entry point: loads env, starts HTTP server, graceful shutdown
  routes/              # Route definitions, grouped by resource
  controllers/         # Request handlers / business logic
  middlewares/         # errorHandler, asyncHandler, etc.
  types/               # Shared types (e.g. AppError classes)
```

## Sample endpoints
- `GET /` — status message
- `GET /api/health` — health check (uptime, timestamp)
- `GET /api/users` — list users
- `GET /api/users/:id` — get one user (404 if missing)
- `POST /api/users` — create user (400 if `name`/`email` missing), body: `{ "name": "...", "email": "..." }`

## Error handling
Throw `AppError` (or `NotFoundError` / `BadRequestError` from `src/types/errors.ts`) inside any route wrapped in `asyncHandler`, and the centralized `errorHandler` middleware will format the JSON response and set the right status code.

## Production build
```bash
npm run build
npm start
```
