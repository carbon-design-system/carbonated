/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const {
  all,
  applyMiddleware,
  assets,
  error,
  getBuildContext,
  https,
  security,
  setupDevelopment,
  setupHTML,
  setupLocale,
} = require('@carbonated/server');
const express = require('express');
const path = require('path');
const { supported } = require('../shared/languages');
const { getMessages } = require('./tools/language');

function getConfig() {
  return {
    config: require('../../config/webpack/webpack.config.dev'),
    paths: require('../../config/webpack/paths'),
  };
}

module.exports = async ({ config, postgres, redis, repo }) => {
  const ASSET_PATH = path.resolve(__dirname, '../../build');
  const context = {
    build: getBuildContext({
      assetPath: ASSET_PATH,
      getConfig,
    }),
    config,
    postgres,
    redis,
    repo,
  };

  const server = express();
  const middleware = [
    // Secure middleware for redirecting to HTTPS, when applicable
    https,

    // Development Middleware for handling client-side related development
    setupDevelopment(getConfig),

    // Middleware that should be enabled for most requests
    all,

    // Security middleware, useful for setting headers and controlling frame
    // options
    security,

    require('./middleware/health'),
    require('./middleware/session'),
    require('./middleware/oauth'),

    // Setup handling of different languages/locales
    setupLocale([...supported]),

    require('./middleware/graphql'),

    // Handle serving static assets provided through ASSET_PATH
    assets,
    server => {
      server.use(
        '/static',
        express.static(path.resolve(__dirname, '../../public'))
      );
      return server;
    },

    // Handle generating HTML responses, serving static assets, and error handling
    setupHTML({
      getTitle: () => 'Carbonated',
      getMetaTags: () => ({
        og: {
          title: 'Carbonated',
          type: 'website',
          url: 'https://tools.carbondesignsystem.com',
          description: 'Internal tooling for building the Carbon Design System',
        },
      }),
      getMessages,
    }),

    // Error handling so we don't pollute the response with stack traces
    error,
  ].filter(Boolean);

  return applyMiddleware(server, middleware, context);
};
