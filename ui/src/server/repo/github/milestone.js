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

const defaultMilestoneSchema = Joi.object().keys({
  title: Joi.string(),
  state: Joi.string().only('closed', 'open'),
  description: Joi.string(),
  due_on: Joi.date().iso(),
});

const createMilestoneSchema = defaultMilestoneSchema.keys({
  title: Joi.string().required(),
});

function createMilestoneRepo(baseRequestOptions) {
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
        uri: encodeURI(`/repos/${owner}/${repo}/milestones`),
      })
    );
  }

  function find(owner, repo, number) {
    return safe(
      request({
        ...requestOptions,
        uri: encodeURI(`/repos/${owner}/${repo}/milestones/${number}`),
      })
    );
  }

  function create(owner, repo, config) {
    const { error, value } = Joi.validate(config, createMilestoneSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'POST',
        uri: encodeURI(`/repos/${owner}/${repo}/milestones`),
        body: value,
      })
    );
  }

  function update(owner, repo, number, config) {
    const { error, value } = Joi.validate(config, defaultMilestoneSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'PATCH',
        uri: encodeURI(`/repos/${owner}/${repo}/milestones/${number}`),
        body: value,
      })
    );
  }

  function close(owner, repo, id) {
    return update(owner, repo, id, { state: 'closed' });
  }

  function open(owner, repo, id) {
    return update(owner, repo, id, { state: 'open' });
  }

  return {
    all,
    find,
    create,
    update,

    // Milestone-specific helpers
    close,
    open,
  };
}

module.exports = createMilestoneRepo;
