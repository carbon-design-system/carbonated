/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLNonNull,
} = require('graphql');
const dateType = require('./date');

const userType = new GraphQLObjectType({
  name: 'User',
  description: 'A user of Carbonated',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      description: 'The UUID for the user',
      resolve: root => root.id,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the user',
      resolve: root => root.name,
    },
    email: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The email of the user',
      resolve: root => root.email,
    },
    username: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The GitHub username of the user',
      resolve: root => root.username,
    },
    createdAt: {
      type: new GraphQLNonNull(dateType),
      description: 'The time the user was created',
      resolve: root => root.created_at,
    },
    updatedAt: {
      type: new GraphQLNonNull(dateType),
      description: 'The time the user was last updated',
      resolve: root => root.updated_at,
    },
  },
});

module.exports = userType;
