// src/pages/Portal.jsx
//
// The Member Portal — reached by clicking your first name in the nav
// once logged in (see Nav in Home.jsx; the profile icon next to it goes
// to /profile instead, a separate page). Requires an active session;
// bounces to /login otherwise, same pattern as Dashboard.jsx/CreateUser.jsx.
//
// Layout follows the wireframe directly: a logo header (links back to
// the homepage), a left rail (~1/3 width) listing every section as
// plain links, and a right side (~2/3 width) split into a top row of
// big icon+label tiles mirroring the rail, and a bottom row split into
// two quarters — Calendar (events) on the left, Tasks on the right.
// Clicking a rail link OR its matching tile switches which section's
// content renders below that layout (see `section` state) — Calendar
// and Tasks stay visible in their quadrants regardless of which section
// is selected, since they're part of the persistent layout, not a tab.
//
// Members and Org Chart are explicit placeholders for now (no backend
// yet) — everything else here (Settings, Dashboard, Newsletter view,
// Newsletter send, Calendar, Tasks) is real and backed by routes/
// portal.js + routes/newsletter.js's archive addition, kept
// intentionally bare-minimum rather than fully built out, per an
// explicit scope decision.

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  logout,
  changePassword,
  getNewsletterArchive,
  sendNewsletter,
  getSubscribers,
  getEvents,
  createEvent,
  deleteEvent,
  getMyTasks,
  createTask,
  setTaskDone,
  getAssignableMembers,
} from '../lib/api';
import { Footer } from './Home';
import './Portal.css';

// Icon components (not emoji strings) — real inline SVGs per explicit
// feedback 2026-08-08 ("I want actual icons, no emojis for all these
// boxes"). Same stroke-based style as the icons already used elsewhere
// in the portal (Profile.jsx's EditIcon/CameraIcon) — 1.8px strokes, no
// fill, currentColor so they inherit the tile's text color state
// (default/hover/active) for free.
const SECTIONS = [
  { key: 'members', label: 'Members', Icon: MembersIcon, adminOnly: false },
  { key: 'orgchart', label: 'Org Chart', Icon: OrgChartIcon, adminOnly: false },
  { key: 'newsletter', label: 'Newsletter', Icon: NewsletterIcon, adminOnly: false },
  { key: 'settings', label: 'Settings', Icon: SettingsIcon, adminOnly: false },
  { key: 'dashboard', label: 'Dashboard', Icon: DashboardIcon, adminOnly: true },
  { key: 'newsletter-send', label: 'Send Newsletter', Icon: SendIcon, adminOnly: true },
];

