// src/pages/Members.jsx
//
// The full member directory — a standalone page (was a Portal.jsx
// placeholder tab until now), reachable from the portal's Members tile/
// rail-item. Built from Kev's Paint wireframe (2026-08-10):
//   - a 5-across grid of MemberCard flip-cards
//   - a "Filter" button, top-right, opening a design-team sub-dropdown
//     (multi-select checkboxes: CWC, MECC, HCC, STiT, each with a hover
//     tooltip spelling out the full team name)
//   - a sort control: A-Z, Z-A, oldest join date, newest join date
//
// Default view (no team checked): one flat 5-across grid of every
// member, sorted by whichever sort mode is active — no team headings,
// no dividers. Per explicit feedback 2026-08-10: "if you're looking
// here... that's how I wanted it to look... [flat grid by default,
// headings only when a team filter is applied]."
//
// Once one or more teams are checked: the grid reorganizes into
// stacked sections, one per selected team (in TEAMS order, not
// selection order, so the layout doesn't jump around as you check
// boxes) — each section has the team name as a heading above its own
// 5-across grid of just that team's members (sorted the same way as
// the flat view), with an inset divider (not full-width) separating
// each section from the next. Per explicit feedback: "I wanted to have
// the name of the design team up above... then have, like, a break
// line when it finishes, but the break line won't stretch all the way
// [edge to edge]."
//
// Requires an active session (any logged-in member — the directory
// isn't admin-only, see GET /auth/members).

import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, getMembers } from '../lib/api';
import MemberCard from '../components/MemberCard';
import './Members.css';

// Kept in sync with routes/auth.js's VALID_TEAMS and CreateUser.jsx's
// TEAMS. full spells out the abbreviation for the filter checkboxes'
// hover tooltip (title attribute), per explicit feedback 2026-08-10
// ("a hover tool[tip] would be nice to spell out these full teams").
// STEP and TREX added 2026-08-12 — like CWC/MECC/HCC, no spelled-out
// full name is known for these yet, so `full` just repeats the
// abbreviation rather than guessing at one (same conservative pattern
// already used for those three).
const TEAMS = [
  { key: 'CWC', full: 'CWC' },
  { key: 'MECC', full: 'MECC' },
  { key: 'HCC', full: 'HCC' },
  { key: 'STiT', full: 'Solar Table Initiative Team' },
  { key: 'STEP', full: 'STEP' },
  { key: 'TREX', full: 'TREX' },
];

const SORT_OPTIONS = [
  { key: 'name-asc', label: 'Name (A–Z)' },
  { key: 'name-desc', label: 'Name (Z–A)' },
  { key: 'joined-newest', label: 'Join date (newest)' },
  { key: 'joined-oldest', label: 'Join date (oldest)' },
];

function fullName(m) {
  return [m.first_name, m.last_name].filter(Boolean).join(' ') || 'Member';
}

function sortMembers(members, sortKey) {
  const sorted = [...members];
  switch (sortKey) {
    case 'name-desc':
      sorted.sort((a, b) => fullName(b).localeCompare(fullName(a)));
      break;
    case 'joined-newest':
      sorted.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      break;
    case 'joined-oldest':
      sorted.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
      break;
    case 'name-asc':
    default:
      sorted.sort((a, b) => fullName(a).localeCompare(fullName(b)));
      break;
  }
  return sorted;
}

