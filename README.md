# UI Automation Challenge

This repository contains an automated testing solution for Ramp **Sign-Up & Sign-In** user flows.  
The framework is built using **Playwright + Cucumber.js** with the **Page Objects Model** design pattern.

---

## Tech Stack

* **Automation Framework:** [Playwright](https://playwright.dev/)
* **BDD Framework:** [Cucumber.js](https://cucumber.io/docs/cucumber/api/?lang=javascript)
* **Language:** JavaScript / Node.js
* **Assertions:** Playwright Test Library (`@playwright/test`)

---

## Project Structure

```
.
├── features/                 # feature files
│   ├── signin.feature
│   └── signup.feature
├── pages/                    # page objects model
│   ├── signin.page.js
│   └── signup.page.js
├── steps/                    # step definitions
│   ├── common.steps.js
│   ├── signin.steps.js
│   └── signup.steps.js
└── support/                  # hooks & world context
    ├── hooks.js
    └── world.js
```

---

## Setup

1) **Install dependencies**
```bash
npm i
npx playwright install
```

2) **Run all tests**
```bash
npm run test
```

3) **Run by script/tag**
```bash
npm run test:signin    # only @signin
npm run test:signup    # only @signup

# Run with any custom tag
npm run test:tag -- "@custom_tag"
```

---

**Author:** Djenifer Drehmer  
