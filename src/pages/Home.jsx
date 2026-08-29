// src/pages/Home.jsx
//
// The real homepage, ported section-by-section from aee_homepage_mock_3.html
// into working React. Every interactive behavior from the mock (nav scroll
// shadow, logo marquee loop, Design Teams accordion, Board 3D coverflow
// carousel) is reimplemented here with React state/hooks instead of the
// mock's vanilla DOM scripting.
//
// The About section (word-by-word reveal, stat count-up, interactive
// Three.js sphere) used to live here as an in-page anchor-scrolled
// section but now has its own route — see About.jsx. Nav and Footer are
// exported from this file so About.jsx (and any future standalone page)
// can reuse the exact same header/footer instead of duplicating them.
//
// One addition beyond the mock: a hamburger + fullscreen mobile menu.
// The mock only ever targeted desktop (it just hides .nav-links under
// 900px with nothing to replace it) — the real site needs working mobile
// nav, so this ports the current site's hamburger pattern into the new
// visual design.
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { TEAMS as TEAM_DATA } from "../data/teams";
import { subscribeToNewsletter, getCurrentUser } from "../lib/api";
// No THREE.js/SVGLoader imports here — the interactive atom sphere and
// the whole About section moved to their own page (About.jsx) when About
// was split out into the /about route. Home.jsx doesn't render any of
// that anymore.
import "./Home.css";

// vite.config.js sets `base: '/aee-website/'` (needed so GitHub Pages,
// which serves this site from a /aee-website/ subpath, can resolve
// assets). Vite exposes that same value at runtime as import.meta.env.BASE_URL
// — in dev it's just '/', in the production build it's '/aee-website/'.
// A plain "/logo.svg" string ignores that and always points at the site
// root, which 404s in dev too (dev also serves the app under /aee-website/
// to match prod). Every image path below goes through this helper instead
// so it resolves correctly in both npm run dev and the built site.
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

// ─── Data ─────────────────────────────────────────────────────────────────

// "About" is a real route (its own page, like /login and /signup) rather
// than an in-page anchor, so it carries `route` instead of `href` — Nav
// below renders anything with `route` as a React Router <Link> and
// everything else as a same-page `<a href="#...">` anchor, same split
// the CTAs already use for "Log In" vs "Get Involved".
//
// "Design Teams" and "Board" still point at in-page anchors, but now that
// About.jsx (and Login/Signup) exist as separate pages, those anchors
// need to resolve to the *homepage's* #teams/#board — not "the current
// page's #teams", which is what a bare "#teams" href means to a browser.
// Prefixing with BASE_URL (site root, e.g. "/" — see asset() above for
// why this can't be hardcoded) makes the link absolute, so clicking
// "Design Teams" from /about correctly navigates back to the homepage
// and lands on that section, instead of just appending "#teams" onto
// whatever page you were already on.
const NAV_LINKS = [
  { label: "About", route: "/about" },
  { label: "Design Teams", href: `${import.meta.env.BASE_URL}#teams`, caret: true },
  { label: "Board", href: `${import.meta.env.BASE_URL}#board` },
];

const PARTNERS = [
  { name: "Langan", logo: asset("/logos/langan.png"), href: "https://www.langan.com" },
  { name: "Arup", logo: asset("/logos/arup.png"), href: "https://www.arup.com" },
  { name: "Bloom Energy", logo: asset("/logos/bloomenergy.png"), href: "https://www.bloomenergy.com" },
  // calwave.org -> calwave.energy, 2026-08-24. The old domain no longer
  // belongs to them.
  { name: "CalWave", logo: asset("/logos/calwave.png"), href: "https://calwave.energy" },
  // EPRI and PG&E added 2026-08-24; artwork landed 2026-08-25.
  //
  // `solid` marks a logo that is a filled shape rather than a wordmark on
  // transparency. The marquee's default treatment knocks every logo to a
  // white silhouette, which is right for a wordmark and wrong for PG&E:
  // its mark IS a filled blue rectangle, so silhouetting it produces a
  // plain white box. Those get greyscale-and-dim instead, and still come
  // up to full colour on hover like everything else.
  { name: "EPRI", logo: asset("/logos/epri.png"), href: "https://www.epri.com" },
  { name: "PG&E", logo: asset("/logos/pge.png"), href: "https://www.pge.com", solid: true },
  { name: "Graymatter Robotics", logo: asset("/logos/graymatterrobotics.png"), href: "https://factory.graymatter-robotics.com/" },
  { name: "KPFF", logo: asset("/logos/kpff.png"), href: "https://www.kpff.com" },
  { name: "NREL", logo: asset("/logos/nrel.png"), href: "https://www.nlr.gov" },
  { name: "SGH", logo: asset("/logos/sgh.png"), href: "https://www.sgh.com" },
  { name: "Vatn Systems", logo: asset("/logos/vatn.png"), href: "https://www.vatn.com/" },
];

// The design teams moved to src/data/teams.js on 2026-08-29, so this
// accordion, the About page's results list and the per-team subpages at
// /teams/<slug> all read one definition instead of three.
//
// They had already drifted, and visibly: this file described CHARGED as
// the solar tables initiative, which is right, while About.jsx called it
// a "battery and storage design team," which is not. Both were live at
// the same time on the same site.
//
// asset() is applied here rather than baked into the data file, because
// BASE_URL is a Vite build concern and not a fact about a team.
//
// Filtered on onHomepage: every team has a subpage, but these cards are
// built around a full-bleed photograph and a card with no artwork reads
// as a broken image rather than as a team.
const TEAMS = TEAM_DATA
  .filter((t) => t.onHomepage)
  .map((t) => ({ ...t, img: t.img ? asset(t.img) : null }));

