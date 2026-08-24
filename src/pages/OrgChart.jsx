// src/pages/OrgChart.jsx
//
// The real org chart — approved 2026-08-12, replacing the review-only
// mockup (org-chart-sketch.html, never part of this codebase) with the
// actual production page it was standing in for. Same design Kev
// approved: highest rank at the top working down to Member, each tier
// connected by a line to every card in the tier below, using the SAME
// MemberCard component the Members grid uses — not a re-styled copy.
// That means clicking a card here flips it exactly like on /members,
// showing hobbies/past roles/social links on the back, for free.
//
// Starts at President — no Founder & Advisor tier. Per the 2026-08-12
// decision: Founder & Advisor (Mitch Kirby) and the incoming Faculty
// Advisor live on the homepage E-board deck only, since neither is a
// real portal account and this chart is built entirely from live
// account titles via GET /auth/members (the exact same endpoint/data
// Members.jsx uses — this page is just a different grouping of it).
//
// Tier grouping mirrors the approved sketch exactly: Directors (5
// titles) share one tier, Project Managers (5 titles — one per team,
// including STEP/TREX added 2026-08-12) share one tier, everything else
// gets its own tier. A tier with zero current members is skipped
// entirely rather than rendered as an empty row with a dangling
// connector — real accounts won't fill every title from day one, and an
// empty tier would leave a visually broken gap in the tree.
//
// Requires an active session (any logged-in member, not admin-only) —
// same access level as Members.jsx, since this reads the identical data.

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, getMembers } from '../lib/api';
import MemberCard from '../components/MemberCard';
import './OrgChart.css';

// Order + grouping matches the sketch Kev approved. Each tier's `titles`
// lists every VALID_TITLES (routes/auth.js) value that belongs on that
// row — kept here as a local display-grouping concern rather than
// imported from the backend, since it's presentation logic, not a
// validation rule the server needs to enforce.
// Restructured 2026-08-23 per explicit feedback. Changes from the
// previous ordering:
//
//   - Executive Coordinator MOVED UP, from below the Directors to
//     between VP and Directors ("exec coordinator needs to move up
//     underneath VP and above director, between").
//   - Executive Project Manager RENAMED to Executive Project Director
//     and folded into the Directors tier ("needs to be on the same line
//     on the org chart as the other directors"). It no longer has a tier
//     of its own. db/database.js migrates existing rows to the new title.
//   - Project Managers now sit under the Directors ("under executive
//     director/directors, put underneath other project managers").
//   - Assistant Policy Consortium Director added as its own row beneath
//     the Directors. Kev chose this over a true nested sub-branch
//     hanging off the Policy Consortium Director specifically — the
//     connector renderer below draws flat tier-to-tier bus lines, and a
//     real sub-branch would mean rebuilding it.
//   - The Member tier is GONE entirely ("do NOT want members on org
//     chart, org chart just for leadership"). Members still appear in
//     the Members directory; they're simply not part of the hierarchy.
//
// The Advisor is deliberately NOT in this list — see ADVISOR_TITLES
// below. It renders detached from the tree.
const TIERS = [
  { key: 'president', label: 'President', titles: ['President'] },
  { key: 'vp', label: 'Vice President', titles: ['Vice President'] },
  { key: 'coordinator', label: 'Executive Coordinator', titles: ['Executive Coordinator'] },
  {
    key: 'directors',
    label: 'Directors',
    sub: 'same tier',
    titles: [
      'Executive Project Director',
      'Director of Outreach',
      'Director of Membership',
      'Director of Finance',
      'Policy Consortium Director',
      'Director of Brand',
    ],
  },
  {
    key: 'asst-policy',
    label: 'Assistant Policy Consortium Director',
    titles: ['Assistant Policy Consortium Director'],
  },
  {
    key: 'pms',
    label: 'Project Managers',
    sub: 'one per team',
    titles: ['HCC PM', 'CWC PM', 'MECC PM', 'STEP PM', 'TREX PM'],
  },
];

