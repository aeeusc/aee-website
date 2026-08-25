// src/pages/Newsletter.jsx
//
// The member-facing Newsletter archive became its own standalone page
// 2026-08-12, per explicit feedback: "we need to get a... the newsletter
// page functioning, so we'll have a... redirect to that, have a subpage,
// and then have what I'm envisioning right now is just padding on the
// left or right. So a good chunk of space, and then it'll just go down
// from newest to oldest. And then maybe you could also filter as well
// with a little little button. And then, yes, see the newsletters, and
// then you could click on them, and it'll... bring you to a sub subpage
// where you can read more on the info."
//
// Replaces the small in-page "Newsletter" tab that used to render right
// inside Portal.jsx (see NewsletterArchive there, now removed) — same
// "became a real subpage" pattern Members/Settings/Dashboard/Calendar/
// Org Chart/Tasks all went through (see Portal.jsx's SECTIONS array).
//
// ── The bookstack (2026-08-24) ───────────────────────────────────────
//
// The plain list of rows this page used to render is gone, replaced by a
// stack of books lying flat — newest on top, the way a stack actually
// accumulates. Kev's spec, with his own sketch: "a vertical bookstack
// where it'll have the names of the newsletters/their titles on the book
// showing horizontally on the bookback, and then when you click it,
// it'll redirect you to the newsletter like it shows now."
//
// Two things separate this from the reference sites he sent (which stand
// their books upright on a shelf, spines rotated 90°):
//
//   1. The books lie FLAT and the titles read left-to-right. No rotated
//      text, so a long subject line is still scannable at a glance —
//      which matters here because these subjects are sentences, not
//      book titles.
//   2. Hovering a book slides it LEFT, out of the stack, "as if a person
//      were in the process of taking a book away from the stack". Only
//      the hovered book moves; the rest of the stack holds still.
//
// The preview card that appears alongside is modelled on the reference:
// date top-left (abbreviated month — "Nov 11, 2026"), title in bold
// under it, a short description, then a button through to the full
// edition. Clicking the book itself does the same thing, so the button
// is a target for people who read the card first rather than a required
// step.
//
// Touch devices have no hover, so the first tap opens the card and a
// second tap (on the book or its button) opens the newsletter — Kev's
// explicit choice when asked. See handleBookClick below.
//
// No backend changes were needed for any of this — GET /newsletter/
// archive already returns every send's id/subject/message/sent_at,
// session-gated to any logged-in member (not admin-only), which is
// everything the stack, the cards and the detail page need.
//
// Requires an active session, same pattern as Calendar.jsx/Tasks.jsx.

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, getNewsletterArchive } from '../lib/api';
import './Newsletter.css';

// Spine colours. Kev: "different colors, but in the limited range of
// black, white, and navy tonal family so there's a variety and it does
// not get repetitive."
//
// Each entry carries all four surfaces of the book rather than one
// colour plus filters, because a spine can be near-black OR near-white
// here and no single darken/lighten rule flatters both:
//
//   spine - the face you read the title on
//   edge  - the right-hand end, turned away from the light
//   top   - the top face (only the topmost book shows one)
//   ink   - title colour; flips to dark on the pale spines
//   band  - the two hairlines across the spine, like a hardback's raised
//           bands; also has to flip with the spine
//   paper - the page block at the right-hand end. Real books are not
//           white inside; the slight yellow is most of what makes the
//           end read as paper rather than as another painted surface.
//           Varied a little per book so the stack does not look like one
//           extruded object.
const SPINES = [
  { spine: '#182032', edge: '#04070F', top: '#171D2C', ink: '#F4F6FA', band: 'rgba(255,255,255,.18)', paper: '#E7E0CE' },
  { spine: '#1F3160', edge: '#080D1E', top: '#1C2848', ink: '#F4F6FA', band: 'rgba(255,255,255,.18)', paper: '#EFE9DA' },
  { spine: '#F4F6FA', edge: '#C3CEDC', top: '#FFFFFF', ink: '#182032', band: 'rgba(24,32,50,.20)', paper: '#F2EDE1' },
  { spine: '#1C3F94', edge: '#0D1528', top: '#24325A', ink: '#F4F6FA', band: 'rgba(255,255,255,.18)', paper: '#E3DCC8' },
  { spine: '#1A1F2B', edge: '#10141C', top: '#282F3F', ink: '#F4F6FA', band: 'rgba(255,255,255,.16)', paper: '#EDE7D7' },
  { spine: '#1D2B52', edge: '#131E3C', top: '#2C3E6E', ink: '#F4F6FA', band: 'rgba(255,255,255,.20)', paper: '#E9E2D0' },
  { spine: '#F4F6FA', edge: '#AFBCCC', top: '#F4F6FA', ink: '#182032', band: 'rgba(24,32,50,.18)', paper: '#F0EBDE' },
  { spine: '#080D1C', edge: '#03060E', top: '#141A2E', ink: '#F4F6FA', band: 'rgba(255,255,255,.15)', paper: '#E5DECB' },
  { spine: '#2A3A63', edge: '#1D294A', top: '#3B4E7E', ink: '#F4F6FA', band: 'rgba(255,255,255,.20)', paper: '#EEE8D8' },
  { spine: 'rgba(198,228,255,.92)', edge: '#9BAABF', top: '#DFE7F1', ink: '#182032', band: 'rgba(24,32,50,.16)', paper: '#F1ECE0' },
];

