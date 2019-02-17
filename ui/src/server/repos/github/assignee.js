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

const defaultAssigneeSchema = Joi.object().keys({
  assignees: Joi.array().items(Joi.string()),
});

const removeAssigneeSchema = Joi.object().keys({
  assignees: Joi.array()
    .items(Joi.string())
    .required(),
});

function createAssigneeRepo(baseRequestOptions) {
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
        uri: encodeURI(`/repos/${owner}/${repo}/assignees`),
      })
    );
  }

  function check(owner, repo, assignee) {
    return safe(
      request({
        ...requestOptions,
        uri: encodeURI(`/repos/${owner}/${repo}/assignees/${assignee}`),
      })
    );
  }

  function add(owner, repo, number, config) {
    const { error, value } = Joi.validate(config, defaultAssigneeSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'POST',
        uri: encodeURI(`/repos/${owner}/${repo}/issues/${number}/assignees`),
        body: value,
      })
    );
  }

  function remove(owner, repo, number, config) {
    const { error, value } = Joi.validate(config, removeAssigneeSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'DELETE',
        uri: encodeURI(`/repos/${owner}/${repo}/issues/${number}/assignees`),
        body: value,
      })
    );
  }

  return {
    all,

    // Assignee specific helpers
    check,
    add,
    remove,
  };
}

module.exports = createAssigneeRepo;
