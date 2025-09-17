import React, { useEffect, useMemo, useState } from 'react';
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
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="36" fill="#0b1622" stroke="#00a3ff" strokeWidth="8" />
              <path
                d="M40 50c-6-4.4-12-8.8-12-16a8 8 0 0 1 15-3.4 8 8 0 0 1 15 3.4c0 7.2-6 11.6-12 16z"
                fill="#00a3ff"
              />
            </svg>
          </div>
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
    </div>
  );
};

export default LandingPage;
