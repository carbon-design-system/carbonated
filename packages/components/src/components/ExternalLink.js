import React from 'react';
import PropTypes from 'prop-types';

function ExternalLink({ children, ...rest }) {
  return (
    <a {...rest} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
}

ExternalLink.propTypes = {
  children: PropTypes.node,
};

export default ExternalLink;
