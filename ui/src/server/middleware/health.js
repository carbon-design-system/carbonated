/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

module.exports = (server, context) => {
  const { postgres, redis } = context;
  const clients = [postgres, redis];

  server.get('/health', (req, res) => {
    const inactiveClients = clients.filter(client => !client.status);

    if (inactiveClients.length > 0) {
      res.status(503).send('Service unavailable');
      return;
    }

    res.send('OK');
  });

  return server;
};
