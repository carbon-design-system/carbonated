/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

function safeAsyncHandler(handler) {
  return (req, res, next) => {
    handler(req, res, next).catch(next);
  };
}

module.exports = safeAsyncHandler;
