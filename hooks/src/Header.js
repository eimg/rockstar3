import React from 'react';
import PropTypes from 'prop-types';

const Header = props => (
    <h1>React Hook ({props.count})</h1>
);

Header.propTypes = {
  count: PropTypes.number.isRequired
};

export default Header;
