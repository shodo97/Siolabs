# SioLabs Project Structure
## EPIC-05: Learning Experience (MVP)

**Document Version:** 1.0  
**Created:** January 27, 2026  
**Purpose:** Define folder organization, naming conventions, and module structure

---

## 1. Repository Overview

```
siolabs/
├── apps/
│   ├── web/                    # Next.js frontend application
│   └── api/                    # Node.js/Express backend API
├── packages/
│   ├── ui/                     # Shared UI components (if monorepo)
│   ├── types/                  # Shared TypeScript types
│   └── utils/                  # Shared utilities
├── docs/                       # Documentation (mirror of /Docs)
├── scripts/                    # Build and deployment scripts
├── .github/                    # GitHub Actions workflows
├── docker/                     # Docker configurations
└── infra/                      # Infrastructure as code (optional)
```

---

## 2. Frontend Structure (`apps/web/`)

```
apps/web/
├── public/
│   ├── fonts/                  # Custom font files
│   ├── images/                 # Static images
│   └── icons/                  # Favicon and app icons
│
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/             # Auth route group (login, register)
│   │   │   ├── login/
│   │   │   │   └── page.tsx
│   │   │   └── layout.tsx
│   │   │
│   │   ├── (learning)/         # Learning experience route group
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx
│   │   │   ├── courses/
│   │   │   │   ├── [courseId]/
│   │   │   │   │   ├── page.tsx           # Course overview
│   │   │   │   │   ├── modules/
│   │   │   │   │   │   └── [moduleId]/
│   │   │   │   │   │       ├── page.tsx   # Module view
│   │   │   │   │   │       └── lessons/
│   │   │   │   │   │           └── [lessonId]/
│   │   │   │   │   │               └── page.tsx
│   │   │   │   │   └── layout.tsx         # Course-level layout
│   │   │   │   └── page.tsx               # Course listing (if needed)
│   │   │   └── layout.tsx                 # Learning layout with nav
│   │   │
│   │   ├── api/                # API route handlers (if needed)
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing/redirect
│   │   ├── loading.tsx         # Global loading state
│   │   ├── error.tsx           # Global error boundary
│   │   ├── not-found.tsx       # 404 page
│   │   └── globals.css         # Global styles
│   │
│   ├── components/
│   │   ├── ui/                 # Base UI primitives (shadcn/ui)
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── skeleton.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── dropdown-menu.tsx
│   │   │   └── ... (shadcn components)
│   │   │
│   │   ├── layout/             # Layout components
│   │   │   ├── header.tsx
│   │   │   ├── sidebar.tsx
│   │   │   ├── footer.tsx
│   │   │   ├── breadcrumb.tsx
│   │   │   └── mobile-nav.tsx
│   │   │
│   │   ├── dashboard/          # Dashboard-specific components
│   │   │   ├── enrolled-courses.tsx
│   │   │   ├── course-card.tsx
│   │   │   ├── progress-ring.tsx
│   │   │   ├── continue-learning-cta.tsx
│   │   │   ├── upcoming-sessions.tsx
│   │   │   ├── session-card.tsx
│   │   │   └── last-activity.tsx
│   │   │
│   │   ├── course/             # Course-related components
│   │   │   ├── course-header.tsx
│   │   │   ├── course-info.tsx
│   │   │   ├── module-list.tsx
│   │   │   ├── module-accordion.tsx
│   │   │   └── course-progress-bar.tsx
│   │   │
│   │   ├── module/             # Module-related components
│   │   │   ├── module-header.tsx
│   │   │   ├── lesson-list.tsx
│   │   │   ├── lesson-item.tsx
│   │   │   ├── assignment-card.tsx
│   │   │   └── linked-sessions.tsx
│   │   │
│   │   ├── lesson/             # Lesson-related components
│   │   │   ├── video-player.tsx
│   │   │   ├── lesson-header.tsx
│   │   │   ├── lesson-objective.tsx
│   │   │   ├── resources-list.tsx
│   │   │   ├── resource-item.tsx
│   │   │   ├── mark-complete-button.tsx
│   │   │   ├── next-lesson-cta.tsx
│   │   │   └── lesson-navigation.tsx
│   │   │
│   │   ├── progress/           # Progress-related components
│   │   │   ├── progress-bar.tsx
│   │   │   ├── progress-indicator.tsx
│   │   │   ├── completion-badge.tsx
│   │   │   └── streak-counter.tsx (future)
│   │   │
│   │   ├── session/            # Live session components
│   │   │   ├── session-banner.tsx
│   │   │   ├── session-countdown.tsx
│   │   │   ├── join-button.tsx
│   │   │   └── recording-link.tsx
│   │   │
│   │   └── shared/             # Shared/generic components
│   │       ├── loading-spinner.tsx
│   │       ├── error-message.tsx
│   │       ├── empty-state.tsx
│   │       ├── confirmation-dialog.tsx
│   │       └── toast-notification.tsx
│   │
│   ├── hooks/                  # Custom React hooks
│   │   ├── use-auth.ts
│   │   ├── use-course.ts
│   │   ├── use-lesson.ts
│   │   ├── use-progress.ts
│   │   ├── use-video-player.ts
│   │   ├── use-sessions.ts
│   │   └── use-local-storage.ts
│   │
│   ├── lib/                    # Utility libraries
│   │   ├── api/                # API client functions
│   │   │   ├── client.ts       # Base API client (fetch wrapper)
│   │   │   ├── dashboard.ts    # Dashboard API calls
│   │   │   ├── courses.ts      # Course API calls
│   │   │   ├── modules.ts      # Module API calls
│   │   │   ├── lessons.ts      # Lesson API calls
│   │   │   ├── progress.ts     # Progress API calls
│   │   │   └── sessions.ts     # Session API calls
│   │   │
│   │   ├── utils/              # Utility functions
│   │   │   ├── cn.ts           # Class name merger (clsx + twMerge)
│   │   │   ├── date.ts         # Date formatting utilities
│   │   │   ├── duration.ts     # Duration formatting
│   │   │   ├── progress.ts     # Progress calculation helpers
│   │   │   └── validation.ts   # Form validation helpers
│   │   │
│   │   └── constants.ts        # App-wide constants
│   │
│   ├── stores/                 # Zustand stores
│   │   ├── auth-store.ts
│   │   ├── progress-store.ts
│   │   ├── video-store.ts
│   │   └── ui-store.ts
│   │
│   ├── types/                  # TypeScript type definitions
│   │   ├── api.ts              # API response types
│   │   ├── course.ts           # Course-related types
│   │   ├── lesson.ts           # Lesson-related types
│   │   ├── progress.ts         # Progress-related types
│   │   ├── session.ts          # Session-related types
│   │   └── user.ts             # User-related types
│   │
│   ├── providers/              # React context providers
│   │   ├── auth-provider.tsx
│   │   ├── query-provider.tsx
│   │   └── theme-provider.tsx
│   │
│   └── styles/                 # Additional styles
│       ├── themes/
│       │   └── default.css
│       └── components/
│           └── video-player.css
│
├── .env.local                  # Local environment variables
├── .env.example                # Environment template
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind configuration
├── tsconfig.json               # TypeScript configuration
├── components.json             # shadcn/ui configuration
└── package.json
```

