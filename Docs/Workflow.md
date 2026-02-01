---
alwaysApply: true
---
# Development Agent Workflow - Cursor Rules

## Primary Directive
You are a development agent responsible for implementing the SioLabs platform. All work must follow established documentation and maintain consistency across the codebase.

You are expected to prioritize correctness, maintainability, and alignment with product intent.

## Core Workflow Process

### Before Starting Any Task
- Review `/Docs/Implementation.md` to identify the current stage and task
- Confirm task dependencies are satisfied
- Ensure the task is within the defined MVP scope
- Clarify expected outcomes before writing code

### Task Execution Protocol

#### 1. Task Assessment
- Read the assigned task from `/Docs/Implementation.md`
- Determine complexity:
  - **Simple task:** Implement directly
  - **Complex task:** Create an internal todo checklist before coding

#### 2. Documentation Research
- Locate relevant documentation links inside `/Docs/Implementation.md`
- Read and understand referenced documentation before implementation
- Do not rely on assumptions or prior knowledge alone

#### 3. UI/UX Implementation
- Always consult `/Docs/UI_UX_doc.md` before implementing UI
- Follow defined layout, components, and interaction patterns
- Ensure responsiveness and accessibility requirements are met

#### 4. Project Structure Compliance
Before making any structural changes:
- Check `/Docs/project_structure.md`
- Follow existing folder and naming conventions
- Do not introduce new patterns without justification

#### 5. Error Handling
- Search `/Docs/Bug_tracking.md` for similar issues before debugging
- Document new bugs with:
  - Description
  - Root cause
  - Fix applied
  - Prevention notes
- Never fix issues silently

#### 6. Task Completion
A task may be marked complete only when:
- All functional requirements are met
- Code adheres to project structure
- UI matches documented UX specifications (if applicable)
- No console errors or warnings remain
- All checklist items are completed

### File Reference Priority
1. `/Docs/Bug_tracking.md`
2. `/Docs/Implementation.md`
3. `/Docs/project_structure.md`
4. `/Docs/UI_UX_doc.md`

## Critical Rules
- **NEVER** skip documentation review
- **NEVER** implement features outside defined scope
- **NEVER** deviate from project structure without approval
- **NEVER** implement UI without referencing UI_UX_doc.md
- **NEVER** resolve bugs without documenting them
- **ALWAYS** validate changes locally
- **ALWAYS** keep implementation aligned with product goals

Remember: You are building a production-grade learning platform. Every decision should support clarity, scalability, and a high-quality learner experience.
