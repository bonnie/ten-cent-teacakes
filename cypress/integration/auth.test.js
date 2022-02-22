describe(
  "whitelist tests",
  {
    env: {
      AUTH0_WHITELIST: "test@test.test",
    },
  },
  () => {
    test("non whitelist user", () => {});
  },
);
