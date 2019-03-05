/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { listen, logger } = require('@carbonated/server');
const config = require('config');
const Repo = require('./repo');
const setupServer = require('./server');
const Redis = require('./storage/redis');
const Postgres = require('./storage/postgres');

async function main() {
  const redis = await Redis.create(
    config.REDIS_CONN_STR,
    config.REDIS_CERT_BASE64
  );
  const postgres = await Postgres.create(
    config.POSTGRES_CONN_STR,
    config.POSTGRES_CERT_BASE64
  );
  const repo = Repo.create({
    postgres: postgres.client,
    github: {
      GH_TOKEN: config.GH_TOKEN,
    },
  });
  const server = await setupServer({
    config,
    postgres,
    redis,
    repo,
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
