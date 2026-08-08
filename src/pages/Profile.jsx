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
import { Link } from 'react-router-dom';
import { getCurrentUser, updateProfile, updateProfilePhoto } from '../lib/api';
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
const DESCRIPTION_MAX = 500;

const PRESET_FIELDS = [
  { key: 'hometown', label: 'Hometown' },
  { key: 'favoriteFood', label: 'Favorite food' },
  { key: 'favoriteDrink', label: 'Favorite drink' },
  { key: 'hobbies', label: 'Hobbies' },
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
  };
}

export default function Profile() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [user, setUser] = useState(null);

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

  async function saveEdit() {
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
        <div className="portal-header-spacer" />
        {!editMode && (
          <button type="button" className="profile-edit-btn" onClick={enterEditMode}>
            <EditIcon />
            Edit
          </button>
        )}
      </header>

      <div className="profile-body">
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
          <div className="portal-label" style={{ marginBottom: 8 }}>Description</div>
          {editMode ? (
            <textarea
              className="portal-textarea"
              value={fields.description}
              onChange={(e) => setFields((f) => ({ ...f, description: e.target.value }))}
              maxLength={DESCRIPTION_MAX}
              rows={4}
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
              <div className="portal-label" style={{ marginBottom: 6 }}>{label}</div>
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

        {editMode && (
          <div className="profile-edit-actions">
            <button type="button" className="portal-link-button" onClick={cancelEdit} disabled={saveStatus === 'saving'}>
              Cancel changes
            </button>
            <button type="button" className="portal-pill" onClick={saveEdit} disabled={saveStatus === 'saving'}>
              {saveStatus === 'saving' ? 'Saving…' : 'Save changes'}
            </button>
          </div>
        )}

        <Link to="/portal" className="portal-link-button" style={{ marginTop: 24 }}>
          ← Back to Member Portal
        </Link>
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
// is shown at a fixed preview size with a fixed-size circular crop
// window centered on it; the user drags the IMAGE underneath to choose
// what falls inside the circle (rather than resizing the crop window
// itself) — simplest possible interaction that still satisfies "meet the
// pixel requirement for how it'll display." A zoom slider adjusts image
// scale within the same fixed window.

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
        <p className="portal-section-sub">
          This is how it'll look everywhere your photo is shown. Drag to reposition, use the slider to zoom.
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

        <div className="profile-edit-actions">
          <button type="button" className="portal-link-button" onClick={onCancel}>Cancel</button>
          <button type="button" className="portal-pill" onClick={handleSave} disabled={!naturalSize}>
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
