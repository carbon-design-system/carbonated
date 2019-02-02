# carbonated

[![Carbonated is released under the Apache-2.0 license](https://img.shields.io/badge/license-Apache--2.0-blue.svg)](./LICENSE)
[![CircleCI](https://circleci.com/gh/carbon-design-system/carbonated.svg?style=shield)](https://circleci.com/gh/carbon-design-system/carbonated)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)
[![PRs welcome!](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](./.github/CONTRIBUTING.md)

> Internal services for building the Carbon Design System.

## Getting started

This project is built using a collection of packages all built in the same
git repository. You might have heard this setup described as a
[monorepo](https://en.wikipedia.org/wiki/Monorepo).

As a result, we use two pieces of tooling to help us managing installing
dependencies and publishing our packages. These include:

- [Yarn workspaces](https://yarnpkg.com/lang/en/docs/workspaces/) for handling
  dependencies across all packages
- [Lerna](https://lernajs.io/) for publishing packages, tagging versions, and
  more

In order for you to install all the dependencies in this project, you'll need to
[install Yarn](https://yarnpkg.com/en/docs/install) and run the following
command in your terminal:

```bash
yarn install --frozen-lockfile
```

_Note: the current Node.js version of the project is specied in the `engines`
field of `package.json`_

This will install all of the dependencies for every package in our project. In
addition, it allows us to link between packages that we are developing.

Next up, you'll most likely want to build all of the package files so that
things don't fail while you are working on a package. To do this, you can run
the following command:

```bash
yarn build
```

Afterwards, you should be good to go! Look at each individual package or
service's README.md file for more instructions.

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new
features, or help us improve the project documentation. If you're
interested, definitely check out our [Contributing Guide](/.github/CONTRIBUTING.md)
! 👀

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).
