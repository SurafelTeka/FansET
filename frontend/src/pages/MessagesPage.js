import React from 'react';
import Header from '../components/Header';
import './MessagesPage.css';

const MessagesPage = () => (
  <div className="page messages">
    <Header title="< MESSAGES" subtitle="Newest first" searchPlaceholder="Search conversations">
      <div className="messages__header-actions">
        <button type="button" className="messages__tab messages__tab--active">
          Newest first
        </button>
        <div className="messages__search-pill">
          <span aria-hidden="true">🔍</span>
          <input type="text" placeholder="Search" />
          <button type="button">＋</button>
        </div>
      </div>
    </Header>
    <section className="messages__empty">
      <div className="messages__notice">
        Please subscribe to a creator to access this feature.
      </div>
      <p>Nothing found</p>
    </section>
    <footer className="messages__footer">
      <a href="#">Privacy</a>
      <a href="#">Cookie Notice</a>
      <a href="#">Terms of Service</a>
    </footer>
  </div>
);

export default MessagesPage;
