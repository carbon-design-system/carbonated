/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { logger } = require('@carbonated/server');
const { DEPLOY_ENV } = require('config');
const graphqlHTTP = require('express-graphql');
const { formatError } = require('graphql/error');
const { schema } = require('../graphql');

module.exports = (server, context) => {
  const { postgres } = context;
  server.use(
    '/graphql',
    postgres.circuitBreaker,
    graphqlHTTP(req => {
      return {
        schema,
        formatError: (...args) => {
          logger.error(...args);
          return formatError(...args);
        },
        graphiql: DEPLOY_ENV === 'local',
        context: {
          ...context.repo,
          session: req.session,
        },
      };
    })
  );
  return server;
};
