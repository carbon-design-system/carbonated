/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { GraphQLObjectType, GraphQLString, GraphQLNonNull } = require('graphql');

const viewerType = new GraphQLObjectType({
  name: 'Viewer',
  description: 'The currently logged in user',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'The name of the loggen in user',
      resolve: root => {
        return root.name;
      },
    },
  },
});

module.exports = viewerType;
