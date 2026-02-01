# SioLabs Implementation Plan
## EPIC-05: Learning Experience (MVP)

**Document Version:** 1.0  
**Created:** January 27, 2026  
**Status:** Ready for Development  
**Epic Owner:** Product  
**Stakeholders:** UX, Frontend, Backend, Content, Instruction, QA

---

## 1. PRD Analysis Summary

### 1.1 Problem Statement
Learners in AI/ML programs experience high drop-off rates due to:
- Feeling lost post-enrollment
- Lack of clear next steps
- Invisible progress
- Passive content consumption
- Disconnection from mentorship and outcomes

### 1.2 Primary Goal
Enable learners to clearly understand, consume, track, and complete their learning journey in a structured and motivating way.

### 1.3 Success Metrics
| Metric | Target |
|--------|--------|
| Lesson completion (first module) | ≥70% |
| Live session attendance | ≥60% |
| Assignment submission | ≥50% |
| Time-to-first-lesson | < 5 minutes |

---

## 2. Feature Analysis

### 2.1 MVP Features (In Scope)

| ID | Feature | Description | Classification | Impact Area |
|----|---------|-------------|----------------|-------------|
| F01 | Learning Dashboard | Primary landing page showing enrolled courses, progress, CTAs, upcoming sessions | Frontend + Backend | Learning Experience |
| F02 | Course Overview Page | High-level course structure with modules, completion status, duration estimates | Frontend + Backend | Learning Experience |
| F03 | Module View | Grouped lessons with objectives, completion status, assignments, linked sessions | Frontend + Backend | Learning Experience |
| F04 | Lesson View | Video player, objectives, resources, mark-complete action, next lesson CTA | Frontend + Backend | Learning Experience |
| F05 | Progress Tracking | Visual progress at lesson/module/course levels with persistence | Full-Stack | Learning Experience |
| F06 | Resume Learning | CTA to continue from last incomplete lesson with video timestamp resume | Frontend + Backend | Learning Experience |
| F07 | Assignment Entry Point | Assignment description, due date, submission CTA (links to submission flow) | Frontend + Backend | Learning Experience |
| F08 | Live Session Visibility | Upcoming sessions with date/time, join links, recording links | Frontend + Backend | Mentorship |

### 2.2 Out of Scope (Explicit)
- ❌ AI tutor/chat
- ❌ Peer discussion threads
- ❌ Gamification (badges, streaks)
- ❌ Mobile-native app
- ❌ Advanced analytics dashboards

### 2.3 Feature-to-User-Need Mapping (JTBD)

| Feature | User Need / Job-to-be-Done |
|---------|---------------------------|
| Learning Dashboard | "I want to see what I'm learning and where I am" |
| Course Overview | "I want to understand the full scope of my course" |
| Module View | "I want to see what's in this section and track my progress" |
| Lesson View | "I want to watch, learn, and move forward" |
| Progress Tracking | "I want to feel momentum and see my achievements" |
| Resume Learning | "I want to pick up exactly where I left off" |
| Assignment Entry | "I want to apply what I learned" |
| Live Session Visibility | "I want to know when I can interact with mentors" |

### 2.4 Technical Complexity Assessment

| Feature | Complexity | Notes |
|---------|------------|-------|
| Learning Dashboard | Medium | Aggregates multiple data sources, requires optimized queries |
| Course Overview | Low | Hierarchical data display |
| Module View | Low | List rendering with status |
| Lesson View | High | Video player integration, playback resume, progress sync |
| Progress Tracking | Medium | State management, real-time updates, persistence |
| Resume Learning | Medium | Cross-session state, video timestamp tracking |
| Assignment Entry | Low | Display + link to external flow |
| Live Session Visibility | Low-Medium | Timezone handling, dynamic status |

---

## 3. Dependencies

### 3.1 External Epic Dependencies

| Dependency | Epic | Status Required | Impact |
|------------|------|-----------------|--------|
| Authentication & Profiles | EPIC-01 | Complete | User identity, session management |
| Course Content CMS | EPIC-07 | In Progress | Course/module/lesson data source |
| Live Session Scheduling | EPIC-06 | In Progress | Session data for visibility |

### 3.2 Internal Dependencies

