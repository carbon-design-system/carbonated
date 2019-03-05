/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { logger } = require('@carbonated/server');
const { NODE_ENV } = require('config');
const { Pool } = require('pg');
const { createBackoff } = require('../tools/delay');
const safe = require('../tools/safe');

async function createPostgresClient(connectionString, certBase64) {
  const url = new URL(connectionString);
  const options = {
    connectionString,
    connectionTimeoutMillis: NODE_ENV === 'production' ? 1000 * 30 : 5000,
  };

  if (certBase64) {
    options.ssl = {
      ca: new Buffer.from(certBase64, 'base64'),
      servername: url.hostname,
    };
  }

  const pool = new Pool(options);
  await pool.connect();

  return pool;
}

async function createPostgresClientWithRetries(
  connectionString,
  certBase64,
  numRetries = 5
) {
  const backoff = createBackoff();
  let client;
  let error;

  for (let i = 0; i < numRetries; i++) {
    if (i !== 0) {
      await backoff();
      logger.info(`retrying pg connection, attempt #${i}`);
    }

    [error, client] = await safe(
      createPostgresClient(connectionString, certBase64)
    );
    if (!error) {
      return client;
    }
  }

  throw error;
}

async function create(connectionString, certBase64) {
  const pool = await createPostgresClientWithRetries(
    connectionString,
    certBase64
  );
  let _status = 1;

  pool.on('connect', () => {
    logger.info('postgres client ready');
    _status = 1;
  });

  pool.on('error', async error => {
    // Just logging the message as the full stack can contain secrets
    logger.error(error.message);

    if (pool.totalCount === 0) {
      _status = 0;

      const backoff = createBackoff();
      let numRetries = 1;
      logger.info('postgres disconnected, retrying connection');

      while (pool.totalCount === 0) {
        logger.info(`retrying postgres connection, attempt #${numRetries}`);
        try {
          await backoff();
          await pool.connect();
        } catch (e) {}
        numRetries++;
      }
    }
  });

  const circuitBreaker = (req, res, next) => {
    if (_status) {
      next();
      return;
    }
    res.status(503).send('Service unavailable');
  };

  return {
    // Postgres pool for sending queries
    client: pool,

    // Common circuit breaker middleware used for handlers that require an
    // active postgres client
    circuitBreaker,

    // Provide way to read status of client connection, useful for health check
    // handler
    get status() {
      return _status;
    },
  };
}

module.exports = {
  create,
  createPostgresClient,
  createPostgresClientWithRetries,
};
