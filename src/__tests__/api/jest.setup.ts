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

import { resetDB } from './prisma/reset-db'

// mock revalidation secret tests and unstable_revalidate
// can't mock from test files: https://github.com/facebook/jest/issues/335
// (mocked module must be called directly from file imported by test file)
jest.mock("@/lib/api/utils", () =>
  jest.requireActual("@/__mocks__/modules/api/utils")
);

// don't ever actually run revalidation_secret
// jest.mock();

jest.mock("", () => 
   jest.requireActual("@/__mocks__/modules/next/Link")
);

beforeAll(async () => {
  // seed db
  await resetDB();
});

afterEach(async () => {
  // reset and seed db
  await resetDB();
});

afterAll(async () => {

});
