// src/pages/Portal.jsx
//
// The Member Portal — reached by clicking your first name in the nav
// once logged in (see Nav in Home.jsx; the profile icon next to it goes
// to /profile instead, a separate page). Requires an active session;
// bounces to /login otherwise, same pattern as Dashboard.jsx/CreateUser.jsx.
//
// Layout: a logo header (links back to the homepage), a slim left rail
// listing every section as plain links, and a right side — the bulk of
// the page — split into a top row of big icon+label tiles mirroring the
// rail, a content section for whichever tab is active, and a bottom row
// holding the Tasks panel. The rail is deliberately minimal (a thin
// column of plain text links, not a padded 1/3-width panel) per
// explicit feedback 2026-08-08 ("way too much space for this vertical
// bar... I wanna be super minimal... simple, easy vertical bars... the
// members thing should be taking up more space") — most of the width
// goes to the tiles/content side instead.
//
// Most rail items/tiles switch which section's content renders below
// (see `section` state) — Tasks stays visible in its own panel
// regardless of which section is selected, since it's part of the
// persistent layout, not a tab. Members, Calendar, Settings, Dashboard,
// and Send Newsletter are the exception: real links to standalone pages
// (/members, /calendar, /profile?tab=settings, /dashboard,
// /newsletter-admin) instead of in-page tabs — see the `to` field on
// SECTIONS below. Dashboard/Send Newsletter became real pages per
// explicit feedback 2026-08-08 ("dashboard and send newsletter... it
// should redirect you to their pages, their subpages... when you click
// on them"); Members followed the same pattern 2026-08-10 once its full
// grid/filter/sort page was built (see src/pages/Members.jsx); Settings
// followed 2026-08-11 when it merged into Profile.jsx as a tab there
// ("I think profile and settings should be, like, two in one kinda...
// like an Instagram type of deal or Facebook") — its change-password/
// log-out logic moved to Profile.jsx's SettingsTab component and no
// longer lives here at all. Calendar followed the same pattern the same
// day, as part of the "Calendar/Tasks rework" — it used to be a small
// quarter-width "upcoming events" panel living right here alongside
// Tasks; it's now a full month-grid standalone page (see
// src/pages/Calendar.jsx) reached via this tile/rail-item instead.
// Tasks explicitly did NOT get the same treatment — per Kev, "add due
// dates, but keep Tasks separate" — so it's still an in-portal panel
// (see TasksPanel below), just now full-width in the bottom row since
// Calendar's old quadrant neighbor is gone, and each task can now
// optionally carry a due date.
//
// Org Chart became a real standalone page 2026-08-12 (see
// src/pages/OrgChart.jsx) once Kev approved the review sketch — same
// pattern as Members/Calendar/Settings before it: a real link
// (`to: '/org-chart'`) instead of the in-page placeholder tab it used to
// be. Newsletter (view) and Tasks are the only pieces left that are
// genuinely still in-page — real and backed by routes/portal.js +
// routes/newsletter.js's archive addition, kept intentionally
// bare-minimum rather than fully built out, per an explicit scope
// decision.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCurrentUser,
  getNewsletterArchive,
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
//
// Each section is either an in-page tab (`key`, switches the `section`
// state below) or a real link to a standalone page (`to`) — Dashboard
// and Send Newsletter became real subpages per explicit feedback
// 2026-08-08 ("dashboard and send newsletter... it should redirect you
// to their pages, their subpages... when you click on them"), pointing
// at the existing already-admin-gated /dashboard and /newsletter-admin
// routes rather than the in-page tabs they used to be.
const SECTIONS = [
  { key: 'members', label: 'Members', Icon: MembersIcon, adminOnly: false, to: '/members' },
  { key: 'calendar', label: 'Calendar', Icon: CalendarIcon, adminOnly: false, to: '/calendar' },
  { key: 'orgchart', label: 'Org Chart', Icon: OrgChartIcon, adminOnly: false, to: '/org-chart' },
  { key: 'newsletter', label: 'Newsletter', Icon: NewsletterIcon, adminOnly: false },
  { key: 'settings', label: 'Settings', Icon: SettingsIcon, adminOnly: false, to: '/profile?tab=settings' },
  { key: 'dashboard', label: 'Dashboard', Icon: DashboardIcon, adminOnly: true, to: '/dashboard' },
  { key: 'newsletter-send', label: 'Send Newsletter', Icon: SendIcon, adminOnly: true, to: '/newsletter-admin' },
];

