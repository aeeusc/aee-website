// src/pages/Tasks.jsx
//
// Tasks became its own standalone page 2026-08-12, per explicit feedback
// ("I wanna make tasks as a page"). Same "became a real subpage" pattern
// Members/Settings/Dashboard/Calendar/Org Chart already went through
// (see Portal.jsx's SECTIONS array) — reached via the Portal's Tasks
// tile/rail-item instead of the small quadrant panel it used to be.
//
// The actual logic here (load my tasks, admin inline "assign a task"
// form, toggle done, optional due date with overdue styling) is ported
// wholesale from Portal.jsx's old TasksPanel component — same behavior,
// same routes/portal.js endpoints, just given a full page's worth of
// room instead of a single portal-quadrant box. Any member sees only
// their own tasks; admins additionally get the "+" assign-task control.
//
// Requires an active session, same pattern as Calendar.jsx/OrgChart.jsx.
//
// 2026-08-15 additions, all per explicit feedback:
//  - Multi-assign: the assign form now offers a checkbox list of members
//    (plus a "Select all" toggle) instead of a single <select>, so a
//    task can go to several people in one action. Each person still
//    gets their own independent task row (see routes/portal.js's POST
//    /tasks comment) — this page's OWN task list only ever shows tasks
//    assigned to the CURRENT user, same as before.
//  - Self-delete: any member can delete a task assigned to them (done
//    or not) — "you don't have to keep it."
//  - Admin "all tasks" view: a separate section, admin-only, showing
//    EVERY task across every member with who it's assigned to, so an
//    admin can delete a task they gave someone else — not just their
//    own tasks.
//  - Past-date guard: the assign form won't submit a due date/start time
//    that's already passed (checked against the browser's current
//    instant, which is timezone-correct no matter what timezone the
//    admin is in — see the matching server-side check in
//    routes/portal.js for why this doesn't hardcode Pacific
//    specifically). Mirrors the existing client+server defense-in-depth
//    pattern used everywhere else in this app (e.g. Calendar.jsx).

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCurrentUser,
  getMyTasks,
  createTask,
  setTaskDone,
  deleteTask,
  getAssignableMembers,
  getAllTasks,
  deleteAnyTask,
} from '../lib/api';
import { useConfirm } from '../components/ConfirmDialog';
import './Tasks.css';

