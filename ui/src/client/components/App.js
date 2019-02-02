import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function App() {
  return (
    <div>
      <FormattedMessage id="greeting" defaultMessage="Hello world" />
      <h1>Hi there</h1>
    </div>
  );
}