```
Authentication (EPIC-01)
    └── Learning Dashboard (F01)
            ├── Course Overview (F02)
            │       └── Module View (F03)
            │               └── Lesson View (F04)
            ├── Progress Tracking (F05) ← depends on F04 completion events
            ├── Resume Learning (F06) ← depends on F05 state
            └── Live Session Visibility (F08)
                    
Assignment Entry (F07) ← depends on F03 context
```

---

## 4. Assumptions, Risks & Open Questions

### 4.1 Assumptions
- EPIC-01 (Auth) is complete and provides JWT-based session management
- Course content structure (course → module → lesson) is defined in CMS
- Video content is hosted on a CDN with streaming support
- Backend APIs will follow REST conventions

### 4.2 Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Learner overwhelm | Medium | High | Progressive disclosure, clean UI hierarchy |
| Low completion rates | Medium | High | Strong "Resume Learning" CTA, visible progress |
| Content inconsistency | Low | Medium | Content templates, CMS validation |
| Live session disconnect | Low | Medium | Clear surfacing in dashboard and module views |
| Video performance issues | Medium | High | CDN with adaptive bitrate, lazy loading |

### 4.3 Open Questions
1. ~~Video hosting provider decision~~ → Assumed CDN-based streaming
2. ~~Analytics instrumentation tooling~~ → To be defined in implementation

---

## 5. Recommended Technology Stack

