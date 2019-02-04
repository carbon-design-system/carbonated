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
