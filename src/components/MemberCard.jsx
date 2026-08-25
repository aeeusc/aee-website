// src/components/MemberCard.jsx
//
// A single flip-able member card, built from Kev's wireframe (2026-08-08):
// front shows the photo (top, padded, e-board-style rounded square) over
// a divider line, then name/title bottom-left and join-date (Month,
// Year)/team bottom-right; clicking the card flips it (full 3D rotate)
// to a back face showing bold-labeled fields — Hobbies, Hometown, and
// anything else filled out on the person's profile.
//
// Standalone component (not built into Portal.jsx or Profile.jsx)
// specifically so the eventual Members grid page (still a placeholder —
// "The members and org chart should be placeholder for now") can drop
// this straight in without needing to be reassembled from scratch. Takes
// a plain `member` object shaped like GET /auth/me's user (or eventually
// a members-list endpoint's rows) — snake_case fields, matching what the
// backend actually returns, so no adapter layer is needed at the call
// site.
//
// team is accepted as a prop rather than read off `member` because
// there's no team/design-team column on `users` yet — Members is still a
// placeholder feature (see the file comment above), so this component is
// ready for that data to exist without needing changes once it does.

import { useState } from 'react';
import { PlaceholderAvatar } from '../pages/Home';
import './MemberCard.css';

function formatJoinDate(createdAt) {
  if (!createdAt) return null;
  const d = new Date(createdAt);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
}

