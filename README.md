# jest-dev-server

Shamelessly copy & pasted from `jest-puppeteer`'s [jest-environment-puppeteer](https://github.com/smooth-code/jest-puppeteer/tree/master/packages/jest-environment-puppeteer).

Starts a server before your Jest tests and tears it down after.
Obeys generally the same settings as `jest-environment-puppeteer`.

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
    command: `node config/start.js --port=3000`,
    launchTimeout: 50000,
    port: 3000,
};
```

#### Options

#### `allowExistingServer`

Type: `boolean`.

If true and `port` is specified, `jest-dev-server` will check if the port is in use and skip creating a server if so.
Useful to allow developers and CI machines to have a local server running that was started before tests run.

```javascript
module.exports = {
    allowExistingServer: true,
    command: "npm run start --port 3000",
    port: 3000,
};
```

#### `args`

Type: `string[]`.

Any additional options to pass to `command`.

```javascript
module.exports = {
    args: ["--no-sandbox"],
    command: "npm run start",
};
```

#### `command`

Type: `string`.

Command to execute to start the port.
Directly passed to [`spawnd`](https://www.npmjs.com/package/spawnd).

```javascript
module.exports = {
    command: "npm run start",
};
```

#### `launchTimeout`

Type: `number`.

How many milliseconds to wait for the spawned server to be available before giving up.
Defaults to [`wait-port`](https://www.npmjs.com/package/wait-port)'s default.

```javascript
module.exports = {
    command: "npm run start",
    launchTimeout: 30000,
};
```

#### `options`

Type: `{}`.

Any other options to pass to [`spawnd`](https://www.npmjs.com/package/spawnd).

#### `port`

Type: `number`.

Port to wait for activity on before considering the server running.
If not provided, the server is assumed to immediately be running.

```javascript
module.exports = {
    command: "npm run start --port 3000",
    port: 3000,
};
```
