# SioLabs UI/UX Design Specification
## EPIC-05: Learning Experience (MVP)

**Document Version:** 1.0  
**Created:** January 27, 2026  
**Purpose:** Define UX patterns, component specifications, and accessibility requirements

---

## 1. Design Principles

### 1.1 Core UX Philosophy

| Principle | Description | Implementation |
|-----------|-------------|----------------|
| **Clarity First** | Learners should never feel lost | Clear navigation, visible progress, obvious next actions |
| **Momentum Building** | Progress should feel tangible and rewarding | Visual progress indicators, completion celebrations |
| **Reduce Cognitive Load** | Don't overwhelm with options | Progressive disclosure, focused views |
| **Seamless Continuity** | Learning should resume effortlessly | "Continue Learning" as primary CTA, video resume |
| **Mentor Connection** | Mentorship should feel integrated | Sessions visible in learning context |

### 1.2 User Mental Model

```
[Dashboard] → "Where am I in my journey?"
     ↓
[Course] → "What's the full picture?"
     ↓
[Module] → "What should I focus on now?"
     ↓
[Lesson] → "Let me learn and complete this"
     ↓
[Progress Update] → "I'm making progress!"
```

---

## 2. Layout System

### 2.1 Page Structure

```
┌─────────────────────────────────────────────────────────┐
│  Header (fixed)                                         │
│  [Logo] [Nav] [User Menu]                               │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────┐ ┌────────────────────────────────────────┐│
│  │          │ │                                        ││
│  │ Sidebar  │ │  Main Content Area                     ││
│  │ (nav)    │ │                                        ││
│  │          │ │  - Page Title                          ││
│  │          │ │  - Breadcrumb                          ││
│  │          │ │  - Content                             ││
│  │          │ │                                        ││
│  └──────────┘ └────────────────────────────────────────┘│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2.2 Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Desktop | ≥1280px | Full sidebar + content |
| Tablet | 768px–1279px | Collapsible sidebar |
| Mobile | <768px | Bottom navigation, stacked content |

### 2.3 Spacing Scale (Tailwind)

| Token | Value | Use Case |
|-------|-------|----------|
| `space-1` | 4px | Tight spacing (icons, badges) |
| `space-2` | 8px | Related elements |
| `space-3` | 12px | Component internal padding |
| `space-4` | 16px | Section spacing |
| `space-6` | 24px | Card padding |
| `space-8` | 32px | Section gaps |
| `space-12` | 48px | Page sections |

### 2.4 Content Width

| Context | Max Width | Tailwind Class |
|---------|-----------|----------------|
| Full page content | 1200px | `max-w-7xl` |
| Reading content | 768px | `max-w-3xl` |
| Cards in grid | 400px | `max-w-md` |
| Lesson video | 960px | `max-w-4xl` |

---

## 3. Color System

### 3.1 Brand Colors

```css
/* Primary - Trust & Learning */
--brand-500: #0ea5e9;  /* Primary actions */
--brand-600: #0284c7;  /* Hover states */
--brand-700: #0369a1;  /* Active states */

/* Secondary - Supporting */
--gray-50: #f9fafb;    /* Page background */
--gray-100: #f3f4f6;   /* Card backgrounds */
--gray-200: #e5e7eb;   /* Borders */
--gray-500: #6b7280;   /* Secondary text */
--gray-900: #111827;   /* Primary text */
```

### 3.2 Semantic Colors

| Purpose | Color | Tailwind | Use Case |
|---------|-------|----------|----------|
| Success | `#10b981` | `text-emerald-500` | Completed lessons, achievements |
| Warning | `#f59e0b` | `text-amber-500` | Due dates, attention |
| Error | `#ef4444` | `text-red-500` | Errors, missed deadlines |
| Info | `#3b82f6` | `text-blue-500` | Hints, help text |
| Progress | `#8b5cf6` | `text-violet-500` | Progress bars, streaks |

