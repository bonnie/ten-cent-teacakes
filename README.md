# Ten Cent Teacakes

### Web site for the Ten Cent Teacakes Band

## Set up Developer Environment

### Git Pre-commit

To save time for CI and not bother to commit if lint / ts checks fail.

`cp git-pre-commit .git/hooks/`

### Prisma and SQL db

1. Create a SQL (PostgreSQL, MySQL etc) db for the project
1. `mv .env_template .env`
1. Add the URL for your db to `.env`
1. Run `npx prisma migrate dev --name init --schema src/prisma/schema.prisma` to add the tables from the prisma schema to your db

### Auth0 and Sentry

1. `mv .env.local_template .env.local`
1. Populate variables according to comments

### Vercel

1. Run `npx vercel link`
1. Follow instructions to specify the linked project.

### Circle CI

## Run Jest Tests

```bash
npm test
```