export default function Members() {
  const navigate = useNavigate();
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied

  const [status, setStatus] = useState('loading'); // loading | ok | error
  const [members, setMembers] = useState([]);
  const [error, setError] = useState('');

  const [sortKey, setSortKey] = useState('name-asc');
  const [selectedTeams, setSelectedTeams] = useState([]); // array of team keys
  const [filterOpen, setFilterOpen] = useState(false);

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
    getMembers()
      .then((data) => {
        setMembers(data?.members || []);
        setStatus('ok');
      })
      .catch((err) => {
        setError(err.message || 'Could not load the member directory.');
        setStatus('error');
      });
  }, [authCheck]);

  function toggleTeam(key) {
    setSelectedTeams((prev) =>
      prev.includes(key) ? prev.filter((t) => t !== key) : [...prev, key]
    );
  }

  // Flat, sorted list when no team filter is active. Grouped-by-team
  // sections (each internally sorted the same way) once one or more
  // teams are checked — see the file comment above for why default vs.
  // filtered look structurally different rather than always grouping.
  const { flatMembers, groupedSections } = useMemo(() => {
    if (selectedTeams.length === 0) {
      return { flatMembers: sortMembers(members, sortKey), groupedSections: [] };
    }
    const sections = TEAMS
      .filter((t) => selectedTeams.includes(t.key))
      .map((t) => ({
        team: t,
        members: sortMembers(members.filter((m) => m.team === t.key), sortKey),
      }));
    return { flatMembers: [], groupedSections: sections };
  }, [members, sortKey, selectedTeams]);

  if (authCheck === 'checking') {
    return <div className="members-page" />;
  }

  if (authCheck === 'denied') {
    return (
      <div className="members-page members-denied">
        <div className="members-denied-card">
          <h1>Please log in</h1>
          <p>You need to be logged in to view the member directory.</p>
          <Link to="/login" className="members-pill">Go to Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="members-page">
      <header className="members-header">
        <Link to="/" className="members-logo">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AEE logo" />
          <span>AEE at USC</span>
        </Link>
        <Link to="/portal" className="members-back-link">← Back to Member Portal</Link>
        <div className="members-header-spacer" />
      </header>

      <div className="members-body">
        <div className="members-toolbar">
          <h1 className="members-title">Members</h1>

          <div className="members-toolbar-controls">
            <select
              className="members-sort-select"
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value)}
              aria-label="Sort members"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.key} value={opt.key}>{opt.label}</option>
              ))}
            </select>

            <div className="members-filter-wrap">
              <button
                type="button"
                className={`members-filter-btn${selectedTeams.length > 0 ? ' active' : ''}`}
                onClick={() => setFilterOpen((v) => !v)}
                aria-expanded={filterOpen}
              >
                Filter{selectedTeams.length > 0 ? ` (${selectedTeams.length})` : ''}
                <FilterIcon />
              </button>

              {filterOpen && (
                <div className="members-filter-dropdown">
                  <div className="members-filter-dropdown-label">Design team</div>
                  {TEAMS.map((t) => (
                    <label key={t.key} className="members-filter-option" title={t.full}>
                      <input
                        type="checkbox"
                        checked={selectedTeams.includes(t.key)}
                        onChange={() => toggleTeam(t.key)}
                      />
                      <span>{t.key}</span>
                    </label>
                  ))}
                  {selectedTeams.length > 0 && (
                    <button
                      type="button"
                      className="members-filter-clear"
                      onClick={() => setSelectedTeams([])}
                    >
                      Clear filters
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {status === 'loading' && <p className="members-muted">Loading…</p>}
        {status === 'error' && <p className="members-error">{error}</p>}

        {status === 'ok' && selectedTeams.length === 0 && (
          flatMembers.length > 0 ? (
            <div className="members-grid">
              {flatMembers.map((m) => (
                <MemberCard key={m.id} member={m} team={m.team} />
              ))}
            </div>
          ) : (
            <p className="members-muted">No members yet.</p>
          )
        )}

        {status === 'ok' && selectedTeams.length > 0 && (
          <div className="members-sections">
            {groupedSections.map((section, i) => (
              <div key={section.team.key} className="members-section">
                {i > 0 && <div className="members-section-divider" />}
                <h2 className="members-section-heading" title={section.team.full}>
                  {section.team.key}
                </h2>
                {section.members.length > 0 ? (
                  <div className="members-grid">
                    {section.members.map((m) => (
                      <MemberCard key={m.id} member={m} team={m.team} />
                    ))}
                  </div>
                ) : (
                  <p className="members-muted">No members on this team yet.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function FilterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path d="M3 4h16M6 11h10M9.5 18h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}