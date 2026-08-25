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
// Both pages were rewritten 2026-08-25 against the actual schema and
// routes, after an audit found the privacy policy disclosing roughly a
// third of what the site collects. It described accounts as holding
// "first name, last name, a username, and an email address"; they also
// hold a second email, a photo, hometown, hobbies, favourite food and
// drink, a bio, three social links and a dated role history — none of
// which a member reading that page would have expected.
//
// Two rules these pages follow deliberately:
//
//   1. They describe what the code does, checked against it, rather than
//      what a privacy policy usually says. Retention periods are the
//      real numbers; the third parties are named.
//   2. They make NO compliance claims — not CCPA/CPRA, not FERPA, not
//      GDPR. Kev's explicit call, and the right one: a student
//      organization almost certainly falls under none of the thresholds
//      that make those apply, and asserting a compliance status nobody
//      has assessed you against is its own risk. Doing the sensible
//      things without claiming a legal status is the honest position.
//
// This is still NOT a substitute for review by someone qualified to
// advise on USC/student-org requirements. Update the contact email and
// org details below if they change, and re-read this page whenever the
// site starts collecting something new.

import { Link } from 'react-router-dom';

const colors = {
  navy950: '#182032',
  slate: 'rgba(198,228,255,.70)',
  slateLight: 'rgba(198,228,255,.92)',
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
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
  },
  wrap: {
    width: '100%',
    maxWidth: '720px',
  },
  eyebrow: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '.12em',
    color: colors.slate,
    marginBottom: '12px',
  },
  heading: {
    fontFamily: "'League Spartan', 'Libre Franklin', system-ui, sans-serif",
    fontWeight: 700,
    color: colors.white,
    fontSize: '34px',
    letterSpacing: '-.02em',
    marginBottom: '8px',
  },
  updated: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    fontSize: '13px',
    color: colors.slate,
    marginBottom: '40px',
  },
  h2: {
    fontFamily: "'League Spartan', 'Libre Franklin', system-ui, sans-serif",
    fontWeight: 700,
    color: colors.white,
    fontSize: '18px',
    marginTop: '36px',
    marginBottom: '10px',
  },
  p: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
    color: colors.slateLight,
    fontSize: '15px',
    lineHeight: 1.7,
    marginBottom: '14px',
  },
  ul: {
    fontFamily: "'Libre Franklin', -apple-system, sans-serif",
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
      <div style={styles.updated}>Last updated 25 August 2026</div>

      <p style={styles.p}>
        AEE at USC ("we," "us," "our") runs aeeusc.com and the member portal behind it. This
        page describes what information we collect, why, who else touches it, and how long we
        keep it. We have tried to describe what the site actually does rather than what a
        privacy policy usually says.
      </p>
      <p style={styles.p}>
        AEE at USC is an independent student organization. We are not a department of the
        University of Southern California, and this policy covers only this website, not USC's
        own systems or any other service you reach from here.
      </p>

      <h2 style={styles.h2}>Information you give us</h2>
      <p style={styles.p}><strong>Member accounts.</strong> Accounts are created for you by a
        board member; there is no public signup. An account holds your first and last name, a
        username generated from them, your <em>@usc.edu</em> address, optionally a personal
        email address, and your password stored as a one-way hash.</p>
      <p style={styles.p}><strong>Your profile.</strong> Anything you choose to add in the
        portal: a profile photo, a short description of yourself, your hometown, hobbies,
        favourite food and drink, and links to your LinkedIn, Instagram or personal website.
        All of it is optional, all of it is editable by you, and all of it is visible to other
        logged-in members through the member directory, the org chart and your member card.</p>
      <p style={styles.p}><strong>Your role.</strong> Your title, your design team, and a dated
        record of the roles you have held so far, which is what the "past roles" section of your
        member card is built from.</p>
      <p style={styles.p}><strong>Portal activity.</strong> Calendar events you create and
        tasks you create or are assigned.</p>
      <p style={styles.p}><strong>Newsletter subscriptions.</strong> The email address you
        subscribe with, plus a random token that makes your unsubscribe link work.</p>
      <p style={styles.p}><strong>The interest form.</strong> Your first and last name, USC
        email, major, year in school, and optionally how you heard about us. This is emailed to
        the board. It is not stored in our database.</p>
      <p style={styles.p}><strong>The contact form.</strong> Your name, email address, a
        subject and your message. Also emailed rather than stored.</p>

      <h2 style={styles.h2}>Information the site creates</h2>
      <p style={styles.p}><strong>Signing in.</strong> Logging in requires a six-digit code emailed
        to you. If you have added a personal address, the code goes to both.
        We store a keyed hash of that code, never the code itself, and it is
        deleted the moment it is used or expires. If you tick "remember this device", we store a
        hash of a random token identifying that browser.</p>
      <p style={styles.p}><strong>Sessions.</strong> While you are logged in we keep a session
        record linking your browser to your account.</p>
      <p style={styles.p}><strong>Technical information.</strong> Our hosting providers
        automatically log ordinary request data such as IP addresses and browser type, for
        security and reliability. We do not use analytics, advertising or tracking software of
        any kind, and there is none on this site.</p>

      <h2 style={styles.h2}>Cookies</h2>
      <p style={styles.p}>We set two, and both are necessary for the site to work. Neither is
        used for tracking or advertising.</p>
      <ul style={styles.ul}>
        <li><strong>connect.sid:</strong> keeps you logged in. Expires after 7 days.</li>
        <li><strong>aee_td:</strong> set only if you tick "remember this device" when entering
          your login code, so that browser can skip the code next time. Expires after 30 days,
          and you can clear it at any time under Settings on your Profile page.</li>
      </ul>

      <h2 style={styles.h2}>How we use it</h2>
      <ul style={styles.ul}>
        <li>To run member accounts, including login, two-factor codes and password changes.</li>
        <li>To show members to one another in the portal: the directory, org chart and member cards.</li>
        <li>To run the calendar and task board.</li>
        <li>To send newsletters to people who subscribed.</li>
        <li>To reply to interest and contact form submissions.</li>
        <li>To keep the site secure and working.</li>
      </ul>
      <p style={styles.p}>
        We do not sell your information, we do not share it for advertising, and we do not use
        it for any purpose beyond running this organization.
      </p>

      <h2 style={styles.h2}>Who else handles it</h2>
      <p style={styles.p}>We use a small number of outside services to run the site. They
        process data on our behalf and are not permitted to use it for their own purposes.</p>
      <ul style={styles.ul}>
        <li><strong>Render:</strong> hosts our server and database, so everything described above is stored there.</li>
        <li><strong>GitHub Pages:</strong> serves the website itself.</li>
        <li><strong>Resend:</strong> delivers our email: newsletters, login codes, and form submissions.</li>
        <li><strong>Google Fonts:</strong> serves the two typefaces this site uses, which means your browser contacts Google when a page loads.</li>
        <li><strong>Anthropic:</strong> if a board member uses the "draft with AI" tool in our newsletter builder, the description they type is sent to Anthropic's API to generate a draft. It is used only to produce that draft.</li>
      </ul>

      <h2 style={styles.h2}>How long we keep it</h2>
      <ul style={styles.ul}>
        <li><strong>Login codes:</strong> 10 minutes, or until used.</li>
        <li><strong>Remembered devices:</strong> 30 days, and cleared immediately if you change your password or clear them yourself.</li>
        <li><strong>Sessions:</strong> 7 days, and ended when you log out or change your password.</li>
        <li><strong>Accounts and profiles:</strong> for as long as the account exists.</li>
        <li><strong>Newsletter subscriptions:</strong> until you unsubscribe, at which point the record is deleted rather than flagged.</li>
        <li><strong>Form submissions:</strong> these live in the board's email, not in our database, and are kept as long as that inbox keeps them.</li>
      </ul>

      <h2 style={styles.h2}>Your choices</h2>
      <ul style={styles.ul}>
        <li>Edit or clear most of your profile yourself, at any time, in the portal.</li>
        <li>Unsubscribe from the newsletter using the link in any email, or under Settings on
          your Profile page.</li>
        <li>Clear every remembered device under Settings on your Profile page.</li>
        <li>Ask us for a copy of what we hold about you, or ask us to correct or delete it, by emailing the address below. We will do our best to respond within 30 days.</li>
      </ul>

      <h2 style={styles.h2}>Security</h2>
      <p style={styles.p}>
        Passwords are stored using bcrypt, a one-way hash. We cannot see or recover your
        password, only check it at login. Every account requires a second factor: a code emailed
        to you. Login codes and remembered-device tokens are stored hashed, never in the clear.
        The site is served over HTTPS and session cookies are marked so browser JavaScript
        cannot read them. No system is perfectly secure, but this is the standard we hold
        ourselves to.
      </p>

      <h2 style={styles.h2}>Children</h2>
      <p style={styles.p}>
        This site is intended for USC students and people interested in joining AEE at USC. It
        is not directed at children under 13, and we do not knowingly collect information from
        them.
      </p>

      <h2 style={styles.h2}>Changes to this policy</h2>
      <p style={styles.p}>
        We will update this page when what we collect changes. The "last updated" date above
        always reflects the most recent revision.
      </p>

      <h2 style={styles.h2}>Contact</h2>
      <p style={styles.p}>
        Questions about this policy, or about the information we hold on you, can go to{' '}
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
      <div style={styles.updated}>Last updated 25 August 2026</div>

      <p style={styles.p}>
        These terms govern your use of aeeusc.com and the member portal, both run by AEE at USC
        ("we," "us," "our"). By using the site you agree to them.
      </p>
      <p style={styles.p}>
        AEE at USC is an independent student organization and not a department of the University
        of Southern California. Nothing on this site is published by or on behalf of USC.
      </p>

      <h2 style={styles.h2}>Using the site</h2>
      <p style={styles.p}>
        The public pages are here to describe what we do and to let people get in touch. Use them
        lawfully, and do not attempt to disrupt, damage, overload or gain unauthorised access to
        the site or anything behind it. Do not use our forms to send unsolicited commercial
        messages or anything abusive.
      </p>

      <h2 style={styles.h2}>Member accounts</h2>
      <p style={styles.p}>
        Accounts are created by a board member; there is no public signup. Every login requires
        both your password and a code emailed to you.
      </p>
      <p style={styles.p}>
        Keep your credentials to yourself. You are responsible for what happens under your
        account, so tell us straight away if you think someone else has access to it. Changing
        your password ends every other session and clears every remembered device.
      </p>
      <p style={styles.p}>
        Board members can deactivate an account, for instance when someone leaves the
        organization. That immediately ends their access to the portal.
      </p>

      <h2 style={styles.h2}>What you post</h2>
      <p style={styles.p}>
        You keep ownership of what you add: your profile, photo, calendar events and tasks. By
        adding it you allow us to display it to other logged-in members inside the portal, which
        is the whole point of it being there.
      </p>
      <p style={styles.p}>
        Only upload things you have the right to use, and keep it appropriate for a university
        organization. We may remove content that is unlawful, abusive, or plainly not what these
        tools are for. Content attached to an account may be removed when that account is
        deleted.
      </p>

      <h2 style={styles.h2}>Newsletter</h2>
      <p style={styles.p}>
        Subscribing means you agree to receive occasional emails about our events, competitions
        and opportunities. Every email carries an unsubscribe link, and unsubscribing takes
        effect immediately.
      </p>

      <h2 style={styles.h2}>Our content and other people's</h2>
      <p style={styles.p}>
        The text, design and images on this site belong to AEE at USC or are used with
        permission. Partner and sponsor names and logos belong to those organizations, and
        appear here to show who we work with, not to claim any endorsement by them of this
        site.
      </p>
      <p style={styles.p}>
        We link to other sites. We do not control them and are not responsible for what they
        contain.
      </p>

      <h2 style={styles.h2}>No warranty</h2>
      <p style={styles.p}>
        The site is provided "as is", without warranties of any kind, express or implied. We do
        not guarantee it will be uninterrupted, error-free, or available at all times. It is
        run by students alongside their degrees.
      </p>

      <h2 style={styles.h2}>Limitation of liability</h2>
      <p style={styles.p}>
        To the fullest extent permitted by law, AEE at USC and its members are not liable for
        any indirect, incidental or consequential damages arising from your use of this site.
      </p>

      <h2 style={styles.h2}>Governing law</h2>
      <p style={styles.p}>
        These terms are governed by the laws of the State of California, and any dispute arising
        from them belongs in the state or federal courts of Los Angeles County, California.
      </p>

      <h2 style={styles.h2}>Changes to these terms</h2>
      <p style={styles.p}>
        We may update these terms. Continuing to use the site after a change means you accept
        the revised version, and the "last updated" date above tells you when that was.
      </p>

      <h2 style={styles.h2}>Contact</h2>
      <p style={styles.p}>
        Questions about these terms can go to{' '}
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
