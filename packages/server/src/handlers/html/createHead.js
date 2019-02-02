import { getResourceHints } from './resourceHints';

export function createHead(manifest, runtime, title, appendToHead) {
  const resourceHints = getResourceHints(manifest);
  const linkedStylesheets = [manifest['main.css']]
    .filter(Boolean)
    .map(path => `<link rel="stylesheet" href="${path}">`);
  const inlinedScripts = [runtime]
    .filter(Boolean)
    .map(script => `<script>${script}</script>`);

  return [
    '<head>',
    '<meta charset="utf-8">',
    `<title>${title}</title>`,
    '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">',
    '<link rel="manifest" href="/static/manifest.json?v1.0">',
    '<link rel="shortcut icon" href="/static/favicon.ico?v1.0">',
    resourceHints.join(''),
    linkedStylesheets.join(''),
    inlinedScripts.join(''),
    appendToHead,
    '</head>',
  ].join('');
}
