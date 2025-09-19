# BrightHR Senior Frontend Developer Techtask

## Technical Documentation

### Overview

This project is a full-stack web application built with [Next.js](https://nextjs.org), TypeScript, and React. It features a modular architecture, robust state management, and a modern UI using Tailwind CSS. The application is designed for scalability, maintainability, and ease of deployment.

## Live Url (Deployed to Cloudflare)

[https://employee-absence-app.praizjosh.workers.dev/](https://employee-absence-app.praizjosh.workers.dev/)

### Features

- Employee absence management and overview
- Flags employee with frequent absence
- Paginated, filterable, and sortable tables via Tanstack Table
- API integration and data fetching with React Query
- Unit and integration tests with Jest and Testing Library
- Strict linting and formatting for code quality

### Project Structure

```
src/
  app/                # Next.js app directory (routing, pages, layout)
  components/         # Reusable UI and core components
  lib/                # Utilities, constants, API logic
  types/              # TypeScript type definitions
  ...
public/               # Static assets
```

### Main Technologies

- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- React Query
- Tanstack Table
- Jest & Testing Library
- Cloudflare Worker
- GitGub Workflow

### Setup & Development

1. **Install dependencies:**
    ```bash
    npm install
    ```
2. **Run development server:**
    ```bash
    npm run dev
    ```
3. **Run tests:**
    ```bash
    npm test
    ```
4. **Lint & format:**
    ```bash
    npm run lint
    npm run lint:fix
    ```

### Build & Deployment

1. **Build for production:**
    ```bash
    npm run build
    ```
2. **Start production server:**
    ```bash
    npm start
    ```

### Git Hooks & Commit Message Linting

This project uses [Husky](https://typicode.github.io/husky/) to enforce code quality and commit message standards:

- **Pre-commit & commit-msg hooks:**
    - On commit, Husky runs lint-staged, all Jest tests, and commitlint to ensure only well-formatted, tested, and conventionally named commits are allowed.
    - The `.husky/commit-msg` script:

        ```sh
        npx lint-staged && npx jest && npx --no -- commitlint --edit $1 --config commitlint.config.mjs
        ```

        - Runs lint-staged (auto-fixes and lints staged files)
        - Runs all Jest tests
        - Checks commit message format using commitlint

- **Commitlint:**
    - Enforces [Conventional Commits](https://www.conventionalcommits.org/) with a max header length of 140 characters.
    - Ignores messages starting with `chore(release):`.
    - See `commitlint.config.mjs`:
        ```js
        export default {
            extends: ["@commitlint/config-conventional"],
            rules: {
                "header-max-length": [2, "always", 140],
            },
            ignores: [(message) => message.startsWith("chore(release):")],
        };
        ```

---

### Testing

- Unit and integration tests are located in alongside components/hooks.
- Run all tests with `npm test`.
- Coverage reports are generated in the `coverage/` directory.

### Linting & Formatting

- ESLint and Prettier are configured for code quality.
- Run `npm run lint` and `npm run lint:fix` to check and fix issues.

### Folder Aliases

- Use `@/` as an alias for the `src/` directory (see `tsconfig.json`).

---

### Further Improvements

Would love to add the following features

- Add search functionality to table to search by keywords eg. Name, absence type, approval status, etc
- Show sidebar containing other employees with conflict within single employee view
- Automate direct cloudflare CI deployment with GitHub workflow

---

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
