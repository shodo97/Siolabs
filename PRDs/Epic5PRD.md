PRD — EPIC 5: Learning Experience (MVP)

Product: SioLabs Web Platform
Epic: EPIC-05 – Learning Experience Core
Phase: Phase 1 (Post-Phase 0 execution)
Owner: Product
Stakeholders: UX, Frontend, Backend, Content, Instruction, QA
Status: Ready for design & development

1. Problem Statement

Learners enrolling in AI/ML programs often drop off because:

they feel lost after enrolling,

they don’t know what to do next,

progress is not visible,

content feels passive,

learning is disconnected from mentorship and outcomes.

UX research confirms that structure, progress visibility, and integration with mentorship are critical to improving completion rates and perceived value.

The Learning Experience epic is the heart of the SioLabs platform — if this fails, nothing else matters.

2. Goal & Success Criteria
Primary Goal

Enable learners to clearly understand, consume, track, and complete their learning journey in a structured and motivating way.

Success Metrics

≥70% lesson completion within first module

≥60% learners attend at least one live session

≥50% learners submit at least one assignment

Time-to-first-lesson < 5 minutes after enrollment

3. In Scope vs Out of Scope
In Scope (MVP)

Learning dashboard

Course → module → lesson structure

Lesson consumption (video + resources)

Progress tracking

Assignment access & submission entry points

Resume learning experience

Live session visibility (read-only join links)

Out of Scope (Explicit)

AI tutor/chat

Peer discussion threads

Gamification (badges, streaks)

Mobile-native app

Advanced analytics dashboards

4. User Personas (Primary)
Learner (Student / Early Career)

Goal: Learn AI/ML and complete projects

Pain: Doesn’t know what to do next, loses motivation

Needs: Structure, clarity, visible progress, mentor access

Instructor (Read-only impact here)

Needs learners to show up prepared for live sessions

5. User Journey (Happy Path)

User logs in

Lands on Learning Dashboard

Sees enrolled course(s) with progress

Clicks “Continue Learning”

Watches lesson

Marks lesson complete

Sees progress update

Views upcoming live session

Submits assignment (via linked flow)

6. Functional Requirements
6.1 Learning Dashboard

Description
Primary landing page after login.

Must show

Enrolled courses (card/list)

Progress % per course

“Continue Learning” CTA

Upcoming live sessions (next 7 days)

Last activity timestamp

Acceptance Criteria

Dashboard loads < 2 seconds

Progress shown visually (bar or %)

CTA resumes last incomplete lesson

6.2 Course Overview Page

Description
High-level structure and orientation.

Must show

Course description

Module list

Completion status per module

Total duration estimate

Mentor/live session info

Acceptance Criteria

Modules expandable/collapsible

Completed modules visually distinct

6.3 Module View

Description
Groups lessons logically.

Must show

Module title & objective

Lesson list with completion status

Assignment link (if applicable)

Live session(s) linked to module

6.4 Lesson View

Description
Core content consumption experience.

Must include

Video player

Lesson objective

Downloadable resources (if any)

“Mark as complete” action

Next lesson CTA

Nice to have (still MVP)

Video resume (last timestamp)

Acceptance Criteria

Progress updates only after completion action

User can navigate back to module/course

6.5 Progress Tracking

Description
Visible reinforcement of momentum.

Tracked Levels

Lesson

Module

Course

Rules

Lesson completion = manual (button)

Module complete = all lessons complete

Course complete = all modules complete

6.6 Assignment Entry Point (MVP-lite)

Description
Learning experience must connect to application.

Must show

Assignment description

Due date (if any)

“Submit assignment” CTA (links to submission flow)

NOTE: Submission mechanics are implemented in EPIC-05 + EPIC-07 overlap.

6.7 Live Session Visibility

Description
Learners must see mentorship as part of learning.

Must show

Upcoming sessions linked to course/module

Date/time (local timezone)

Join link (when active)

Recording link (after session)

7. Non-Functional Requirements

Responsive (desktop-first, tablet supported)

Accessible (keyboard nav, readable contrast)

Scalable to 10k learners

Secure content access (no unenrolled access)

8. Edge Cases & Constraints

User enrolled in multiple courses

User skips lessons → progress reflects accurately

Live session canceled → status updates

Poor network → resume playback

Instructor edits lesson after user completion (no regression)

9. Dependencies

Auth & profiles (EPIC-01)

Course content CMS (EPIC-07)

Live session scheduling (EPIC-06)

10. Analytics & Instrumentation

Track events:

dashboard_viewed

course_opened

lesson_started

lesson_completed

continue_learning_clicked

assignment_cta_clicked

live_session_viewed

TASK BREAKDOWN (JIRA-READY)

Below is the execution breakdown for EPIC-05.

EPIC-05 TASKS
🟦 Design Tasks

Create Learning Dashboard wireframes

Create Course Overview wireframes

Create Lesson View wireframes

Define progress visualization patterns

UX review & iteration

🟩 Frontend Tasks

Build Learning Dashboard UI

Build Course Overview UI

Build Module & Lesson views

Integrate video player

Implement progress UI states

Handle resume learning logic

🟨 Backend Tasks

Course/module/lesson APIs

Progress tracking service

Lesson completion logic

Assignment metadata endpoints

Live session data integration

🟥 QA Tasks

Progress accuracy testing

Resume learning test cases

Multi-course enrollment tests

Edge case validation

Performance checks

11. Definition of Done (Epic)

EPIC-05 is complete when:

Learner can enroll → learn → track progress without confusion

Dashboard accurately reflects state

Lessons are consumable and resumable

Progress persists across sessions

Live sessions are visible in context

Product, UX, and engineering sign off

12. Risks & Mitigations
Risk	Mitigation
Learner overwhelm	Progressive disclosure
Low completion	Strong resume CTA
Content inconsistency	Content templates
Live session disconnect	Clear surfacingS