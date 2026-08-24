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

  const [status, setStatus] = useState('idle'); // idle | saving | sending | error | success
  const [feedback, setFeedback] = useState('');

  const [aiPrompt, setAiPrompt] = useState('');
  const [aiStatus, setAiStatus] = useState('idle'); // idle | working | error
  const [aiError, setAiError] = useState('');

  useEffect(() => {
    getCurrentUser()
      .then((data) => setAuthCheck(data?.user?.is_admin ? 'ok' : 'denied'))
      .catch(() => setAuthCheck('denied'));
  }, []);

  function loadLibrary() {
    getNewsletterTemplates()
      .then((data) => setTemplates(data?.templates || []))
      .catch(() => setTemplates([]));
  }
  useEffect(() => {
    if (authCheck === 'ok') loadLibrary();
  }, [authCheck]);

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
      updateBlock(index, { src: dataUrl });
      setStatus('idle');
      setFeedback('');
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
    const ok = await confirm({
      title: 'Send this newsletter?',
      message: `"${subject}" goes out to every current subscriber and is posted to the members portal. This cannot be unsent.`,
      confirmLabel: 'Send it',
      danger: true,
    });
    if (!ok) return;

    setStatus('sending');
    setFeedback('');
    try {
      const data = await sendNewsletterTemplate(subject, blocks);
      setStatus('success');
      setFeedback(data.message || 'Sent.');
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
              {status === 'sending' ? 'Sending…' : 'Send'}
            </button>
          </div>
        </div>

        {feedback && (
          <p className={status === 'error' ? 'nb-error' : 'nb-success'}>{feedback}</p>
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
