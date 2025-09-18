import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
    dir: "./",
});

const config: Config = {
    coverageProvider: "v8",
    testEnvironment: "jsdom",
    testPathIgnorePatterns: [],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/$1",
        "^hooks/(.*)$": "<rootDir>/src/lib/hooks/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
};

export default createJestConfig(config);
