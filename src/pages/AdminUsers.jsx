// src/pages/AdminUsers.jsx
//
// Admin account-management dashboard — added 2026-08-11 per explicit
// feedback ("a way to also change this data... an admin dashboard for
// all the accounts and making sure that's safe and secure"). Admin-only
// (see routes/auth.js's requireAdmin on every /auth/admin/users* route
// this page calls) — lists every account (active AND deactivated,
// unlike the public Members directory which only shows active ones) and
// lets an admin, per row: edit EVERY account field inline (as of
// 2026-08-23 — name, title, team, both emails, LinkedIn, Instagram,
// personal website, and profile picture, i.e. everything the create form
// collects), reset a locked-out member's password, deactivate/reactivate
// the account, toggle org-chart visibility, promote/demote admin status,
// and permanently delete.
//
// Reachable from the portal's Dashboard subpage (see Dashboard.jsx's
// "Manage accounts" link) rather than its own portal tile — this is an
// admin tool nested under the existing Dashboard, not a new top-level
// portal section.
//
// Every mutating action re-fetches the full list afterward rather than
// optimistically patching one row — simpler to reason about correctly
// given how many different fields a row can change (COALESCE-partial
// edits, is_active, is_admin), and this page is a low-traffic admin
// tool, not something needing that kind of snappy optimistic UI.

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  getAllUsers,
  updateUser,
  resetUserPassword,
  deactivateUser,
  reactivateUser,
  promoteUser,
  demoteUser,
  deleteUser,
  adminSetUserPhoto,
} from '../lib/api';
import { fileToSquareDataUrl } from '../lib/imageUpload';
import { useConfirm } from '../components/ConfirmDialog';
import './AdminUsers.css';

// Kept in sync with routes/auth.js's VALID_TITLES/VALID_TEAMS and
// CreateUser.jsx's TITLES/TEAMS. Real title list received from Kev
// 2026-08-11, replacing the earlier 5-item placeholder.
const TITLES = [
  'Founder & Advisor',
  'Advisor',
  'President',
  'Vice President',
  'Executive Coordinator',
  'Executive Project Director',
  'Director of Outreach',
  'Director of Membership',
  'Director of Finance',
  'Policy Consortium Director',
  'Assistant Policy Consortium Director',
  'Director of Brand',
  'HCC PM',
  'CWC PM',
  'MECC PM',
  'STEP PM',
  'TREX PM',
  'Member',
];
// STEP and TREX added 2026-08-12 — see CreateUser.jsx's matching TEAMS
// comment.
const TEAMS = ['CWC', 'MECC', 'HCC', 'STiT', 'STEP', 'TREX'];

function fullName(u) {
  return [u.first_name, u.last_name].filter(Boolean).join(' ') || u.username;
}

