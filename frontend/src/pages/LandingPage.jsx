import React, { useEffect, useMemo, useState } from 'react';

import './LandingPage.css';

const socialProviders = [
  { id: 'twitter', name: 'Twitter' },
  { id: 'google', name: 'Google' },
  { id: 'telegram', name: 'Telegram' },
  { id: 'twitch', name: 'Twitch' },
];

const SocialIcon = ({ id }) => {
  switch (id) {
    case 'twitter':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M3 3h4.11l4.54 6.13L16.83 3H21l-7.14 8.2L21 21h-4.2l-5.19-6.88L6.04 21H3l7.44-8.59L3 3z"
          />
        </svg>
      );
    case 'google':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="#EA4335"
            d="M12 5.3c1.6 0 3.03.55 4.17 1.46l2.97-2.97C17.1 1.5 14.79.5 12 .5 7.34.5 3.25 3.18 1.53 7.21l4.63 3.57C6.9 7.37 9.21 5.3 12 5.3z"
          />
          <path
            fill="#34A853"
            d="M12 22.5c3 0 5.52-.98 7.38-2.66l-3.79-2.95c-1.05.7-2.38 1.12-3.6 1.12-2.84 0-5.24-1.93-6.11-4.57H1.75v2.87C3.64 19.86 7.44 22.5 12 22.5z"
          />
          <path
            fill="#FBBC05"
            d="M5.88 13.44c-.2-.67-.32-1.38-.32-2.13 0-.73.11-1.44.32-2.12V6.32H1.75C.96 7.85.5 9.58.5 11.31c0 1.73.46 3.46 1.25 4.99l4.13-2.86z"
          />
          <path
            fill="#4285F4"
            d="M23.5 11.3c0-.77-.07-1.37-.22-2H12v3.96h6.55c-.3 1.52-1.2 2.71-2.45 3.55l3.79 2.95c2.21-2.04 3.61-5 3.61-8.46z"
          />
        </svg>
      );
    case 'telegram':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="m21.8 3.18-19 7.8c-.86.35-.84 1.6.03 1.91l4.62 1.66 1.78 5.66c.26.83 1.3 1.07 1.9.45l2.53-2.6 4.7 3.42c.73.53 1.76.12 1.9-.76l2.9-16.95c.15-.89-.69-1.59-1.46-1.2z"
          />
          <path
            fill="#B4D4FF"
            d="m9.9 16.58-.96-3.31 8.73-7.88-11.2 6.92"
          />
        </svg>
      );
    case 'twitch':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            fill="currentColor"
            d="M4 2 2 6v15h5v3h3l3-3h4l5-5V2H4zm16 10-3 3h-5l-3 3v-3H7V5h13v7z"
          />
          <path fill="currentColor" d="M15 6h2v6h-2zM11 6h2v6h-2z" />
        </svg>
      );
    default:
      return null;
  }
};

const SocialButtons = ({ mode = 'signin', className = '' }) => {
  const containerClass = useMemo(
    () => ['landing__social', className].filter(Boolean).join(' '),
    [className],
  );

  return (
    <div className={containerClass}>
      {socialProviders.map(({ id, name }) => (
        <button
          type="button"
          key={id}
          className={`landing__social-button landing__social-button--${id}`}
        >
          <span className="landing__social-icon" aria-hidden="true">
            <SocialIcon id={id} />
          </span>
          <span>{mode === 'signup' ? `Sign up with ${name}` : `Sign in with ${name}`}</span>
        </button>
      ))}
    </div>
  );
};

