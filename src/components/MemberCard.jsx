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

  return (
    <button
      type="button"
      className={`member-card${flipped ? ' flipped' : ''}`}
      onClick={() => setFlipped((v) => !v)}
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
          {backFields.length > 0 ? (
            backFields.map((f) => (
              <div key={f.label} className="member-card-back-field">
                <span className="member-card-back-label">{f.label}:</span> {f.value}
              </div>
            ))
          ) : (
            <p className="member-card-back-empty">This member hasn't filled out their profile yet.</p>
          )}
        </div>
      </div>
    </button>
  );
}
