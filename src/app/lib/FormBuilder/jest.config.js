module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/setupTests.ts"],
  moduleNameMapper: { "\\.(css|less|scss|sass)$": "identity-obj-proxy" }
};
