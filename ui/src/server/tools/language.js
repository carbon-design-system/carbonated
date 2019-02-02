'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const { supported } = require('../../shared/languages');

const LANGUAGES_DIR = path.resolve(__dirname, '../../shared/languages');

function getMessages() {
  const messages = {};

  try {
    for (const string of supported) {
      const [language, locale] = string.split('-');
      const identifier = locale ? string : language;
      const filename = path.join(LANGUAGES_DIR, language, `${identifier}.yml`);
      const buffer = fs.readFileSync(filename);
      const contents = yaml.safeLoad(buffer, 'utf8');

      if (!messages[language]) {
        messages[language] = {};
      }
      messages[language][identifier] = contents;
    }
  } catch (error) {
    throw error;
  }

  return messages;
}

module.exports = {
  getMessages,
};
