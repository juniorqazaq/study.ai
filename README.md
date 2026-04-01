# Study.ai

Study.ai is a full-stack learning platform for turning uploaded study material into interactive learning flows. The project combines a React frontend with an Express + Prisma backend to support authentication, book uploads, AI-assisted lessons, quizzes, flashcards, notes, and mind maps.

## Why This Project Exists

Traditional study tools are fragmented: one place for notes, another for flashcards, another for summaries, and another for file storage. Study.ai brings those workflows into one product so a user can upload material once and move through multiple study modes from the same content source.

## Core Features

- Authentication with email/password plus Google and GitHub OAuth support
- Book and file upload flows
- Library experience for browsing uploaded learning materials
- AI-assisted lesson generation and chat support
- Study modes for quiz, flashcards, notes, mind maps, fill-in-the-blanks, and written questions
- Frontend API layer for auth, books, uploads, and lessons
- Prisma-backed backend with structured routing and validation

## Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- TanStack Query
- Axios
- Tailwind CSS
- Radix UI

### Backend

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- Zod
- JWT auth
- Multer for uploads

### AI / Integrations

- Google Gemini
- Google OAuth
- GitHub OAuth

## Repository Structure

```text
.
├── src/                    # Frontend application
│   ├── components/         # Shared UI and layout components
│   ├── pages/              # Route-level pages and study modes
│   ├── shared/             # API clients, hooks, utils, and shared logic
│   └── services/           # Frontend service integrations
├── backend/                # Express + Prisma backend
│   ├── prisma/             # Prisma schema and migrations
│   └── src/
│       ├── auth/           # Auth routes, services, schemas, middleware
│       ├── books/          # Book routes and serializers
│       ├── files/          # Upload handling
│       ├── lessons/        # Lesson generation and lesson endpoints
│       ├── config/         # Environment loading
│       ├── core/           # Core errors and helpers
│       ├── database/       # Prisma client
│       └── platform/       # Shared middleware
└── README.md
```

## Getting Started

### 1. Install dependencies

Frontend:

```bash
npm install
```

Backend:

```bash
cd backend
npm install
```

### 2. Configure environment variables

Create `backend/.env` and define:

```env
PORT=8000
NODE_ENV=development
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/study_ai
JWT_SECRET=replace-with-at-least-32-characters
JWT_REFRESH_SECRET=replace-with-at-least-32-characters
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_REDIRECT_URI=http://localhost:8000/auth/github/callback
FRONTEND_ORIGIN=http://localhost:5173
GEMINI_API_KEY=
```

Notes:

- `DATABASE_URL`, `JWT_SECRET`, `JWT_REFRESH_SECRET`, `GITHUB_REDIRECT_URI`, and `FRONTEND_ORIGIN` are required
- Google, GitHub, and Gemini values can stay empty if you are not using those integrations locally
- The backend validates env values on startup with Zod

### 3. Run database setup

```bash
cd backend
npm run db:generate
npm run db:migrate
```

### 4. Start the backend

```bash
cd backend
npm run dev
```

The backend runs on `http://localhost:8000` by default.

### 5. Start the frontend

```bash
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Available Scripts

### Frontend

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

### Backend

```bash
cd backend
npm run dev
npm run build
npm run start
npm run db:generate
npm run db:migrate
npm run db:studio
```

## Application Flow

1. User signs in with email/password or OAuth
2. User uploads or selects a book/resource
3. Backend stores metadata and uploaded assets
4. Study modes consume book and lesson APIs
5. AI services generate learning content such as lessons, notes, or question flows

## API Surface

The backend is organized around these main areas:

- `/auth` for authentication and OAuth flows
- `/books` for book CRUD and library-related actions
- `/books/:bookId/upload` and related upload paths for file handling
- lesson-related endpoints under the lessons module
- `/health` for health checks

## Production README Principles

Strong projects usually keep their README practical and honest. A good README should:

- explain what the product does in one clear paragraph
- show how to run it locally without guessing
- document required environment variables
- describe the folder structure and major modules
- list the important scripts
- avoid marketing text that says a lot but explains little
- stay updated when architecture changes

This README is written in that style: focused on setup, architecture, and developer onboarding.

## Current Gaps

- No automated test commands are documented yet
- Deployment instructions are not added yet
- API endpoint reference is still high-level, not full OpenAPI-style documentation

## Contributing

When contributing:

- keep commits focused and readable
- update documentation when behavior changes
- prefer small, reviewable pull requests

## License

No license has been defined in this repository yet.
