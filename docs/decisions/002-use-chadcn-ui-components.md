# 002: Use Shadcn UI Components

**Date:** 2024-06-01

## Context

We needed a modern, accessible, and customizable component library for our Next.js dashboard. The UI
should be consistent, easy to theme, and compatible with Tailwind CSS.

## Options Considered

- Material UI
- Chakra UI
- Headless UI
- [Shadcn UI](https://ui.shadcn.com/)

## Decision

We chose **Shadcn UI** because it provides accessible, headless components built with Radix UI
primitives and styled with Tailwind CSS. It fits well with our tech stack and design requirements.

## Consequences

- **Pros:**
  - Easy to customize with Tailwind CSS.
  - Accessible by default.
  - Composable and unstyled by default, allowing for flexible design.
  - Good documentation and active development.
- **Cons:**
  - Smaller ecosystem than Material UI.
  - Some components may require manual setup or additional configuration.
- **Alternatives:**
  - Nan for now
  - We may consider other libraries in the future if our needs change or if Shadcn UI does not meet
    our requirements.
