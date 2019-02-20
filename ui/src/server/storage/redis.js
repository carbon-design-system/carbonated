/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { logger } = require('@carbonated/server');
const safe = require('../tools/safe');

const redis = require('redis');

function createRedisClient(connectionString, certBase64) {
  const url = new URL(connectionString);
  let clientOptions = {};

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

module.exports = {
  createRedisClient: createRedisClientWithRetries,
};
