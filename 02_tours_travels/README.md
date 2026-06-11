# Sukh Travels 🧭

A production-ready tours & travel booking app built with **Next.js 16** (App
Router, React 19), **MongoDB/Mongoose**, **Redux Toolkit**, **Tailwind CSS v4**
and cookie-based JWT auth.

## Features

- 🔐 **Real authentication** — bcrypt password hashing, JWT in an httpOnly
  cookie, Edge middleware route protection, server-side Zod validation.
- 🗺️ **Destinations** — server-rendered listings, per-destination detail pages
  with `generateStaticParams`, filtering by region (Indian Escapes / Global
  Journeys).
- 🛒 **Cart** — Redux Toolkit slice with add / remove / clear and totals.
- 🎛️ **3D UI** — cursor-reactive tilt cards and a rotating 3D destination ring
  (pure CSS + Motion, no WebGL).
- 🛡️ **Hardened** — security headers, resilient DB layer (won't crash a build
  when the DB is offline), consistent API envelope, no client-leaking errors.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in MONGODB_URI and JWT_SECRET
npm run seed                 # load sample destinations (needs MONGODB_URI)
npm run dev
```

Open http://localhost:3000.

## Environment

See [.env.example](.env.example). Required: `MONGODB_URI`, `JWT_SECRET`.

## Scripts

| Script              | Description                              |
| ------------------- | ---------------------------------------- |
| `npm run dev`       | Start the dev server (Turbopack).        |
| `npm run build`     | Production build.                        |
| `npm run start`     | Run the production build.                |
| `npm run lint`      | ESLint.                                  |
| `npm run typecheck` | `tsc --noEmit` type check.               |
| `npm run seed`      | Upsert sample destinations into MongoDB. |

## Project structure

```
app/                 App Router routes, layouts, API (app/api/v1/*)
  (auth)/            sign-in, sign-up
  (user)/            destinations, collections, cart, dashboard, settings, …
backend/
  config/            mongoose connection (cached, fail-fast)
  data/              seed dataset
  model/             Mongoose schemas
  services/          DB access (resilient reads + user create/auth)
components/          UI + components/three-d/* (TiltCard, Hero3DCarousel)
context/ hooks/      Auth context + useAuth
lib/                 env, password (bcrypt), jwt (jose), session, api helpers
redux/               store + cart slice
schemas/             shared Zod schemas (client + server)
middleware.ts        Edge auth guard
```

## Auth flow

1. **Register** → `POST /api/v1/users` (Zod-validated, bcrypt-hashed, `role`
   forced server-side).
2. **Login** → `POST /api/v1/auth/login` verifies the hash and sets an httpOnly
   `auth_token` cookie.
3. **Session** → `GET /api/v1/auth/me` reads the cookie; `middleware.ts` guards
   `/dashboard` and `/settings`.
4. **Logout** → `POST /api/v1/auth/logout` clears the cookie.
