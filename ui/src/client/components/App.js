/**
 * Copyright IBM Corp. 2019, 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { Router } from '@reach/router';
import { Loading } from 'carbon-components-react';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import Navigation from './Navigation';

const Home = React.lazy(() => import('../routes/Home'));
const Manage = React.lazy(() => import('../routes/Manage'));
const Support = React.lazy(() => import('../routes/Support'));

function App() {
  return (
    <>
      <Navigation />
      <React.Suspense fallback={<Loading />}>
        <Router>
          <Home path="/" />
          <Manage path="/manage" />
          <Support path="/support" />
        </Router>
      </React.Suspense>
    </>
  );
}

export default hot(App);
