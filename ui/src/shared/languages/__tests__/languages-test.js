/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import fs from 'fs';
import path from 'path';
import { safeLoad } from 'js-yaml';
import { supported, languages } from '../';

const LANGUAGES_DIR = path.resolve(__dirname, '..');
const blacklist = new Set(['__tests__', 'index.js', 'README.md', '.DS_Store']);

describe('i18n locale messages', () => {
  const folders = fs
    .readdirSync(LANGUAGES_DIR)
    .filter(file => !blacklist.has(file));

  for (const language of languages) {
    it(`should specify a folder for the language: ${language}`, () => {
      expect(folders.indexOf(language)).not.toBe(-1);
    });
  }

  const files = fs
    .readdirSync(LANGUAGES_DIR)
    .filter(file => !blacklist.has(file))
    .map(dir => fs.readdirSync(path.resolve(LANGUAGES_DIR, dir)))
    .reduce((acc, files) => acc.concat(files), []);

  for (const locale of supported) {
    it(`should specify a locale file for the locale: ${locale}`, () => {
      expect(files.indexOf(`${locale}.yml`)).not.toBe(-1);
    });
  }

  it('should have identifiers correspond across all locale message files', () => {
    const files = fs
      .readdirSync(LANGUAGES_DIR)
      .filter(file => !blacklist.has(file))
      .map(dir => {
        const folder = path.join(LANGUAGES_DIR, dir);
        return fs
          .readdirSync(path.resolve(LANGUAGES_DIR, dir))
          .map(file => path.join(folder, file));
      })
      .reduce((acc, files) => acc.concat(files), [])
      .map(file => ({ file, contents: fs.readFileSync(file, 'utf8') }));

    const identifiers = files
      .map(({ file, contents }) => ({
        file,
        contents: safeLoad(contents, 'utf8'),
      }))
      .map(({ file, contents }) => ({
        file,
        identifiers: Object.keys(contents),
      }));

    for (let i = 0; i < identifiers.length - 1; i++) {
      try {
        expect(identifiers[i].identifiers).toEqual(
          identifiers[i + 1].identifiers
        );
      } catch (error) {
        const message = `Locale files have different identifiers in them. Try looking in:
${identifiers[i].file}
${identifiers[i + 1].file}
The difference seems to be:
${error.message}`;

        throw new Error(message);
      }
    }
  });
});
