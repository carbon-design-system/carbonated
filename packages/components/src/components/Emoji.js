import React from 'react';
import PropTypes from 'prop-types';

function Emoji({ 'aria-label': ariaLabel, children, ...rest }) {
  return (
    <span {...rest} aria-label={ariaLabel}>
      {children}
    </span>
  );
}

Emoji.propTypes = {
  'aria-label': PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
};

export default Emoji;
