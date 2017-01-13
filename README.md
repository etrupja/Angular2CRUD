# Angular 2 CRUD application

## Prerequisites

In order to use this repository you need to first set up the API. API, can be found:
```
https://github.com/etrupja/DotNetCore_EFCore_API
```
Set it up, following the instructions on the repository.

## Install npm packages/set up the application


```bash
git clone https://github.com/etrupja/Anguar2CRUD
```
Install the npm packages described in the `package.json` and verify that it works:
```bash
npm install
npm start
```

The `npm start` command first compiles the application, 
then simultaneously re-compiles and runs the `lite-server`.
Both the compiler and the server watch for file changes.

Shut it down manually with `Ctrl-C`.


## Testing

The QuickStart documentation doesn't discuss testing.
This repo adds both karma/jasmine unit test and protractor end-to-end testing support.

These tools are configured for specific conventions described below.

### Unit Tests
TypeScript unit-tests are usually in the `app` folder. Their filenames must end in `.spec`.

Look for the example `app/app.component.spec.ts`.
Add more `.spec.ts` files as you wish; we configured karma to find them.

Run it with `npm test`
Shut it down manually with `Ctrl-C`.

Test-runner output appears in the terminal window.

### End-to-end (E2E) Tests

E2E tests are in the `e2e` directory, side by side with the `app` folder.
Run them with `npm run e2e`.

Shut it down manually with `Ctrl-C`.