---

## 3. Backend Structure (`apps/api/`)

```
apps/api/
├── src/
│   ├── index.ts                # Application entry point
│   ├── app.ts                  # Express app setup
│   │
│   ├── config/                 # Configuration
│   │   ├── index.ts            # Config aggregator
│   │   ├── database.ts         # Database config
│   │   ├── redis.ts            # Redis config
│   │   ├── cors.ts             # CORS settings
│   │   └── env.ts              # Environment validation
│   │
│   ├── routes/                 # Route definitions
│   │   ├── index.ts            # Route aggregator
│   │   ├── auth.routes.ts      # /api/auth/*
│   │   ├── dashboard.routes.ts # /api/dashboard
│   │   ├── courses.routes.ts   # /api/courses/*
│   │   ├── modules.routes.ts   # /api/modules/*
│   │   ├── lessons.routes.ts   # /api/lessons/*
│   │   ├── progress.routes.ts  # /api/progress/*
│   │   ├── sessions.routes.ts  # /api/sessions/*
│   │   └── assignments.routes.ts # /api/assignments/*
│   │
│   ├── controllers/            # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── dashboard.controller.ts
│   │   ├── courses.controller.ts
│   │   ├── modules.controller.ts
│   │   ├── lessons.controller.ts
│   │   ├── progress.controller.ts
│   │   ├── sessions.controller.ts
│   │   └── assignments.controller.ts
│   │
│   ├── services/               # Business logic
│   │   ├── auth.service.ts
│   │   ├── dashboard.service.ts
│   │   ├── courses.service.ts
│   │   ├── modules.service.ts
│   │   ├── lessons.service.ts
│   │   ├── progress.service.ts
│   │   ├── sessions.service.ts
│   │   ├── assignments.service.ts
│   │   └── cache.service.ts
│   │
│   ├── repositories/           # Data access layer
│   │   ├── user.repository.ts
│   │   ├── course.repository.ts
│   │   ├── module.repository.ts
│   │   ├── lesson.repository.ts
│   │   ├── progress.repository.ts
│   │   ├── session.repository.ts
│   │   └── assignment.repository.ts
│   │
│   ├── middleware/             # Express middleware
│   │   ├── auth.middleware.ts        # JWT verification
│   │   ├── error.middleware.ts       # Global error handler
│   │   ├── validation.middleware.ts  # Request validation
│   │   ├── rate-limit.middleware.ts  # Rate limiting
│   │   └── logging.middleware.ts     # Request logging
│   │
│   ├── validators/             # Request validation schemas
│   │   ├── auth.validator.ts
│   │   ├── course.validator.ts
│   │   ├── lesson.validator.ts
│   │   └── progress.validator.ts
│   │
│   ├── types/                  # TypeScript types
│   │   ├── express.d.ts        # Express type extensions
│   │   ├── api.types.ts        # API request/response types
│   │   └── domain.types.ts     # Domain model types
│   │
│   ├── utils/                  # Utility functions
│   │   ├── response.ts         # Standardized API responses
│   │   ├── errors.ts           # Custom error classes
│   │   ├── logger.ts           # Logging utility
│   │   ├── jwt.ts              # JWT helpers
│   │   └── pagination.ts       # Pagination helpers
│   │
│   └── db/                     # Database
│       ├── prisma/
│       │   ├── schema.prisma   # Prisma schema
│       │   ├── migrations/     # Database migrations
│       │   └── seed.ts         # Seed data
│       └── redis/
│           └── client.ts       # Redis client setup
│
├── tests/                      # Test files
│   ├── unit/
│   │   ├── services/
│   │   └── utils/
│   ├── integration/
│   │   └── routes/
│   └── fixtures/
│       └── data.ts
│
├── .env                        # Environment variables
├── .env.example                # Environment template
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest configuration
├── Dockerfile                  # Container definition
└── package.json
```

