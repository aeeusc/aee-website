// src/pages/Profile.jsx
//
// Reached by clicking the small profile icon in the nav (see Nav in
// Home.jsx — the person's first name next to it goes to /portal
// instead, a separate page).
//
// Built 2026-08-08 from Kev's wireframe + voice description: a circular
// photo up top (click to zoom when viewing, click to upload+crop when
// editing), name/title pulled from the account (not editable here —
// title is admin-set, see CreateUser.jsx), a description box, and four
// preset fields (hometown, favorite food, favorite drink, hobbies) each
// capped at 75 characters. An Edit button (top right) toggles edit mode;
// Cancel/Save appear at the bottom only while editing.
//
// Restructured 2026-08-11 to also hold a "Settings" tab, per explicit
// feedback: "I think profile and settings should be, like, two in one
// kinda... like, you have a profile thing, and it has the stuff like
// the profile, and then you could also go to the settings. Like, kind
// of like an Instagram type of deal or Facebook" — confirmed as a
// single page at /profile with two in-place tabs, not two separate
// URLs. The Settings tab (change password + log out) is the same logic
// that used to live in Portal.jsx as its own in-page section — moved
// here wholesale (see the SettingsTab component below) rather than
// duplicated; Portal.jsx's Settings tile/rail-item now links to
// /profile?tab=settings instead of switching an in-page section, same
// pattern Dashboard/Send Newsletter/Members already use. Which tab is
// active lives in the URL (?tab=settings) via useSearchParams, not
// local-only state, specifically so that link can land directly on the
// Settings tab rather than always opening to Profile first.
//
// Photo handling: cropping happens entirely client-side via <canvas>
// before upload — the user picks an image, drags/resizes a square crop
// box over a live preview sized to match how the photo actually displays
// (matching the wireframe's "show how it's gonna actually look... meet
// the pixel requirement"), and only the cropped square ever gets sent to
// the server as a data: URL. See PHOTO_DISPLAY_SIZE below — this is the
// resolution the crop is exported at, independent of how large the
// circular preview is drawn on screen.
//
// Requires an active session, same pattern as Dashboard.jsx/Portal.jsx.

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  getCurrentUser, updateProfile, updateProfilePhoto, changePassword, logout,
  getNewsletterPreference, setNewsletterPreference,
} from '../lib/api';
import { PlaceholderAvatar } from './Home';
import './Portal.css';
import './Profile.css';

// The resolution a cropped photo is exported at (square, in pixels) —
// matches the member card's photo region closely enough that what you
// see in the crop preview is what you'll see everywhere else the photo
// is used (nav avatar, profile, eventual member card/e-board-style
// display). Higher than the small nav avatar needs, since the SAME
// stored photo is also used at profile-page size.
const PHOTO_DISPLAY_SIZE = 400;

const PRESET_FIELD_MAX = 75;
// Lowered from 500 to 150 per explicit feedback 2026-08-08 ("nothing too
// much, easy peasy lemon squeezy, I just want a hundred fifty characters
// max"). Also see routes/auth.js's DESCRIPTION_MAX — kept in sync with
// this value, since the server enforces the real limit and this is only
// the client-side maxLength/counter.
const DESCRIPTION_MAX = 150;

const PRESET_FIELDS = [
  { key: 'hometown', label: 'Hometown' },
  { key: 'favoriteFood', label: 'Favorite food' },
  { key: 'favoriteDrink', label: 'Favorite drink' },
  { key: 'hobbies', label: 'Hobbies' },
];

// LinkedIn/Instagram profile links — added 2026-08-11 per explicit
// feedback ("make it so people can put their linkedin and instagram
// profiles in their bio and make sure they are valid links to those
// websites so no one can put any other links"). Kept OUT of
// PRESET_FIELDS on purpose: those are plain character-capped text, these
// need URL-format validation instead, so they get their own regex + a
// dedicated inline-error render rather than being shoehorned into the
// same maxLength-only loop. The regexes here are the client-side
// UX-only copy of routes/auth.js's LINKEDIN_URL_REGEX/
// INSTAGRAM_URL_REGEX — the server re-checks the same shape, since this
// check is trivially bypassable via a direct API call.
const LINKEDIN_URL_REGEX = /^https:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_%]+\/?$/;
const INSTAGRAM_URL_REGEX = /^https:\/\/(www\.)?instagram\.com\/[a-zA-Z0-9_.]+\/?$/;

