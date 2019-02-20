/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { NODE_ENV, SESSION_COOKIE_SECRET } = require('config');
const session = require('express-session');

const sessionCookieName = 'carbonated.sid';
const sessionCookie = {
  httpOnly: true,
  // Max Age: 30min
  maxAge: 1000 * 60 * 60,
  path: '/',
  secure: NODE_ENV === 'production',
};

module.exports = server => {
  server.use(
    session({
      name: sessionCookieName,
      resave: false,
      saveUninitialized: false,
      secret: SESSION_COOKIE_SECRET,
      cookie: sessionCookie,
    })
  );

  server.get('/login', (req, res) => {
    res.redirect('/auth/github');
  });

  server.get('/logout', (req, res, next) => {
    if (!req.session) {
      res.redirect('/');
      return;
    }

    req.session.destroy(error => {
      if (error) {
        next(error);
        return;
      }
      res.clearCookie(sessionCookieName);
      res.redirect('/');
    });
  });

  return server;
};
