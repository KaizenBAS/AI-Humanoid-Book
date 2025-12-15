# Tasks: AI-Native Book Website

**Input**: Design documents from `/specs/001-ai-book-website/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!--
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.

  The /sp.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Endpoints from contracts/

  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment

  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Create Docusaurus project with TypeScript
- [ ] T002 [P] Install dependencies: Tailwind CSS, shadcn/ui, additional plugins
- [ ] T003 [P] Configure Tailwind CSS with Docusaurus
- [ ] T004 [P] Configure MDX for Docusaurus
- [x] T005 Configure TypeScript with strict mode
- [x] T006 Setup directory structure per plan.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [x] T007 Configure Docusaurus theme and layout
- [x] T008 [P] Create base layout with theme provider in src/pages/index.tsx
- [x] T009 [P] Configure sidebar navigation in sidebars.js
- [x] T010 [P] Set up localStorage utilities for reading progress in src/utils/storage.ts
- [x] T011 Setup responsive design utilities with Tailwind
- [x] T012 Create base UI components (Button, Card, etc.) using shadcn/ui
- [x] T013 Configure Docusaurus MDX components for content rendering

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Browse Book Content (Priority: P1) 🎯 MVP

**Goal**: Allow users to access book content with 5 chapters and 2 topics each, with navigation and progress tracking

**Independent Test**: The book page should be fully functional with 5 chapters, each with 2 topics, and all navigation features working independently.

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T014 [P] [US1] Integration test for book page functionality in tests/integration/test_book_page.ts
- [ ] T015 [P] [US1] Unit test for progress tracking functionality in tests/unit/test_progress.ts

### Implementation for User Story 1

- [x] T016 [P] [US1] Create chapters data model in types/global.d.ts
- [x] T017 [P] [US1] Create mock chapter data in src/utils/mockData.ts
- [x] T018 [US1] Create book page layout using Docusaurus docs structure
- [x] T019 [P] [US1] Create chapter navigation component in src/components/navigation/ChapterNav.tsx
- [x] T020 [P] [US1] Create progress bar component in src/components/ui/ProgressBar.tsx
- [x] T021 [P] [US1] Create scroll tracking functionality in src/utils/scrollTracker.ts
- [x] T022 [US1] Implement MDX loader for book content in src/components/mdx/MDXRenderer.tsx
- [x] T023 [US1] Integrate progress tracking with localStorage in src/pages/docs/[...slug].tsx
- [x] T024 [US1] Add smooth scrolling behavior to book pages
- [x] T025 [US1] Create chapter content files in docs/
- [x] T026 [US1] Add mobile optimization for book reading experience

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Learn About the Author (Priority: P2)

**Goal**: Display author bio and vision information on the About page

**Independent Test**: The About page should display complete author bio and vision information that can be viewed independently.

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T027 [P] [US2] Integration test for about page content in tests/integration/test_about_page.ts

### Implementation for User Story 2

- [x] T028 [US2] Create about page in src/pages/about.tsx
- [x] T029 [P] [US2] Create author bio content with vision in docs/
- [x] T030 [P] [US2] Add responsive design for about page content
- [x] T031 [US2] Ensure about page uses theme provider and navigation

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Sign Up for Updates (Priority: P3)

**Goal**: Allow users to sign up for a waitlist via a form that persists their information across visits

**Independent Test**: The waitlist form should accept and persist user information independently across visits.

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T032 [P] [US3] Contract test for waitlist API in tests/contract/test_waitlist_api.ts
- [ ] T033 [P] [US3] Integration test for waitlist form functionality in tests/integration/test_waitlist.ts

### Implementation for User Story 3

- [x] T034 [US3] Create contact page in src/pages/contact.tsx
- [x] T035 [P] [US3] Create waitlist signup form component in src/components/ui/WaitlistForm.tsx
- [x] T036 [P] [US3] Implement client-side waitlist storage using localStorage
- [x] T037 [US3] Add localStorage persistence for waitlist signup
- [x] T038 [US3] Add email validation to waitlist form
- [x] T039 [US3] Implement local waitlist data model in src/types/waitlist.ts
- [x] T040 [US3] Add success/error feedback for waitlist submission

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Explore Premium Website (Priority: P4)

**Goal**: Present a premium appearance with modern glassmorphism, gradients, and consistent styling

**Independent Test**: The website should consistently look and feel premium across all pages with appropriate design elements.

### Implementation for User Story 4

- [x] T041 [US4] Implement glassmorphism design elements across all pages
- [x] T042 [P] [US4] Add gradient styling to UI components
- [x] T043 [P] [US4] Create premium theme components with shadcn/ui
- [x] T044 [US4] Apply premium styling to book content layout
- [x] T045 [US4] Implement consistent visual design across all pages
- [x] T046 [US4] Optimize visual design for different screen sizes
- [x] T047 [US4] Implement accessibility features with ARIA attributes

**Checkpoint**: All user stories should now be implemented with premium design

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T048 [P] Documentation updates in README.md
- [x] T049 Code cleanup and refactoring
- [x] T050 Performance optimization across all stories (bundle size < 150KB)
- [x] T051 [P] Additional unit tests (if requested) in tests/unit/
- [x] T052 Security hardening
- [x] T053 Run quickstart.md validation
- [x] T054 Configure Docusaurus plugins for enhanced functionality
- [x] T055 Add comprehensive accessibility testing
- [x] T056 Deploy to Vercel with Docusaurus configuration

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P4)**: Can start after Foundational (Phase 2) - May integrate with other stories but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Integration test for book page functionality in tests/integration/test_book_page.ts"
Task: "Unit test for progress tracking functionality in tests/unit/test_progress.ts"

# Launch all models for User Story 1 together:
Task: "Create chapters data model in types/global.d.ts"
Task: "Create mock chapter data in lib/mockData.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence