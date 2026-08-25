// src/pages/Interest.jsx
//
// The interest form. Added 2026-08-24, replacing the Google Form that
// used to sit behind every "Get Involved" button on the site.
//
// Kev: "we want to replace that with an in-depth, like, our own, like,
// thing on the website where a user can just do the application and do
// it through the website."
//
// Three things this buys over the Google Form:
//   - It looks like AEE. The first time most people see this site is a
//     QR code at a recruiting table, and being bounced to a Google
//     domain at that moment is the worst possible first impression.
//   - Submissions arrive as email in an inbox the officers already read,
//     rather than in a spreadsheet somebody has to remember to check.
//   - Nobody needs access to a particular Google account to see who
//     applied, which matters when the board turns over every year.
//
// Fields are exactly the ones Kev asked for and no more: first and last
// name, USC email, major, year, and how they heard about AEE. A shorter
// form is a form more people finish, and this one gets filled in
// standing up, on a phone, with a queue behind them.
//
// The backend is POST /forms/interest (see the backend's routes/forms.js),
// which mails the club. Nothing is stored in the database — these are
// messages, not records.

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Nav, Footer, NEXT_EVENT } from './Home';
import { submitInterestForm } from '../lib/api';
import './Home.css';
import './PublicForm.css';

// Mirrors USC_EMAIL_RE in the backend's routes/forms.js. Deliberately a
// copy rather than a shared import: the frontend and backend are separate
// deployments, and the browser check exists to give a fast, clear answer
// while the server check is the one that actually enforces the rule. If
// these two ever drift, the server wins and the worst case is a form that
// rejects something the browser accepted, which is a message, not a hole.
//
// Subdomains are allowed (alumni.usc.edu and friends) because USC issues
// them. The anchored suffix is what matters: "usc.edu.example.com" fails.
const USC_EMAIL_RE = /^[^@\s]+@([a-z0-9-]+\.)*usc\.edu$/i;

function isUscEmail(value) {
  return USC_EMAIL_RE.test(String(value || '').trim());
}

const YEARS = ['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate student', 'Other'];

const SOURCES = [
  'Involvement fair',
  'A friend or classmate',
  'A class or professor',
  'Instagram',
  'LinkedIn',
  'Found the website',
  'Other',
];

