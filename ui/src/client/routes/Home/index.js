/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Content } from 'carbon-components-react/lib/components/UIShell';
import gql from 'graphql-tag';
import React from 'react';
import { Query } from 'react-apollo';
import { FormattedMessage } from 'react-intl';

const HELLO_WORLD_QUERY = gql`
  {
    hello
  }
`;

export default function Home() {
  return (
    <Content id="main-content">
      <h1>
        <FormattedMessage id="home.greeting" defaultMessage="Home" />
      </h1>

      <div>
        <p>Data example:</p>
        <Query query={HELLO_WORLD_QUERY}>
          {({ loading, error, data }) => {
            if (loading) {
              return 'Loading...';
            }
            if (error) {
              console.error(error);
              return 'Whoops! Something went wrong.';
            }
            return (
              <pre>
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            );
          }}
        </Query>
      </div>
    </Content>
  );
}
