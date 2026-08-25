// src/pages/NewsletterBuilder.jsx
//
// The newsletter template builder. Added 2026-08-23 per explicit
// feedback: "want different multiple widgets for having different
// templates for newsletters and whatnot, place to save templates — take
// an import from Canva design or etc and be able to maybe edit on
// website the template even further... mimic mailchimp."
//
// HOW THE PIECES FIT
//   - A template is an ordered list of BLOCKS (heading, text, image,
//     button, divider, spacer). Blocks are structured data, not HTML.
//   - The email HTML is generated on the SERVER from those blocks
//     (newsletter-blocks.js). This page never builds email markup
//     itself — the "Preview" tab asks the server to render, so what you
//     see is byte-for-byte what subscribers get (minus the per-recipient
//     unsubscribe footer, which is added at send time).
//   - Canva fits in as an IMAGE: design there, export a PNG, upload it
//     as an image block, then add real text and buttons around it here.
//     That's the workflow Kev picked when asked, and it's what most orgs
//     actually do — Canva has no public API for importing an editable
//     design.
//
// WHY IMAGES GET COMPRESSED HERE
// Uploaded PNGs go through a <canvas> downscale before they're stored.
// A Canva export is commonly 2-5MB, templates live in Postgres as data
// URLs (the same choice profile photos already make), and email clients
// clip messages that get too large — Gmail famously truncates around
// 102KB of HTML, which a raw base64 image blows past instantly. Resizing
// to 1200px wide and re-encoding as JPEG keeps a full-width banner sharp
// on a retina screen at a fraction of the bytes.

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getCurrentUser,
  getNewsletterTemplates,
  getNewsletterTemplate,
  createNewsletterTemplate,
  updateNewsletterTemplate,
  deleteNewsletterTemplate,
  previewNewsletter,
  sendNewsletterTemplate,
  draftNewsletterWithAI,
  uploadNewsletterImage,
  getSubscribers,
  sendTestNewsletter,
} from '../lib/api';
import { useConfirm } from '../components/ConfirmDialog';
import './NewsletterBuilder.css';

// Kept in sync with newsletter-blocks.js's BLOCK_TYPES on the backend.
// The backend is the real gate (it drops anything not on its list); this
// copy just drives the "add a block" buttons.
const BLOCK_LIBRARY = [
  { type: 'heading', label: 'Heading', hint: 'Section title' },
  { type: 'text', label: 'Text', hint: 'A paragraph' },
  { type: 'image', label: 'Image', hint: 'Upload a Canva export' },
  { type: 'button', label: 'Button', hint: 'A call to action' },
  { type: 'divider', label: 'Divider', hint: 'A horizontal rule' },
  { type: 'spacer', label: 'Spacer', hint: 'Vertical breathing room' },
];

function newBlock(type) {
  switch (type) {
    case 'heading': return { type: 'heading', text: 'Section heading', level: 1, align: 'left' };
    case 'text': return { type: 'text', text: '', align: 'left' };
    case 'image': return { type: 'image', src: '', alt: '', align: 'center', href: '' };
    case 'button': return { type: 'button', label: 'Read more', href: 'https://aeeusc.com', align: 'center' };
    case 'divider': return { type: 'divider' };
    case 'spacer': return { type: 'spacer', height: 24 };
    default: return null;
  }
}

// Downscale + re-encode an uploaded image. See the file header for why.
const MAX_IMAGE_WIDTH = 1200;
const JPEG_QUALITY = 0.82;

function compressImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read that file.'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('That file does not look like an image.'));
      img.onload = () => {
        const scale = Math.min(1, MAX_IMAGE_WIDTH / img.width);
        const w = Math.round(img.width * scale);
        const h = Math.round(img.height * scale);
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        // White backdrop before drawing: a transparent PNG re-encoded to
        // JPEG would otherwise get black where the transparency was, and
        // the email background is white anyway.
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', JPEG_QUALITY));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// ── Draft autosave ───────────────────────────────────────────────────
//
// Kev: "say a refresh were to happen and the person was working in the
// middle of something, make sure no progress gets lost."
//
// Saved to this browser rather than to the server, deliberately. A
// server-side draft means deciding whose draft wins when two officers
// edit the same template, and answering that badly loses work rather
// than saving it. A browser-local draft is unambiguous: it is YOUR
// unsaved work, on YOUR machine, and it never fights anyone.
const DRAFT_KEY = 'aee.newsletter-builder.draft';
// Older than this and it is probably not the thing you were doing —
// restoring a week-old draft over a fresh start is its own kind of
// losing work.
const DRAFT_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function readDraft() {
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const draft = JSON.parse(raw);
    if (!draft || typeof draft !== 'object') return null;
    if (!Array.isArray(draft.blocks)) return null;
    if (!draft.savedAt || Date.now() - draft.savedAt > DRAFT_MAX_AGE_MS) return null;
    return draft;
  } catch (_) {
    // Private mode, disabled storage, or corrupt JSON. Not being able to
    // restore a draft must never stop the builder loading.
    return null;
  }
}

function clearDraft() {
  try { window.localStorage.removeItem(DRAFT_KEY); } catch (_) { /* nothing to do */ }
}

// Returns 'full', 'text-only', or 'failed'.
//
// The two-attempt shape exists because localStorage is capped at around
// 5MB per origin and a template with a couple of Canva banners in it can
// approach that on its own (images are stored inline as data URLs — see
// the file header). If the whole draft will not fit, saving the same
// draft with the image data stripped still preserves every heading,
// paragraph and button — which is the part that takes an hour to write
// and thirty seconds to re-upload.
function writeDraft(draft) {
  try {
    window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    return 'full';
  } catch (_) {
    try {
      const lightened = {
        ...draft,
        imagesDropped: true,
        blocks: draft.blocks.map((b) => (b.type === 'image' ? { ...b, src: '' } : b)),
      };
      window.localStorage.setItem(DRAFT_KEY, JSON.stringify(lightened));
      return 'text-only';
    } catch (_) {
      return 'failed';
    }
  }
}