---

## 4. Database Schema Overview

### 4.1 Core Tables (Prisma Schema)

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id              String    @id @default(cuid())
  email           String    @unique
  name            String
  avatarUrl       String?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  enrollments     Enrollment[]
  lessonProgress  LessonProgress[]
  videoProgress   VideoProgress[]
}

model Course {
  id              String    @id @default(cuid())
  title           String
  description     String
  thumbnailUrl    String?
  durationMinutes Int
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  modules         Module[]
  enrollments     Enrollment[]
  sessions        LiveSession[]
}

model Module {
  id              String    @id @default(cuid())
  courseId        String
  title           String
  description     String?
  objective       String?
  order           Int
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  course          Course    @relation(fields: [courseId], references: [id])
  lessons         Lesson[]
  assignments     Assignment[]
  sessions        LiveSession[]
}

model Lesson {
  id              String    @id @default(cuid())
  moduleId        String
  title           String
  description     String?
  objective       String?
  videoUrl        String
  durationMinutes Int
  order           Int
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  module          Module    @relation(fields: [moduleId], references: [id])
  resources       Resource[]
  progress        LessonProgress[]
  videoProgress   VideoProgress[]
}

model Resource {
  id              String    @id @default(cuid())
  lessonId        String
  title           String
  type            ResourceType
  url             String
  createdAt       DateTime  @default(now())
  
  lesson          Lesson    @relation(fields: [lessonId], references: [id])
}

enum ResourceType {
  PDF
  SLIDE
  CODE
  LINK
  OTHER
}

model Enrollment {
  id              String    @id @default(cuid())
  userId          String
  courseId        String
  enrolledAt      DateTime  @default(now())
  
  user            User      @relation(fields: [userId], references: [id])
  course          Course    @relation(fields: [courseId], references: [id])
  
  @@unique([userId, courseId])
}

model LessonProgress {
  id              String    @id @default(cuid())
  userId          String
  lessonId        String
  completed       Boolean   @default(false)
  completedAt     DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  user            User      @relation(fields: [userId], references: [id])
  lesson          Lesson    @relation(fields: [lessonId], references: [id])
  
  @@unique([userId, lessonId])
}

model VideoProgress {
  id              String    @id @default(cuid())
  userId          String
  lessonId        String
  positionSeconds Int       @default(0)
  updatedAt       DateTime  @updatedAt
  
  user            User      @relation(fields: [userId], references: [id])
  lesson          Lesson    @relation(fields: [lessonId], references: [id])
  
  @@unique([userId, lessonId])
}