### 3.3 Progress States

| State | Visual | Color |
|-------|--------|-------|
| Not Started | Empty circle | `gray-300` |
| In Progress | Half-filled circle | `brand-500` |
| Completed | Filled checkmark | `emerald-500` |
| Locked | Lock icon | `gray-400` |

---

## 4. Typography

### 4.1 Font Stack

```css
/* Primary Font - Clean, modern, readable */
--font-sans: 'Plus Jakarta Sans', 'Inter', system-ui, sans-serif;

/* Monospace - Code snippets */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### 4.2 Type Scale

| Element | Size | Weight | Line Height | Use |
|---------|------|--------|-------------|-----|
| H1 | 32px / 2rem | 700 | 1.2 | Page titles |
| H2 | 24px / 1.5rem | 600 | 1.3 | Section headers |
| H3 | 20px / 1.25rem | 600 | 1.4 | Card titles |
| H4 | 16px / 1rem | 600 | 1.5 | Subsections |
| Body | 16px / 1rem | 400 | 1.6 | Primary content |
| Small | 14px / 0.875rem | 400 | 1.5 | Secondary info |
| Caption | 12px / 0.75rem | 500 | 1.4 | Labels, metadata |

### 4.3 Text Colors

| Purpose | Color | Class |
|---------|-------|-------|
| Primary text | `gray-900` | `text-gray-900` |
| Secondary text | `gray-600` | `text-gray-600` |
| Muted text | `gray-400` | `text-gray-400` |
| Link text | `brand-500` | `text-brand-500` |
| Error text | `red-500` | `text-red-500` |

---

## 5. Component Specifications

### 5.1 Learning Dashboard

#### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  Welcome back, [Name]! 👋                               │
│  Continue your learning journey                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │  CONTINUE LEARNING (Primary CTA)                    ││
│  │  [Course Thumbnail] [Course Name]                   ││
│  │  [Module: Current] [Lesson: Last Incomplete]        ││
│  │  [Progress Bar 65%]        [Resume →]               ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  ┌──────────────────────┐ ┌────────────────────────────┐│
│  │ MY COURSES           │ │ UPCOMING SESSIONS          ││
│  │                      │ │                            ││
│  │ [Course Card 1]      │ │ [Session 1]                ││
│  │ [Course Card 2]      │ │ [Session 2]                ││
│  │                      │ │                            ││
│  └──────────────────────┘ └────────────────────────────┘│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Continue Learning Card (Hero CTA)

**Purpose:** Reduce friction to resume learning  
**Position:** Top of dashboard, full width  
**Visual Priority:** Highest

| Element | Specification |
|---------|---------------|
| Container | Full width, `bg-gradient` (brand-500 to brand-600), rounded-xl |
| Course thumbnail | 120x80px, rounded-lg, left aligned |
| Course name | H3, white, font-semibold |
| Current position | Small text, white/80% opacity |
| Progress bar | 8px height, white track, brand-300 fill |
| CTA button | Primary button, "Resume →", white bg |

**States:**
- Default: Show last incomplete lesson
- No progress: Show "Start Learning →"
- All complete: Show "Review Course →"

#### Enrolled Course Card

**Purpose:** Display course with progress at a glance

```
┌────────────────────────────────────────┐
│ [Thumbnail 100%w]                      │
├────────────────────────────────────────┤
│ Course Title                           │
│ 12 modules • 8h 30m                    │
│                                        │
│ ████████░░░░░░░░░░░░ 45%               │
│                                        │
│ Last activity: 2 days ago              │
└────────────────────────────────────────┘
```

| Element | Specification |
|---------|---------------|
| Container | `w-full max-w-sm`, `bg-white`, `rounded-xl`, `shadow-sm` |
| Thumbnail | Aspect ratio 16:9, rounded-t-xl |
| Title | H4, `text-gray-900`, line-clamp-2 |
| Meta | Small, `text-gray-500` |
| Progress bar | 6px, rounded-full, `bg-gray-200` track |
| Progress fill | `bg-emerald-500` for >80%, `bg-brand-500` otherwise |
| Last activity | Caption, `text-gray-400` |

**Interaction:**
- Hover: Slight scale (1.02), shadow increase
- Click: Navigate to course overview

#### Upcoming Sessions Widget

**Purpose:** Surface mentorship opportunities

| Element | Specification |
|---------|---------------|
| Header | "Upcoming Sessions", H3 |
| Empty state | Illustration + "No sessions this week" |
| Session item | Date/time, session title, module context |
| Max items | 3 (with "View all" link) |

**Session Item:**
```
┌────────────────────────────────────────┐
│ 🗓️ Today, 3:00 PM IST                  │
│ Introduction to Neural Networks        │
│ Module 3 • AI Fundamentals             │
│                                [Join →]│
└────────────────────────────────────────┘
```

---

### 5.2 Course Overview Page

#### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  ← Back to Dashboard                                    │
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │ [Course Thumbnail]                                  ││
│  │ COURSE TITLE                                        ││
│  │ Description text here...                            ││
│  │                                                     ││
│  │ 📚 12 Modules  ⏱️ 8h 30m  👨‍🏫 Live Sessions: 4      ││
│  │                                                     ││
│  │ ████████████░░░░░░░░░░░░ 55% Complete               ││
│  │                                                     ││
│  │ [Continue Learning →]                               ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  MODULES                                                │
│  ┌─────────────────────────────────────────────────────┐│
│  │ ▼ Module 1: Introduction        ✓ Complete         ││
│  │   ├─ Lesson 1.1 ✓                                   ││
│  │   ├─ Lesson 1.2 ✓                                   ││
│  │   └─ Lesson 1.3 ✓                                   ││
│  ├─────────────────────────────────────────────────────┤│
│  │ ▼ Module 2: Fundamentals        ◐ In Progress      ││
│  │   ├─ Lesson 2.1 ✓                                   ││
│  │   ├─ Lesson 2.2 ● Current                           ││
│  │   └─ Lesson 2.3 ○                                   ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Module Accordion

**Purpose:** Progressive disclosure of course structure

| State | Visual |
|-------|--------|
| Completed | Green checkmark, `bg-emerald-50` |
| In Progress | Half circle, `bg-brand-50` |
| Not Started | Empty circle, default |
| Locked | Lock icon, `opacity-60` |

**Interaction:**
- Click header: Expand/collapse
- Click lesson: Navigate to lesson

---

### 5.3 Module View

#### Layout Structure

```
┌─────────────────────────────────────────────────────────┐
│  ← Course Name                                          │
│                                                         │
│  MODULE 3: NEURAL NETWORKS                              │
│  Learn the fundamentals of neural network architecture  │
│                                                         │
│  ████████░░░░░░░░ 50% Complete                          │
│                                                         │
│  LESSONS                                                │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ✓ 3.1 Introduction to Neurons        15 min      │  │
│  │ ✓ 3.2 Activation Functions           20 min      │  │
│  │ ● 3.3 Backpropagation (Current)      25 min      │  │
│  │ ○ 3.4 Training Your First Network    30 min      │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  ASSIGNMENT                                             │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 📝 Build a Simple Classifier                     │  │
│  │ Due: Feb 15, 2026                                │  │
│  │                          [Start Assignment →]    │  │
│  └──────────────────────────────────────────────────┘  │
│                                                         │
│  LIVE SESSION                                           │
│  ┌──────────────────────────────────────────────────┐  │
│  │ 🎥 Q&A: Neural Networks Deep Dive                │  │
│  │ Feb 10, 2026 • 3:00 PM IST                       │  │
│  │                                    [Add to Cal]  │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

