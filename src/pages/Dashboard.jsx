// src/pages/Dashboard.jsx
//
// A logged-in-only account settings page — "how do I change my
// password" for any member, admin or not. Requires an active session;
// bounces to /login if getCurrentUser() comes back unauthenticated,
// same pattern as CreateUser.jsx's admin check.
//
// Kept intentionally simple for now (just change-password) since that
// was the explicit scope — a natural place to add more account
// settings (like a second sign-in method) later without restructuring.

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { changePassword, getCurrentUser, logout } from '../lib/api';

export default function Dashboard() {
  const navigate = useNavigate();
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
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
    setFeedback('');

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setFeedback('New password and confirmation do not match.');
      return;
    }

    try {
      const data = await changePassword(currentPassword, newPassword);
      setStatus('success');
      setFeedback(data?.message || 'Password updated.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Something went wrong. Please try again.');
    }
  }

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate('/');
    }
  }

  if (authCheck === 'checking') {
    return <div style={styles.page} />;
  }

  if (authCheck === 'denied') {
    return (
      <div style={styles.page}>
        <Link to="/portal" style={styles.backLink}>← Back to Member Portal</Link>
        <div style={styles.card}>
          <h1 style={styles.heading}>Please log in</h1>
          <p style={styles.body}>You need to be logged in to view your dashboard.</p>
          <Link to="/login" style={styles.pill}>Go to Log In</Link>
        </div>
      </div>
    );
  }

  const displayName = user?.first_name || user?.username || user?.email || 'there';

  return (
    <div style={styles.page}>
      <Link to="/portal" style={styles.backLink}>← Back to Member Portal</Link>

      <div style={styles.card}>
        <h1 style={styles.heading}>Hey, {displayName}</h1>
        <p style={styles.body}>
          {user?.username && <>Username: <strong>{user.username}</strong><br /></>}
          Manage your account security below.
        </p>

        <h2 style={styles.subheading}>Change password</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>
            Current password
            <input
              type="password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              style={styles.input}
            />
          </label>

          <label style={styles.label}>
            New password
            <input
              type="password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={styles.input}
              placeholder="At least 8 characters"
            />
          </label>

          <label style={styles.label}>
            Confirm new password
            <input
              type="password"
              required
              minLength={8}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              style={styles.input}
            />
          </label>

          {status === 'error' && <p style={styles.error}>{feedback}</p>}
          {status === 'success' && <p style={styles.success}>{feedback}</p>}

          <button
            type="submit"
            disabled={status === 'submitting'}
            style={{ ...styles.pill, ...styles.pillButton }}
          >
            {status === 'submitting' ? 'Updating…' : 'Update Password'}
          </button>
        </form>

        {user?.is_admin && (
          <p style={styles.footerText}>
            <Link to="/create-user" style={styles.inlineLink}>Create a new account</Link>
          </p>
        )}

        <p style={styles.footerText}>
          <button type="button" onClick={handleLogout} style={styles.linkButton}>
            Log out
          </button>
        </p>
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
    maxWidth: '440px',
    border: `1px solid ${colors.line}`,
    background: 'transparent',
    borderRadius: '16px',
    padding: '40px 32px',
    margin: '80px 0 40px',
  },
  heading: {
    fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    fontWeight: 700,
    color: colors.white,
    fontSize: '28px',
    letterSpacing: '-.02em',
    marginBottom: '10px',
  },
  subheading: {
    fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    fontWeight: 600,
    color: colors.white,
    fontSize: '18px',
    marginTop: '8px',
    marginBottom: '16px',
  },
  body: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slateLight,
    fontSize: '15px',
    lineHeight: 1.6,
    marginBottom: '20px',
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
  success: {
    color: '#4ADE80',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '14px',
    margin: 0,
  },
  footerText: {
    marginTop: '20px',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slate,
    fontSize: '14px',
    textAlign: 'center',
  },
  inlineLink: {
    color: colors.white,
    textDecoration: 'underline',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: colors.slate,
    textDecoration: 'underline',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '14px',
    cursor: 'pointer',
    padding: 0,
  },
};