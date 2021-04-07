module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "src/*.ts",
  ],
  coverageDirectory: "test/coverage",
  coverageReporters: ["text"],
  testRegex: "test/.*\\.test\\.(ts)$",
  testTimeout: 10000,
};