# Next.js Template

A minimal, batteries-included template to kickstart new projects immediately.

## Tech Stack

| Category   | Technology                                                                                            |
| ---------- | ----------------------------------------------------------------------------------------------------- |
| Framework  | [Next.js](https://nextjs.org) 16 (App Router, Turbopack)                                              |
| Language   | [TypeScript](https://www.typescriptlang.org) 5 (strict mode)                                          |
| Styling    | [Tailwind CSS](https://tailwindcss.com) 4                                                             |
| Testing    | [Vitest](https://vitest.dev) + [Testing Library](https://testing-library.com)                         |
| Linting    | [ESLint](https://eslint.org) 9 (flat config)                                                          |
| Formatting | [Prettier](https://prettier.io) (import sorting + Tailwind class sorting)                             |
| Git Hooks  | [Husky](https://typicode.github.io/husky) + [lint-staged](https://github.com/lint-staged/lint-staged) |
| Font       | [Geist](https://vercel.com/font) (next/font)                                                          |

## Getting Started

```bash
# 1. Create a repo from this template
gh repo create my-app --template <this-repo> --clone
cd my-app

# 2. Match Node.js version (.nvmrc: 22.14.0)
nvm use

# 3. Install dependencies
npm install

# 4. Start the dev server
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command          | Description                  |
| ---------------- | ---------------------------- |
| `npm run dev`    | Start dev server (Turbopack) |
| `npm run build`  | Production build             |
| `npm start`      | Start production server      |
| `npm run lint`   | Run ESLint                   |
| `npm run format` | Format code with Prettier    |
| `npm test`       | Run tests (Vitest)           |

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Tailwind CSS + theme definition
│   ├── layout.tsx       # Root layout (Geist font)
│   ├── page.tsx         # Home page
│   ├── robots.ts        # robots.txt generation
│   └── sitemap.ts       # sitemap.xml generation
└── lib/
    ├── utils.ts         # Utilities (cn function)
    └── utils.test.ts    # Tests
```

## Included Features

### Path Aliases

```ts
// src/
import config from '@@/next.config';

import { cn } from '@/lib/utils';

// project root
```

### `cn()` Utility

Safe class name merging powered by `clsx` + `tailwind-merge`.

```tsx
<div className={cn('px-4 py-2', isActive && 'bg-blue-500')} />
```

### Pre-commit Hook

lint-staged automatically runs ESLint + Prettier on staged files at commit time.

### SEO

Includes `robots.ts` and `sitemap.ts`. Set the `NEXT_PUBLIC_BASE_URL` environment variable for your production URL.

### Bundle Analyzer

```bash
ANALYZE=true npm run build
```

## Customization

After creating a project from this template:

1. Update the `name` field in `package.json`
2. Update `metadata` in `src/app/layout.tsx` (title & description)
3. Replace `src/app/favicon.ico`
4. Set the `NEXT_PUBLIC_BASE_URL` environment variable
