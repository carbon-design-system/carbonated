/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { listen, logger } = require('@carbonated/server');
const config = require('config');
const setupServer = require('./server');
const Redis = require('./storage/redis');

async function main() {
  const redis = await Redis.create(
    config.REDIS_CONN_STR,
    config.REDIS_CERT_BASE64
  );
  const server = await setupServer({
    config,
    redis,
  });

  process.on('uncaughtException', error => {
    logger.error(error);
  });

  await listen(server, {
    host: config.HOST,
    port: config.PORT,
    protocol: config.PROTOCOL,
  });
}

main().catch(error => {
  logger.error(error);
  process.exitCode = 1;
});
