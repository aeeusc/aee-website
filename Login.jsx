// src/pages/Login.jsx
//
// The login page. Collects email + password, calls the backend, and
// on success redirects to the homepage.

import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      await login(email, password);
      // Success — send them back to the homepage. If you want the nav
      // bar to reflect "logged in" state, that's handled by whichever
      // component checks getCurrentUser() (see the Stage 4 notes on
      // wiring auth state into the nav).
      navigate('/');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Log in</h1>

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              placeholder="Your password"
            />
          </label>

          {status === 'error' && (
            <p style={styles.error}>{errorMessage}</p>
          )}

          <button type="submit" disabled={status === 'submitting'} style={styles.button}>
            {status === 'submitting' ? 'Logging in…' : 'Log In'}
          </button>
        </form>

        <p style={styles.footerText}>
          Don't have an account? <Link to="/signup" style={styles.inlineLink}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

// Same styling approach as Signup.jsx — kept identical on purpose so
// the two pages feel like one consistent flow.
const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0A0E1A',
    padding: '24px',
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    border: '1px solid rgba(255,255,255,0.15)',
    background: 'transparent',
    borderRadius: '12px',
    padding: '40px 32px',
  },
  heading: {
    fontFamily: '"Space Grotesk", sans-serif',
    color: '#F5F5F5',
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
    color: '#94A3B8',
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
};
