'use strict';

const {
  DEPLOY_ENV,
  COOKIE_SECRET,
  NODE_ENV,
  REDIS_CONN_STR,
} = require('config');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const redis = require('redis');
const { URL } = require('url');
const redirect = require('../handlers/redirect');
const logger = require('../tools/logger');

const domain = DEPLOY_ENV === 'local' ? 'localhost' : 'mybluemix.net';
let client;

if (REDIS_CONN_STR.startsWith('rediss://')) {
  client = redis.createClient(REDIS_CONN_STR, {
    tls: {
      servername: new URL(REDIS_CONN_STR).hostname,
    },
  });
} else {
  client = redis.createClient(REDIS_CONN_STR);
}

const store = new RedisStore({
  client,
  logErrors: (...args) => logger.error(...args),
});

module.exports = server => {
  server.use(
    session({
      store,
      name: 'carbon.sid',
      secret: COOKIE_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: 'auto',
        httpOnly: true,
        domain,
        path: '/',
        // Max Age: 30min
        maxAge: 1000 * 60 * 30,
      },
    })
  );

  server.get('/login', (req, res) => {
    res.redirect('/auth/github');
  });

  server.get('/logout', (req, res, next) => {
    if (!req.session) {
      redirect(req, res);
      return;
    }

    req.session.destroy(error => {
      if (error) {
        next(error);
        return;
      }
      res.redirect('/');
    });
  });

  return server;
};
