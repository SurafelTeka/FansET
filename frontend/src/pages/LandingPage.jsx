import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput.jsx';
import Modal from '../components/Modal.jsx';
import useAuth from '../hooks/useAuth.js';
import './LandingPage.css';

const initialSignUpState = {
  displayName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  confirmAge: true,
  acceptTerms: true
};

const initialLoginState = {
  identifier: '',
  password: '',
  rememberDevice: true
};

const metricHighlights = [
  { value: '42K+', label: 'Creators launched with FansET' },
  { value: '96%', label: 'Fan satisfaction across memberships' },
  { value: '$18.4M', label: 'Payouts delivered in the last quarter' }
];

const featureHighlights = [
  {
    icon: '🎯',
    title: 'Audience intelligence',
    description: 'Segment superfans, automate drops, and deliver bespoke journeys with pixel-perfect targeting.'
  },
  {
    icon: '🛠️',
    title: 'Flexible monetization',
    description: 'Launch tiers, pay-per-view sets, live workshops, and premium collections in a few clicks.'
  },
  {
    icon: '🛡️',
    title: 'Trust & safety built in',
    description: 'Enterprise-grade security, DMCA workflows, and encrypted vault storage protect every release.'
  },
  {
    icon: '⚡',
    title: 'Automation for busy teams',
    description: 'Schedule campaigns, auto-reply to VIPs, and sync analytics with your favorite creator tools.'
  }
];

const quickStartChecklist = [
  'Customize your storefront & brand kit',
  'Publish exclusive tiers and gated collections',
  'Go live with launches, chats, and broadcast alerts'
];