#### Lesson List Item

| Element | Specification |
|---------|---------------|
| Container | `flex items-center gap-3 p-4 hover:bg-gray-50 rounded-lg` |
| Status icon | 20x20px, see Progress States |
| Title | Body text, `text-gray-900` |
| Duration | Small, `text-gray-500`, right aligned |
| Current indicator | `bg-brand-50 border-l-4 border-brand-500` |

---

### 5.4 Lesson View

#### Layout Structure (Desktop)

```
┌─────────────────────────────────────────────────────────┐
│  ← Module 3: Neural Networks                            │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────────────────────────────────────────────┐│
│  │                                                     ││
│  │                 VIDEO PLAYER                        ││
│  │                   (16:9)                            ││
│  │                                                     ││
│  └─────────────────────────────────────────────────────┘│
│                                                         │
│  LESSON 3.3: BACKPROPAGATION                            │
│  ──────────────────────────────────────────────────     │
│                                                         │
│  OBJECTIVE                                              │
│  Understand how gradients flow backward through a       │
│  neural network to update weights.                      │
│                                                         │
│  RESOURCES                                              │
│  ┌────────────────────────────────────────────────────┐ │
│  │ 📄 Lecture Slides (PDF)              [Download]   │ │
│  │ 💻 Code Notebook                     [Open]       │ │
│  │ 🔗 Additional Reading                [Visit]      │ │
│  └────────────────────────────────────────────────────┘ │
│                                                         │
│  ┌────────────────────────────────────────────────────┐ │
│  │ [Mark as Complete ✓]         [Next Lesson →]      │ │
│  └────────────────────────────────────────────────────┘ │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

#### Video Player

**Wrapper Specifications:**

| Element | Specification |
|---------|---------------|
| Container | `max-w-4xl mx-auto`, aspect-ratio 16:9 |
| Background | `bg-gray-900` (for letterboxing) |
| Border radius | `rounded-xl` |
| Shadow | `shadow-xl` |

**Player Controls:**
- Play/Pause (center, large on initial)
- Progress bar (bottom, scrubable)
- Time display (current / total)
- Volume control
- Playback speed (0.5x, 1x, 1.25x, 1.5x, 2x)
- Fullscreen toggle
- Picture-in-picture (if supported)

**Resume Behavior:**
- On load: Show "Resume from X:XX?" modal if position > 10s
- Store position every 5 seconds
- Clear position on lesson completion

#### Mark Complete Button

**States:**

| State | Visual | Action |
|-------|--------|--------|
| Not watched | Disabled, `bg-gray-100`, "Watch to complete" tooltip | None |
| Watched (>80%) | Enabled, `bg-brand-500`, "Mark as Complete" | POST completion |
| Completed | Success state, `bg-emerald-500`, "✓ Completed" | None |

**Completion Animation:**
1. Button transforms to checkmark
2. Confetti burst (subtle)
3. Progress bar updates
4. Toast: "Lesson complete! 🎉"

#### Next Lesson CTA

| State | Visual | Text |
|-------|--------|------|
| Has next | Primary button | "Next: [Lesson Title] →" |
| Last in module | Secondary button | "Complete Module →" |
| Last in course | Success button | "🎉 Complete Course" |

---

### 5.5 Progress Indicators

#### Progress Bar

```jsx
// Specifications
<div className="h-2 bg-gray-200 rounded-full overflow-hidden">
  <div 
    className="h-full bg-brand-500 transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>
