// src/pages/About.jsx
//
// The About section, split out into its own route (like /login and
// /signup already are) instead of living as an anchor-scrolled section
// inside Home.jsx. It used to be reachable by scrolling the homepage or
// clicking "About" in the nav (which jumped to #about); now "About" in
// the nav is a real link to /about, and this page owns that content on
// its own URL — shareable, bookmarkable, and independent of the
// homepage's scroll position.
//
// Reuses Home's Nav and Footer (imported, not duplicated) so this page
// looks and behaves like part of the same site rather than a
// separately-maintained page with its own header/footer markup. Also
// imports Home.css directly rather than copying styles, since the
// .about/.stat/.statement/etc. classes — and the :root color variables
// they depend on — are already defined there and this page's content is
// verbatim what used to render inside that stylesheet's scope.
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import { Nav, Footer } from "./Home";
import "./Home.css";

// Same helper as Home.jsx — see the comment there for why this can't just
// be a plain "/bolt_v2.svg" string. Duplicated rather than imported
// because Home.jsx doesn't export it; if it ever needs to change, update
// both copies.
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

// Title Case, matching a wording update made directly on the live site
// (independently of this file, since About.jsx isn't in that history) —
// synced here during the main/origin merge on 2026-08-07 so both stay
// consistent.
const STATS = [
  { count: 90, suffix: "+", label: "Active Members" },
  { count: 3, suffix: "", label: <>Nationally Competing Design&nbsp;Teams</> },
  { count: 9, suffix: "", label: "Policy Consortium Organizations" },
];

// Headline changed 2026-08-23. The founding vision — "build the Hub for
// Energy at USC" — is the through-line of everything else on this page,
// so it leads. The previous headline ("We put student engineers at the
// center of the energy transition.") wasn't dropped; it moved down to
// become the supporting line underneath, where it still does its job.
const STATEMENT = "The Hub for Energy at USC.";

// What AEE offers — the "values" row. Deliberately four short cards
// rather than prose: this is the part of the page a prospective member
// scans rather than reads, so each one is a single scannable promise
// with one sentence of substance under it.
//
// Content drawn from the founding brief: a hub "for engineers and non
// engineers alike" spanning technology, policy, and innovation, plus the
// three things the org already measurably does (design teams, the policy
// consortium, and industry access).
const OFFERINGS = [
  {
    title: "Open to every major",
    body: "Built for engineers and non-engineers alike — anyone with a stake in how energy gets made, moved, governed, and paid for.",
  },
  {
    title: "Nationally competing design teams",
    body: "Three teams building real hardware against real deadlines, judged against schools across the country.",
  },
  {
    title: "Policy that ships",
    body: "A consortium of nine organizations turning energy research into positions that reach the people who set the rules.",
  },
  {
    title: "A launchpad, not a line item",
    body: "Direct access to industry, founders, and competitions — the kind that turns a class project into a company.",
  },
];

// The Olympic Week numbers. A handful of headline figures like these is
// a KPI row of stat tiles, NOT a chart — there's no trend, no comparison
// between series, and no part-to-whole relationship here; each number is
// its own standalone fact. Rendering them as bars or a pie would invent
// a relationship that doesn't exist in the data.
const OLYMPIC_STATS = [
  { count: 350, suffix: "+", label: "Students across five days" },
  { count: 25, suffix: "+", label: "LA28 and industry speakers" },
  { count: 5, suffix: "", label: "Panels plus an innovation hackathon" },
  { count: 25, suffix: "+", label: "Teams in the hackathon" },
];

// ─── Interactive Three.js atom ──────────────────────────────────────────────
//
// Verbatim copy of Home.jsx's AtomCanvas (drag-to-rotate on every axis,
// centered atom group, etc.) — see Home.jsx for the history/reasoning
// behind each piece of this. Kept as a plain copy rather than a shared
// import so this page has no runtime dependency on Home.jsx beyond Nav
// and Footer; the two can drift intentionally if the sphere ever needs to
// look different in the two places, without one page's tweak silently
// changing the other's.
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

