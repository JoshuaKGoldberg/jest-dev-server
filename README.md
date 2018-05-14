# jest-dev-server

Shamelessly copy & pasted from `jest-puppeteer`'s [jest-environment-puppeteer](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/jest-environment-puppeteer).

Starts a server before your Jest tests and tears it down after.
Obeys generally the same settings as as `jest-environment-puppeteer`.

## Why

`jest-puppeteer` works great for running tests in Jest using Puppeteer.
It's also useful for starting a local development server during the tests without letting Jest hang.
This package extracts just the local development server spawning without any ties to Puppeteer.

## Usage

First off, if you're writing tests with Puppeteer, use [`jest-puppeteer`](https://github.com/smooth-code/jest-puppeteer) instead.

`jest-dev-server` exports `setupServer` and `teardownServer` functions.
`setupServer` will read in settings from `jest-dev-server-config.js`.

```javascript
// globalSetup.js
module.exports = require("jest-dev-server").setupServer;
```

```javascript
// globalTeardown.js
module.exports = require("jest-dev-server").teardownServer;
```

```javascript
// jest-dev-server.config.js
module.exports = {
    server: {
        command: `node config/start.js --port=3000`,
        port: 3000,
        launchTimeout: 50000,
    },
};

```