```

**Variants:**

| Context | Height | Track | Fill |
|---------|--------|-------|------|
| Dashboard card | 6px | `gray-200` | `brand-500` |
| Course header | 8px | `gray-200` | `brand-500` |
| Module header | 4px | `gray-200` | `emerald-500` |

#### Progress Ring (Dashboard)

For overall course progress on cards:

```
   ╭───╮
  │ 65% │  (circular progress)
   ╰───╯
```

**Specifications:**
- Size: 48x48px
- Stroke width: 4px
- Track: `gray-200`
- Fill: Gradient from `brand-400` to `brand-600`
- Animation: Count-up on load

---

## 6. Interaction Patterns

### 6.1 Navigation

#### Breadcrumb

```
Dashboard / AI Fundamentals / Module 3 / Lesson 3.3
```

| Level | Clickable | Style |
|-------|-----------|-------|
| Dashboard | Yes | `text-gray-500 hover:text-brand-500` |
| Course | Yes | `text-gray-500 hover:text-brand-500` |
| Module | Yes | `text-gray-500 hover:text-brand-500` |
| Current | No | `text-gray-900 font-medium` |

#### Back Navigation

- Always show contextual back button
- Pattern: `← [Parent Title]`
- Position: Top left of content area

### 6.2 Loading States

#### Skeleton Screens

Use content-aware skeletons that match layout:

```jsx
// Course Card Skeleton
<div className="animate-pulse">
  <div className="bg-gray-200 aspect-video rounded-t-xl" />
  <div className="p-4 space-y-3">
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-3 bg-gray-200 rounded w-1/2" />
    <div className="h-2 bg-gray-200 rounded w-full" />
  </div>
