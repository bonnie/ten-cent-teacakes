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

### Auth0

1. `mv .env.local_template .env.local`
1. Populate variables according to comments

### Sentry

1. `npx @sentry/wizard -i nextjs` (and follow instructions)
1. Add `SENTRY_DSN` value to `.env.local`

## Tests

### Run Jest Tests

```bash
npm test
```

## Deployment and CI

### Vercel

1. Create a new project in Vercel and link GitHub repo (https://vercel.com/docs/concepts/git#deploying-a-git-repository)
1. Run `npx vercel link`
1. Follow instructions to specify the linked project.
1. Add the following keys to the project environment variables (https://vercel.com/docs/concepts/projects/environment-variables)
   - `SENTRY_AUTH_TOKEN` (from `.sentryclirc`, all environments)
   - `DATABASE_URL` (from `.env` different for production vs. preview / development)
   - `AUTH0_*` (from `.env.local`)
   - `SENTRY_DSN` (from `.env.local`)

### Circle CI

1. Create `.circleci/config.yml` file
1. Create a new CircleCI project associated with this repository (https://circleci.com/docs/2.0/project-build/#adding-projects)
1. Enable GitHub checks (https://circleci.com/docs/2.0/enable-checks/)

### `main` branch restrictions

Since anything pushed / merged to `main` will be live right away, enact these restrictions

1. Make a GitHub branch protection rule for `main` that you can't push directly ("Require a pull request before merging").
1. Make a GitHub branch protection rule for `main` that uses CircleCI and Vercel checks as requirement to merge ("Require status checks to pass before merging")
   Reference: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule
