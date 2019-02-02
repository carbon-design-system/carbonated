'use strict';

const { DEPLOY_ENV } = require('config');
const graphqlHTTP = require('express-graphql');
const { rootValue, schema } = require('../graphql');

module.exports = server => {
  server.use('/graphql', (req, res) => {
    return graphqlHTTP({
      graphiql: true,
      rootValue,
      schema,
      context: {
        user: req.session.user,
      },
    })(req, res);
  });
  return server;
};
