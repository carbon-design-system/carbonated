/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const Joi = require('joi');
const request = require('request-promise');
const safe = require('../../tools/safe');

const allPullRequestSchema = Joi.object().keys({
  state: Joi.string().only('open', 'closed', 'all'),
  head: Joi.string(),
  base: Joi.string(),
  sort: Joi.string().only('created', 'updated', 'popularity', 'long-running'),
  direction: Joi.string().only('asc', 'desc'),
});

const updatePullRequestSchema = Joi.object().keys({
  title: Joi.string(),
  body: Joi.string(),
  state: Joi.string().only('closed', 'open'),
});

const mergePullRequestSchema = Joi.object().keys({
  commit_title: Joi.string().required(),
  commit_message: Joi.string(),
  sha: Joi.string().required(),
  merge_method: Joi.string().only('merge', 'squash', 'rebase'),
});

function createPullRequestRepo(baseRequestOptions) {
  const requestOptions = {
    ...baseRequestOptions,
    headers: {
      ...baseRequestOptions.headers,
      Accept: 'application/vnd.github.symmetra-preview+json',
    },
  };

  function all(owner, repo, config = {}) {
    const { error, value } = Joi.validate(config, updatePullRequestSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        uri: encodeURI(`/repos/${owner}/${repo}/pulls`),
        qs: value,
      })
    );
  }

  function find(owner, repo, number) {
    return safe(
      request({
        ...requestOptions,
        uri: encodeURI(`/repos/${owner}/${repo}/pulls/${number}`),
      })
    );
  }

  function update(owner, repo, number, config) {
    const { error, value } = Joi.validate(config, updatePullRequestSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'PATCH',
        uri: encodeURI(`/repos/${owner}/${repo}/pulls/${id}`),
        body: value,
      })
    );
  }

  function merge(owner, repo, number, config) {
    const { error, value } = Joi.validate(config, mergePullRequestSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'PUT',
        uri: encodeURI(`/repos/${owner}/${repo}/pulls/${number}/merge`),
        body: value,
      })
    );
  }

  // GET /repos/:owner/:repo/pulls/:number/merge
  function merged(owner, repo, number) {
    return safe(
      request({
        ...requestOptions,
        uri: encodeURI(`/repos/${owner}/${repo}/pulls/${number}/merge`),
      })
    );
  }

  return {
    all,
    find,
    update,

    // Pull Request-specific methods
    merge,
    merged,
  };
}

module.exports = createPullRequestRepo;
