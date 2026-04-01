# Backend plan — Study.ai (ai-studybook)

This document is generated from the **current frontend codebase** (`src/`). It lists what the app actually calls, what is mocked locally, and a **recommended** production backend shape so the rest of the product (library, uploads, AI study modes) can persist data server-side.

---

## Step 1 — Frontend analysis

### 1. All HTTP calls found

| Source | Method | URL / path | Request body | Expected response |
|--------|--------|------------|--------------|-------------------|
| `src/shared/api/endpoints/auth.api.ts` → `login()` | POST | `{baseURL}/auth/login` | `{ email: string, password: string }` (`LoginCredentials`) | `{ accessToken: string, refreshToken: string, message?: string }` (`TokenResponse`) |
| Same → `signup()` | POST | `{baseURL}/auth/register` | `{ email: string, fullName: string, password: string }` (`SignUpCredentials`) | `TokenResponse` |
| Same → `googleLogin()` | POST | `{baseURL}/auth/google` | `{ id_token: string }` — **note:** `LoginPage` / `RegisterPage` pass `tokenResponse.access_token` from `@react-oauth/google`, not a true ID token; backend should accept the Google OAuth access token the client sends today or the client should be fixed to send `credential` (JWT) | `GoogleLoginResponse` (extends `TokenResponse`) |
| Same → `githubLogin()` | POST | `{baseURL}/auth/github` | `{ code: string }` — authorization code from GitHub redirect (`LoginPage` reads `?code=` and calls this) | `GithubLoginResponse` (extends `TokenResponse`) |
| Same → `phoneLogin()` | POST | `{baseURL}/auth/phone-login` | `{ idToken: string }` | `PhoneLoginResponse` (extends `TokenResponse`) — **not used anywhere in UI** |
| `src/shared/util/errorHandler.ts` | POST | **`/api/errors`** (relative to **page origin**, not `VITE_API_URL`) | JSON: `{ message, stack?, componentStack?, timestamp, url?, userAgent? }` (`ErrorInfo`) | Not specified (fire-and-forget) |

**Axios configuration** (`src/shared/api/axiosInstance.ts`):

- `baseURL`: `import.meta.env.VITE_API_URL || 'http://localhost:8000'`
- Default header: `Content-Type: application/json`
- `withCredentials: true`
- On each request: `Authorization: Bearer <token>` if `js-cookie` cookie `token` is set
- On 401: clears cookies `token` and `user`, redirects to `/` unless path is `/event/*` (only `window.location.pathname` check)

**Important:** Email/password **login** and **register** forms (`LoginPage`, `RegisterPage`) do **not** call `login()` / `signup()`; they use `setTimeout` mocks and set a fake `mock_token_*` plus `storageService.saveUser`. Only **Google** (and **GitHub** on login callback) use the real API helpers.

---

### 2. Authentication & authorization

| Topic | What the code does |
|-------|---------------------|
| **Login/register fields** | Email + password; register also collects `fullName` and terms checkbox (client-side only). |
| **Token storage** | JWT-like string in cookie `token`; user JSON in cookie `user` (`getCurrentUser()` reads from cookie, not GET `/users/me`). |
| **Refresh** | `TokenResponse` includes `refreshToken`, but **no refresh endpoint or usage** exists in the frontend. |
| **OAuth** | Google via `@react-oauth/google` (`GoogleOAuthProvider` in `main.tsx` uses placeholder `YOUR_GOOGLE_CLIENT_ID_PLACEHOLDER`). GitHub OAuth: hardcoded `client_id` `Ov23lieKTVcp8Gu4LbHy`, redirect `http://localhost:5173/login`. |
| **Protected routes** | **No** React Router guards in `App.tsx`; protection is implicit (sidebar on most app routes). |
| **Roles** | **No** admin/user roles in frontend types. |
| **Implied auth** | **Bearer JWT** in `Authorization` header + cookies; **session cookies** possible because `withCredentials: true` (backend can issue `Set-Cookie` if desired). |

