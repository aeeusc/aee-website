import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";
import "./Home.css";
import { objectPosition } from "three/tsl";

// ─── Three.js scene ──────────────────────────────────────────────────────────

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

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.target.set(0, 0, 0);
    controls.update();

    scene.add(new THREE.AmbientLight(0xffffff, 1));
    const dir = new THREE.DirectionalLight(0xffffff, 1.5);
    dir.position.set(5, 10, 7);
    scene.add(dir);

    const atomGroup = new THREE.Group();
    atomGroup.position.set(0, -2, 0);
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

    const boltStatic = new THREE.Group();
    boltStatic.position.set(0, -2, 0);
    scene.add(boltStatic);

    const loader = new SVGLoader();
    loader.load(
      "/bolt_v2.svg",
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
        boltStatic.add(boltGroup);
      },
      undefined,
      (e) => console.error("SVG load error:", e)
    );

    atomGroup.rotation.y = 0.2;
    atomGroup.rotation.x = 0.1;

    let animId;
    function animate() {
      animId = requestAnimationFrame(animate);
      atomGroup.rotation.y += 0.008;
      controls.update();
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
      controls.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100%", filter: "blur(2px)" }} />;
}

// ─── About Section ───────────────────────────────────────────────────────────

const stats = [
  { number: "90+", label: "active members" },
  { number: "3", label: "nationally competing design teams" },
  { number: "9", label: "policy consortium organizations" },
];

const partners = [
  { name: "Langan", logo: "/logos/langan.png" },
  { name: "Arup", logo: "/logos/arup.png" },
  { name: "Bloom Energy", logo: "/logos/bloomenergy.png" },
  { name: "CalWave", logo: "/logos/calwave.png" },
  { name: "Graymatter Robotics", logo: "/logos/graymatterrobotics.png" },
  { name: "KPFF", logo: "/logos/kpff.png" },
  { name: "NREL", logo: "/logos/nrel.png" },
  { name: "SGH", logo: "/logos/sgh.png" },
  { name: "Vatn Systems", logo: "/logos/vatn.png" },
];