// Reordered/edited 2026-08-11 per Kev's explicit feedback:
//  - Mitch Kirby steps down from President, stays on as "Founder & Advisor."
//  - Alex Bartolomei becomes President ("just president" — his old "MECC PM"
//    title is dropped, not kept alongside it), moved up to sit right after
//    Mitch since President follows the two Advisor-tier entries at the top.
//    That leaves MECC PM without a listed PM here — fine unless/until Kev
//    wants someone else in that slot.
//  - Faculty Advisor: STILL PENDING — Kev wants her added in front of Mitch
//    Kirby (i.e. as the very first entry) with the title "Faculty Advisor,"
//    but hasn't sent her name yet, so there's nothing to add here. Once we
//    have her name (and a photo, or PLACEHOLDER_AVATAR in the meantime),
//    insert her object as the new first entry in this array.
//
// A "Kevin Jack / Member" entry briefly lived at the end of this array
// (added 2026-08-11) — removed 2026-08-14 per explicit correction: this
// board is meant to show real officers only, not the project's dev. The
// `li` field staying optional below (rather than required) is kept as
// general-purpose defensive rendering, not tied to this removed entry —
// useful again the moment the still-pending Faculty Advisor is added
// without a LinkedIn link handy yet.
const PLACEHOLDER_AVATAR = asset("/eboard/placeholder-avatar.svg");

// ig: Instagram URL — added 2026-08-16 to replace the second icon button
// under each E-board profile, which used to be a shared mailto:
// placeholder identical for everyone.
//
// Real per-person handles supplied by Kev 2026-08-23 and filled in below.
// Matched BY NAME rather than by list position on purpose: his list had
// Helena Heckmann and Chloe Flannigan in the opposite order from this
// array, and the handles themselves (helenaheckmann / chloe.flannigann)
// are unambiguous about who they belong to. Two were assigned by
// position/elimination rather than an obvious name match —
// downtowndave004 (David Moseley) and monkeezlol (Daniela Lopez
// Escalante) — so those are the two worth double-checking.
//
// ELLIS FERTIG has no `ig` field at all, deliberately: her handle hasn't
// been found yet. The render guards on `current.ig` (see the Board
// section below), so her card simply shows the LinkedIn icon alone
// rather than a dead link — same optional treatment `li` already gets.
// The public e-board. Rewritten 2026-08-24 from the roster Kev sent —
// nine people, five removed (Alexandra Somodi, Reeth Kawad, James
// Hiemstra, Chloe Flannigan, Helena Heckmann), and most of the remaining
// roles changed. Listed leadership-first, with the advisor last.
//
// This stays a hand-maintained list rather than reading from the portal
// accounts, which was the alternative on the table. The trade is real:
// it WILL drift again the next time roles change, and the fix is a code
// push rather than a dashboard edit. What buys that back for now is
// these headshots — they're hand-cropped files in public/eboard, and
// driving the list from accounts would mean re-uploading every one.
// Worth revisiting once profile photos are the norm.
//
// Photos live in public/eboard/. Every name below has a file there
// already; if you add someone, add their photo too or the card renders
// with a broken image.
const BOARD = [
  { n: "Alex Bartolomei", r: "President", img: asset("/eboard/alexbartolomei.jpg"), li: "https://www.linkedin.com/in/alexbartolomei/", ig: "https://www.instagram.com/alexbartolomei/" },
  { n: "David Moseley", r: "Vice President", img: asset("/eboard/davidmoseley.jpg"), li: "https://www.linkedin.com/in/davidmmoseley/", ig: "https://www.instagram.com/downtowndave004/" },
  { n: "Alex Geschwill", r: "Executive Coordinator", img: asset("/eboard/alexgeschwill.jpg"), li: "https://www.linkedin.com/in/alexandra-geschwill/", ig: "https://www.instagram.com/alex_geschwill/" },
  { n: "Jordyn Wetherbee", r: "Executive Project Director", img: asset("/eboard/jordynwetherbee.jpg"), li: "https://www.linkedin.com/in/jordyn-wetherbee/", ig: "https://www.instagram.com/wetherbee.09/" },
  { n: "Jainam Jain", r: "Director of Outreach", img: asset("/eboard/jainamjain.png"), li: "https://www.linkedin.com/in/jainam-jain-937a13214/", ig: "https://www.instagram.com/jainamtjain/" },
  { n: "Sam Gold", r: "Director of Membership", img: asset("/eboard/samgold.jpg"), li: "https://www.linkedin.com/in/sam-j-gold/", ig: "https://www.instagram.com/s.am.gold/" },
  // Ellis's handle was the one gap in the whole list — filled 2026-08-24.
  { n: "Ellis Fertig", r: "Policy Consortium Director", img: asset("/eboard/ellisfertig.jpg"), li: "https://www.linkedin.com/in/ellis-fertig-4512b232b/", ig: "https://www.instagram.com/elllisperl/" },
  { n: "Daniela Lopez Escalante", r: "Director of Brand", img: asset("/eboard/daniela.jpg"), li: "https://www.linkedin.com/in/daniela-lopez-escalante-839a4038a/", ig: "https://www.instagram.com/monkeezlol/" },
  { n: "Mitchell Kirby", r: "Founder & Advisor", img: asset("/eboard/mitchkirby.jpg"), li: "https://www.linkedin.com/in/mitchell-kirby/", ig: "https://www.instagram.com/mitchkirb/" },
];

// ─── Nav + mobile menu ──────────────────────────────────────────────────────

