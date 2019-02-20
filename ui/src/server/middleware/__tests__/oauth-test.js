/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @jest-environment node
 */

'use strict';

describe('oauth middleware', () => {
  let middleware;

  beforeEach(() => {
    middleware = require('../oauth');
  });

  describe('/auth/github', () => {
    it('should redirect to the GitHub OAuth URL', () => {
      //
    });
  });
});
