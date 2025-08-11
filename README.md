# BETTER-AUTH Authentication for NestJs Turborepo with Postgresql Database
👉  [(API) See it in action here](https://better-auth-deep-dive.onrender.com/docs)

👉  [(Next.js) See it in action here](https://better-auth-deep-dive-web.vercel.app/)

### Overview
This repository contains a basic authentication implementation for NestJS applications within a Turborepo monorepo environment, using PostgreSQL as the database. The solution leverages the `better-auth` library to provide secure and scalable authentication features.

### Features
- ✅ JWT-based authentication
- ✅ PostgreSQL database integration
- ✅ Type-safe implementation
- ✅ Configuration via environment variables
- ✅ Ready-to-use auth module for NestJS
- ✅ NestSwagger and Scalar for api endpoint visiualization

### Prerequisites
- Node.js (v22 or later recommended)
- PostgreSQL (^8.16.3 or later)
- Turborepo setup

### Installation
1. Clone the repository
```sh 
https://github.com/aljimsondev/better-auth-deep-dive.git
```

2. Set up your environment variables in `apps/api/.env`:
```
# DB
DB_CONNECTION_STRING="" # your postgres database connection string

# BETTER AUTH
BETTER_AUTH_URL="http://localhost:3001"
BETTER_AUTH_SECRET="your-super-secret-key"

# OAUTH
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""

# DEPLOYED URL
DEPLOYMENT_URL=""
```

### Database Setup
1. Ensure your PostgreSQL database is running
2. Run `generate-schema` script for generating necessary database schema
   ```sh
   npm run generate-schema
   ```
3. Run drizzle scripts
   - Generate from database schema, the output should be inside `drizzle` folder as specified in `drizzle.config.ts`
   ```sh
   npm run generate
   ```
   - Run the migration script, updating your database schema
    ```sh
   npm run migrate
   ```

### Internal API Endpoints (for testing authentication)
- `/api/user/me` - retrieve the user session
- `/api//user/login` - user sign-in
- `/api/user/sign-up` - user sign-up
- `/api/user/sign-out` - user sign-out

### Contributing
Contributions are welcome! Please open an issue or submit a pull request.
