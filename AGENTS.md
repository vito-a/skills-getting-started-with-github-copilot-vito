# AGENTS

This repository contains a small FastAPI application with a static frontend and a teacher admin interface.
Agents working in this repo should follow the guidance below.

## Project Overview

- Backend: `src/app.py` (FastAPI)
- Frontend: `src/static/index.html`, `src/static/styles.css`, `src/static/app.js`
- Admin page: `src/static/admin.html`, `src/static/admin.js`
- Static files are served from `/static`
- Admin redirect endpoint: `/admin` → `/static/admin.html`

## Generic System Prompt

You are a coding assistant working in a VS Code workspace for a school activities app.
Follow these rules:

1. Understand the user request before making changes.
2. Use the repository files and current project structure.
3. Make small, safe edits; prefer minimal diffs.
4. Always include clear commit descriptions when asked to commit.
5. Preserve existing behavior unless the user asks for a change.
6. Do not add unrelated features or dependencies without user consent.
7. When editing files, keep code valid and consistent with existing style.
8. If the user asks to push, verify the branch and remote, then push only the intended commit.

## Commit Requirements

When committing changes:

- Use descriptive commit messages that mention the feature or fix.
- Example messages:
  - `Add teacher admin interface for activity management`
  - `Fix accessibility contrast issue for Teacher Admin link`
  - `Update activity signup validation and error messaging`
- Stage only the files related to the change.
- Confirm that the commit is pushed to `origin main` if requested.

## Accessibility Requirements

Agents should pay attention to accessibility best practices:

- Ensure sufficient color contrast for text and links.
- Use readable font sizes and semantic HTML.
- Add `aria-*` labels when needed.
- Make interactive controls keyboard accessible.
- Prefer descriptive link text.
- When a specific issue is reported (e.g. axe DevTools), fix the reported element directly.

## Admin-end URLs

The repository currently provides a teacher admin interface at:

- `/admin` — redirects to the admin page
- `/static/admin.html` — the teacher admin page itself

Teacher admin features include:

- Viewing current activities and participant lists
- Adding new activities
- Adding students to activities

## Skills and Actions

Agents should be able to:

- Edit Python, HTML, CSS, and JavaScript files.
- Add new static assets when needed.
- Implement backend API endpoints in `src/app.py`.
- Wire frontend forms to backend routes.
- Fix accessibility issues such as contrast and labels.
- Use `git` for staging, committing, and pushing changes when requested.

## Best Practices

- Keep markup simple and maintainable.
- Reuse existing CSS patterns where possible.
- Avoid hard-coded values unless necessary.
- Test code logically by inspecting changes and using available tools.
- When the user requests a feature, implement it fully and cleanly.

## Notes

- Do not create duplicate pages or features unless the user explicitly asks.
- `src/static/styles.css` contains the main UI styling.
- `src/app.py` is the single source of backend route logic.
- New features should be documented clearly in the commit message.
