import React from 'react';
import Header from '../components/Header';
import CreatorCard from '../components/CreatorCard';
import { creators } from '../data/mockData';
import './ProfilePage.css';

const ProfilePage = () => (
  <div className="page profile">
    <Header
      title="< Surafel Teka"
      subtitle="My profile"
      searchPlaceholder="Search user's posts"
      actions={
        <button type="button" className="profile__spotify">
          🎵 Sign in with Spotify
        </button>
      }
    />
    <section className="profile__banner">
      <div className="profile__avatar">S</div>
      <div className="profile__info">
        <h2>Surafel Teka</h2>
        <p>@u250973728 · Available</p>
        <div className="profile__stats">
          <span>0 Fans</span>
          <span>0 Following</span>
        </div>
      </div>
      <button type="button" className="profile__edit">
        ⚙ Edit profile
      </button>
    </section>
    <section className="profile__empty">
      <div className="profile__empty-art" aria-hidden="true">
        ◻ ◯ △
      </div>
      <h3>No posts</h3>
      <p>Your media library is waiting for your first upload.</p>
    </section>
    <section className="profile__suggestions">
      <h3>Discover creators</h3>
      <div className="profile__suggestions-list">
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} />
        ))}
      </div>
    </section>
    <button type="button" className="profile__new-post">
      + New post
    </button>
    <div className="profile__footer-links">
      <a href="#">Privacy</a>
      <a href="#">Cookie Notice</a>
      <a href="#">Terms of Service</a>
    </div>
  </div>
);

export default ProfilePage;
