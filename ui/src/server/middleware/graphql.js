/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { DEPLOY_ENV } = require('config');
const graphqlHTTP = require('express-graphql');
const { schema } = require('../graphql');

module.exports = server => {
  server.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: DEPLOY_ENV === 'local',
    })
  );
  return server;
};
