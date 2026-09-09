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

===

Modify according to the following:

Routes
- Rename `/user` route to `/profile`
- Rename `/admin` route to `/directory`
- Group `login` and `register` routes into `(auth)` folder

Profile
- Turn "Account status" row into a "Organization" row (use optional chaining and a placeholder if none)

Directory
- Replace "Admin workspace" by "Members of [organization name]"
- Sort the directory by role then full name
- Add a status indicator on the avatars (if they're currently logged in) with a "Last Active: [Date]" tooltip
- Columns with dates should be divs
- Replace the `updateUserRole` action by an action that removes the user from its organization (disable the button, update the list and show a temporary toast message)
- Add an invite button (+ email input) to invite users to the organization if they aren't members of an org already (`clerkClient.organizations.inviteMember()`), show toast message
- Add a second table with ongoing invites (for each invite, add a cancel action with toast message)

Bugs to fix
- `clerkUser.publicMetadata.role` may not exist so use optional chaining
- Authenticated users should have a "user" key be redirected to their profile and not the homepage
- Remove the white background from the `.profile-card` CSS class
- Add a `width: fit-content;` declaration to the `.roll-pill` and `.count-pill` CSS classes
- Replace `.person-cell > div:last-child span, .directory-row > span, .directory-row > div + span, .directory-row > p` by `.person-cell > div:last-child span, .directory-row > p`
- Add `appearance={{ variables: { colorPrimary: '#de7c65' } }}` to all Clerk components (use reusable constant)

Landing page
- "Sign In" button becomes a shimmering "Get Started" button
- This aforementioned button and the "Start your workspace" lead to `/login`
- The hero title should have a typewriter animation using several words with this format: "Make room for <em>[insert cohesive word]</em>."
- Fix broken links and lack of content (logo carousel of companies who trust us, animated and consistently illustrated feature presentation, demo booking CTA (cal.eu/mondesirm/discovery-call) and Clerk's <PricingTable />
- Add a footer with contact info extracted from mondesirm.me (+ dynamic copyright with the company name being "mondesirm")

Header
- Create a reusable shared `Header` component for static pages and another one for protected routes
- Style nav links when the href matches current route
- The `.brand` CSS class should have the Times New Roman font
- The `.primary-button` and `.secondary-button` CSS classes should have the `text-transform: uppercase;` declaration
