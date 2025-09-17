import React from 'react';
import Header from '../components/Header';
import CreatorCard from '../components/CreatorCard';
import { creators } from '../data/mockData';
import './NotificationsPage.css';

const tabs = ['All', 'Tags', 'Comments', 'Mentions', 'Subscriptions', 'Promotions'];

const NotificationsPage = () => (
  <div className="page notifications">
    <Header title="< NOTIFICATIONS" subtitle="Stay updated" searchPlaceholder="Search notifications">
      <div className="notifications__header">
        <div className="notifications__tabs">
          {tabs.map((tab, index) => (
            <button
              type="button"
              key={tab}
              className={`notifications__tab${index === 0 ? ' notifications__tab--active' : ''}`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button type="button" className="notifications__icon" aria-label="settings">
          ⚙
        </button>
      </div>
    </Header>
    <section className="notifications__empty">
      <p>No notifications currently!</p>
    </section>
    <aside className="notifications__suggestions">
      <h3>Suggestions</h3>
      <div className="notifications__suggestions-list">
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </aside>
    <footer className="notifications__footer">
      <a href="#">Privacy</a>
      <a href="#">Cookie Notice</a>
      <a href="#">Terms of Service</a>
    </footer>
  </div>
);

export default NotificationsPage;
