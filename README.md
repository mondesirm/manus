Build Manus, a full-stack user management app using:
- Next.js 16 (App Router)
- Prisma Postgres + Clerk for table structure and authentication logic
- Once UI for styling pages

Routes / Features:
- `/` is a beautiful landing page
- `/login` and `/register` are handled by Clerk and authenticate admins or users
- `/admin` is an admin-only view to manage users, use an empty state if there aren't any
- `/user` is an user-only view that displays the user's profile

DO NOT forget to use `pnpm` instead of `npm`
