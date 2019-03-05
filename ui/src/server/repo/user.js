/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const safe = require('../tools/safe');

/**
 * Create a user repo given a postgres client.
 * @example
 * const User = createUserRepo(client);
 *
 * // List all users
 * const [error, users] = await User.all();
 *
 * // Find a user by id
 * const [error, user] = await User.find('<uuid>');
 *
 * // Find a user by username
 * const [error, user] = await User.find('<username>');
 */
function createUserRepo(client) {
  const ALL_USERS_QUERY = `SELECT * FROM users ORDER BY created_at ASC`;

  async function all() {
    const [error, result] = await safe(client.query(ALL_USERS_QUERY));
    if (error) {
      return [error];
    }

    return [null, result.rows];
  }

  const FIND_USER_QUERY = `SELECT * FROM users WHERE id = $1 LIMIT 1`;

  async function find(userId) {
    const [error, result] = await safe(client.query(FIND_USER_QUERY, [userId]));
    if (error) {
      return [error];
    }

    if (result.rowCount === 0) {
      return [new Error(`Unable to find a user with id ${userId}`)];
    }

    return [null, result.rows[0]];
  }

  const FIND_BY_USERNAME_QUERY = `SELECT * FROM users WHERE username = $1 LIMIT 1`;

  async function findByUsername(username) {
    const [error, result] = await safe(
      client.query(FIND_BY_USERNAME_QUERY, [username])
    );
    if (error) {
      return [error];
    }

    if (result.rowCount === 0) {
      return [new Error(`Unable to find a user with username ${username}`)];
    }

    return [null, result.rows[0]];
  }

  return {
    all,
    find,
    findByUsername,
  };
}

module.exports = {
  createUserRepo,
};
