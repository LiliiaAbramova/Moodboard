The application was initially used as a practice project for manual QA activities and was later extended with automated testing. The repository contains complete testing documentation for MVP1, including requirements, traceability matrix, test scenarios, test cases, bug reports, smoke and regression testing, execution results, 15 Playwright UI and API tests, and a GitHub Actions CI workflow.

## QA & Test Automation

### Manual QA

* Requirements analysis and traceability
* Test scenarios and test cases
* Functional, smoke and regression testing
* Positive and negative test scenarios
* Bug reporting and test execution results

### Automated Testing

* **Playwright + TypeScript**
* **Page Object Model (POM)**
* UI tests for Search, Upload, Workspace and Export
* API integration/contract tests for the Unsplash API
* Positive and negative API scenarios
* Network error and input validation testing
* 15 automated tests executed in Chromium

### CI/CD

* **GitHub Actions** workflow for automated test execution
* Tests run on **Ubuntu Linux**
* Playwright and Chromium installed automatically in CI
* Unsplash API credentials stored using **GitHub Secrets**
* Playwright HTML reports uploaded as CI artifacts
* CI triggered on pushes and pull requests
* **Vercel** used for deployment


### Automated Test Coverage
Search       3 tests
Upload       2 tests
Workspace    5 tests
Export       1 test
Unsplash API 4 tests
TOTAL       15 tests

### Test Results

15 automated tests passing in GitHub Actions

- UI + API tests
- Chromium
- Ubuntu Linux CI environment
- Automated execution on push and pull request
- Playwright HTML report uploaded as a CI artifact

## Live Demo

[Open Moodboard] (https://moodboard-eiq7.vercel.app/)

## Playwright CI

https://github.com/LiliiaAbramova/Moodboard/actions/workflows/playwright.yml
