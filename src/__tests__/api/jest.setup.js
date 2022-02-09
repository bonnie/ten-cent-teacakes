/* eslint-disable comma-dangle */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-extraneous-dependencies */
// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`
// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

// eslint-disable-next-line no-unused-vars
import { describe, expect, test } from "@jest/globals";

import { seedDb } from "@/__tests__/prisma/seed-test-db";
import prismaClient from "@/__tests__/prisma/test-prisma-client";

// // if mocking db rather than using test db
// jest.mock("@/lib/prisma/queries/venues", () =>
//   jest.requireActual("@/lib/prisma/queries/__mocks__/venues")
// );

beforeAll(async () => {
  // migrate and seed db
  prismaClient.$migrate();
  await seedDb(prismaClient);
});

afterEach(async () => {
  // reset and seed db
  await prismaClient.$reset();
  await seedDb(prismaClient);
});

afterAll(() => {});
