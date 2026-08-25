// src/pages/Contact.jsx
//
// The contact form. Added 2026-08-24, replacing the bare
// mailto:aeeusc@gmail.com links that used to sit in the nav, the hero
// and the footer.
//
// A mailto: link has one failure mode and it is silent: on a machine
// with no mail client configured — which is most shared computers, most
// Chromebooks, and plenty of laptops where the owner only uses webmail —
// clicking it does nothing visible at all. The visitor concludes the
// site is broken, or worse, believes they sent something. A form that
// posts to our own server always either works or says why it didn't.
//
// Sends to the club address and to the president, with Reply-To set to
// whoever filled it in, so an officer can just hit Reply. See the
// backend's routes/forms.js and sendFormEmail in email.js.

import { useState } from 'react';
import { Nav, Footer } from './Home';
import { submitContactForm } from '../lib/api';
import './Home.css';
import './PublicForm.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | error | sent
  const [error, setError] = useState('');

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await submitContactForm(form);
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err.message || 'Something went wrong. Please try again.');
    }
  }

  return (
    <div className="home-page pf-page">
      <Nav />

      <div className="pf-body">
        <p className="pf-eyebrow">Contact</p>
        <h1 className="pf-title">Get in touch</h1>

        <p className="pf-intro">
          Questions about joining, a partnership, sponsoring a design team, or having us
          speak somewhere: this reaches the board directly. We usually reply within a few
          days during term.
        </p>

        {status === 'sent' ? (
          <div className="pf-sent">
            <h2 className="pf-sent-title">Message sent.</h2>
            <p>
              We'll reply to the address you gave us. If it's urgent, our president is at{' '}
              <a href="mailto:ajbartol@usc.edu">ajbartol@usc.edu</a>.
            </p>
          </div>
        ) : (
          <form className="pf-form" onSubmit={handleSubmit}>
            <div className="pf-row">
              <label className="pf-label">
                Your name
                <input
                  className="pf-input"
                  type="text"
                  required
                  autoComplete="name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                />
              </label>
              <label className="pf-label">
                Your email
                <input
                  className="pf-input"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="so we can reply"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                />
              </label>
            </div>

            <label className="pf-label">
              Subject
              <input
                className="pf-input"
                type="text"
                required
                placeholder="What's this about?"
                value={form.subject}
                onChange={(e) => set('subject', e.target.value)}
              />
            </label>

            <label className="pf-label">
              Message
              <textarea
                className="pf-textarea"
                required
                value={form.message}
                onChange={(e) => set('message', e.target.value)}
              />
            </label>

            {status === 'error' && <p className="pf-error">{error}</p>}

            <button className="pf-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </form>
        )}

        <p className="pf-fallback">
          Prefer email? Write to <a href="mailto:aeeusc@gmail.com">aeeusc@gmail.com</a>, or
          reach our president directly at{' '}
          <a href="mailto:ajbartol@usc.edu">ajbartol@usc.edu</a>.
        </p>
      </div>

      <Footer showNewsletterSignup={false} />
    </div>
  );
}
