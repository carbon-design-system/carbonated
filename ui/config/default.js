/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

require('dotenv').config();

const {
  DEPLOY_ENV = 'local',
  HOST = 'localhost',
  LOG_LEVEL = 'info',
  NODE_ENV = 'development',
  PORT = 3000,
  PROTOCOL = 'http',
} = process.env;

module.exports = {
  DEPLOY_ENV,
  HOST,
  LOG_LEVEL,
  NODE_ENV,
  PORT,
  PROTOCOL,

  GH_TOKEN: process.env.GH_TOKEN,
  GITHUB_OAUTH_CLIENT_ID: process.env.GITHUB_OAUTH_CLIENT_ID,
  GITHUB_OAUTH_CLIENT_SECRET: process.env.GITHUB_OAUTH_CLIENT_SECRET,
  GITHUB_OAUTH_REDIRECT_URL: process.env.GITHUB_OAUTH_REDIRECT_URL,

  SESSION_COOKIE_SECRET: process.env.SESSION_COOKIE_SECRET,

  REDIS_CONN_STR: process.env.REDIS_CONN_STR,
  REDIS_CERT_BASE64: process.env.REDIS_CERT_BASE64,
};