// Exported (not just used locally) so About.jsx can reuse the exact same
// header — the new /about page should look like part of the same site,
// not a bolted-on page with its own separately-maintained nav markup.
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Logged-in state for the nav's login-pill-vs-profile swap (see the
  // nav-ctas block below). null while the /auth/me check is in flight or
  // the visitor isn't logged in — Nav renders the same "Log In" pill it
  // always has in both of those cases, so a logged-out visitor sees no
  // flash/flicker of anything auth-related. This check runs on every
  // page that renders Nav (Home, About, and anywhere else that imports
  // it) since it's a plain fetch — cheap enough not to need lifting to
  // a shared top-level provider for a site this size.
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let cancelled = false;
    getCurrentUser()
      .then((data) => {
        if (!cancelled && data?.user) setCurrentUser(data.user);
      })
      .catch(() => {
        // Not logged in, or the backend's unreachable — either way, the
        // nav just shows the normal logged-out "Log In" pill. No error
        // surfaced to the visitor for what's an entirely expected state
        // (most visitors aren't logged in).
      });
    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 40);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <nav className={`site-nav${scrolled ? " scrolled" : ""}`}>
        <Link className="wordmark" to="/">
          <img src={asset("/logo.svg")} alt="AEE logo" />
          <span className="aee">AEE</span>
          <span className="atusc">at USC</span>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map(({ label, href, route, caret }) =>
            route ? (
              <Link key={label} to={route}>
                {label}
                {caret && <span className="caret">▾</span>}
              </Link>
            ) : (
              <a key={label} href={href}>
                {label}
                {caret && <span className="caret">▾</span>}
              </a>
            )
          )}
        </div>

        <div className="nav-ctas">
          <Link className="contact" to="/contact">Contact</Link>
          {currentUser ? (
            // Logged in: the "Log In" pill is replaced by ONE control —
            // the profile photo and the name sit inside a single pill
            // that opens the Member Portal.
            //
            // This used to be two separate click targets side by side
            // (icon -> /profile, name -> /portal), which was the original
            // 2026-08-08 layout. Changed 2026-08-24 per Kev: "combine pfp
            // and member portal pill redirect into one". Two adjacent
            // targets that looked like one button but went to different
            // places was a coin flip every time — and nothing is lost,
            // because /portal's own tile grid has Profile in it, so the
            // profile page is still one click further on.
            //
            // The "MEMBER PORTAL" line underneath is the other half of
            // that request ("subtext for button where it displays user to
            // show that it is member portal"). A pill that just says
            // "Kevin" tells you whose account you're in but not what
            // pressing it does.
            <Link
              to="/portal"
              className="nav-account"
              aria-label={
                currentUser.first_name || currentUser.username
                  ? `Member Portal, signed in as ${currentUser.first_name || currentUser.username}`
                  : "Member Portal"
              }
            >
              <span className="nav-account-avatar">
                {currentUser.photo_url ? (
                  <img src={currentUser.photo_url} alt="" />
                ) : (
                  <PlaceholderAvatar />
                )}
              </span>
              {/* With no name on the account there's nothing to put above
                  the subtext, and stacking "Member Portal" over itself
                  would be silly — so it collapses to a single line. */}
              {currentUser.first_name || currentUser.username ? (
                <span className="nav-account-text">
                  <span className="nav-account-name">
                    {currentUser.first_name || currentUser.username}
                  </span>
                  <span className="nav-account-sub">Member Portal</span>
                </span>
              ) : (
                <span className="nav-account-text">
                  <span className="nav-account-name">Member Portal</span>
                </span>
              )}
            </Link>
          ) : (
            <Link className="pill pill-ghost" to="/login">Log In</Link>
          )}
          <Link className="pill" to="/interest">
            Get Involved
          </Link>
        </div>

        <button
          className={`hamburger${menuOpen ? " open" : ""}`}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_LINKS.map(({ label, href, route }) =>
          route ? (
            <Link key={label} to={route} onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ) : (
            <a key={label} href={href} onClick={() => setMenuOpen(false)}>
              {label}
            </a>
          )
        )}
        {currentUser ? (
          // Labelled by destination, not by name — this entry used to read
          // just "Kevin", which in a list of Home / About / Board / Contact
          // gave no clue where it went. Changed 2026-08-24 alongside the
          // desktop pill's subtext, for the same reason. Profile stays its
          // own entry here: a menu list has room for both, so there's no
          // reason to make people go through the portal to reach it.
          <>
            <Link to="/portal" onClick={() => setMenuOpen(false)}>Member Portal</Link>
            <Link to="/profile" onClick={() => setMenuOpen(false)}>Profile</Link>
          </>
        ) : (
          <Link to="/login" onClick={() => setMenuOpen(false)}>Log In</Link>
        )}
        <Link to="/interest" onClick={() => setMenuOpen(false)}>
          Get Involved
        </Link>
      </div>
    </>
  );
}

