'use strict';

import { NODE_ENV, LOG_LEVEL } from 'config';
import winston from 'winston';

const errorStackFormat = winston.format(info => {
  if (info instanceof Error) {
    info.message = `${info.message} ${info.stack}`;
  }
  return info;
});

export const logger = winston.createLogger({
  format: winston.format.combine(
    errorStackFormat(),
    NODE_ENV === 'production' ? winston.format.json() : winston.format.simple()
  ),
  level: LOG_LEVEL,
  transports: [
    new winston.transports.Console({
      exitOnError: NODE_ENV === 'production',
    }),
  ],
});
