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
// ── 2026-08-16 rework ───────────────────────────────────────────────
// Two things this file's header used to say were deliberately out of
// scope are now IN scope, both per explicit feedback:
//
//  1. MULTI-DAY EVENTS ("I probably want to do it like Google Calendar
//     where it's like if maybe if it's like a multiple day event... it
//     has like a start date and end date too, I mean those can be
//     optional though, but definitely keep the required as a start time
//     for the event"). This needed NO backend/schema change at all —
//     the events table already had an optional `end_at` TIMESTAMPTZ
//     (added 2026-08-12 for end TIMES), and a multi-day event is just
//     an end_at that lands on a later DATE than event_at. What changed
//     is entirely here: an optional end-date field on the add form, and
//     the day-grouping below now spreading one event across every day it
//     covers instead of only its start day.
//
//  2. MONTH / WEEK / DAY VIEWS ("make the button functional for the
//     today so like where it goes from like month to week today just
//     like Google Calendar does"). Week and Day share ONE time-grid
//     renderer (Day is simply the 1-column case of the 7-column week),
//     rather than two near-duplicate implementations that would drift.
//
// GET /portal/events still just returns the full flat list — this page
// does the "which events fall on which visible day" grouping entirely
// client-side rather than the backend needing month-range query params,
// since the event count here is small (an org's shared calendar, not a
// datacenter-scale schedule).

import { useEffect, useMemo, useRef, useState } from 'react';
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
// Midnight-local copy of a date — strips the time so two timestamps on
// the same calendar day compare equal.
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
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

// The Sunday on/before a given date, then the 7 days from there —
// week view's columns. Sunday-start matches the month grid's
// WEEKDAY_LABELS above, so the two views line up.
function buildWeekDays(d) {
  const start = startOfDay(d);
  start.setDate(start.getDate() - start.getDay());
  return Array.from({ length: 7 }, (_, i) =>
    new Date(start.getFullYear(), start.getMonth(), start.getDate() + i)
  );
}

// An event's end as a Date — falls back to its start for events with no
// end_at at all (the plain single-point-in-time case).
function eventEnd(ev) {
  return ev.end_at ? new Date(ev.end_at) : new Date(ev.event_at);
}

// True when an event covers more than one calendar day. These render in
// the all-day strip above the time grid in week/day view (a time grid
// has nowhere sensible to put a block that runs past midnight), and get
// a chip on every day they touch in month view.
function isMultiDay(ev) {
  return !sameDay(new Date(ev.event_at), eventEnd(ev));
}

