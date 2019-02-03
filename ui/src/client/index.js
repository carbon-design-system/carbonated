import './styles.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { IntlProvider } from 'react-intl';
import App from './components/App';

const { __INITIAL_DATA__ } = window;
const mountNode = document.getElementById('root');

function render(element) {
  ReactDOM.render(
    <AppContainer>
      <IntlProvider
        locale={__INITIAL_DATA__.locale}
        messages={__INITIAL_DATA__.messages}>
        {element}
      </IntlProvider>
    </AppContainer>,
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
