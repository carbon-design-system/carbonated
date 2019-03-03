/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { logger } = require('@carbonated/server');
const redis = require('redis');
const safe = require('../tools/safe');

function retryStrategy({ attempt }) {
  logger.info(`retrying redis connection, attempt #${attempt}`);
  return Math.pow(2, attempt - 1) * 100;
}

function createRedisClient(connectionString, certBase64) {
  const url = new URL(connectionString);
  let clientOptions = {
    retry_strategy: retryStrategy,
  };

  if (certBase64) {
    clientOptions.tls = {
      ca: new Buffer.from(certBase64, 'base64'),
      servername: url.hostname,
    };
  }

  const client = redis.createClient(
    connectionString.replace(/^rediss/g, 'redis'),
    clientOptions
  );

  return new Promise((resolve, reject) => {
    client.on('ready', () => resolve(client));
    client.on('error', error => {
      if (error.message.includes('Redis connection to')) {
        client.quit();
        reject(error);
        return;
      }
    });
  });
}

async function createRedisClientWithRetries(
  connectionString,
  certBase64,
  numRetries = 3
) {
  let client;
  let error;

  for (let i = 0; i < numRetries; i++) {
    if (i !== 0) {
      logger.info(`retrying redis connection, attempt #${i + 1}`);
    }

    [error, client] = await safe(
      createRedisClient(connectionString, certBase64)
    );
    if (!error) {
      return client;
    }
  }

  throw error;
}

async function create(connectionString, certBase64) {
  const client = await createRedisClientWithRetries(
    connectionString,
    certBase64
  );

  let _status = 1;

  client.on('error', error => {
    logger.error(error);
    _status = 0;
  });

  client.on('reconnecting', () => {
    _status = 0;
  });

  client.on('ready', () => {
    logger.info('redis client ready');
    _status = 1;
  });

  const circuitBreaker = (req, res, next) => {
    if (_status) {
      next();
      return;
    }
    res.status(503).send('Service unavailable');
  };

  return {
    // Redis client used to send requests or pass along to session middleware
    client,

    // Common circuit breaker middleware used for handlers that require an
    // active redis client
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
  createRedisClient,
  createRedisClientWithRetries,
};
