import './styles.scss';

import React from 'react';
import { ApolloProvider } from 'react-apollo';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import { client } from './client';
import App from './components/App';

const { __INITIAL_DATA__ } = window;
const mountNode = document.getElementById('root');

function render(element) {
  ReactDOM.render(
    <ApolloProvider client={client}>
      <IntlProvider
        locale={__INITIAL_DATA__.locale}
        messages={__INITIAL_DATA__.messages}>
        {element}
      </IntlProvider>
    </ApolloProvider>,
    mountNode
  );
}

render(<App />);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    render(<NextApp />);
  });
}
