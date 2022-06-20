const esModules = ["ok-modals"];
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFilesAfterEnv: ["<rootDir>/tests/testSetUp.js"],
  transformIgnorePatterns: [`/node_modules/(?!${esModules.join("|")})`],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.{js,vue}",
    "!**/node_modules/**",
  ],
}
