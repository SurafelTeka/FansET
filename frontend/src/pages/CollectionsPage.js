import React from 'react';
import Header from '../components/Header';
import { collections, creators } from '../data/mockData';
import './CollectionsPage.css';

const CollectionsPage = () => (
  <div className="page collections">
    <Header title="< COLLECTIONS" subtitle="Organize your fans" searchPlaceholder="Search lists">
      <div className="collections__header">
        <div className="collections__tabs">
          <button type="button" className="collections__tab collections__tab--active">
            DD
          </button>
          <button type="button" className="collections__tab">Users</button>
          <button type="button" className="collections__tab">Posts</button>
        </div>
        <div className="collections__search">
          <span aria-hidden="true">🔍</span>
          <input type="text" placeholder="Search" />
          <button type="button">＋</button>
        </div>
      </div>
    </Header>
    <div className="collections__body">
      <section className="collections__lists">
        <div className="collections__list-header">
          <h3>User lists</h3>
          <select defaultValue="Custom order">
            <option>Custom order</option>
            <option>Most recent</option>
          </select>
        </div>
        <ul className="collections__list-items">
          {collections.map((list) => (
            <li key={list.id} className="collections__list-item">
              <img src={list.cover} alt="collection cover" />
              <div>
                <strong>{list.name}</strong>
                <p>
                  {list.users} user · {list.posts} posts
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="collections__empty-groups">
          <h4>Fans</h4>
          <p>Empty</p>
          <h4>Following</h4>
          <p>Empty</p>
          <h4>Restricted</h4>
          <p>Empty</p>
          <h4>Blocked</h4>
          <p>Empty</p>
        </div>
      </section>
      <aside className="collections__aside">
        <section className="collections__bookmarks">
          <h3>Bookmarks</h3>
          <p>Empty</p>
        </section>
        <section className="collections__following">
          <div className="collections__following-header">
            <h3>Following users</h3>
            <div className="collections__search collections__search--inline">
              <span aria-hidden="true">🔍</span>
              <input type="text" placeholder="Search" />
            </div>
          </div>
          <div className="collections__following-list">
            {creators.map((creator) => (
              <div key={creator.id} className="collections__following-card">
                <img src={creator.image} alt={`${creator.name} avatar`} />
                <div>
                  <strong>{creator.name}</strong>
                  <span>@{creator.handle}</span>
                </div>
                <button type="button">Subscribe</button>
              </div>
            ))}
            <p className="collections__empty">Nothing found.</p>
          </div>
        </section>
      </aside>
    </div>
    <footer className="collections__footer">
      <a href="#">Privacy</a>
      <a href="#">Cookie Notice</a>
      <a href="#">Terms of Service</a>
    </footer>
  </div>
);

export default CollectionsPage;
