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

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  getCurrentUser,
  getMyTasks,
  createTask,
  setTaskDone,
  getAssignableMembers,
} from '../lib/api';
import './Tasks.css';

export default function TasksPage() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);

  const [status, setStatus] = useState('loading');
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [members, setMembers] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
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

      await createTask(
        title, description, Number(assignedTo),
        dueDate ? new Date(dueDate).toISOString() : undefined,
        startIso, endIso
      );
      setTitle('');
      setDescription('');
      setAssignedTo('');
      setDueDate('');
      setStartTime('');
      setEndTime('');
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

        {user?.is_admin && showAddForm && (
          <form onSubmit={handleAdd} className="tasks-inline-form">
            <input
              type="text"
              required
              placeholder="Task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="tasks-input"
            />
            <select
              required
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              className="tasks-input"
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
              className="tasks-input"
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
        {status === 'ok' && tasks.length > 0 && (
          <div className="tasks-list">
            {tasks.map((task) => {
              // "Overdue" = has a due date, that date has passed, and it's
              // not done yet — purely a display flag (a red due-date
              // label), there's no separate backend concept of overdue.
              const isOverdue = task.due_date && !task.is_done && new Date(task.due_date) < new Date();
              return (
                <label key={task.id} className={`tasks-item${task.is_done ? ' done' : ''}`}>
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
                          <> – {new Date(task.end_at).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}</>
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
