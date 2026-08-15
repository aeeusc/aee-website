// src/pages/Newsletter.jsx
//
// The member-facing Newsletter archive became its own standalone page
// 2026-08-12, per explicit feedback: "we need to get a... the newsletter
// page functioning, so we'll have a... redirect to that, have a subpage,
// and then have what I'm envisioning right now is just padding on the
// left or right. So a good chunk of space, and then it'll just go down
// from newest to oldest. And then maybe you could also filter as well
// with a little little button. And then, yes, see the newsletters, and
// then you could click on them, and it'll... bring you to a sub subpage
// where you can read more on the info."
//
// Replaces the small in-page "Newsletter" tab that used to render right
// inside Portal.jsx (see NewsletterArchive there, now removed) — same
// "became a real subpage" pattern Members/Settings/Dashboard/Calendar/
// Org Chart/Tasks all went through (see Portal.jsx's SECTIONS array).
//
// Layout, per the description above: a single centered column with
// generous side padding/margin (not full-bleed), newest-first (the
// backend's GET /newsletter/archive already returns them in that order,
// so no client-side re-sort needed), a simple subject-search filter
// ("a little little button" — implemented as a search field so it stays
// useful even with an empty/short list, rather than a filter dropdown
// with no real categories to filter by), and each row links to its own
// detail subpage (see NewsletterDetail.jsx) instead of expanding inline.
//
// No backend changes were needed for this page — GET /newsletter/archive
// already returns every send's id/subject/message/sent_at, session-gated
// to any logged-in member (not admin-only), which is everything both
// this list and the detail page need.
//
// Requires an active session, same pattern as Calendar.jsx/Tasks.jsx.

import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser, getNewsletterArchive } from '../lib/api';
import './Newsletter.css';

// Plain-text preview of a send's body for the list row — the full body
// (which can be long) only renders on the detail subpage.
const PREVIEW_LENGTH = 160;
function previewText(message) {
  if (!message) return '';
  const trimmed = message.trim().replace(/\s+/g, ' ');
  return trimmed.length > PREVIEW_LENGTH ? `${trimmed.slice(0, PREVIEW_LENGTH)}…` : trimmed;
}

export default function NewsletterPage() {
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [status, setStatus] = useState('loading'); // loading | ok | error
  const [sends, setSends] = useState([]);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');

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
    getNewsletterArchive()
      .then((data) => {
        setSends(data?.sends || []);
        setStatus('ok');
      })
      .catch((err) => {
        setError(err.message || 'Could not load the newsletter archive.');
        setStatus('error');
      });
  }, [authCheck]);

  // Client-side filter by subject (and body, as a bonus) — kept simple
  // since there are no categories/tags in the newsletter_sends schema to
  // filter by; a search box is the most useful "filter" for a flat list
  // like this. Already-newest-first from the backend, so filtering never
  // needs to re-sort.
  const filteredSends = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return sends;
    return sends.filter(
      (s) => s.subject.toLowerCase().includes(q) || s.message.toLowerCase().includes(q)
    );
  }, [sends, query]);

  if (authCheck === 'checking') {
    return <div className="newsletter-page" />;
  }

  if (authCheck === 'denied') {
    return (
      <div className="newsletter-page newsletter-denied">
        <div className="newsletter-denied-card">
          <h1>Please log in</h1>
          <p>You need to be logged in to view the newsletter archive.</p>
          <Link to="/login" className="newsletter-pill">Go to Log In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-page">
      <header className="newsletter-header">
        <Link to="/" className="newsletter-logo">
          <img src={`${import.meta.env.BASE_URL}logo.svg`} alt="AEE logo" />
          <span>AEE at USC</span>
        </Link>
        <Link to="/portal" className="newsletter-back-link">← Back to Member Portal</Link>
        <div className="newsletter-header-spacer" />
      </header>

      <div className="newsletter-body">
        <div className="newsletter-toolbar">
          <h1 className="newsletter-title">Newsletter</h1>
          <div className="newsletter-search">
            <SearchIcon />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter by keyword…"
              className="newsletter-search-input"
              aria-label="Filter newsletters"
            />
          </div>
        </div>
        <p className="newsletter-sub">Past updates sent to subscribers, newest first.</p>

        {status === 'loading' && <p className="newsletter-muted">Loading…</p>}
        {status === 'error' && <p className="newsletter-error">{error}</p>}
        {status === 'ok' && sends.length === 0 && (
          <p className="newsletter-muted">No newsletters have been sent yet.</p>
        )}
        {status === 'ok' && sends.length > 0 && filteredSends.length === 0 && (
          <p className="newsletter-muted">No newsletters match "{query}".</p>
        )}
        {status === 'ok' && filteredSends.length > 0 && (
          <div className="newsletter-list">
            {filteredSends.map((send) => (
              <Link key={send.id} to={`/newsletter/${send.id}`} className="newsletter-item">
                <div className="newsletter-item-main">
                  <div className="newsletter-item-subject">{send.subject}</div>
                  <div className="newsletter-item-preview">{previewText(send.message)}</div>
                </div>
                <div className="newsletter-item-side">
                  <span className="newsletter-item-date">
                    {new Date(send.sent_at).toLocaleDateString(undefined, {
                      year: 'numeric', month: 'short', day: 'numeric',
                    })}
                  </span>
                  <ChevronRightIcon />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <circle cx="9.5" cy="9.5" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M18.5 18.5l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M7 3.5L12.5 9 7 14.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}
