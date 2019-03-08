/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const {
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const dateType = require('./date');

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'The currently logged in user',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The id of the logged in user',
      resolve: root => {
        return root.id;
      },
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The email of the logged in user',
      resolve: root => {
        return root.email;
      },
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the logged in user',
      resolve: root => {
        return root.name;
      },
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The username of the logged in user',
      resolve: root => {
        return root.username;
      },
    },
    avatarUrl: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The avatar url of the logged in user',
      resolve: root => {
        return root.avatar_url;
      },
    },
    createdAt: {
      type: new GraphQLNonNull(dateType),
      description: 'The created at timestamp of the logged in user',
      resolve: root => {
        return root.created_at;
      },
    },
    updatedAt: {
      type: new GraphQLNonNull(dateType),
      description: 'The updated at timestamp of the logged in user',
      resolve: root => {
        return root.updated_at;
      },
    },
  },
});

module.exports = viewerType;
