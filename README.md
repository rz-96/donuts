# EarlyNode Next Starter

A template for starting Next.js projects.

## Table of Contents

1. [Getting Started](#getting-started)
1. [Code](#code)
1. [Available Scripts](#available-scripts)
1. [Tech Stack](#tech-stack)
1. [Code Review](#code-review)

## Getting Started

- Clone the repository.
- Run `yarn` to install the dependencies.
- Run `yarn dev` to start the app.

## Code

Please follow the code conventions.

### Folder Structure 🤓

The source code of the application lives in `src/`.

```
src/
├── components/
│   ├── ...
│   └── header/
│       ├── header-component.js
│       └── header-component.test.js
├── features/
│   ├── ...
│   └── todos/
│       ├── data/
│       ├── ...
│       └── todos-saga.test.js
├── hocs/
│   ├── ...
│   └── with-redux.js
├── pages/
├── redux/
│   ├── root-reducer.js
│   ├── root-saga.js
│   └── store.js
├── styles/
└── tests/
    ├── ...
    └── index.test.js
```

The `"pages/"` directory [implicitly handles the routing](https://nextjs.org/learn/basics/navigate-between-pages).

### Logic Colocation

[Group files by feature.](https://medium.com/javascript-scene/elements-of-javascript-style-caa8821cb99f) 

```
features/
├── ...
├── todos/
│   ├── ...
│   ├── data/
│   ├── todos-container.js
│   ├── todos-component.js
│   ├── todos-component.test.js
│   ├── todos-reducer.js
│   ├── todos-reducer.test.js
│   ├── todos-saga.test.js
│   ├── todos-saga.test.js
│   └── todos-test-functional.js
└── user-authentication/
    ├── ...
    ├── user-authentication-reducer.js
    └── user-authentication-reducer.test.js
```

Group object's keys alphabetically (if you can) because it lets you find values faster. This project uses [an ESLint plugin](https://www.npmjs.com/package/eslint-plugin-simple-import-sort) that groups `import`s for you.

### Test Driven Development 🧪

Use [TDD](https://medium.com/javascript-scene/tdd-the-rite-way-53c9b46f45e3). Why?

- **Refactor with Confidence** (when it's needed). Learning TDD is **learning** modular app architecture. One of the biggest productivity killers is the **Fear of Change**.
- **40% - 80% Fewer Bugs**: Most effective processes for this: Design review, spec
review, code review, TDD.
- **Avoid Tight Coupling**: Harder to test, hard to maintain, hard to change, hard to
add new requirements, hard to reduce requirements, hard to shuffle things around
in different orders, hard to refactor. Unit tests force you to test units in isolation from each other. **TDD with unit tests make your code more testable**, which also happens to be
more modular, more reusable, more flexible code.
- TDD leads to **Better API Design**: Avoid leaking implementation details into
the API.
- [**CI/CD**](https://janhesters.com/setting-up-a-project-with-ci-cd-using-amplify/): CI/CD depends on good test coverage. TDD leads to better test
coverage, which leads to fewer bugs creep through. CI/CD gives us: **Increased deployment frequency = decreased deployment risk**

**[Back to top](#table-of-contents)**

### Redux

Separate React components between [container and display](https://redux.js.org/basics/usage-with-react#presentational-and-container-components) components for better modularity, testability, and easier separation between effects and pure logic. This is done leveraging Redux for state management. Its benefits are:

* **Deterministic state resolution** (enabling deterministic view renders when combined with pure components).
* **Transactional state** - application-wide transaction ledger, telemetry for debugging.
* **Isolate state management** from I/O and side-effects.
* **Single source of truth** for application state.
* **Easily share _(immutable)_ state** between different components.
* **Transaction telemetry** (auto-logging action objects).
* **Time travel debugging.**

### Redux Saga

In conjunction with Redux, work with Redux Saga because you can use it for:

* **Deterministic testing of effects** (like async I/O).
* **Isolating effects** from the rest of our program logic.

### Hooks & Redux & HOCs

Use [Hooks for local state, Redux for global state](https://medium.com/javascript-scene/do-react-hooks-replace-redux-210bab340672) and [HOCs to re-use logic](https://medium.com/javascript-scene/do-react-hooks-replace-redux-210bab340672).

### Other Code Conventions

#### Adding Packages

Make sure to add packages with exact version (leave out `^`) to [avoid problems with versioning](https://medium.com/javascript-scene/software-versions-are-broken-3d2dc0da0783).

## Available Scripts

Prefix these commands with `yarn` (e.g. `yarn watch` for the watch script).

- `"dev"` - starts the app on `localhost:3000`.
- `"format"` - fixes the code base according to the ESLint rules.
- `"functional-tests"` - runs E2E tests.
- `"lint"` - runs linting on the code base.
- `"unit-tests"` - runs the unit tests.
- `"validate"` - lints, runs unit tests and runs E2E tests. Used for Husky commit validation and Travis CI PR validation.
- `"watch"` - runs `"unit-tests"` and `"format"` anytime a file within `src/` changes.

## Tech Stack

* [React](https://reactjs.org/)
* [Next.js](https://nextjs.org/)
* [Ramda](https://ramdajs.com/)
* [RITEway](https://github.com/ericelliott/riteway)
* [TestCafe](https://devexpress.github.io/testcafe/)

## Code Review

In code review use the following abbreviations for your summaries (ACK = acknowledgement):

* utACK (untested ACK) - Reviewed and agree with the code changes but haven't actually tested them.
* tACK (tested ACK) - Reviewed and tested the code changes and have verified the functionality or bug fix.
* bACK (bug) - Reviewed and tested the code changes and found a bug. Should be accompanied by an explanation.
* nACK (negative) - Reviewed and disagree with the code changes/concept. Should be accompanied by an explanation.

When testing, please spend some time looking for bugs. Click around. Enter weird values. Cancel confirmations. Do weird stuff. QA Engineer walks into a bar. Orders a beer. Orders 0 beers. Orders 999999999 beers. Orders a lizard. Orders -1 beers. Orders a sfdeljknesv.

Additionally, follow this checklist:

- [ ] PR is small enough (otherwise, break it up)
- [ ] Code is readable
- [ ] Code is tested
- [ ] The features are documented
- [ ] Files are located and named correctly
- [ ] Error states are properly handled
- [ ] Bonus: Screenshots/screencast demo included