---

### 3. Data models (from types & usage)

| Entity / shape | Fields (as in code) | Where it lives today |
|----------------|---------------------|----------------------|
| **User** | `id`, `fullName`, `email` | `src/shared/types/auth.ts`; cookies + `localStorage` via `storageService` |
| **UserSettings** | `userId`, `theme`, `language`, `notificationsEnabled` | Typed only — not wired to API |
| **FileMetadata** | `id`, `name`, `type`, `size`, `status`, `progress`, `uploadedAt` | `storageService` + `UploadPage` simulation |
| **Book** (library UI) | `id`, `title`, `author`, `type`, `size`, `uploadedAt`, `progress`, `tone` | Derived from `FileMetadata` in `LibraryPage` |
| **Book** (`src/types.ts`) | `id`, `title`, `author`, `progress`, `totalSize`, `dateAdded`, `coverColor`, `type` | Legacy/global type; not all fields used everywhere |
| **LessonContent** | `bookId`, `title`, `subject`, `notes`, `questions`, `flashcards` | `lessonsData` in `src/shared/data/lessonData.ts` is `{}` — empty |
| **QuizQuestion** | `id`, `question`, `options[{id,text}]`, `correctId` | Local/demo |
| **Flashcard** | `id`, `front`, `back` | Local |
| **MindMapNode** | `id`, `label`, `x`, `y`, `color`, `children?` | Local |
| **UserStats** | `booksCompleted`, `averageScore`, `totalStudyTime`, `dayStreak` | Mocked via `storageService.getStats()` |

---

### 4. File uploads

- **UI:** `UploadPage` supports tabs: files, URL, GitHub — file list is **client-side** with simulated progress; **no** `FormData` or upload URL to a server.
- **Backend implication:** Future endpoints should accept multipart uploads (PDF, EPUB, TXT, DOCX, PPTX, images) and optionally URL/GitHub import jobs.

---

### 5. Real-time features

- **None** found: no `WebSocket`, `EventSource`, or explicit polling for APIs.

---

### 6. Third-party services

| Service | Usage |
|---------|--------|
| **Google Gemini** | `src/services/gemini.ts` — `@google/genai` with `import.meta.env.VITE_GOOGLE_API_KEY`, model `gemini-2.0-flash-exp`. Runs **in the browser**; not proxied through your backend today. |
| **Google OAuth** | `@react-oauth/google` for sign-in; tokens sent to your backend at `/auth/google`. |
| **GitHub OAuth** | Browser redirect + code exchange expected on backend at `/auth/github`. |
| **Newsletter** | `NewsletterSignup` only `console.log`s after delay — **no** HTTP API. |

---

## Step 2 — Backend structure

### 1. Project folder structure (recommended)

Node.js + **Express** fits the existing axios client and JWT-style responses. Alternative: **Fastify** or **Hono** with the same route list.

```
backend/
├── src/
│   ├── server.ts
│   ├── app.ts
│   ├── config/
│   │   └── env.ts
│   ├── routes/
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   ├── users.routes.ts
│   │   ├── books.routes.ts
│   │   ├── files.routes.ts
│   │   ├── lessons.routes.ts
│   │   └── errors.routes.ts
│   ├── controllers/
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── google-oauth.service.ts
│   │   ├── github-oauth.service.ts
│   │   └── gemini-proxy.service.ts   # optional: move AI server-side
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── upload.middleware.ts
│   ├── utils/
│   └── validation/
├── prisma/
│   └── schema.prisma
├── .env.example
├── package.json
└── tsconfig.json
```

---

### 2. REST API endpoints

