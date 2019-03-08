/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');
const userType = require('./types/user');
const viewerType = require('./types/viewer');

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      viewer: {
        type: viewerType,
        description: 'The currently logged in user',
        async resolve(root, args, context) {
          const { User } = context;
          if (
            context.session &&
            context.session.user &&
            context.session.user.id
          ) {
            const [error, user] = await User.find(context.session.user.id);
            if (error) {
              throw error;
            }

            return user;
          }

          return null;
        },
      },
      users: {
        type: new GraphQLList(userType),
        async resolve(root, args, context) {
          const { User } = context;
          const [error, users] = await User.all();
          if (error) {
            throw error;
          }

          return users;
        },
      },
    },
  }),
});

module.exports = {
  schema,
};
