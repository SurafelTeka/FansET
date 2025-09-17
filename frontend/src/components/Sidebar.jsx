import React, { useMemo, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';
import useAuth from '../hooks/useAuth.js';

const navItems = [
  { to: '/home', label: 'Home', icon: '🏠' },
  { to: '/notifications', label: 'Notifications', icon: '🔔' },
  { to: '/messages', label: 'Messages', icon: '💬' },
  { to: '/collections', label: 'Collections', icon: '⭐' },
  { to: '/subscriptions', label: 'Subscriptions', icon: '❤️', disabled: true },
  { to: '/add-card', label: 'Add card', icon: '💳' },
  { to: '/profile', label: 'My profile', icon: '👤' },
  { to: '/more', label: 'More', icon: '⋯', disabled: true }
];

const getInitials = (value) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('')
    .slice(0, 2) || 'FE';

const Sidebar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const initials = useMemo(() => (user?.displayName ? getInitials(user.displayName) : 'FE'), [user?.displayName]);

  const handleLogout = () => {
    logout();
  };

  return (
    <aside className={`sidebar ${darkMode ? 'sidebar--dark' : ''}`}>
      <div className="sidebar__top">
        <div className="sidebar__avatar" aria-label="FansET user avatar">
          {initials}
        </div>
        <div className="sidebar__user" aria-live="polite">
          <strong>{user?.displayName ?? 'FansET Creator'}</strong>
          {user?.username && <span>@{user.username}</span>}
        </div>
        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.disabled ? '#' : item.to}
              className={({ isActive }) =>
                `sidebar__nav-link${isActive || location.pathname.startsWith(item.to) ? ' sidebar__nav-link--active' : ''}${
                  item.disabled ? ' sidebar__nav-link--disabled' : ''
                }`
              }
              onClick={(event) => item.disabled && event.preventDefault()}
            >
              <span className="sidebar__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="sidebar__label">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="sidebar__bottom">
        <button type="button" className="sidebar__new-post">
          + NEW POST
        </button>
        <div className="sidebar__settings">
          <button
            type="button"
            className="sidebar__toggle"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            <span role="img" aria-label="moon">
              {darkMode ? '🌙' : '☀️'}
            </span>
            <span>{darkMode ? 'Dark mode' : 'Light mode'}</span>
          </button>
          <button type="button" className="sidebar__toggle">
            <span role="img" aria-label="language">
              🌐
            </span>
            <span>English</span>
          </button>
          <button type="button" className="sidebar__toggle sidebar__logout" onClick={handleLogout}>
            <span role="img" aria-label="logout">
              🚪
            </span>
            <span>Log out</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
