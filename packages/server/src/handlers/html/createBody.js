'use strict';

import { DEV_BUNDLE_ENTRY } from '../../tools/getBuildContext';

// TODO: support module and nomodule
export function createBody(manifest, initialData) {
  const scripts = [
    manifest[DEV_BUNDLE_ENTRY],
    manifest['vendor.js'],
    manifest['main.js'],
  ]
    .filter(Boolean)
    .map(path => `<script crossorigin="anonymous" src="${path}"></script>`);
  const inlineScript = `<script>window.__INITIAL_DATA__ = ${JSON.stringify(
    initialData
  )};</script>`;

  return [
    '<body>',
    '<noscript>You need to enable JavaScript to run this app.</noscript>',
    '<div id="root"></div>',
    inlineScript,
    scripts.join(''),
    '</body>',
  ].join('');
}
