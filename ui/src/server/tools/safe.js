/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function safe(promise) {
  return new Promise(resolve => {
    promise
      .then((...result) => {
        resolve([null, ...result]);
      })
      .catch(error => {
        resolve([error]);
      });
  });
}

module.exports = safe;
