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
import { Link } from 'react-router-dom';
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
const SPINES = [
  { spine: '#0B0F1A', edge: '#04070F', top: '#171D2C', ink: '#E8EDF7', band: 'rgba(255,255,255,.14)' },
  { spine: '#101830', edge: '#080D1E', top: '#1C2848', ink: '#E8EDF7', band: 'rgba(255,255,255,.14)' },
  { spine: '#F1F5F9', edge: '#CBD5E1', top: '#FFFFFF', ink: '#0B0F1A', band: 'rgba(11,15,26,.16)' },
  { spine: '#16213E', edge: '#0D1528', top: '#24325A', ink: '#E8EDF7', band: 'rgba(255,255,255,.14)' },
  { spine: '#1A1F2B', edge: '#10141C', top: '#282F3F', ink: '#E8EDF7', band: 'rgba(255,255,255,.13)' },
  { spine: '#1D2B52', edge: '#131E3C', top: '#2C3E6E', ink: '#E8EDF7', band: 'rgba(255,255,255,.15)' },
  { spine: '#E2E8F0', edge: '#B8C4D4', top: '#F6F9FC', ink: '#0B0F1A', band: 'rgba(11,15,26,.15)' },
  { spine: '#080D1C', edge: '#03060E', top: '#141A2E', ink: '#E8EDF7', band: 'rgba(255,255,255,.12)' },
  { spine: '#2A3A63', edge: '#1D294A', top: '#3B4E7E', ink: '#E8EDF7', band: 'rgba(255,255,255,.16)' },
  { spine: '#C9D4E4', edge: '#9FAFC5', top: '#DFE7F1', ink: '#0B0F1A', band: 'rgba(11,15,26,.14)' },
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
          <Link to="/login" className="newsletter-pill">Go to Log In</Link>
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
          <span className="nl-hint-hover">Hover</span>
          <span className="nl-hint-tap">Tap</span> a spine to preview it.
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
                    if (type !== 'touch') setOpenId(send.id);
                  }}
                  onPointerLeave={(e) => {
                    const type = e.pointerType || e.nativeEvent?.pointerType || 'mouse';
                    if (type !== 'touch') setOpenId(null);
                  }}
                  onFocus={() => setOpenId(send.id)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setOpenId(null);
                  }}
                >
                  <Link
                    to={`/newsletter/${send.id}`}
                    className="nl-book"
                    // Fires before click, so handleBookClick below always
                    // knows whether a finger or a mouse is responsible.
                    onPointerDown={(e) => {
                      lastPointerType.current = e.pointerType || e.nativeEvent?.pointerType || 'mouse';
                    }}
                    onClick={(e) => handleBookClick(e, send.id)}
                  >
                    <span className="nl-book-face">
                      <span className="nl-book-title">{send.subject}</span>
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
