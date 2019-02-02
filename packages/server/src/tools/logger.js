'use strict';

import { NODE_ENV, LOG_LEVEL } from 'config';
import winston from 'winston';

const format =
  NODE_ENV === 'production' ? winston.format.json() : winston.format.simple();

export const logger = winston.createLogger({
  format,
  level: LOG_LEVEL,
  transports: [
    new winston.transports.Console({
      exitOnError: NODE_ENV === 'production',
    }),
  ],
});
