# Advisor Backend

A modern Node.js backend application built with Bun, EdgeDB, and Express.

## Getting started

To get the project running locally, enter the following commands in order in your terminal

```bash
  bun install
  npx gel project init # Go through the setup process and accept the defaults
  bun run db:migrate
  bun run gen:code
  bun run dev
```

## Project Structure

- `src/` - Source code
- `dbschema/` - EdgeDB schema files
- `public/` - Static files and API documentation
- `util/` - Utility scripts

## Available Scripts

- `bun run dev` - Start development server
- `bun run build` - Build for production
- `bun run test` - Run tests
- `bun run gen:code` - Generate EdgeDB TypeScript bindings
- `bun run db:migrate` - Create and apply database migrations
- `bun run format` - Format code with Biome
- `bun run lint` - Lint code with Biome

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
SESSION_SECRETKEY=your-secret-key
```

## Tech Stack

- **Runtime**: Bun
- **Database**: EdgeDB
- **API Framework**: Express with express-zod-api
- **Authentication**: Passport.js
- **Logging**: Pino
- **File Storage**: MinIO
- **AI**: Google Gemini
- **Code Quality**: Biome (linting & formatting)
- **Testing**: Vitest