function describeAge(savedAt) {
  const seconds = Math.max(0, Math.round((Date.now() - savedAt) / 1000));
  if (seconds < 90) return 'a moment ago';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
  const hours = Math.round(minutes / 60);
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? '' : 's'} ago`;
}

export default function NewsletterBuilder() {
  const navigate = useNavigate();
  const confirm = useConfirm();
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied

  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState(null); // null = unsaved draft
  const [templateName, setTemplateName] = useState('Untitled template');
  const [subject, setSubject] = useState('');
  const [blocks, setBlocks] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const [tab, setTab] = useState('edit'); // edit | preview
  const [previewHtml, setPreviewHtml] = useState('');
  const [previewStatus, setPreviewStatus] = useState('idle');

  const [status, setStatus] = useState('idle'); // idle | saving | sending | error | success | warn
  const [feedback, setFeedback] = useState('');

  // How many people a send would actually reach. Loaded on mount and
  // shown next to the Send button — added 2026-08-24 after a send that
  // "didn't go out".
  //
  // The send path itself was fine. With an empty list the backend does
  // exactly the right thing: it posts the edition to the members portal
  // and reports "no email subscribers to send to yet". But that arrived
  // in the same green success line as a real send, AFTER the click, and
  // after a confirm dialog that had already promised the newsletter was
  // going "to every current subscriber". Nothing said the list was empty
  // beforehand. Quick News Blast has had a subscriber count since it was
  // built; the builder simply never got one.
  const [subscriberCount, setSubscriberCount] = useState(null);

  // Test send — added 2026-08-24 alongside autosave.
  const [testEmail, setTestEmail] = useState('');
  const [testStatus, setTestStatus] = useState('idle'); // idle | sending

  // Autosave bookkeeping. `restored` drives the one-line notice that
  // says work was brought back, so a silent restore never leaves someone
  // wondering why the editor is not empty.
  const [restored, setRestored] = useState(null); // { savedAt, imagesDropped } | null
  const [draftWarning, setDraftWarning] = useState('');
  // Blocks the autosave effect until the initial restore has run, so an
  // empty first render cannot overwrite a good saved draft.
  const draftReady = useRef(false);

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiStatus, setAiStatus] = useState('idle'); // idle | working | error
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    getCurrentUser()
      .then((data) => setAuthCheck(data?.user?.is_admin ? 'ok' : 'denied'))
      .catch(() => setAuthCheck('denied'));
  }, []);

  useEffect(() => {
    if (authCheck !== 'ok') return;
    // Failure is left silent on purpose: not knowing the count is a
    // worse Send button, not a broken page, and the send itself still
    // reports what happened.
    getSubscribers()
      .then((data) => setSubscriberCount(data?.count ?? 0))
      .catch(() => setSubscriberCount(null));
  }, [authCheck]);

  function loadLibrary() {
    getNewsletterTemplates()
      .then((data) => setTemplates(data?.templates || []))
      .catch(() => setTemplates([]));
  }
  useEffect(() => {
    if (authCheck === 'ok') loadLibrary();
  }, [authCheck]);

  // Restore whatever was in progress, ONCE, as soon as we know the
  // person is allowed to be here. Restoring silently and then saying so
  // in one line beats prompting: someone who just lost a tab wants their
  // work back, not a dialog between them and it. The line offers a way
  // to start fresh for the case where they didn't.
  useEffect(() => {
    if (authCheck !== 'ok' || draftReady.current) return;
    const draft = readDraft();
    if (draft) {
      setTemplateId(draft.templateId ?? null);
      setTemplateName(draft.templateName || 'Untitled template');
      setSubject(draft.subject || '');
      setBlocks(draft.blocks || []);
      setRestored({ savedAt: draft.savedAt, imagesDropped: Boolean(draft.imagesDropped) });
    }
    draftReady.current = true;
  }, [authCheck]);

  // Save on a short debounce after every change. Debounced rather than
  // per-keystroke because serialising a template with images in it is
  // not free, and a refresh a few hundred milliseconds after the last
  // keypress is not a scenario worth optimising for.
  useEffect(() => {
    if (!draftReady.current) return undefined;
    const id = setTimeout(() => {
      // An empty editor is not worth remembering, and saving it would
      // quietly overwrite a real draft with nothing.
      if (!subject.trim() && blocks.length === 0) {
        clearDraft();
        return;
      }
      const outcome = writeDraft({
        templateId, templateName, subject, blocks, savedAt: Date.now(),
      });
      if (outcome === 'text-only') {
        setDraftWarning('This draft is too big to keep the images in local backup — your text is saved, the pictures are not.');
      } else if (outcome === 'failed') {
        setDraftWarning("This browser won't let us save a backup draft, so don't refresh without saving as a template first.");
      } else {
        setDraftWarning('');
      }
    }, 600);
    return () => clearTimeout(id);
  }, [templateId, templateName, subject, blocks]);

  // ── block operations ───────────────────────────────────────────────
  function addBlock(type) {
    const b = newBlock(type);
    if (!b) return;
    setBlocks((prev) => [...prev, b]);
    setSelectedIndex(blocks.length);
  }
  function updateBlock(index, patch) {
    setBlocks((prev) => prev.map((b, i) => (i === index ? { ...b, ...patch } : b)));
  }
  function removeBlock(index) {
    setBlocks((prev) => prev.filter((_, i) => i !== index));
    setSelectedIndex(null);
  }
  function moveBlock(index, delta) {
    setBlocks((prev) => {
      const target = index + delta;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
    setSelectedIndex(index + delta);
  }

  async function handleImageUpload(index, file) {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setStatus('error');
      setFeedback('Please choose an image file.');
      return;
    }
    try {
      const dataUrl = await compressImageFile(file);
      // Show it immediately, then swap in the hosted URL once it lands.
      // Waiting for the round-trip before anything appears would make
      // picking an image feel broken on a slow connection.
      updateBlock(index, { src: dataUrl });
      setStatus('idle');
      setFeedback('');

      // Gmail does not support data: URLs in images, so the picture has
      // to be served from somewhere before it can survive a send. The
      // editor holds the hosted URL from here on, which means what you
      // see in Preview is what actually ships.
      try {
        const { url } = await uploadNewsletterImage(dataUrl);
        updateBlock(index, { src: url });
      } catch (uploadErr) {
        // The block keeps its data: URL. It will still look right in the
        // builder and in the portal archive, and the send path uploads
        // it again as a fallback — so this is a warning, not a failure.
        setStatus('error');
        setFeedback(
          `${uploadErr.message || 'Could not upload that image.'} It will be uploaded when you send.`
        );
      }
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Could not process that image.');
    }
  }

  // ── template library ───────────────────────────────────────────────
  function startNew() {
    setTemplateId(null);
    setTemplateName('Untitled template');
    setSubject('');
    setBlocks([]);
    setSelectedIndex(null);
    setStatus('idle');
    setFeedback('');
  }

  async function openTemplate(id) {
    try {
      const data = await getNewsletterTemplate(id);
      setTemplateId(data.template.id);
      setTemplateName(data.template.name);
      setBlocks(Array.isArray(data.template.blocks) ? data.template.blocks : []);
      setSelectedIndex(null);
      setTab('edit');
      setStatus('idle');
      setFeedback('');
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Could not open that template.');
    }
  }

  async function handleSave() {
    setStatus('saving');
    setFeedback('');
    try {
      if (templateId) {
        await updateNewsletterTemplate(templateId, templateName, blocks);
      } else {
        const data = await createNewsletterTemplate(templateName, blocks);
        setTemplateId(data.template.id);
      }
      setStatus('success');
      setFeedback('Template saved.');
      loadLibrary();
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Could not save the template.');
    }
  }

  async function handleDeleteTemplate(t) {
    const ok = await confirm({
      title: 'Delete this template?',
      message: `"${t.name}" will be removed. Newsletters you've already sent using it are unaffected.`,
      confirmLabel: 'Delete',
      danger: true,
    });
    if (!ok) return;
    try {
      await deleteNewsletterTemplate(t.id);
      if (templateId === t.id) startNew();
      loadLibrary();
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Could not delete that template.');
    }
  }

  // ── preview ────────────────────────────────────────────────────────
  async function showPreview() {
    setTab('preview');
    setPreviewStatus('loading');
    try {
      const data = await previewNewsletter(blocks, subject);
      setPreviewHtml(data.html || '');
      setPreviewStatus('ok');
    } catch (err) {
      setPreviewStatus('error');
      setPreviewHtml('');
      setStatus('error');
      setFeedback(err.message || 'Could not render the preview.');
    }
  }

  // ── test send ──────────────────────────────────────────────────────
  // Sends to one address so the edition can be checked in a real inbox.
  // The Preview tab shows the markup; only a delivered message shows
  // what Gmail and Outlook actually do to it.
  async function handleTestSend() {
    if (!subject.trim()) {
      setStatus('error');
      setFeedback('Add a subject line before sending a test.');
      return;
    }
    if (blocks.length === 0) {
      setStatus('error');
      setFeedback('Add at least one block before sending a test.');
      return;
    }
    if (!testEmail.trim()) {
      setStatus('error');
      setFeedback('Enter an address to send the test to.');
      return;
    }

    setTestStatus('sending');
    setFeedback('');
    try {
      const data = await sendTestNewsletter(subject, blocks, testEmail.trim());
      setStatus('success');
      setFeedback(data.message || 'Test sent.');
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Could not send the test.');
    } finally {
      setTestStatus('idle');
    }
  }

  // ── send ───────────────────────────────────────────────────────────
  async function handleSend() {
    if (!subject.trim()) {
      setStatus('error');
      setFeedback('Add a subject line before sending.');
      return;
    }
    if (blocks.length === 0) {
      setStatus('error');
      setFeedback('Add at least one block before sending.');
      return;
    }
    // Say the actual number in the dialog. "Every current subscriber"
    // sounds like a lot of people even when it is nobody.
    const audience =
      subscriberCount === null
        ? 'every current subscriber'
        : `${subscriberCount} email subscriber${subscriberCount === 1 ? '' : 's'}`;
    const ok = await confirm({
      title: subscriberCount === 0 ? 'No email subscribers yet' : 'Send this newsletter?',
      message:
        subscriberCount === 0
          ? `Nobody is on the email list, so "${subject}" will only be posted to the members portal — no email will go out. Members can join the list from Settings in the portal.`
          : `"${subject}" goes out to ${audience} and is posted to the members portal. This cannot be unsent.`,
      confirmLabel: subscriberCount === 0 ? 'Post to the portal' : 'Send it',
      danger: subscriberCount !== 0,
    });
    if (!ok) return;

    setStatus('sending');
    setFeedback('');
    try {
      const data = await sendNewsletterTemplate(subject, blocks);

      // A send that reached nobody is not a success, whatever the HTTP
      // status says. `firstError` carries the reason the backend saw —
      // most often Resend refusing every address because
      // RESEND_FROM_EMAIL is unset and mail is going out from the shared
      // onboarding@resend.dev sandbox, which may only deliver to the
      // Resend account owner. That sentence used to exist only in the
      // Render logs.
      const reachedNobody = data?.sent === 0;
      setStatus(reachedNobody ? 'warn' : 'success');
      setFeedback(
        [data?.message || 'Sent.', reachedNobody && data?.firstError ? `Reason: ${data.firstError}` : null]
          .filter(Boolean)
          .join(' ')
      );

      // The edition has gone out; there is no in-progress work left to
      // restore, and leaving the draft behind would resurrect a sent
      // newsletter the next time the builder opens.
      if (!reachedNobody) {
        clearDraft();
        setRestored(null);
      }

      // Refresh the count — an unsubscribe between page load and send
      // would otherwise leave a stale number on the button.
      getSubscribers()
        .then((d) => setSubscriberCount(d?.count ?? 0))
        .catch(() => {});
    } catch (err) {
      setStatus('error');
      setFeedback(err.message || 'Could not send the newsletter.');
    }
  }

  // ── AI drafting ────────────────────────────────────────────────────
  async function handleAiDraft() {
    if (!aiPrompt.trim()) return;
    setAiStatus('working');
    setAiError('');
    try {
      const data = await draftNewsletterWithAI(aiPrompt);
      if (data.subject) setSubject(data.subject);
      // Appended, not replaced — losing work you'd already laid out
      // because you asked for a draft would be a nasty surprise.
      setBlocks((prev) => [...prev, ...(data.blocks || [])]);
      setAiStatus('idle');
      setAiPrompt('');
    } catch (err) {
      setAiStatus('error');
      setAiError(err.message || 'Could not draft that.');
    }
  }

  const blockCount = blocks.length;
  const approxSize = useMemo(() => {
    try {
      return Math.round(new Blob([JSON.stringify(blocks)]).size / 1024);
    } catch {
      return null;
    }
  }, [blocks]);

  if (authCheck === 'checking') return <div className="nb-page" />;

  if (authCheck === 'denied') {
    return (
      <div className="nb-page nb-denied">
        <div className="nb-denied-card">
          <h1>Admin access required</h1>
          <p>You need to be logged in as an admin to build newsletters.</p>
          <Link to="/login" className="nb-pill">Go to Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="nb-page">
      <header className="nb-header">
        <Link to="/" className="nb-logo">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AEE logo" />
          <span>AEE at USC</span>
        </Link>
        <Link to="/portal" className="nb-back-link">← Back to Member Portal</Link>
        <div className="nb-header-spacer" />
      </header>

      <div className="nb-body">
        <div className="nb-toolbar">
          <div>
            <h1 className="nb-title">Newsletter Builder</h1>
            <p className="nb-sub">
              {blockCount} block{blockCount === 1 ? '' : 's'}
              {approxSize !== null && <> · about {approxSize} KB</>}
              {approxSize !== null && approxSize > 100 && (
                <span className="nb-warn"> · large emails get clipped by Gmail — consider smaller images</span>
              )}
            </p>
          </div>
          <div className="nb-toolbar-actions">
            <button type="button" className="nb-btn" onClick={startNew}>New</button>
            <button
              type="button"
              className="nb-btn"
              onClick={handleSave}
              disabled={status === 'saving'}
            >
              {status === 'saving' ? 'Saving…' : templateId ? 'Save' : 'Save as template'}
            </button>
            <button type="button" className="nb-btn nb-btn-primary" onClick={handleSend} disabled={status === 'sending'}>
              {status === 'sending'
                ? 'Sending…'
                : subscriberCount === null
                  ? 'Send'
                  : `Send to ${subscriberCount}`}
            </button>
          </div>
        </div>

        {/* Autosave feedback. The restore line is the important one: a
            silent restore that says nothing leaves someone wondering why
            the editor isn't empty. */}
        {restored && (
          <p className="nb-notice nb-restored">
            Picked up where you left off — draft saved {describeAge(restored.savedAt)}.
            {restored.imagesDropped && ' Images weren\u2019t part of the backup, so any you had added need re-uploading.'}
            {' '}
            <button
              type="button"
              className="nb-inline-btn"
              onClick={() => { clearDraft(); setRestored(null); startNew(); }}
            >
              Start fresh instead
            </button>
          </p>
        )}
        {draftWarning && <p className="nb-notice">{draftWarning}</p>}

        {/* Test send. Sits above the subscriber warning because the
            sensible order is "check it yourself, then send it to
            everyone". */}
        <div className="nb-testrow">
          <label className="nb-testrow-label" htmlFor="nb-test-email">Send a test to</label>
          <input
            id="nb-test-email"
            type="email"
            className="nb-input nb-testrow-input"
            placeholder="you@usc.edu"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
          />
          <button
            type="button"
            className="nb-btn"
            onClick={handleTestSend}
            disabled={testStatus === 'sending'}
          >
            {testStatus === 'sending' ? 'Sending…' : 'Send test'}
          </button>
          <span className="nb-testrow-hint">
            Goes to that address only, subject-lined [TEST], and isn't posted to the portal.
          </span>
        </div>

        {/* An empty list is worth saying before the click, not after. */}
        {subscriberCount === 0 && (
          <p className="nb-notice">
            No email subscribers yet — sending will only post this to the members portal.
            Members can join the list under Settings in the portal.
          </p>
        )}

        {feedback && (
          <p className={status === 'error' ? 'nb-error' : status === 'warn' ? 'nb-notice' : 'nb-success'}>
            {feedback}
          </p>
        )}

        <div className="nb-layout">
          {/* ── Left: template library + add-block palette ── */}
          <aside className="nb-side">
            <div className="nb-side-section">
              <h2 className="nb-side-title">Saved templates</h2>
              {templates.length === 0 ? (
                <p className="nb-muted">Nothing saved yet.</p>
              ) : (
                <ul className="nb-template-list">
                  {templates.map((t) => (
                    <li key={t.id} className={t.id === templateId ? 'active' : ''}>
                      <button type="button" className="nb-template-open" onClick={() => openTemplate(t.id)}>
                        <span className="nb-template-name">{t.name}</span>
                        <span className="nb-template-meta">{t.block_count} block{t.block_count === 1 ? '' : 's'}</span>
                      </button>
                      <button
                        type="button"
                        className="nb-template-delete"
                        aria-label={`Delete ${t.name}`}
                        onClick={() => handleDeleteTemplate(t)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="nb-side-section">
              <h2 className="nb-side-title">Add a block</h2>
              <div className="nb-palette">
                {BLOCK_LIBRARY.map((b) => (
                  <button type="button" key={b.type} className="nb-palette-btn" onClick={() => addBlock(b.type)}>
                    <span className="nb-palette-label">{b.label}</span>
                    <span className="nb-palette-hint">{b.hint}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="nb-side-section">
              <h2 className="nb-side-title">Draft with AI</h2>
              <textarea
                className="nb-input nb-textarea"
                rows={3}
                placeholder="e.g. Recap Olympic Week and invite people to the next general meeting"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
              />
              <button
                type="button"
                className="nb-btn nb-btn-full"
                onClick={handleAiDraft}
                disabled={aiStatus === 'working' || !aiPrompt.trim()}
              >
                {aiStatus === 'working' ? 'Drafting…' : 'Draft with AI'}
              </button>
              {aiStatus === 'error' && <p className="nb-error nb-error-sm">{aiError}</p>}
              <p className="nb-muted nb-hint">Adds blocks to the end — your existing layout is kept.</p>
            </div>
          </aside>

          {/* ── Right: canvas ── */}
          <main className="nb-main">
            <div className="nb-meta-row">
              <label className="nb-field">
                Template name
                <input
                  type="text"
                  className="nb-input"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </label>
              <label className="nb-field">
                Subject line
                <input
                  type="text"
                  className="nb-input"
                  placeholder="What subscribers see in their inbox"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </label>
            </div>

            <div className="nb-tabs">
              <button
                type="button"
                className={`nb-tab${tab === 'edit' ? ' active' : ''}`}
                onClick={() => setTab('edit')}
              >
                Edit
              </button>
              <button
                type="button"
                className={`nb-tab${tab === 'preview' ? ' active' : ''}`}
                onClick={showPreview}
              >
                Preview
              </button>
            </div>

            {tab === 'edit' && (
              <div className="nb-canvas">
                {blocks.length === 0 && (
                  <p className="nb-empty">
                    Empty template. Add a block from the left, or describe what you want and draft it with AI.
                  </p>
                )}
                {blocks.map((block, i) => (
                  <BlockEditor
                    key={i}
                    block={block}
                    index={i}
                    total={blocks.length}
                    selected={selectedIndex === i}
                    onSelect={() => setSelectedIndex(i)}
                    onChange={(patch) => updateBlock(i, patch)}
                    onRemove={() => removeBlock(i)}
                    onMove={(d) => moveBlock(i, d)}
                    onUpload={(file) => handleImageUpload(i, file)}
                  />
                ))}
              </div>
            )}

            {tab === 'preview' && (
              <div className="nb-preview">
                {previewStatus === 'loading' && <p className="nb-muted">Rendering…</p>}
                {previewStatus === 'ok' && (
                  <>
                    <p className="nb-muted nb-hint">
                      This is the real email HTML, rendered by the server — the unsubscribe footer is added per
                      recipient at send time.
                    </p>
                    {/* Sandboxed iframe: the preview is a full HTML
                        document and must not inherit this page's CSS or
                        be able to run anything. srcDoc + a sandbox with
                        no allow-scripts gives an accurate, inert render. */}
                    <iframe
                      className="nb-preview-frame"
                      title="Newsletter preview"
                      srcDoc={previewHtml}
                      sandbox=""
                    />
                  </>
                )}
                {previewStatus === 'error' && <p className="nb-error">Could not render the preview.</p>}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// ─── One block's editing controls ────────────────────────────────────────

function BlockEditor({ block, index, total, selected, onSelect, onChange, onRemove, onMove, onUpload }) {
  const fileRef = useRef(null);

  return (
    <div
      className={`nb-block${selected ? ' selected' : ''}`}
      onClick={onSelect}
      role="group"
      aria-label={`${block.type} block`}
    >
      <div className="nb-block-bar">
        <span className="nb-block-type">{block.type}</span>
        <div className="nb-block-actions">
          <button type="button" onClick={(e) => { e.stopPropagation(); onMove(-1); }} disabled={index === 0} aria-label="Move up">↑</button>
          <button type="button" onClick={(e) => { e.stopPropagation(); onMove(1); }} disabled={index === total - 1} aria-label="Move down">↓</button>
          <button type="button" className="nb-block-remove" onClick={(e) => { e.stopPropagation(); onRemove(); }} aria-label="Remove block">×</button>
        </div>
      </div>

      {block.type === 'heading' && (
        <div className="nb-block-fields">
          <input
            type="text"
            className="nb-input"
            value={block.text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Heading text"
          />
          <div className="nb-inline-controls">
            <select className="nb-input nb-select" value={block.level} onChange={(e) => onChange({ level: Number(e.target.value) })}>
              <option value={1}>Large</option>
              <option value={2}>Small</option>
            </select>
            <AlignPicker value={block.align} onChange={(align) => onChange({ align })} />
          </div>
        </div>
      )}

      {block.type === 'text' && (
        <div className="nb-block-fields">
          <textarea
            className="nb-input nb-textarea"
            rows={4}
            value={block.text}
            onChange={(e) => onChange({ text: e.target.value })}
            placeholder="Write your paragraph. Line breaks are preserved."
          />
          <AlignPicker value={block.align} onChange={(align) => onChange({ align })} />
        </div>
      )}

      {block.type === 'image' && (
        <div className="nb-block-fields">
          {block.src ? (
            <img src={block.src} alt={block.alt || ''} className="nb-image-preview" />
          ) : (
            <div className="nb-image-empty">No image yet</div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={(e) => { onUpload(e.target.files?.[0]); e.target.value = ''; }}
          />
          <button type="button" className="nb-btn nb-btn-full" onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}>
            {block.src ? 'Replace image' : 'Upload image (e.g. a Canva PNG)'}
          </button>
          <input
            type="text"
            className="nb-input"
            value={block.alt}
            onChange={(e) => onChange({ alt: e.target.value })}
            placeholder="Alt text — describes the image for screen readers"
          />
          <input
            type="url"
            className="nb-input"
            value={block.href}
            onChange={(e) => onChange({ href: e.target.value })}
            placeholder="Link when clicked (optional)"
          />
          <AlignPicker value={block.align} onChange={(align) => onChange({ align })} />
        </div>
      )}

      {block.type === 'button' && (
        <div className="nb-block-fields">
          <input
            type="text"
            className="nb-input"
            value={block.label}
            onChange={(e) => onChange({ label: e.target.value })}
            placeholder="Button label"
          />
          <input
            type="url"
            className="nb-input"
            value={block.href}
            onChange={(e) => onChange({ href: e.target.value })}
            placeholder="https://…"
          />
          <AlignPicker value={block.align} onChange={(align) => onChange({ align })} />
        </div>
      )}

      {block.type === 'divider' && <p className="nb-muted nb-block-note">A horizontal rule.</p>}

      {block.type === 'spacer' && (
        <div className="nb-block-fields">
          <label className="nb-field nb-field-inline">
            Height: {block.height}px
            <input
              type="range"
              min={4}
              max={120}
              step={4}
              value={block.height}
              onChange={(e) => onChange({ height: Number(e.target.value) })}
            />
          </label>
        </div>
      )}
    </div>
  );
}

function AlignPicker({ value, onChange }) {
  return (
    <div className="nb-align" role="group" aria-label="Alignment">
      {['left', 'center', 'right'].map((a) => (
        <button
          key={a}
          type="button"
          className={`nb-align-btn${value === a ? ' active' : ''}`}
          onClick={(e) => { e.stopPropagation(); onChange(a); }}
          aria-pressed={value === a}
        >
          {a}
        </button>
      ))}
    </div>
  );
}
