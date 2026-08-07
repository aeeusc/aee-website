// src/pages/Legal.jsx
//
// Privacy Policy and Terms & Conditions pages — the standard footer legal
// links most sites carry once they collect any personal data (this site
// does, via the newsletter signup and admin-created accounts). Both pages
// share this one file since they're near-identical in structure/styling;
// which one renders is picked by the `kind` prop passed from the two
// routes in App.jsx ('privacy' | 'terms').
//
// Styled to match NotFound.jsx (same inline-style pattern, same tokens) —
// standalone pages that aren't part of the Home.jsx design-token scope,
// so they don't import Home.css.
//
// This is placeholder/general-purpose legal boilerplate reasonable for a
// student organization's site — it is NOT a substitute for review by
// someone qualified to advise on USC/student-org policy requirements.
// Update the contact email/org details below if they ever change, and
// have an actual person read it over before treating it as final.

import { Link } from 'react-router-dom';

const colors = {
  navy950: '#0A0E1A',
  slate: '#94A3B8',
  slateLight: '#C9D4E4',
  white: '#FFFFFF',
  line: 'rgba(255,255,255,.16)',
};

const styles = {
  page: {
    minHeight: '100vh',
    background: colors.navy950,
    padding: '96px 24px 80px',
    display: 'flex',
    justifyContent: 'center',
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
  wrap: {
    width: '100%',
    maxWidth: '720px',
  },
  eyebrow: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '.12em',
    color: colors.slate,
    marginBottom: '12px',
  },
  heading: {
    fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    fontWeight: 700,
    color: colors.white,
    fontSize: '34px',
    letterSpacing: '-.02em',
    marginBottom: '8px',
  },
  updated: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    fontSize: '13px',
    color: colors.slate,
    marginBottom: '40px',
  },
  h2: {
    fontFamily: "'Space Grotesk', 'Inter', system-ui, sans-serif",
    fontWeight: 700,
    color: colors.white,
    fontSize: '18px',
    marginTop: '36px',
    marginBottom: '10px',
  },
  p: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slateLight,
    fontSize: '15px',
    lineHeight: 1.7,
    marginBottom: '14px',
  },
  ul: {
    fontFamily: "'Inter', -apple-system, sans-serif",
    color: colors.slateLight,
    fontSize: '15px',
    lineHeight: 1.7,
    marginBottom: '14px',
    paddingLeft: '22px',
  },
  a: {
    color: colors.white,
    textDecoration: 'underline',
  },
};

function Privacy() {
  return (
    <>
      <div style={styles.eyebrow}>LEGAL</div>
      <h1 style={styles.heading}>Privacy Policy</h1>
      <div style={styles.updated}>Last updated August 2026</div>

      <p style={styles.p}>
        This Privacy Policy describes how AEE at USC ("we," "us," "our") collects, uses, and
        protects information when you visit aeeusc.com or interact with our services, including
        our newsletter signup and member accounts.
      </p>

      <h2 style={styles.h2}>Information we collect</h2>
      <p style={styles.p}>Depending on how you use the site, we may collect:</p>
      <ul style={styles.ul}>
        <li><strong>Newsletter signups:</strong> the email address you provide to subscribe to updates.</li>
        <li><strong>Member accounts:</strong> first name, last name, a username, and an email address, created for you by an organization admin.</li>
        <li><strong>Basic technical information</strong> collected automatically by our hosting providers (such as IP address and browser type) for security and reliability purposes.</li>
      </ul>
      <p style={styles.p}>
        We do not collect payment information, government identification, or other sensitive
        personal data through this site.
      </p>

      <h2 style={styles.h2}>How we use your information</h2>
      <ul style={styles.ul}>
        <li>To send newsletter updates about events, competitions, and opportunities to subscribers who opt in.</li>
        <li>To operate member accounts, including login and password management.</li>
        <li>To maintain the security and proper functioning of the site.</li>
      </ul>
      <p style={styles.p}>
        We do not sell your personal information to third parties, and we do not use your data
        for advertising purposes.
      </p>

      <h2 style={styles.h2}>Password security</h2>
      <p style={styles.p}>
        Account passwords are generated randomly and stored using industry-standard one-way
        hashing — we cannot see or recover your actual password, only verify it at login.
      </p>

      <h2 style={styles.h2}>Data retention and deletion</h2>
      <p style={styles.p}>
        We retain account and subscriber information for as long as your account is active or
        as needed to provide our services. You may request that your account or subscriber
        information be deleted at any time by contacting us using the email below.
      </p>

      <h2 style={styles.h2}>Third-party services</h2>
      <p style={styles.p}>
        We use third-party providers (such as hosting and email-delivery services) to operate
        this site. These providers process data on our behalf and are not permitted to use it
        for their own purposes.
      </p>

      <h2 style={styles.h2}>Changes to this policy</h2>
      <p style={styles.p}>
        We may update this Privacy Policy from time to time. The "Last updated" date above
        reflects the most recent revision.
      </p>

      <h2 style={styles.h2}>Contact us</h2>
      <p style={styles.p}>
        Questions about this policy or your data can be sent to{' '}
        <a href="mailto:aeeusc@gmail.com" style={styles.a}>aeeusc@gmail.com</a>.
      </p>
    </>
  );
}