#### Implemented / implied by frontend client (`auth.api.ts` + error reporting)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/login` | No | Email/password login; returns `accessToken`, `refreshToken` |
| POST | `/auth/register` | No | Register with `email`, `fullName`, `password` |
| POST | `/auth/google` | No | OAuth; body `{ id_token }` — align with actual token type sent from client |
| POST | `/auth/github` | No | GitHub OAuth code exchange; body `{ code }` |
| POST | `/auth/phone-login` | No | Reserved; body `{ idToken }` (unused in UI) |
| POST | `/auth/refresh` | No* | **Recommended:** refresh access token (not in frontend yet) |
| POST | `/api/errors` | No | Client error reporting (`errorHandler` in production; **same origin** as SPA or configure Vite proxy — see §7) |

\* Typically refresh uses refresh token in body or httpOnly cookie.

#### Recommended for full parity with Library / Upload / study modes (not yet called by frontend)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/users/me` | Yes | Return current user (optional: migrate off cookie-only `user`) |
| PATCH | `/users/me` | Yes | Update profile (`fullName`, etc.) |
| GET/PATCH | `/users/me/settings` | Yes | `UserSettings` |
| GET | `/books` | Yes | List books for user |
| GET | `/books/:bookId` | Yes | Book detail |
| POST | `/books` | Yes | Create book metadata (after upload) |
| DELETE | `/books/:bookId` | Yes | Remove book |
| POST | `/books/:bookId/files` | Yes | Multipart upload or presigned URL flow |
| GET/PATCH | `/books/:bookId/lessons` | Yes | `LessonContent` |
| POST | `/books/:bookId/process` | Yes | Trigger processing (extract text, generate notes) |
| GET | `/stats` | Yes | Aggregate stats (`UserStats`-like) |

Use a consistent prefix if you prefer (e.g. mount everything under `/v1` and set `VITE_API_URL=http://localhost:8000/v1`); the current client uses **no** `/api` prefix for auth.

---

### 3. Database schema (Prisma)

Illustrative schema tying **User**, **OAuth identities**, **books**, **files**, and **lesson** content. Adjust IDs and enums to taste.

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum AuthProvider {
  EMAIL
  GOOGLE
  GITHUB
}

model User {
  id           String   @id @default(cuid())
  email        String   @unique
  passwordHash String?  // null for OAuth-only users
  fullName     String
  emailVerified DateTime?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  settings     UserSettings?
  accounts     OAuthAccount[]
  books        Book[]
  refreshTokens RefreshToken[]
}

model OAuthAccount {
  id         String   @id @default(cuid())
  userId     String
  provider   AuthProvider
  providerId String
  user       User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerId])
}

