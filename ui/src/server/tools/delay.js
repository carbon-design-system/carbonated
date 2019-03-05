/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function linear(x) {
  return 1000 * x;
}

function createBackoff(delay = linear) {
  let numRetries = 0;

  return () => {
    if (numRetries === 0) {
      numRetries = 1;
      return;
    }
    const sleepAmount = delay(numRetries);
    numRetries++;
    return sleep(sleepAmount);
  };
}

module.exports = {
  createBackoff,
  sleep,
};
