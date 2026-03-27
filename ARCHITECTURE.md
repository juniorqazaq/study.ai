# Study.ai Code Architecture & Introduction

## 🌟 Introduction
Study.ai is a modern React application built using Vite and TypeScript. It serves as an AI-powered learning platform that helps students transform learning materials into interactive study tools (flashcards, quizzes, mind maps, etc.).

## 🛠️ Technology Stack
- **Core:** React 18, TypeScript, Vite
- **Routing:** React Router DOM v6
- **Styling:** Tailwind CSS, shadcn/ui, Radix UI Primitives
- **State Management & Data Fetching:** TanStack Query (React Query)
- **Authentication:** React OAuth Google
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Forms & Validation:** React Hook Form
- **Charts:** Recharts

## 📂 Project Structure
The source code is primarily located in the `src/` directory. Here is a breakdown of the folder structure:

```text
src/
├── assets/         # Static assets like images, SVGs, and logos.
├── components/     # Reusable React components.
│   ├── landing/    # Landing page specific sections (Hero, Features, etc.)
│   ├── layout/     # Global layout wrappers (Header, Footer, LiquidBackground)
│   ├── study/      # Components specific to the study modes (MindMap, Flashcard)
│   └── ui/         # Base UI components (shadcn/ui elements like buttons, inputs)
├── context/        # React Context providers (e.g., SidebarContext)
├── lib/            # Utility functions (e.g., tailwind merge utility `utils.ts`)
├── pages/          # Top-level Page components corresponding to routes.
│   ├── auth/       # Authentication-related pages (Login, Register)
│   └── mindmap/    # Mindmap specific layouts and components
├── services/       # External API integrations (e.g., Gemini AI services)
├── shared/         # Shared code across the app.
│   ├── api/        # Axios instances, API client, and endpoint definitions
│   ├── data/       # Mock data or static data definitions
│   ├── hooks/      # Custom React hooks (e.g., useCurrentUser)
│   └── types/      # TypeScript interfaces and type definitions
├── App.tsx         # Main application component and routing configuration
├── main.tsx        # Application entry point, rendering the root component
└── globals.css     # Global CSS styles including Tailwind imports and CSS variables
```

## 🗺️ Core Routing & Application Flow (`App.tsx`)

The application flow is divided into clear sections:

### 1. Public & Marketing Pages
- `/` - `LandingPage`: The main entry point for unauthenticated visitors.
- `/pricing`, `/features`, `/how-it-works`, `/resources`: Marketing and informational pages.

### 2. Authentication Flow
- `/login` & `/register`: Standard user authentication screens.
- `/email-verification-sent`: Post-registration step.

### 3. Primary User Dashboard
- `/library`: The main hub redirect (from `/dashboard`). Displays all uploaded/saved books.
- `/upload`: Drag-and-drop interface for uploading new study materials.
- `/progress` & `/statistics`: Global analytics and user progress.
- `/profile`: User settings.

### 4. Specialized Study Modes (The Core Feature)
Every piece of study material (referred to as a "book") gets a dedicated set of study mode routes under `/book/:bookId/`:
- `.../quiz`: Adaptive multiple-choice quizzes.
- `.../mindmap`: A visual node-based representation of the material.
- `.../flashcards`: Spaced-repetition flashcard view.
- `.../open-questions`: Text-based written questions.
- `.../notes-mode`: Extensive note-taking and editor.
- `.../fill-blanks`: Fill-in-the-blank comprehension tests.

## 🎨 Design System
The application makes heavy use of **Dark Mode** by default (`#0A0A0A` background) and utilizes **glassmorphism** logic (backdrop-blur) specifically around headers and interactive components. App-wide theming and fundamental styling variables are defined in `globals.css` and `tailwind.config.js`.
