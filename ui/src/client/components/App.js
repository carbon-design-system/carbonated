/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function App() {
  return (
    <div>
      <FormattedMessage id="greeting" defaultMessage="Hello world" />
    </div>
  );
}
