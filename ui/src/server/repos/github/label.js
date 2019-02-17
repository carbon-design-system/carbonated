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

const defaultLabelSchema = Joi.object().keys({
  name: Joi.string(),
  description: Joi.string(),
  color: Joi.string(),
});

const createLabelSchema = defaultLabelSchema.keys({
  name: Joi.string().required(),
});

function createLabelRepo(baseRequestOptions) {
  const requestOptions = {
    ...baseRequestOptions,
    headers: {
      ...baseRequestOptions.headers,
      Accept: 'application/vnd.github.symmetra-preview+json',
    },
  };

  function all(owner, repo) {
    return safe(
      request({
        ...requestOptions,
        uri: encodeURI(`/repos/${owner}/${repo}/labels`),
      })
    );
  }

  function find(owner, repo, name) {
    return safe(
      request({
        ...requestOptions,
        uri: encodeURI(`/repos/${owner}/${repo}/labels/${name}`),
      })
    );
  }

  function create(owner, repo, config) {
    const { error, value } = Joi.validate(config, createLabelSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'POST',
        uri: encodeURI(`/repos/${owner}/${repo}/labels`),
        body: value,
      })
    );
  }

  function update(owner, repo, currentName, config) {
    const { error, value } = Joi.validate(config, defaultLabelSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'PATCH',
        uri: encodeURI(`/repos/${owner}/${repo}/labels/${currentName}`),
        body: value,
      })
    );
  }

  function destroy(owner, repo, name) {
    return safe(
      request({
        ...requestOptions,
        method: 'DELETE',
        uri: encodeURI(`/repos/${owner}/${repo}/labels/${name}`),
      })
    );
  }

  return {
    all,
    create,
    update,
    destroy,
  };
}

module.exports = createLabelRepo;
