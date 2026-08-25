// src/pages/Dashboard.jsx
//
// Admin-only landing page — "Hey, {name}" greeting plus quick admin
// actions. Requires an active ADMIN session; bounces to /login if
// getCurrentUser() comes back unauthenticated or non-admin, same pattern
// as CreateUser.jsx's admin check.
//
// Reworked 2026-08-15 per explicit feedback: the change-password form
// that used to live here was removed — "that's kinda redundant because
// it's for all users. You can find it for all users in profile in, like,
// settings" (see Profile.jsx's SettingsTab, reached via /profile?tab=
// settings — same change-password form, correctly scoped to every
// member instead of duplicated here admin-only). What's left is the
// smaller "admin quick actions" card (create account / manage accounts,
// both unchanged links) plus a new "Clear out newsletters" section for
// deleting test/unwanted sends from the archive (see the
// NewsletterCleanup component below).

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, getNewsletterArchive, deleteNewsletterSends } from '../lib/api';
import { useConfirm } from '../components/ConfirmDialog';

export default function Dashboard() {
  const navigate = useNavigate();
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        // Admin-only page — a logged-in non-admin gets bounced the same
        // as a logged-out visitor, same as CreateUser.jsx.
        if (data?.user?.is_admin) {
          setUser(data.user);
          setAuthCheck('ok');
        } else {
          setAuthCheck('denied');
        }
      })
      .catch(() => setAuthCheck('denied'));
  }, []);

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
          <p style={styles.body}>You need to be logged in as an admin to view this page.</p>
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
          Admin quick actions.
        </p>

        <div style={styles.actionsRow}>
          <Link to="/create-user" style={{ ...styles.pill, ...styles.pillButton }}>
            Create a new account
          </Link>
          <Link to="/admin/users" style={{ ...styles.pill, ...styles.pillSecondary }}>
            Manage accounts
          </Link>
        </div>

        <NewsletterCleanup />

        {/* The "Looking for account settings? Head to Settings" pointer
            that used to live here was removed 2026-08-16 per explicit
            feedback ("Remove this from dashboard"). */}
        <p style={styles.footerText}>
          <button type="button" onClick={handleLogout} style={styles.linkButton}>
            Log out
          </button>
        </p>
      </div>
    </div>
  );
}

