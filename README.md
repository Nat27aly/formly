# Formly

Formly is a Next.js web application that lets you design custom forms, share them through a public link, and collect responses from a private dashboard.

## Core Features

- 🧑‍💼 Authentication powered by Clerk (sign in / sign up flows).
- 🛠️ Visual builder to create and update forms with multiple questions.
- 📊 Dashboard with metrics, form lists, and response management.
- 🔗 Public URL for every form to share with respondents.
- 🗃️ Persistent storage using Prisma and PostgreSQL.

## Tech Stack

- Next.js 15 (App Router) and React 19
- TypeScript
- Tailwind CSS 4  (with shadcn/ui)
- Prisma ORM with Prisma Accelerate
- Clerk for authentication
- PostgreSQL as the database

## Prerequisites

- Node.js 18 or higher
- An accessible PostgreSQL database
- Clerk account and API keys

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment variable template:

   ```bash
   cp .env.example .env
   ```

3. Fill in the values in `.env`:

   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `DATABASE_URL`
   - `NEXT_PUBLIC_APP_URL` (for example `http://localhost:3000/`)

4. Generate the Prisma client and sync the schema with your database:

   ```bash
   npx prisma generate
   npx prisma db push
   ```

## Development

```bash
npm run dev
```

The application runs at [http://localhost:3000](http://localhost:3000).

## Useful Scripts

| Command          | Description                              |
|------------------|------------------------------------------|
| `npm run build`  | Create a production build                 |
| `npm run start`  | Start the app in production mode          |
| `npm run lint`   | Run ESLint rules                          |
| `npm run pretty` | Format code with Prettier                 |

## Project Structure

- `app/`: Public and protected routes (App Router).
- `components/`: Reusable UI and form components.
- `lib/`: Utilities, Prisma client, and Clerk integration.
- `prisma/`: Database schema and ORM configuration.
- `public/`: Static assets.

## Deployment

When deploying to production make sure to:

- Provide the same environment variables defined in `.env`.
- Run `npm run build` followed by `npm run start` on your hosting provider (Vercel, Railway, etc.).
- Set a valid `NEXT_PUBLIC_APP_URL` so shareable form links resolve correctly.