model RefreshToken {
  id        String   @id @default(cuid())
  userId    String
  tokenHash String   @unique
  expiresAt DateTime
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model UserSettings {
  userId               String  @id
  theme                String  @default("system")
  language             String  @default("en")
  notificationsEnabled Boolean @default(true)
  user                 User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Book {
  id          String   @id @default(cuid())
  userId      String
  title       String
  author      String?
  type        String   // pdf, epub, txt, etc.
  progress    Int      @default(0)
  totalSize   String?
  coverColor  String?
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  files       FileAsset[]
  lesson      Lesson?
}

model FileAsset {
  id         String   @id @default(cuid())
  bookId     String
  name       String
  mimeType   String?
  sizeBytes  BigInt?
  storageKey String   // S3 key or local path
  status     String   @default("processing") // uploading | processing | success | error
  book       Book     @relation(fields: [bookId], references: [id], onDelete: Cascade)
}

model Lesson {
  bookId    String @id
  title     String
  subject   String?
  notes     String  @db.Text
  book      Book    @relation(fields: [bookId], references: [id], onDelete: Cascade)
  questions Json    // QuizQuestion[]
  flashcards Json   // Flashcard[]
}
```

---

### 4. Environment variables

```env
# Server
PORT=8000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/study_ai

# JWT
JWT_SECRET=
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=
JWT_REFRESH_EXPIRES_IN=7d

# OAuth — Google (verify ID tokens or exchange access tokens per your implementation)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# GitHub OAuth
GITHUB_CLIENT_ID=Ov23lieKTVcp8Gu4LbHy
GITHUB_CLIENT_SECRET=
GITHUB_OAUTH_REDIRECT_URI=http://localhost:5173/login

# CORS
FRONTEND_ORIGIN=http://localhost:5173

# Optional: proxy AI server-side instead of VITE_GOOGLE_API_KEY in browser
GOOGLE_GENAI_API_KEY=

# File storage
STORAGE_PROVIDER=local
# S3_BUCKET=  S3_REGION=  AWS_ACCESS_KEY_ID=  AWS_SECRET_ACCESS_KEY=
```

Frontend (existing):

```env
VITE_API_URL=http://localhost:8000
VITE_GOOGLE_API_KEY=   # only if keeping Gemini in browser
```

---

### 5. Middleware list

| Middleware | Purpose |
|------------|---------|
| **CORS** | Allow `FRONTEND_ORIGIN` (and credentials if using cookies cross-site) |
| **Helmet** | Security headers |
| **express.json** | Parse JSON bodies |
| **Cookie parser** | If using httpOnly refresh cookies |
| **JWT verify** | Protect `/users/*`, `/books/*`, etc. — read `Authorization: Bearer` |
| **Rate limiting** | Auth routes + `/api/errors` |
| **Multer / busboy** | Multipart uploads for `FileAsset` |
| **Zod** (or Joi) | Validate `LoginCredentials`, `SignUpCredentials`, OAuth bodies, book payloads |
| **Error handler** | Map errors to `{ message }` shape expected by `errorHandler.ts` (`error.response?.data?.message`) |

---

### 6. Tech stack recommendation

| Layer | Recommendation | Rationale |
|-------|----------------|-----------|
| Runtime | **Node.js 20+** | Matches ecosystem; Bun optional |
| Framework | **Express** | Simple mapping to current client |
| Database | **PostgreSQL** | Relational fits users, books, lessons, file metadata |
| ORM | **Prisma** | Schema migrations, type-safe queries |
| Auth | **JWT** access + refresh (opaque or JWT refresh) | Matches `TokenResponse`; add refresh route |
| Passwords | **argon2** | If implementing `/auth/login` |
| OAuth | **google-auth-library**, GitHub token exchange | Verify Google token; exchange `code` for GitHub |
| Validation | **Zod** | Align with TypeScript types in `src/shared/types/auth.ts` |
| File storage | **S3-compatible** or local disk | Upload page will need real storage for production |

---

### 7. Frontend API base URL & CORS

| Setting | Value |
|---------|--------|
| **Axios base URL** | Set `VITE_API_URL` to your API root, e.g. `http://localhost:8000` (no trailing slash). Default in code is already `http://localhost:8000`. |
| **CORS** | Allow origin `http://localhost:5173` (Vite dev). For production, set to your deployed SPA origin. **`credentials: true`** is enabled on the client — server must respond with `Access-Control-Allow-Credentials: true` and a **specific** origin (not `*`) if you rely on cookies. |
| **`POST /api/errors` mismatch** | This uses a **relative** URL, so in dev it hits **Vite** (`http://localhost:5173/api/errors`), not `VITE_API_URL`. Either: add a **Vite proxy** (`vite.config.ts` `server.proxy['/api'] → http://localhost:8000`), or change the client to `fetch(\`${import.meta.env.VITE_API_URL}/api/errors\`)`, or mount error reporting at the same host as the API. |

---

## Summary

- **Real HTTP integration today:** OAuth helpers (`/auth/google`, `/auth/github`), plus optional production **`/api/errors`** on the SPA origin.
- **Defined but unused in UI:** `login`, `signup`, `phoneLogin` in `auth.api.ts`; email/password flows are **mocked** in pages.
- **Study features** (library, upload, flashcards, quizzes, mind map, Gemini) use **localStorage**, **empty `lessonsData`**, or **direct Gemini** — a backend should add persistence and optionally proxy AI calls.

This file is the single source for scaffolding the server to match **this** repository’s contracts and gaps.
