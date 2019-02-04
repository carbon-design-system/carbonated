'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: new GraphQLNonNull(GraphQLString),
        resolve: () => 'world',
      },
    },
  }),
});

module.exports = {
  schema,
};
