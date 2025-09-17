# FansET — Creator subscription platform starter

FansET is a full-stack starter kit for building a modern creator subscription experience. The Vite + React frontend ships with a
Fansly-inspired interface restyled for the FansET brand, while the Express backend exposes real authentication endpoints,
creator discovery data, and Mongo-ready database utilities.

## Repository structure

```
.
├── frontend/        # React single-page application powered by Vite
│   ├── src/components/   # Sidebar, Header, PostCard, shared form elements and route guards
│   ├── src/context/      # Auth provider with JWT-aware session persistence
│   ├── src/pages/        # Landing, Home, Profile, Messages, Collections, Billing, Notifications
│   ├── src/services/     # API client used across the app
│   └── src/data/         # Fallback content used when the API is offline
├── backend/         # Express server with JWT auth routes and content endpoints
│   └── src/
│       ├── controllers/  # Auth + content handlers
│       ├── middleware/   # JWT verification middleware
│       ├── models/       # Mongoose user schema
│       └── routes/       # API router composition
├── database/        # MongoDB connection helpers
└── README.md
```

## Frontend (React + Vite)

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. (Optional) point the SPA at a different API host by creating a `.env` file with `VITE_API_BASE_URL`. The default is
   `http://localhost:5000/api`.
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Build for production:
   ```bash
   npm run build
   ```

Key features:
- Landing page now ships with a FansET branded signup/login panel wired to the backend authentication endpoints.
- Auth state is provided via `AuthContext`, persisted in `localStorage`, and consumed through a `useAuth` hook.
- App routes beyond the landing screen are protected with `ProtectedRoute` and only render for authenticated users.
- Home feed fetches creators and posts from the backend with graceful fallbacks to the mock data bundle when offline.

## Backend (Node.js + Express)

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Create a `.env` file (optional) to override defaults:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/fanset
   JWT_SECRET=super-secret-token
   JWT_EXPIRES_IN=7d
   ```
3. Run in development mode with hot reloading:
   ```bash
   npm run dev
   ```
4. Run in production mode:
   ```bash
   npm start
   ```

### API overview

| Method | Endpoint          | Description                                    |
| ------ | ----------------- | ---------------------------------------------- |
| POST   | `/api/auth/register` | Create a new account, returning a JWT + profile |
| POST   | `/api/auth/login`    | Sign in with email/username + password        |
| GET    | `/api/auth/me`       | Fetch the authenticated user (requires token) |
| GET    | `/api/creators`      | Discover featured FansET creators             |
| GET    | `/api/posts`         | Pull the curated FansET home feed             |

All authenticated requests expect a `Bearer <token>` header. Passwords are hashed with `bcryptjs` and JWTs are signed with the
configurable `JWT_SECRET`.

## Database utilities

`database/connection.js` exposes `connectDatabase` and `disconnectDatabase` helpers. By default the API targets
`mongodb://localhost:27017/fanset`. Update `MONGODB_URI` in your environment to point at another instance.

## Testing & linting

- Frontend lint: `cd frontend && npm run lint`
- Backend lint: `cd backend && npm run lint`

## Design tokens & accessibility

- Primary palette: FansET blue (`#00A3FF`), emerald accents (`#22C55E`), deep night background (`#020617`).
- Landing layout embraces large typography, glassmorphism panels, and high-contrast CTAs.
- Components include descriptive aria labels, keyboard-friendly controls, and minimum 18+ confirmation checkboxes where
  required.

> **Disclaimer:** No real billing or streaming integrations are present. The stack focuses on auth, layout, and data flow
plumbing so you can extend it to production use cases.
