// src/pages/NewsletterDetail.jsx
//
// The "sub subpage" from Newsletter.jsx's list — reached by clicking a
// newsletter row, shows that one send's full subject/date/body. See
// Newsletter.jsx's file comment for the full feature context.
//
// There's no single-item GET /newsletter/archive/:id endpoint on the
// backend (see routes/newsletter.js) — rather than adding one, this page
// fetches the same full archive the list page does (GET /newsletter/
// archive is already session-gated and returns everything, and this is a
// small club's send history, not a large dataset) and finds the matching
// id client-side. That keeps this working correctly even on a direct
// link or a hard refresh (not just when navigated to from the list),
// consistent with how every other "kept intentionally simple" piece of
// this app avoids adding backend surface area it doesn't need.

import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCurrentUser, getNewsletterArchive } from '../lib/api';
import './Newsletter.css';

export default function NewsletterDetailPage() {
  const { id } = useParams();
  const [authCheck, setAuthCheck] = useState('checking'); // checking | ok | denied
  const [status, setStatus] = useState('loading'); // loading | ok | notfound | error
  const [send, setSend] = useState(null);
  const [error, setError] = useState('');

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
        const found = (data?.sends || []).find((s) => String(s.id) === String(id));
        if (found) {
          setSend(found);
          setStatus('ok');
        } else {
          setStatus('notfound');
        }
      })
      .catch((err) => {
        setError(err.message || 'Could not load this newsletter.');
        setStatus('error');
      });
  }, [authCheck, id]);

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
        <Link to="/newsletter" className="newsletter-back-link">← Back to Newsletter</Link>
        <div className="newsletter-header-spacer" />
      </header>

      <div className="newsletter-body newsletter-detail-body">
        {status === 'loading' && <p className="newsletter-muted">Loading…</p>}
        {status === 'error' && <p className="newsletter-error">{error}</p>}
        {status === 'notfound' && (
          <div className="newsletter-notfound">
            <p className="newsletter-muted">That newsletter couldn't be found.</p>
            <Link to="/newsletter" className="newsletter-pill">Back to Newsletter</Link>
          </div>
        )}
        {status === 'ok' && send && (
          <article className="newsletter-detail">
            <div className="newsletter-detail-date">
              {new Date(send.sent_at).toLocaleDateString(undefined, {
                year: 'numeric', month: 'long', day: 'numeric',
              })}
            </div>
            <h1 className="newsletter-detail-subject">{send.subject}</h1>
            <div className="newsletter-detail-message">{send.message}</div>
          </article>
        )}
      </div>
    </div>
  );
}
