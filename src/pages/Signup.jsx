// src/pages/Signup.jsx
//
// The sign-up page. Collects email + password, calls the backend,
// and shows a "check your email" message on success.
//
// Styled to match the real homepage mock (aee_homepage_mock_3.html) —
// same CSS custom properties (navy-950/900/800, slate, ink), same
// Space Grotesk/Inter font pairing, and the same pill-shaped button
// style used for "Get Involved" in the site's nav.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../lib/api';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await signup(email, password);
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  }

  return (
    <div style={styles.page}>
      {/* Uses React Router's Link (client-side navigation) rather than
          relying on the browser's back button — this always returns to
          the homepage regardless of how the visitor arrived at /signup
          (e.g. a direct link, a bookmark, or a shared URL). */}
      <Link to="/" style={styles.backLink}>← Back to home</Link>

      <div style={styles.card}>
        {status === 'success' ? (
          <>
            <h1 style={styles.heading}>Check your email</h1>
            <p style={styles.body}>
              We sent a verification link to <strong>{email}</strong>. Click it
              to activate your account, then come back and log in.
            </p>
            <Link to="/login" style={styles.pill}>Go to Log In</Link>
          </>
        ) : (
          <>
            <h1 style={styles.heading}>Create an account</h1>

            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>
                Email
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  placeholder="you@example.com"
                />
              </label>

              <label style={styles.label}>
                Password
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={styles.input}
                  placeholder="At least 8 characters"
                />
              </label>

              {status === 'error' && (
                <p style={styles.error}>{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                style={{ ...styles.pill, ...styles.pillButton }}
              >
                {status === 'submitting' ? 'Creating account…' : 'Sign Up'}
              </button>
            </form>

            <p style={styles.footerText}>
              Already have an account? <Link to="/login" style={styles.inlineLink}>Log in</Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}

// Design tokens copied directly from aee_homepage_mock_3.html's :root
// block, so this page matches the real site exactly rather than an
// approximation.
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
  // The site's signature "pill" button/link style — white background,
  // fully rounded, navy text. Matches .pill from the homepage mock.
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
  body: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slateLight,
    fontSize: '15px',
    lineHeight: 1.6,
    marginBottom: '20px',
  },
};