export default function Portal() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);
  // Default is now 'newsletter' — it's the only SECTIONS entry left
  // without a `to` (a real in-page tab, not a link to a standalone
  // page). Members, Calendar, and now Org Chart (2026-08-12) all moved
  // out to their own pages over time, so 'members'/'orgchart' are no
  // longer valid `section` values to default into.
  const [section, setSection] = useState('newsletter');

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
                {s.to ? (
                  <Link to={s.to} className="portal-rail-item">
                    {s.label}
                  </Link>
                ) : (
                  <button
                    className={`portal-rail-item${section === s.key ? ' active' : ''}`}
                    onClick={() => setSection(s.key)}
                  >
                    {s.label}
                  </button>
                )}
              </div>
            );
          })}
        </nav>

        <div className="portal-main">
          <div className="portal-tiles">
            {visibleSections.map((s) => (
              s.to ? (
                <Link key={s.key} to={s.to} className="portal-tile">
                  <span className="portal-tile-icon" aria-hidden="true"><s.Icon /></span>
                  <span className="portal-tile-label">{s.label}</span>
                </Link>
              ) : (
                <button
                  key={s.key}
                  className={`portal-tile${section === s.key ? ' active' : ''}`}
                  onClick={() => setSection(s.key)}
                >
                  <span className="portal-tile-icon" aria-hidden="true"><s.Icon /></span>
                  <span className="portal-tile-label">{s.label}</span>
                </button>
              )
            ))}
          </div>

          <div className="portal-content">
            {section === 'newsletter' && <NewsletterArchive />}
          </div>

          <div className="portal-quadrants">
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

// ─── Tasks (per-user, assigned by an admin) ─────────────────────────────
//
// Any member sees only their own tasks and can check them off. Admins
// additionally get a compact inline "assign a task" form. Gained an
// OPTIONAL due-date field as part of the 2026-08-11 Calendar/Tasks
// rework — Calendar moved out to its own page (see Calendar.jsx), but
// per explicit decision Tasks stayed right here rather than merging
// into that calendar grid; due dates only affect sort order/display
// within this panel (soonest-due-first, see routes/portal.js's ORDER
// BY), they never appear on the Calendar page itself.

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
  const [dueDate, setDueDate] = useState(''); // optional — <input type="date"> value, e.g. "2026-08-15"
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
      await createTask(title, description, Number(assignedTo), dueDate ? new Date(dueDate).toISOString() : undefined);
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setDueDate('');
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
          <label className="portal-task-due-label">
            Due date (optional)
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="portal-input portal-input-sm"
            />
          </label>
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
          {tasks.map((task) => {
            // "Overdue" = has a due date, that date has passed, and it's
            // not done yet — purely a display flag (a red due-date label),
            // there's no separate backend concept of overdue.
            const isOverdue = task.due_date && !task.is_done && new Date(task.due_date) < new Date();
            return (
              <label key={task.id} className={`portal-task-item${task.is_done ? ' done' : ''}`}>
                <input
                  type="checkbox"
                  checked={task.is_done}
                  onChange={() => handleToggle(task)}
                />
                <span className="portal-task-title">{task.title}</span>
                {task.due_date && (
                  <span className={`portal-task-due${isOverdue ? ' overdue' : ''}`}>
                    Due {new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Rail/tile icons ───────────────────────────────────────────────────
//
// Simple line icons, one per portal section — real SVGs rather than
// emoji, per explicit feedback 2026-08-08. Consistent style: 22x22
// viewBox, 1.8px stroke, no fill, currentColor (so hover/active tile
// states recolor them for free without a second icon variant).
// CalendarIcon added 2026-08-11 for the Calendar/Tasks rework, matching
// the same style as everything else here.

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

function CalendarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2.5" y="4" width="17" height="15.5" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M2.5 8.5h17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6.5 2.5v3M15.5 2.5v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="7" cy="12.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="11" cy="12.5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="15" cy="12.5" r="1.1" fill="currentColor" stroke="none" />
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