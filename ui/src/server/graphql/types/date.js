/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');

// Helpful Stackoverflow answer that goes into detail around why each method is
// needed for a custom scalar type.
// https://stackoverflow.com/questions/41510880/whats-the-difference-between-parsevalue-and-parseliteral-in-graphqlscalartype
const dateType = new GraphQLScalarType({
  name: 'Date',
  serialize(value) {
    if (value instanceof Date) {
      return value.toISOString();
    }
    throw new TypeError(
      `Date values must be built with the Date constructor. Received: ${value}`
    );
  },
  parseValue(value) {
    if (value) {
      return new Date(value);
    }
    return undefined;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value);
    }
    return undefined;
  },
});

module.exports = dateType;
