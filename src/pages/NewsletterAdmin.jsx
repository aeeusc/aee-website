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
import { sendNewsletter, sendTestNewsletterText, getSubscribers, getCurrentUser } from '../lib/api';

export default function NewsletterAdmin() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sendStatus, setSendStatus] = useState('idle'); // idle | submitting | success | error
  const [sendFeedback, setSendFeedback] = useState('');
  // Test send. Kept in its own status so a failed test never looks like a
  // failed real send, and vice versa.
  const [testEmail, setTestEmail] = useState('');
  const [testStatus, setTestStatus] = useState('idle'); // idle | sending | sent | error
  const [testFeedback, setTestFeedback] = useState('');

  const [subscriberCount, setSubscriberCount] = useState(null);
  const [countStatus, setCountStatus] = useState('idle'); // idle | loading | error

  useEffect(() => {
    getCurrentUser()
      .then((data) => setAuthCheck(data?.user?.is_admin ? 'ok' : 'denied'))
      .catch(() => setAuthCheck('denied'));
  }, []);

  async function handleTestSend() {
    if (!subject.trim() || !message.trim()) {
      setTestStatus('error');
      setTestFeedback('Add a subject and a message first.');
      return;
    }
    if (!testEmail.trim()) {
      setTestStatus('error');
      setTestFeedback('Enter an address to send the test to.');
      return;
    }
    setTestStatus('sending');
    setTestFeedback('');
    try {
      const data = await sendTestNewsletterText(subject, message, testEmail.trim());
      setTestStatus('sent');
      setTestFeedback(data?.message || `Test sent to ${testEmail.trim()}.`);
    } catch (err) {
      setTestStatus('error');
      setTestFeedback(err.message || 'Could not send that test.');
    }
  }

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
              placeholder="Write your update here. Plain text. Line breaks become paragraphs."
              rows={10}
            />
          </label>

          {/* Send yourself a copy first. This page can mail every
              subscriber in two clicks and, until 2026-08-25, had no way
              to check the result beforehand. The test goes through the
              same plain-text path as the real send, so what lands in the
              inbox is what everyone else would have got. */}
          <div style={styles.testRow}>
            <label htmlFor="qnb-test-email" style={styles.testLabel}>Send a test to</label>
            <input
              id="qnb-test-email"
              type="email"
              value={testEmail}
              onChange={(e) => { setTestEmail(e.target.value); setTestStatus('idle'); }}
              style={{ ...styles.input, ...styles.testInput }}
              placeholder="you@usc.edu"
            />
            <button
              type="button"
              onClick={handleTestSend}
              disabled={testStatus === 'sending'}
              style={{ ...styles.pill, ...styles.testButton }}
            >
              {testStatus === 'sending' ? 'Sending…' : 'Send test'}
            </button>
          </div>
          <p style={styles.testHint}>
            Goes to that address only, subject-lined [TEST], and is not posted to the members portal.
          </p>
          {testStatus === 'error' && <p style={styles.error}>{testFeedback}</p>}
          {testStatus === 'sent' && <p style={styles.success}>{testFeedback}</p>}

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
  navy950: '#182032',
  navy900: '#1F3160',
  navy800: '#1C3F94',
  slate: 'rgba(198,228,255,.70)',
  slateLight: 'rgba(198,228,255,.92)',
  ink: '#182032',
  white: '#FFFFFF',
  line: 'rgba(255,255,255,.16)',
};

const styles = {
  // The test row sits above the send button, because the sensible order
  // is "check it yourself, then send it to everyone".
  testRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
    marginTop: '4px',
  },
  testLabel: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    fontSize: '14px',
    color: 'rgba(198,228,255,.92)',
    whiteSpace: 'nowrap',
  },
  // Fixed basis rather than width:100%, which would claim the whole row
  // and push the label and button onto lines of their own.
  testInput: { flex: '0 0 240px', marginTop: 0 },
  testButton: {
    background: 'transparent',
    color: '#FFFFFF',
    border: '1px solid rgba(255,255,255,.38)',
    cursor: 'pointer',
    padding: '11px 20px',
    fontSize: '14px',
  },
  testHint: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    fontSize: '12.5px',
    lineHeight: 1.5,
    color: 'rgba(198,228,255,.70)',
    margin: '2px 0 0',
  },
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
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
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
    fontFamily: "'League Spartan', 'Libre Franklin', system-ui, sans-serif",
    fontWeight: 700,
    color: colors.white,
    fontSize: '28px',
    letterSpacing: '-.02em',
    marginBottom: '10px',
  },
  body: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
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
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    color: colors.slate,
    fontSize: '14px',
  },
  input: {
    background: 'rgba(255,255,255,.05)',
    border: `1px solid ${colors.line}`,
    borderRadius: '10px',
    padding: '12px 16px',
    color: colors.white,
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    fontSize: '15px',
    outline: 'none',
  },
  textarea: {
    background: 'rgba(255,255,255,.05)',
    border: `1px solid ${colors.line}`,
    borderRadius: '10px',
    padding: '12px 16px',
    color: colors.white,
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
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
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    fontSize: '13px',
    cursor: 'pointer',
    padding: 0,
  },
  subscriberCount: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
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
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
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
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    fontSize: '14px',
    margin: 0,
  },
  success: {
    color: '#5E8DFF',
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    fontSize: '14px',
    margin: 0,
  },
};
