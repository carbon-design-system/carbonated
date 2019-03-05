/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { GH_TOKEN } = require('config');
const createAssigneeRepo = require('./assignee');
const createCommentRepo = require('./comment');
const createIssueRepo = require('./issue');
const createLabelRepo = require('./label');
const createMilestoneRepo = require('./milestone');
const createPullRequestRepo = require('./pull-request');

const GITHUB_API_ENDPOINT = 'https://api.github.com';
const DEFAULT_USER_AGENT = 'carbonated';
const DEFAULT_TIMEOUT = 1000 * 30;

function createGitHubRepo(token) {
  const baseRequestOptions = {
    baseUrl: GITHUB_API_ENDPOINT,
    headers: {
      Authorization: `bearer ${token}`,
      'Content-Type': 'application/json',
      'User-Agent': DEFAULT_USER_AGENT,
    },
    json: true,
    timeout: DEFAULT_TIMEOUT,
  };

  return {
    Assignee: createAssigneeRepo(baseRequestOptions),
    Comment: createCommentRepo(baseRequestOptions),
    Issue: createIssueRepo(baseRequestOptions),
    Label: createLabelRepo(baseRequestOptions),
    Milestone: createMilestoneRepo(baseRequestOptions),
    PullRequest: createPullRequestRepo(baseRequestOptions),
  };
}

module.exports = {
  createGitHubRepo,
};