### 5.1 Frontend

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| **Next.js 14** | React framework with App Router, SSR, RSC | [https://nextjs.org/docs](https://nextjs.org/docs) |
| **TypeScript 5.x** | Type safety, developer productivity | [https://www.typescriptlang.org/docs/](https://www.typescriptlang.org/docs/) |
| **Tailwind CSS 3.x** | Utility-first styling, rapid UI development | [https://tailwindcss.com/docs](https://tailwindcss.com/docs) |
| **shadcn/ui** | Accessible, customizable component primitives | [https://ui.shadcn.com/docs](https://ui.shadcn.com/docs) |
| **React Query (TanStack)** | Server state management, caching | [https://tanstack.com/query/latest/docs](https://tanstack.com/query/latest/docs) |
| **Zustand** | Client state management (lightweight) | [https://docs.pmnd.rs/zustand](https://docs.pmnd.rs/zustand) |
| **React Player** | Video playback with progress tracking | [https://github.com/cookpete/react-player](https://github.com/cookpete/react-player) |

### 5.2 Backend

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| **Node.js 20 LTS** | Runtime environment | [https://nodejs.org/docs/latest-v20.x/api/](https://nodejs.org/docs/latest-v20.x/api/) |
| **Express.js** | API framework (or Fastify for performance) | [https://expressjs.com/](https://expressjs.com/) |
| **PostgreSQL 16** | Primary relational database | [https://www.postgresql.org/docs/16/](https://www.postgresql.org/docs/16/) |
| **Prisma ORM** | Type-safe database access | [https://www.prisma.io/docs](https://www.prisma.io/docs) |
| **Redis** | Caching, session storage | [https://redis.io/docs/](https://redis.io/docs/) |
| **JWT (jsonwebtoken)** | Authentication tokens | [https://github.com/auth0/node-jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) |

### 5.3 Infrastructure & DevOps

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| **Vercel** | Frontend hosting, edge functions | [https://vercel.com/docs](https://vercel.com/docs) |
| **AWS S3 + CloudFront** | Video/asset CDN | [https://docs.aws.amazon.com/cloudfront/](https://docs.aws.amazon.com/cloudfront/) |
| **Docker** | Containerization | [https://docs.docker.com/](https://docs.docker.com/) |
| **GitHub Actions** | CI/CD pipelines | [https://docs.github.com/en/actions](https://docs.github.com/en/actions) |

### 5.4 Analytics & Monitoring

| Technology | Purpose | Documentation |
|------------|---------|---------------|
| **PostHog** | Product analytics, event tracking | [https://posthog.com/docs](https://posthog.com/docs) |
| **Sentry** | Error tracking, performance monitoring | [https://docs.sentry.io/](https://docs.sentry.io/) |

### 5.5 Stack Justification

| Criteria | Evaluation |
|----------|------------|
| **Scalability** | Next.js + PostgreSQL + Redis handle 10k+ concurrent learners |
| **Developer Productivity** | TypeScript + Prisma + shadcn/ui enable rapid, safe iteration |
| **Video Performance** | CloudFront CDN with adaptive streaming ensures smooth playback |
| **Security** | JWT auth, row-level security in PostgreSQL, HTTPS everywhere |
| **MVP Speed** | shadcn/ui pre-built components, Next.js conventions reduce boilerplate |

---

## 6. Implementation Stages

### Stage 1: Platform Foundation
**Goal:** Establish project infrastructure, authentication integration, and base architecture  
**Duration:** ~1 week  
**Dependencies:** EPIC-01 Auth APIs available

#### Tasks

- [ ] **1.1 Project Initialization** (~4 hours)
  - [ ] Initialize Next.js 14 project with App Router
  - [ ] Configure TypeScript strict mode
  - [ ] Set up Tailwind CSS with custom design tokens
  - [ ] Install and configure shadcn/ui
  - [ ] Configure ESLint + Prettier
  - [ ] Set up project folder structure per `/Docs/project_structure.md`
  - **Role:** Frontend

- [ ] **1.2 Backend Setup** (~4 hours)
  - [ ] Initialize Node.js/Express project
  - [ ] Configure TypeScript for backend
  - [ ] Set up Prisma with PostgreSQL connection
  - [ ] Define base database schema (users, courses, modules, lessons)
  - [ ] Configure environment variables
  - **Role:** Backend

- [ ] **1.3 Authentication Integration** (~6 hours)
  - [ ] Integrate with EPIC-01 auth endpoints
  - [ ] Implement JWT verification middleware
  - [ ] Create protected route wrapper (frontend)
  - [ ] Set up auth context/provider
  - [ ] Implement logout flow
  - **Role:** Full-Stack
  - **Dependency:** EPIC-01 complete

- [ ] **1.4 API Foundation** (~4 hours)
  - [ ] Set up API route structure
  - [ ] Configure CORS and security headers
  - [ ] Implement request validation (Zod)
  - [ ] Create error handling middleware
  - [ ] Set up API documentation (Swagger/OpenAPI)
  - **Role:** Backend

- [ ] **1.5 DevOps Setup** (~3 hours)
  - [ ] Configure GitHub repository
  - [ ] Set up GitHub Actions for CI
  - [ ] Configure Vercel deployment (frontend)
  - [ ] Set up staging environment
  - **Role:** DevOps/Backend

---

### Stage 2: Learning Experience Core
**Goal:** Build dashboard, course/module/lesson views, and progress tracking  
**Duration:** ~2 weeks  
**Dependencies:** Stage 1 complete, EPIC-07 content APIs available

#### Tasks

- [ ] **2.1 Learning Dashboard** (~8 hours)
  - [ ] Create dashboard page layout
  - [ ] Build enrolled courses card component
  - [ ] Implement progress bar component
  - [ ] Build "Continue Learning" CTA with resume logic
  - [ ] Create upcoming sessions widget
  - [ ] Implement last activity display
  - [ ] Connect to backend APIs
  - **Role:** Frontend
  - **Dependency:** 1.3 Auth integration

- [ ] **2.2 Dashboard API** (~6 hours)
  - [ ] Create GET /api/dashboard endpoint
  - [ ] Implement enrolled courses query with progress aggregation
  - [ ] Create upcoming sessions query (next 7 days)
  - [ ] Optimize with Redis caching
  - [ ] Add response pagination
  - **Role:** Backend
  - **Dependency:** 1.2 Backend setup

- [ ] **2.3 Course Overview Page** (~6 hours)
  - [ ] Create course overview page layout
  - [ ] Build module list with expand/collapse
  - [ ] Implement completion status indicators
  - [ ] Display course metadata (description, duration, mentor)
  - [ ] Add breadcrumb navigation
  - **Role:** Frontend
  - **Dependency:** 2.1 Dashboard

- [ ] **2.4 Course API** (~4 hours)
  - [ ] Create GET /api/courses/:id endpoint
  - [ ] Include modules with completion status
  - [ ] Add live session data for course
  - [ ] Implement proper authorization (enrolled users only)
  - **Role:** Backend
  - **Dependency:** 2.2 Dashboard API

- [ ] **2.5 Module View** (~4 hours)
  - [ ] Create module detail view
  - [ ] Build lesson list with status icons
  - [ ] Display module objective and description
  - [ ] Show linked assignments
  - [ ] Show linked live sessions
  - **Role:** Frontend
  - **Dependency:** 2.3 Course Overview

- [ ] **2.6 Module API** (~3 hours)
  - [ ] Create GET /api/modules/:id endpoint
  - [ ] Include lessons with completion data
  - [ ] Include assignment metadata
  - [ ] Include related sessions
  - **Role:** Backend
  - **Dependency:** 2.4 Course API

- [ ] **2.7 Lesson View** (~10 hours)
  - [ ] Create lesson page layout
  - [ ] Integrate React Player for video
  - [ ] Implement video progress tracking
  - [ ] Build lesson objective display
  - [ ] Create downloadable resources list
  - [ ] Implement "Mark as Complete" button
  - [ ] Build "Next Lesson" CTA
  - [ ] Add back navigation to module/course
  - **Role:** Frontend
  - **Dependency:** 2.5 Module View

- [ ] **2.8 Lesson API** (~4 hours)
  - [ ] Create GET /api/lessons/:id endpoint
  - [ ] Create POST /api/lessons/:id/complete endpoint
  - [ ] Implement video URL generation (signed URLs if needed)
  - [ ] Return lesson resources metadata
  - **Role:** Backend
  - **Dependency:** 2.6 Module API

- [ ] **2.9 Progress Tracking System** (~8 hours)
  - [ ] Design progress data model
  - [ ] Implement lesson completion persistence
  - [ ] Calculate module completion (all lessons done)
  - [ ] Calculate course completion (all modules done)
  - [ ] Create progress update API
  - [ ] Implement real-time progress updates (frontend)
  - **Role:** Full-Stack
  - **Dependency:** 2.8 Lesson API

- [ ] **2.10 Resume Learning Feature** (~4 hours)
  - [ ] Track last accessed lesson per course
  - [ ] Store video playback position
  - [ ] Implement resume logic in dashboard CTA
  - [ ] Restore video position on lesson load
  - **Role:** Full-Stack
  - **Dependency:** 2.9 Progress Tracking

---

### Stage 3: Mentorship & Application
**Goal:** Integrate live sessions and assignment entry points  
**Duration:** ~1 week  
**Dependencies:** Stage 2 core complete, EPIC-06 session APIs available

#### Tasks

- [ ] **3.1 Live Session Visibility** (~6 hours)
  - [ ] Create session card component
  - [ ] Display session date/time with timezone conversion
  - [ ] Implement join link logic (active only when session starts)
  - [ ] Display recording link (post-session)
  - [ ] Integrate sessions into dashboard widget
  - [ ] Show sessions in module context
  - **Role:** Frontend
  - **Dependency:** 2.1 Dashboard, EPIC-06 APIs

- [ ] **3.2 Live Session API Integration** (~3 hours)
  - [ ] Create proxy endpoints for EPIC-06 session data
  - [ ] Transform data for frontend consumption
  - [ ] Handle session status updates
  - **Role:** Backend
  - **Dependency:** EPIC-06 complete

- [ ] **3.3 Assignment Entry Point** (~4 hours)
  - [ ] Create assignment card component
  - [ ] Display assignment description and due date
  - [ ] Implement "Submit Assignment" CTA
  - [ ] Link to submission flow (EPIC-07 overlap)
  - [ ] Show assignment status in module view
  - **Role:** Frontend
  - **Dependency:** 2.5 Module View

- [ ] **3.4 Assignment API** (~3 hours)
  - [ ] Create GET /api/assignments/:id endpoint
  - [ ] Return assignment metadata for display
  - [ ] Check submission status
  - **Role:** Backend
  - **Dependency:** 2.6 Module API

---

### Stage 4: Stabilization & Readiness
**Goal:** Polish UX, optimize performance, complete testing  
**Duration:** ~1 week  
**Dependencies:** Stage 3 complete

#### Tasks

- [ ] **4.1 UX Polish** (~6 hours)
  - [ ] Review all pages against UI_UX_doc.md
  - [ ] Implement loading states and skeletons
  - [ ] Add empty states for no courses/sessions
  - [ ] Refine animations and transitions
  - [ ] Ensure consistent spacing and typography
  - **Role:** Frontend + UX

- [ ] **4.2 Responsive Design** (~4 hours)
  - [ ] Test and fix tablet breakpoints
  - [ ] Ensure touch-friendly interactions
  - [ ] Optimize video player for smaller screens
  - [ ] Test navigation on mobile viewport
  - **Role:** Frontend

- [ ] **4.3 Accessibility Audit** (~4 hours)
  - [ ] Implement keyboard navigation
  - [ ] Add ARIA labels and roles
  - [ ] Test with screen reader
  - [ ] Ensure color contrast compliance
  - [ ] Add focus indicators
  - **Role:** Frontend + QA

- [ ] **4.4 Performance Optimization** (~6 hours)
  - [ ] Implement code splitting
  - [ ] Optimize images and assets
  - [ ] Add Redis caching for frequent queries
  - [ ] Profile and optimize database queries
  - [ ] Achieve <2s dashboard load time
  - **Role:** Full-Stack

- [ ] **4.5 Analytics Integration** (~4 hours)
  - [ ] Set up PostHog
  - [ ] Implement event tracking:
    - [ ] `dashboard_viewed`
    - [ ] `course_opened`
    - [ ] `lesson_started`
    - [ ] `lesson_completed`
    - [ ] `continue_learning_clicked`
    - [ ] `assignment_cta_clicked`
    - [ ] `live_session_viewed`
  - **Role:** Frontend

- [ ] **4.6 Error Handling & Monitoring** (~3 hours)
  - [ ] Set up Sentry for frontend
  - [ ] Set up Sentry for backend
  - [ ] Implement user-friendly error pages
  - [ ] Add retry logic for failed requests
  - **Role:** Full-Stack

- [ ] **4.7 QA Testing** (~8 hours)
  - [ ] Progress accuracy testing
  - [ ] Resume learning test cases
  - [ ] Multi-course enrollment tests
  - [ ] Edge case validation:
    - [ ] Multiple course enrollment
    - [ ] Skipped lessons
    - [ ] Canceled sessions
    - [ ] Poor network conditions
  - [ ] Performance testing (load simulation)
  - **Role:** QA

- [ ] **4.8 Pre-Production Checklist** (~2 hours)
  - [ ] Security review (auth flows, data access)
  - [ ] Environment variable audit
  - [ ] Database backup strategy confirmed
  - [ ] Monitoring dashboards configured
  - [ ] Stakeholder sign-off obtained
  - **Role:** Full Team

---

## 7. Effort Summary

| Stage | Duration | Primary Roles |
|-------|----------|---------------|
| Stage 1: Foundation | ~1 week | Frontend, Backend, DevOps |
| Stage 2: Learning Core | ~2 weeks | Frontend, Backend |
| Stage 3: Mentorship & Application | ~1 week | Frontend, Backend |
| Stage 4: Stabilization | ~1 week | Frontend, Backend, QA, UX |
| **Total** | **~5 weeks** | |

---

## 8. Definition of Done

EPIC-05 is complete when:

- [ ] Learner can enroll → learn → track progress without confusion
- [ ] Dashboard accurately reflects learning state
- [ ] Lessons are consumable and resumable
- [ ] Progress persists across sessions
- [ ] Live sessions are visible in context
- [ ] All acceptance criteria from PRD are met
- [ ] Performance targets achieved (<2s load)
- [ ] Accessibility requirements met
- [ ] Analytics events firing correctly
- [ ] Product, UX, and Engineering sign-off obtained

---

## 9. Document References

| Document | Purpose |
|----------|---------|
| `/PRDs/Epic5PRD.md` | Source requirements |
| `/Docs/project_structure.md` | Folder and file organization |
| `/Docs/UI_UX_doc.md` | Design specifications and UX patterns |
| `/Docs/Bug_tracking.md` | Issue documentation (create when needed) |

---

*This document is the single source of truth for EPIC-05 implementation. All development tasks must reference this plan.*