export default function Portal() {
  const navigate = useNavigate();
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);
  const [section, setSection] = useState('members');

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

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate('/');
    }
  }

  if (authCheck === 'checking') {
    return <div className="portal-page" />;
  }

  if (authCheck === 'denied') {
    return (
      <div className="portal-page portal-denied">
        <div className="portal-denied-card">
          <h1>Please log in</h1>
          <p>You need to be logged in to view the Member Portal.</p>
          <Link to="/login" className="portal-pill">Go to Log In</Link>
        </div>
      </div>
    );
  }

  const visibleSections = SECTIONS.filter((s) => !s.adminOnly || user?.is_admin);

  return (
    <div className="portal-page">
      <header className="portal-header">
        <Link to="/" className="portal-logo">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AEE logo" />
          <span>AEE at USC</span>
        </Link>
        <div className="portal-title">Member Portal</div>
        <div className="portal-header-spacer" />
      </header>

      <div className="portal-body">
        <nav className="portal-rail">
          {visibleSections.map((s, i) => {
            // Visual divider between member sections and admin-only
            // ones, matching the sketch's "these are admin" grouping —
            // only rendered once, right before the first admin-only
            // item, and only for admins (visibleSections already
            // excludes admin items for non-admins, so this never shows
            // for a regular member).
            const prevWasNonAdmin = i > 0 && !visibleSections[i - 1].adminOnly;
            const showDivider = s.adminOnly && prevWasNonAdmin;
            return (
              <div key={s.key}>
                {showDivider && <div className="portal-rail-divider">Admin</div>}
                <button
                  className={`portal-rail-item${section === s.key ? ' active' : ''}`}
                  onClick={() => setSection(s.key)}
                >
                  {s.label}
                </button>
              </div>
            );
          })}
        </nav>

        <div className="portal-main">
          <div className="portal-tiles">
            {visibleSections.map((s) => (
              <button
                key={s.key}
                className={`portal-tile${section === s.key ? ' active' : ''}`}
                onClick={() => setSection(s.key)}
              >
                <span className="portal-tile-icon" aria-hidden="true"><s.Icon /></span>
                <span className="portal-tile-label">{s.label}</span>
              </button>
            ))}
          </div>

          <div className="portal-content">
            {section === 'members' && <MembersPlaceholder />}
            {section === 'orgchart' && <OrgChartPlaceholder />}
            {section === 'newsletter' && <NewsletterArchive />}
            {section === 'settings' && <Settings user={user} onLogout={handleLogout} />}
            {section === 'dashboard' && user?.is_admin && <AdminDashboard />}
            {section === 'newsletter-send' && user?.is_admin && <NewsletterSend />}
          </div>

          <div className="portal-quadrants">
            <div className="portal-quadrant">
              <CalendarPanel isAdmin={user?.is_admin} />
            </div>
            <div className="portal-quadrant">
              <TasksPanel />
            </div>
          </div>
        </div>
      </div>

      <Footer showNewsletterSignup={false} />
    </div>
  );
}

// ─── Placeholders ────────────────────────────────────────────────────────

function MembersPlaceholder() {
  return (
    <div className="portal-placeholder">
      <div className="portal-placeholder-icon"><MembersIcon /></div>
      <h2>Members</h2>
      <p>A full member directory is coming soon.</p>
    </div>
  );
}

function OrgChartPlaceholder() {
  return (
    <div className="portal-placeholder">
      <div className="portal-placeholder-icon"><OrgChartIcon /></div>
      <h2>Org Chart</h2>
      <p>An interactive org chart is coming soon.</p>
    </div>
  );
}

// ─── Settings (change password — same logic as the old standalone
// Dashboard.jsx, now living inside the portal as its own tab) ──────────

function Settings({ user, onLogout }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

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

  return (
    <div className="portal-section">
      <h2>Settings</h2>
      <p className="portal-section-sub">
        {user?.username && <>Username: <strong>{user.username}</strong><br /></>}
        Manage your account security below.
      </p>

      <form onSubmit={handleSubmit} className="portal-form">
        <label className="portal-label">
          Current password
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="portal-input"
          />
        </label>
        <label className="portal-label">
          New password
          <input
            type="password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="portal-input"
            placeholder="At least 8 characters"
          />
        </label>
        <label className="portal-label">
          Confirm new password
          <input
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="portal-input"
          />
        </label>

        {status === 'error' && <p className="portal-error">{feedback}</p>}
        {status === 'success' && <p className="portal-success">{feedback}</p>}

        <button type="submit" disabled={status === 'submitting'} className="portal-pill">
          {status === 'submitting' ? 'Updating…' : 'Update Password'}
        </button>
      </form>

      <button type="button" onClick={onLogout} className="portal-link-button">
        Log out
      </button>
    </div>
  );
}

// ─── Dashboard (admin-only — links to the existing account-creation
// flow; a place for more admin tools later without restructuring) ──────

function AdminDashboard() {
  return (
    <div className="portal-section">
      <h2>Dashboard</h2>
      <p className="portal-section-sub">Admin tools for managing the org.</p>
      <Link to="/create-user" className="portal-pill">Create a new account</Link>
    </div>
  );
}

