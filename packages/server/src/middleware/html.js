'use strict';

import fs from 'fs';
import helmet from 'helmet';
import path from 'path';
import util from 'util';
import { createResponse } from '../handlers/html';

const readFile = util.promisify(fs.readFile);

/**
 * TODO
 * Analytics support in Head, might already be supported
 * meta tags in head
 * noscript fallback
 * failure message fallback on script load
 * crossorigin=anonymous
 * preconnect https://www.w3.org/TR/resource-hints/#preconnect
 * dns-prefetch https://www.w3.org/TR/resource-hints/#dns-prefetch
 * OpenGraph, title, site_name, image, description, url, ...
 */
export function setupHTML({
  getTitle = () => 'Page Title',
  addToHead = () => '',
  getMetaTags,
  getMessages,
}) {
  const messages = getMessages();
  return async (server, context) => {
    const { build } = context;
    const { assetPath, manifest } = build;
    let runtime;

    if (manifest['runtime.js'] !== undefined) {
      const rawRuntime = await readFile(
        path.join(assetPath, manifest['runtime.js']),
        'utf8'
      );
      // Update the sourceMappingURL for the runtime since we embed it in the
      // payload
      runtime = rawRuntime.replace(
        /(sourceMappingURL=)(runtime)/,
        '$1/static/js/runtime'
      );
    }

    server.get(
      '*',
      helmet.noCache(),
      createResponse({
        manifest,
        runtime,
        getTitle,
        addToHead,
        getMetaTags,
        messages,
      })
    );

    return server;
  };
}
