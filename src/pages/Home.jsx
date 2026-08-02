// src/pages/Home.jsx
//
// The real homepage, ported section-by-section from aee_homepage_mock_3.html
// into working React. Every interactive behavior from the mock (nav scroll
// shadow, word-by-word About reveal, stat count-up, logo marquee loop,
// Design Teams accordion, Board 3D coverflow carousel) is reimplemented
// here with React state/hooks instead of the mock's vanilla DOM scripting.
//
// One addition beyond the mock: a hamburger + fullscreen mobile menu.
// The mock only ever targeted desktop (it just hides .nav-links under
// 900px with nothing to replace it) — the real site needs working mobile
// nav, so this ports the current site's hamburger pattern into the new
// visual design.
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
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

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Design Teams", href: "#teams", caret: true },
  { label: "Board", href: "#board" },
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

const STATS = [
  { count: 90, suffix: "+", label: "Active Members" },
  { count: 3, suffix: "", label: <>Nationally Competing Design&nbsp;Teams</> },
  { count: 9, suffix: "", label: "Policy Consortium Organizations" },
];

const STATEMENT = "We put student engineers at the center of the energy transition.";

// ─── Interactive Three.js atom (About section) ─────────────────────────────
//
// Ported from the pre-rebuild Home.jsx. Renders a rotating "atom" made of
// three glowing torus rings plus a bolt icon (extruded from bolt_v2.svg)
// at the center, with drag-to-orbit camera controls. This replaces the
// mock's flat static SVG sphere with the site's original interactive
// centerpiece.
function AtomCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const W = mount.clientWidth;
    const H = mount.clientHeight;

    const scene = new THREE.Scene();
    scene.background = null;

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 0, 25);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const dir = new THREE.DirectionalLight(0xffffff, 1.5);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    // Centered on the camera's look-at target (0,0,0) — previously offset
    // to (0,-2,0), which was a small, barely-visible downward nudge at the
    // old 360px canvas size but became a large, lopsided gap once the
    // canvas grew to 600px (the offset is in fixed world units, so it
    // scales up in on-screen pixels right along with the canvas).
    const atomGroup = new THREE.Group();
    atomGroup.position.set(0, 0, 0);
    scene.add(atomGroup);

    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x3C596F,
      emissive: new THREE.Color(0x1a3f7a),
      emissiveIntensity: 1.2,
      roughness: 0.2,
      metalness: 0.0,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    [[0, 0], [Math.PI / 3, 0], [0, Math.PI / 3]].forEach(([rx, ry]) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(4, 0.15, 32, 100), ringMat);
      ring.rotation.x = rx;
      ring.rotation.y = ry;
      atomGroup.add(ring);
    });

    // The bolt icon is parented directly under atomGroup (rather than kept
    // in its own separate scene-level group) so it automatically inherits
    // every rotation applied to atomGroup — both the constant auto-spin and
    // the manual drag rotation below — with no extra code needed to keep
    // the two in sync.
    const loader = new SVGLoader();
    loader.load(
      asset("/bolt_v2.svg"),
      (data) => {
        const boltGroup = new THREE.Group();
        const mat = new THREE.MeshStandardMaterial({
          color: 0x47668A,
          emissive: new THREE.Color(0x47668A),
          emissiveIntensity: 1.0,
          transparent: true,
          opacity: 0.5,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          side: THREE.DoubleSide,
          roughness: 0.2,
          metalness: 0.0,
        });
        for (const path of data.paths) {
          for (const shape of SVGLoader.createShapes(path)) {
            const geom = new THREE.ExtrudeGeometry(shape, {
              depth: 10,
              bevelEnabled: false,
              curveSegments: 24,
            });
            geom.center();
            boltGroup.add(new THREE.Mesh(geom, mat));
          }
        }
        boltGroup.rotation.x = Math.PI;
        boltGroup.scale.setScalar(0.035);
        boltGroup.position.set(0, 0, 0);
        atomGroup.add(boltGroup);
      },
      undefined,
      (e) => console.error("SVG load error:", e)
    );

    atomGroup.rotation.y = 0.2;
    atomGroup.rotation.x = 0.1;

    // ─── Manual drag-to-rotate ────────────────────────────────────────────
    // Previously this used three's OrbitControls, which orbits the camera
    // around a fixed target. OrbitControls clamps its polar angle to
    // [0, π] by default specifically to stop the camera from crossing over
    // the top/bottom "poles" (avoiding a gimbal flip) — so a vertical drag
    // always hit a hard wall instead of continuing over the top, which
    // reads as the rotation "stopping." There's no supported OrbitControls
    // option that removes that limit entirely (widening minPolarAngle/
    // maxPolarAngle to their absolute max of [0, π] still stops right at
    // the poles), so full unrestricted rotation on every axis needs a
    // different approach: rotate atomGroup itself directly from pointer
    // movement, with no clamping at all on either axis. Dragging past the
    // top now keeps rotating smoothly over to the far side, same as
    // spinning a globe with a hand — exactly like the horizontal drag
    // already behaved, just now vertical works the same way.
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    const dragSpeed = 0.01;

    function onPointerDown(e) {
      isDragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      renderer.domElement.style.cursor = "grabbing";
    }
    function onPointerMove(e) {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      // No min/max clamp on either axis — rotation.x and rotation.y are
      // free-running radians, so they wrap continuously in every direction.
      atomGroup.rotation.y += dx * dragSpeed;
      atomGroup.rotation.x += dy * dragSpeed;
    }
    function onPointerUp() {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
    }

    renderer.domElement.style.cursor = "grab";
    renderer.domElement.style.touchAction = "none";
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      if (!isDragging) {
        atomGroup.rotation.y += 0.008;
      }
      renderer.render(scene, camera);
    }
    animate();

    function onResize() {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%" }} />;
}

