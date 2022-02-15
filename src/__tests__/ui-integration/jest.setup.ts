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

import { server } from "../../__mocks__/msw/server";

// mock supabase methods
jest.mock("@/lib/supabase/utils", () =>
  jest.requireActual("@/lib/supabase/__mocks__/utils")
);
jest.mock("@/lib/supabase/hooks/useSupabasePhoto", () =>
  jest.requireActual("@/lib/supabase/hooks/__mocks__/useSupabasePhoto")
);

// mocking returned user
// jest.mock("@/lib/auth/useWhitelistUser", () => ({
//   __esModule: true,
//   useWhitelistUser: jest
//     .fn()
//     .mockReturnValue({ user: { email: "test@test.com" } }),
// }));

// swallow twind / tailwindcss warnings
// TODO: is there a more legit way to suppress these?
// eslint-disable-next-line no-console
console.warn = (warning) => {
  if (!warning.match(/\[UNKNOWN_(DIRECTIVE|THEME_VALUE)\]/))
    // eslint-disable-next-line no-console
    console.log('WARNING:', warning)
}

beforeAll(() => {
  // msw: Establish API mocking before all tests.
  server.listen();

  // reset mocks
  jest.resetModules()
});

afterEach(() => {
  // msw: Reset any request handlers that we may add during the tests,
  // so they don't affect other tests.
  server.resetHandlers();
});

afterAll(() => {
  // msw: Clean up after the tests are finished.
  server.close();
});
