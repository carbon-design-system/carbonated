# -------------------------------------------------------------------------------
# Builder image used for setting up the workspace and building sub-packages and
# service dependencies
# -------------------------------------------------------------------------------
FROM node:10.15.1 as builder

RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.13.0
ENV PATH=$HOME/.yarn/bin:$PATH

WORKDIR /workspace

# Dependencies
COPY .yarn-offline-mirror ./.yarn-offline-mirror
COPY package.json yarn.lock .yarnrc lerna.json ./

# Packages
COPY packages ./packages

# Services
COPY ui ./ui

RUN yarn install --offline --frozen-lockfile
RUN yarn build

RUN yarn lerna clean --yes && rm -rf node_modules
RUN yarn install --offline --frozen-lockfile --production

# -------------------------------------------------------------------------------
# UI Service
# -------------------------------------------------------------------------------
FROM node:10.15.1-alpine

ENV HOST 0.0.0.0
ENV PORT 3000
ENV NODE_ENV production
ENV DEPLOY_ENV remote

WORKDIR /usr/src/service
COPY --from=builder /workspace/node_modules ./node_modules
COPY --from=builder /workspace/packages ./packages
COPY --from=builder /workspace/ui ./ui

WORKDIR /usr/src/service/ui
CMD ["yarn", "start"]
