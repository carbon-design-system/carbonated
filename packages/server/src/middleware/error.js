'use strict';

import { createErrorHandler } from '../handlers/error';
import { logger } from '../tools/logger';

const handler = createErrorHandler(logger);

export function error(server) {
  server.use(handler);
  return server;
}