// ─── Newsletter (member view — archive of past sends) ──────────────────

function NewsletterArchive() {
  const [status, setStatus] = useState('loading'); // loading | ok | error
  const [sends, setSends] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getNewsletterArchive()
      .then((data) => {
        setSends(data?.sends || []);
        setStatus('ok');
      })
      .catch((err) => {
        setError(err.message || 'Could not load the newsletter archive.');
        setStatus('error');
      });
  }, []);

  return (
    <div className="portal-section">
      <h2>Newsletter</h2>
      <p className="portal-section-sub">Past updates sent to subscribers.</p>

      {status === 'loading' && <p className="portal-muted">Loading…</p>}
      {status === 'error' && <p className="portal-error">{error}</p>}
      {status === 'ok' && sends.length === 0 && (
        <p className="portal-muted">No newsletters have been sent yet.</p>
      )}
      {status === 'ok' && sends.length > 0 && (
        <div className="portal-archive-list">
          {sends.map((send) => (
            <div key={send.id} className="portal-archive-item">
              <div className="portal-archive-subject">{send.subject}</div>
              <div className="portal-archive-date">
                {new Date(send.sent_at).toLocaleDateString(undefined, {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </div>
              <div className="portal-archive-body">{send.message}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Newsletter send (admin-only — gated by session-based admin login,
// same requireAdmin check as everywhere else in the portal; no shared
// password anymore as of 2026-08-08) ─────────────────────────────────

function NewsletterSend() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sendStatus, setSendStatus] = useState('idle');
  const [sendFeedback, setSendFeedback] = useState('');
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [countStatus, setCountStatus] = useState('idle');

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

  return (
    <div className="portal-section">
      <h2>Send Newsletter</h2>
      <p className="portal-section-sub">
        Compose an update and send it to everyone on the subscriber list.
      </p>

      <form onSubmit={handleSend} className="portal-form">
        <div className="portal-subscriber-row">
          <button
            type="button"
            onClick={handleCheckSubscribers}
            disabled={countStatus === 'loading'}
            className="portal-link-button"
          >
            {countStatus === 'loading' ? 'Checking…' : 'Check subscriber count'}
          </button>
          {subscriberCount !== null && (
            <span className="portal-muted">
              {subscriberCount} subscriber{subscriberCount === 1 ? '' : 's'}
            </span>
          )}
        </div>

        <label className="portal-label">
          Subject
          <input
            type="text"
            required
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="portal-input"
            placeholder="e.g. This week at AEE"
          />
        </label>

        <label className="portal-label">
          Message
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="portal-textarea"
            placeholder="Write your update here. Plain text — line breaks become paragraphs."
            rows={8}
          />
        </label>

        {sendStatus === 'error' && <p className="portal-error">{sendFeedback}</p>}
        {sendStatus === 'success' && <p className="portal-success">{sendFeedback}</p>}

        <button type="submit" disabled={sendStatus === 'submitting'} className="portal-pill">
          {sendStatus === 'submitting' ? 'Sending…' : 'Send to all subscribers'}
        </button>
      </form>
    </div>
  );
}

// ─── Calendar (events) ───────────────────────────────────────────────────
//
// Every member sees the same shared events list. Admins additionally get
// a small inline "add event" form right in this quadrant — kept compact
// since this is a quarter-width panel, not a dedicated page.

function CalendarPanel({ isAdmin }) {
  const [status, setStatus] = useState('loading');
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventAt, setEventAt] = useState('');
  const [addStatus, setAddStatus] = useState('idle');
  const [addError, setAddError] = useState('');

  function loadEvents() {
    setStatus('loading');
    getEvents()
      .then((data) => {
        setEvents(data?.events || []);
        setStatus('ok');
      })
      .catch((err) => {
        setError(err.message || 'Could not load events.');
        setStatus('error');
      });
  }

  useEffect(loadEvents, []);

  async function handleAdd(e) {
    e.preventDefault();
    setAddStatus('submitting');
    setAddError('');
    try {
      await createEvent(title, description, new Date(eventAt).toISOString());
      setTitle('');
      setDescription('');
      setEventAt('');
      setShowAddForm(false);
      setAddStatus('idle');
      loadEvents();
    } catch (err) {
      setAddStatus('error');
      setAddError(err.message || 'Could not add event.');
    }
  }

  async function handleDelete(id) {
    try {
      await deleteEvent(id);
      setSelected(null);
      loadEvents();
    } catch (err) {
      setAddError(err.message || 'Could not delete event.');
    }
  }

  return (
    <div className="portal-panel">
      <div className="portal-panel-header">
        <h3>Upcoming Events</h3>
        {isAdmin && (
          <button
            type="button"
            className="portal-panel-add"
            onClick={() => setShowAddForm((v) => !v)}
            aria-label="Add event"
          >
            {showAddForm ? '×' : '+'}
          </button>
        )}
      </div>

      {isAdmin && showAddForm && (
        <form onSubmit={handleAdd} className="portal-inline-form">
          <input
            type="text"
            required
            placeholder="Event title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="portal-input portal-input-sm"
          />
          <input
            type="datetime-local"
            required
            value={eventAt}
            onChange={(e) => setEventAt(e.target.value)}
            className="portal-input portal-input-sm"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="portal-input portal-input-sm"
          />
          {addStatus === 'error' && <p className="portal-error portal-error-sm">{addError}</p>}
          <button type="submit" disabled={addStatus === 'submitting'} className="portal-pill portal-pill-sm">
            {addStatus === 'submitting' ? 'Adding…' : 'Add Event'}
          </button>
        </form>
      )}

      {status === 'loading' && <p className="portal-muted">Loading…</p>}
      {status === 'error' && <p className="portal-error">{error}</p>}
      {status === 'ok' && events.length === 0 && (
        <p className="portal-muted">No upcoming events.</p>
      )}
      {status === 'ok' && events.length > 0 && (
        <div className="portal-event-list">
          {events.map((ev) => (
            <div key={ev.id}>
              <button
                type="button"
                className="portal-event-item"
                onClick={() => setSelected(selected === ev.id ? null : ev.id)}
              >
                <span className="portal-event-date">
                  {new Date(ev.event_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
                <span className="portal-event-title">{ev.title}</span>
              </button>
              {selected === ev.id && (
                <div className="portal-event-detail">
                  <div>
                    {new Date(ev.event_at).toLocaleString(undefined, {
                      dateStyle: 'full', timeStyle: 'short',
                    })}
                  </div>
                  {ev.description && <p>{ev.description}</p>}
                  {isAdmin && (
                    <button type="button" className="portal-link-button" onClick={() => handleDelete(ev.id)}>
                      Delete event
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Tasks (per-user, assigned by an admin) ─────────────────────────────
//
// Any member sees only their own tasks and can check them off. Admins
// additionally get a compact inline "assign a task" form.

function TasksPanel() {
  const [status, setStatus] = useState('loading');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [addStatus, setAddStatus] = useState('idle');
  const [addError, setAddError] = useState('');

  function loadTasks() {
    setStatus('loading');
    getMyTasks()
      .then((data) => {
        setTasks(data?.tasks || []);
        setStatus('ok');
      })
      .catch((err) => {
        setError(err.message || 'Could not load tasks.');
        setStatus('error');
      });
  }

  useEffect(() => {
    getCurrentUser().then((data) => setUser(data?.user || null)).catch(() => {});
    loadTasks();
  }, []);

  useEffect(() => {
    if (showAddForm && members.length === 0) {
      getAssignableMembers()
        .then((data) => setMembers(data?.members || []))
        .catch((err) => setAddError(err.message || 'Could not load members.'));
    }
  }, [showAddForm, members.length]);

  async function handleToggle(task) {
    // Optimistic update — flip it in the UI immediately, then reconcile
    // with the server. If the request fails, reload from the server so
    // the UI doesn't stay wrong.
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, is_done: !t.is_done } : t)));
    try {
      await setTaskDone(task.id, !task.is_done);
    } catch {
      loadTasks();
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    setAddStatus('submitting');
    setAddError('');
    try {
      await createTask(title, description, Number(assignedTo));
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setShowAddForm(false);
      setAddStatus('idle');
      // Only reloads the CURRENT user's own task list — if the task was
      // assigned to someone else, it correctly won't appear here (that's
      // expected; it'll show up when that person views their own tasks).
      loadTasks();
    } catch (err) {
      setAddStatus('error');
      setAddError(err.message || 'Could not assign task.');
    }
  }

  return (
    <div className="portal-panel">
      <div className="portal-panel-header">
        <h3>Tasks</h3>
        {user?.is_admin && (
          <button
            type="button"
            className="portal-panel-add"
            onClick={() => setShowAddForm((v) => !v)}
            aria-label="Assign task"
          >
            {showAddForm ? '×' : '+'}
          </button>
        )}
      </div>

      {user?.is_admin && showAddForm && (
        <form onSubmit={handleAdd} className="portal-inline-form">
          <input
            type="text"
            required
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="portal-input portal-input-sm"
          />
          <select
            required
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
            className="portal-input portal-input-sm"
          >
            <option value="" disabled>Assign to…</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.first_name && m.last_name ? `${m.first_name} ${m.last_name}` : m.username}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="portal-input portal-input-sm"
          />
          {addStatus === 'error' && <p className="portal-error portal-error-sm">{addError}</p>}
          <button type="submit" disabled={addStatus === 'submitting'} className="portal-pill portal-pill-sm">
            {addStatus === 'submitting' ? 'Assigning…' : 'Assign Task'}
          </button>
        </form>
      )}

      {status === 'loading' && <p className="portal-muted">Loading…</p>}
      {status === 'error' && <p className="portal-error">{error}</p>}
      {status === 'ok' && tasks.length === 0 && (
        <p className="portal-muted">No tasks assigned to you right now.</p>
      )}
      {status === 'ok' && tasks.length > 0 && (
        <div className="portal-task-list">
          {tasks.map((task) => (
            <label key={task.id} className={`portal-task-item${task.is_done ? ' done' : ''}`}>
              <input
                type="checkbox"
                checked={task.is_done}
                onChange={() => handleToggle(task)}
              />
              <span className="portal-task-title">{task.title}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Rail/tile icons ───────────────────────────────────────────────────
//
// Six simple line icons, one per portal section — real SVGs rather than
// emoji, per explicit feedback 2026-08-08. Consistent style: 22x22
// viewBox, 1.8px stroke, no fill, currentColor (so hover/active tile
// states recolor them for free without a second icon variant).

function MembersIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="8" cy="7" r="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2.5 18c.9-3.4 3-5 5.5-5s4.6 1.6 5.5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="8" r="2.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M14 12.3c1.9.2 3.2 1.4 3.9 3.7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function OrgChartIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="8" y="2" width="6" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="2" y="15.5" width="6" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="15.5" width="6" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 6.5v4M11 10.5H5v5M11 10.5h6v5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function NewsletterIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2" y="4.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 6l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="11" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M11 2.8v2.1M11 16.1v2.1M18.2 11h-2.1M5.9 11H3.8M16.1 5.9l-1.5 1.5M7.4 14.6l-1.5 1.5M16.1 16.1l-1.5-1.5M7.4 7.4L5.9 5.9"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
      />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="8" height="8" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="12" y="2" width="8" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="12" y="9" width="8" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="2" y="12" width="8" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M2.5 11L19.5 3l-6 16-3.8-6.7L2.5 11z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
      <path d="M9.7 12.3L19.5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
