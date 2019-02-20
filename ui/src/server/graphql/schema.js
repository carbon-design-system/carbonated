'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const viewerType = require('./types/viewer');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      viewer: {
        type: viewerType,
        resolve(root, args, context) {
          return context.session.user;
        },
      },
    },
  }),
});

module.exports = {
  schema,
};