// ─── Word-reveal statement + stat count-up ──────────────────────────────────

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

// ─── Page ───────────────────────────────────────────────────────────────────
//
// Note: this section no longer needs `id="about"` (that existed only so
// the old #about anchor link could scroll to it within the homepage) —
// removed since it's on its own URL now and an in-page anchor would be
// meaningless here.
export default function About() {
  return (
    <div className="home-page">
      <Nav />
      <section className="about">
        <div className="label">ABOUT</div>
        <StatementReveal text={STATEMENT} />
        <p className="about-body">
          We put student engineers at the center of the energy transition — entirely
          student-led, open to every major, and building in public.
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

      {/* ─── Origin ─────────────────────────────────────────────────
          Added 2026-08-23. The founding story, told as a pull quote
          plus two short columns rather than one long paragraph — the
          same content reads as a wall of text at this width otherwise,
          and the "sandbox on the frontier" line is the most quotable
          thing on the page, so it gets to be the thing you actually
          see. */}
      <section className="about-origin">
        <div className="about-inner">
          <div className="label">ORIGIN</div>
          <h2 className="about-h2">Founded in 2024.</h2>

          <div className="about-origin-grid">
            <p>
              The Association of Energy Engineers at USC was founded in 2024. The original
              vision, from founder <strong>Mitchell Kirby&nbsp;'26</strong>, was to build the
              Hub for Energy at USC — a home for engineers and non-engineers alike with an
              interest in the advancement of energy, its technologies and innovations, and
              the policy surrounding its development and outcomes.
            </p>
            <p>
              Since then AEE has become a sandbox on the frontier of emerging technologies,
              unconstrained by energy and engineering alone. It resides within the USC Viterbi
              School of Engineering's Sonny Astani Department of Civil and Environmental
              Engineering.
            </p>
          </div>

          <blockquote className="about-quote">
            A sandbox on the frontier of emerging technologies — unconstrained by energy and
            engineering alone.
          </blockquote>
        </div>
      </section>

      {/* ─── What we offer ──────────────────────────────────────────
          The "values" half of the brief. Four cards, one promise each. */}
      <section className="about-offer">
        <div className="about-inner">
          <div className="label">WHAT WE OFFER</div>
          <h2 className="about-h2">Built to be used.</h2>

          <div className="about-offer-grid">
            {OFFERINGS.map((o) => (
              <div className="about-offer-card" key={o.title}>
                <h3>{o.title}</h3>
                <p>{o.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Successes ──────────────────────────────────────────────
          Olympic Week as a featured case study. Structured as
          headline → stat row → outcome, because the outcome (a
          hackathon team going on to win a real startup competition) is
          the strongest single fact here and shouldn't be buried inside
          a paragraph of setup. */}
      <section className="about-success">
        <div className="about-inner">
          <div className="label">SUCCESSES</div>
          <h2 className="about-h2">The first USC Olympic Week.</h2>
          <p className="about-lead">
            The upcoming 2028 Los Angeles Summer Olympics found a home in AEE. Our team hosted
            the LA28 organization and 25 corresponding speakers for the first-ever USC Olympic
            Week — five days of panels and an innovation hackathon built around the real
            challenges of the 2028 Games.
          </p>

          <div className="stats about-success-stats">
            {OLYMPIC_STATS.map((s, i) => (
              <StatCounter key={i} count={s.count} suffix={s.suffix} label={s.label} />
            ))}
          </div>

          <div className="about-outcome">
            <div className="about-outcome-tag">The winning team</div>
            <h3 className="about-outcome-name">Matterflow</h3>
            <p className="about-outcome-body">
              Over 25 teams competed for the $1,000 grand prize. Matterflow took it with a
              compact, low-cost, onsite recycling and sorting machine — then went on to win the
              annual 2026 Innovate Los Angeles Startup Incubator Competition.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}