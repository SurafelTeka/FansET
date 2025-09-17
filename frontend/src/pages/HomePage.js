import React from 'react';
import Header from '../components/Header';
import PostCard from '../components/PostCard';
import CreatorCard from '../components/CreatorCard';
import { posts, creators } from '../data/mockData';
import './HomePage.css';

const HomePage = () => (
  <div className="page home">
    <Header title="HOME" subtitle="Compose new post" searchPlaceholder="Search posts">
      <div className="page-header__search page-header__search--wide">
        <span aria-hidden="true">🖊️</span>
        <input type="text" placeholder="Compose new post..." />
      </div>
    </Header>
    <div className="home__body">
      <section className="home__feed">
        {posts.length === 0 && <p className="home__empty">No posts yet.</p>}
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        <div className="home__footer-links">
          <a href="#">Privacy</a>
          <a href="#">Cookie Notice</a>
          <a href="#">Terms of Service</a>
        </div>
      </section>
      <aside className="home__aside">
        <div className="home__suggestions">
          <div className="home__suggestions-header">
            <h2>Suggestions</h2>
            <button type="button" aria-label="expand suggestions">
              ⤢
            </button>
          </div>
          <div className="home__suggestions-list">
            {creators.map((creator) => (
              <CreatorCard key={creator.id} creator={creator} />
            ))}
          </div>
        </div>
      </aside>
    </div>
  </div>
);

export default HomePage;
