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
import { subscribeToNewsletter } from "../lib/api";
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
  { name: "CalWave", logo: asset("/logos/calwave.png"), href: "https://calwave.org" },
  { name: "Graymatter Robotics", logo: asset("/logos/graymatterrobotics.png"), href: "https://www.graymatter-robotics.com" },
  { name: "KPFF", logo: asset("/logos/kpff.png"), href: "https://www.kpff.com" },
  { name: "NREL", logo: asset("/logos/nrel.png"), href: "https://www.nrel.gov" },
  { name: "SGH", logo: asset("/logos/sgh.png"), href: "https://www.sgh.com" },
  { name: "Vatn Systems", logo: asset("/logos/vatn.png"), href: "https://www.vatnsystems.com" },
];

const TEAMS = [
  {
    key: "wind",
    title: "Collegiate Wind Competition Team",
    meta: "U.S. DEPT. OF ENERGY · NATIONAL COMPETITION",
    img: asset("/images/wind.webp"),
    desc: "Our Collegiate Wind Competition Team designs and builds small-scale wind turbines to compete in the U.S. Department of Energy's national competition. Students gain hands-on experience in aerodynamic design, structural analysis, and energy systems engineering.",
  },
  {
    key: "marine",
    title: "Marine Energy Collegiate Competition Team",
    meta: "U.S. DEPT. OF ENERGY · NATIONAL COMPETITION",
    img: asset("/images/marine.jpg"),
    desc: "We are currently prototyping our Oscillating Water Column (OWC), which utilizes incoming waves to pressurize a column of air, spinning a turbine and generating electricity for battery storage. We are currently exploring the technologies behind underwater data centers, desalination facilities, and remote coastal communities.",
  },
  {
    key: "hydro",
    title: "Hydropower Collegiate Competition Team",
    meta: "U.S. DEPT. OF ENERGY · NATIONAL COMPETITION",
    img: asset("/images/hydro.jpg"),
    desc: "HCC is a design competition aimed at creating low impact hydropower energy source using existing infrastructure. We are looking to use a Pumped Storage Hydropower system that could serve regions of California typically excluded from renewable energy initiatives.",
  },
  {
    key: "solar",
    title: "Solar Table Initiative Team",
    meta: "CAMPUS INITIATIVE · INDUSTRY-MENTORED",
    img: asset("/images/solar.jpg"),
    desc: "The Solar Tables Initiative is working hard to bring 100% student designed outdoor tables with solar-powered charging capabilities to the USC community. We are designing our tables from the ground up with industry and manufacturer mentorship.",
  },
];

const BOARD = [
  { n: "Mitch Kirby", r: "President & Founder", img: asset("/eboard/mitchkirby.jpg"), li: "https://www.linkedin.com/in/mitchell-kirby/" },
  { n: "Alexandra Somodi", r: "Vice President & Brand Director", img: asset("/eboard/alexandrasomodi.png"), li: "https://www.linkedin.com/in/alexandra-somodi/" },
  { n: "David Moseley", r: "Design Team Coordinator", img: asset("/eboard/davidmoseley.jpg"), li: "https://www.linkedin.com/in/davidmmoseley/" },
  { n: "Jordyn Wetherbee", r: "Executive Coordinator & CWC PM", img: asset("/eboard/jordynwetherbee.jpg"), li: "https://www.linkedin.com/in/jordyn-wetherbee/" },
  { n: "James Hiemstra", r: "Director of Finance", img: asset("/eboard/jameshiemstra.jpg"), li: "https://www.linkedin.com/in/james-hiemstra-78b9872a1/" },
  { n: "Reeth Kawad", r: "Senior Advisor", img: asset("/eboard/reethkawad.jpg"), li: "https://www.linkedin.com/in/reethkawad/" },
  { n: "Chloe Flannigan", r: "Director of Membership", img: asset("/eboard/chloeflannigan.jpg"), li: "https://www.linkedin.com/in/chloe-flannigan-0950a2237/" },
  { n: "Helena Heckmann", r: "Director of Events", img: asset("/eboard/helenaheckmann.jpg"), li: "https://www.linkedin.com/in/helena-heckmann/" },
  { n: "Jainam Jain", r: "Director of Outreach & CWC PM", img: asset("/eboard/jainamjain.png"), li: "https://www.linkedin.com/in/jainam-jain-937a13214/" },
  { n: "Ellis Fertig", r: "ShadeLA PM & Director of Policy", img: asset("/eboard/ellisfertig.jpg"), li: "https://www.linkedin.com/in/ellis-fertig-4512b232b/" },
  { n: "Sam Gold", r: "ShadeLA PM & Asst. Director of Policy", img: asset("/eboard/samgold.jpg"), li: "https://www.linkedin.com/in/sam-j-gold/" },
  { n: "Alex Bartolomei", r: "MECC PM", img: asset("/eboard/alexbartolomei.jpg"), li: "https://www.linkedin.com/in/alexbartolomei/" },
  { n: "Alex Geschwill", r: "HCC PM", img: asset("/eboard/alexgeschwill.jpg"), li: "https://www.linkedin.com/in/alexandra-geschwill/" },
  { n: "Daniela Lopez Escalante", r: "Asst. Director of Brand", img: asset("/eboard/daniela.jpg"), li: "https://www.linkedin.com/in/daniela-lopez-escalante-839a4038a/" },
];