// Advisors render OUTSIDE the hierarchy — a card off to the side joined
// by a short horizontal line, deliberately not connected to any tier
// ("shouldn't be attached, horizontal line to attach to advisor, not
// attached to tree so line and then advisor").
//
// That's an accurate picture of the relationship: a faculty advisor
// advises the organization, they don't sit above or below anyone in it.
// Kelly Twomey Sanders holds this role. 'Founder & Advisor' rides along
// here too — same "adjacent to the org, not in its chain of command"
// status, and it was already excluded from the tree before this change.
const ADVISOR_TITLES = ['Advisor', 'Founder & Advisor'];

function fullName(m) {
  return [m.first_name, m.last_name].filter(Boolean).join(' ') || 'Member';
}

export default function OrgChart() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [status, setStatus] = useState('loading'); // loading | ok | error
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (data?.user) setAuthCheck('ok');
        else setAuthCheck('denied');
      })
      .catch(() => setAuthCheck('denied'));
  }, []);

  useEffect(() => {
    if (authCheck !== 'ok') return;
    getMembers()
      .then((data) => {
        setMembers(data?.members || []);
        setStatus('ok');
      })
      .catch((err) => {
        setError(err.message || 'Could not load the org chart.');
        setStatus('error');
      });
  }, [authCheck]);

  // Anyone flagged hide_from_org_chart is dropped before any grouping —
  // added 2026-08-23 ("Remove me from displaying on org chart"). It's a
  // per-account flag an admin toggles in AdminUsers, not a hardcoded id,
  // so an account that exists to run the site rather than to hold a
  // board position can stay a normal active member while staying out of
  // the leadership hierarchy.
  const chartMembers = useMemo(
    () => members.filter((m) => !m.hide_from_org_chart),
    [members]
  );

  // Non-empty tiers only, each carrying its matching members sorted by
  // name (stable, predictable left-to-right order within a tier — the
  // same alphabetical convention Members.jsx's default sort uses).
  const populatedTiers = useMemo(() => {
    return TIERS
      .map((tier) => ({
        ...tier,
        members: chartMembers
          .filter((m) => tier.titles.includes(m.title))
          .sort((a, b) => fullName(a).localeCompare(fullName(b))),
      }))
      .filter((tier) => tier.members.length > 0);
  }, [chartMembers]);

  // Advisors — rendered detached, above and beside the tree.
  const advisors = useMemo(
    () => chartMembers
      .filter((m) => ADVISOR_TITLES.includes(m.title))
      .sort((a, b) => fullName(a).localeCompare(fullName(b))),
    [chartMembers]
  );

  useOrgChartConnectors(populatedTiers);

  if (authCheck === 'checking') {
    return <div className="orgchart-page" />;
  }

  if (authCheck === 'denied') {
    return (
      <div className="orgchart-page orgchart-denied">
        <div className="orgchart-denied-card">
          <h1>Please log in</h1>
          <p>You need to be logged in to view the org chart.</p>
          <Link to="/login" className="orgchart-pill">Go to Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="orgchart-page">
      <header className="orgchart-header">
        <Link to="/" className="orgchart-logo">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AEE logo" />
          <span>AEE at USC</span>
        </Link>
        <Link to="/portal" className="orgchart-back-link">← Back to Member Portal</Link>
        <div className="orgchart-header-spacer" />
      </header>

      <div className="orgchart-body">
        <h1 className="orgchart-title">Org Chart</h1>

        {status === 'loading' && <p className="orgchart-muted">Loading…</p>}
        {status === 'error' && <p className="orgchart-error">{error}</p>}

        {status === 'ok' && populatedTiers.length === 0 && advisors.length === 0 && (
          <p className="orgchart-muted">No members have a title set yet.</p>
        )}

        {status === 'ok' && (populatedTiers.length > 0 || advisors.length > 0) && (
          <div className="orgchart-scroll">
            {/* Advisors sit ABOVE and to the side of the tree, joined by
                a short horizontal line rather than a vertical connector.
                Rendered outside .orgchart-chart entirely, and without
                the data-orgchart-tier attribute, so the connector
                renderer never treats them as a tier and never draws a
                line into the hierarchy — which is the whole point: an
                advisor advises the org, they aren't above or below
                anyone in it. */}
            {advisors.length > 0 && (
              <div className="orgchart-advisors">
                {advisors.map((m) => (
                  <div className="orgchart-advisor" key={m.id}>
                    <span className="orgchart-advisor-line" aria-hidden="true" />
                    <div className="orgchart-advisor-card">
                      <div className="orgchart-advisor-label">
                        {m.title === 'Founder & Advisor' ? 'Founder & Advisor' : 'Advisor'}
                      </div>
                      <div className="orgchart-card-wrap">
                        <MemberCard member={m} team={m.team} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="orgchart-chart" id="orgchart-chart">
              <div className="orgchart-connectors" id="orgchart-connectors" />
              {populatedTiers.map((tier) => (
                <div className="orgchart-tier" key={tier.key} data-orgchart-tier>
                  <div className="orgchart-tier-label">
                    {tier.label}
                    {tier.sub && <span>{tier.sub}</span>}
                  </div>
                  {tier.members.map((m) => (
                    <div className="orgchart-card-wrap" key={m.id}>
                      <MemberCard member={m} team={m.team} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Connector lines ─────────────────────────────────────────────────────
//
// Ports the same JS-computed absolutely-positioned-bar technique from
// the review sketch (org-chart-sketch.html) into a real React effect: no
// SVG, just <div> bars sized/positioned via getBoundingClientRect() math
// against the chart container, redrawn on load/resize and whenever the
// populated tier list changes (data arriving async can change which
// tiers exist and how many cards are in each, which shifts every
// downstream measurement).
//
// Not redrawn on card flip — MemberCard's front/back faces are both
// absolutely positioned (inset: 0) inside a fixed-size wrapper (see
// MemberCard.css), so the card's own outer bounding box never changes
// size when it flips. No flip-tracking needed for the lines to stay
// correct.
function useOrgChartConnectors(populatedTiers) {
  useEffect(() => {
    const chart = document.getElementById('orgchart-chart');
    const overlay = document.getElementById('orgchart-connectors');
    if (!chart || !overlay) return;

    function addLine(x1, y1, x2, y2) {
      const div = document.createElement('div');
      div.className = 'orgchart-connector-line';
      if (Math.abs(y1 - y2) < 0.5) {
        div.style.left = `${Math.min(x1, x2)}px`;
        div.style.top = `${y1}px`;
        div.style.width = `${Math.max(Math.abs(x2 - x1), 2)}px`;
        div.style.height = '2px';
      } else {
        div.style.left = `${x1}px`;
        div.style.top = `${Math.min(y1, y2)}px`;
        div.style.width = '2px';
        div.style.height = `${Math.abs(y2 - y1)}px`;
      }
      overlay.appendChild(div);
    }

    function draw() {
      overlay.innerHTML = '';
      const chartRect = chart.getBoundingClientRect();
      const tiers = Array.from(chart.querySelectorAll('[data-orgchart-tier]'));

      for (let i = 0; i < tiers.length - 1; i++) {
        const parentTier = tiers[i];
        const childTier = tiers[i + 1];

        const parentCards = Array.from(parentTier.querySelectorAll('.member-card'));
        const childCards = Array.from(childTier.querySelectorAll('.member-card'));
        if (parentCards.length === 0 || childCards.length === 0) continue;

        const parentRect = parentTier.getBoundingClientRect();
        const parentCenterX = parentRect.left + parentRect.width / 2 - chartRect.left;
        const parentBottomY = Math.max(
          ...parentCards.map((c) => c.getBoundingClientRect().bottom - chartRect.top)
        );

        const childPoints = childCards.map((c) => {
          const r = c.getBoundingClientRect();
          return { x: r.left + r.width / 2 - chartRect.left, y: r.top - chartRect.top };
        });
        const childTopY = Math.min(...childPoints.map((p) => p.y));
        const busY = parentBottomY + (childTopY - parentBottomY) / 2;

        addLine(parentCenterX, parentBottomY, parentCenterX, busY);

        const xs = childPoints.map((p) => p.x);
        if (childPoints.length > 1) {
          addLine(Math.min(...xs), busY, Math.max(...xs), busY);
        }
        childPoints.forEach((p) => addLine(p.x, busY, p.x, p.y));
      }
    }

    draw();
    // Fonts/images loading async can shift card widths slightly after
    // first paint — redraw once more shortly after mount to stay
    // aligned, same as the sketch did.
    const t = setTimeout(draw, 300);
    window.addEventListener('resize', draw);
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', draw);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [populatedTiers]);
}
