/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const supported = new Set(['en', 'en-US']);
const getLanguageFromLocale = locale => locale.split('-')[0];

const languages = [...supported]
  .map(getLanguageFromLocale)
  .reduce((acc, lang) => {
    if (acc.indexOf(lang) !== -1) {
      return acc;
    }

    return acc.concat(lang);
  }, []);

exports.supported = supported;
exports.languages = languages;
exports.getLanguageFromLocale = getLanguageFromLocale;
