/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom/server';
import { IntlProvider } from 'react-intl';

describe('App', () => {
  let App;
  let mountNode;

  beforeEach(() => {
    App = require('../App').default;
    mountNode = document.createElement('div');
    document.body.appendChild(mountNode);
  });

  afterEach(() => {
    document.body.removeChild(mountNode);
  });

  it('should render', () => {
    const tree = ReactDOM.renderToStaticMarkup(
      <IntlProvider locale="en">
        <App />
      </IntlProvider>,
      mountNode
    );
    expect(tree).toMatchSnapshot();
  });
});
