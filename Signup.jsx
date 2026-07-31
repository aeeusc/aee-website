// src/pages/Signup.jsx
//
// The sign-up page. Collects email + password, calls the backend,
// and shows a "check your email" message on success.

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

  if (status === 'success') {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.heading}>Check your email</h1>
          <p style={styles.body}>
            We sent a verification link to <strong>{email}</strong>. Click it
            to activate your account, then come back and log in.
          </p>
          <Link to="/login" style={styles.linkButton}>Go to Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
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

          <button type="submit" disabled={status === 'submitting'} style={styles.button}>
            {status === 'submitting' ? 'Creating account…' : 'Sign Up'}
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account? <Link to="/login" style={styles.inlineLink}>Log in</Link>
        </p>
      </div>
    </div>
  );
}

// Inline styles matching the design brief's monochrome navy system:
// navy-950 background, hollow outlined boxes (1px rgba-white border,
// transparent fill), Space Grotesk for headings / Inter for body.
// If your site already has these fonts loaded globally (via index.html
// or a global CSS file), these font-family references will just work.
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0A0E1A', // navy-950
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    border: '1px solid rgba(255,255,255,0.15)', // hollow box style
    background: 'transparent',
    borderRadius: '12px',
    padding: '40px 32px',
  },
  heading: {
    fontFamily: '"Space Grotesk", sans-serif',
    color: '#F5F5F5', // off-white
    fontSize: '28px',
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
    fontFamily: '"Inter", sans-serif',
    color: '#94A3B8', // slate
    fontSize: '14px',
  },
  input: {
    background: 'transparent',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '8px',
    padding: '12px 14px',
    color: '#F5F5F5',
    fontFamily: '"Inter", sans-serif',
    fontSize: '15px',
    outline: 'none',
  },
  button: {
    marginTop: '8px',
    background: '#F5F5F5',
    color: '#0A0E1A',
    border: 'none',
    borderRadius: '8px',
    padding: '13px',
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
  },
  error: {
    color: '#F87171',
    fontFamily: '"Inter", sans-serif',
    fontSize: '14px',
    margin: 0,
  },
  footerText: {
    marginTop: '24px',
    fontFamily: '"Inter", sans-serif',
    color: '#94A3B8',
    fontSize: '14px',
    textAlign: 'center',
  },
  inlineLink: {
    color: '#F5F5F5',
    textDecoration: 'underline',
  },
  linkButton: {
    display: 'inline-block',
    marginTop: '8px',
    color: '#0A0E1A',
    background: '#F5F5F5',
    padding: '12px 20px',
    borderRadius: '8px',
    fontFamily: '"Space Grotesk", sans-serif',
    fontWeight: 600,
    textDecoration: 'none',
  },
  body: {
    fontFamily: '"Inter", sans-serif',
    color: '#94A3B8',
    fontSize: '15px',
    lineHeight: 1.6,
  },
};
