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

const VIEWER_QUERY = gql`
  {
    viewer {
      name
    }
  }
`;

const Login = (
  <div>
    <a href="/login" rel="noopener noreferrer">
      Login
    </a>
  </div>
);

const Logout = (
  <div>
    <a href="/logout" rel="noopener noreferrer">
      Logout
    </a>
  </div>
);

export default function Home() {
  return (
    <Content id="main-content">
      <h1>
        <FormattedMessage id="home.greeting" defaultMessage="Home" />
      </h1>

      <Query query={VIEWER_QUERY}>
        {({ loading, error, data }) => {
          if (loading) {
            return 'Loading...';
          }
          if (error) {
            console.error(error);
            return 'Whoops! Something went wrong.';
          }

          if (data.viewer) {
            return (
              <>
                <p>
                  Hi, {data.viewer.name}! Try checking out one of the links
                  above
                </p>
                {Logout}
              </>
            );
          }

          return (
            <>
              <p>
                Hi there! Carbonated is a tool for core team members of the
                Carbon Design System.
              </p>
              <p>
                Looks like you're not authenticated yet, maybe try logging in?{' '}
                <span aria-label="finger pointing below text at login text">
                  👇
                </span>
              </p>
              {Login}
            </>
          );
        }}
      </Query>
    </Content>
  );
}
