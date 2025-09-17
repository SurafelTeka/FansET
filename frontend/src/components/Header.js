import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({ title, subtitle, searchPlaceholder, actions, children }) => (
  <header className="page-header">
    <div className="page-header__left">
      <h1>{title}</h1>
      {subtitle && <span className="page-header__subtitle">{subtitle}</span>}
    </div>
    <div className="page-header__center">
      {children || (
        <div className="page-header__search">
          <span aria-hidden="true">🔍</span>
          <input type="search" placeholder={searchPlaceholder} />
          <button type="button" className="page-header__search-suffix">
            <span role="img" aria-label="quick">
              ⚡
            </span>
          </button>
        </div>
      )}
    </div>
    <div className="page-header__actions">
      <button type="button" className="page-header__icon" aria-label="refresh">
        🔄
      </button>
      <button type="button" className="page-header__icon" aria-label="more options">
        ⋯
      </button>
      {actions}
    </div>
  </header>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  searchPlaceholder: PropTypes.string,
  actions: PropTypes.node,
  children: PropTypes.node
};

Header.defaultProps = {
  subtitle: undefined,
  searchPlaceholder: 'Search posts',
  actions: null,
  children: null
};

export default Header;
