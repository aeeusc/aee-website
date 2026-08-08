// src/pages/Login.jsx
//
// The login page. Collects email + password, calls the backend, and
// on success redirects to the homepage.
//
// Styled to match the real homepage mock (aee_homepage_mock_3.html) —
// see Signup.jsx for the shared design-token notes.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../lib/api';

export default function Login() {
  // "identifier" rather than "email" — accounts are now admin-created
  // (see CreateUser.jsx) and get a generated username; a person can log
  // in with either that username or an email, if one is attached to
  // their account. See routes/auth.js's /login and lib/api.js's login().
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await login(identifier, password);
      // Success — send them back to the homepage using React Router
      // navigation (not a full page reload).
      navigate('/');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  }

  return (
    <div style={styles.page}>
      {/* Same "return to home" pattern as Signup.jsx — a real link via
          React Router, so visitors don't have to rely on the browser's
          back button to leave this page. */}
      <Link to="/" style={styles.backLink}>← Back to home</Link>

      <div style={styles.card}>
        <h1 style={styles.heading}>Log in</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Username or email
            <input
              type="text"
              required
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              style={styles.input}
              placeholder="your.username"
            />
          </label>

          <label style={styles.label}>
            Password
            <div style={styles.passwordWrap}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ ...styles.input, ...styles.passwordInput }}
                placeholder="Your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                style={styles.eyeButton}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                aria-pressed={showPassword}
              >
                {showPassword ? (
                  // Eye with a slash through it — password is currently visible
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M10.6 5.2A10.9 10.9 0 0112 5c5.5 0 9.5 4 11 7-.6 1.2-1.6 2.6-3 3.9M6.3 6.9C4.5 8.1 3.1 9.8 2 12c1.5 3 5.5 7 10 7 1.4 0 2.7-.3 3.9-.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path d="M9.9 10a3 3 0 004.1 4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                  </svg>
                ) : (
                  // Plain open eye — password is currently hidden
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M1 12c1.5-3 5.5-7 11-7s9.5 4 11 7c-1.5 3-5.5 7-11 7s-9.5-4-11-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
                  </svg>
                )}
              </button>
            </div>
          </label>

          {status === 'error' && (
            <p style={styles.error}>{errorMessage}</p>
          )}

          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{ ...styles.pill, ...styles.pillButton }}
          >
            {status === 'submitting' ? 'Logging in…' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Design tokens copied directly from aee_homepage_mock_3.html's :root
// block — kept identical to Signup.jsx so the two pages feel like one
// consistent flow.
const colors = {
  navy950: '#0A0E1A',
  navy900: '#101830',
  navy800: '#16213E',
  slate: '#94A3B8',
  slateLight: '#C9D4E4',
  ink: '#0B0F1A',
  white: '#FFFFFF',
  line: 'rgba(255,255,255,.16)',
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.navy950,
    padding: '24px',
    position: 'relative',
  },
  backLink: {
    position: 'absolute',
    top: '32px',
    left: '40px',
    color: 'rgba(255,255,255,.85)',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 500,
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    border: `1px solid ${colors.line}`,
    background: 'transparent',
    borderRadius: '16px',
    padding: '40px 32px',
  },
  heading: {
    fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    fontWeight: 700,
    color: colors.white,
    fontSize: '28px',
    letterSpacing: '-.02em',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slate,
    fontSize: '14px',
  },
  input: {
    background: 'rgba(255,255,255,.05)',
    border: `1px solid ${colors.line}`,
    borderRadius: '10px',
    padding: '12px 16px',
    color: colors.white,
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '15px',
    outline: 'none',
  },
  passwordWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  passwordInput: {
    width: '100%',
    paddingRight: '44px',
    boxSizing: 'border-box',
  },
  eyeButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.slate,
    cursor: 'pointer',
    lineHeight: 0,
  },
  pill: {
    background: colors.white,
    color: colors.navy950,
    borderRadius: '999px',
    padding: '13px 22px',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: "'Inter', -apple-system, sans-serif",
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    border: 'none',
    cursor: 'pointer',
  },
  pillButton: {
    marginTop: '8px',
    width: '100%',
  },
  error: {
    color: '#F87171',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '14px',
    margin: 0,
  },
  footerText: {
    marginTop: '24px',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slate,
    fontSize: '14px',
    textAlign: 'center',
  },
  inlineLink: {
    color: colors.white,
    textDecoration: 'underline',
  },
};