function Terms() {
  return (
    <>
      <div style={styles.eyebrow}>LEGAL</div>
      <h1 style={styles.heading}>Terms &amp; Conditions</h1>
      <div style={styles.updated}>Last updated August 2026</div>

      <p style={styles.p}>
        These Terms &amp; Conditions govern your use of aeeusc.com, operated by AEE at USC
        ("we," "us," "our"). By using this site, you agree to these terms.
      </p>

      <h2 style={styles.h2}>Use of the site</h2>
      <p style={styles.p}>
        This site is provided for informational purposes and to support the activities of AEE
        at USC, a student organization. You agree to use it only for lawful purposes and not to
        attempt to disrupt, damage, or gain unauthorized access to the site or its underlying
        systems.
      </p>

      <h2 style={styles.h2}>Accounts</h2>
      <p style={styles.p}>
        Member accounts are created by an organization admin, not through public self-signup.
        You are responsible for keeping your login credentials confidential and for any activity
        that occurs under your account. Notify us immediately if you believe your account has
        been compromised.
      </p>

      <h2 style={styles.h2}>Newsletter</h2>
      <p style={styles.p}>
        By subscribing to our newsletter, you consent to receive occasional emails about events,
        competitions, and opportunities related to AEE at USC. You may unsubscribe at any time.
      </p>

      <h2 style={styles.h2}>No warranty</h2>
      <p style={styles.p}>
        This site is provided "as is" without warranties of any kind, express or implied. We do
        not guarantee that the site will be uninterrupted, error-free, or available at all times.
      </p>

      <h2 style={styles.h2}>Limitation of liability</h2>
      <p style={styles.p}>
        To the fullest extent permitted by law, AEE at USC and its members are not liable for
        any indirect, incidental, or consequential damages arising from your use of this site.
      </p>

      <h2 style={styles.h2}>Changes to these terms</h2>
      <p style={styles.p}>
        We may update these Terms &amp; Conditions from time to time. Continued use of the site
        after changes are posted constitutes acceptance of the revised terms.
      </p>

      <h2 style={styles.h2}>Contact us</h2>
      <p style={styles.p}>
        Questions about these terms can be sent to{' '}
        <a href="mailto:aeeusc@gmail.com" style={styles.a}>aeeusc@gmail.com</a>.
      </p>
    </>
  );
}

export default function Legal({ kind }) {
  return (
    <div style={{ position: 'relative' }}>
      <Link to="/" style={styles.backLink}>← Back to home</Link>
      <div style={styles.page}>
        <div style={styles.wrap}>
          {kind === 'terms' ? <Terms /> : <Privacy />}
        </div>
      </div>
    </div>
  );
}