// Every YYYY-MM-DD key an event touches, start day through end day
// inclusive. A single-day event returns exactly one key, so the
// month-grid grouping below is unchanged for the common case.
//
// The 366 guard is a safety net, not a real limit: without it, a bad
// end_at far in the future (a typo'd year, say) would spin this loop
// long enough to lock the page up. Capping it means a malformed event
// renders wrong rather than freezing the calendar.
function eventDayKeys(ev) {
  const cursor = startOfDay(new Date(ev.event_at));
  const endDay = startOfDay(eventEnd(ev));
  const keys = [];
  let guard = 0;
  while (cursor <= endDay && guard < 366) {
    keys.push(dateKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
    guard++;
  }
  return keys;
}

function formatTime(d) {
  return d.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit' });
}

// The human-readable "when" line for one event, shown in the day panel
// and in event blocks. Covers all three shapes an event can take:
// single point in time, same-day range, and multi-day range.
function formatEventRange(ev) {
  const start = new Date(ev.event_at);
  // An all-day event has timestamps only because the column needs them.
  // Showing "12:00 AM - 11:59 PM" would be technically true and useless.
  if (ev.all_day) {
    const end = ev.end_at ? eventEnd(ev) : start;
    if (sameDay(start, end)) return 'All day';
    const dayOpts = { month: 'short', day: 'numeric' };
    return `All day, ${start.toLocaleDateString(undefined, dayOpts)} to ${end.toLocaleDateString(undefined, dayOpts)}`;
  }
  if (!ev.end_at) return formatTime(start);

  const end = eventEnd(ev);
  if (sameDay(start, end)) return `${formatTime(start)} - ${formatTime(end)}`;

  const dayOpts = { month: 'short', day: 'numeric' };
  return `${start.toLocaleDateString(undefined, dayOpts)}, ${formatTime(start)} - ${end.toLocaleDateString(undefined, dayOpts)}, ${formatTime(end)}`;
}

// ─── Repeat rules ────────────────────────────────────────────────────────
//
// The shapes here match the backend's recurrence.js exactly. The preset
// list is Google Calendar's, because that is what everybody on the board
// already knows how to read: the options are phrased in terms of the day
// you are adding the event to ("Weekly on Tuesday"), not in the abstract.

const DAY_CODES = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
const DAY_LABELS = { SU: 'S', MO: 'M', TU: 'T', WE: 'W', TH: 'T', FR: 'F', SA: 'S' };
const DAY_FULL = {
  SU: 'Sunday', MO: 'Monday', TU: 'Tuesday', WE: 'Wednesday',
  TH: 'Thursday', FR: 'Friday', SA: 'Saturday',
};
const WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR'];

function repeatPresets(day) {
  const code = DAY_CODES[day.getDay()];
  const monthDay = day.getDate();
  const monthName = day.toLocaleDateString(undefined, { month: 'long' });
  return [
    { key: 'none', label: 'Does not repeat', rule: null },
    { key: 'daily', label: 'Daily', rule: { freq: 'DAILY', interval: 1, end: { type: 'never' } } },
    {
      key: 'weekly',
      label: `Weekly on ${DAY_FULL[code]}`,
      rule: { freq: 'WEEKLY', interval: 1, byDay: [code], end: { type: 'never' } },
    },
    {
      key: 'monthly',
      label: `Monthly on day ${monthDay}`,
      rule: { freq: 'MONTHLY', interval: 1, end: { type: 'never' } },
    },
    {
      key: 'yearly',
      label: `Annually on ${monthName} ${monthDay}`,
      rule: { freq: 'YEARLY', interval: 1, end: { type: 'never' } },
    },
    {
      key: 'weekdays',
      label: 'Every weekday (Monday to Friday)',
      rule: { freq: 'WEEKLY', interval: 1, byDay: WEEKDAYS, end: { type: 'never' } },
    },
    { key: 'custom', label: 'Custom...', rule: null },
  ];
}

// The same sentence the backend produces, built here so the form can
// show what a custom rule means before it is saved.
function describeRule(rule) {
  if (!rule) return '';
  const unit = { DAILY: 'day', WEEKLY: 'week', MONTHLY: 'month', YEARLY: 'year' }[rule.freq];
  let text = rule.interval === 1 ? `Every ${unit}` : `Every ${rule.interval} ${unit}s`;
  if (rule.freq === 'WEEKLY' && rule.byDay?.length) {
    const isWeekdays = rule.byDay.length === 5 && WEEKDAYS.every((d) => rule.byDay.includes(d));
    text = isWeekdays && rule.interval === 1
      ? 'Every weekday'
      : `${text} on ${rule.byDay.map((d) => DAY_FULL[d]).join(', ')}`;
  }
  if (rule.end?.type === 'on') text += `, until ${rule.end.until}`;
  if (rule.end?.type === 'after') text += `, ${rule.end.count} times`;
  return text;
}

function toDateValue(day) {
  return `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
}

const MAX_CHIPS_PER_DAY = 3;

// Time-grid geometry for week/day view. One hour = HOUR_HEIGHT px, so
// the full day column is 24 * HOUR_HEIGHT tall and an event's position
// is just (minutes since midnight / 60) * HOUR_HEIGHT. Kept here as
// constants rather than in CSS because the JS needs the same numbers to
// place the blocks — one source of truth beats a magic number in two
// files that can silently drift.
const HOUR_HEIGHT = 48;
const MIN_BLOCK_HEIGHT = 22;

export default function CalendarPage() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);

  const today = useMemo(() => new Date(), []);
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth()); // 0-indexed
  const [selectedDay, setSelectedDay] = useState(today);
  // 'month' | 'week' | 'day' — added 2026-08-16. Month stays the default
  // so the page opens exactly as it did before this existed.
  const [view, setView] = useState('month');

  const [status, setStatus] = useState('loading'); // loading | ok | error
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');
  // The backend caps how many occurrences one request can return, and
  // says so. Without showing it, a calendar that had quietly reached that
  // cap would look complete. Added 2026-08-26.
  const [truncated, setTruncated] = useState(false);

  const [showAddForm, setShowAddForm] = useState(false);
  const [addTitle, setAddTitle] = useState('');
  const [addTime, setAddTime] = useState('12:00');
  // Optional end time — added 2026-08-12 per explicit feedback ("I don't
  // see an end date for adding events... there's not, like, end time").
  // Stays blank by default (empty string, not a pre-filled time) so most
  // events stay the simple single-point-in-time case unless an admin
  // deliberately fills this in.
  const [addEndTime, setAddEndTime] = useState('');
  // Optional end DATE — added 2026-08-16 for multi-day events. Blank
  // means "ends the same day it starts," which is every event that
  // existed before this field did. The start date is always the day
  // you clicked in the grid (shown in the panel heading above the
  // form), which is why there's no start-date input to go with this.
  const [addEndDate, setAddEndDate] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [addLocation, setAddLocation] = useState('');
  const [addAllDay, setAddAllDay] = useState(false);
  // Which preset is chosen. 'custom' means the panel below is open and
  // customRule is the real answer.
  const [addRepeat, setAddRepeat] = useState('none');
  const [customRule, setCustomRule] = useState(null);
  const [showCustom, setShowCustom] = useState(false);
  // Working copy for the custom panel, so cancelling leaves the saved
  // rule alone instead of half-editing it.
  const [draftRule, setDraftRule] = useState({
    freq: 'WEEKLY', interval: 1, byDay: [], end: { type: 'never', until: '', count: 10 },
  });
  // A repeating event is one row across many days, so deleting needs to
  // ask which. This holds the occurrence currently being asked about.
  const [deleteChoice, setDeleteChoice] = useState(null);
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
        setTruncated(Boolean(data?.truncated));
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
  //
  // As of 2026-08-16 a multi-day event is pushed onto EVERY day it
  // spans (see eventDayKeys above), so a Mar 3–6 event shows up on the
  // 3rd, 4th, 5th and 6th rather than only on the 3rd. That's the
  // display Kev picked when asked ("show on every day it spans"), and
  // it means no cell can silently hide an event that's actually running
  // that day.
  const eventsByDay = useMemo(() => {
    const map = new Map();
    for (const ev of events) {
      for (const key of eventDayKeys(ev)) {
        if (!map.has(key)) map.set(key, []);
        map.get(key).push(ev);
      }
    }
    for (const list of map.values()) {
      list.sort((a, b) => new Date(a.event_at) - new Date(b.event_at));
    }
    return map;
  }, [events]);

  const gridDays = useMemo(() => buildGridDays(viewYear, viewMonth), [viewYear, viewMonth]);
  const weekDays = useMemo(() => buildWeekDays(selectedDay), [selectedDay]);
  const selectedDayEvents = eventsByDay.get(dateKey(selectedDay)) || [];

  // The days the current view's time grid covers: all 7 for week view,
  // just the selected one for day view. Both feed the same renderer.
  const timeGridDays = view === 'week' ? weekDays : [selectedDay];

  // What prev/next step by, and what the heading says, both depend on
  // the active view — same as Google Calendar, where the arrows move a
  // month in month view but a week in week view.
  function goPrevNext(direction) {
    if (view === 'month') {
      // Using Date's own month-overflow rollover (month 12 -> next Jan,
      // month -1 -> previous Dec) rather than hand-rolled wraparound math.
      const next = new Date(viewYear, viewMonth + direction, 1);
      setViewYear(next.getFullYear());
      setViewMonth(next.getMonth());
      return;
    }
    const step = view === 'week' ? 7 : 1;
    const next = new Date(
      selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate() + step * direction
    );
    setSelectedDay(next);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  }

  function goToToday() {
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setSelectedDay(today);
  }

  function headingLabel() {
    if (view === 'month') return `${MONTH_LABELS[viewMonth]} ${viewYear}`;
    if (view === 'day') {
      return selectedDay.toLocaleDateString(undefined, {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
      });
    }
    // Week — "Mar 3 – 9, 2026", or spell out both months when the week
    // straddles a month/year boundary.
    const first = weekDays[0];
    const last = weekDays[6];
    const sameMonth = first.getMonth() === last.getMonth() && first.getFullYear() === last.getFullYear();
    if (sameMonth) {
      return `${MONTH_LABELS[first.getMonth()].slice(0, 3)} ${first.getDate()} - ${last.getDate()}, ${first.getFullYear()}`;
    }
    const f = first.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    const l = last.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    return `${f} - ${l}`;
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

    const [startHours, startMinutes] = addTime.split(':').map(Number);
    const startDate = new Date(
      selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate(),
      startHours || 0, startMinutes || 0
    );

    // Build the end timestamp from whichever of the two optional end
    // fields were filled in:
    //   end date + end time -> exactly that moment
    //   end date only       -> 11:59pm on that date (a multi-day event
    //                          with no stated finish time runs to the
    //                          end of its last day)
    //   end time only       -> that time on the SAME day as the start
    //                          (the pre-multi-day behavior, unchanged)
    //   neither             -> no end at all, single point in time
    let endDate = null;
    if (addEndDate) {
      const [y, m, d] = addEndDate.split('-').map(Number);
      if (addEndTime) {
        const [eh, em] = addEndTime.split(':').map(Number);
        endDate = new Date(y, m - 1, d, eh || 0, em || 0);
      } else {
        endDate = new Date(y, m - 1, d, 23, 59);
      }
    } else if (addEndTime) {
      const [eh, em] = addEndTime.split(':').map(Number);
      endDate = new Date(
        selectedDay.getFullYear(), selectedDay.getMonth(), selectedDay.getDate(),
        eh || 0, em || 0
      );
    }

    // Client-side sanity check before even hitting the network — same
    // rule the backend re-enforces (routes/portal.js's POST /events), but
    // catching it here avoids a round-trip for the common typo of
    // swapping start/end. Comparing full timestamps (not just the
    // time-of-day numbers it used to compare) is what makes this correct
    // for multi-day events: 9am Mar 6 IS after 5pm Mar 3.
    if (!addAllDay && endDate && endDate <= startDate) {
      setAddStatus('error');
      setAddError('The end must be after the start.');
      return;
    }
    if (addAllDay && addEndDate && addEndDate < toDateValue(selectedDay)) {
      setAddStatus('error');
      setAddError('The end date must be on or after the start date.');
      return;
    }

    const presets = repeatPresets(selectedDay);
    const recurrence = addRepeat === 'custom'
      ? customRule
      : (presets.find((p) => p.key === addRepeat)?.rule || null);

    try {
      await createEvent({
        title: addTitle,
        description: addDescription,
        location: addLocation,
        allDay: addAllDay,
        // All-day sends dates, not timestamps. The backend turns them
        // into the span of that day in the club's timezone; sending a
        // timestamp instead is what lands an event on the wrong day for
        // anyone whose clock is not UTC.
        eventAt: addAllDay ? toDateValue(selectedDay) : startDate.toISOString(),
        endAt: addAllDay
          ? (addEndDate || undefined)
          : (endDate ? endDate.toISOString() : undefined),
        recurrence,
      });
      setAddTitle('');
      setAddDescription('');
      setAddLocation('');
      setAddAllDay(false);
      setAddRepeat('none');
      setCustomRule(null);
      setShowCustom(false);
      setAddTime('12:00');
      setAddEndTime('');
      setAddEndDate('');
      setShowAddForm(false);
      setAddStatus('idle');
      loadEvents();
    } catch (err) {
      setAddStatus('error');
      setAddError(err.message || 'Could not add event.');
    }
  }

  async function handleDeleteEvent(ev, scope = 'all') {
    try {
      await deleteEvent(ev.id, { scope, date: ev.occurrence_date });
      setDeleteChoice(null);
      loadEvents();
    } catch (err) {
      setDeleteChoice(null);
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
            <button type="button" className="calendar-nav-btn" onClick={() => goPrevNext(-1)} aria-label="Previous">
              <ChevronLeftIcon />
            </button>
            <h1 className="calendar-month-heading">{headingLabel()}</h1>
            <button type="button" className="calendar-nav-btn" onClick={() => goPrevNext(1)} aria-label="Next">
              <ChevronRightIcon />
            </button>
          </div>
          <div className="calendar-toolbar-right">
            {/* Month/Week/Day switcher — added 2026-08-16. Sits next to
                Today, same as Google Calendar's own view controls. */}
            <div className="calendar-view-switch" role="group" aria-label="Calendar view">
              {['month', 'week', 'day'].map((v) => (
                <button
                  key={v}
                  type="button"
                  className={`calendar-view-btn${view === v ? ' active' : ''}`}
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                >
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </button>
              ))}
            </div>
            <button type="button" className="calendar-today-btn" onClick={goToToday}>Today</button>
          </div>
        </div>

        {status === 'error' && <p className="calendar-error">{error}</p>}
        {status === 'ok' && truncated && (
          <p className="calendar-notice">
            There are more repeating events than one view can show, so the furthest-out
            dates are not listed. Everything around today is here.
          </p>
        )}

        {view === 'month' && (
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
                        <span
                          key={ev.occurrence_id || ev.id}
                          className={`calendar-day-chip${isMultiDay(ev) ? ' multiday' : ''}`}
                        >
                          {ev.title}
                        </span>
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
        )}

        {(view === 'week' || view === 'day') && (
          <TimeGrid
            days={timeGridDays}
            eventsByDay={eventsByDay}
            today={today}
            selectedDay={selectedDay}
            onSelectDay={selectDay}
            showDayHeaders={view === 'week'}
          />
        )}

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
                maxLength={200}
              />
              {/* All day comes before the times because it decides
                  whether there are any. Leaving the time fields on
                  screen, greyed out, would just raise the question of
                  what they still do. */}
              <label className="calendar-checkbox">
                <input
                  type="checkbox"
                  checked={addAllDay}
                  onChange={(e) => setAddAllDay(e.target.checked)}
                />
                <span>All day</span>
              </label>

              {!addAllDay && (
                <>
                  <label className="calendar-time-field">
                    Start time
                    <input
                      type="time"
                      required
                      value={addTime}
                      onChange={(e) => setAddTime(e.target.value)}
                      className="calendar-input"
                    />
                  </label>
                  <label className="calendar-time-field">
                    End time (optional)
                    <input
                      type="time"
                      value={addEndTime}
                      onChange={(e) => setAddEndTime(e.target.value)}
                      className="calendar-input"
                    />
                  </label>
                </>
              )}

              {/* Multi-day: leave blank for a normal same-day event.
                  min is the start day, so the date picker itself can't
                  produce a backwards range. */}
              <label className="calendar-time-field">
                {addAllDay ? 'Last day (optional)' : 'End date (optional, for multi-day events)'}
                <input
                  type="date"
                  min={dateKey(selectedDay)}
                  value={addEndDate}
                  onChange={(e) => setAddEndDate(e.target.value)}
                  className="calendar-input"
                />
              </label>

              <label className="calendar-time-field">
                Repeat
                <select
                  className="calendar-input"
                  value={addRepeat}
                  onChange={(e) => {
                    const key = e.target.value;
                    setAddRepeat(key);
                    if (key === 'custom') {
                      // Seed the panel from the day being added to, so
                      // "repeats on" starts with the right box ticked.
                      setDraftRule((r) => ({
                        ...r,
                        byDay: r.byDay.length ? r.byDay : [DAY_CODES[selectedDay.getDay()]],
                      }));
                      setShowCustom(true);
                    } else {
                      setShowCustom(false);
                      setCustomRule(null);
                    }
                  }}
                >
                  {repeatPresets(selectedDay).map((preset) => (
                    <option key={preset.key} value={preset.key}>{preset.label}</option>
                  ))}
                </select>
              </label>

              {addRepeat === 'custom' && customRule && !showCustom && (
                <p className="calendar-repeat-summary">
                  {describeRule(customRule)}
                  {' '}
                  <button type="button" className="calendar-link-button" onClick={() => setShowCustom(true)}>
                    Change
                  </button>
                </p>
              )}

              {showCustom && (
                <div className="calendar-custom-repeat">
                  <div className="calendar-custom-row">
                    <span>Repeat every</span>
                    <input
                      type="number"
                      min="1"
                      max="365"
                      className="calendar-input calendar-input-num"
                      value={draftRule.interval}
                      onChange={(e) => setDraftRule((r) => ({ ...r, interval: Number(e.target.value) || 1 }))}
                    />
                    <select
                      className="calendar-input calendar-input-unit"
                      value={draftRule.freq}
                      onChange={(e) => setDraftRule((r) => ({ ...r, freq: e.target.value }))}
                    >
                      <option value="DAILY">{draftRule.interval === 1 ? 'day' : 'days'}</option>
                      <option value="WEEKLY">{draftRule.interval === 1 ? 'week' : 'weeks'}</option>
                      <option value="MONTHLY">{draftRule.interval === 1 ? 'month' : 'months'}</option>
                      <option value="YEARLY">{draftRule.interval === 1 ? 'year' : 'years'}</option>
                    </select>
                  </div>

                  {draftRule.freq === 'WEEKLY' && (
                    <div className="calendar-custom-row calendar-custom-days">
                      <span>Repeats on</span>
                      <div className="calendar-daypicker">
                        {DAY_CODES.map((code) => (
                          <button
                            key={code}
                            type="button"
                            /* aria-pressed rather than colour alone: the
                               labels are single letters and two of them
                               are "T", so the only thing distinguishing
                               Tuesday from Thursday is position. */
                            aria-pressed={draftRule.byDay.includes(code)}
                            aria-label={DAY_FULL[code]}
                            title={DAY_FULL[code]}
                            className={`calendar-day-toggle${draftRule.byDay.includes(code) ? ' on' : ''}`}
                            onClick={() => setDraftRule((r) => ({
                              ...r,
                              byDay: r.byDay.includes(code)
                                ? r.byDay.filter((d) => d !== code)
                                : DAY_CODES.filter((d) => d === code || r.byDay.includes(d)),
                            }))}
                          >
                            {DAY_LABELS[code]}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="calendar-custom-row calendar-custom-ends">
                    <span>Ends</span>
                    <div className="calendar-ends-options">
                      <label className="calendar-radio">
                        <input
                          type="radio"
                          name="repeat-ends"
                          checked={draftRule.end.type === 'never'}
                          onChange={() => setDraftRule((r) => ({ ...r, end: { ...r.end, type: 'never' } }))}
                        />
                        <span>Never</span>
                      </label>
                      <label className="calendar-radio">
                        <input
                          type="radio"
                          name="repeat-ends"
                          checked={draftRule.end.type === 'on'}
                          onChange={() => setDraftRule((r) => ({
                            ...r,
                            end: { ...r.end, type: 'on', until: r.end.until || dateKey(selectedDay) },
                          }))}
                        />
                        <span>On</span>
                        <input
                          type="date"
                          className="calendar-input calendar-input-inline"
                          min={dateKey(selectedDay)}
                          value={draftRule.end.until || ''}
                          onChange={(e) => setDraftRule((r) => ({
                            ...r, end: { ...r.end, type: 'on', until: e.target.value },
                          }))}
                        />
                      </label>
                      <label className="calendar-radio">
                        <input
                          type="radio"
                          name="repeat-ends"
                          checked={draftRule.end.type === 'after'}
                          onChange={() => setDraftRule((r) => ({ ...r, end: { ...r.end, type: 'after' } }))}
                        />
                        <span>After</span>
                        <input
                          type="number"
                          min="1"
                          max="750"
                          className="calendar-input calendar-input-num"
                          value={draftRule.end.count}
                          onChange={(e) => setDraftRule((r) => ({
                            ...r, end: { ...r.end, type: 'after', count: Number(e.target.value) || 1 },
                          }))}
                        />
                        <span>times</span>
                      </label>
                    </div>
                  </div>

                  <div className="calendar-custom-actions">
                    <button
                      type="button"
                      className="calendar-pill calendar-pill-sm"
                      onClick={() => {
                        const rule = {
                          freq: draftRule.freq,
                          interval: draftRule.interval,
                          byDay: draftRule.freq === 'WEEKLY'
                            ? (draftRule.byDay.length ? draftRule.byDay : [DAY_CODES[selectedDay.getDay()]])
                            : undefined,
                          end: draftRule.end.type === 'on'
                            ? { type: 'on', until: draftRule.end.until }
                            : draftRule.end.type === 'after'
                              ? { type: 'after', count: draftRule.end.count }
                              : { type: 'never' },
                        };
                        setCustomRule(rule);
                        setShowCustom(false);
                      }}
                    >
                      Done
                    </button>
                    <button
                      type="button"
                      className="calendar-link-button"
                      onClick={() => {
                        setShowCustom(false);
                        if (!customRule) setAddRepeat('none');
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              <input
                type="text"
                placeholder="Add location (optional)"
                value={addLocation}
                onChange={(e) => setAddLocation(e.target.value)}
                className="calendar-input"
                maxLength={200}
              />
              <input
                type="text"
                placeholder="Description (optional)"
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
                className="calendar-input"
                maxLength={4000}
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
                <div key={ev.occurrence_id || ev.id} className="calendar-event-item">
                  <div className="calendar-event-time">
                    {formatEventRange(ev)}
                  </div>
                  <div className="calendar-event-main">
                    <div className="calendar-event-title">
                      {ev.title}
                      {isMultiDay(ev) && <span className="calendar-event-badge">Multi-day</span>}
                    </div>
                    {ev.location && <p className="calendar-event-location">{ev.location}</p>}
                    {ev.recurrence_text && (
                      <p className="calendar-event-repeat">{ev.recurrence_text}</p>
                    )}
                    {ev.description && <p className="calendar-event-description">{ev.description}</p>}
                  </div>
                  {user?.is_admin && (
                    deleteChoice === (ev.occurrence_id || ev.id) ? (
                      /* A repeating event is one record standing for many
                         days, so "Delete" is ambiguous and has to be
                         asked rather than assumed. Inline rather than a
                         modal: the answer is two words and the event it
                         refers to should stay on screen while you pick. */
                      <div className="calendar-delete-choice">
                        <span className="calendar-delete-choice-label">Delete</span>
                        <button
                          type="button"
                          className="calendar-link-button"
                          onClick={() => handleDeleteEvent(ev, 'one')}
                        >
                          This event
                        </button>
                        <button
                          type="button"
                          className="calendar-link-button calendar-link-danger"
                          onClick={() => handleDeleteEvent(ev, 'all')}
                        >
                          All events
                        </button>
                        <button
                          type="button"
                          className="calendar-link-button"
                          onClick={() => setDeleteChoice(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        className="calendar-link-button"
                        onClick={() => {
                          if (ev.is_recurring) setDeleteChoice(ev.occurrence_id || ev.id);
                          else handleDeleteEvent(ev, 'all');
                        }}
                      >
                        Delete
                      </button>
                    )
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

// ─── Week / Day time grid ────────────────────────────────────────────────
//
// One renderer for both views — day view is just the 1-column case of
// the 7-column week, so there's a single implementation of hour rows,
// event placement and the all-day strip rather than two that drift.
//
// Multi-day events don't go in the hour grid at all. A block that runs
// past midnight has no honest position in a 24-hour column, so they get
// their own "all day / multi-day" strip pinned above it — the same
// solution Google Calendar uses.
function TimeGrid({ days, eventsByDay, today, selectedDay, onSelectDay, showDayHeaders }) {
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const scrollRef = useRef(null);

  // Open the grid at 7am rather than midnight. Without this the view
  // lands on a wall of empty early-morning hours and you'd have to
  // scroll every single time to reach the part of the day anything
  // actually happens in — same reason Google Calendar opens on the
  // morning instead of at 12 AM.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 7 * HOUR_HEIGHT;
  }, []);

  return (
    <div className={`calendar-timegrid${showDayHeaders ? ' week' : ' day'}`}>
      {showDayHeaders && (
        <div className="calendar-timegrid-header">
          <div className="calendar-timegrid-gutter-spacer" />
          {days.map((day) => (
            <button
              type="button"
              key={dateKey(day)}
              className={`calendar-timegrid-daylabel${sameDay(day, today) ? ' today' : ''}${sameDay(day, selectedDay) ? ' selected' : ''}`}
              onClick={() => onSelectDay(day)}
            >
              <span className="calendar-timegrid-dayname">{WEEKDAY_LABELS[day.getDay()]}</span>
              <span className="calendar-timegrid-daynum">{day.getDate()}</span>
            </button>
          ))}
        </div>
      )}

      {/* All-day / multi-day strip. Only rendered when something in
          view actually spans days, so a normal week doesn't carry an
          empty band across the top. */}
      {days.some((day) => (eventsByDay.get(dateKey(day)) || []).some(isMultiDay)) && (
        <div className="calendar-timegrid-allday">
          <div className="calendar-timegrid-gutter">All day</div>
          {days.map((day) => {
            const multi = (eventsByDay.get(dateKey(day)) || []).filter(isMultiDay);
            return (
              <div className="calendar-timegrid-allday-col" key={dateKey(day)}>
                {multi.map((ev) => (
                  <div key={ev.occurrence_id || ev.id} className="calendar-allday-block" title={ev.title}>
                    {ev.title}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}

      <div className="calendar-timegrid-scroll" ref={scrollRef}>
        <div className="calendar-timegrid-body" style={{ height: `${24 * HOUR_HEIGHT}px` }}>
          <div className="calendar-timegrid-gutter-col">
            {hours.map((h) => (
              <div className="calendar-timegrid-hourlabel" key={h} style={{ height: `${HOUR_HEIGHT}px` }}>
                {h === 0 ? '' : `${h % 12 === 0 ? 12 : h % 12} ${h < 12 ? 'AM' : 'PM'}`}
              </div>
            ))}
          </div>

          {days.map((day) => {
            // Single-day events only — the multi-day ones are already in
            // the strip above.
            const dayEvents = (eventsByDay.get(dateKey(day)) || []).filter((ev) => !isMultiDay(ev));
            return (
              <div
                className={`calendar-timegrid-col${sameDay(day, selectedDay) ? ' selected' : ''}`}
                key={dateKey(day)}
                onClick={() => onSelectDay(day)}
              >
                {hours.map((h) => (
                  <div className="calendar-timegrid-hourline" key={h} style={{ height: `${HOUR_HEIGHT}px` }} />
                ))}

                {dayEvents.map((ev) => {
                  const start = new Date(ev.event_at);
                  const end = eventEnd(ev);
                  const startMin = start.getHours() * 60 + start.getMinutes();
                  // An event with no end_at gets a nominal 45-minute
                  // block so it's still a visible, clickable band rather
                  // than a zero-height sliver.
                  const rawDuration = ev.end_at ? (end - start) / 60000 : 45;
                  const top = (startMin / 60) * HOUR_HEIGHT;
                  const height = Math.max((rawDuration / 60) * HOUR_HEIGHT, MIN_BLOCK_HEIGHT);
                  return (
                    <div
                      key={ev.occurrence_id || ev.id}
                      className="calendar-timegrid-block"
                      style={{ top: `${top}px`, height: `${height}px` }}
                      title={`${ev.title}, ${formatEventRange(ev)}`}
                    >
                      <span className="calendar-timegrid-block-time">{formatTime(start)}</span>
                      <span className="calendar-timegrid-block-title">{ev.title}</span>
                    </div>
                  );
                })}
              </div>
            );
          })}
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