model Assignment {
  id              String    @id @default(cuid())
  moduleId        String
  title           String
  description     String
  dueDate         DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  module          Module    @relation(fields: [moduleId], references: [id])
}

model LiveSession {
  id              String    @id @default(cuid())
  courseId        String
  moduleId        String?
  title           String
  description     String?
  scheduledAt     DateTime
  durationMinutes Int
  joinUrl         String?
  recordingUrl    String?
  status          SessionStatus @default(SCHEDULED)
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
  
  course          Course    @relation(fields: [courseId], references: [id])
  module          Module?   @relation(fields: [moduleId], references: [id])
}

enum SessionStatus {
  SCHEDULED
  LIVE
  COMPLETED
  CANCELLED
}
```

---

## 5. Configuration Files

### 5.1 Environment Variables

```bash
# apps/web/.env.local
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# apps/api/.env
NODE_ENV=development
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/siolabs
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:3000
SENTRY_DSN=your_sentry_dsn
```

### 5.2 TypeScript Configuration (Frontend)

```json
// apps/web/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/hooks/*": ["./src/hooks/*"],
      "@/stores/*": ["./src/stores/*"],
      "@/types/*": ["./src/types/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

### 5.3 Tailwind Configuration

```javascript
// apps/web/tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // SioLabs brand colors
        brand: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        success: {
          DEFAULT: "#10b981",
          foreground: "#ffffff",
        },
        warning: {
          DEFAULT: "#f59e0b",
          foreground: "#ffffff",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

---

## 6. Naming Conventions

### 6.1 Files and Folders

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `CourseCard.tsx` |
| Pages (Next.js) | lowercase | `page.tsx`, `layout.tsx` |
| Hooks | camelCase with `use-` prefix | `use-progress.ts` |
| Utilities | kebab-case | `date-utils.ts` |
| Types | PascalCase | `Course.ts` (or inline) |
| Constants | SCREAMING_SNAKE_CASE | `API_ENDPOINTS.ts` |
| Backend routes | kebab-case | `courses.routes.ts` |
| Backend services | kebab-case | `courses.service.ts` |

### 6.2 Code Conventions

| Type | Convention | Example |
|------|------------|---------|
| React Components | PascalCase | `export function CourseCard()` |
| Functions | camelCase | `calculateProgress()` |
| Variables | camelCase | `const courseData` |
| Constants | SCREAMING_SNAKE_CASE | `const MAX_RETRIES = 3` |
| Types/Interfaces | PascalCase | `interface Course {}` |
| Enums | PascalCase | `enum SessionStatus {}` |
| CSS classes | kebab-case (Tailwind) | `bg-primary text-white` |

### 6.3 API Routes

| Endpoint | HTTP Method | Purpose |
|----------|-------------|---------|
| `/api/dashboard` | GET | Fetch dashboard data |
| `/api/courses` | GET | List enrolled courses |
| `/api/courses/:id` | GET | Course details |
| `/api/modules/:id` | GET | Module details |
| `/api/lessons/:id` | GET | Lesson details |
| `/api/lessons/:id/complete` | POST | Mark lesson complete |
| `/api/progress` | GET | User progress overview |
| `/api/sessions` | GET | Upcoming sessions |

---

## 7. Import Order Convention

For both frontend and backend, maintain this import order:

```typescript
// 1. External libraries (npm packages)
import React from 'react';
import { useQuery } from '@tanstack/react-query';

// 2. Internal absolute imports (using @/ alias)
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';

// 3. Relative imports
import { CourseCard } from './course-card';

// 4. Types (if separate)
import type { Course } from '@/types/course';

// 5. Styles (if applicable)
import './styles.css';
```

---

## 8. Git Branch Strategy

```
main                    # Production-ready code
├── develop             # Integration branch
│   ├── feature/EPIC05-dashboard
│   ├── feature/EPIC05-course-view
│   ├── feature/EPIC05-lesson-player
│   ├── feature/EPIC05-progress-tracking
│   └── fix/EPIC05-video-resume
└── release/v1.0.0      # Release candidates
```

**Branch Naming:**
- Features: `feature/EPIC05-{feature-name}`
- Fixes: `fix/EPIC05-{issue-description}`
- Hotfixes: `hotfix/{issue-description}`

---

## 9. Document References

| Document | Purpose |
|----------|---------|
| `/Docs/Implementation.md` | Task breakdown and tech stack |
| `/Docs/UI_UX_doc.md` | Design specifications |
| `/PRDs/Epic5PRD.md` | Source requirements |

---

*This document defines the canonical project structure. All new files and folders must follow these conventions.*
