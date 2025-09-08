# First Interior Website

A full-stack web application built with React, Express, TypeScript, and PostgreSQL.

## Features

- Modern React frontend with TypeScript
- Express.js backend with TypeScript
- PostgreSQL database with Drizzle ORM
- Authentication with Passport.js
- Responsive design with Tailwind CSS
- Component library with Radix UI

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Fill in your database URL and other required variables.

4. Set up the database:
   ```bash
   npm run db:push
   npm run db:seed
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Vercel Deployment

This project is configured for easy deployment to Vercel:

### Prerequisites

1. A Vercel account
2. A PostgreSQL database (e.g., Neon, Supabase, or Vercel Postgres)

### Deployment Steps

1. **Connect your repository to Vercel:**
   - Import your project on Vercel
   - Connect your GitHub/GitLab repository

2. **Configure environment variables in Vercel:**
   - Go to your project settings
   - Add the following environment variables:
     - `DATABASE_URL`: Your PostgreSQL connection string
     - `SESSION_SECRET`: A secure random string for session management
     - `NODE_ENV`: Set to `production`

3. **Deploy:**
   - Vercel will automatically detect the configuration and deploy
   - The build process will:
     - Build the React frontend with Vite
     - Bundle the Express server with esbuild
     - Deploy to Vercel's Node.js runtime

### Database Setup for Production

Before deploying, ensure your database is set up:

1. Create a PostgreSQL database
2. Run the migrations:
   ```bash
   npm run db:push
   ```
3. Seed the database (if needed):
   ```bash
   npm run db:seed
   ```

### Vercel Configuration

The project includes:
- `vercel.json`: Configuration for Vercel's build and routing
- Optimized build scripts for production deployment
- Environment variable handling for different deployment stages

## Project Structure

```
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── vite.ts            # Vite integration for development
├── shared/                 # Shared types and schemas
├── migrations/            # Database migrations
└── dist/                  # Build output (generated)
```

## Technologies Used

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Radix UI
- **Backend:** Express.js, TypeScript, Passport.js
- **Database:** PostgreSQL, Drizzle ORM
- **Deployment:** Vercel
- **Development:** ESLint, TypeScript, Vite

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema
- `npm run db:seed` - Seed database

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and type checking
5. Submit a pull request

## License

MIT License
