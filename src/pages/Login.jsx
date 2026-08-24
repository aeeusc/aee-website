// src/pages/Login.jsx
//
// The login page. Two steps as of 2026-08-24:
//
//   1. username/email + password
//   2. the 6-digit code emailed to the account holder
//
// Step 2 is required for every account — there's no per-user setting —
// UNLESS this browser was previously ticked as "remember this device",
// in which case the backend logs you in at step 1 and this page never
// shows the code screen at all. See routes/auth.js's TWO-FACTOR
// AUTHENTICATION block for the server side of all this.
//
// The page decides which step it's on purely from what /auth/login
// returns (`twoFactorRequired`), rather than from anything it knows
// about the account — which means the frontend never has to guess, and a
// change on the server side (say, exempting some accounts later) needs
// no change here.
//
// Styled to match the real homepage mock (aee_homepage_mock_3.html) —
// see Signup.jsx for the shared design-token notes.

import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login, verifyLoginCode, resendLoginCode } from '../lib/api';

const CODE_LENGTH = 6;

export default function Login() {
  // "identifier" rather than "email" — accounts are now admin-created
  // (see CreateUser.jsx) and get a generated username; a person can log
  // in with either that username or an email, if one is attached to
  // their account. See routes/auth.js's /login and lib/api.js's login().
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [step, setStep] = useState('credentials'); // credentials | code
  const [code, setCode] = useState('');
  // Default ON. With 2FA required for everyone, leaving this off by
  // default would mean an emailed code on literally every login for
  // ~90 members — enough friction that the feature becomes the thing
  // people complain about rather than the thing protecting them. Anyone
  // on a shared machine can untick it, and Settings has a "forget all
  // devices" control for when someone forgets to.
  const [rememberDevice, setRememberDevice] = useState(true);
  const [sentTo, setSentTo] = useState([]);
  const [cooldown, setCooldown] = useState(0); // seconds until "resend" is allowed
  const [notice, setNotice] = useState(''); // non-error feedback, e.g. "New code sent."

  const [status, setStatus] = useState('idle'); // idle | submitting | error
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const codeInputRef = useRef(null);

  // Ticks the resend cooldown down to zero. Cleared on unmount and
  // whenever the count changes, so no stray interval survives leaving
  // the page mid-login.
  useEffect(() => {
    if (cooldown <= 0) return undefined;
    const id = setInterval(() => setCooldown((n) => (n > 0 ? n - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [cooldown]);

  // Move focus to the code box the moment it appears — otherwise the
  // person has to hunt for it after switching to their email app and
  // back, which is the worst possible moment to add a click.
  useEffect(() => {
    if (step === 'code' && codeInputRef.current) codeInputRef.current.focus();
  }, [step]);

  async function handleCredentials(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    setNotice('');

    try {
      const result = await login(identifier, password);

      if (result && result.twoFactorRequired) {
        setSentTo(Array.isArray(result.sentTo) ? result.sentTo : []);
        setCooldown(result.resendAfterSeconds || 30);
        setCode('');
        setStep('code');
        setStatus('idle');
        return;
      }

      // No code needed — this browser is a remembered device, so the
      // backend already established the session.
      navigate('/');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  }

  async function handleCode(e) {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');
    setNotice('');

    try {
      await verifyLoginCode(code, rememberDevice);
      navigate('/');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
      // Clear the box so the next attempt starts clean rather than
      // making them select-all over a wrong code.
      setCode('');
      if (codeInputRef.current) codeInputRef.current.focus();
    }
  }

  async function handleResend() {
    setStatus('submitting');
    setErrorMessage('');
    setNotice('');

    try {
      const result = await resendLoginCode();
      setCooldown(result.resendAfterSeconds || 30);
      setNotice('New code sent. Check your email.');
      setCode('');
      setStatus('idle');
      if (codeInputRef.current) codeInputRef.current.focus();
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message);
    }
  }

  // Back to step 1. The server-side pending state is left to expire on
  // its own (10 minutes) rather than being explicitly cancelled — there's
  // nothing it can do on its own, and a new password submission replaces
  // it outright.
  function startOver() {
    setStep('credentials');
    setCode('');
    setPassword('');
    setSentTo([]);
    setCooldown(0);
    setNotice('');
    setErrorMessage('');
    setStatus('idle');
  }

  const submitting = status === 'submitting';

  return (
    <div style={styles.page}>
      {/* Same "return to home" pattern as Signup.jsx — a real link via
          React Router, so visitors don't have to rely on the browser's
          back button to leave this page. */}
      <Link to="/" style={styles.backLink}>← Back to home</Link>

      <div style={styles.card}>
        {step === 'credentials' ? (
          <>
            <h1 style={styles.heading}>Log in</h1>

            <form onSubmit={handleCredentials} style={styles.form}>
              <label style={styles.label}>
                Username or email
                <input
                  type="text"
                  required
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  style={styles.input}
                  placeholder="your.username"
                  autoComplete="username"
                />
              </label>

              <label style={styles.label}>
                Password
                <div style={styles.passwordWrap}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ ...styles.input, ...styles.passwordInput }}
                    placeholder="Your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    style={styles.eyeButton}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? (
                      // Eye with a slash through it — password is currently visible
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M3 3l18 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        <path d="M10.6 5.2A10.9 10.9 0 0112 5c5.5 0 9.5 4 11 7-.6 1.2-1.6 2.6-3 3.9M6.3 6.9C4.5 8.1 3.1 9.8 2 12c1.5 3 5.5 7 10 7 1.4 0 2.7-.3 3.9-.9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        <path d="M9.9 10a3 3 0 004.1 4.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      </svg>
                    ) : (
                      // Plain open eye — password is currently hidden
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M1 12c1.5-3 5.5-7 11-7s9.5 4 11 7c-1.5 3-5.5 7-11 7s-9.5-4-11-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none" />
                        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" fill="none" />
                      </svg>
                    )}
                  </button>
                </div>
              </label>

              {status === 'error' && (
                <p style={styles.error}>{errorMessage}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                style={{ ...styles.pill, ...styles.pillButton }}
              >
                {submitting ? 'Logging in…' : 'Log In'}
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 style={styles.heading}>Check your email</h1>
            <p style={styles.subheading}>
              {sentTo.length > 0 ? (
                <>
                  We sent a {CODE_LENGTH}-digit code to{' '}
                  {/* Each address gets its own <strong> with the joining
                      "and" left outside it — wrapping the whole joined
                      string bolds the "and" too, which reads as part of
                      the address. */}
                  {sentTo.map((address, i) => (
                    <span key={address}>
                      {i > 0 && ' and '}
                      <strong style={styles.strong}>{address}</strong>
                    </span>
                  ))}
                  . It expires in 10 minutes.
                </>
              ) : (
                <>We sent a {CODE_LENGTH}-digit code to the email on your account. It expires in 10 minutes.</>
              )}
            </p>

            <form onSubmit={handleCode} style={styles.form}>
              <label style={styles.label}>
                Verification code
                <input
                  ref={codeInputRef}
                  type="text"
                  required
                  value={code}
                  // Digits only, capped at the code length. Strips as you
                  // type so pasting "123 456" straight out of an email
                  // works instead of failing a length check on the space.
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, CODE_LENGTH))}
                  style={{ ...styles.input, ...styles.codeInput }}
                  placeholder="000000"
                  // inputMode brings up the number pad on phones;
                  // autoComplete lets iOS/Android offer the code straight
                  // from the notification instead of app-switching.
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={CODE_LENGTH}
                  aria-label={`${CODE_LENGTH}-digit verification code`}
                />
              </label>

              <label style={styles.checkboxRow}>
                <input
                  type="checkbox"
                  checked={rememberDevice}
                  onChange={(e) => setRememberDevice(e.target.checked)}
                  style={styles.checkbox}
                />
                <span>
                  Remember this device for 30 days
                  <span style={styles.hint}>Skip the code next time on this browser. Leave off on a shared computer.</span>
                </span>
              </label>

              {status === 'error' && (
                <p style={styles.error}>{errorMessage}</p>
              )}
              {notice && !errorMessage && (
                <p style={styles.notice}>{notice}</p>
              )}

              <button
                type="submit"
                disabled={submitting || code.length !== CODE_LENGTH}
                style={{
                  ...styles.pill,
                  ...styles.pillButton,
                  ...(submitting || code.length !== CODE_LENGTH ? styles.pillDisabled : null),
                }}
              >
                {submitting ? 'Verifying…' : 'Verify and log in'}
              </button>
            </form>

            <div style={styles.codeFooter}>
              <button
                type="button"
                onClick={handleResend}
                disabled={submitting || cooldown > 0}
                style={{ ...styles.linkButton, ...(cooldown > 0 ? styles.linkButtonDisabled : null) }}
              >
                {cooldown > 0 ? `Resend code in ${cooldown}s` : 'Resend code'}
              </button>
              <span style={styles.dot}>·</span>
              <button type="button" onClick={startOver} style={styles.linkButton}>
                Use a different account
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Design tokens copied directly from aee_homepage_mock_3.html's :root
// block — kept identical to Signup.jsx so the two pages feel like one
// consistent flow.
const colors = {
  navy950: '#0A0E1A',
  navy900: '#101830',
  navy800: '#16213E',
  slate: '#94A3B8',
  slateLight: '#C9D4E4',
  ink: '#0B0F1A',
  white: '#FFFFFF',
  line: 'rgba(255,255,255,.16)',
};

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: colors.navy950,
    padding: '24px',
    position: 'relative',
  },
  backLink: {
    position: 'absolute',
    top: '32px',
    left: '40px',
    color: 'rgba(255,255,255,.85)',
    textDecoration: 'none',
    fontSize: '15px',
    fontWeight: 500,
    fontFamily: "'Inter', -apple-system, sans-serif",
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    border: `1px solid ${colors.line}`,
    background: 'transparent',
    borderRadius: '16px',
    padding: '40px 32px',
  },
  heading: {
    fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    fontWeight: 700,
    color: colors.white,
    fontSize: '28px',
    letterSpacing: '-.02em',
    marginBottom: '24px',
  },
  subheading: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slate,
    fontSize: '14px',
    lineHeight: 1.6,
    margin: '-16px 0 24px',
  },
  strong: {
    color: colors.slateLight,
    fontWeight: 600,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slate,
    fontSize: '14px',
  },
  input: {
    background: 'rgba(255,255,255,.05)',
    border: `1px solid ${colors.line}`,
    borderRadius: '10px',
    padding: '12px 16px',
    color: colors.white,
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '15px',
    outline: 'none',
  },
  // Wide letter spacing and a monospaced face so six digits read as six
  // discrete characters rather than a number — much easier to check
  // against an email at a glance. paddingLeft matches the letter-spacing
  // so the text stays optically centered (letter-spacing adds a trailing
  // gap after the last character, which otherwise pulls it left).
  codeInput: {
    fontFamily: "'Space Grotesk', 'Courier New', monospace",
    fontSize: '26px',
    letterSpacing: '12px',
    textAlign: 'center',
    paddingLeft: '12px',
    fontWeight: 600,
  },
  checkboxRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slateLight,
    fontSize: '14px',
    lineHeight: 1.5,
    cursor: 'pointer',
  },
  checkbox: {
    marginTop: '2px',
    width: '16px',
    height: '16px',
    accentColor: colors.white,
    cursor: 'pointer',
    flexShrink: 0,
  },
  hint: {
    display: 'block',
    color: colors.slate,
    fontSize: '12.5px',
    marginTop: '2px',
  },
  passwordWrap: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  },
  passwordInput: {
    width: '100%',
    paddingRight: '44px',
    boxSizing: 'border-box',
  },
  eyeButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    padding: '4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.slate,
    cursor: 'pointer',
    lineHeight: 0,
  },
  pill: {
    background: colors.white,
    color: colors.navy950,
    borderRadius: '999px',
    padding: '13px 22px',
    fontSize: '15px',
    fontWeight: 600,
    fontFamily: "'Inter', -apple-system, sans-serif",
    textDecoration: 'none',
    display: 'inline-block',
    textAlign: 'center',
    border: 'none',
    cursor: 'pointer',
  },
  pillButton: {
    marginTop: '8px',
    width: '100%',
  },
  pillDisabled: {
    opacity: 0.5,
    cursor: 'default',
  },
  codeFooter: {
    marginTop: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  linkButton: {
    background: 'none',
    border: 'none',
    padding: 0,
    color: colors.slateLight,
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '13.5px',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  linkButtonDisabled: {
    color: colors.slate,
    textDecoration: 'none',
    cursor: 'default',
  },
  dot: {
    color: colors.slate,
    fontSize: '13.5px',
  },
  error: {
    color: '#F87171',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '14px',
    margin: 0,
  },
  notice: {
    color: '#4ADE80',
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '14px',
    margin: 0,
  },
  footerText: {
    marginTop: '24px',
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slate,
    fontSize: '14px',
    textAlign: 'center',
  },
  inlineLink: {
    color: colors.white,
    textDecoration: 'underline',
  },
};