// ─── Nav + mobile menu ──────────────────────────────────────────────────────

function Nav() {
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
        <a className="wordmark" href="#">
          <img src={asset("/logo.svg")} alt="AEE logo" />
          <span className="aee">AEE</span>
          <span className="atusc">at USC</span>
        </a>

        <div className="nav-links">
          {NAV_LINKS.map(({ label, href, caret }) => (
            <a key={label} href={href}>
              {label}
              {caret && <span className="caret">▾</span>}
            </a>
          ))}
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
        {NAV_LINKS.map(({ label, href }) => (
          <a key={label} href={href} onClick={() => setMenuOpen(false)}>
            {label}
          </a>
        ))}
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

// ─── About (word reveal + stat count-up) ───────────────────────────────────

function StatementReveal({ text }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setOn(true); }),
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <div ref={ref} className={`statement${on ? " on" : ""}`}>
      {words.map((word, i) => (
        <span key={i}>
          <span className="w" style={{ transitionDelay: `${i * 55}ms` }}>{word}</span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </div>
  );
}

function StatCounter({ count, suffix, label }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting && !startedRef.current) {
          startedRef.current = true;
          const t0 = performance.now();
          const dur = 1400;
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            setDisplay(Math.round(ease(p) * count));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      }),
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [count]);

  return (
    <div className="stat">
      <div ref={ref} className="num">{display}{suffix}</div>
      <div className="cap">{label}</div>
    </div>
  );
}

function About() {
  return (
    <section className="about" id="about">
      <div className="label">ABOUT</div>
      <StatementReveal text={STATEMENT} />
      <p className="about-body">
        Entirely student-led in USC's Sonny Astani Department — leading initiatives in
        sustainable design, policy, and professional development.
      </p>

      <div className="stats">
        {STATS.map((s, i) => (
          <StatCounter key={i} count={s.count} suffix={s.suffix} label={s.label} />
        ))}
      </div>

      <div className="orb-wrap">
        <div className="atom-canvas">
          <AtomCanvas />
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

  const current = BOARD[active];

  return (
    <section className="board" id="board">
      <div className="label">BOARD</div>
      <div className="cf-stage">
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

function Footer() {
  return (
    <footer>
      <div className="foot-inner">
        <div className="news-row">
          <div>
            <div className="nr-t">JOIN THE COMMUNITY</div>
            <div className="nr-s">Get updates on events, competitions, and opportunities.</div>
          </div>
          <form
            className="news-form"
            onSubmit={(e) => {
              e.preventDefault();
              window.open("https://forms.gle/2sbFAdnC5oxf3q2t6", "_blank", "noopener");
            }}
          >
            <input type="email" placeholder="your@email.com" required />
            <button type="submit">Subscribe</button>
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
              <a href="#about">About</a>
              <a href="#teams">Design Teams</a>
              <a href="#board">Board</a>
            </div>
            <div className="fcol">
              <div className="fc-t">CONNECT</div>
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSde2ldtrVXhxu5plBeN3wLRApQoZtVfj8l0FhG_rllde9MKyw/viewform" target="_blank" rel="noopener noreferrer">Slack</a>
              <a href="https://forms.gle/2sbFAdnC5oxf3q2t6" target="_blank" rel="noopener noreferrer">Newsletter</a>
              <a href="mailto:aeeusc@gmail.com">Contact</a>
              <a href="https://forms.gle/vSFAnuKfpKV3GFfJ6" target="_blank" rel="noopener noreferrer">Get Involved</a>
            </div>
          </div>
        </div>

        <div className="legal">
          <div className="copy">© 2026 AEE at USC. All rights reserved.</div>
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
      <About />
      <Connections />
      <DesignTeams />
      <Board />
      <Footer />
    </div>
  );
}