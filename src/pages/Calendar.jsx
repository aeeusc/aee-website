// src/pages/Calendar.jsx
//
// The Calendar/Tasks rework, 2026-08-11 — Calendar became its own full
// month-grid page (Google-Calendar-style: a real month grid you can
// click a day on, add/see events for that day, and navigate month to
// month), reached from the Portal's Calendar tile/rail-item — same
// "became a real subpage" pattern Members/Settings/Dashboard/Send
// Newsletter already went through (see Portal.jsx's SECTIONS array).
// Before this it was a small quarter-width "upcoming events" list
// crammed into a Portal quadrant alongside Tasks.
//
// Explicit scope decision (per Kev, when this rework was scoped):
// Tasks stayed OUT of this page entirely — no due-date tiles/badges on
// the calendar grid, no merging the two lists. Tasks kept their own
// separate panel on the Portal and only gained an optional due-date
// field there (see Portal.jsx's TasksPanel). This page is Calendar/
// events only.
//
// Also explicit: event creation/deletion stayed admin-only, same as
// before the rework — regular members can view the calendar and every
// event on it, but the "+" add-event control and each event's delete
// button only render for `user.is_admin`.
//
// Kept deliberately simple, consistent with how routes/portal.js's
// events table/endpoints were already scoped before this rework: no
// recurring events, no multi-day events (a single event_at timestamp
// per event, same as before), no drag-to-reschedule. GET /portal/events
// still just returns the full flat list — this page does the "which
// events fall on which visible day" grouping entirely client-side
// rather than the backend needing month-range query params, since the
// event count here is small (an org's shared calendar, not a
// datacenter-scale schedule).

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, getEvents, createEvent, deleteEvent } from '../lib/api';
import './Calendar.css';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_LABELS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// Local-date (not UTC) YYYY-MM-DD key — every date comparison on this
// page goes through this, so "which day is this event on" always means
// "in the viewer's own timezone," matching what a wall calendar means.
function dateKey(d) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function sameDay(a, b) {
  return dateKey(a) === dateKey(b);
}

// Builds the 6-week (42-cell) grid for a given year/month, starting on
// the Sunday on/before the 1st — always 42 cells (not a variable 35/42)
// so the grid's height never jumps between months, matching how Google
// Calendar's month view stays a fixed size.
function buildGridDays(year, month) {
  const firstOfMonth = new Date(year, month, 1);
  const startWeekday = firstOfMonth.getDay();
  const days = [];
  for (let i = 0; i < 42; i++) {
    days.push(new Date(year, month, 1 - startWeekday + i));
  }
  return days;
}

const MAX_CHIPS_PER_DAY = 3;