const LandingPage = () => {
  const navigate = useNavigate();
  const { signup, login, user, initializing } = useAuth();
  const [authMode, setAuthMode] = useState(null);
  const [signUpForm, setSignUpForm] = useState(initialSignUpState);
  const [loginForm, setLoginForm] = useState(initialLoginState);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!initializing && user) {
      navigate('/home', { replace: true });
    }
  }, [initializing, navigate, user]);

  const openModal = (mode) => {
    setAuthMode(mode);
    setStatus({ type: 'idle', message: '' });
    setSubmitting(false);
  };

  const closeModal = () => {
    setAuthMode(null);
    setStatus({ type: 'idle', message: '' });
    setSubmitting(false);
  };

  const handleSignUpChange = (event) => {
    const { name, value, type, checked } = event.target;
    setSignUpForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleLoginChange = (event) => {
    const { name, value, type, checked } = event.target;
    setLoginForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const statusClassName = useMemo(() => {
    if (status.type === 'error') {
      return 'landing__status landing__status--error';
    }

    if (status.type === 'success') {
      return 'landing__status landing__status--success';
    }

    if (status.type === 'loading') {
      return 'landing__status landing__status--loading';
    }

    return 'landing__status';
  }, [status.type]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!authMode) {
      return;
    }

    const isSignup = authMode === 'signup';

    if (isSignup) {
      const trimmedDisplayName = signUpForm.displayName.trim();
      const trimmedUsername = signUpForm.username.trim();
      const trimmedEmail = signUpForm.email.trim();

      if (!signUpForm.confirmAge) {
        setStatus({ type: 'error', message: 'Please confirm you are at least 18 years old before continuing.' });
        return;
      }

      if (!signUpForm.acceptTerms) {
        setStatus({ type: 'error', message: 'Please review and accept the FansET terms before continuing.' });
        return;
      }

      if (!trimmedDisplayName || !trimmedUsername || !trimmedEmail || !signUpForm.password || !signUpForm.confirmPassword) {
        setStatus({ type: 'error', message: 'All fields are required to create your account.' });
        return;
      }

      if (signUpForm.password.length < 8) {
        setStatus({ type: 'error', message: 'Use a password with at least 8 characters.' });
        return;
      }

      if (signUpForm.password !== signUpForm.confirmPassword) {
        setStatus({ type: 'error', message: 'Passwords do not match.' });
        return;
      }

      setSubmitting(true);
      setStatus({ type: 'loading', message: 'Creating your FansET account…' });

      try {
        await signup({
          displayName: trimmedDisplayName,
          username: trimmedUsername,
          email: trimmedEmail,
          password: signUpForm.password
        });
        setStatus({ type: 'success', message: 'Account created! Redirecting to your feed…' });
      } catch (error) {
        const errorMessage = error?.details?.error || error?.message || 'Something went wrong. Please try again.';
        setStatus({ type: 'error', message: errorMessage });
      } finally {
        setSubmitting(false);
      }

      return;
    }

    const trimmedIdentifier = loginForm.identifier.trim();

    if (!trimmedIdentifier || !loginForm.password) {
      setStatus({ type: 'error', message: 'Enter your email or username and password to continue.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: 'loading', message: 'Signing you in…' });

    try {
      await login({
        identifier: trimmedIdentifier,
        password: loginForm.password
      });
      setStatus({ type: 'success', message: 'Welcome back! Loading your feed…' });
    } catch (error) {
      const errorMessage = error?.details?.error || error?.message || 'Unable to sign in. Please try again.';
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="landing">
      <header className="landing__nav">
        <div className="landing__nav-brand">
          <div className="landing__mark" aria-hidden="true">
            <svg width="48" height="48" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="36" fill="#0b1622" stroke="#00a3ff" strokeWidth="8" />
              <path
                d="M40 50c-6-4.4-12-8.8-12-16a8 8 0 0 1 15-3.4 8 8 0 0 1 15 3.4c0 7.2-6 11.6-12 16z"
                fill="#00a3ff"
              />
            </svg>
          </div>
          <span>FansET</span>
        </div>
        <nav className="landing__nav-links">
          <a href="#features">Features</a>
          <a href="#creators">For creators</a>
          <a href="#support">Support</a>
        </nav>
        <div className="landing__nav-actions">
          <button type="button" className="landing__button landing__button--ghost" onClick={() => openModal('login')}>
            Log in
          </button>
          <button type="button" className="landing__button landing__button--primary" onClick={() => openModal('signup')}>
            Join FansET
          </button>
        </div>
      </header>

      <main className="landing__main">
        <section className="landing__intro">
          <span className="landing__eyebrow">THE NEW HOME FOR FANDOMS</span>
          <h1>Monetize your superfans without compromise.</h1>
          <p>
            FansET brings the visual polish of Fansly with streamlined onboarding, live monetization, and audience automations
            built for creators who run thriving communities.
          </p>
          <div className="landing__cta-group">
            <button type="button" className="landing__button landing__button--primary" onClick={() => openModal('signup')}>
              Launch your hub
            </button>
            <button type="button" className="landing__button landing__button--outline" onClick={() => openModal('login')}>
              Preview dashboard
            </button>
          </div>
          <div className="landing__metrics">
            {metricHighlights.map((metric) => (
              <div className="landing__metric" key={metric.label}>
                <span className="landing__metric-value">{metric.value}</span>
                <span className="landing__metric-label">{metric.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="landing__visual" aria-labelledby="landing-preview">
          <div className="landing__glow" aria-hidden="true" />
          <div className="landing__preview-card landing__preview-card--primary">
            <header>
              <span>Creator earnings</span>
              <strong>$16,720</strong>
              <p>
                <span>▲ 18%</span> vs last month
              </p>
            </header>
            <ul>
              <li>
                <span className="landing__badge landing__badge--emerald">Gold tier</span>
                <div>
                  <strong>$8,940</strong>
                  <small>1,842 members</small>
                </div>
              </li>
              <li>
                <span className="landing__badge landing__badge--sky">VIP livestream</span>
                <div>
                  <strong>$4,280</strong>
                  <small>624 tickets</small>
                </div>
              </li>
              <li>
                <span className="landing__badge landing__badge--violet">Bundle drop</span>
                <div>
                  <strong>$3,500</strong>
                  <small>312 orders</small>
                </div>
              </li>
            </ul>
          </div>
          <div className="landing__preview-card landing__preview-card--secondary">
            <span className="landing__preview-subtitle">This week&apos;s spotlight</span>
            <h3 id="landing-preview">Live drops & experiences</h3>
            <ul>
              <li>
                <div className="landing__avatar" style={{ backgroundColor: '#38bdf8' }} aria-hidden="true">
                  NK
                </div>
                <div>
                  <strong>Nova Kai</strong>
                  <small>Immersive VR set · 12 Jun</small>
                </div>
                <span className="landing__pill landing__pill--success">Sold out</span>
              </li>
              <li>
                <div className="landing__avatar" style={{ backgroundColor: '#6366f1' }} aria-hidden="true">
                  LX
                </div>
                <div>
                  <strong>Lux Aria</strong>
                  <small>Creator Q&A · 14 Jun</small>
                </div>
                <span className="landing__pill">150 seats</span>
              </li>
              <li>
                <div className="landing__avatar" style={{ backgroundColor: '#f97316' }} aria-hidden="true">
                  RS
                </div>
                <div>
                  <strong>Rogue Studio</strong>
                  <small>Workshop replay · 16 Jun</small>
                </div>
                <span className="landing__pill landing__pill--outline">New</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <section className="landing__feature-grid" id="features">
        {featureHighlights.map((feature) => (
          <article className="landing__feature" key={feature.title}>
            <span className="landing__feature-icon" aria-hidden="true">
              {feature.icon}
            </span>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </article>
        ))}
      </section>

      <section className="landing__secondary" id="creators">
        <div className="landing__secondary-card landing__secondary-card--quote">
          <p>
            “FansET rebuilt our onboarding in a weekend. We moved 12,000 members without churn and doubled live event revenue.”
          </p>
          <div className="landing__quote-meta">
            <div className="landing__avatar" style={{ backgroundColor: '#22c55e' }} aria-hidden="true">
              QA
            </div>
            <div>
              <strong>Quinn Aster</strong>
              <small>Creator, Hologram Atelier</small>
            </div>
          </div>
        </div>
        <div className="landing__secondary-card landing__secondary-card--checklist" id="support">
          <h3>Launch in three guided steps</h3>
          <ul>
            {quickStartChecklist.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <button type="button" className="landing__button landing__button--primary" onClick={() => openModal('signup')}>
            Start free trial
          </button>
        </div>
      </section>

      <footer className="landing__footer">
        <span>©2025 FansET</span>
        <nav>
          <a href="#features">Explore FansET</a>
          <a href="#creators">Become a Creator</a>
          <a href="#support">Support</a>
          <a href="#">Community Guidelines</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">DMCA</a>
        </nav>
        <div className="landing__footer-meta">
          <span role="img" aria-label="x">
            ✖️
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

      <Modal
        isOpen={authMode === 'signup'}
        onClose={closeModal}
        title="Join FansET"
        description="Launch memberships, collections, and live broadcasts with a platform built for modern creators."
        footer={
          <>
            <span>Already have an account?</span>
            <button type="button" onClick={() => openModal('login')}>
              Log in
            </button>
          </>
        }
      >
        <form className="landing__modal-form" onSubmit={handleSubmit}>
          <FormInput label="Display name">
            <input
              type="text"
              name="displayName"
              placeholder="Nova Kai"
              autoComplete="name"
              value={signUpForm.displayName}
              onChange={handleSignUpChange}
              data-autofocus
            />
          </FormInput>
          <FormInput label="Username" hint="Lowercase letters, numbers, and underscores">
            <input
              type="text"
              name="username"
              placeholder="novakai"
              autoComplete="username"
              value={signUpForm.username}
              onChange={handleSignUpChange}
            />
          </FormInput>
          <FormInput label="Email">
            <input
              type="email"
              name="email"
              placeholder="you@fanset.com"
              autoComplete="email"
              value={signUpForm.email}
              onChange={handleSignUpChange}
            />
          </FormInput>
          <FormInput label="Password" hint="Minimum 8 characters">
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={signUpForm.password}
              onChange={handleSignUpChange}
            />
          </FormInput>
          <FormInput label="Confirm password">
            <input
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              autoComplete="new-password"
              value={signUpForm.confirmPassword}
              onChange={handleSignUpChange}
            />
          </FormInput>
          <label className="landing__checkbox">
            <input type="checkbox" name="confirmAge" checked={signUpForm.confirmAge} onChange={handleSignUpChange} />
            I confirm I am 18+ and legally permitted to use FansET.
          </label>
          <label className="landing__checkbox landing__checkbox--muted">
            <input type="checkbox" name="acceptTerms" checked={signUpForm.acceptTerms} onChange={handleSignUpChange} />
            I agree to the FansET Terms of Service and Privacy Policy.
          </label>
          <button type="submit" className="landing__button landing__button--primary" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
          {status.message && authMode === 'signup' ? <p className={statusClassName}>{status.message}</p> : null}
        </form>
      </Modal>

      <Modal
        isOpen={authMode === 'login'}
        onClose={closeModal}
        title="Welcome back"
        description="Access your dashboards, schedule drops, and connect with the fans who power your business."
        footer={
          <>
            <span>New to FansET?</span>
            <button type="button" onClick={() => openModal('signup')}>
              Create account
            </button>
          </>
        }
      >
        <form className="landing__modal-form" onSubmit={handleSubmit}>
          <FormInput label="Email or username">
            <input
              type="text"
              name="identifier"
              placeholder="you@fanset.com or novakai"
              autoComplete="username"
              value={loginForm.identifier}
              onChange={handleLoginChange}
              data-autofocus
            />
          </FormInput>
          <FormInput label="Password">
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={loginForm.password}
              onChange={handleLoginChange}
            />
          </FormInput>
          <label className="landing__checkbox landing__checkbox--muted">
            <input
              type="checkbox"
              name="rememberDevice"
              checked={loginForm.rememberDevice}
              onChange={handleLoginChange}
            />
            Keep me signed in on this device.
          </label>
          <button type="submit" className="landing__button landing__button--primary" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Log in'}
          </button>
          {status.message && authMode === 'login' ? <p className={statusClassName}>{status.message}</p> : null}
        </form>
      </Modal>
    </div>
  );
};

export default LandingPage;
