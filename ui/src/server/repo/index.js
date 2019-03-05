/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { createGitHubRepo } = require('./github');
const { createUserRepo } = require('./user');

/**
 * @typedef RepoConfig
 * @property {Object} postgres
 * @property {Object} postgres.client
 * @property {Function} postgres.client
 * @property {GitHubClient} github
 * @property {string} github.GH_TOKEN
 */

/**
 * @typedef Repo
 * @property {GitHubRepo} GitHub
 * @property {UserRepo} User
 */

/**
 * Create the repos for interacting with our domain objects using the given
 * clients.
 * @param {RepoConfig} config
 * @return {Repo}
 */
function create({ postgres, github }) {
  const { GH_TOKEN } = github;
  return {
    GitHub: createGitHubRepo(GH_TOKEN),
    User: createUserRepo(postgres),
  };
}

module.exports = {
  create,
};