function About() {
  return (
    <section id="about" style={styles.aboutSection}>
      <h2 style={styles.aboutHeading}>About</h2>
      <div style={styles.statsRow}>
        {stats.map(({ number, label }) => (
          <div key={label} className="stat-card" style={styles.statCard}>
            <span style={styles.statNumber}>{number}</span>
            <span style={styles.statLabel}>{label}</span>
          </div>
        ))}
      </div>
      <p style={styles.aboutText}>
        We are an entirely student-led group, leading initiatives in sustainable design, policy,
        and professional development. AEE-USC strives to educate and empower students to
        pursue careers in all aspects of energy efficiency and sustainability.
      </p>
      <p style={styles.aboutText}>
        Our organization operates within the Sonny Astani Department of Civil and
        Environmental Engineering at the University of Southern California. We are open to
        students of all years and majors! Anyone who is interested in the world of
        energy is encouraged to join our organization!
      </p>
      <h3 style={styles.connectionsHeading}>Our Connections</h3>
      <div className="logos-grid" style={styles.logosGrid}>
        {partners.map(({ name, logo }) => (
          <div key={name} style={styles.logoPlaceholder}>
            <img
              src={logo}
              alt={name}
              style={{ height: "40px", objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Design Teams Section ────────────────────────────────────────────────────

const teams = [
  {
    key: "wind",
    title: "Collegiate Wind Competition Team",
    image: "/images/wind.webp",
    description:
      "Our Collegiate Wind Competition Team designs and builds small-scale wind turbines to compete in the U.S. Department of Energy's national competition. Students gain hands-on experience in aerodynamic design, structural analysis, and energy systems engineering.",
  },
  {
    key: "marine",
    title: "Marine Energy Collegiate Competition Team",
    image: "/images/marine.jpg",
    description:
      "We are currently prototyping our Oscillating Water Column (OWC), which utilizes incoming waves to pressurize a column of air, spinning a turbine and generating electricity for battery storage. We are currently exploring the technologies behind underwater data centers, desalination facilities, and remote coastal communities.",
  },
  {
    key: "hydro",
    title: "Hydropower Collegiate Competition Team",
    image: "/images/hydro.jpg",
    description:
      "HCC is a design competition aimed at creating low impact hydropower energy source using existing infrastructure. We are looking to use a Pumped Storage Hydropower system that could serve regions of California typically excluded from renewable energy initiatives.",
  },
  {
    key: "solar",
    title: "Solar Table Initiative Team",
    image: "/images/solar.jpg",
    description:
      "The Solar Tables Initiative is working hard to bring 100% student designed outdoor tables with solar-powered charging capabilities to the USC community. We are designing our tables from the ground up with industry and manufacturer mentorship.",
  },
];

function DesignTeams() {
  const [active, setActive] = useState(null);

  return (
    <section id="design-teams" style={styles.dtSection}>
      <h2 style={styles.dtHeading}>Design Teams</h2>
      <div className="dt-grid"style={styles.dtGrid}>
        {teams.map((team) => {
          const isActive = active === team.key;
          const isInactive = active !== null && !isActive;
          return (
            <div
              key={team.key}
              className={isActive ? "dt-card active" : "dt-card" }
              onClick={() => setActive(isActive ? null : team.key)}
              style={{
                ...styles.dtCard,
                flex: isActive ? "3.5" : isInactive ? "0.5" : "1",
              }}
            >
              <img
                src={team.image}
                alt={team.title}
                style={{
                  ...styles.dtCardImg,
                  filter: isInactive ? "brightness(0.25)" : "brightness(0.45)",
                }}
              />
              <div
              className="dt-title"
                style={{
                  ...styles.dtVerticalTitle,
                  opacity: isActive ? 0 : 1,
                  transition: "opacity 0.25s ease",
                }}
              >
                {team.title}
              </div>
              <div
                style={{
                  ...styles.dtExpandedContent,
                  opacity: isActive ? 1 : 0,
                  pointerEvents: isActive ? "auto" : "none",
                  transition: "opacity 0.4s ease 0.2s",
                }}
              >
                <h3 style={styles.dtExpandedTitle}>{team.title}</h3>
                <p style={styles.dtExpandedDesc}>{team.description}</p>
                {/* <button
                  style={styles.dtLearnMore}
                  onClick={(e) => e.stopPropagation()}
                  onMouseEnter={(e) => { e.target.style.background = "rgba(255,255,255,0.15)"; }}
                  onMouseLeave={(e) => { e.target.style.background = "transparent"; }}
                >
                  Learn More →
                </button> */}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// ─── E-Board Section ─────────────────────────────────────────────────────────

const boardMembers = [
  { name: "Mitch Kirby", role: "President & Founder", photo: "/eboard/mitchkirby.jpg", linkedin: "https://www.linkedin.com/in/mitchell-kirby/" },
  { name: "Alexandra Somodi", role: "Vice President & Brand Director", photo: "/eboard/alexandrasomodi.png", linkedin: "https://www.linkedin.com/in/alexandra-somodi/" },
  { name: "David Moseley", role: "Design Team Coordinator", photo: "/eboard/davidmoseley.jpg", linkedin: "https://www.linkedin.com/in/davidmmoseley/" },
  { name: "Jordyn Wetherbee", role: "Executive Coordinator & CWC PM", photo: "/eboard/jordynwetherbee.jpg", linkedin: "https://www.linkedin.com/in/jordyn-wetherbee/" },
  { name: "James Hiemstra", role: "Director of Finance", photo: "/eboard/jameshiemstra.jpg", linkedin: "https://www.linkedin.com/in/james-hiemstra-78b9872a1/" },
  { name: "Reeth Kawad", role: "Senior Advisor", photo: "/eboard/reethkawad.jpg", linkedin: "https://www.linkedin.com/in/reethkawad/" },
  { name: "Chloe Flannigan", role: "Director of Membership", photo: "/eboard/chloeflannigan.jpg", linkedin: "https://www.linkedin.com/in/chloe-flannigan-0950a2237/" },
  { name: "Helena Heckmann", role: "Director of Events", photo: "/eboard/helenaheckmann.jpg", linkedin: "https://www.linkedin.com/in/helena-heckmann/" },
  { name: "Jainam Jain", role: "Director of Outreach & CWC PM", photo: "/eboard/jainamjain.png", linkedin: "https://www.linkedin.com/in/jainam-jain-937a13214/" },
  { name: "Ellis Fertig", role: "ShadeLA PM & Director of Policy", photo: "/eboard/ellisfertig.jpg", linkedin: "https://www.linkedin.com/in/ellis-fertig-4512b232b/" },
  { name: "Sam Gold", role: "ShadeLA PM & Asst. Director of Policy", photo: "/eboard/samgold.jpg", linkedin: "https://www.linkedin.com/in/sam-j-gold/" },
  { name: "Alex Bartolomei", role: "MECC PM", photo: "/eboard/alexbartolomei.jpg", linkedin: "https://www.linkedin.com/in/alexbartolomei/" },
  { name: "Alex Geschwill", role: "HCC PM", photo: "/eboard/alexgeschwill.jpg", linkedin: "https://www.linkedin.com/in/alexandra-geschwill/" },
  { name: "Daniela Lopez Escalante", role: "Asst. Director of Brand", photo: "/eboard/daniela.jpg", linkedin: "https://www.linkedin.com/in/daniela-lopez-escalante-839a4038a/" },
];

function EBoardCard({ member }) {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    ...styles.ebCard,
    transform: hovered ? "scale(1.03)" : "scale(1)",
    boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.35)" : "none",
    transition: "transform 0.25s ease, box-shadow 0.25s ease",
    cursor: member.linkedin ? "pointer" : "default",
  };

  const content = (
    <div
    className="eb-card"
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="eb-photo-wrap" style={{ position: "relative", width: "120px", height: "120px", flexShrink: 0, width: "120px", height: "120px" }}>
        {member.photo ? (
          <img src={member.photo} alt={member.name} style={styles.ebPhoto} className="eb-photo" />
        ) : (
          <div style={styles.ebPhotoPlaceholder} />
        )}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "rgba(29, 48, 71, 0.45)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.25s ease",
        }} />
      </div>
      <div style={styles.ebInfo}>
        {member.name && <span style={styles.ebName}>{member.name}</span>}
        {member.role && <span style={styles.ebRole}>{member.role}</span>}
      </div>
    </div>
  );

  if (member.linkedin) {
    return (
      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
        {content}
      </a>
    );
  }
  return content;
}

function EBoard() {
  return (
    <section id="e-board" style={styles.ebSection}>
      <h2 style={styles.ebHeading}>E-Board</h2>
      <div className="eb-grid" style={styles.ebGrid}>
        {boardMembers.map((member, i) => (
          <EBoardCard key={i} member={member} />
        ))}
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="footer" style={footerStyles.footer}>
      <div className="footer-left" style={footerStyles.left}>
        {[
          { label: "Instagram", href: "https://www.instagram.com/aeeusc" },
          { label: "LinkedIn", href: "https://www.linkedin.com/company/association-of-energy-engineers-usc/?viewAsMember=true" },
          { label: "Slack", href: "https://docs.google.com/forms/d/e/1FAIpQLSde2ldtrVXhxu5plBeN3wLRApQoZtVfj8l0FhG_rllde9MKyw/viewform" },
          { label: "Newsletter", href: "https://forms.gle/2sbFAdnC5oxf3q2t6" },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={footerStyles.link}>
            {label}
          </a>
        ))}
      </div>
      <div style={footerStyles.center}>
        <img src="/logo.svg" alt="AEE" style={footerStyles.logo} />
      </div>
      <div className="footer-right" style={footerStyles.right}>
        © 2026 AEE at USC
      </div>
    </footer>
  );
}

const footerStyles = {
  footer: {
    width: "100%",
    padding: "1rem 1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderTop: "1px solid rgba(100, 160, 255, 0.2)",
    boxSizing: "border-box",
  },
  left: {
    display: "flex",
    gap: "2rem",
    flex: 1,
  },
  link: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "clamp(1rem, 2vw, 3rem)",
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
  },
  center: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  logo: {
    height: "60px",
    objectFit: "contain",
    filter: "brightness(0) invert(1)",
  },
  right: {
    flex: 1,
    textAlign: "right",
    fontFamily: "'Barlow', sans-serif",
    fontSize: "clamp(1rem, 2vw, 3rem)",
    color: "rgba(255,255,255,0.4)",
  },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    function onScroll() {
      const progress = Math.min(window.scrollY / window.innerHeight, 1);
      setScrollProgress(progress);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroBlur = scrollProgress * 12;
  const heroOpacity = 1 - scrollProgress;

  return (
    <div style={styles.page}>

      <nav style={styles.nav}>
  <div className="desktop-nav-links" style={{ display: "flex", gap: "2.5rem" }}>
    {[
      { label: "About", href: "#about" },
      { label: "Design Teams", href: "#design-teams" },
      { label: "E-Board", href: "#e-board" },
    ].map(({ label, href }) => (
      <a key={label} href={href} style={styles.navLink}>{label}</a>
    ))}
  </div>
  <button
    className={`hamburger ${menuOpen ? "open" : ""}`}
    onClick={() => setMenuOpen(!menuOpen)}
  >
    <span /><span /><span />
  </button>
</nav>

{/* Mobile fullscreen menu */}
<div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
  {[
    { label: "About", href: "#about" },
    { label: "Design Teams", href: "#design-teams" },
    { label: "E-Board", href: "#e-board" },
  ].map(({ label, href }) => (
    <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
  ))}
</div>

      <div
        style={{
          ...styles.hero,
          filter: `blur(${heroBlur}px)`,
          opacity: heroOpacity,
        }}
      >
        <div className="aura-1" />
        <div className="aura-2" />

        <div style={styles.heroText}>
          <h1 style={styles.heading}>AEE at USC</h1>
          <p style={styles.sub}>
            USC's hub for all things
            <br />
            energy and sustainability.
          </p>

          <div className="hero-buttons" style={{ display: "flex", gap: "1rem", marginTop: "2rem", pointerEvents: "auto" }}>
            <a
              href="https://forms.gle/vSFAnuKfpKV3GFfJ6"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.6rem)",
                fontWeight: "400",
                color: "#1a2744",
                background: "#ffffff",
                padding: "0.85rem 2rem",
                borderRadius: "6px",
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              Get Involved!
            </a>
            <a
              href="mailto:aeeusc@gmail.com"
              style={{
                fontFamily: "'Barlow', sans-serif",
                fontSize: "clamp(1rem, 2vw, 1.6rem)",
                fontWeight: "400",
                color: "#ffffff",
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.6)",
                padding: "0.85rem 2rem",
                borderRadius: "6px",
                textDecoration: "none",
                letterSpacing: "0.01em",
              }}
            >
              Contact
            </a>
          </div>
        </div>

        <AtomCanvas />
      </div>

      <div style={{ height: "100vh" }} />

      <div style={styles.aboutWrapper}>
        <About />
        <DesignTeams />
        <EBoard />
        <Footer />
      </div>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = {
  page: {
    width: "100vw",
    background: "#1a2744",
    fontFamily: "'Barlow', sans-serif",
    color: "#ffffff",
  },
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    gap: "2.5rem",
    padding: "1.25rem 3rem",
    zIndex: 200,
    backdropFilter: "blur(8px)",
    boxSizing: "border-box",
  },
  navLink: {
    color: "#ffffff",
    textDecoration: "none",
    fontSize: "clamp(0.8rem, 2vw, 2.5rem)",
    fontFamily: "'Barlow', sans-serif",
    letterSpacing: "0.01em",
  },
  hero: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 1,
    transition: "filter 0.05s linear, opacity 0.05s linear",
  },
  heroText: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "6rem",
    pointerEvents: "none",
  },
  heading: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(2.5rem, 8vw, 8rem)",
    fontWeight: "400",
    margin: "0 0 0.5rem",
    letterSpacing: "-0.01em",
    textAlign: "center",
  },
  sub: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "clamp(1.5rem, 2.5vw, 4rem)",
    fontWeight: "400",
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    lineHeight: 1.6,
  },
  aboutWrapper: {
    position: "relative",
    zIndex: 50,
    borderRadius: "24px 24px 0 0",
    marginTop: "-24px",
  },
  aboutSection: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "6rem 2rem 6rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2.5rem",
  },
  aboutHeading: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
    fontWeight: "400",
    textAlign: "center",
  },
  statsRow: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
    width: "100%",
  },
  statCard: {
    flex: "1 1 220px",
    maxWidth: "300px",
    border: "1.5px solid rgba(100, 160, 255, 0.35)",
    borderRadius: "12px",
    padding: "2rem 1.5rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
  },
  statNumber: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "clamp(2rem, 4vw, 3.5rem)",
    fontWeight: "700",
    color: "#B9CDE6",
  },
  statLabel: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "clamp(1.2rem, 2vw, 4rem)",
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 1.4,
  },
  aboutText: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "clamp(1rem, 2vw, 2.3rem)",
    color: "rgba(255,255,255,0.8)",
    textAlign: "center",
    lineHeight: 1.8,
    maxWidth: "1000px",
  },
  connectionsHeading: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(1.5rem, 5vw, 4.5rem)",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "0.08em",
  },
  logosGrid: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1rem",
    justifyContent: "center",
    width: "100%",
  },
  logoPlaceholder: {
    borderRadius: "8px",
    padding: "0.75rem 1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100px",
  },

  // Design Teams
  dtSection: {
    width: "100%",
    padding: "4rem 0 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2.5rem",
  },
  dtHeading: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(1.8rem, 5vw, 4.5rem)",
    fontWeight: "400",
    textAlign: "center",
    color: "#ffffff",
  },
  dtGrid: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "72vh",
    overflow: "hidden",
  },
  dtCard: {
    position: "relative",
    overflow: "hidden",
    transition: "flex 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-start",
    cursor: "pointer",
  },
  dtCardImg: {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "filter 0.4s ease",
  },
  dtVerticalTitle: {
    position: "relative",
    zIndex: 2,
    writingMode: "vertical-rl",
    transform: "rotate(180deg)",
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(4rem, 1.6vw, 6rem)",
    fontWeight: "700",
    color: "#ffffff",
    padding: "2rem 1.8rem",
    lineHeight: 1.2,
    textShadow: "0 2px 12px rgba(0,0,0,0.7)",
  },
  dtExpandedContent: {
    position: "absolute",
    inset: 0,
    zIndex: 2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    padding: "clamp(2rem, 3vw, 3rem)",
    background: "linear-gradient(to top, rgba(29,48,71,0.88) 40%, transparent 100%)",
  },
  dtExpandedTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(1.5rem, 2vw, 5rem)",
    fontWeight: "400",
    color: "#ffffff",
    marginBottom: "1rem",
    lineHeight: 1.3,
  },
  dtExpandedDesc: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "clamp(1rem, 1.1vw, 2rem)",
    color: "rgba(255,255,255,0.85)",
    lineHeight: 1.7,
    marginBottom: "1.5rem",
    maxWidth: "600px",
  },
  dtLearnMore: {
    background: "transparent",
    border: "1.5px solid rgba(255,255,255,0.6)",
    color: "#ffffff",
    fontFamily: "'Barlow', sans-serif",
    fontSize: "1rem",
    padding: "0.6rem 1.4rem",
    borderRadius: "4px",
    cursor: "pointer",
    width: "fit-content",
    transition: "background 0.2s",
  },

  // E-Board
  ebSection: {
    width: "100%",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "6rem 2rem 8rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2.5rem",
  },
  ebHeading: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(3rem, 5vw, 4.5rem)",
    fontWeight: "400",
    textAlign: "center",
    color: "#ffffff",
  },
  ebGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.25rem",
    width: "100%",
  },
  ebCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "1.5px solid rgba(100, 160, 255, 0.3)",
    borderRadius: "10px",
    overflow: "hidden",
    height: "120px",
    background: "rgba(255,255,255,0.03)",
  },
  ebPhoto: {
    objectFit: "cover",
    objectPosition: "top",
    flexShrink: 0,
    width: "100%",
    height: "100%",
  },
  ebInfo: {
    padding: "0.5rem 1rem",
    display: "flex",
    flexDirection: "column",
    gap: "0.3rem",
  },
  ebName: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "clamp(1rem, 1.6vw, 1.8rem)",
    fontWeight: "700",
    color: "#ffffff",
  },
  ebRole: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "clamp(0.8rem, 1.3vw, 1.5rem)",
    color: "rgba(255,255,255,0.7)",
  },
  ebLinkedIn: {
    fontFamily: "'Barlow', sans-serif",
    fontSize: "1rem",
    color: "#7ab8f5",
    marginTop: "0.25rem",
  },
};