</div>
```

**Rules:**
- Show skeleton immediately (no delay)
- Match content structure
- Use `animate-pulse` consistently
- Minimum display: 200ms (prevent flash)

### 6.3 Empty States

| Context | Message | Action |
|---------|---------|--------|
| No courses | "You haven't enrolled in any courses yet" | [Browse Courses] |
| No sessions | "No upcoming sessions this week" | None |
| No resources | "No additional resources for this lesson" | None |
| No assignments | "No assignments for this module" | None |

**Visual:**
- Centered illustration (optional)
- Clear message
- Action button if applicable
- `text-gray-500` color

### 6.4 Error States

| Type | Visual | Recovery |
|------|--------|----------|
| Network error | Red banner, retry button | [Try Again] |
| 404 | Full page, friendly illustration | [Go to Dashboard] |
| 500 | Full page, apologetic message | [Refresh] / [Contact Support] |
| Video load fail | Player area shows error | [Retry] / [Report Issue] |

### 6.5 Confirmation Patterns

**Destructive Actions:**
- Mark complete: No confirmation (reversible via support)
- Leave unfinished video: No confirmation (auto-saves)

**Important Actions:**
- Submit assignment: Confirmation modal

---

## 7. Animation Guidelines

### 7.1 Timing

| Type | Duration | Easing |
|------|----------|--------|
| Micro-interactions | 150ms | `ease-out` |
| State transitions | 200ms | `ease-in-out` |
| Page transitions | 300ms | `ease-out` |
| Progress animations | 500ms | `ease-out` |

### 7.2 Specific Animations

| Element | Animation |
|---------|-----------|
| Card hover | `transform: scale(1.02)` over 150ms |
| Accordion | Height transition, 200ms |
| Progress bar | Width transition, 500ms |
| Completion checkmark | Scale + opacity, 200ms |
| Toast notifications | Slide in from top, 200ms |
| Page load | Staggered fade-in (50ms delay per element) |

### 7.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 8. Accessibility Requirements

### 8.1 WCAG 2.1 AA Compliance

| Requirement | Implementation |
|-------------|----------------|
| Color contrast | Minimum 4.5:1 for text, 3:1 for large text |
| Focus indicators | 2px outline, `brand-500`, offset 2px |
| Touch targets | Minimum 44x44px |
| Screen reader | ARIA labels on interactive elements |
| Keyboard nav | Full site navigable via keyboard |

### 8.2 Focus Management

```css
/* Focus visible only for keyboard navigation */
:focus-visible {
  outline: 2px solid var(--brand-500);
  outline-offset: 2px;
}

