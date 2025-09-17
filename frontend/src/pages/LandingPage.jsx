import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => (
  <div className="landing">
    <div className="landing__hero">
      <div className="landing__brand">
        <div className="landing__logo" aria-hidden="true">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="36" fill="#0b1622" stroke="#00a3ff" strokeWidth="8" />
            <path
              d="M40 50c-6-4.4-12-8.8-12-16a8 8 0 0 1 15-3.4 8 8 0 0 1 15 3.4c0 7.2-6 11.6-12 16z"
              fill="#00a3ff"
            />
          </svg>
        </div>
        <h1>Fansly</h1>
        <p>Not sure what you&apos;re into? We&apos;ll figure it out.</p>
        <ul>
          <li>
            <span>⭐</span>Our algorithms find and filter content just for you.
          </li>
          <li>
            <span>⭐</span>Swipe and discover your next favorite creator.
          </li>
          <li>
            <span>⭐</span>Livestreaming, personal messaging, and more!
          </li>
        </ul>
      </div>
      <div className="landing__form">
        <h2>Join the community</h2>
        <div className="landing__actions">
          <Link to="/home" className="landing__button landing__button--primary">
            Sign up
          </Link>
          <Link to="/home" className="landing__button landing__button--outline">
            Login
          </Link>
        </div>
        <div className="landing__social">
          <button type="button" className="landing__social-button">
            <span className="landing__icon">✖</span> Sign in with Twitter
          </button>
          <button type="button" className="landing__social-button">
            <span className="landing__icon">🟦</span> Sign in with Google
          </button>
          <button type="button" className="landing__social-button landing__social-button--twitch">
            <span className="landing__icon">🎮</span> Sign in with Twitch
          </button>
        </div>
        <label className="landing__checkbox">
          <input type="checkbox" defaultChecked />I confirm that I am 18 years of age or older.
        </label>
        <p className="landing__fine-print">
          By joining, you agree to our <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a>. And
          confirm that you are at least 18 years old.
        </p>
      </div>
    </div>
    <div className="landing__comparison">
      <div className="landing__card">
        <h3>OnlyFans style onboarding</h3>
        <p>Sign up to support your favorite creators</p>
        <form>
          <label>
            Email
            <input type="email" placeholder="Email" />
          </label>
          <label>
            Password
            <input type="password" placeholder="Password" />
          </label>
          <label className="landing__checkbox landing__checkbox--inline">
            <input type="checkbox" defaultChecked />I am 18+ and agree to the policies.
          </label>
          <button type="button" className="landing__button landing__button--ghost">
            Log in
          </button>
        </form>
        <div className="landing__social landing__social--compact">
          <button type="button" className="landing__social-button">
            ✖ Sign in with X
          </button>
          <button type="button" className="landing__social-button">
            🟦 Sign in with Google
          </button>
          <button type="button" className="landing__social-button landing__social-button--green">
            🔐 Passwordless sign in
          </button>
        </div>
      </div>
    </div>
    <footer className="landing__footer">
      <span>©2025 Fansly</span>
      <nav>
        <a href="#">Explore Fansly</a>
        <a href="#">Become a Creator</a>
        <a href="#">Contact Support</a>
        <a href="#">Complaint Process</a>
        <a href="#">Terms</a>
        <a href="#">Privacy</a>
        <a href="#">US 2257 DMCA</a>
      </nav>
      <div className="landing__footer-meta">
        <span role="img" aria-label="twitter">
          🐦
        </span>
        <span role="img" aria-label="instagram">
          📸
        </span>
        <select aria-label="language selection">
          <option>English</option>
          <option>Deutsch</option>
          <option>日本語</option>
        </select>
      </div>
    </footer>
  </div>
);

export default LandingPage;
