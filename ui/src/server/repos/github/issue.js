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

const defaultIssueSchema = Joi.object().keys({
  title: Joi.string(),
  body: Joi.string(),
  milestone: Joi.number(),
  labels: Joi.array().items(Joi.string()),
  assignees: Joi.array().items(Joi.string()),
});

const createIssueSchema = defaultIssueSchema.keys({
  title: Joi.string().required(),
});

const updateIssueSchema = defaultIssueSchema.keys({
  state: Joi.string().only('closed', 'open'),
});

/**
 * Create a repo for an Issue resource on GitHub, giving access to retrieving
 * and updating issues for a given repo.
 *
 * @example
 * const Issue = createIssueRepo(baseRequestOptions);
 *
 * // List all issues
 * const [error, issues] = await Issue.all('org', 'repo');
 *
 * // Find a single issue
 * const [error, issue] = await Issue.find('org', 'repo', 1);
 *
 * // Create an issue
 * const [error, issue] = await Issue.create('org', 'repo', { title: 'title' });
 *
 * // Update an issue
 * const [error, issue] = await Issue.update('org', 'repo', { state: 'closed' });
 */
function createIssueRepo(baseRequestOptions) {
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
        uri: encodeURI(`/repos/${owner}/${repo}/issues`),
      })
    );
  }

  function find(owner, repo, id) {
    return safe(
      request({
        ...requestOptions,
        uri: encodeURI(`/repos/${owner}/${repo}/issues/${id}`),
      })
    );
  }

  function create(owner, repo, config) {
    const { error, value } = Joi.validate(config, createIssueSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'POST',
        uri: encodeURI(`/repos/${owner}/${repo}/issues`),
        body: value,
      })
    );
  }

  function update(owner, repo, id, config) {
    const { error, value } = Joi.validate(config, updateIssueSchema);
    if (error) {
      return [error];
    }

    return safe(
      request({
        ...requestOptions,
        method: 'PATCH',
        uri: encodeURI(`/repos/${owner}/${repo}/issues/${id}`),
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

    // Issue-specific helpers
    close,
    open,
  };
}

module.exports = createIssueRepo;