:focus:not(:focus-visible) {
  outline: none;
}
```

### 8.3 ARIA Patterns

| Component | ARIA |
|-----------|------|
| Progress bar | `role="progressbar"`, `aria-valuenow`, `aria-valuemax` |
| Accordion | `aria-expanded`, `aria-controls` |
| Video player | `aria-label="Video player"`, controls labeled |
| Modals | `role="dialog"`, `aria-modal="true"`, focus trap |
| Alerts | `role="alert"`, `aria-live="polite"` |

### 8.4 Keyboard Shortcuts

| Shortcut | Action | Context |
|----------|--------|---------|
| `Space` / `Enter` | Activate button/link | Global |
| `Escape` | Close modal/dropdown | Global |
| `Space` | Play/pause video | Video player |
| `←` / `→` | Seek ±10s | Video player |
| `↑` / `↓` | Volume ±10% | Video player |
| `F` | Toggle fullscreen | Video player |

---

## 9. Responsive Behavior

### 9.1 Dashboard

| Breakpoint | Layout |
|------------|--------|
| Desktop | 2-column (courses + sessions sidebar) |
| Tablet | 1-column, sessions below courses |
| Mobile | Stacked cards, simplified headers |

### 9.2 Course/Module Views

| Breakpoint | Layout |
|------------|--------|
| Desktop | Full sidebar navigation visible |
| Tablet | Collapsible sidebar |
| Mobile | Top navigation, full-width content |

### 9.3 Lesson View

| Breakpoint | Layout |
|------------|--------|
| Desktop | Video + side panel (resources) |
| Tablet | Video + below content |
| Mobile | Video (full width) + stacked content |

### 9.4 Video Player

| Breakpoint | Behavior |
|------------|----------|
| Desktop | Inline, max-width 960px |
| Tablet | Full container width |
| Mobile | Full width, controls optimized for touch |

---

## 10. Component Checklist

### Dashboard Components
- [ ] `DashboardLayout`
- [ ] `WelcomeHeader`
- [ ] `ContinueLearningCard`
- [ ] `EnrolledCoursesList`
- [ ] `CourseCard`
- [ ] `CourseCardSkeleton`
- [ ] `UpcomingSessionsWidget`
- [ ] `SessionItem`
- [ ] `LastActivityDisplay`
- [ ] `EmptyStateEnrollment`

### Course Components
- [ ] `CourseHeader`
- [ ] `CourseProgressBar`
- [ ] `CourseMetadata`
- [ ] `ModuleAccordion`
- [ ] `ModuleAccordionItem`
- [ ] `LessonListItem`

### Module Components
- [ ] `ModuleHeader`
- [ ] `ModuleObjective`
- [ ] `LessonList`
- [ ] `AssignmentCard`
- [ ] `LinkedSessionCard`

### Lesson Components
- [ ] `LessonHeader`
- [ ] `VideoPlayer`
- [ ] `VideoControls`
- [ ] `ResumeModal`
- [ ] `LessonObjective`
- [ ] `ResourcesList`
- [ ] `ResourceItem`
- [ ] `MarkCompleteButton`
- [ ] `NextLessonCTA`
- [ ] `LessonNavigation`

### Progress Components
- [ ] `ProgressBar`
- [ ] `ProgressRing`
- [ ] `CompletionBadge`
- [ ] `ProgressIndicator`

### Session Components
- [ ] `SessionCard`
- [ ] `SessionCountdown`
- [ ] `JoinButton`
- [ ] `RecordingLink`

### Shared Components
- [ ] `Breadcrumb`
- [ ] `LoadingSpinner`
- [ ] `SkeletonLoader`
- [ ] `EmptyState`
- [ ] `ErrorMessage`
- [ ] `Toast`
- [ ] `ConfirmationModal`

---

## 11. Document References

| Document | Purpose |
|----------|---------|
| `/Docs/Implementation.md` | Task breakdown and dependencies |
| `/Docs/project_structure.md` | Component file locations |
| `/PRDs/Epic5PRD.md` | Source requirements |

---

*This document is the design authority for EPIC-05. All UI implementation must reference these specifications.*
