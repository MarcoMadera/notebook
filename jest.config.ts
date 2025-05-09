import { defaults } from "jest-config";
import nextJest from "next/jest";
import { join } from "path";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  roots: [process.cwd()],
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!**/types/**",
    "!**/.storybook/**",
    "!**/stories/**",
    "!**/pages/**",
    "!**/layouts/**",
    "!**/context/**",
    "!**/*.js",
    "!**/*.mjs",
    "!**/*.stories.tsx",
  ],
  testEnvironment: "jsdom",
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    "ts",
    "tsx",
    "js",
    "json",
    "jsx",
  ],
  moduleNameMapper: {
    "^@/(.*)$": join(process.cwd(), "src", "$1"),
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["<rootDir>/**/*.(spec|test).(js|jsx|ts|tsx)"],
  moduleDirectories: ["<rootDir>", "node_modules"],
  coverageThreshold: {
    global: {
      branches: 20,
      functions: 20,
      lines: 20,
      statements: 20,
    },
  },
};

export default createJestConfig(customJestConfig);