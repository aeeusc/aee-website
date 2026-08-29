// src/pages/Team.jsx
//
// One page per design team, at /teams/<slug>.
//
// WHY THESE EXIST
//
// The homepage accordion gives each team a card that opens to three or
// four sentences, which is the right amount for someone scanning the
// homepage and the wrong amount for someone who has decided they are
// interested. There was nowhere for that person to go: the description
// was the end of the road, and everything the teams have actually WON
// lived in a different place entirely, as one line in a list on the
// About page.
//
// These pages put the two together. Each one is the team's own
// description, verbatim, followed by what that team came away with and
// where. Nothing here is written about a team that the team did not say
// about itself — the prose comes from src/data/teams.js, which is the
// single source both this page and the homepage read.
//
// One component, five routes. The teams differ in what they have rather
// than in shape: CHARGED has survey figures and a two-paragraph story,
// ShadeLA has no photograph yet. Each of those is a conditional block
// here rather than a separate file, so a team gaining a photo or losing
// a competition is a data edit and not a new component.
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Nav, Footer } from './Home';
import { TEAMS, teamBySlug } from '../data/teams';
import './Home.css';
import './Team.css';

// Same helper as Home.jsx and About.jsx — see the comment in Home.jsx for
// why an image path cannot just be a plain string here.
const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

export default function Team() {
  const { slug } = useParams();
  const team = teamBySlug(slug);

  // A real browser tab title per team. Crawlers reading this site's
  // static index.html never see it (see the SEO comment there), but a
  // member with six tabs open does, and "CHARGED" beats six identical
  // "AEE at USC" tabs.
  useEffect(() => {
    if (!team) return undefined;
    const previous = document.title;
    document.title = `${team.title} | AEE at USC`;
    return () => { document.title = previous; };
  }, [team]);

  // Scroll reset lives in App.jsx's ScrollToTop, which covers every route
  // rather than just these — see the long comment there for why the
  // obvious window.scrollTo(0, 0) animates on this site.

  if (!team) {
    return (
      <div className="home-page">
        <Nav />
        <section className="team-missing">
          <div className="about-inner">
            <div className="label">DESIGN TEAMS</div>
            <h1 className="about-h2">We do not have a team by that name.</h1>
            <p className="about-lead">
              The link may be out of date. Here is everything we run.
            </p>
            <ul className="team-missing-list">
              {TEAMS.map((t) => (
                <li key={t.key}><Link to={`/teams/${t.slug}`}>{t.title}</Link></li>
              ))}
            </ul>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const others = TEAMS.filter((t) => t.key !== team.key);

  return (
    <div className="home-page">
      <Nav />

      {/* Hero. With artwork it is the photograph, dimmed enough that
          white type stays readable over any part of it. Without artwork
          it is the same block with no image, which is why ShadeLA can
          exist here before anyone has sent a photo — a missing file
          should not mean a broken page. */}
      <header className={`team-hero${team.img ? '' : ' no-art'}`}>
        {team.img && (
          <>
            <img className="team-hero-art" src={asset(team.img)} alt="" aria-hidden="true" />
            <div className="team-hero-scrim" />
          </>
        )}
        <div className="team-hero-inner">
          <Link className="team-back" to="/about">Back to About</Link>
          <div className="team-meta">{team.meta}</div>
          <h1 className="team-title">{team.title}</h1>
          {team.competition && (
            <div className="team-where">{team.competition}</div>
          )}

          {/* The mark of whoever ran the competition, when it was not us.
              Deliberately labelled and linked rather than dropped in as
              decoration: it is somebody else's trademark, and the honest
              way to show it is as a credit that says whose it is and
              points at them. It is NOT used as the hero background, both
              because a wordmark cover-cropped behind white type would be
              illegible and because that placement would read as AEE's
              own branding. */}
          {team.org && (
            <a
              className="team-org"
              href={team.org.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="team-org-label">{team.org.label}</span>
              <span className="team-org-plate" style={{ background: team.org.bg }}>
                <img src={asset(team.org.logo)} alt={team.org.name} />
              </span>
            </a>
          )}
        </div>
      </header>

      {/* The team in its own words. */}
      <section className="team-section">
        <div className="about-inner">
          <div className="label">THE TEAM</div>
          <p className="team-desc">{team.desc}</p>
          {team.detail && team.detail.map((paragraph) => (
            <p className="team-detail" key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </section>

      {/* Stat tiles, for a team that has numbers worth leading with.
          Only CHARGED does today. These are plain figures rather than a
          chart on purpose: three standalone facts have no trend and no
          part-to-whole relationship, and drawing them as bars would
          invent a comparison that is not in the data. */}
      {team.facts && (
        <section className="team-section team-facts-section">
          <div className="about-inner">
            <div className="label">BY THE NUMBERS</div>
            <div className="team-facts">
              {team.facts.map((f) => (
                <div className="team-fact" key={f.label}>
                  <div className="team-fact-value">{f.value}</div>
                  <div className="team-fact-label">{f.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* What they won. Specific placings rather than a sentence about a
          strong showing: someone deciding whether to join is trying to
          find out whether this team actually competes, and "first place
          overall" answers that in a way no adjective can. */}
      {team.awards && team.awards.length > 0 && (
        <section className="team-section team-awards-section">
          <div className="about-inner">
            <div className="label">
              {team.national ? 'NATIONAL RESULTS' : 'RECOGNITION'}
            </div>
            <h2 className="about-h2">
              {team.awards.length === 1
                ? 'What this team came away with.'
                : `${team.awards.length} awards, most recent season.`}
            </h2>
            <ul className="team-awards">
              {team.awards.map((a) => (
                <li className="team-award" key={a.name}>
                  <span className="team-award-name">{a.name}</span>
                  {a.note && <span className="team-award-note">{a.note}</span>}
                </li>
              ))}
            </ul>
            {/* Somebody else's write-up of the same result. A club page
                saying it won something is a claim; the organiser's own
                announcement saying so is evidence, and linking it costs
                one line. */}
            {team.source && (
              <a
                className="team-source"
                href={team.source.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {team.source.label}
              </a>
            )}
          </div>
        </section>
      )}

      {/* Somewhere to go next, in both directions: join this one, or
          look at the others. A subpage with no way back into the site is
          a dead end, and these pages are exactly the kind of link that
          gets shared on its own. */}
      <section className="team-section team-next">
        <div className="about-inner">
          <div className="team-cta">
            <div>
              <h2 className="about-h2">Interested in this team?</h2>
              <p className="about-lead">
                Every team takes new members, and no prior experience is assumed.
                Tell us which one and we will put you in touch with the leads.
              </p>
            </div>
            <Link className="ghost" to="/interest">Join this team</Link>
          </div>

          <div className="label team-others-label">THE OTHER TEAMS</div>
          <div className="team-others">
            {others.map((t) => (
              <Link className="team-other" to={`/teams/${t.slug}`} key={t.key}>
                <span className="team-other-short">{t.short}</span>
                <span className="team-other-title">{t.tagline || t.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
