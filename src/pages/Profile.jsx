// src/pages/Profile.jsx
//
// Reached by clicking the small profile icon in the nav (see Nav in
// Home.jsx — the person's first name next to it goes to /portal
// instead, a separate page). Shows a placeholder profile photo, the
// logged-in user's name, and a description field.
//
// There's no real photo upload or bio-editing backend yet — Kev is
// designing the actual layout separately and will follow up, so this is
// intentionally a minimal placeholder page (silhouette avatar, name from
// the existing /auth/me data, a static "no bio yet" description) rather
// than a guess at fields/copy that would likely just get replaced.
// Requires an active session, same pattern as Dashboard.jsx/Portal.jsx.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../lib/api';
import { PlaceholderAvatar } from './Home';
import './Portal.css';

export default function Profile() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);

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

  if (authCheck === 'checking') {
    return <div className="portal-page" />;
  }

  if (authCheck === 'denied') {
    return (
      <div className="portal-page portal-denied">
        <div className="portal-denied-card">
          <h1>Please log in</h1>
          <p>You need to be logged in to view your profile.</p>
          <Link to="/login" className="portal-pill">Go to Log In</Link>
        </div>
      </div>
    );
  }

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.username || 'Member';

  return (
    <div className="portal-page portal-denied">
      <div className="portal-denied-card" style={{ maxWidth: 440 }}>
        <Link to="/portal" style={{ display: 'block', marginBottom: 24, color: 'var(--slate)', fontSize: 13, textDecoration: 'none' }}>
          ← Back to Member Portal
        </Link>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
          <PlaceholderAvatar size={96} />
        </div>
        <h1>{fullName}</h1>
        {user?.username && <p className="portal-muted" style={{ marginBottom: 4 }}>@{user.username}</p>}
        <p style={{ marginTop: 16, color: 'var(--slate-light)', fontSize: 14, lineHeight: 1.6 }}>
          No description yet.
        </p>
        <Link to="/portal" className="portal-pill" style={{ marginTop: 24 }}>
          Go to Member Portal
        </Link>
      </div>
    </div>
  );
}
