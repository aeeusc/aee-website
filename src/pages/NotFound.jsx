// src/pages/NotFound.jsx
//
// A real 404 page for any path that doesn't match a route — including
// /signup, which used to be a real page but was intentionally removed
// (see CreateUser.jsx/Dashboard.jsx — public self-signup no longer
// exists). Before this page existed, an unmatched path just rendered
// nothing (React Router silently shows a blank page when no route
// matches and there's no catch-all), which isn't a real 404 either —
// it just looks broken. Wired up in App.jsx as <Route path="*" ...>.
//
// Styled to match Login.jsx/Dashboard.jsx (same tokens/pill button).

import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={styles.page}>
      <Link to="/" style={styles.backLink}>← Back to home</Link>

      <div style={styles.card}>
        <h1 style={styles.heading}>Page not found</h1>
        <p style={styles.body}>
          The page you're looking for doesn't exist or has moved.
        </p>
        <Link to="/" style={styles.pill}>Go to homepage</Link>
      </div>
    </div>
  );
}

const colors = {
  navy950: '#0A0E1A',
  slate: '#94A3B8',
  slateLight: '#C9D4E4',
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
    textAlign: 'center',
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
};