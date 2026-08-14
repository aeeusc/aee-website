// src/pages/Portal.jsx
//
// The Member Portal — reached by clicking your first name in the nav
// once logged in (see Nav in Home.jsx; the profile icon next to it goes
// to /profile instead, a separate page). Requires an active session;
// bounces to /login otherwise, same pattern as Dashboard.jsx/CreateUser.jsx.
//
// Layout: a logo header (links back to the homepage), a slim left rail
// listing every section as plain links, and a right side holding a grid
// of big icon+label tiles mirroring the rail. The rail is deliberately
// minimal (a thin column of plain text links, not a padded 1/3-width
// panel) per explicit feedback 2026-08-08 ("way too much space for this
// vertical bar... I wanna be super minimal... simple, easy vertical
// bars... the members thing should be taking up more space") — most of
// the width goes to the tile grid instead.
//
// As of 2026-08-12, EVERY tile/rail item is a real link to its own
// standalone page (see the `to` field on every SECTIONS entry below) —
// this page is now a pure navigation hub with no in-page tab content of
// its own at all. That's the end point of a pattern that's been
// happening incrementally since 2026-08-08: Dashboard and Send
// Newsletter became real pages first ("dashboard and send newsletter...
// it should redirect you to their pages, their subpages... when you
// click on them"); Members followed 2026-08-10 once its full grid/
// filter/sort page was built (see src/pages/Members.jsx); Settings
// merged into Profile.jsx as a tab there 2026-08-11 ("I think profile
// and settings should be, like, two in one kinda... like an Instagram
// type of deal or Facebook") and its change-password/log-out logic moved
// to Profile.jsx's SettingsTab component; Calendar became a full
// month-grid standalone page the same day (see src/pages/Calendar.jsx);
// Org Chart became a real page 2026-08-12 once Kev approved the review
// sketch (see src/pages/OrgChart.jsx). Newsletter and Tasks were the
// last two holdouts — both explicitly still in-page as of the Calendar/
// Tasks rework ("add due dates, but keep Tasks separate" from the
// Calendar grid) — and both became their own standalone pages 2026-08-12
// too, per explicit feedback ("we need to get a... the newsletter page
// functioning, so we'll have a... redirect to that, have a subpage" /
// "I wanna make tasks as a page"). See src/pages/Newsletter.jsx +
// NewsletterDetail.jsx and src/pages/Tasks.jsx. A `profile` tile was
// added alongside them (`to: '/profile'`) so the tile grid itself offers
// a way into your profile — previously only reachable via the small nav
// icon on the homepage (see Home.jsx's Nav) or indirectly through the
// Settings tile, which lands on the Settings tab specifically, not the
// Profile tab.

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../lib/api';
import { Footer } from './Home';
import './Portal.css';

// Icon components (not emoji strings) — real inline SVGs per explicit
// feedback 2026-08-08 ("I want actual icons, no emojis for all these
// boxes"). Same stroke-based style as the icons already used elsewhere
// in the portal (Profile.jsx's EditIcon/CameraIcon) — 1.8px strokes, no
// fill, currentColor so they inherit the tile's text color state
// (default/hover/active) for free.
//
// Every entry is a real link to a standalone page (`to`) as of
// 2026-08-12 — see the file comment above for how each one got here.
// `profile`/`tasks`/`newsletter` are the newest three; the rest existed
// already.
//
// Order reshuffled 2026-08-14 per explicit feedback on the tile grid's
// layout: Tasks moved down to sit directly below Dashboard and directly
// right of Newsletter, specifically NOT in the column below Settings.
// In this 3-per-row grid that works out to:
//   Row 1: Members    Calendar   Org Chart
//   Row 2: Profile    Dashboard  Settings
//   Row 3: Newsletter Tasks      Send Newsletter
// Dashboard/Send Newsletter stay adminOnly (interleaved here rather than
// grouped strictly at the end of the array like before) — the rail's
// "Admin" divider below still renders correctly either way, since it
// re-checks the immediately-preceding item on every entry rather than
// assuming a single contiguous admin block.
const SECTIONS = [
  { key: 'members', label: 'Members', Icon: MembersIcon, adminOnly: false, to: '/members' },
  { key: 'calendar', label: 'Calendar', Icon: CalendarIcon, adminOnly: false, to: '/calendar' },
  { key: 'orgchart', label: 'Org Chart', Icon: OrgChartIcon, adminOnly: false, to: '/org-chart' },
  { key: 'profile', label: 'Profile', Icon: ProfileIcon, adminOnly: false, to: '/profile' },
  { key: 'dashboard', label: 'Dashboard', Icon: DashboardIcon, adminOnly: true, to: '/dashboard' },
  { key: 'settings', label: 'Settings', Icon: SettingsIcon, adminOnly: false, to: '/profile?tab=settings' },
  { key: 'newsletter', label: 'Newsletter', Icon: NewsletterIcon, adminOnly: false, to: '/newsletter' },
  { key: 'tasks', label: 'Tasks', Icon: TasksIcon, adminOnly: false, to: '/tasks' },
  { key: 'newsletter-send', label: 'Send Newsletter', Icon: SendIcon, adminOnly: true, to: '/newsletter-admin' },
];

export default function Portal() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);

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
                <Link to={s.to} className="portal-rail-item">
                  {s.label}
                </Link>
              </div>
            );
          })}
        </nav>

        <div className="portal-main">
          <div className="portal-tiles">
            {visibleSections.map((s) => (
              <Link key={s.key} to={s.to} className="portal-tile">
                <span className="portal-tile-icon" aria-hidden="true"><s.Icon /></span>
                <span className="portal-tile-label">{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer showNewsletterSignup={false} />
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

// Added 2026-08-12 alongside the new Tasks tile — a simple checklist
// (two checked rows), matching the same 1.8px-stroke/no-fill style as
// every other icon here.
function TasksIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <rect x="2.5" y="3" width="17" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M6 8l1.6 1.6L10.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M13 8h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M6 14l1.6 1.6L10.5 12.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M13 14h4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

// Added 2026-08-12 alongside the new Profile tile — a simple person
// silhouette, same style as MembersIcon's individual figures.
function ProfileIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="11" cy="7.5" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3.5 19c1.2-4.3 4-6.5 7.5-6.5s6.3 2.2 7.5 6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" />
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
