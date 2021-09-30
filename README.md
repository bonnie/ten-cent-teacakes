# Ten Cent Teacakes

### Web site for the Ten Cent Teacakes Band

## Set up Developer Environment

1. Create a SQL db for the project
1. `mv .env_template .env`
1. Add the URL for your db to `.env`
1. Run `npx prisma migrate dev --name init` to add the tables from the prisma schema to your db
1. Run `npx prisma db seed`

## Run Jest Tests

```bash
npm test
```
