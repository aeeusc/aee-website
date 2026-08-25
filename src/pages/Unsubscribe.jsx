// src/pages/Unsubscribe.jsx
//
// Where the "Unsubscribe" link at the bottom of every newsletter email
// lands. Added 2026-08-16 per explicit feedback: the old flow pointed
// straight at the backend (GET https://aee-backend.onrender.com/newsletter/
// unsubscribe?token=...), which both advertised the Render host in every
// newsletter footer and dumped the reader on a bare unstyled page
// reading "You've been unsubscribed. Sorry to see you go!" in the
// browser's default font on a white background.
//
// Now the email links here instead — the site's own domain — and this
// page does the actual unsubscribe by calling the API in the background,
// then renders a real page in the site's design. Styled to match
// NotFound.jsx (same tokens, same centered card, same "back to home"
// treatment), which is exactly the reference Kev gave: "it should be
// like the same thing that we have for like a 404... and then it should
// be maybe like a back to home and then it brings you back to the main
// page."
//
// The unsubscribe itself is a POST, not the old GET — see
// routes/newsletter.js for why (mail clients and corporate link scanners
// prefetch GET links in emails, which was silently unsubscribing people
// who never clicked).

import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { unsubscribeFromNewsletter } from '../lib/api';

export default function Unsubscribe() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  // Starts at 'confirm', NOT at 'working' — this page deliberately does
  // NOT unsubscribe on load. Moving the destructive step off GET (see
  // routes/newsletter.js) was specifically to stop mail-client and
  // corporate link scanners from silently unsubscribing people who never
  // clicked. Several enterprise mail-security products go further than a
  // plain GET and actually RENDER the linked page in a headless browser —
  // which would run an unsubscribe-on-mount effect and put us right back
  // where we started. Requiring a real click is what actually closes
  // that hole, and it's what Mailchimp and most large senders do for the
  // same reason.
  const [status, setStatus] = useState(token ? 'confirm' : 'missing'); // confirm | working | done | missing | error
  const [errorMessage, setErrorMessage] = useState('');

  function handleUnsubscribe() {
    setStatus('working');
    unsubscribeFromNewsletter(token)
      .then(() => setStatus('done'))
      .catch((err) => {
        setStatus('error');
        setErrorMessage(err.message);
      });
  }

  return (
    <div style={styles.page}>
      <Link to="/" style={styles.backLink}>← Back to home</Link>

      <div style={styles.card}>
        {status === 'confirm' && (
          <>
            <h1 style={styles.heading}>Unsubscribe?</h1>
            <p style={styles.body}>
              You'll stop receiving emails from the AEE at USC newsletter.
            </p>
            <button type="button" onClick={handleUnsubscribe} style={styles.pill}>
              Yes, unsubscribe me
            </button>
          </>
        )}

        {status === 'working' && (
          <>
            <h1 style={styles.heading}>Unsubscribing…</h1>
            <p style={styles.body}>One moment.</p>
          </>
        )}

        {status === 'done' && (
          <>
            <h1 style={styles.heading}>Sorry to see you go</h1>
            <p style={styles.body}>
              You've been unsubscribed and won't receive any more emails
              from the AEE at USC newsletter. If this was a mistake, you
              can sign up again from the bottom of our homepage anytime.
            </p>
            <Link to="/" style={styles.pill}>Back to homepage</Link>
          </>
        )}

        {status === 'missing' && (
          <>
            <h1 style={styles.heading}>Something's missing</h1>
            <p style={styles.body}>
              This unsubscribe link looks incomplete. Try clicking the
              link in your email again, or reach out and we'll take care
              of it for you.
            </p>
            <Link to="/" style={styles.pill}>Back to homepage</Link>
          </>
        )}

        {status === 'error' && (
          <>
            <h1 style={styles.heading}>Something went wrong</h1>
            <p style={styles.body}>
              {errorMessage || "We couldn't process that unsubscribe link."}{' '}
              Try again in a moment, or reach out and we'll remove you
              manually.
            </p>
            <Link to="/" style={styles.pill}>Back to homepage</Link>
          </>
        )}
      </div>
    </div>
  );
}

// Design tokens copied from NotFound.jsx so this page matches it exactly —
// same convention the other standalone full-page views in this folder
// use (they each carry their own copy rather than importing a shared
// styles module).
const colors = {
  navy950: '#182032',
  slate: 'rgba(198,228,255,.70)',
  slateLight: 'rgba(198,228,255,.92)',
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
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    border: `1px solid ${colors.line}`,
    background: 'transparent',
    borderRadius: '16px',
    padding: '40px 32px',
    textAlign: 'center',
  },
  heading: {
    fontFamily: "'League Spartan', 'Libre Franklin', system-ui, sans-serif",
    fontWeight: 700,
    color: colors.white,
    fontSize: '28px',
    letterSpacing: '-.02em',
    marginBottom: '16px',
  },
  body: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    color: colors.slateLight,
    fontSize: '15px',
    lineHeight: 1.6,
    marginBottom: '24px',
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
};