// Simple person-silhouette placeholder avatar — used in the nav's
// logged-in state (see nav-account-avatar above) and reused on Profile.jsx (a
// larger version) until real profile photo uploads exist. Plain inline
// SVG rather than an image file so there's no extra asset to manage for
// what's explicitly a temporary placeholder.
export function PlaceholderAvatar({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className="placeholder-avatar"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="12" fill="rgba(255,255,255,.12)" />
      <circle cx="12" cy="9.5" r="3.5" fill="rgba(255,255,255,.55)" />
      <path
        d="M4.5 20c1.2-3.6 4.2-5.5 7.5-5.5s6.3 1.9 7.5 5.5"
        stroke="rgba(255,255,255,.55)"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// The one thing the club wants a first-time visitor to know today. Set
// to null when there's nothing on. Added 2026-08-24 for the USC
// involvement fair.
export const NEXT_EVENT = null;

// ─── Hero ───────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <img src={asset("/hero-wave.jpg")} alt="" />
      </div>
      <div className="hero-scrim" />
      <div className="hero-content">
        <h1>The Hub For<br />Energy At USC.</h1>
        <p className="hero-sub">
          USC's hub for energy and sustainability: nationally competing design teams,
          real policy work, and a launchpad for clean-energy careers.
        </p>
      </div>
      <div className="hero-bottom">
        {/* Whatever the club most wants a first-time visitor to know
            right now. Currently the involvement fair; it is written as a
            plain statement of an event rather than as a banner or an
            alert, so it reads as part of the page and can be swapped for
            the next thing without ever having looked provisional.
            Editing NEXT_EVENT below is the whole job; set it to null to
            take the line down. */}
        {NEXT_EVENT && (
          <p className="hero-event">
            <span className="hero-event-dot" aria-hidden="true" />
            {NEXT_EVENT}
          </p>
        )}
        <div className="cta-row">
          <Link className="pill lg" to="/interest">
            Get Involved
          </Link>
          <Link className="ghost" to="/contact">Contact</Link>
        </div>
      </div>
    </section>
  );
}

// ─── Connections (logo marquee) ─────────────────────────────────────────────

