# FansET — Fansly-Style OnlyFans Clone Boilerplate

A monorepo starter kit for building an OnlyFans-style experience with a modern, mobile-first React frontend, an Express/Node.js API layer, and MongoDB-ready database utilities. All UI screens are inspired by the supplied reference screenshots, including a dark landing page, feed, profile, notifications, collections, messages, and billing flows.

## Repository structure

```
.
├── frontend/        # Vite + React single-page app with mock data and static routes
│   ├── public/
│   ├── src/
│   │   ├── components/   # Sidebar, Header, cards, shared form elements
│   │   ├── data/         # Mock creators, posts, collections, transactions
│   │   └── pages/        # Landing, Home, Profile, Messages, Collections, Add Card, Notifications
├── backend/         # Express server boilerplate with sample routes
│   └── src/
│       ├── routes/      # API routing examples returning mock data
│       └── server.js    # App bootstrap with security middleware
├── database/        # Mongo/Mongoose connection helpers
├── .gitignore
└── README.md
```

## Frontend (React + Vite)

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```

The React SPA is configured with React Router (`App.js`) and includes reusable components (`Sidebar`, `Header`, `PostCard`, `CreatorCard`, `FormInput`). Pages reflect the requested UI layouts, with mock data living in `src/data/mockData.js`. All forms include age-confirmation checkboxes, and footer legal links appear on every internal screen.

## Backend (Node.js + Express)

1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Configure environment (optional) by creating a `.env` file with `PORT` and `MONGODB_URI` if you need to override defaults.
3. Run in development mode with hot reloading:
   ```bash
   npm run dev
   ```
4. Run in production mode:
   ```bash
   npm start
   ```

The API exposes mock `/api/creators` and `/api/posts` endpoints. Security middleware (Helmet, CORS) and request logging (Morgan) are pre-wired. Database connectivity is deferred to the shared `database/connection.js` utility which targets MongoDB via Mongoose.

## Database utilities

The `database/connection.js` module provides `connectDatabase` and `disconnectDatabase` helpers with sane defaults (`mongodb://localhost:27017/fansly_clone`). Adjust the URI in your environment variables as needed.

## Testing & linting

* Frontend lint: `cd frontend && npm run lint`
* Backend lint: `cd backend && npm run lint`

No automated tests are bundled, but the directory structure is ready for Jest, Vitest, Supertest, or Cypress should you decide to extend the stack.

## Assets & accessibility

* Color palette: Fansly blue (`#00A3FF`), green accents (`#22C55E`), white/light gray surfaces, dark landing hero (`#000000`).
* Mobile-first design with responsive breakpoints and flex/grid layouts for all pages.
* Semantic headings, descriptive alt text, and focus-friendly controls across the mock UI.

> **Disclaimer:** This boilerplate ships with static/mock data only. No real authentication, billing, or streaming integrations are active.