// Books are as thick as they have something to say — a long newsletter
// gets a fatter spine. Not decoration for its own sake: it makes the
// stack look like real books rather than a striped bar chart, and the
// variation carries a little real information for free.
const MIN_THICKNESS = 44;
const MAX_THICKNESS = 70;
const THIN_AT = 300;   // chars — anything shorter is as thin as it gets
const THICK_AT = 3200; // chars — anything longer is as thick as it gets

function thicknessFor(message) {
  const length = (message || '').trim().length;
  const ratio = Math.min(1, Math.max(0, (length - THIN_AT) / (THICK_AT - THIN_AT)));
  return MIN_THICKNESS + Math.round(ratio * (MAX_THICKNESS - MIN_THICKNESS));
}

// Deterministic hash of a send's id. Keyed off the ID rather than the
// position in the list on purpose: filtering the archive changes which
// books are on screen, and colours that reshuffled on every keystroke
// would make the search box feel broken.
function hashId(id) {
  const text = String(id);
  let hash = 0;
  for (let i = 0; i < text.length; i += 1) {
    hash = (hash * 31 + text.charCodeAt(i)) % 1000003;
  }
  return hash;
}

// Plain-text preview of a send's body for the hover card — the full body
// (which can be long) only renders on the detail subpage.
const PREVIEW_LENGTH = 135;
function previewText(message) {
  if (!message) return '';
  const trimmed = message.trim().replace(/\s+/g, ' ');
  return trimmed.length > PREVIEW_LENGTH ? `${trimmed.slice(0, PREVIEW_LENGTH)}…` : trimmed;
}