// ─── Nav + mobile menu ──────────────────────────────────────────────────────

// Exported (not just used locally) so About.jsx can reuse the exact same
// header — the new /about page should look like part of the same site,
// not a bolted-on page with its own separately-maintained nav markup.
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
          <a className="contact" href="mailto:aeeusc@gmail.com">Contact</a>
          <Link className="pill pill-ghost" to="/login">Log In</Link>
          <a className="pill" href="https://forms.gle/vSFAnuKfpKV3GFfJ6" target="_blank" rel="noopener noreferrer">
            Get Involved
          </a>
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
        <Link to="/login" onClick={() => setMenuOpen(false)}>Log In</Link>
        <a href="https://forms.gle/vSFAnuKfpKV3GFfJ6" target="_blank" rel="noopener noreferrer" onClick={() => setMenuOpen(false)}>
          Get Involved
        </a>
      </div>
    </>
  );
}

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
          USC's hub for energy and sustainability — nationally competing design teams,
          real policy work, and a launchpad for clean-energy careers.
        </p>
      </div>
      <div className="hero-bottom">
        <div className="cta-row">
          <a className="pill lg" href="https://forms.gle/vSFAnuKfpKV3GFfJ6" target="_blank" rel="noopener noreferrer">
            Get Involved
          </a>
          <a className="ghost" href="mailto:aeeusc@gmail.com">Contact</a>
        </div>
      </div>
      <div className="scroll-hint">SCROLL</div>
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
          {items.map(({ name, logo, href }, i) => (
            <a key={`${name}-${i}`} className="logo-box" href={href} target="_blank" rel="noopener noreferrer">
              <img src={logo} alt={name} />
            </a>
          ))}
        </div>
      </div>
    </section>
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
                <a
                  className="ghost sm"
                  href="https://forms.gle/vSFAnuKfpKV3GFfJ6"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  Join this team
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── Board (3D coverflow carousel) ──────────────────────────────────────────

function Board() {
  const [active, setActive] = useState(0);
  const [infoVisible, setInfoVisible] = useState(true);
  const stageRef = useRef(null);
  const hitzoneRef = useRef(null);
  const N = BOARD.length;

  function goTo(i) {
    const next = ((i % N) + N) % N;
    setActive(next);
  }

  // Fade the name/role/links out, swap, then fade back in — mirrors the
  // mock's setTimeout-based crossfade.
  useEffect(() => {
    setInfoVisible(false);
    const t = setTimeout(() => setInfoVisible(true), 160);
    return () => clearTimeout(t);
  }, [active]);

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "ArrowLeft") goTo(active - 1);
      if (e.key === "ArrowRight") goTo(active + 1);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

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
  const activeRef = useRef(active);
  activeRef.current = active;
  const wheelAccumRef = useRef(0); // running pixel total not yet converted to card-steps
  const drainingRef = useRef(false); // true while the queued steps are being walked through
  useEffect(() => {
    const stage = stageRef.current;
    const hitzone = hitzoneRef.current;
    if (!stage || !hitzone) return;

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
      const zoneRect = hitzone.getBoundingClientRect();
      if (e.clientX < zoneRect.left || e.clientX > zoneRect.right) {
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
            filter: o === 0 ? "none" : "brightness(.38)",
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
            </div>
          );
        })}
      </div>
      <div className="cf-info" style={{ opacity: infoVisible ? 1 : 0 }}>
        <div className="n">{current.n}</div>
        <div className="r">{current.r}</div>
        <div className="links">
          <a href={current.li} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">in</a>
          <a href="mailto:aeeusc@gmail.com" aria-label="Email">@</a>
        </div>
      </div>
      <div className="board-note" />
    </section>
  );
}

// ─── Footer ─────────────────────────────────────────────────────────────────
// Exported for the same reason as Nav above — About.jsx reuses it.

export function Footer() {
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
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSde2ldtrVXhxu5plBeN3wLRApQoZtVfj8l0FhG_rllde9MKyw/viewform" target="_blank" rel="noopener noreferrer">Slack</a>
              {/* Same fix as the subscribe form above (see Footer's
                  handleSubscribe) — this used to point at the old
                  standalone Google Form. Now scrolls to the real
                  subscribe form in this same footer (#newsletter, added
                  to .news-row above) instead of opening a form that
                  doesn't feed the actual subscriber database. */}
              <a href={`${import.meta.env.BASE_URL}#newsletter`}>Newsletter</a>
              <a href="mailto:aeeusc@gmail.com">Contact</a>
              <a href="https://forms.gle/vSFAnuKfpKV3GFfJ6" target="_blank" rel="noopener noreferrer">Get Involved</a>
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