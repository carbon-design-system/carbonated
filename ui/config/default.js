'use strict';

require('dotenv').config();

const {
  DEPLOY_ENV = 'local',
  HOST = 'localhost',
  LOG_LEVEL = 'info',
  NODE_ENV = 'development',
  PORT = 3000,
  PROTOCOL = 'http',
} = process.env;

module.exports = {
  DEPLOY_ENV,
  HOST,
  LOG_LEVEL,
  NODE_ENV,
  PORT,
  PROTOCOL,
};