function Connections() {
  // Render the partner list twice back-to-back so the CSS animation
  // (translateX(-50%) looping) reads as a seamless, infinite scroll —
  // same trick the mock did via `track.innerHTML += track.innerHTML`.
  const items = [...PARTNERS, ...PARTNERS];

  return (
    <section className="connections">
      <div className="label">OUR CONNECTIONS</div>
      <div className="marquee">
        <div className="track">
          {items.map(({ name, logo, href, solid }, i) => (
            <a key={`${name}-${i}`} className="logo-box" href={href} target="_blank" rel="noopener noreferrer">
              <PartnerLogo name={name} logo={logo} solid={solid} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// A partner's logo, or their name if we don't have one. Added 2026-08-24
// with EPRI and PG&E, neither of which has a logo file yet.
//
// Without this, adding a partner before someone tracks down a usable
// logo means a broken-image icon on the homepage — which looks worse
// than the name in plain text and, unlike missing artwork, looks like
// the site itself is broken. Now the list can be kept accurate and the
// artwork can catch up.
function PartnerLogo({ name, logo, solid }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="logo-fallback">{name}</span>;
  return (
    <img
      className={solid ? 'is-solid' : undefined}
      src={logo}
      alt={name}
      onError={() => setFailed(true)}
    />
  );
}

// ─── Design Teams (accordion) ───────────────────────────────────────────────

function DesignTeams() {
  const [openKey, setOpenKey] = useState(null);
  const hasOpen = openKey !== null;

  function toggle(key) {
    setOpenKey((cur) => (cur === key ? null : key));
  }

  return (
    <section className="teams" id="teams">
      <div className="label">DESIGN TEAMS</div>
      <div className={`dt-grid${hasOpen ? " has-open" : ""}`}>
        {TEAMS.map((team) => {
          const isOpen = openKey === team.key;
          return (
            <div
              key={team.key}
              className={`dt-card${isOpen ? " open" : ""}`}
              onClick={() => toggle(team.key)}
            >
              <img className="bg" src={team.img} alt={team.title} />
              <div className="grad" />
              <div className="tt"><span>{team.title}</span></div>
              <div
                className="dt-close"
                onClick={(e) => { e.stopPropagation(); setOpenKey(null); }}
              >
                ✕
              </div>
              <div className="exp">
                <h3>{team.title}</h3>
                <div className="meta">{team.meta}</div>
                <p>{team.desc}</p>
                {/* Two ways out of an open card, added 2026-08-29.
                    "Join this team" was the only one, which meant the
                    three sentences above were the end of the road for
                    anyone who wanted to know more before committing to a
                    form. The team page carries the same description plus
                    what the team has actually won. */}
                <div className="dt-actions">
                  <Link
                    className="ghost sm"
                    to={`/teams/${team.slug}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Team page
                  </Link>
                  <Link
                    className="ghost sm"
                    to="/interest"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Join this team
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Board (3D coverflow carousel) ──────────────────────────────────────────

// Standard Instagram glyph (rounded-square camera outline + lens dot) —
// sized to sit inside the same 38x38 icon-button box the LinkedIn "in"
// text glyph already uses (see .cf-info .links a in Home.css), just as
// an SVG instead of text since there's no simple 1-2 letter abbreviation
// for Instagram the way "in" works for LinkedIn.
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.6" r="1.15" fill="currentColor" />
    </svg>
  );
}

function Board() {
  const [active, setActive] = useState(0);
  const stageRef = useRef(null);
  const hitzoneRef = useRef(null);
  const N = BOARD.length;

  // Declared up here (it used to sit further down, next to the wheel
  // listener) so the keyboard effect below can read the live value
  // without listing `active` as a dependency — see that effect.
  const activeRef = useRef(active);
  activeRef.current = active;

  function goTo(i) {
    const next = ((i % N) + N) % N;
    setActive(next);
  }

  // The name/role/links crossfade used to be React state: an effect on
  // [active] set infoVisible=false, started a 160ms timer, then set it
  // back to true. Replaced with a CSS animation keyed off `active` (see
  // .cf-info in Home.css) on 2026-08-24, as part of fixing scroll lag.
  //
  // The state version cost TWO extra renders of this whole component per
  // card step, plus a timer to create and clear. That is invisible when
  // you press an arrow key once. During a fast scroll the drain loop
  // steps every 90ms, so a flick through ten cards was ~30 renders of
  // all fourteen cards in under a second, two thirds of them existing
  // only to fade a caption. The animation does the same thing on the
  // compositor with no renders at all.

  // Keyboard: bound ONCE. This effect used to depend on [active], so
  // every single card step tore down and re-added a window keydown
  // listener — fourteen add/remove pairs during one flick, for a handler
  // whose only use of `active` is reading the current value, which
  // activeRef already provides.
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "ArrowLeft") goTo(activeRef.current - 1);
      if (e.key === "ArrowRight") goTo(activeRef.current + 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Cached horizontal bounds of the center hitzone.
  //
  // THIS is the main thing that made scrolling the board feel heavy. The
  // wheel handler used to call hitzone.getBoundingClientRect() on every
  // single wheel event to decide whether the cursor was over the cards.
  // getBoundingClientRect forces the browser to flush layout
  // synchronously before it can answer — and it was being asked while
  // fourteen cards were mid-flight through a .55s 3D transform
  // transition, i.e. at the most expensive possible moment. A trackpad
  // emits 60-120 wheel events a second, so that is 60-120 forced
  // reflows a second during exactly the animation they interrupt.
  //
  // The zone's left/right edges only move when the window resizes (it is
  // a centered, fixed-max-width box), so measuring once and on resize is
  // not an approximation — it is the same number, read without stopping
  // the renderer to get it.
  const zoneRef = useRef({ left: 0, right: Infinity });
  useEffect(() => {
    const hitzone = hitzoneRef.current;
    if (!hitzone) return;
    function measure() {
      const r = hitzone.getBoundingClientRect();
      zoneRef.current = { left: r.left, right: r.right };
    }
    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Mouse-wheel / trackpad scroll advances the carousel, same direction as
  // ArrowRight/ArrowLeft above. Several things this needs that a naive
  // "one wheel event = one card" mapping wouldn't get right:
  //
  // 1. Only react while the cursor is horizontally over the center
  //    "hitzone" — a narrower region than the full .cf-stage width (see
  //    .cf-hitzone's CSS for its width). The stage spans the whole
  //    section including empty space on either side of the visible card
  //    cluster; if the carousel captured wheel events across all of that,
  //    the page couldn't be scrolled normally anywhere near the board,
  //    even far from the actual cards (the "red zone" problem). The
  //    listener is attached to the whole stage (stageRef) rather than a
  //    literal overlay div, because an overlay div positioned in front of
  //    the cards (needed for it to reliably receive the wheel event
  //    instead of the topmost card underneath it) would also swallow
  //    clicks on the cards/arrows. Reading e.clientX and comparing
  //    against the hitzone element's live bounding rect gets the same
  //    "only the center zone reacts" behavior via plain geometry, with no
  //    stacking-order conflict — .cf-hitzone stays purely a visual/CSS
  //    reference (see the div in the JSX below) for what that zone is,
  //    not an event target itself. preventDefault() is likewise only
  //    called inside that zone, so outside it the page scrolls exactly
  //    like normal.
  //
  // 2. Uncapped, uncooldown'd accumulation that actually FLOWS — every
  //    wheel event's delta magnitude adds to a running pixel total
  //    (wheelAccumRef) instead of being converted to a step and thrown
  //    away, and the drain loop (below) walks through however many steps
  //    that adds up to on a fast, fixed cadence (STEP_INTERVAL_MS),
  //    advancing as quickly as the accumulated input allows rather than
  //    pausing to let each card's full .55s CSS transition (see .cf-card
  //    in Home.css) finish before starting the next one.
  //
  //    That distinction matters and was the actual bug in an earlier
  //    version of this: it correctly avoided dropping/capping scroll
  //    input, but paced each queued step exactly 550ms apart — matched
  //    1:1 to the CSS transition's duration — so a fast flick that queued
  //    up 10 steps still played out as 10 separate stop-and-go beats,
  //    ~550ms each, instead of feeling like one continuous motion through
  //    the cards. The fix is to decouple "how fast we advance the active
  //    index" from "how long one card's CSS transition takes to fully
  //    settle": setActive can be called far more often than every 550ms,
  //    and because CSS transitions restart smoothly from wherever an
  //    element currently sits mid-flight (rather than snapping back to a
  //    start position first), calling goTo() every ~90ms while there's
  //    still accumulated input to work through makes the cards visually
  //    blend through each other — actually flowing — instead of settling
  //    completely between every single step. See the STEP_INTERVAL_MS
  //    comment below for why there's no separate slower pace for the
  //    final step either.
  //
  //    The accumulator itself still works the same as before: it's NEVER
  //    blocked or reset while draining, so scrolling many times in a row
  //    doesn't lose any of that input — see onWheel below.
  const wheelAccumRef = useRef(0); // running pixel total not yet converted to card-steps
  const drainingRef = useRef(false); // true while the queued steps are being walked through
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Pixel distance (in wheel-event delta units) that equals one card
    // step once accumulated. Same tuning as before: an ordinary slow
    // scroll's small per-event deltas take a few events to cross this
    // threshold (feels like "one notch = one card"), while a fast flick's
    // large single-event delta can cross it several times over, queuing
    // several card-steps from one gesture.
    const STEP_THRESHOLD = 120;
    // How often the drain loop is allowed to advance to the next card
    // while working through a backlog. Deliberately much shorter than
    // .cf-card's .55s CSS transition (see Home.css) — the goal isn't to
    // let every card fully settle before the next one starts, it's to
    // keep calling goTo() often enough that the cards are always
    // mid-transition, blending continuously into each other, which is
    // what actually reads as "flowing" rather than "stepping." 90ms
    // keeps consecutive steps comfortably faster than the eye registers
    // as separate discrete stops, while still giving each setActive a
    // moment to actually paint (going much lower, close to 0ms/rAF-only
    // pacing, looked identical to jumping straight to the final card
    // with no visible motion in between when tested).
    //
    // There's deliberately no separate "slow down for the last step"
    // branch here (an earlier version of this tried that, timed to
    // .cf-card's .55s transition) — it turned out to add nothing
    // visible: the wait it introduced came AFTER the final goTo() call,
    // so it only delayed drainingRef resetting to false, not anything
    // on screen. The actual "lands smoothly instead of snapping" feel
    // for the last card comes for free from the CSS transition itself
    // (.cf-card's transition: transform .55s ...) — that plays out at
    // its own full eased duration regardless of how quickly goTo() was
    // called, since it's the browser animating toward wherever the
    // element's transform target currently is. Keeping every step at the
    // same fast STEP_INTERVAL_MS also fixed a small responsiveness bug
    // the settle-wait version had: during that extra dead wait,
    // drainingRef stayed true, so a new scroll arriving in that window
    // would correctly still accumulate into wheelAccumRef but wouldn't
    // resume being drained until the pending timeout finally fired.
    const STEP_INTERVAL_MS = 90;

    // Walks through whatever's built up in wheelAccumRef, one card at a
    // time, until the accumulator drops below one full step. Because
    // this only runs one call at a time (drainingRef guards re-entry)
    // but re-checks the accumulator after every step — rather than
    // capturing a fixed step count up front — any wheel events that
    // arrive WHILE it's draining just add to the total it's already
    // working through, instead of being dropped or starting a
    // conflicting second drain.
    function drain() {
      if (drainingRef.current) return;

      function step() {
        const magnitude = Math.abs(wheelAccumRef.current);
        if (magnitude < STEP_THRESHOLD) {
          drainingRef.current = false;
          return;
        }
        drainingRef.current = true;
        const direction = wheelAccumRef.current > 0 ? 1 : -1;
        wheelAccumRef.current -= direction * STEP_THRESHOLD;
        goTo(activeRef.current + direction);
        setTimeout(step, STEP_INTERVAL_MS);
      }
      step();
    }

    function onWheel(e) {
      // Cached bounds, not a live measurement — see zoneRef above.
      const zone = zoneRef.current;
      if (e.clientX < zone.left || e.clientX > zone.right) {
        return; // cursor is over the sides — let the page scroll normally
      }

      e.preventDefault();

      // Trackpads commonly send both a dominant vertical (deltaY) and a
      // smaller horizontal (deltaX) component even for a "straight up"
      // scroll gesture; picking whichever axis moved more avoids a
      // horizontal trackpad swipe and a vertical mouse-wheel scroll being
      // treated inconsistently.
      const delta = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
      if (Math.abs(delta) < 4) return; // ignore near-zero noise events

      wheelAccumRef.current += delta;
      drain();
    }

    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => stage.removeEventListener("wheel", onWheel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Touch/swipe support — added 2026-08-12 per explicit feedback ("when
  // you scroll... it doesn't work for the [board] whatsoever [on
  // mobile]. You're not able to scroll on mobile as you are on a
  // computer"). The wheel listener above only ever fires for a physical
  // mouse wheel or trackpad — a phone's finger swipe never generates a
  // "wheel" event, so without a matching touch handler here mobile
  // visitors had NO way to move through the carousel by swiping the way
  // desktop visitors move through it by scrolling; only the arrow
  // buttons and tapping a neighboring card worked. Confirmed as an
  // actual gap (not just a guess) by simulating a real touch swipe
  // against a mobile-viewport build before writing this fix: the active
  // card never changed.
  //
  // Simpler than the wheel accumulator/drain-loop above on purpose — a
  // touch swipe is one discrete gesture with a clear start and end, not
  // a stream of small deltas that needs pacing to feel like continuous
  // motion, so there's no need to replicate that machinery here. Same
  // hitzone-gating and axis-picking principles as the wheel listener
  // still apply though: only a swipe that STARTS within the hitzone and
  // whose motion is genuinely more horizontal than vertical drives the
  // carousel; anything else (starting outside the card cluster, or a
  // mostly-vertical drag) is left alone so the page still scrolls
  // normally on mobile, same as scrolling outside the hitzone works on
  // desktop.
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Total horizontal finger-travel (in px) that counts as one card
    // step. Tuned lower than the wheel listener's STEP_THRESHOLD (120)
    // since these are actual on-screen pixels a thumb dragged, not wheel
    // -delta units — a comfortable full-width swipe on a phone covers
    // maybe 150-250px total, so 60px/card lets one flick move through
    // 2-4 cards, similar in feel to a firm trackpad flick.
    const TOUCH_STEP_PX = 60;

    let touchActive = false;
    let isHorizontal = null; // null until the gesture's dominant axis is decided
    let startX = 0;
    let startY = 0;
    let steppedPx = 0; // how much of the drag has already been converted into steps

    function onTouchStart(e) {
      if (e.touches.length !== 1) return; // ignore pinch/multi-touch
      const touch = e.touches[0];
      const zone = zoneRef.current;
      if (touch.clientX < zone.left || touch.clientX > zone.right) return;
      touchActive = true;
      isHorizontal = null;
      startX = touch.clientX;
      startY = touch.clientY;
      steppedPx = 0;
    }

    function onTouchMove(e) {
      if (!touchActive || e.touches.length !== 1) return;
      const touch = e.touches[0];
      const dx = touch.clientX - startX;
      const dy = touch.clientY - startY;

      if (isHorizontal === null) {
        // Wait for real, deliberate movement before committing to an
        // axis — a barely-moved touch (basically a tap) shouldn't
        // prematurely decide the gesture is horizontal.
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        isHorizontal = Math.abs(dx) > Math.abs(dy);
        if (!isHorizontal) {
          // Vertical drag — this is a normal page-scroll gesture, not a
          // carousel swipe. Bail out and let the browser handle it.
          touchActive = false;
          return;
        }
      }

      // Horizontal swipe over the cards — this IS the carousel gesture,
      // so prevent the page (and iOS Safari's edge-swipe back/forward
      // navigation) from also trying to react to it.
      e.preventDefault();

      const traveled = dx - steppedPx;
      if (Math.abs(traveled) >= TOUCH_STEP_PX) {
        // Dragging right (dx > 0, finger moving left-to-right) reveals
        // the PREVIOUS card, same direction convention as the wheel
        // listener (scrolling/dragging "forward" = active + 1).
        const direction = traveled > 0 ? -1 : 1;
        goTo(activeRef.current + direction);
        // Consume this step's worth of distance in the SAME sign as the
        // travel that triggered it (not the resulting `direction`, which
        // is inverted from `traveled`'s sign) — so the next comparison
        // (`dx - steppedPx`) measures only the leftover, not-yet-stepped
        // portion of the drag. Getting this backwards (tying the sign to
        // `direction` instead of `traveled`) was an actual bug caught
        // while testing: it made steppedPx walk the WRONG way, so a
        // rightward drag's accumulated distance never shrank back below
        // the threshold and no step ever landed.
        steppedPx += traveled > 0 ? TOUCH_STEP_PX : -TOUCH_STEP_PX;
      }
    }

    function onTouchEnd() {
      touchActive = false;
      isHorizontal = null;
    }

    // touchstart/touchend stay passive (never preventDefault) — only
    // touchmove needs { passive: false }, since that's the only one that
    // ever calls preventDefault, and only once a horizontal drag is
    // confirmed.
    stage.addEventListener("touchstart", onTouchStart, { passive: true });
    stage.addEventListener("touchmove", onTouchMove, { passive: false });
    stage.addEventListener("touchend", onTouchEnd, { passive: true });
    stage.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      stage.removeEventListener("touchstart", onTouchStart);
      stage.removeEventListener("touchmove", onTouchMove);
      stage.removeEventListener("touchend", onTouchEnd);
      stage.removeEventListener("touchcancel", onTouchEnd);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const current = BOARD[active];

  return (
    <section className="board" id="board">
      <div className="label">BOARD</div>
      <div className="cf-stage" ref={stageRef}>
        {/* Defines the center "hitzone" that the wheel listener (see the
            comment above, attached to the whole stage) checks the cursor
            against — scrolling inside this zone's horizontal bounds
            drives the carousel, scrolling outside it (the empty space on
            either side of the visible card cluster) scrolls the page
            normally. This div is NOT itself a wheel-event target (it has
            pointer-events: none in CSS) — it exists only so the listener
            can read its live getBoundingClientRect() as the zone
            boundary, and is invisible (no fill) since it's not meant to
            be seen, just measured. */}
        <div className="cf-hitzone" ref={hitzoneRef} />
        <div className="cf-arrow left" onClick={() => goTo(active - 1)} role="button" aria-label="Previous">‹</div>
        <div className="cf-arrow right" onClick={() => goTo(active + 1)} role="button" aria-label="Next">›</div>
        {BOARD.map((m, j) => {
          let o = (j - active) % N;
          if (o > N / 2) o -= N;
          if (o < -N / 2) o += N;
          const ao = Math.abs(o);
          const style = {
            transform: `translateX(${o * 205}px) translateZ(${-ao * 150}px) rotateY(${o > 0 ? -16 : o < 0 ? 16 : 0}deg)`,
            opacity: ao > 3 ? 0 : 1,
            pointerEvents: ao > 3 ? "none" : "auto",
            zIndex: 20 - ao,
          };
          return (
            <div
              key={m.n}
              className="cf-card"
              style={style}
              onClick={() => { if (j !== active) goTo(j); }}
            >
              <img src={m.img} alt={m.n} />
              <div className="cf-grad" />
              <div className="cf-name" style={{ opacity: o === 0 ? 0 : 1 }}>{m.n}</div>
              {/* The dimming of the off-center cards used to be
                  `filter: brightness(.38)` on the card itself, animated
                  by a `filter .55s` transition. Replaced with this
                  overlay on 2026-08-24 as part of fixing the scroll lag.

                  A filter transition cannot run on the compositor: the
                  browser has to re-rasterise the whole card - a 290x400
                  photo, its gradient and its border - on every frame of
                  the fade, for up to fourteen cards at once. Animating an
                  overlay's opacity is a compositor-only property, so the
                  same fade costs nothing per frame.

                  It sits ABOVE .cf-name deliberately, because brightness
                  dimmed the name too and the overlay should match. */}
              <div className="cf-dim" style={{ opacity: o === 0 ? 0 : 1 }} />
            </div>
          );
        })}
      </div>
      {/* key={active} restarts the CSS fade-in on every change — this is
          the crossfade that used to be driven by infoVisible state and a
          160ms timer. */}
      <div className="cf-info" key={active}>
        <div className="n">{current.n}</div>
        <div className="r">{current.r}</div>
        <div className="links">
          {/* li/ig are both optional — render each icon only when a real
              URL is present, instead of a dead href="undefined" link for
              any entry that doesn't have one (e.g. the still-pending
              Faculty Advisor slot, whenever that's added without socials
              handy). */}
          {current.li && (
            <a href={current.li} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
          )}
          {/* Instagram button — added 2026-08-16, replacing the old
              shared mailto:aeeusc@gmail.com placeholder that was
              identical for every person. Every BOARD entry currently
              points at the generic instagram.com landing page as a
              placeholder (see the `ig:` field above) until Kev collects
              each person's real handle when he generates their portal
              accounts. Uses an actual Instagram glyph icon (matching the
              LinkedIn "in" wordmark-style icon) rather than reusing the
              old "@" email glyph, since it no longer links to email. */}
          {current.ig && (
            <a href={current.ig} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
          )}
        </div>
      </div>
      <div className="board-note" />
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
// Exported for the same reason as Nav above — About.jsx reuses it.

// showNewsletterSignup: the Member Portal (Portal.jsx) reuses this same
// Footer for consistency ("copy the bottom section, just without the
// Join the Community thing" — since a logged-in member is either
// already subscribed or can subscribe from the homepage; repeating the
// signup pitch on a page you can only reach by already having an
// account didn't make sense) but hides the newsletter-signup row.
// Defaults to true so every existing call site (Home.jsx, About.jsx)
// keeps behaving exactly as before with no changes needed there.
export function Footer({ showNewsletterSignup = true }) {
  // Newsletter signup — actually calls the backend's /newsletter/subscribe
  // endpoint now (see src/lib/api.js's subscribeToNewsletter). This used
  // to just open the old standalone Google Form in a new tab, from before
  // the newsletter backend existed; that meant real subscribe attempts on
  // the live site never touched the database NewsletterAdmin.jsx and the
  // "Check subscriber count" button actually read from — so the newsletter
  // feature looked broken/nonfunctional even though the backend itself
  // (and the admin send page) had worked correctly the whole time. This
  // is the actual fix.
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [feedback, setFeedback] = useState("");

  async function handleSubscribe(e) {
    e.preventDefault();
    setStatus("submitting");
    setFeedback("");
    try {
      await subscribeToNewsletter(email);
      setStatus("success");
      setFeedback("You're subscribed!");
      setEmail("");
    } catch (err) {
      setStatus("error");
      setFeedback(err.message || "Something went wrong. Please try again.");
    }
  }

  return (
    <footer>
      <div className="foot-inner">
        {showNewsletterSignup && (
          <div className="news-row" id="newsletter">
            <div>
              <div className="nr-t">JOIN THE COMMUNITY</div>
              <div className="nr-s">Get updates on events, competitions, and opportunities.</div>
              {status !== "idle" && (
                <div className={`nr-feedback ${status}`}>{feedback}</div>
              )}
            </div>
            <form className="news-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "submitting"}
              />
              <button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Subscribing…" : "Subscribe"}
              </button>
            </form>
          </div>
        )}

        <div className="foot-main">
          <div className="foot-brand">
            <div className="fb-logo">
              <img src={asset("/logo.svg")} alt="" />
              <span>AEE at USC</span>
            </div>
            <p>USC's hub for all things energy and sustainability.</p>
            <div className="based">Based at USC · Los Angeles, CA</div>
            <div className="socials">
              <a href="https://www.instagram.com/aeeusc" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg viewBox="0 0 24 24">
                  <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
                  <circle cx="12" cy="12" r="4.4" />
                  <circle cx="17.6" cy="6.4" r="1.1" fill="rgba(255,255,255,.8)" stroke="none" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/association-of-energy-engineers-usc/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-13h4v1.5" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>

          <div className="foot-cols">
            <div className="fcol">
              <div className="fc-t">PAGES</div>
              {/* Same fix as NAV_LINKS above: "About" is a real route, and
                  Footer is shared across Home *and* About (and eventually
                  other pages), so these links can't assume "the current
                  page" the way a bare "#teams" href would. */}
              <Link to="/about">About</Link>
              <a href={`${import.meta.env.BASE_URL}#teams`}>Design Teams</a>
              <a href={`${import.meta.env.BASE_URL}#board`}>Board</a>
            </div>
            <div className="fcol">
              <div className="fc-t">CONNECT</div>
              {/* Was pointing at a Google Form, not at Slack — the label
                  and the destination had drifted apart. Real invite as
                  of 2026-08-24. Shared invite links do expire; if this
                  stops working, generate a new one in Slack. */}
              <a href="https://join.slack.com/t/associationof-rh49850/shared_invite/zt-47vae5ny9-DuwEqV7oZ46IqdruX5QbuA" target="_blank" rel="noopener noreferrer">Slack</a>
              {/* Same fix as the subscribe form above (see Footer's
                  handleSubscribe) — this used to point at the old
                  standalone Google Form. Now scrolls to the real
                  subscribe form in this same footer (#newsletter, added
                  to .news-row above) instead of opening a form that
                  doesn't feed the actual subscriber database. */}
              {/* Points at the members' archive, not the subscribe form
                  further up this same footer. A logged-out visitor gets
                  bounced through login and lands back here — see the
                  redirect in Newsletter.jsx. */}
              <Link to="/newsletter">Newsletter</Link>
              <Link to="/contact">Contact</Link>
              <Link to="/interest">Get Involved</Link>
            </div>
          </div>
        </div>

        <div className="legal">
          <div className="copy">© 2026 AEE at USC. All rights reserved.</div>
          {/* .legal-links CSS already existed in Home.css from an earlier
              pass but was never actually rendered here — added now
              alongside the Privacy/Terms pages themselves (see
              Legal.jsx / App.jsx). */}
          <div className="legal-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="home-page">
      <Nav />
      <Hero />
      <Connections />
      <DesignTeams />
      <Board />
      <Footer />
    </div>
  );
}