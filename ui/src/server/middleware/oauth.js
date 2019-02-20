/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { logger } = require('@carbonated/server');
const {
  GITHUB_OAUTH_CLIENT_ID,
  GITHUB_OAUTH_CLIENT_SECRET,
  GITHUB_OAUTH_REDIRECT_URL,
} = require('config');
const request = require('request-promise');
const uuid = require('uuid/v4');
const safe = require('../tools/safe');
const safeAsyncHandler = require('../tools/safeAsyncHandler');

module.exports = server => {
  server.get('/auth/github', (req, res) => {
    const githubOAuthURL = new URL('https://github.com/login/oauth/authorize');
    githubOAuthURL.searchParams.set('scope', 'user:email');
    githubOAuthURL.searchParams.set('client_id', GITHUB_OAUTH_CLIENT_ID);

    const state = uuid();
    req.session.state = state;
    githubOAuthURL.searchParams.set('state', state);
    githubOAuthURL.searchParams.set('redirect_uri', GITHUB_OAUTH_REDIRECT_URL);

    res.redirect(githubOAuthURL);
  });

  server.get(
    '/auth/github/callback',
    safeAsyncHandler(async (req, res) => {
      const githubTokenURL = new URL(
        'https://github.com/login/oauth/access_token'
      );
      githubTokenURL.searchParams.set('client_id', GITHUB_OAUTH_CLIENT_ID);
      githubTokenURL.searchParams.set(
        'client_secret',
        GITHUB_OAUTH_CLIENT_SECRET
      );
      githubTokenURL.searchParams.set('accept', 'json');
      const { code, state } = req.query;

      if (!code) {
        res.status(500).send('Invalid code in response');
        return;
      }

      if (req.session.state !== state) {
        res.status(500).send('State mismatch error');
        return;
      }

      githubTokenURL.searchParams.set('code', code);

      const [tokenExchangeError, tokenResponse] = await safe(
        request({
          url: githubTokenURL,
          method: 'POST',
          headers: {
            Accept: 'application/json',
          },
          json: true,
          timeout: 1000 * 30,
        })
      );
      if (tokenExchangeError) {
        logger.error(tokenExchangeError);
        res.status(500).send('Error exchanging tokens');
        return;
      }

      const { access_token: accessToken } = tokenResponse;
      if (!accessToken) {
        res.status(500).send('Invalid access_token from exchange');
        return;
      }

      const [getUserError, user] = await safe(
        request({
          method: 'GET',
          url: encodeURI(`https://api.github.com/user`),
          headers: {
            Accept: 'application/json',
            'User-Agent': 'carbonated',
          },
          json: true,
          qs: {
            access_token: accessToken,
          },
        })
      );
      if (getUserError) {
        logger.error(getUserError);
        res.status(500).send('Error accessing user details');
        return;
      }

      req.session.user = {
        name: user.name,
      };

      res.redirect('/');
    })
  );

  return server;
};
