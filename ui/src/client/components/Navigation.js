/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Link } from '@reach/router';
import {
  SkipToContent,
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderMenu,
} from 'carbon-components-react/lib/components/UIShell';
import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function Navigation() {
  return (
    <Header aria-label="Carbonated">
      <SkipToContent />
      <HeaderName prefix="Carbon" element={Link} to="/">
        Design System
      </HeaderName>
      <HeaderNavigation aria-label="Carbonated">
        <HeaderMenuItem element={Link} to="/manage">
          <FormattedMessage
            id="navigation.links.manage"
            defaultMessage="Manage"
          />
        </HeaderMenuItem>
        <HeaderMenuItem element={Link} to="/support">
          <FormattedMessage
            id="navigation.links.support"
            defaultMessage="Support"
          />
        </HeaderMenuItem>
      </HeaderNavigation>
    </Header>
  );
}