const LandingPage = () => {
  const [activeModal, setActiveModal] = useState(null);

  useEffect(() => {
    if (!activeModal) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveModal(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeModal]);

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;

    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeModal]);

  const openModal = (modal) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  const Modal = ({ type }) => {
    const isSignup = type === 'signup';

    const handleSubmit = (event) => {
      event.preventDefault();
    };

    return (
      <div className="landing__modal-overlay" role="presentation" onClick={closeModal}>
        <div
          className="landing__modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby={`landing-${type}-title`}
          onClick={(event) => event.stopPropagation()}
        >
          <button type="button" className="landing__modal-close" onClick={closeModal} aria-label="Close">
            ×
          </button>
          <div className="landing__modal-header">
            <div className="landing__logo landing__logo--modal" aria-hidden="true">
              <svg width="64" height="64" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="34" fill="rgba(11, 22, 34, 0.9)" stroke="#00a3ff" strokeWidth="6" />
                <path
                  d="M40 50c-6-4.4-12-8.8-12-16a8 8 0 0 1 15-3.4 8 8 0 0 1 15 3.4c0 7.2-6 11.6-12 16z"
                  fill="#00a3ff"
                />
              </svg>
            </div>
            <h3 id={`landing-${type}-title`}>{isSignup ? 'Join Fansly' : 'Welcome back'}</h3>
            <p className="landing__modal-subtitle">
              {isSignup ? 'Create your account to follow your favorite creators.' : 'Log in to continue the experience.'}
            </p>
          </div>
          <form className="landing__modal-form" onSubmit={handleSubmit}>
            <label className="landing__modal-label" htmlFor={`${type}-username`}>
              <span>Username</span>
              <input
                id={`${type}-username`}
                type="text"
                placeholder="Username"
                className="landing__modal-input"
              />
            </label>
            {isSignup && (
              <label className="landing__modal-label" htmlFor="signup-email">
                <span>Email address</span>
                <input id="signup-email" type="email" placeholder="Email address" className="landing__modal-input" />
              </label>
            )}
            <label className="landing__modal-label" htmlFor={`${type}-password`}>
              <span>Password</span>
              <input
                id={`${type}-password`}
                type="password"
                placeholder="Password"
                className="landing__modal-input"
              />
            </label>
            {isSignup && (
              <label className="landing__modal-label" htmlFor="signup-confirm">
                <span>Confirm password</span>
                <input
                  id="signup-confirm"
                  type="password"
                  placeholder="Confirm password"
                  className="landing__modal-input"
                />
              </label>
            )}
            <button type="submit" className="landing__button landing__button--primary landing__button--full">
              {isSignup ? 'Join' : 'Log in'}
            </button>
          </form>
          <div className="landing__divider">
            <span>Or</span>
          </div>
          <SocialButtons mode={isSignup ? 'signup' : 'signin'} className="landing__social--modal" />
          <p className="landing__legal">
            {isSignup ? (
              <>
                By joining, you agree to our <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a>, and
                confirm that you are at least 18 years old.
              </>
            ) : (
              <>
                By logging in, you agree to our <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a>.
              </>
            )}
          </p>
          <div className="landing__modal-footer">
            {isSignup ? (
              <>
                Already have an account?
                <button type="button" onClick={() => setActiveModal('login')}>
                  Login
                </button>
              </>
            ) : (
              <>
                New to Fansly?
                <button type="button" onClick={() => setActiveModal('signup')}>
                  Create account
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    );
=======
import { useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput.jsx';
import useAuth from '../hooks/useAuth.js';
import './LandingPage.css';

const initialSignUpState = {
  displayName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  acceptTerms: true
};

const initialLoginState = {
  identifier: '',
  password: '',
  acceptTerms: true
};

const LandingPage = () => {
  const navigate = useNavigate();
  const { signup, login, user, initializing } = useAuth();
  const [mode, setMode] = useState('signup');
  const [signUpForm, setSignUpForm] = useState(initialSignUpState);
  const [loginForm, setLoginForm] = useState(initialLoginState);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!initializing && user) {
      navigate('/home', { replace: true });
    }
  }, [initializing, navigate, user]);

  const activeForm = mode === 'signup' ? signUpForm : loginForm;

  const updateForm = (field, value) => {
    if (mode === 'signup') {
      setSignUpForm((prev) => ({ ...prev, [field]: value }));
    } else {
      setLoginForm((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    updateForm(name, type === 'checkbox' ? checked : value);
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setStatus({ type: 'idle', message: '' });
    setSubmitting(false);
  };

  const statusClassName = useMemo(() => {
    if (status.type === 'error') {
      return 'landing__status landing__status--error';
    }

    if (status.type === 'success') {
      return 'landing__status landing__status--success';
    }

    return 'landing__status';
  }, [status.type]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (submitting) {
      return;
    }

    if (!activeForm.acceptTerms) {
      setStatus({ type: 'error', message: 'Please confirm you are at least 18 years old.' });
      return;
    }

    setSubmitting(true);
    setStatus({ type: 'loading', message: 'Processing your request…' });

    try {
      if (mode === 'signup') {
        if (!signUpForm.displayName || !signUpForm.username || !signUpForm.email || !signUpForm.password) {
          setStatus({ type: 'error', message: 'All fields are required to create your account.' });
          setSubmitting(false);
          return;
        }

        if (signUpForm.password.length < 8) {
          setStatus({ type: 'error', message: 'Use a password with at least 8 characters.' });
          setSubmitting(false);
          return;
        }

        if (signUpForm.password !== signUpForm.confirmPassword) {
          setStatus({ type: 'error', message: 'Passwords do not match.' });
          setSubmitting(false);
          return;
        }

        await signup({
          displayName: signUpForm.displayName.trim(),
          username: signUpForm.username.trim(),
          email: signUpForm.email.trim(),
          password: signUpForm.password
        });
        setStatus({ type: 'success', message: 'Account created! Redirecting to your feed…' });
      } else {
        if (!loginForm.identifier || !loginForm.password) {
          setStatus({ type: 'error', message: 'Enter your email/username and password to continue.' });
          setSubmitting(false);
          return;
        }

        await login({
          identifier: loginForm.identifier.trim(),
          password: loginForm.password
        });
        setStatus({ type: 'success', message: 'Welcome back! Loading your feed…' });
      }
    } catch (error) {
      const errorMessage = error?.details?.error || error?.message || 'Something went wrong. Please try again.';
      setStatus({ type: 'error', message: errorMessage });
    } finally {
      setSubmitting(false);
    }

  };

  return (
    <div className="landing">
      <div className="landing__hero">
        <div className="landing__brand">
          <div className="landing__logo" aria-hidden="true">

            <svg width="90" height="90" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="34" fill="rgba(11, 22, 34, 0.9)" stroke="#00a3ff" strokeWidth="6" />

            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="36" fill="#0b1622" stroke="#00a3ff" strokeWidth="8" />

              <path
                d="M40 50c-6-4.4-12-8.8-12-16a8 8 0 0 1 15-3.4 8 8 0 0 1 15 3.4c0 7.2-6 11.6-12 16z"
                fill="#00a3ff"
              />
            </svg>
          </div>

          <h1>Fansly</h1>
          <p className="landing__tagline">Not sure what you&apos;re into? We&apos;ll figure it out.</p>
          <ul>
            <li>
              <span aria-hidden="true">★</span>
              Our algorithms find and filter content just for you.
            </li>
            <li>
              <span aria-hidden="true">★</span>
              Swipe and discover your next favorite creator.
            </li>
            <li>
              <span aria-hidden="true">★</span>
              Livestreaming, personal messaging, and more!
            </li>
          </ul>
        </div>
        <div className="landing__panel">
          <h2>Join the community</h2>
          <div className="landing__actions">
            <button
              type="button"
              className="landing__button landing__button--primary landing__button--full"
              onClick={() => openModal('signup')}
            >
              Sign up
            </button>
            <button
              type="button"
              className="landing__button landing__button--outline landing__button--full"
              onClick={() => openModal('login')}
            >
              Login
            </button>
          </div>
          <SocialButtons />
          <p className="landing__legal">
            By joining, you agree to our <a href="#">Terms &amp; Conditions</a> and <a href="#">Privacy Policy</a>, and confirm
            that you are at least 18 years old.

          <h1>FansET</h1>
          <p>Built for creators who turn fandoms into thriving communities.</p>
          <ul>
            <li>
              <span>✨</span>Smart discovery surfaces livestreams, drops, and collections you&apos;ll love.
            </li>
            <li>
              <span>🗂️</span>Organize premium sets, workshops, and behind-the-scenes notes in one hub.
            </li>
            <li>
              <span>🔒</span>Privacy-first infrastructure with token-based security for every action.
            </li>
          </ul>
        </div>
        <div className="landing__form" aria-live="polite">
          <div className="landing__form-header">
            <h2>{mode === 'signup' ? 'Create your FansET account' : 'Welcome back'}</h2>
            <div className="landing__tabs" role="tablist" aria-label="Authentication mode">
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'signup'}
                className={`landing__tab ${mode === 'signup' ? 'landing__tab--active' : ''}`}
                onClick={() => switchMode('signup')}
              >
                Sign up
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'login'}
                className={`landing__tab ${mode === 'login' ? 'landing__tab--active' : ''}`}
                onClick={() => switchMode('login')}
              >
                Log in
              </button>
            </div>
          </div>
          <form className="landing__fields" onSubmit={handleSubmit}>
            {mode === 'signup' ? (
              <>
                <FormInput label="Display name">
                  <input
                    type="text"
                    name="displayName"
                    placeholder="Nova Kai"
                    autoComplete="name"
                    value={signUpForm.displayName}
                    onChange={handleChange}
                  />
                </FormInput>
                <FormInput label="Username" hint="Lowercase letters, numbers, and underscores">
                  <input
                    type="text"
                    name="username"
                    placeholder="novakai"
                    autoComplete="username"
                    value={signUpForm.username}
                    onChange={handleChange}
                  />
                </FormInput>
                <FormInput label="Email">
                  <input
                    type="email"
                    name="email"
                    placeholder="you@fanset.com"
                    autoComplete="email"
                    value={signUpForm.email}
                    onChange={handleChange}
                  />
                </FormInput>
                <FormInput label="Password" hint="Minimum 8 characters">
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={signUpForm.password}
                    onChange={handleChange}
                  />
                </FormInput>
                <FormInput label="Confirm password">
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    value={signUpForm.confirmPassword}
                    onChange={handleChange}
                  />
                </FormInput>
              </>
            ) : (
              <>
                <FormInput label="Email or username">
                  <input
                    type="text"
                    name="identifier"
                    placeholder="you@fanset.com or novakai"
                    autoComplete="username"
                    value={loginForm.identifier}
                    onChange={handleChange}
                  />
                </FormInput>
                <FormInput label="Password">
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={loginForm.password}
                    onChange={handleChange}
                  />
                </FormInput>
              </>
            )}

            <label className="landing__checkbox">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={activeForm.acceptTerms}
                onChange={handleChange}
              />
              I confirm I am 18+ and agree to the FansET Terms &amp; Privacy Policy.
            </label>

            <button
              type="submit"
              className="landing__button landing__button--primary"
              disabled={submitting}
            >
              {submitting ? 'Processing…' : mode === 'signup' ? 'Create account' : 'Log in'}
            </button>
          </form>

          {status.message && <p className={statusClassName}>{status.message}</p>}

          <div className="landing__social">
            <button type="button" className="landing__social-button">
              <span className="landing__icon">✖</span> Continue with X (Twitter)
            </button>
            <button type="button" className="landing__social-button">
              <span className="landing__icon">🟦</span> Continue with Google
            </button>
            <button type="button" className="landing__social-button landing__social-button--twitch">
              <span className="landing__icon">🎮</span> Continue with Twitch
            </button>
          </div>

          <p className="landing__fine-print">
            FansET is a subscription marketplace for adults. Payments are securely processed and your personal data is encrypted
            in transit and at rest.

          </p>
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

        <span>©2025 FansET</span>
        <nav>
          <a href="#">Explore FansET</a>
          <a href="#">Become a Creator</a>
          <a href="#">Support</a>
          <a href="#">Community Guidelines</a>
          <a href="#">Terms</a>
          <a href="#">Privacy</a>
          <a href="#">DMCA</a>

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

      {activeModal ? <Modal type={activeModal} /> : null}


    </div>
  );
};

export default LandingPage;
