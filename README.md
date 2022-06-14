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
1. Run `npm run prisma:init` to add the tables from the prisma schema to your db

#### Notes on Prisma and Supabase

Reference: https://supabase.com/docs/guides/integrations/prisma

- _migration_

  - DATABASE_URL="postgres://postgres:<password>@db.<db id>.supabase.co:5432/postgres"

- _queries_
  - DATABASE_URL="postgres://postgres:<password>@db.<db id>.supabase.co:6543/postgres?pgbouncer=true"

### Auth0

1. `mv .env.local_template .env.local`
1. Populate variables according to comments

### Sentry

1. `npx @sentry/wizard -i nextjs` (and follow instructions)
1. Add `SENTRY_DSN` value to `.env.local`

## Tests

### Running Tests Locally

#### UI tests (Jest, no database)

```bash
npm run test:ui
```

#### API tests (Jest, with test database)

```bash
npm run test:db:migrate
npm run test:api
```

#### E2E tests (Cypress, with test database)

```bash
npm run test:db:migrate
npm run dev
npm run cypress:run
```

## Deployment and CI

### GitHub

For Vercel / Cypress, the following variables are needed as GitHub secrets (repo -> settings -> secrets -> actions -> repository secrets):

1. `VERCEL_TOKEN` (https://vercel.com/account/tokens)
1. `CYPRESS_LOCALSTORAGE_KEY` (For more secure Cypress user. **Must match** the value in .env.local)
1. `AUTH0_USERNAME` (some email that exists in Auth0 instance)
1. `AUTH0_PASSWORD` (password for the above email)
1. `AUTH0_DOMAIN` (example: `xyz.us.auth0.com`)
1. `AUTH0_CLIENT_ID` (from Auth0 Application settings)
1. `AUTH0_CLIENT_SECRET` (from Auth0 Application settings)
1. `AUTH0_AUDIENCE` (should match the one in tenant -> settings -> API Authorization Settings)
1. `AUTH0_SCOPE` (value should probably be `"openid profile email"`)
1. `SUPABASE_URL` and `SUPABASE_KEY` (from `.env.local`)
1. `REVALIDATION_SECRET` (**Must match** value from `.env.local`)
1. `APP_ENV` (set to "test" -- for ISR revalidation endpoint)

**Note**: Cypress is run as a Github action instead of through CircleCI so that it can depend on branch deploy success, and use the branch deploy url.

#### `main` branch restrictions

Since anything pushed / merged to `main` will be live right away, enact these restrictions

1. Make a GitHub branch protection rule for `main` that you can't push directly ("Require a pull request before merging").
1. Make a GitHub branch protection rule for `main` that uses CircleCI and Vercel checks as requirement to merge ("Require status checks to pass before merging")
   Reference: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule

### Vercel

1. Create a new project in Vercel and link GitHub repo (https://vercel.com/docs/concepts/git#deploying-a-git-repository)
1. Run `npx vercel link`
1. Follow instructions to specify the linked project.
1. Add the following keys to the project environment variables (https://vercel.com/docs/concepts/projects/environment-variables)
   - same for all environments
     - `SENTRY_AUTH_TOKEN` (from `.sentryclirc`)
     - `SENTRY_DSN` (from `.env.local`)
     - `CYPRESS_LOCALSTORAGE_KEY` (**Must match** value in GitHub and .env.local )
     - `REVALIDATION_SECRET` (**Must match** value in GitHub and .env.local)
   - diffferent for production vs. preview / development
     - `DATABASE_URL` (from `.env`)
     - `AUTH0_*` (from `.env.local`)
     - `SUPABASE_*` (from `.env.local`)

### Circle CI

1. Create `.circleci/config.yml` file
1. Create a new CircleCI project associated with this repository (https://circleci.com/docs/2.0/project-build/#adding-projects)
1. Enable GitHub checks (https://circleci.com/docs/2.0/enable-checks/)
1. Add `DATABASE_URL` environment variable (https://circleci.com/docs/2.0/env-vars/)
1. Add `DB_BASEURL` environment variable (DB url before port; example: `DATABASE_URL="postgres://postgres:<password>@db.<db id>.supabase.co`). Needed because of difference between migration endpoint vs. queries endpoint.
1. Add `CYPRESS_INSTALL_BINARY` environment variable, set to 0 (https://docs.cypress.io/guides/getting-started/installing-cypress#Environment-variables)
1. `REVALIDATION_SECRET` (**Must match** value in GitHub, Vercel and .env.local)

### Auth0 for Preview Deploys

For each preview deploy git branch, **before** pushing to GitHub:

1. Update `https://manage.auth0.com/dashboard/us/ten-cent-teacakes-dev/applications/<client id>/settings` **-> Application URIs -> Allowed Callback URLs**

   with

   `https://ten-cent-teacakes-git-<branch name>-bonnie.vercel.app/api/auth/callback`

1. Update `https://vercel.com/bonnie/ten-cent-teacakes/settings/environment-variables` **AUTH0_BASE_URL** (for Preview / Development)

   with

   `https://ten-cent-teacakes-git-<branch name>-bonnie.vercel.app/`
