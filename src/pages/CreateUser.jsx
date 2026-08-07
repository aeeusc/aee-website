// src/pages/CreateUser.jsx
//
// Replaces the old public Signup.jsx. Public self-signup is gone —
// accounts are now created by an admin, who enters a first and last
// name (no password to think up) and gets back a generated username +
// password to relay to the new member directly.
//
// Requires an admin session — the backend's POST /auth/admin/create-user
// checks req.session server-side and returns 401/403 if you're not
// logged in as an admin, so this page also checks getCurrentUser() on
// load and bounces non-admins to /login rather than showing a form
// that would just fail on submit.
//
// Styled to match Login.jsx (same design tokens/pill button), since
// this replaces Signup.jsx in the same visual slot.

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUser, getCurrentUser } from '../lib/api';

export default function CreateUser() {
  const navigate = useNavigate();
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');
  const [result, setResult] = useState(null); // { username, generatedPassword }

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (data?.user?.is_admin) {
          setAuthCheck('ok');
        } else {
          setAuthCheck('denied');
        }
      })
      .catch(() => setAuthCheck('denied'));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const data = await createUser(firstName, lastName, email);
      setStatus('success');
      setResult({ username: data.username, generatedPassword: data.generatedPassword });
      setFirstName('');
      setLastName('');
      setEmail('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  }

  if (authCheck === 'checking') {
    return <div style={styles.page} />;
  }

  if (authCheck === 'denied') {
    return (
      <div style={styles.page}>
        <Link to="/" style={styles.backLink}>← Back to home</Link>
        <div style={styles.card}>
          <h1 style={styles.heading}>Admin access required</h1>
          <p style={styles.body}>
            You need to be logged in as an admin to create accounts.
          </p>
          <Link to="/login" style={styles.pill}>Go to Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Link to="/" style={styles.backLink}>← Back to home</Link>

      <div style={styles.card}>
        {status === 'success' && result ? (
          <>
            <h1 style={styles.heading}>Account created</h1>
            <p style={styles.body}>
              Give these to the new member — this password is shown only
              once and isn't stored anywhere in readable form, so save it
              now if you need to relay it later.
            </p>

            <div style={styles.credBox}>
              <div style={styles.credRow}>
                <span style={styles.credLabel}>Username</span>
                <span style={styles.credValue}>{result.username}</span>
              </div>
              <div style={styles.credRow}>
                <span style={styles.credLabel}>Password</span>
                <span style={styles.credValue}>{result.generatedPassword}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => { setStatus('idle'); setResult(null); }}
              style={{ ...styles.pill, ...styles.pillButton }}
            >
              Create another account
            </button>
          </>
        ) : (
          <>
            <h1 style={styles.heading}>Create an account</h1>
            <p style={styles.body}>
              Enter the new member's name. A username and password will be
              generated automatically.
            </p>

            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>
                First name
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  style={styles.input}
                  placeholder="Jane"
                />
              </label>

              <label style={styles.label}>
                Last name
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  style={styles.input}
                  placeholder="Doe"
                />
              </label>

              <label style={styles.label}>
                Email (optional)
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={styles.input}
                  placeholder="jane@example.com"
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
                {status === 'submitting' ? 'Creating…' : 'Create Account'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// Design tokens copied directly from Login.jsx / aee_homepage_mock_3.html's
// :root block, so this page matches the rest of the site.
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
    marginBottom: '16px',
  },
  body: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slateLight,
    fontSize: '15px',
    lineHeight: 1.6,
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
  credBox: {
    background: 'rgba(255,255,255,.05)',
    border: `1px solid ${colors.line}`,
    borderRadius: '10px',
    padding: '16px',
    marginBottom: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  credRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    gap: '12px',
  },
  credLabel: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slate,
    fontSize: '13px',
  },
  credValue: {
    fontFamily: "'Space Grotesk', 'Inter', monospace",
    color: colors.white,
    fontSize: '16px',
    fontWeight: 600,
    wordBreak: 'break-all',
  },
};