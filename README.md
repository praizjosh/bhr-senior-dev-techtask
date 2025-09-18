# bhr-senior-dev-techtask

## Technical Documentation

### Overview

This project is a full-stack web application built with [Next.js](https://nextjs.org), TypeScript, and React. It features a modular architecture, robust state management, and a modern UI using Tailwind CSS. The application is designed for scalability, maintainability, and ease of deployment.

### Features

- Employee absence management and overview
- Paginated, filterable, and sortable tables
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
- Jest & Testing Library

### Setup & Development

1. **Install dependencies:**
    ```bash
    npm install
    # or yarn install
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
3. **Deploy:**
    - Recommended: Deploy on [Vercel](https://vercel.com/) for seamless Next.js hosting.
    - Alternatively, deploy the `.next` build output on any Node.js server.

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

- Unit and integration tests are located in `src/lib/api/__tests__/` and alongside components.
- Run all tests with `npm test`.
- Coverage reports are generated in the `coverage/` directory.

### Linting & Formatting

- ESLint and Prettier are configured for code quality.
- Run `npm run lint` and `npm run lint:fix` to check and fix issues.

### Folder Aliases

- Use `@/` as an alias for the `src/` directory (see `tsconfig.json`).

---

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
