<!--
SYNCHRONIZATION IMPACT REPORT:
- Version change: N/A -> 1.0.0
- Modified principles: N/A (new constitution)
- Added sections: All sections are new for this project
- Removed sections: N/A
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md: Will be checked
  - ✅ .specify/templates/spec-template.md: Will be checked
  - ✅ .specify/templates/tasks-template.md: Will be checked
  - ✅ .specify/templates/commands/*.md: Will be checked
  - ✅ README.md: Will be checked
- Follow-up TODOs: None
-->
# AI-Native Driven Development – Premium Book Website Constitution

## Core Principles

### Zero External UI Libraries Except shadcn/ui & Tailwind
All UI components must exclusively use shadcn/ui and/or Tailwind CSS. No additional UI libraries or frameworks beyond these approved tools are permitted. This ensures consistent design language and minimal bundle size.
<!-- Rationale: Maintains design consistency and reduces complexity -->

### Mobile-First, Glassmorphism + Gradient Design
Development must follow a mobile-first approach with glassmorphism and gradient design elements. All components must be responsive and maintain visual appeal across all device sizes. Visual design must incorporate modern glassmorphism effects with carefully selected gradients.
<!-- Rationale: Ensures accessibility across devices and modern aesthetic appeal -->

### MDX for All Book Content (Easy Future Updates)
All book content must be authored in MDX format to enable easy future updates and maintainability. Content in the /content/chapters/ directory must follow MDX standard for flexibility.
<!-- Rationale: Enables dynamic content rendering and ease of content updates -->

### Dark/Light Mode Toggle
Every component and page must support both dark and light mode with a user-accessible toggle. Themes must be consistent across the entire application with appropriate contrast ratios maintained.
<!-- Rationale: Improves user accessibility and experience in different lighting conditions -->

### Lightning Fast (<1.5s FCP)
All pages must achieve First Contentful Paint (FCP) in under 1.5 seconds. Performance metrics must be monitored and optimized continuously. Bundle size must remain under 150KB excluding images.
<!-- Rationale: Ensures optimal user experience and SEO benefits -->

### 100% Accessible (ARIA + Keyboard Nav)
Complete accessibility compliance is mandatory using proper ARIA attributes and full keyboard navigation support. All components must pass accessibility audits and support screen readers effectively.
<!-- Rationale: Ensures inclusive design and compliance with accessibility standards -->

## Standards and Technical Requirements

- TypeScript strict mode must be enabled for all code
- All components must be reusable and follow DRY principles
- Chapter content must be stored in /content/chapters/
- Total bundle size must remain under 150KB without images
- Strict typing and error handling required throughout

## Project Constraints

- Limited to 4 pages only: Home, Book, About, Contact
- Book content consists of exactly 5 chapters with 2 topics each
- Deployment limited to Vercel (free tier)
- Maximum of 10 unique component types to maintain simplicity

## Governance
This constitution supersedes all other practices for this project. Amendments require documentation of the change, impact assessment, and team approval before implementation. All PRs and reviews must verify compliance with these principles. Code reviews must validate adherence to performance, accessibility, and design standards.

**Version**: 1.0.0 | **Ratified**: TODO(RATIFICATION_DATE): Date of original adoption needed | **Last Amended**: 2025-12-15