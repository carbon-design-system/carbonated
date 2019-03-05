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

const createCommentSchema = Joi.object().keys({
  body: Joi.string().required(),
});

const updateCommentSchema = Joi.object().keys({
  body: Joi.string(),
});

function createCommentRepo(baseRequestOptions) {
  const requestOptions = {
    ...baseRequestOptions,
    headers: {
      ...baseRequestOptions.headers,
      Accept: 'application/vnd.github.symmetra-preview+json',
    },
  };

  function all(owner, repo, number) {
    return safe(
      request({
        ...requestOptions,
        uri: encodeURI(`/repos/${owner}/${repo}/issues/${number}/comments`),
      })
    );
  }

  function find(owner, repo, id) {
    return safe(
      request({
        ...requestOptions,
        uri: encodeURI(`/repos/${owner}/${repo}/issues/comments/${id}`),
      })
    );
  }

  function create(owner, repo, number, config) {
    const { error, value } = Joi.validate(config, createCommentSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'POST',
        uri: encodeURI(`/repos/${owner}/${repo}/issues/${number}/comments`),
        body: value,
      })
    );
  }

  function edit(owner, repo, id, config) {
    const { error, value } = Joi.validate(config, updateCommentSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'PATCH',
        uri: encodeURI(`/repos/${owner}/${repo}/issues/comments/${id}`),
        body: value,
      })
    );
  }

  function destroy(owner, repo, id) {
    return safe(
      request({
        ...requestOptions,
        method: 'DELETE',
        uri: encodeURI(`/repos/${owner}/${repo}/issues/comments/${id}`),
      })
    );
  }

  return {
    all,
    find,
    create,
    edit,
    destroy,
  };
}

module.exports = createCommentRepo;
