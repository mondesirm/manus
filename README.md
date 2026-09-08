# Manus

Manus is a focused user management workspace built with Next.js 16, Clerk, Prisma Postgres, and Once UI.

## Setup

Use pnpm for all project commands:

```bash
pnpm install
copy .env.example .env.local
pnpm db:generate
pnpm dev
```

Set `DATABASE_URL`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, and `CLERK_SECRET_KEY` in `.env.local`. Run `pnpm db:migrate` when a Postgres database is available.

## Roles

Clerk `publicMetadata.role` controls access. Set it to `admin` for an administrator; authenticated users without that value are treated as regular users. The app mirrors active Clerk profiles into Prisma when protected pages are visited.

## Commands

- `pnpm dev` starts local development.
- `pnpm lint` runs ESLint.
- `pnpm typecheck` checks TypeScript.
- `pnpm db:generate` generates the Prisma client.
- `pnpm db:migrate` creates and applies a local migration.

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