export default function Interest() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', uscEmail: '', major: '', year: '', heardFrom: '',
  });
  const [status, setStatus] = useState('idle'); // idle | sending | error | sent
  const [error, setError] = useState('');
  // Shown under the email field rather than with the submit button. An
  // error about one field belongs next to that field; at the bottom of a
  // six-field form it reads as "something went wrong somewhere".
  const [emailError, setEmailError] = useState('');

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (field === 'uscEmail') setEmailError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();

    // Checked here as well as on the server. This one is for the person
    // filling the form in: a specific message under the field beats a
    // round trip that comes back with a generic failure.
    if (!isUscEmail(form.uscEmail)) {
      setEmailError('Please use your USC email address. It has to end in @usc.edu.');
      setStatus('idle');
      return;
    }

    setStatus('sending');
    setError('');
    setEmailError('');
    try {
      await submitInterestForm(form);
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
        <p className="pf-eyebrow">Interest form</p>
        <h1 className="pf-title">Get involved with AEE</h1>

        <p className="pf-intro">
          We welcome new members throughout the year. You don't have to wait for a
          recruitment cycle, and you don't need an energy background to start. Tell us a
          little about yourself and someone from the board will follow up.
        </p>

        {NEXT_EVENT && (
          <p className="pf-event">
            <span className="pf-event-dot" aria-hidden="true" />
            {NEXT_EVENT}
          </p>
        )}

        {status === 'sent' ? (
          <div className="pf-sent">
            <h2 className="pf-sent-title">Thanks, we've got it.</h2>
            <p>
              Someone from the board will be in touch at the address you gave us. In the
              meantime, have a look at what the design teams are working on.
            </p>
            <Link className="pill" to="/#teams">See the design teams</Link>
          </div>
        ) : (
          <form className="pf-form" onSubmit={handleSubmit}>
            <div className="pf-row">
              <label className="pf-label">
                First name
                <input
                  className="pf-input"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={(e) => set('firstName', e.target.value)}
                />
              </label>
              <label className="pf-label">
                Last name
                <input
                  className="pf-input"
                  type="text"
                  required
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={(e) => set('lastName', e.target.value)}
                />
              </label>
            </div>

            <label className="pf-label">
              USC email
              <input
                className={`pf-input${emailError ? ' pf-input-bad' : ''}`}
                type="email"
                required
                autoComplete="email"
                placeholder="you@usc.edu"
                /* Native validation, the outermost of three checks.
                   Two traps in this one attribute, both of which make
                   the browser IGNORE the pattern entirely rather than
                   report an error, so the field silently accepts
                   everything:
                     - browsers compile `pattern` with the regex `v`
                       flag, and under `v` a negated class holding \s
                       ("[^@\s]") is a syntax error;
                     - so is an unescaped trailing "-" in a class
                       ("[a-zA-Z0-9-]"), which has to be "\-".
                   Both were live here and verified in Chromium: with
                   either present, a Gmail address reported valid.
                   Anything changed here should be checked with
                   new RegExp("^(?:" + pattern + ")$", "v") first. */
                pattern="[^@]+@([a-zA-Z0-9\-]+\.)*[uU][sS][cC]\.[eE][dD][uU]"
                title="Use your USC address, ending in @usc.edu"
                aria-invalid={emailError ? 'true' : undefined}
                aria-describedby={emailError ? 'usc-email-error' : undefined}
                value={form.uscEmail}
                onChange={(e) => set('uscEmail', e.target.value)}
                onBlur={() => {
                  if (form.uscEmail && !isUscEmail(form.uscEmail)) {
                    setEmailError('Please use your USC email address. It has to end in @usc.edu.');
                  }
                }}
              />
              {emailError && (
                <span className="pf-field-error" id="usc-email-error">{emailError}</span>
              )}
            </label>

            <div className="pf-row">
              <label className="pf-label">
                Major
                <input
                  className="pf-input"
                  type="text"
                  required
                  value={form.major}
                  onChange={(e) => set('major', e.target.value)}
                />
              </label>
              <label className="pf-label">
                Year in school
                <select
                  className="pf-select"
                  required
                  value={form.year}
                  onChange={(e) => set('year', e.target.value)}
                >
                  <option value="" disabled>Choose one</option>
                  {YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
              </label>
            </div>

            {/* The only optional field. Useful to the club for knowing
                which recruiting actually works, but not worth losing a
                submission over. */}
            <label className="pf-label">
              {/* Wrapped together — .pf-label is a flex COLUMN, so two
                  bare siblings stack instead of sitting on one line. */}
              <span>How did you hear about AEE? <span className="pf-optional">(optional)</span></span>
              <select
                className="pf-select"
                value={form.heardFrom}
                onChange={(e) => set('heardFrom', e.target.value)}
              >
                <option value="">Prefer not to say</option>
                {SOURCES.map((sourceName) => (
                  <option key={sourceName} value={sourceName}>{sourceName}</option>
                ))}
              </select>
            </label>

            {status === 'error' && <p className="pf-error">{error}</p>}

            <button className="pf-submit" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Send it'}
            </button>
          </form>
        )}

        {/* What to do when the form itself doesn't work. Worth saying on
            any page whose whole purpose is to send a message. */}
        <p className="pf-fallback">
          Would rather just email us? Write to{' '}
          <a href="mailto:aeeusc@gmail.com">aeeusc@gmail.com</a> or reach our president
          directly at <a href="mailto:ajbartol@usc.edu">ajbartol@usc.edu</a>.
        </p>
      </div>

      <Footer showNewsletterSignup={false} />
    </div>
  );
}
