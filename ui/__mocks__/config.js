/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = {
  DEPLOY_ENV: 'test',
  HOST: 'localhost',
  LOG_LEVEL: 'info',
  NODE_ENV: 'test',
  PORT: 3000,
  PROTOCOL: 'http',

  GH_TOKEN: '<github-token>',
  GITHUB_OAUTH_CLIENT_ID: '<github-oauth-client-id>',
  GITHUB_OAUTH_CLIENT_SECRET: '<github-oauth-client-secret>',
  GITHUB_OAUTH_REDIRECT_URL: '<github-oauth-redirect-url>',

  SESSION_COOKIE_SECRET: '<session-cookie-secret>',

  REDIS_CONN_STR: '<redis-conn-str>',
  REDIS_CERT_BASE64: '<redis-cert-base64>',

  POSTGRES_CONN_STR: '<postgres-conn-str>',
};
