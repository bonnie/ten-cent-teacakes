// --setupFilesAfterEnv ./jest.setup-db.js --testPathPattern /__tests__/api/.*/ --testNamePattern /.*.test.[jt]sx?$/

const nextJest = require("next/jest");
// eslint-disable-next-line import/no-extraneous-dependencies
const { defaults } = require("jest-config");

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: ".",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleNameMapper: {
    // Handle module aliases
    "^@/(.*)$": "<rootDir>/../../$1",
  },
  setupFilesAfterEnv: ["./jest.setup.ts"],
  testRegex: "(/./.*|(\\.|/)(test))\\.[jt]sx?$",
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: [...defaults.moduleFileExtensions, "ts", "tsx"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);

// module.exports = {
//   setupFilesAfterEnv: ["./jest.setup.js"],
//   testRegex: "(/__tests__/api/.*|(\\.|/)(test))\\.[jt]sx?$",
//   // "moduleNameMapper": {
//   //   "@/(.*)": "<rootDir>/$1"
//   // }
// };
