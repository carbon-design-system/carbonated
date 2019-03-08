/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');
const safe = require('../tools/safe');

const createUserSchema = Joi.object().keys({
  avatarUrl: Joi.string().required(),
  email: Joi.string().required(),
  name: Joi.string().required(),
  username: Joi.string().required(),
});

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
      return [null, null];
    }

    return [null, result.rows[0]];
  }

  const CREATE_USER_QUERY = `
  INSERT INTO users (name, email, username, avatar_url)
  VALUES ($1, $2, $3, $4)
  RETURNING id
  `;

  async function create(config) {
    const { error, value } = Joi.validate(config, createUserSchema);
    if (error) {
      return [error];
    }

    const [clientError, result] = await safe(
      client.query(CREATE_USER_QUERY, [
        value.name,
        value.email,
        value.username,
        value.avatarUrl,
      ])
    );
    if (clientError) {
      return [clientError];
    }

    return [null, result.rows[0]];
  }

  return {
    all,
    create,
    find,
    findByUsername,
  };
}

module.exports = {
  createUserRepo,
};