export default function TasksPage() {
  // In-app confirm modal (added 2026-08-16) — replaces window.confirm()
  // below, which showed the browser's own generic popup instead of
  // something styled to match the site. See components/ConfirmDialog.jsx.
  const confirm = useConfirm();

  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);

  const [status, setStatus] = useState('loading');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  // assignedTo is now a Set of member ids — multi-assign, added
  // 2026-08-15 per explicit feedback ("I wanna make it so you can assign
  // to multiple people, like... select all the members").
  const [assignedTo, setAssignedTo] = useState(() => new Set());
  const [dueDate, setDueDate] = useState(''); // optional — <input type="date"> value
  // Optional start/end time — added 2026-08-14 per explicit feedback
  // ("I want a start and end time to be able to be assigned [to a
  // task]... it could be optional"). Anchored to the due date above
  // (same calendar day) rather than being its own separate date, since
  // "when will this be worked on" naturally means "on the day it's due."
  // Both stay blank by default.
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [addStatus, setAddStatus] = useState('idle');
  const [addError, setAddError] = useState('');

  // Admin-only "every task" view — added 2026-08-15 so an admin can
  // delete a task assigned to someone else, not just their own.
  const [allTasks, setAllTasks] = useState([]);
  const [allTasksStatus, setAllTasksStatus] = useState('idle'); // idle | loading | ok | error
  const [allTasksError, setAllTasksError] = useState('');
  const [showAllTasks, setShowAllTasks] = useState(false);

  // Status filter + due-date sort — added 2026-08-16 per explicit
  // feedback ("I want to make it so there's three sections... a way to
  // filter... I don't wanna add additional clutter on the page. I wanna
  // have a filter button"). One button (top-right of the header, next
  // to the admin "+"), same pattern as Members.jsx's own Filter button —
  // opens a dropdown with a MULTI-select set of status checkboxes
  // ("past incomplete tasks or, like, completely tasking over to do
  // tasks... or you could just, like, select all") plus a due-date sort
  // toggle in the same panel ("filter from, like, the due date. Like,
  // the soonest... to, like, the farthest... vice versa").
  //
  // Filtering/sorting is done entirely CLIENT-side on the already-loaded
  // `tasks` array — no new API calls, no new backend endpoint needed,
  // since every task the user can see is already fetched by
  // getMyTasks()/getAllTasks() above.
  const STATUS_FILTERS = [
    { key: 'overdue', label: 'Overdue' },
    { key: 'completed', label: 'Completed' },
    { key: 'upcoming', label: 'Upcoming' },
    { key: 'no-date', label: 'No due date' },
  ];
  const [filterOpen, setFilterOpen] = useState(false);
  // Empty set = no filter applied (show everything) — same "nothing
  // selected means unfiltered" convention Members.jsx's selectedTeams
  // uses, so an admin doesn't have to manually check every box just to
  // see all their tasks by default.
  const [statusFilters, setStatusFilters] = useState(() => new Set());
  const [dueDateSort, setDueDateSort] = useState('soonest'); // 'soonest' | 'farthest'

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
    if (authCheck === 'ok') loadTasks();
  }, [authCheck]);

  useEffect(() => {
    if (showAddForm && members.length === 0) {
      getAssignableMembers()
        .then((data) => setMembers(data?.members || []))
        .catch((err) => setAddError(err.message || 'Could not load members.'));
    }
  }, [showAddForm, members.length]);

  function loadAllTasks() {
    setAllTasksStatus('loading');
    getAllTasks()
      .then((data) => {
        setAllTasks(data?.tasks || []);
        setAllTasksStatus('ok');
      })
      .catch((err) => {
        setAllTasksError(err.message || 'Could not load all tasks.');
        setAllTasksStatus('error');
      });
  }

  useEffect(() => {
    if (showAllTasks && allTasksStatus === 'idle') loadAllTasks();
  }, [showAllTasks, allTasksStatus]);

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

  // Any member can delete a task assigned to THEM — "you don't have to
  // keep it" — added 2026-08-15. Confirms first since this is
  // permanent, same caution as every other delete control in this app.
  // Uses the in-app confirm modal (2026-08-16) instead of
  // window.confirm() — same "confirmed" boolean shape, just awaited.
  async function handleDelete(task) {
    const confirmed = await confirm({
      title: 'Delete this task?',
      message: `Delete "${task.title}"? This can't be undone.`,
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!confirmed) return;
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    try {
      await deleteTask(task.id);
    } catch (err) {
      setError(err.message || 'Could not delete that task.');
      loadTasks();
    }
  }

  // Admin-only — deletes ANY task, not just one assigned to the current
  // admin. Added 2026-08-15 ("I wanna make it so tasks can be deleted as
  // an admin. Like, you can delete tasks from someone.").
  async function handleAdminDelete(task) {
    const confirmed = await confirm({
      title: 'Delete this task?',
      message: `Delete "${task.title}" (assigned to ${assigneeName(task)})? This can't be undone.`,
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!confirmed) return;
    setAllTasks((prev) => prev.filter((t) => t.id !== task.id));
    try {
      await deleteAnyTask(task.id);
    } catch (err) {
      setAllTasksError(err.message || 'Could not delete that task.');
      loadAllTasks();
    }
  }

  function assigneeName(task) {
    if (task.assignee_first_name && task.assignee_last_name) {
      return `${task.assignee_first_name} ${task.assignee_last_name}`;
    }
    return task.assignee_username || 'Unknown';
  }

  function toggleAssignee(id) {
    setAssignedTo((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleSelectAllAssignees() {
    setAssignedTo((prev) => (prev.size === members.length ? new Set() : new Set(members.map((m) => m.id))));
  }

  function toggleStatusFilter(key) {
    setStatusFilters((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  // A single task's status bucket(s) — a task can match more than one
  // (e.g. "no due date" tasks are simply never "overdue" or "upcoming",
  // but a completed task with a due date in the past is BOTH "completed"
  // AND would-have-been "overdue" — shown under "Completed" only, since
  // once it's done "overdue" stops being a meaningful warning; see
  // taskMatchesFilter below for the actual precedence).
  function taskMatchesFilter(task, activeFilters) {
    if (activeFilters.size === 0) return true; // no filter = show everything
    const isOverdue = task.due_date && !task.is_done && new Date(task.due_date) < new Date();
    const isCompleted = task.is_done;
    const isUpcoming = task.due_date && !task.is_done && new Date(task.due_date) >= new Date();
    const hasNoDate = !task.due_date;
    if (activeFilters.has('overdue') && isOverdue) return true;
    if (activeFilters.has('completed') && isCompleted) return true;
    if (activeFilters.has('upcoming') && isUpcoming) return true;
    if (activeFilters.has('no-date') && hasNoDate) return true;
    return false;
  }

  // Applies the active status filter(s) + due-date sort to a task list —
  // shared by both "my tasks" and the admin "all tasks" panel below, so
  // filtering/sorting behaves identically in both places rather than two
  // separate implementations drifting apart.
  function applyFilterAndSort(list) {
    const filtered = list.filter((t) => taskMatchesFilter(t, statusFilters));
    return [...filtered].sort((a, b) => {
      // No-due-date tasks always sort last regardless of direction —
      // there's no meaningful "soonest/farthest" position for them.
      if (!a.due_date && !b.due_date) return 0;
      if (!a.due_date) return 1;
      if (!b.due_date) return -1;
      const diff = new Date(a.due_date) - new Date(b.due_date);
      return dueDateSort === 'soonest' ? diff : -diff;
    });
  }

  const visibleTasks = applyFilterAndSort(tasks);
  const visibleAllTasks = applyFilterAndSort(allTasks);

  async function handleAdd(e) {
    e.preventDefault();
    setAddStatus('submitting');
    setAddError('');

    if (assignedTo.size === 0) {
      setAddStatus('error');
      setAddError('Select at least one person to assign this to.');
      return;
    }

    // Start/end time need a calendar day to attach to — rather than
    // silently assuming "today" (which could surprise an admin who just
    // forgot the due date field), require one explicitly when either
    // time is filled in.
    if ((startTime || endTime) && !dueDate) {
      setAddStatus('error');
      setAddError('Set a due date first to attach a start/end time to it.');
      return;
    }
    if (startTime && endTime) {
      const [startH, startM] = startTime.split(':').map(Number);
      const [endH, endM] = endTime.split(':').map(Number);
      if (endH * 60 + endM <= startH * 60 + startM) {
        setAddStatus('error');
        setAddError('End time must be after the start time.');
        return;
      }
    }

    try {
      const [year, month, day] = dueDate ? dueDate.split('-').map(Number) : [];
      let startIso;
      let endIso;
      if (dueDate && startTime) {
        const [h, m] = startTime.split(':').map(Number);
        startIso = new Date(year, month - 1, day, h, m).toISOString();
      }
      if (dueDate && endTime) {
        const [h, m] = endTime.split(':').map(Number);
        endIso = new Date(year, month - 1, day, h, m).toISOString();
      }
      // Plain due-date-only (no time) still gets checked against
      // midnight local time for that day, same leniency as the backend
      // (a due date of "today" is never rejected).
      const dueDateIso = dueDate ? new Date(year, month - 1, day).toISOString() : undefined;

      // Past-date guard — added 2026-08-15 ("I also wanna make it so you
      // can't assign tasks in the past"). Checked against the browser's
      // own current instant (new Date()), which is correct regardless
      // of what timezone the admin is actually in — no hardcoded
      // Pacific offset needed, since Date objects are timezone-agnostic
      // instants under the hood. This is a client-side convenience
      // check only; routes/portal.js's POST /tasks re-validates the
      // same thing server-side (the real enforcement).
      const now = new Date();
      if (startIso && new Date(startIso) < now) {
        setAddStatus('error');
        setAddError('That start time is in the past.');
        return;
      }
      if (!startIso && dueDateIso && new Date(dueDateIso) < new Date(now.getFullYear(), now.getMonth(), now.getDate())) {
        setAddStatus('error');
        setAddError('That due date is in the past.');
        return;
      }

      await createTask(
        title, description, Array.from(assignedTo),
        dueDateIso, startIso, endIso
      );
      setTitle('');
      setDescription('');
      setAssignedTo(new Set());
      setDueDate('');
      setStartTime('');
      setEndTime('');
      setShowAddForm(false);
      setAddStatus('idle');
      // Only reloads the CURRENT user's own task list — if the task was
      // assigned to someone else (or several people, now), it correctly
      // won't appear here (that's expected; it'll show up when each of
      // them views their own tasks).
      loadTasks();
      // If the admin "all tasks" panel is open, refresh it too so the
      // newly-assigned copies show up there right away.
      if (showAllTasks) loadAllTasks();
    } catch (err) {
      setAddStatus('error');
      setAddError(err.message || 'Could not assign task.');
    }
  }

  if (authCheck === 'checking') {
    return <div className="tasks-page" />;
  }

  if (authCheck === 'denied') {
    return (
      <div className="tasks-page tasks-denied">
        <div className="tasks-denied-card">
          <h1>Please log in</h1>
          <p>You need to be logged in to view your tasks.</p>
          <Link to="/login" className="tasks-pill">Go to Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="tasks-page">
      <header className="tasks-header">
        <Link to="/" className="tasks-logo">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AEE logo" />
          <span>AEE at USC</span>
        </Link>
        <Link to="/portal" className="tasks-back-link">← Back to Member Portal</Link>
        <div className="tasks-header-spacer" />
      </header>

      <div className="tasks-body">
        <div className="tasks-panel-header">
          <h1 className="tasks-title">Tasks</h1>
          <div className="tasks-panel-header-actions">
            {/* Filter button — available to every user (not admin-only),
                since it filters/sorts whichever task list YOU'RE looking
                at (your own tasks, or the admin all-tasks panel below).
                Same button+dropdown pattern as Members.jsx's Filter
                control, so it looks and behaves consistently with the
                rest of the app. */}
            <div className="tasks-filter-wrap">
              <button
                type="button"
                className={`tasks-filter-btn${statusFilters.size > 0 || dueDateSort !== 'soonest' ? ' active' : ''}`}
                onClick={() => setFilterOpen((v) => !v)}
                aria-expanded={filterOpen}
              >
                Filter{statusFilters.size > 0 ? ` (${statusFilters.size})` : ''}
                <FilterIcon />
              </button>

              {filterOpen && (
                <div className="tasks-filter-dropdown">
                  <div className="tasks-filter-dropdown-label">Status</div>
                  {STATUS_FILTERS.map((f) => (
                    <label key={f.key} className="tasks-filter-option">
                      <input
                        type="checkbox"
                        checked={statusFilters.has(f.key)}
                        onChange={() => toggleStatusFilter(f.key)}
                      />
                      <span>{f.label}</span>
                    </label>
                  ))}
                  <button
                    type="button"
                    className="tasks-filter-selectall"
                    onClick={() =>
                      setStatusFilters((prev) =>
                        prev.size === STATUS_FILTERS.length ? new Set() : new Set(STATUS_FILTERS.map((f) => f.key))
                      )
                    }
                  >
                    {statusFilters.size === STATUS_FILTERS.length ? 'Deselect all' : 'Select all'}
                  </button>

                  {/* Checkboxes, not radios — changed 2026-08-16 per
                      explicit feedback ("for the soonest first and the
                      farthest first I think you should just also do check
                      boxes as well, it's very hard to visually see if my
                      thing is checked or not"). A radio's filled dot is
                      genuinely low-contrast at this size against the dark
                      panel, whereas a checkbox's checkmark reads clearly —
                      and it now matches the Status checkboxes right above
                      instead of mixing two control shapes in one panel.
                      Behavior stays mutually exclusive (you can't sort
                      both directions at once): checking one unchecks the
                      other, and clicking the already-checked one is a
                      no-op rather than leaving no sort selected. */}
                  <div className="tasks-filter-dropdown-label tasks-filter-sort-label">Sort by due date</div>
                  <label className="tasks-filter-option">
                    <input
                      type="checkbox"
                      checked={dueDateSort === 'soonest'}
                      onChange={() => setDueDateSort('soonest')}
                    />
                    <span>Soonest first</span>
                  </label>
                  <label className="tasks-filter-option">
                    <input
                      type="checkbox"
                      checked={dueDateSort === 'farthest'}
                      onChange={() => setDueDateSort('farthest')}
                    />
                    <span>Farthest first</span>
                  </label>

                  {(statusFilters.size > 0 || dueDateSort !== 'soonest') && (
                    <button
                      type="button"
                      className="tasks-filter-clear"
                      onClick={() => {
                        setStatusFilters(new Set());
                        setDueDateSort('soonest');
                      }}
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>

            {user?.is_admin && (
              <button
                type="button"
                className="tasks-panel-add"
                onClick={() => setShowAddForm((v) => !v)}
                aria-label="Assign task"
              >
                {showAddForm ? '×' : '+'}
              </button>
            )}
          </div>
        </div>

        {user?.is_admin && showAddForm && (
          <form onSubmit={handleAdd} className="tasks-inline-form">
            <input
              type="text"
              required
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="tasks-input"
              maxLength={200}
            />

            <div className="tasks-assignee-picker">
              <div className="tasks-assignee-header">
                <span>Assign to</span>
                <button type="button" className="tasks-select-all" onClick={toggleSelectAllAssignees}>
                  {assignedTo.size === members.length && members.length > 0 ? 'Deselect all' : 'Select all'}
                </button>
              </div>
              <div className="tasks-assignee-list">
                {members.map((m) => (
                  <label key={m.id} className="tasks-assignee-row">
                    <input
                      type="checkbox"
                      checked={assignedTo.has(m.id)}
                      onChange={() => toggleAssignee(m.id)}
                    />
                    {m.first_name && m.last_name ? `${m.first_name} ${m.last_name}` : m.username}
                  </label>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="tasks-input"
              maxLength={4000}
            />
            <label className="tasks-due-label">
              Due date (optional)
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="tasks-input"
              />
            </label>
            <div className="tasks-time-row">
              <label className="tasks-due-label">
                Start time (optional)
                <input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="tasks-input"
                />
              </label>
              <label className="tasks-due-label">
                End time (optional)
                <input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="tasks-input"
                />
              </label>
            </div>
            {addStatus === 'error' && <p className="tasks-error tasks-error-sm">{addError}</p>}
            <button type="submit" disabled={addStatus === 'submitting'} className="tasks-pill tasks-pill-sm">
              {addStatus === 'submitting' ? 'Assigning…' : 'Assign Task'}
            </button>
          </form>
        )}

        {status === 'loading' && <p className="tasks-muted">Loading…</p>}
        {status === 'error' && <p className="tasks-error">{error}</p>}
        {status === 'ok' && tasks.length === 0 && (
          <p className="tasks-muted">No tasks assigned to you right now.</p>
        )}
        {status === 'ok' && tasks.length > 0 && visibleTasks.length === 0 && (
          <p className="tasks-muted">No tasks match the current filter.</p>
        )}
        {status === 'ok' && tasks.length > 0 && visibleTasks.length > 0 && (
          <div className="tasks-list">
            {visibleTasks.map((task) => {
              // "Overdue" = has a due date, that date has passed, and it's
              // not done yet — purely a display flag (a red due-date
              // label), there's no separate backend concept of overdue.
              const isOverdue = task.due_date && !task.is_done && new Date(task.due_date) < new Date();
              return (
                <div key={task.id} className={`tasks-item${task.is_done ? ' done' : ''}`}>
                  <label className="tasks-item-label">
                    <input
                      type="checkbox"
                      checked={task.is_done}
                      onChange={() => handleToggle(task)}
                    />
                    <span className="tasks-item-main">
                      <span className="tasks-item-title">{task.title}</span>
                      {task.description && <span className="tasks-item-description">{task.description}</span>}
                      {task.start_at && (
                        <span className="tasks-item-time">
                          {new Date(task.start_at).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                          {task.end_at && (
                            <> - {new Date(task.end_at).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</>
                          )}
                        </span>
                      )}
                    </span>
                    {task.due_date && (
                      <span className={`tasks-due${isOverdue ? ' overdue' : ''}`}>
                        Due {new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </label>
                  {/* Self-delete — added 2026-08-15 ("you can delete a
                      task. It's like you don't need it. You don't have
                      to keep it"). Available regardless of done/not-done. */}
                  <button
                    type="button"
                    className="tasks-item-delete"
                    aria-label={`Delete ${task.title}`}
                    onClick={() => handleDelete(task)}
                  >
                    ×
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Admin-only "every task" panel — added 2026-08-15 so an admin
            can see and delete a task they assigned to someone else, not
            just tasks assigned to themself. Collapsed by default (own
            section, own toggle) to keep the page's default view focused
            on "my tasks" like before. */}
        {user?.is_admin && (
          <div className="tasks-admin-section">
            <button
              type="button"
              className="tasks-admin-toggle"
              onClick={() => setShowAllTasks((v) => !v)}
            >
              {/* "(admin)" parenthetical dropped 2026-08-16 per explicit
                  feedback ("it doesn't need to be specified as in
                  parentheses admin and parentheses") — this button only
                  renders inside a user?.is_admin block anyway, so a
                  non-admin never sees it and the label was redundant. */}
              {showAllTasks ? 'Hide all tasks' : 'Manage all tasks'}
            </button>

            {showAllTasks && (
              <>
                {allTasksStatus === 'loading' && <p className="tasks-muted">Loading…</p>}
                {allTasksStatus === 'error' && <p className="tasks-error">{allTasksError}</p>}
                {allTasksStatus === 'ok' && allTasks.length === 0 && (
                  <p className="tasks-muted">No tasks assigned to anyone yet.</p>
                )}
                {allTasksStatus === 'ok' && allTasks.length > 0 && visibleAllTasks.length === 0 && (
                  <p className="tasks-muted">No tasks match the current filter.</p>
                )}
                {allTasksStatus === 'ok' && allTasks.length > 0 && visibleAllTasks.length > 0 && (
                  <div className="tasks-list">
                    {visibleAllTasks.map((task) => (
                      <div key={task.id} className={`tasks-item${task.is_done ? ' done' : ''}`}>
                        <span className="tasks-item-main">
                          <span className="tasks-item-title">
                            {task.title}
                            <span className="tasks-item-assignee">, {assigneeName(task)}</span>
                          </span>
                          {task.description && <span className="tasks-item-description">{task.description}</span>}
                          {task.start_at && (
                            <span className="tasks-item-time">
                              {new Date(task.start_at).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                              {task.end_at && (
                                <> - {new Date(task.end_at).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</>
                              )}
                            </span>
                          )}
                        </span>
                        {task.due_date && (
                          <span className="tasks-due">
                            Due {new Date(task.due_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                        <button
                          type="button"
                          className="tasks-item-delete"
                          aria-label={`Delete ${task.title}`}
                          onClick={() => handleAdminDelete(task)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Same icon as Members.jsx's own Filter button — duplicated locally rather
// than imported, matching this codebase's established convention of not
// sharing small per-page components/helpers across files (e.g. requireAdmin
// is duplicated per backend route file, isValidEmailFormat likewise).
function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 4h16M6 11h10M9.5 18h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