// Shorter month/year for past-role date ranges (e.g. "Jan 2025") — long
// form ("January 2025") reads fine as a single join date under a name,
// but two of them side by side in a "from – to" range gets wordy, so
// past roles use the abbreviated month form instead.
function formatMonthYear(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

export default function MemberCard({ member, team }) {
  const [flipped, setFlipped] = useState(false);

  const fullName = [member?.first_name, member?.last_name].filter(Boolean).join(' ') || member?.username || 'Member';

  // TWO different dates, deliberately, in two different places — changed
  // 2026-08-23 per explicit feedback ("have usc email on back w copy
  // paste icon, bc title on front on back want member since... 2
  // different dates. Relegate member/join date to back, role displays w
  // small since on front").
  //
  //   FRONT: when they got their CURRENT TITLE (role_started_at, the
  //          open role_history row — see GET /auth/members). Shown under
  //          a small "SINCE" label, because the front of the card is
  //          about the role.
  //   BACK:  when they JOINED (created_at), as "Member since ...".
  //
  // Falls back to created_at on the front only when role_started_at is
  // missing, which happens for accounts predating role_history.
  const roleDate = formatJoinDate(member?.role_started_at || member?.created_at);
  // member_since first, created_at only as a fallback — added 2026-08-24.
  // created_at is when the ACCOUNT was typed into the dashboard, which
  // for this board was August 2026; member_since is when the person
  // actually joined the club. The card was confidently telling everyone
  // that officers who have been here a year joined last week. See the
  // member_since column in the backend's db/database.js.
  const memberSince = formatJoinDate(member?.member_since || member?.created_at);

  const backFields = [
    { label: 'Hobbies', value: member?.hobbies },
    { label: 'Hometown', value: member?.hometown },
    { label: 'Favorite food', value: member?.favorite_food },
    { label: 'Favorite drink', value: member?.favorite_drink },
  ].filter((f) => f.value);

  // Past roles — added 2026-08-11 per explicit feedback: the front of
  // the card keeps showing the CURRENT role (member.title, unchanged
  // above), the back additionally shows past roles with a from/to date
  // range. Sourced from GET /auth/members's `past_roles` (role_history
  // rows with an ended_at — see routes/auth.js), so e.g. Alex
  // Bartolomei's card shows "MECC PM — Jan 2026 to Aug 2026" on the back
  // once his title moves to President, with front still just showing
  // "President".
  const pastRoles = Array.isArray(member?.past_roles) ? member.past_roles : [];

  // Social links — added 2026-08-11, same request as past roles above.
  // Rendered as real <a> tags, which is exactly why the outer wrapper
  // below is a div (role="button") instead of a <button>: nesting an
  // <a> inside a <button> is invalid HTML and browsers handle it
  // inconsistently. stopPropagation on each link's click keeps "open
  // this link" from also toggling the flip underneath it.
  const socialLinks = [
    { label: 'LinkedIn', value: member?.linkedin_url },
    { label: 'Instagram', value: member?.instagram_url },
    // Personal website — added 2026-08-23 alongside the new account
    // field. Same icon-button treatment as the two above.
    { label: 'Website', value: member?.website_url },
  ].filter((f) => f.value);

  const hasBackContent =
    backFields.length > 0 || pastRoles.length > 0 || socialLinks.length > 0 || Boolean(member?.usc_email);

  return (
    <div
      className={`member-card${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped((v) => !v)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((v) => !v);
        }
      }}
      aria-label={`${fullName} — click to ${flipped ? 'see front' : 'see more'}`}
    >
      <div className="member-card-inner">
        <div className="member-card-face member-card-front">
          <div className="member-card-photo">
            {member?.photo_url ? (
              <img src={member.photo_url} alt={fullName} />
            ) : (
              <PlaceholderAvatar size={64} />
            )}
          </div>
          <div className="member-card-divider" />
          <div className="member-card-info">
            <div className="member-card-info-left">
              <div className="member-card-name">{fullName}</div>
              {member?.title && <div className="member-card-role">{member.title}</div>}
            </div>
            <div className="member-card-info-right">
              {roleDate && (
                <div className="member-card-since">
                  <span className="member-card-since-label">Since</span>
                  <span className="member-card-join">{roleDate}</span>
                </div>
              )}
              {team && <div className="member-card-team">{team}</div>}
            </div>
          </div>
        </div>

        <div className="member-card-face member-card-back">
          {hasBackContent ? (
            <div className="member-card-back-content">
              {/* "Extra Info" section — added 2026-08-16 per explicit
                  feedback ("I'll have like the same text like top left
                  hobbies... extra info... and then I'll display like the
                  bullet points of like the filling for hobbies Hometown
                  favorite food favorite drink"). Same section-title style
                  as "Past roles" below (.member-card-back-section-title),
                  now used consistently for both. A thin divider line
                  above it (.member-card-back-divider — inset from both
                  edges, doesn't touch the card's sides) separates this
                  from whatever's above it in the flipped view; when a
                  member has no hobbies/hometown/food/drink filled in at
                  all, backFields is empty and this whole block (title +
                  divider + list) is skipped, same as before. */}
              {backFields.length > 0 && (
                <div className="member-card-back-section">
                  <div className="member-card-back-divider" />
                  <div className="member-card-back-section-title">Extra Info</div>
                  <ul className="member-card-back-list">
                    {backFields.map((f) => (
                      <li key={f.label} className="member-card-back-field">
                        <span className="member-card-back-label">{f.label}:</span> {f.value}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {pastRoles.length > 0 && (
                <div className="member-card-back-section">
                  <div className="member-card-back-section-title">Past roles</div>
                  <ul className="member-card-back-list">
                    {pastRoles.map((r, i) => {
                      const from = formatMonthYear(r.started_at);
                      const to = formatMonthYear(r.ended_at);
                      // A role opened and closed in the same month
                      // renders as "Aug 2026 to Aug 2026", which reads as
                      // a bug rather than as a short tenure — and usually
                      // IS one: it happens when a title is corrected on
                      // the day the account is created, so both ends land
                      // on today. Collapse those to the single month.
                      const range = !from
                        ? null
                        : !to
                          ? `since ${from}`
                          : from === to
                            ? from
                            : `${from} to ${to}`;
                      return (
                        <li key={`${r.title}-${i}`} className="member-card-back-field">
                          <span className="member-card-back-label">{r.title}</span>
                          {range && <> — {range}</>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}

              {/* USC email with a copy button — added 2026-08-23 ("have
                  usc email on back w copy paste icon... to copy like
                  Gmail does"). The address is shown truncated with the
                  full value in a title tooltip; clicking Copy puts the
                  whole thing on the clipboard rather than making people
                  select tiny text. */}
              {member?.usc_email && (
                <div className="member-card-back-section">
                  <div className="member-card-back-section-title">Email</div>
                  <CopyRow value={member.usc_email} />
                </div>
              )}

              {/* Join date lives on the BACK now (the front shows role
                  start instead) — see the two-dates comment up top. */}
              {memberSince && (
                <div className="member-card-back-meta">Member since {memberSince}</div>
              )}

              {socialLinks.length > 0 && (
                <div className="member-card-back-links">
                  {socialLinks.map((f) => (
                    <a
                      key={f.label}
                      href={f.value}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="member-card-back-link"
                      onClick={(e) => e.stopPropagation()}
                      aria-label={f.label}
                      title={f.label}
                    >
                      {f.label === 'LinkedIn' && <LinkedInIcon />}
                      {f.label === 'Instagram' && <InstagramIcon />}
                      {f.label === 'Website' && <GlobeIcon />}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="member-card-back-empty">This member hasn't filled out their profile yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Copy-to-clipboard row ───────────────────────────────────────────────
//
// Added 2026-08-23 for the USC email on the card back. stopPropagation on
// the click matters: the whole card is a flip toggle, so without it
// copying an address would also spin the card back over.
//
// navigator.clipboard requires a secure context (https or localhost),
// which the real site is — but the fallback path keeps this from silently
// doing nothing if it's ever unavailable.
function CopyRow({ value }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy(e) {
    e.stopPropagation();
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
      } else {
        const ta = document.createElement('textarea');
        ta.value = value;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked — leave the label alone rather than claiming
      // a copy that didn't happen.
    }
  }

  return (
    <div className="member-card-copy-row">
      <span className="member-card-copy-value" title={value}>{value}</span>
      <button
        type="button"
        className="member-card-copy-btn"
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : `Copy ${value}`}
        title={copied ? 'Copied' : 'Copy'}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    </div>
  );
}

// ─── Icons ───────────────────────────────────────────────────────────────
// Social links render as icons rather than the words "LinkedIn" and
// "Instagram" as of 2026-08-23 ("change it to make icons show for ig and
// LinkedIn"). Same glyphs used on the homepage E-board (Home.jsx), kept
// as local copies per this codebase's convention of not sharing tiny
// per-file components.

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.19 1.46-2.19 2.97V21h-4z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="9" y="9" width="11" height="11" rx="2.5" stroke="currentColor" strokeWidth="1.9" />
      <path d="M6 15H5.5A1.5 1.5 0 0 1 4 13.5v-8A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V6" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