const SOCIAL_FIELDS = [
  {
    key: 'linkedinUrl',
    label: 'LinkedIn',
    placeholder: 'https://linkedin.com/in/yourname',
    regex: LINKEDIN_URL_REGEX,
    errorHint: 'Must be a linkedin.com/in/… profile link, e.g. https://linkedin.com/in/yourname',
  },
  {
    key: 'instagramUrl',
    label: 'Instagram',
    placeholder: 'https://instagram.com/yourhandle',
    regex: INSTAGRAM_URL_REGEX,
    errorHint: 'Must be an instagram.com/… profile link, e.g. https://instagram.com/yourhandle',
  },
];

// users.<column> -> the camelCase keys this page/api.js use. Centralized
// here so reading the initial form state from GET /auth/me's snake_case
// response and building PUT /auth/profile's camelCase body don't drift
// out of sync with each other.
function fieldsFromUser(user) {
  return {
    description: user?.description || '',
    hometown: user?.hometown || '',
    favoriteFood: user?.favorite_food || '',
    favoriteDrink: user?.favorite_drink || '',
    hobbies: user?.hobbies || '',
    linkedinUrl: user?.linkedin_url || '',
    instagramUrl: user?.instagram_url || '',
  };
}

export default function Profile() {
  const navigate = useNavigate();
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);

  // Which tab is showing — driven by the URL's ?tab= param (not plain
  // local state) so a link can land directly on Settings (see
  // Portal.jsx's Settings tile: to="/profile?tab=settings") rather than
  // always opening to Profile and making the person click again.
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') === 'settings' ? 'settings' : 'profile';

  const [editMode, setEditMode] = useState(false);
  const [fields, setFields] = useState(fieldsFromUser(null));
  const [saveStatus, setSaveStatus] = useState('idle'); // idle | saving | error
  const [saveError, setSaveError] = useState('');

  const [zoomOpen, setZoomOpen] = useState(false);
  const [cropSrc, setCropSrc] = useState(null); // the just-picked image, before crop is applied
  const fileInputRef = useRef(null);

  useEffect(() => {
    getCurrentUser()
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
          setFields(fieldsFromUser(data.user));
          setAuthCheck('ok');
        } else {
          setAuthCheck('denied');
        }
      })
      .catch(() => setAuthCheck('denied'));
  }, []);

  // Switches tabs by updating the URL's ?tab= param (replace: true so
  // clicking between tabs doesn't spam browser history with an entry
  // per click). If mid-edit on the Profile tab, cancels out of edit mode
  // first — there's no sensible "keep editing" state to preserve once
  // Settings' entirely different form is what's on screen.
  function switchTab(tab) {
    if (editMode) cancelEdit();
    setSearchParams(tab === 'settings' ? { tab: 'settings' } : {}, { replace: true });
  }

  async function handleLogout() {
    try {
      await logout();
    } finally {
      navigate('/');
    }
  }

  function enterEditMode() {
    setFields(fieldsFromUser(user));
    setSaveStatus('idle');
    setSaveError('');
    setEditMode(true);
  }

  function cancelEdit() {
    setFields(fieldsFromUser(user));
    setSaveStatus('idle');
    setSaveError('');
    setEditMode(false);
  }

  // Inline validation for the two social fields — returns '' when the
  // field is empty (clearing is always allowed) or valid, otherwise a
  // human-readable hint. Checked client-side for instant feedback; the
  // server (routes/auth.js's PUT /auth/profile) re-checks the same shape
  // regardless, since this is only UX, not the real enforcement.
  function socialFieldError(key) {
    const field = SOCIAL_FIELDS.find((f) => f.key === key);
    if (!field) return '';
    const value = fields[key];
    if (!value) return '';
    return field.regex.test(value) ? '' : field.errorHint;
  }
  const hasSocialErrors = SOCIAL_FIELDS.some((f) => socialFieldError(f.key));

  async function saveEdit() {
    if (hasSocialErrors) {
      setSaveStatus('error');
      setSaveError('Please fix the highlighted link(s) before saving.');
      return;
    }
    setSaveStatus('saving');
    setSaveError('');
    try {
      const data = await updateProfile(fields);
      setUser((prev) => ({ ...prev, ...data.user }));
      setEditMode(false);
      setSaveStatus('idle');
    } catch (err) {
      setSaveStatus('error');
      setSaveError(err.message || 'Could not save changes. Please try again.');
    }
  }

  function handlePhotoClick() {
    if (editMode) {
      fileInputRef.current?.click();
    } else if (user?.photo_url) {
      setZoomOpen(true);
    }
  }

  function handleFileChosen(e) {
    const file = e.target.files?.[0];
    e.target.value = ''; // allow picking the same file again later
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setSaveStatus('error');
      setSaveError('Please choose an image file.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCropSrc(reader.result);
    reader.readAsDataURL(file);
  }

  async function handleCropSave(croppedDataUrl) {
    setCropSrc(null);
    setSaveStatus('saving');
    setSaveError('');
    try {
      const data = await updateProfilePhoto(croppedDataUrl);
      setUser((prev) => ({ ...prev, photo_url: data.user.photo_url }));
      setSaveStatus('idle');
    } catch (err) {
      setSaveStatus('error');
      setSaveError(err.message || 'Could not save your photo. Please try again.');
    }
  }

  if (authCheck === 'checking') {
    return <div className="portal-page" />;
  }

  if (authCheck === 'denied') {
    return (
      <div className="portal-page portal-denied">
        <div className="portal-denied-card">
          <h1>Please log in</h1>
          <p>You need to be logged in to view your profile.</p>
          <Link to="/login" className="portal-pill">Go to Log In</Link>
        </div>
      </div>
    );
  }

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || user?.username || 'Member';

  return (
    <div className="portal-page">
      <header className="portal-header">
        <Link to="/" className="portal-logo">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AEE logo" />
          <span>AEE at USC</span>
        </Link>
        <div className="portal-title">Profile</div>
        <Link to="/portal" className="profile-back-link">
          ← Back to Member Portal
        </Link>
        <div className="portal-header-spacer" />
        {activeTab === 'profile' && !editMode && (
          <button type="button" className="profile-edit-btn" onClick={enterEditMode}>
            <EditIcon />
            Edit
          </button>
        )}
      </header>

      <div className="profile-body">
        {/* Instagram/Facebook-style in-place tabs, per explicit feedback
            2026-08-11 — see the file comment above for the full context.
            Sits inside .profile-body so it lines up with the content's
            own width, rather than spanning the full page like the header
            above it does. */}
        <div className="profile-tabs">
          <button
            type="button"
            className={`profile-tab${activeTab === 'profile' ? ' active' : ''}`}
            onClick={() => switchTab('profile')}
          >
            Profile
          </button>
          <button
            type="button"
            className={`profile-tab${activeTab === 'settings' ? ' active' : ''}`}
            onClick={() => switchTab('settings')}
          >
            Settings
          </button>
        </div>

        {activeTab === 'settings' ? (
          <SettingsTab user={user} onLogout={handleLogout} />
        ) : (
          <>
        <div className="profile-photo-row">
          <button
            type="button"
            className={`profile-photo-btn${editMode ? ' editable' : ''}${user?.photo_url ? ' has-photo' : ''}`}
            onClick={handlePhotoClick}
            aria-label={editMode ? 'Upload a new photo' : (user?.photo_url ? 'View larger photo' : 'No photo set')}
          >
            {user?.photo_url ? (
              <img src={user.photo_url} alt={fullName} className="profile-photo-img" />
            ) : (
              <PlaceholderAvatar size={140} />
            )}
            {editMode && (
              <span className="profile-photo-overlay">
                <CameraIcon />
                <span>{user?.photo_url ? 'Change photo' : 'Add photo'}</span>
              </span>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChosen}
            style={{ display: 'none' }}
          />

          <h1 className="profile-name">{fullName}</h1>
          {user?.title && <p className="profile-title-text">{user.title}</p>}
        </div>

        {saveStatus === 'error' && <p className="portal-error" style={{ textAlign: 'center' }}>{saveError}</p>}

        <div className="portal-content profile-description-box">
          <div className="profile-field-label-row">
            <div className="portal-label">Description</div>
            {editMode && (
              <span className="profile-char-counter">{fields.description.length}/{DESCRIPTION_MAX}</span>
            )}
          </div>
          {editMode ? (
            <textarea
              className="portal-textarea profile-description-textarea"
              value={fields.description}
              onChange={(e) => setFields((f) => ({ ...f, description: e.target.value.slice(0, DESCRIPTION_MAX) }))}
              maxLength={DESCRIPTION_MAX}
              placeholder="Say a bit about yourself…"
            />
          ) : (
            <p className="profile-description-text">
              {fields.description || <span className="portal-muted">No description yet.</span>}
            </p>
          )}
        </div>

        <div className="portal-content profile-preset-grid">
          {PRESET_FIELDS.map(({ key, label }) => (
            <div key={key} className="profile-preset-field">
              <div className="profile-field-label-row">
                <div className="portal-label">{label}</div>
                {editMode && (
                  <span className="profile-char-counter">{fields[key].length}/{PRESET_FIELD_MAX}</span>
                )}
              </div>
              {editMode ? (
                <input
                  type="text"
                  className="portal-input"
                  value={fields[key]}
                  onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value }))}
                  maxLength={PRESET_FIELD_MAX}
                  placeholder={label}
                />
              ) : (
                <p className="profile-preset-value">
                  {fields[key] || <span className="portal-muted">—</span>}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="portal-content profile-social-grid">
          {SOCIAL_FIELDS.map(({ key, label, placeholder }) => {
            const error = socialFieldError(key);
            return (
              <div key={key} className="profile-preset-field">
                <div className="profile-field-label-row">
                  <div className="portal-label">{label}</div>
                </div>
                {editMode ? (
                  <>
                    <input
                      type="url"
                      className="portal-input"
                      value={fields[key]}
                      onChange={(e) => setFields((f) => ({ ...f, [key]: e.target.value.trim() }))}
                      placeholder={placeholder}
                    />
                    {error && <p className="profile-field-error">{error}</p>}
                  </>
                ) : (
                  <p className="profile-social-value">
                    {fields[key] ? (
                      <a href={fields[key]} target="_blank" rel="noopener noreferrer">{fields[key]}</a>
                    ) : (
                      <span className="portal-muted">—</span>
                    )}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {editMode && (
          <div className="profile-edit-actions">
            <button type="button" className="portal-link-button" onClick={cancelEdit} disabled={saveStatus === 'saving'}>
              Cancel changes
            </button>
            <button type="button" className="portal-pill" onClick={saveEdit} disabled={saveStatus === 'saving' || hasSocialErrors}>
              {saveStatus === 'saving' ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        )}
          </>
        )}
      </div>

      {zoomOpen && user?.photo_url && (
        <PhotoLightbox src={user.photo_url} alt={fullName} onClose={() => setZoomOpen(false)} />
      )}

      {cropSrc && (
        <PhotoCropModal
          src={cropSrc}
          onCancel={() => setCropSrc(null)}
          onSave={handleCropSave}
        />
      )}
    </div>
  );
}

// ─── Settings tab (change password + log out) ───────────────────────────
//
// Moved here wholesale from Portal.jsx 2026-08-11, where it used to live
// as its own in-page portal section — same form, same logic, just
// relocated so it's a tab on this page instead. Reuses Portal.css's
// shared form classes (.portal-form, .portal-label, .portal-input,
// etc.), same as the rest of this file already does.

function SettingsTab({ user, onLogout }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    setFeedback('');

    if (newPassword !== confirmPassword) {
      setStatus('error');
      setFeedback('New password and confirmation do not match.');
      return;
    }

    try {
      const data = await changePassword(currentPassword, newPassword);
      setStatus('success');
      setFeedback(data?.message || 'Password updated.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="portal-section">
      <h2>Settings</h2>
      <p className="portal-section-sub">
        {user?.username && <>Username: <strong>{user.username}</strong><br /></>}
        Manage your account security below.
      </p>

      <form onSubmit={handleSubmit} className="portal-form">
        <label className="portal-label">
          Current password
          <input
            type="password"
            required
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="portal-input"
          />
        </label>
        <label className="portal-label">
          New password
          <input
            type="password"
            required
            minLength={8}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="portal-input"
            placeholder="At least 8 characters"
          />
        </label>
        <label className="portal-label">
          Confirm new password
          <input
            type="password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="portal-input"
          />
        </label>

        {status === 'error' && <p className="portal-error">{feedback}</p>}
        {status === 'success' && <p className="portal-success">{feedback}</p>}

        <button type="submit" disabled={status === 'submitting'} className="portal-pill">
          {status === 'submitting' ? 'Updating…' : 'Update Password'}
        </button>
      </form>

      <NewsletterPreference />

      <button type="button" onClick={onLogout} className="portal-link-button">
        Log out
      </button>
    </div>
  );
}

// ─── Newsletter opt-in (Settings) ────────────────────────────────────────
//
// Added 2026-08-16 per explicit feedback: "do the members for the portal
// unsubscribe in the settings for them, if they want to get notified to
// their email about notifications from newsletter so it could be a
// checkbox."
//
// Why this didn't already exist: the `subscribers` table is completely
// separate from `users` — subscribing has never required an account and
// having an account has never implied a subscription. So a member's only
// way to opt out was the token link at the bottom of a newsletter email
// they'd have to go dig up. This puts it where they'd actually look.
//
// Saves immediately on toggle rather than needing a separate Save button:
// it's a single boolean, and an unsaved checkbox is a classic way for
// someone to *think* they've unsubscribed when they haven't — which for
// an email preference is the one outcome worth designing against.
function NewsletterPreference() {
  const [status, setStatus] = useState('loading'); // loading | ready | saving | error
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getNewsletterPreference()
      .then((data) => {
        setSubscribed(Boolean(data?.subscribed));
        setEmail(data?.email || null);
        setStatus('ready');
      })
      .catch((err) => {
        setStatus('error');
        setErrorMessage(err.message || 'Could not load your newsletter setting.');
      });
  }, []);

  async function handleToggle(e) {
    const next = e.target.checked;
    const previous = subscribed;
    // Optimistic: flip immediately so the checkbox feels responsive,
    // then roll back if the request fails — otherwise the box would sit
    // unchanged for a beat and read as a broken click.
    setSubscribed(next);
    setStatus('saving');
    setErrorMessage('');
    try {
      await setNewsletterPreference(next);
      setStatus('ready');
    } catch (err) {
      setSubscribed(previous);
      setStatus('error');
      setErrorMessage(err.message || 'Could not save that. Please try again.');
    }
  }

  return (
    <div className="profile-newsletter-pref">
      <h3 className="profile-newsletter-pref-title">Newsletter emails</h3>

      {status === 'loading' ? (
        <p className="portal-section-sub">Loading…</p>
      ) : (
        <>
          <label className="profile-newsletter-pref-row">
            <input
              type="checkbox"
              checked={subscribed}
              onChange={handleToggle}
              disabled={status === 'saving'}
            />
            <span>Email me when AEE sends a newsletter</span>
          </label>
          <p className="profile-newsletter-pref-note">
            {subscribed
              ? <>Newsletters go to <strong>{email}</strong>. Uncheck to stop receiving them — you'll still see every newsletter in the portal.</>
              : <>You won't get newsletter emails{email ? <> at <strong>{email}</strong></> : null}. You can still read them anytime in the portal.</>}
          </p>
        </>
      )}

      {status === 'error' && <p className="portal-error">{errorMessage}</p>}
    </div>
  );
}

// ─── View-mode zoom (Snapchat-style tap-to-enlarge) ─────────────────────

function PhotoLightbox({ src, alt, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="profile-lightbox" onClick={onClose} role="button" tabIndex={-1} aria-label="Close">
      <img src={src} alt={alt} className="profile-lightbox-img" onClick={(e) => e.stopPropagation()} />
    </div>
  );
}

// ─── Edit-mode upload + crop ─────────────────────────────────────────────
//
// A minimal drag-to-reposition, scroll/pinch-free square crop: the image
// is shown at a fixed preview size with a fixed-size crop window centered
// on it (rounded-square, not circular — matches the actual e-board/
// member-card display shape, per explicit correction 2026-08-08: "it's
// not gonna look circular everywhere... I wanna do the square rounded,
// like we do for the e board"); the user drags the IMAGE underneath to
// choose what falls inside the window (rather than resizing the crop
// window itself) — simplest possible interaction that still satisfies
// "meet the pixel requirement for how it'll display." A zoom slider
// adjusts image scale within the same fixed window. The crop WINDOW
// shape is purely a CSS border-radius on .profile-crop-window (see
// Profile.css) — the drag/scale/export math below is shape-agnostic, it
// just fills a square region either way.

const CROP_PREVIEW_SIZE = 280; // on-screen size of the circular crop window

function PhotoCropModal({ src, onCancel, onSave }) {
  const imgRef = useRef(null);
  const [naturalSize, setNaturalSize] = useState(null); // { w, h }
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 }); // drag offset, in on-screen px
  const dragState = useRef(null);

  function handleImgLoad(e) {
    const { naturalWidth, naturalHeight } = e.target;
    setNaturalSize({ w: naturalWidth, h: naturalHeight });
    // Start at whichever scale makes the image fully cover the crop
    // circle (never smaller than the window), same as object-fit: cover.
    const minScale = CROP_PREVIEW_SIZE / Math.min(naturalWidth, naturalHeight);
    setScale(minScale);
    setOffset({ x: 0, y: 0 });
  }

  function onPointerDown(e) {
    dragState.current = { startX: e.clientX, startY: e.clientY, origin: offset };
  }
  function onPointerMove(e) {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setOffset({ x: dragState.current.origin.x + dx, y: dragState.current.origin.y + dy });
  }
  function onPointerUp() {
    dragState.current = null;
  }

  function handleSave() {
    if (!naturalSize) return;
    const canvas = document.createElement('canvas');
    canvas.width = PHOTO_DISPLAY_SIZE;
    canvas.height = PHOTO_DISPLAY_SIZE;
    const ctx = canvas.getContext('2d');

    // Map the on-screen crop window (CROP_PREVIEW_SIZE, with the image
    // drawn at `scale` and shifted by `offset`) onto the export canvas
    // (PHOTO_DISPLAY_SIZE) — same relative geometry, scaled up.
    const exportScale = PHOTO_DISPLAY_SIZE / CROP_PREVIEW_SIZE;
    const drawnW = naturalSize.w * scale * exportScale;
    const drawnH = naturalSize.h * scale * exportScale;
    const drawnX = (CROP_PREVIEW_SIZE / 2 + offset.x) * exportScale - drawnW / 2;
    const drawnY = (CROP_PREVIEW_SIZE / 2 + offset.y) * exportScale - drawnH / 2;

    ctx.drawImage(imgRef.current, drawnX, drawnY, drawnW, drawnH);
    onSave(canvas.toDataURL('image/jpeg', 0.9));
  }

  const minScale = naturalSize ? CROP_PREVIEW_SIZE / Math.min(naturalSize.w, naturalSize.h) : 1;

  return (
    <div className="profile-lightbox">
      <div className="profile-crop-modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="profile-crop-heading">Crop your photo</h2>
        <p className="portal-section-sub profile-crop-sub">
          This is how it'll look on the e-board and member cards. Drag to reposition, use the slider to zoom.
        </p>

        <div
          className="profile-crop-window"
          style={{ width: CROP_PREVIEW_SIZE, height: CROP_PREVIEW_SIZE }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
        >
          <img
            ref={imgRef}
            src={src}
            alt="Crop preview"
            onLoad={handleImgLoad}
            draggable={false}
            style={
              naturalSize
                ? {
                    width: naturalSize.w * scale,
                    height: naturalSize.h * scale,
                    transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))`,
                  }
                : { opacity: 0 }
            }
          />
        </div>

        {naturalSize && (
          <input
            type="range"
            className="profile-crop-zoom"
            min={minScale}
            max={minScale * 3}
            step={(minScale * 2) / 100}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
          />
        )}

        <div className="profile-crop-actions">
          <button type="button" className="portal-pill portal-pill-sm profile-crop-cancel" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="portal-pill portal-pill-sm" onClick={handleSave} disabled={!naturalSize}>
            Use this photo
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Small inline icons (no emoji, per explicit request) ────────────────

function EditIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4 12.5-12.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function CameraIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
      <circle cx="12" cy="14" r="3.5" stroke="currentColor" strokeWidth="1.8" fill="none" />
    </svg>
  );
}