// "Clear out newsletters" — added 2026-08-15 per explicit feedback ("I
// wanna be able to clear out the newsletters because I just wanna
// delete, like, the test. So I just wanna have that as, like, a admin,
// like, dashboard option"). Lists every past send with a checkbox next
// to each (Kev's explicit preference: "I want to be able to select
// send(s) and delete them" — not a single delete-all button, not a
// one-at-a-time-only flow) plus a "Select all" toggle for convenience, a
// count of what's currently selected, and a single "Delete selected"
// button that removes all checked sends in one request.
function NewsletterCleanup() {
  // In-app confirm modal (added 2026-08-16) — replaces window.confirm()
  // below. See components/ConfirmDialog.jsx.
  const confirm = useConfirm();

  const [status, setStatus] = useState('loading'); // loading | ok | error
  const [sends, setSends] = useState([]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(() => new Set());
  const [deleteStatus, setDeleteStatus] = useState('idle'); // idle | deleting | error

  function load() {
    setStatus('loading');
    getNewsletterArchive()
      .then((data) => {
        setSends(data?.sends || []);
        setSelected(new Set());
        setStatus('ok');
      })
      .catch((err) => {
        setError(err.message || 'Could not load past newsletters.');
        setStatus('error');
      });
  }

  useEffect(() => {
    load();
  }, []);

  function toggle(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => (prev.size === sends.length ? new Set() : new Set(sends.map((s) => s.id))));
  }

  async function handleDelete() {
    if (selected.size === 0) return;
    // A destructive, irreversible action (can't un-delete an archive
    // entry) — confirm before sending, same caution as any other
    // permanent-delete control in this app.
    const confirmed = await confirm({
      title: 'Delete newsletters?',
      message: `Delete ${selected.size} newsletter${selected.size === 1 ? '' : 's'} from the archive? This can't be undone.`,
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!confirmed) return;

    setDeleteStatus('deleting');
    try {
      await deleteNewsletterSends(Array.from(selected));
      setDeleteStatus('idle');
      load();
    } catch (err) {
      setDeleteStatus('error');
      setError(err.message || 'Could not delete the selected newsletters.');
    }
  }

  return (
    <div style={styles.section}>
      <h2 style={styles.subheading}>Clear out newsletters</h2>
      <p style={styles.body}>
        Remove past sends from the archive (e.g. test sends). Members won't see deleted entries in the portal's Newsletter tab.
      </p>

      {status === 'loading' && <p style={styles.muted}>Loading…</p>}
      {status === 'error' && <p style={styles.error}>{error}</p>}
      {status === 'ok' && sends.length === 0 && <p style={styles.muted}>No newsletters sent yet.</p>}

      {status === 'ok' && sends.length > 0 && (
        <>
          <label style={styles.selectAllRow}>
            <input
              type="checkbox"
              checked={selected.size === sends.length}
              onChange={toggleAll}
            />
            Select all
          </label>

          <div style={styles.sendsList}>
            {sends.map((send) => (
              <label key={send.id} style={styles.sendRow}>
                <input
                  type="checkbox"
                  checked={selected.has(send.id)}
                  onChange={() => toggle(send.id)}
                />
                <span style={styles.sendSubject}>{send.subject}</span>
                <span style={styles.sendDate}>
                  {new Date(send.sent_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </label>
            ))}
          </div>

          {deleteStatus === 'error' && <p style={styles.error}>{error}</p>}

          <button
            type="button"
            onClick={handleDelete}
            disabled={selected.size === 0 || deleteStatus === 'deleting'}
            style={{
              ...styles.pill,
              ...styles.pillDanger,
              opacity: selected.size === 0 ? 0.5 : 1,
            }}
          >
            {deleteStatus === 'deleting'
              ? 'Deleting…'
              : `Delete selected${selected.size > 0 ? ` (${selected.size})` : ''}`}
          </button>
        </>
      )}
    </div>
  );
}

// Design tokens copied directly from Login.jsx / aee_homepage_mock_3.html's
// :root block, so this page matches the rest of the site.
const colors = {
  navy950: '#182032',
  navy900: '#1F3160',
  navy800: '#1C3F94',
  slate: 'rgba(198,228,255,.70)',
  slateLight: 'rgba(198,228,255,.92)',
  ink: '#182032',
  white: '#FFFFFF',
  line: 'rgba(255,255,255,.16)',
  danger: '#F87171',
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
  // Smaller than before (was sized for a full change-password form) —
  // per explicit feedback to shrink this box now that it's just quick
  // actions. maxWidth trimmed from 440px to 400px.
  card: {
    width: '100%',
    maxWidth: '400px',
    border: `1px solid ${colors.line}`,
    background: 'transparent',
    borderRadius: '16px',
    padding: '32px 28px',
    margin: '80px 0 40px',
  },
  heading: {
    fontFamily: "'League Spartan', 'Libre Franklin', system-ui, sans-serif",
    fontWeight: 700,
    color: colors.white,
    fontSize: '26px',
    letterSpacing: '-.02em',
    marginBottom: '10px',
  },
  subheading: {
    fontFamily: "'League Spartan', 'Libre Franklin', system-ui, sans-serif",
    fontWeight: 600,
    color: colors.white,
    fontSize: '16px',
    marginTop: '8px',
    marginBottom: '10px',
  },
  body: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    color: colors.slateLight,
    fontSize: '14px',
    lineHeight: 1.6,
    marginBottom: '16px',
  },
  muted: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    color: colors.slate,
    fontSize: '13px',
  },
  actionsRow: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  section: {
    marginTop: '28px',
    paddingTop: '24px',
    borderTop: `1px solid ${colors.line}`,
  },
  selectAllRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    color: colors.slate,
    fontSize: '13px',
    marginBottom: '8px',
    cursor: 'pointer',
  },
  sendsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
    marginBottom: '14px',
    maxHeight: '260px',
    overflowY: 'auto',
  },
  sendRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '8px 6px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    fontSize: '13px',
  },
  sendSubject: {
    flex: 1,
    color: colors.white,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  sendDate: {
    color: colors.slate,
    fontSize: '12px',
    flexShrink: 0,
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
    width: '100%',
  },
  pillSecondary: {
    background: 'transparent',
    color: colors.white,
    border: `1px solid ${colors.line}`,
  },
  pillDanger: {
    background: colors.danger,
    color: colors.white,
    width: '100%',
  },
  error: {
    color: colors.danger,
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    fontSize: '13px',
    margin: '0 0 10px',
  },
  footerText: {
    marginTop: '20px',
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    color: colors.slate,
    fontSize: '13px',
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
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    fontSize: '14px',
    cursor: 'pointer',
    padding: 0,
  },
};
