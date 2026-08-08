// src/pages/NewsletterAdmin.jsx
//
// A simple, unlisted admin page for composing and sending a newsletter
// update to every subscriber. Reachable only by knowing the URL
// (/newsletter-admin) — it's not linked anywhere in the nav or footer,
// since it's a tool for whoever's running the newsletter, not a page
// for visitors. It's also blocked from search indexing — see
// public/robots.txt and the noindex meta tag this page sets.
//
// As of 2026-08-08, gated by session-based admin login (same
// requireAdmin check as routes/auth.js and routes/portal.js) instead of
// a separate shared password — you need to already be logged in as an
// admin (via /login) for this to work. See routes/newsletter.js's /send
// and /subscribers endpoints.
//
// Styled to match Login.jsx/Signup.jsx (same design tokens, same
// card/pill treatment) so it still feels like part of the same site
// rather than a bolted-on tool.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendNewsletter, getSubscribers, getCurrentUser } from '../lib/api';

export default function NewsletterAdmin() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sendStatus, setSendStatus] = useState('idle'); // idle | submitting | success | error
  const [sendFeedback, setSendFeedback] = useState('');

  const [subscriberCount, setSubscriberCount] = useState(null);
  const [countStatus, setCountStatus] = useState('idle'); // idle | loading | error

  useEffect(() => {
    getCurrentUser()
      .then((data) => setAuthCheck(data?.user?.is_admin ? 'ok' : 'denied'))
      .catch(() => setAuthCheck('denied'));
  }, []);

  async function handleSend(e) {
    e.preventDefault();
    setSendStatus('submitting');
    setSendFeedback('');
    try {
      const data = await sendNewsletter(subject, message);
      setSendStatus('success');
      setSendFeedback(data?.message || 'Sent.');
      setSubject('');
      setMessage('');
    } catch (err) {
      setSendStatus('error');
      setSendFeedback(err.message || 'Something went wrong. Please try again.');
    }
  }

  async function handleCheckSubscribers() {
    setCountStatus('loading');
    try {
      const data = await getSubscribers();
      setSubscriberCount(data?.count ?? 0);
      setCountStatus('idle');
    } catch (err) {
      setCountStatus('error');
      setSendFeedback(err.message || 'Could not check subscriber count.');
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
          <h1 style={styles.heading}>Admin access required</h1>
          <p style={styles.body}>
            You need to be logged in as an admin to send the newsletter.
          </p>
          <Link to="/login" style={{ ...styles.pill, ...styles.pillButton, textAlign: 'center' }}>
            Go to Log In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <Link to="/portal" style={styles.backLink}>← Back to Member Portal</Link>

      <div style={styles.card}>
        <h1 style={styles.heading}>Send Newsletter</h1>
        <p style={styles.body}>
          Compose an update and send it to everyone on the subscriber list.
        </p>

        <form onSubmit={handleSend} style={styles.form}>
          <div style={styles.subscriberRow}>
            <button
              type="button"
              onClick={handleCheckSubscribers}
              disabled={countStatus === 'loading'}
              style={styles.linkButton}
            >
              {countStatus === 'loading' ? 'Checking…' : 'Check subscriber count'}
            </button>
            {subscriberCount !== null && (
              <span style={styles.subscriberCount}>
                {subscriberCount} subscriber{subscriberCount === 1 ? '' : 's'}
              </span>
            )}
          </div>

          <label style={styles.label}>
            Subject
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              style={styles.input}
              placeholder="e.g. This week at AEE"
            />
          </label>

          <label style={styles.label}>
            Message
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={styles.textarea}
              placeholder="Write your update here. Plain text — line breaks become paragraphs."
              rows={10}
            />
          </label>

          {sendStatus === 'error' && (
            <p style={styles.error}>{sendFeedback}</p>
          )}
          {sendStatus === 'success' && (
            <p style={styles.success}>{sendFeedback}</p>
          )}

          <button
            type="submit"
            disabled={sendStatus === 'submitting'}
            style={{ ...styles.pill, ...styles.pillButton }}
          >
            {sendStatus === 'submitting' ? 'Sending…' : 'Send to all subscribers'}
          </button>
        </form>
      </div>
    </div>
  );
}

// Design tokens copied directly from Login.jsx/Signup.jsx so this page
// matches the rest of the site instead of looking like a separate tool.
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
    maxWidth: '540px',
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
  textarea: {
    background: 'rgba(255,255,255,.05)',
    border: `1px solid ${colors.line}`,
    borderRadius: '10px',
    padding: '12px 16px',
    color: colors.white,
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical',
    lineHeight: 1.5,
  },
  subscriberRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginTop: '-6px',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    color: colors.white,
    textDecoration: 'underline',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '13px',
    cursor: 'pointer',
    padding: 0,
  },
  subscriberCount: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '13px',
    color: colors.slate,
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
};
