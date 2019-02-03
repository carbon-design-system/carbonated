'use strict';

import { createHead } from './createHead';
import { createBody } from './createBody';
import { parseMetaTags } from './parseMetaTags';

export const createResponse = ({
  addToHead,
  getTitle,
  getMetaTags,
  manifest,
  runtime,
  messages,
}) => (req, res) => {
  const [language] = req.locale.split('-');
  const lateHeadChunk = [
    getMetaTags && parseMetaTags(getMetaTags(req)),
    addToHead && addToHead(req),
  ]
    .filter(Boolean)
    .join('');
  const earlyChunk = [
    '<!DOCTYPE html>',
    `<html lang="${language}">`,
    createHead(manifest, runtime, getTitle(req), lateHeadChunk),
  ].join('');

  res.set('Content-Type', 'text/html; charset=utf-8');
  res.write(earlyChunk);
  res.flush();
  const initialData = {
    language,
    locale: req.locale,
    messages: messages[language][req.locale] || {},
  };

  const lateChunk = [createBody(manifest, initialData), '</html>'].join('');

  res.write(lateChunk);
  res.flush();
  res.end();
};
