# @delucis/stau

[![npm version](https://img.shields.io/npm/v/@delucis/stau.svg)](https://www.npmjs.com/package/@delucis/stau) [![Build Status](https://travis-ci.com/delucis/stau.svg?branch=latest)](https://travis-ci.com/delucis/stau) [![Coverage Status](https://coveralls.io/repos/github/delucis/stau/badge.svg?branch=latest)](https://coveralls.io/github/delucis/stau?branch=latest) [![Known Vulnerabilities](https://snyk.io/test/npm/@delucis/stau/badge.svg)](https://snyk.io/test/npm/@delucis/stau) ![Greenkeeper badge](https://badges.greenkeeper.io/delucis/stau.svg)

> 🚦 Run promises with limited concurrency

## Installation

```
npm install --save @delucis/stau
```

## Usage

### `stau(functions[, limit = 15])`

Resolves when all of the `functions` have resolved.

- #### `functions`

  Type: `Array` of async/Promise-returning functions

  The functions to execute with limited concurrency

- #### `limit`

  Type: `Number`  
  Default: `15`

  The maximum number of functions to execute at the same time

## Example

```js
const stau = require('@delucis/stau')
const delay = require('delay')

const task = t => async () => {
  console.log(`Waiting for: ${t}ms`)
  return delay(t)
}

const tasks = [
  task(3000),
  task(5000),
  task(12000)
]

(async function () {
  await stau(tasks, 2)
    .then(() => console.log('Done waiting!'))
})()

// immediately:
// => Waiting for: 3000ms
// => Waiting for: 5000ms
//
// after 5 seconds:
// => Waiting for: 12000ms
//
// after 17 seconds:
// => Done waiting!
```