// "Nov 11, 2026" — Kev's format, spelled out explicitly. Locale is
// pinned to en-US rather than left to the browser because the
// abbreviated-month shape IS the requirement here; a visitor with a
// different locale would otherwise get 11.11.2026 or 2026年11月11日.
function formatSentDate(value) {
  return new Date(value).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

export default function NewsletterPage() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [status, setStatus] = useState('loading'); // loading | ok | error
  const [sends, setSends] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState(null);
  const navigate = useNavigate();

  // How the most recent press on a book arrived — 'mouse', 'touch' or
  // 'pen'. This is what decides whether a click opens the card or goes
  // straight through to the newsletter.
  //
  // The obvious alternative, matchMedia('(hover: hover)'), asks the
  // wrong question. It describes the DEVICE, and plenty of devices
  // honestly answer "yes" while the person is using a finger — a
  // touchscreen laptop, a tablet with a keyboard case, a phone with a
  // mouse paired. Those users would get the desktop behaviour (tap =
  // navigate) and never see a preview card at all. pointerType describes
  // the INTERACTION that actually just happened, which is the thing we
  // need to branch on.
  const lastPointerType = useRef('mouse');

  // Which book a finger has already opened. Tracked separately from
  // openId — which is ordinary state driven by hover and focus as well —
  // because the tap flow must not depend on the hover state machine at
  // all. It briefly did, and the bug was invisible from the code: a stray
  // pointerenter (Chromium keeps a virtual cursor parked wherever the
  // last click landed, and fires an enter for whatever renders under it
  // on the next page) could mark a book open before it was ever touched,
  // and then the first tap read as the second one and navigated away.
  // This ref only ever changes in response to a real touch.
  const touchOpenedId = useRef(null);

  // ── Scroll-to-select ────────────────────────────────────────────────
  // Kev: "make it so you could also scroll on PC to, like, select. Like,
  // what we do with the e board." Same idea as the homepage board
  // carousel (see Board in Home.jsx): the wheel moves a selection rather
  // than the page, and the selected book slides out with its card.
  //
  // Two things had to be got right that the board does not have to worry
  // about, because the board is one fixed-height section and this is a
  // list that can be longer than the screen:
  //
  //   1. The page must still be scrollable. Capturing every wheel event
  //      over a tall stack would trap the reader on this page. Solved the
  //      same way the board solves it — only a narrow centre zone over
  //      the spines captures; the margins either side scroll normally.
  //
  //   2. The capture RELEASES at the ends. When the selection is already
  //      on the last book and you keep scrolling down, preventDefault is
  //      not called at all, so the wheel goes back to the page and the
  //      reader carries on past the stack. Without that the stack is a
  //      roach motel.
  const stackRef = useRef(null);
  const hitzoneRef = useRef(null);
  const zoneRef = useRef({ left: 0, right: Infinity });
  const wheelAccumRef = useRef(0);
  const drainingRef = useRef(false);
  // Set when the wheel moves the selection, cleared by a real mouse
  // move. Without it, scrolling the selection past the book the cursor
  // happens to be resting on would immediately snap back the moment the
  // page shifted under the pointer and fired a stray enter event.
  const suppressHoverRef = useRef(false);
  // Where the pointer was when the wheel last drove the selection.
  // Needed because "the mouse moved" cannot be inferred from a
  // pointermove event alone: after scrollIntoView shifts the page,
  // Chromium fires a synthetic pointermove at the UNCHANGED cursor
  // position so hover state can be recalculated for whatever is now
  // underneath. Treating that as a real move handed control straight
  // back to hover on every step, so the selection snapped to whichever
  // book had slid under the stationary cursor and refused to advance
  // past it. Comparing coordinates tells the two apart.
  const lastPointRef = useRef({ x: null, y: null });

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (data?.user) {
          setAuthCheck('ok');
        } else {
          setAuthCheck('denied');
        }
      })
      .catch(() => setAuthCheck('denied'));
  }, []);

  // Send a logged-out visitor straight to the login page with a return
  // ticket, rather than showing them a wall they have to click past.
  // The public site's footer links here directly ("when people click
  // newsletter... they have to log in" and then land on the members'
  // list), so this IS the entry point for most people who arrive here
  // without a session. replace: true keeps the archive out of history,
  // so Back from the login page goes where they actually came from.
  useEffect(() => {
    if (authCheck === 'denied') navigate('/login?next=/newsletter', { replace: true });
  }, [authCheck, navigate]);

  useEffect(() => {
    if (authCheck !== 'ok') return;
    getNewsletterArchive()
      .then((data) => {
        setSends(data?.sends || []);
        setStatus('ok');
      })
      .catch((err) => {
        setError(err.message || 'Could not load the newsletter archive.');
        setStatus('error');
      });
  }, [authCheck]);

  // Client-side filter by subject (and body, as a bonus) — kept simple
  // since there are no categories/tags in the newsletter_sends schema to
  // filter by; a search box is the most useful "filter" for a flat list
  // like this. Already-newest-first from the backend, so filtering never
  // needs to re-sort.
  const filteredSends = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sends;
    return sends.filter(
      (s) => s.subject.toLowerCase().includes(q) || s.message.toLowerCase().includes(q)
    );
  }, [sends, query]);

  // Attach a spine, a thickness and a small horizontal nudge to each
  // send. The nudge (0–9px) is what keeps the stack from looking
  // machine-aligned — nobody stacks books to the pixel.
  const books = useMemo(() => {
    let previousSpine = -1;
    return filteredSends.map((send) => {
      const hash = hashId(send.id);
      let spineIndex = hash % SPINES.length;
      // Two identical spines touching read as one very thick book, so
      // nudge the second one along. Only ever compares with the
      // immediate neighbour, so the colour stays stable for everything
      // that isn't in a collision.
      if (spineIndex === previousSpine) spineIndex = (spineIndex + 1) % SPINES.length;
      previousSpine = spineIndex;

      return {
        send,
        colors: SPINES[spineIndex],
        thickness: thicknessFor(send.message),
        nudge: hash % 10,
      };
    });
  }, [filteredSends]);

  // Close whatever is open when the list underneath changes — otherwise
  // typing in the search box can leave a card floating next to a book
  // that has been filtered away.
  useEffect(() => { setOpenId(null); }, [query]);

  // Live copies for the wheel listener, which is bound once and must not
  // be re-bound on every selection change (the board carousel used to
  // re-bind its keyboard listener per step; see Home.jsx).
  const booksRef = useRef(books);
  booksRef.current = books;
  const openIdRef = useRef(openId);
  openIdRef.current = openId;

  // Cached zone bounds. Measured on mount and on resize rather than per
  // wheel event — reading getBoundingClientRect inside a wheel handler
  // forces a synchronous layout flush on every one of the 60–120 events
  // a trackpad emits per second, which is precisely the bug that made
  // the homepage board feel heavy.
  useEffect(() => {
    const hitzone = hitzoneRef.current;
    if (!hitzone) return undefined;
    function measure() {
      const r = hitzone.getBoundingClientRect();
      zoneRef.current = { left: r.left, right: r.right };
    }
    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, [status]);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return undefined;

    // Same tuning as the board carousel: an ordinary notch takes a few
    // events to cross the threshold, a hard flick crosses it several
    // times and queues several steps.
    const STEP_THRESHOLD = 120;
    const STEP_INTERVAL_MS = 90;

    function indexOfOpen() {
      return booksRef.current.findIndex((b) => b.send.id === openIdRef.current);
    }

    // Can the selection actually move that way? This is what decides
    // whether the wheel belongs to the stack or to the page.
    function canStep(direction) {
      const list = booksRef.current;
      if (list.length === 0) return false;
      const i = indexOfOpen();
      // Nothing selected yet: scrolling DOWN picks up the top book,
      // scrolling up is left to the page.
      if (i === -1) return direction > 0;
      const next = i + direction;
      return next >= 0 && next < list.length;
    }

    function step(direction) {
      const list = booksRef.current;
      const i = indexOfOpen();
      const next = i === -1 ? 0 : i + direction;
      const target = list[next];
      if (!target) return;
      suppressHoverRef.current = true;
      openIdRef.current = target.send.id; // so a queued step reads the new position
      setOpenId(target.send.id);
      // Keep the selection on screen. 'nearest' means a book already in
      // view does not move the page at all, so the stack only drags the
      // page along once the selection reaches an edge.
      const el = stack.querySelector(`[data-book-id="${target.send.id}"]`);
      if (el) el.scrollIntoView({ block: 'nearest' });
    }

    function drain() {
      if (drainingRef.current) return;
      function tick() {
        const magnitude = Math.abs(wheelAccumRef.current);
        if (magnitude < STEP_THRESHOLD) {
          drainingRef.current = false;
          return;
        }
        const direction = wheelAccumRef.current > 0 ? 1 : -1;
        wheelAccumRef.current -= direction * STEP_THRESHOLD;
        if (!canStep(direction)) {
          // Ran out of stack mid-drain — drop the rest of the backlog
          // rather than spinning on it.
          wheelAccumRef.current = 0;
          drainingRef.current = false;
          return;
        }
        drainingRef.current = true;
        step(direction);
        setTimeout(tick, STEP_INTERVAL_MS);
      }
      tick();
    }

    function onWheel(e) {
      const zone = zoneRef.current;
      if (e.clientX < zone.left || e.clientX > zone.right) return;

      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 4) return;

      // The release valve. Not preventing here is what lets the reader
      // scroll past a stack they have reached the end of.
      if (!canStep(delta > 0 ? 1 : -1)) return;

      e.preventDefault();
      lastPointRef.current = { x: e.clientX, y: e.clientY };
      wheelAccumRef.current += delta;
      drain();
    }

    stack.addEventListener('wheel', onWheel, { passive: false });
    return () => stack.removeEventListener('wheel', onWheel);
  }, [status]);

  // Did the pointer genuinely move since the wheel last drove the
  // selection? Used by BOTH the move and the enter handlers, because the
  // two can arrive in either order. Crossing from one book to the next
  // fires pointerenter BEFORE the first pointermove inside the new
  // element — so checking only on move meant a quick flick of the mouse
  // was ignored: the enter that mattered had already been suppressed,
  // and no further enter was coming.
  function pointerReallyMoved(e) {
    const last = lastPointRef.current;
    if (last.x === null) return true;
    return Math.abs(e.clientX - last.x) > 2 || Math.abs(e.clientY - last.y) > 2;
  }

  // Records the pointer position, releases the wheel's hold on the
  // selection if this was a real move, and answers "should hover drive
  // the selection right now?".
  function hoverShouldDrive(e) {
    if (pointerReallyMoved(e)) suppressHoverRef.current = false;
    lastPointRef.current = { x: e.clientX, y: e.clientY };
    return !suppressHoverRef.current;
  }

  function handleBookClick(event, id) {
    // A mouse click always goes straight through: the card is already
    // open by then, since hovering opened it on the way to clicking.
    if (lastPointerType.current !== 'touch') return;

    // A finger has no hover, so the first tap has to do the job hover
    // does — open the card — because otherwise a phone user never sees
    // the date or description at all. The second tap on the same book
    // goes through to the newsletter, as does the card's own button.
    if (touchOpenedId.current === id) return;

    event.preventDefault();
    touchOpenedId.current = id;
    setOpenId(id);
  }

  if (authCheck === 'checking') {
    return <div className="newsletter-page" />;
  }

  if (authCheck === 'denied') {
    return (
      <div className="newsletter-page newsletter-denied">
        <div className="newsletter-denied-card">
          <h1>Please log in</h1>
          <p>You need to be logged in to view the newsletter archive.</p>
          <Link to="/login?next=/newsletter" className="newsletter-pill">Go to Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-page">
      <header className="newsletter-header">
        <Link to="/" className="newsletter-logo">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AEE logo" />
          <span>AEE at USC</span>
        </Link>
        <Link to="/portal" className="newsletter-back-link">← Back to Member Portal</Link>
        <div className="newsletter-header-spacer" />
      </header>

      <div className="newsletter-body newsletter-body-shelf">
        <div className="newsletter-toolbar">
          <h1 className="newsletter-title">Newsletter</h1>
          <div className="newsletter-search">
            <SearchIcon />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by keyword…"
              className="newsletter-search-input"
              aria-label="Filter newsletters"
            />
          </div>
        </div>
        {/* Says out loud what the stack does, because a row of coloured
            bars doesn't announce that it's interactive on its own.
            Hover/Tap swap in CSS on (hover: none) rather than from JS —
            telling someone on a phone to hover is worse than saying
            nothing, and this needs no state to get right. */}
        <p className="newsletter-sub">
          Every edition we've sent, newest on top.{' '}
          <span className="nl-hint-hover">Hover or scroll over the stack to preview an edition.</span>
          <span className="nl-hint-tap">Tap a spine to preview it.</span>
        </p>

        {status === 'loading' && <p className="newsletter-muted">Loading…</p>}
        {status === 'error' && <p className="newsletter-error">{error}</p>}
        {status === 'ok' && sends.length === 0 && (
          <p className="newsletter-muted">No newsletters have been sent yet.</p>
        )}
        {status === 'ok' && sends.length > 0 && books.length === 0 && (
          <p className="newsletter-muted">No newsletters match "{query}".</p>
        )}

        {status === 'ok' && books.length > 0 && (
          <div
            className="nl-shelf"
            ref={stackRef}
            // A real mouse move hands control back to hover after the
            // wheel has been driving the selection.
            onPointerMove={(e) => {
              if ((e.pointerType || 'mouse') !== 'touch') hoverShouldDrive(e);
            }}
          >
            {/* Horizontal bounds of the wheel-capture zone — the same
                geometry-reference trick the homepage board uses. It is
                pointer-events: none and invisible; the listener just
                reads its cached rect to decide whether a wheel event
                belongs to the stack or to the page.

                It lives OUT here rather than inside the <ol>, for two
                reasons: an ordered list may only contain list items, and
                a stray div in there became :first-child and silently
                took the top face off the topmost book. */}
            <div className="nl-hitzone" ref={hitzoneRef} aria-hidden="true" />
            <ol className="nl-stack">
            {books.map(({ send, colors, thickness, nudge }) => {
              const isOpen = openId === send.id;
              const sentDate = formatSentDate(send.sent_at);
              return (
                <li
                  key={send.id}
                  className={`nl-slot${isOpen ? ' is-open' : ''}`}
                  style={{
                    '--thickness': `${thickness}px`,
                    '--nudge': `${nudge}px`,
                    '--spine': colors.spine,
                    '--edge': colors.edge,
                    '--top': colors.top,
                    '--ink': colors.ink,
                    '--band': colors.band,
                    '--paper': colors.paper,
                  }}
                  // Pointer and focus handlers live on the SLOT, not the
                  // book. pointerleave only fires when the pointer leaves
                  // an element and all its descendants, and the card is a
                  // descendant here — so moving the mouse from the spine
                  // across to the card's button never closes the card out
                  // from under it. Same trick for focus, via focusin/
                  // focusout bubbling, so tabbing to the button holds it
                  // open too.
                  //
                  // Pointer events rather than mouseenter/mouseleave
                  // because a tap on a touchscreen fires SYNTHETIC mouse
                  // events afterwards — and Chromium fires mouseenter
                  // BEFORE click. That ordering quietly broke the whole
                  // touch flow: the synthetic mouseenter marked the card
                  // open, so by the time the real click arrived,
                  // handleBookClick's "is this already open?" test said
                  // yes and let the navigation through. The first tap
                  // went straight to the newsletter and the card was
                  // never seen. pointerenter carries pointerType, so the
                  // finger can simply be ignored here.
                  // pointerType is read through nativeEvent as a fallback:
                  // React synthesizes enter/leave from pointerover/out
                  // rather than passing the native ones through, and the
                  // field does not always survive that trip.
                  onPointerEnter={(e) => {
                    const type = e.pointerType || e.nativeEvent?.pointerType || 'mouse';
                    lastPointerType.current = type;
                    // Ignored while the wheel is driving the selection —
                    // unless the pointer has actually moved, which is
                    // what hands control back to hover.
                    if (type !== 'touch' && hoverShouldDrive(e)) setOpenId(send.id);
                  }}
                  onPointerLeave={(e) => {
                    const type = e.pointerType || e.nativeEvent?.pointerType || 'mouse';
                    // Deliberately does NOT clear the suppression: leaving
                    // a book is not evidence the reader wants hover back,
                    // and clearing here would let a page shift under a
                    // still cursor close the card the wheel just opened.
                    if (type !== 'touch' && !suppressHoverRef.current) setOpenId(null);
                  }}
                  onFocus={() => setOpenId(send.id)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setOpenId(null);
                  }}
                >
                  <Link
                    to={`/newsletter/${send.id}`}
                    className="nl-book"
                    data-book-id={send.id}
                    // Fires before click, so handleBookClick below always
                    // knows whether a finger or a mouse is responsible.
                    onPointerDown={(e) => {
                      lastPointerType.current = e.pointerType || e.nativeEvent?.pointerType || 'mouse';
                    }}
                    onClick={(e) => handleBookClick(e, send.id)}
                  >
                    <span className="nl-book-face">
                      {/* The title sits on a stamped plate, the way a
                          hardback has its title blocked into a panel on
                          the spine rather than printed straight onto the
                          cloth. */}
                      <span className="nl-book-plate">
                        <span className="nl-book-title">{send.subject}</span>
                      </span>
                      {/* A publisher's imprint at the foot of the spine.
                          Purely to sell the book, and small enough to
                          read as texture rather than content. */}
                      <span className="nl-book-mark" aria-hidden="true">AEE</span>
                    </span>
                    {/* The two faces that turn the bar into a box: the
                        right-hand end on every book, the top face only on
                        the one at the top of the stack (CSS handles
                        that). Decorative, so hidden from screen readers. */}
                    <span className="nl-book-edge" aria-hidden="true" />
                    <span className="nl-book-top" aria-hidden="true" />
                    {/* The date is on the card, not the spine — but a
                        screen reader has no card to look at, so it goes
                        into the link's accessible name here. */}
                    <span className="nl-sr-only">, sent {sentDate}</span>
                  </Link>

                  <div className="nl-card" aria-hidden={!isOpen}>
                    <div className="nl-card-date">{sentDate}</div>
                    <div className="nl-card-title">{send.subject}</div>
                    <p className="nl-card-desc">{previewText(send.message)}</p>
                    <Link to={`/newsletter/${send.id}`} className="nl-card-btn">
                      Read this edition
                      <ChevronRightIcon />
                    </Link>
                  </div>
                </li>
              );
            })}
            </ol>
          </div>
        )}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="9.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M18.5 18.5l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M7 3.5L12.5 9 7 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