export default function AdminUsers() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [me, setMe] = useState(null);

  const [status, setStatus] = useState('loading'); // loading | ok | error
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  const [editingId, setEditingId] = useState(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editTeam, setEditTeam] = useState('');
  // Every remaining create-form field is editable here as of 2026-08-23
  // ("make what we have from dashboard for making accounts to be able to
  // be edited on dashboard for existing accounts for admins").
  const [editEmail, setEditEmail] = useState('');
  const [editUscEmail, setEditUscEmail] = useState('');
  const [editLinkedin, setEditLinkedin] = useState('');
  const [editInstagram, setEditInstagram] = useState('');
  const [editWebsite, setEditWebsite] = useState('');
  const [editPhoto, setEditPhoto] = useState(null); // null = unchanged
  const [editPhotoPreview, setEditPhotoPreview] = useState('');
  const editPhotoInputRef = useRef(null);
  const [rowStatus, setRowStatus] = useState({}); // { [userId]: 'saving' | 'error' }
  const [rowError, setRowError] = useState({}); // { [userId]: message }
  const [resetResult, setResetResult] = useState(null); // { username, generatedPassword }

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (data?.user?.is_admin) {
          setMe(data.user);
          setAuthCheck('ok');
        } else {
          setAuthCheck('denied');
        }
      })
      .catch(() => setAuthCheck('denied'));
  }, []);

  function loadUsers() {
    setStatus('loading');
    getAllUsers()
      .then((data) => {
        setUsers(data?.users || []);
        setStatus('ok');
      })
      .catch((err) => {
        setError(err.message || 'Could not load accounts.');
        setStatus('error');
      });
  }

  useEffect(() => {
    if (authCheck === 'ok') loadUsers();
  }, [authCheck]);

  function startEdit(u) {
    setEditingId(u.id);
    setEditFirstName(u.first_name || '');
    setEditLastName(u.last_name || '');
    setEditTitle(u.title || '');
    setEditTeam(u.team || '');
    setEditEmail(u.email || '');
    setEditUscEmail(u.usc_email || '');
    setEditLinkedin(u.linkedin_url || '');
    setEditInstagram(u.instagram_url || '');
    setEditWebsite(u.website_url || '');
    // null means "photo not touched in this edit" — distinct from '' /
    // an explicit clear, which the save handler turns into a null on the
    // wire so the backend removes it.
    setEditPhoto(null);
    setEditPhotoPreview(u.photo_url || '');
    setResetResult(null);
  }

  function cancelEdit() {
    setEditingId(null);
  }

  async function saveEdit(id) {
    setRowStatus((s) => ({ ...s, [id]: 'saving' }));
    setRowError((s) => ({ ...s, [id]: '' }));
    try {
      // Empty strings are sent deliberately for the optional fields —
      // the backend reads '' as "clear this", which is what makes it
      // possible to remove a stale link rather than only overwrite it.
      await updateUser(id, {
        firstName: editFirstName,
        lastName: editLastName,
        title: editTitle,
        team: editTeam,
        email: editEmail,
        uscEmail: editUscEmail,
        linkedinUrl: editLinkedin,
        instagramUrl: editInstagram,
        websiteUrl: editWebsite,
      });
      // Photo is a separate request because it's a separate endpoint —
      // only sent when this edit actually touched it, so a routine name
      // change doesn't re-upload an image every time.
      if (editPhoto !== null) {
        await adminSetUserPhoto(id, editPhoto === '' ? null : editPhoto);
      }
      setRowStatus((s) => ({ ...s, [id]: undefined }));
      setEditingId(null);
      loadUsers();
    } catch (err) {
      setRowStatus((s) => ({ ...s, [id]: 'error' }));
      setRowError((s) => ({ ...s, [id]: err.message || 'Could not save changes.' }));
    }
  }

  async function handleEditPhotoPick(file) {
    if (!file) return;
    setRowError((s) => ({ ...s, [editingId]: '' }));
    try {
      const dataUrl = await fileToSquareDataUrl(file);
      setEditPhoto(dataUrl);
      setEditPhotoPreview(dataUrl);
    } catch (err) {
      setRowStatus((s) => ({ ...s, [editingId]: 'error' }));
      setRowError((s) => ({ ...s, [editingId]: err.message || 'Could not use that image.' }));
    }
  }

  async function handleResetPassword(u) {
    setRowStatus((s) => ({ ...s, [u.id]: 'saving' }));
    setRowError((s) => ({ ...s, [u.id]: '' }));
    try {
      const data = await resetUserPassword(u.id);
      setResetResult({ username: data.username, generatedPassword: data.generatedPassword });
      setRowStatus((s) => ({ ...s, [u.id]: undefined }));
    } catch (err) {
      setRowStatus((s) => ({ ...s, [u.id]: 'error' }));
      setRowError((s) => ({ ...s, [u.id]: err.message || 'Could not reset password.' }));
    }
  }

  async function handleToggleActive(u) {
    setRowStatus((s) => ({ ...s, [u.id]: 'saving' }));
    setRowError((s) => ({ ...s, [u.id]: '' }));
    try {
      if (u.is_active) {
        await deactivateUser(u.id);
      } else {
        await reactivateUser(u.id);
      }
      // Clear the 'saving' flag on success (same as handleResetPassword
      // above) — without this, the button for this row stayed disabled
      // forever after a successful toggle, since only the catch branch
      // ever reset rowStatus. loadUsers() replaces `users` with fresh
      // data, but rowStatus is separate per-row UI state that isn't
      // touched by that refetch, so it has to be cleared explicitly.
      setRowStatus((s) => ({ ...s, [u.id]: undefined }));
      loadUsers();
    } catch (err) {
      setRowStatus((s) => ({ ...s, [u.id]: 'error' }));
      setRowError((s) => ({ ...s, [u.id]: err.message || 'Could not update account status.' }));
    }
  }

  async function handleToggleAdmin(u) {
    setRowStatus((s) => ({ ...s, [u.id]: 'saving' }));
    setRowError((s) => ({ ...s, [u.id]: '' }));
    try {
      if (u.is_admin) {
        await demoteUser(u.id);
      } else {
        await promoteUser(u.id);
      }
      // See the comment in handleToggleActive above — same fix, same
      // reason: without clearing rowStatus here, this row's action
      // buttons stayed permanently disabled after a successful
      // promote/demote.
      setRowStatus((s) => ({ ...s, [u.id]: undefined }));
      loadUsers();
    } catch (err) {
      setRowStatus((s) => ({ ...s, [u.id]: 'error' }));
      setRowError((s) => ({ ...s, [u.id]: err.message || 'Could not update admin status.' }));
    }
  }

  // Org-chart visibility toggle — added 2026-08-23 ("Remove me from
  // displaying on org chart"). Separate from deactivate: the account
  // stays fully active and still appears in the Members directory, it
  // just isn't drawn into the leadership hierarchy.
  async function handleToggleOrgChart(u) {
    setRowStatus((s) => ({ ...s, [u.id]: 'saving' }));
    setRowError((s) => ({ ...s, [u.id]: '' }));
    try {
      await updateUser(u.id, { hideFromOrgChart: !u.hide_from_org_chart });
      setRowStatus((s) => ({ ...s, [u.id]: undefined }));
      loadUsers();
    } catch (err) {
      setRowStatus((s) => ({ ...s, [u.id]: 'error' }));
      setRowError((s) => ({ ...s, [u.id]: err.message || 'Could not update org chart visibility.' }));
    }
  }

  // PERMANENT delete — added 2026-08-16 ("I need to be able to purge
  // members... someone graduates and then it's just clutter"). Separate
  // from Deactivate above and deliberately harder to trigger: this one
  // makes you type the person's full name first (see ConfirmDialog's
  // confirmPhrase option), because unlike every other action on this
  // page there is no undo.
  async function handleDelete(u) {
    const fullName = `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username;
    const confirmed = await confirm({
      title: 'Permanently delete this account?',
      message:
        `This removes ${fullName}'s account, every task assigned to them, and any calendar ` +
        `events they created. Tasks they assigned to other people stay put. This cannot be undone — ` +
        `use Deactivate instead if you might want them back.`,
      confirmLabel: 'Delete forever',
      danger: true,
      confirmPhrase: fullName,
    });
    if (!confirmed) return;

    setRowStatus((s) => ({ ...s, [u.id]: 'saving' }));
    setRowError((s) => ({ ...s, [u.id]: '' }));
    try {
      await deleteUser(u.id);
      setRowStatus((s) => ({ ...s, [u.id]: undefined }));
      loadUsers();
    } catch (err) {
      setRowStatus((s) => ({ ...s, [u.id]: 'error' }));
      setRowError((s) => ({ ...s, [u.id]: err.message || 'Could not delete account.' }));
    }
  }

  if (authCheck === 'checking') {
    return <div className="admin-users-page" />;
  }

  if (authCheck === 'denied') {
    return (
      <div className="admin-users-page admin-users-denied">
        <div className="admin-users-denied-card">
          <h1>Admin access required</h1>
          <p>You need to be logged in as an admin to manage accounts.</p>
          <Link to="/login" className="admin-users-pill">Go to Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users-page">
      <header className="admin-users-header">
        <Link to="/" className="admin-users-logo">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AEE logo" />
          <span>AEE at USC</span>
        </Link>
        <Link to="/portal" className="admin-users-back-link">← Back to Member Portal</Link>
        <div className="admin-users-header-spacer" />
      </header>

      <div className="admin-users-body">
        <h1 className="admin-users-title">Manage Accounts</h1>
        <p className="admin-users-sub">
          Edit any of a member's details — name, title, team, emails, social links, personal
          website, or profile picture; reset a locked-out password; deactivate or reactivate
          an account; show or hide them on the org chart; or change admin access.
        </p>

        {resetResult && (
          <div className="admin-users-reset-banner">
            <div>
              Password reset for <strong>{resetResult.username}</strong> — give this to them now,
              it won't be shown again:
              <div className="admin-users-reset-password">{resetResult.generatedPassword}</div>
            </div>
            <button type="button" className="admin-users-dismiss" onClick={() => setResetResult(null)}>
              Dismiss
            </button>
          </div>
        )}

        {status === 'loading' && <p className="admin-users-muted">Loading…</p>}
        {status === 'error' && <p className="admin-users-error">{error}</p>}

        {status === 'ok' && (
          <div className="admin-users-list">
            {users.map((u) => {
              const isEditing = editingId === u.id;
              const isSelf = me?.id === u.id;
              const saving = rowStatus[u.id] === 'saving';
              return (
                <div
                  key={u.id}
                  className={`admin-users-row${u.is_active ? '' : ' inactive'}`}
                >
                  {isEditing ? (
                    <div className="admin-users-edit-form">
                      {/* Profile picture — added 2026-08-23. Preview
                          plus change/remove, mirroring the create form. */}
                      <div className="admin-users-photo-row">
                        <div className="admin-users-photo-preview">
                          {editPhotoPreview
                            ? <img src={editPhotoPreview} alt="" />
                            : <span>No photo</span>}
                        </div>
                        <div className="admin-users-photo-actions">
                          <input
                            ref={editPhotoInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => { handleEditPhotoPick(e.target.files?.[0]); e.target.value = ''; }}
                          />
                          <button
                            type="button"
                            className="admin-users-action"
                            onClick={() => editPhotoInputRef.current?.click()}
                          >
                            {editPhotoPreview ? 'Change photo' : 'Add photo'}
                          </button>
                          {editPhotoPreview && (
                            <button
                              type="button"
                              className="admin-users-action"
                              onClick={() => { setEditPhoto(''); setEditPhotoPreview(''); }}
                            >
                              Remove photo
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="admin-users-edit-grid">
                        <input
                          type="text"
                          value={editFirstName}
                          onChange={(e) => setEditFirstName(e.target.value)}
                          className="admin-users-input"
                          placeholder="First name"
                        />
                        <input
                          type="text"
                          value={editLastName}
                          onChange={(e) => setEditLastName(e.target.value)}
                          className="admin-users-input"
                          placeholder="Last name"
                        />
                        <select
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="admin-users-input"
                        >
                          <option value="" disabled>Title…</option>
                          {TITLES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <select
                          value={editTeam}
                          onChange={(e) => setEditTeam(e.target.value)}
                          className="admin-users-input"
                        >
                          <option value="">No team</option>
                          {TEAMS.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                        <input
                          type="email"
                          value={editUscEmail}
                          onChange={(e) => setEditUscEmail(e.target.value)}
                          className="admin-users-input"
                          placeholder="USC email (required)"
                        />
                        <input
                          type="email"
                          value={editEmail}
                          onChange={(e) => setEditEmail(e.target.value)}
                          className="admin-users-input"
                          placeholder="Gmail (optional)"
                        />
                        <input
                          type="url"
                          value={editLinkedin}
                          onChange={(e) => setEditLinkedin(e.target.value)}
                          className="admin-users-input"
                          placeholder="LinkedIn (optional)"
                        />
                        <input
                          type="url"
                          value={editInstagram}
                          onChange={(e) => setEditInstagram(e.target.value)}
                          className="admin-users-input"
                          placeholder="Instagram (optional)"
                        />
                        <input
                          type="url"
                          value={editWebsite}
                          onChange={(e) => setEditWebsite(e.target.value)}
                          className="admin-users-input"
                          placeholder="Personal website (optional)"
                        />
                      </div>
                      {rowStatus[u.id] === 'error' && <p className="admin-users-row-error">{rowError[u.id]}</p>}
                      <div className="admin-users-edit-actions">
                        <button type="button" className="admin-users-pill-sm" onClick={() => saveEdit(u.id)} disabled={saving}>
                          {saving ? 'Saving…' : 'Save'}
                        </button>
                        <button type="button" className="admin-users-cancel-sm" onClick={cancelEdit} disabled={saving}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="admin-users-row-main">
                        <div className="admin-users-row-name">
                          {fullName(u)}
                          {u.is_admin && <span className="admin-users-badge admin">Admin</span>}
                          {!u.is_active && <span className="admin-users-badge inactive">Deactivated</span>}
                        </div>
                        <div className="admin-users-row-meta">
                          {u.username}
                          {u.title ? ` · ${u.title}` : ''}
                          {u.team ? ` · ${u.team}` : ''}
                        </div>
                        {rowStatus[u.id] === 'error' && <p className="admin-users-row-error">{rowError[u.id]}</p>}
                      </div>
                      <div className="admin-users-row-actions">
                        <button type="button" className="admin-users-action" onClick={() => startEdit(u)}>
                          Edit
                        </button>
                        <button
                          type="button"
                          className="admin-users-action"
                          onClick={() => handleResetPassword(u)}
                          disabled={saving}
                        >
                          Reset password
                        </button>
                        <button
                          type="button"
                          className="admin-users-action"
                          onClick={() => handleToggleActive(u)}
                          disabled={saving || isSelf}
                          title={isSelf ? "You can't deactivate your own account" : undefined}
                        >
                          {u.is_active ? 'Deactivate' : 'Reactivate'}
                        </button>
                        <button
                          type="button"
                          className="admin-users-action"
                          onClick={() => handleToggleAdmin(u)}
                          disabled={saving || (isSelf && u.is_admin)}
                          title={isSelf && u.is_admin ? "You can't remove your own admin access" : undefined}
                        >
                          {u.is_admin ? 'Remove admin' : 'Make admin'}
                        </button>
                        <button
                          type="button"
                          className="admin-users-action"
                          onClick={() => handleToggleOrgChart(u)}
                          disabled={saving}
                          title={u.hide_from_org_chart
                            ? 'Currently hidden from the org chart'
                            : 'Currently shown on the org chart'}
                        >
                          {u.hide_from_org_chart ? 'Show on chart' : 'Hide from chart'}
                        </button>
                        <button
                          type="button"
                          className="admin-users-action admin-users-action-danger"
                          onClick={() => handleDelete(u)}
                          disabled={saving || isSelf}
                          title={isSelf ? "You can't delete your own account" : 'Permanently delete this account'}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
