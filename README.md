# Ten Cent Teacakes

### Web site for the Ten Cent Teacakes Band

## Set up Developer Environment

### Prisma and SQL db

1. Create a SQL (PostgreSQL, MySQL etc) db for the project
1. `mv .env_template .env`
1. Add the URL for your db to `.env`
1. Run `npx prisma migrate dev --name init --schema src/prisma/schema.prisma` to add the tables from the prisma schema to your db

### Auth0

1. `mv .env_template .env`
   TODO: update for auth0 / sentry

## Run Jest Tests

```bash
npm test
```
