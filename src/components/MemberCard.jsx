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
  const joinDate = formatJoinDate(member?.created_at);

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
  ].filter((f) => f.value);

  const hasBackContent = backFields.length > 0 || pastRoles.length > 0 || socialLinks.length > 0;

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
              {joinDate && <div className="member-card-join">{joinDate}</div>}
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
                      return (
                        <li key={`${r.title}-${i}`} className="member-card-back-field">
                          <span className="member-card-back-label">{r.title}</span>
                          {from && <> — {to ? `${from} to ${to}` : `since ${from}`}</>}
                        </li>
                      );
                    })}
                  </ul>
                </div>
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
                    >
                      {f.label}
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