export default function CalendarPage() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);

  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDay, setSelectedDay] = useState(today);

  const [status, setStatus] = useState('loading'); // loading | ok | error
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  const [showAddForm, setShowAddForm] = useState(false);
  const [addTitle, setAddTitle] = useState('');
  const [addTime, setAddTime] = useState('12:00');
  const [addDescription, setAddDescription] = useState('');
  const [addStatus, setAddStatus] = useState('idle'); // idle | submitting | error
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

  useEffect(() => {
    if (authCheck === 'ok') loadEvents();
  }, [authCheck]);

  // dateKey -> events[] for the events actually on screen — recomputed
  // whenever the event list changes, not just when the month changes,
  // so grouping stays correct across the visible month's own days AND
  // the dimmed lead-in/trail-off days from neighboring months.
  const eventsByDay = useMemo(() => {
    const map = new Map();
    for (const ev of events) {
      const key = dateKey(new Date(ev.event_at));
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(ev);
    }
    for (const list of map.values()) {
      list.sort((a, b) => new Date(a.event_at) - new Date(b.event_at));
    }
    return map;
  }, [events]);

  const gridDays = useMemo(() => buildGridDays(viewYear, viewMonth), [viewYear, viewMonth]);
  const selectedDayEvents = eventsByDay.get(dateKey(selectedDay)) || [];

  function goToMonth(offset) {
    // Using Date's own month-overflow rollover (month 12 -> next Jan,
    // month -1 -> previous Dec) rather than hand-rolled wraparound math.
    const next = new Date(viewYear, viewMonth + offset, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  function goToToday() {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedDay(today);
  }

  function selectDay(day) {
    setSelectedDay(day);
    setShowAddForm(false);
    setAddStatus('idle');
    setAddError('');
    // Clicking a dimmed lead-in/trail-off day (from the previous/next
    // month) also navigates the grid to that day's month — same as
    // clicking a greyed-out adjacent-month day in Google Calendar jumps
    // you there, rather than leaving the grid showing a month that
    // doesn't contain the day you just selected.
    if (day.getMonth() !== viewMonth || day.getFullYear() !== viewYear) {
      setViewYear(day.getFullYear());
      setViewMonth(day.getMonth());
    }
  }

  async function handleAddEvent(e) {
    e.preventDefault();
    setAddStatus('submitting');
    setAddError('');
    try {
      const [hours, minutes] = addTime.split(':').map(Number);
      const eventDate = new Date(
        selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate(),
        hours || 0, minutes || 0
      );
      await createEvent(addTitle, addDescription, eventDate.toISOString());
      setAddTitle('');
      setAddDescription('');
      setAddTime('12:00');
      setShowAddForm(false);
      setAddStatus('idle');
      loadEvents();
    } catch (err) {
      setAddStatus('error');
      setAddError(err.message || 'Could not add event.');
    }
  }

  async function handleDeleteEvent(id) {
    try {
      await deleteEvent(id);
      loadEvents();
    } catch (err) {
      setAddStatus('error');
      setAddError(err.message || 'Could not delete event.');
    }
  }

  if (authCheck === 'checking') {
    return <div className="calendar-page" />;
  }

  if (authCheck === 'denied') {
    return (
      <div className="calendar-page calendar-denied">
        <div className="calendar-denied-card">
          <h1>Please log in</h1>
          <p>You need to be logged in to view the calendar.</p>
          <Link to="/login" className="calendar-pill">Go to Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="calendar-page">
      <header className="calendar-header">
        <Link to="/" className="calendar-logo">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AEE logo" />
          <span>AEE at USC</span>
        </Link>
        <Link to="/portal" className="calendar-back-link">← Back to Member Portal</Link>
        <div className="calendar-header-spacer" />
      </header>

      <div className="calendar-body">
        <div className="calendar-toolbar">
          <div className="calendar-nav">
            <button type="button" className="calendar-nav-btn" onClick={() => goToMonth(-1)} aria-label="Previous month">
              <ChevronLeftIcon />
            </button>
            <h1 className="calendar-month-heading">{MONTH_LABELS[viewMonth]} {viewYear}</h1>
            <button type="button" className="calendar-nav-btn" onClick={() => goToMonth(1)} aria-label="Next month">
              <ChevronRightIcon />
            </button>
          </div>
          <button type="button" className="calendar-today-btn" onClick={goToToday}>Today</button>
        </div>

        {status === 'error' && <p className="calendar-error">{error}</p>}

        <div className="calendar-grid">
          <div className="calendar-weekday-row">
            {WEEKDAY_LABELS.map((label) => (
              <div key={label} className="calendar-weekday">{label}</div>
            ))}
          </div>
          <div className="calendar-day-grid">
            {gridDays.map((day) => {
              const key = dateKey(day);
              const dayEvents = eventsByDay.get(key) || [];
              const isCurrentMonth = day.getMonth() === viewMonth;
              const isToday = sameDay(day, today);
              const isSelected = sameDay(day, selectedDay);
              const overflow = dayEvents.length - MAX_CHIPS_PER_DAY;
              return (
                <button
                  type="button"
                  key={key}
                  className={`calendar-day${isCurrentMonth ? '' : ' outside'}${isToday ? ' today' : ''}${isSelected ? ' selected' : ''}`}
                  onClick={() => selectDay(day)}
                >
                  <span className="calendar-day-number">{day.getDate()}</span>
                  <span className="calendar-day-chips">
                    {dayEvents.slice(0, MAX_CHIPS_PER_DAY).map((ev) => (
                      <span key={ev.id} className="calendar-day-chip">{ev.title}</span>
                    ))}
                    {overflow > 0 && (
                      <span className="calendar-day-chip calendar-day-chip-more">+{overflow} more</span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="calendar-content calendar-day-panel">
          <div className="calendar-day-panel-header">
            <h2>
              {selectedDay.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
            {user?.is_admin && (
              <button
                type="button"
                className="calendar-panel-add"
                onClick={() => setShowAddForm((v) => !v)}
                aria-label="Add event"
              >
                {showAddForm ? '×' : '+'}
              </button>
            )}
          </div>

          {user?.is_admin && showAddForm && (
            <form onSubmit={handleAddEvent} className="calendar-inline-form">
              <input
                type="text"
                required
                placeholder="Event title"
                value={addTitle}
                onChange={(e) => setAddTitle(e.target.value)}
                className="calendar-input"
              />
              <input
                type="time"
                required
                value={addTime}
                onChange={(e) => setAddTime(e.target.value)}
                className="calendar-input"
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
                className="calendar-input"
              />
              {addStatus === 'error' && <p className="calendar-error calendar-error-sm">{addError}</p>}
              <button type="submit" disabled={addStatus === 'submitting'} className="calendar-pill calendar-pill-sm">
                {addStatus === 'submitting' ? 'Adding…' : 'Add Event'}
              </button>
            </form>
          )}

          {status === 'loading' && <p className="calendar-muted">Loading…</p>}
          {status === 'ok' && selectedDayEvents.length === 0 && (
            <p className="calendar-muted">No events on this day.</p>
          )}
          {status === 'ok' && selectedDayEvents.length > 0 && (
            <div className="calendar-event-list">
              {selectedDayEvents.map((ev) => (
                <div key={ev.id} className="calendar-event-item">
                  <div className="calendar-event-time">
                    {new Date(ev.event_at).toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' })}
                  </div>
                  <div className="calendar-event-main">
                    <div className="calendar-event-title">{ev.title}</div>
                    {ev.description && <p className="calendar-event-description">{ev.description}</p>}
                  </div>
                  {user?.is_admin && (
                    <button
                      type="button"
                      className="calendar-link-button"
                      onClick={() => handleDeleteEvent(ev.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M11 3.5L5.5 9l5.5 5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M7 3.5L12.5 9 7 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}