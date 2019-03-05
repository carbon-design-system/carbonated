# Developing

<!-- prettier-ignore-start -->
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Table of Contents

- [Getting started](#getting-started)
- [Project areas](#project-areas)
  - [`packages`](#packages)
  - [`ui`](#ui)
- [Common tasks](#common-tasks)
- [Storage](#storage)
  - [Redis](#redis)
  - [Postgres](#postgres)
    - [Migrations](#migrations)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->
<!-- prettier-ignore-end -->

## Getting started

Carbonated requires the following tools and technologies for local development:

- Node.js recommended to use `nvm` to install `v10`
- Yarn, alternative to `npm`. Can use Homebrew for installation with the
  `--without-node` flag
- [Docker](https://docs.docker.com/docker-for-mac/install/) for local development
- [`migrate`](https://github.com/golang-migrate/migrate/tree/master/cli) for running migrations
  - Can install from source, or with Homebrew by running `brew install golang-migrate`

After installing the technologies mentioned above, you can fork the project,
and setup the upstream.

Carbonated is built using a collection of packages all built in the same
git repository. You might have heard this setup described as a
[monorepo](https://en.wikipedia.org/wiki/Monorepo).

As a result, we use two pieces of tooling to help us managing installing
dependencies and publishing our packages. These include:

- [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) for handling
  dependencies across all packages
- [Lerna](https://lernajs.io/) for publishing packages, tagging versions, and
  more

In order for you to install all the dependencies in this project, you'll need to
run the following command in your terminal:

```bash
yarn install --frozen-lockfile
```

After installing dependencies, you will need to start all of the storage options
we have listed in `docker-compose.yml` by running:

```bash
docker-compose up -d
```

The last step is to build the initial package and service assets by running the
command:

```bash
yarn build
```

After this command completes, your environment will be setup to work on
Carbonated. If you are working on part of the `ui` service, you can run the
following commands to get started:

```bash
cd ui
yarn develop
```

## Project areas

- [Packages](#packages)
- Services
  - [ui](#ui)

### `packages`

### `ui`

## Common tasks

While working on Carbon Elements, here are some of the top-level tasks that you
might want to run:

| Command                           | Usage                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `yarn build`                      | Uses `lerna` to run the `build` script in each package                                                        |
| `yarn ci-check`                   | Runs all of our Continuous Integration checks locally                                                         |
| `yarn clean`                      | Resets the state of the project by removing all `node_modules` and running the `clean` script in each package |
| `yarn doctoc`                     | Runs `doctoc` on all files in the `doctoc` directory                                                          |
| `yarn format`, `yarn format:diff` | Format files using prettier, check if files have been formatted                                               |
| `yarn test`                       | Run all of our JavaScript-based tests using [Jest](https://jestjs.io/)                                        |

## Storage

### Redis

Redis is used for handling our session information across all instances of our
Node.js server. The hosted database is provided by IBM Cloud. For developing
locally, a `redis` service is provided through `docker-compose` in
`docker-compose.yml`

### Postgres

#### Migrations

**Create a migration**

```bash
migrate create -ext sql -dir ../ui/src/server/storage/postgres/migrations <migration_name>
```

**Run migrations**

```bash
migrate \
  -path ./ui/src/server/storage/postgres/migrations \
  -database postgres://postgres:postgres@0.0.0.0:5432/carbonated_dev?sslmode=disable up
```

**Reverse migrations**

```bash
migrate \
  -path ./ui/src/server/storage/postgres/migrations \
  -database postgres://postgres:postgres@0.0.0.0:5432/carbonated_dev?sslmode=disable down
```

**Drop table**

```bash
migrate \
  -path ./ui/src/server/storage/postgres/migrations \
  -database postgres://postgres:postgres@0.0.0.0:5432/carbonated_dev?sslmode=disable drop
```
