// src/data/teams.js
//
// One definition of the design teams, read by three places that used to
// each keep their own copy: the homepage accordion (Home.jsx), the
// results list on About.jsx, and the per-team subpages at /teams/:slug.
//
// WHY THIS FILE EXISTS
//
// The copies had already drifted, and not subtly. Home.jsx described
// CHARGED as the solar tables initiative, which is correct; About.jsx
// described it as a "battery and storage design team," which is not.
// Both rendered on the live site. A visitor reading the homepage and
// then the About page was told two different things about the same
// team, and nothing in either file hinted that the other existed.
//
// So the data moved here and the pages import it. Adding a team, fixing
// a description, or recording a new award is now one edit in one place.
//
// FIELDS
//
//   key          stable id, used for React keys and the accordion state
//   slug         the URL at /teams/<slug>
//   short        how the team is referred to in a list or a badge
//   title        the full name, used as a page heading
//   meta         the small all-caps line under the title
//   img          hero image, or null — Team.jsx renders a typographic
//                hero instead when there is no artwork yet, rather than
//                showing a broken image
//   desc         the team's own description of itself, VERBATIM from
//                what the club wrote. Not paraphrased here.
//   competition  where and when they competed, if they competed
//   national     whether this is a national competition team, which is
//                what lets the About page count "three of five" honestly
//                rather than calling a campus build a national team
//   awards       what they came away with, strongest first
//   facts        optional stat tiles for the subpage
//   detail       optional extra paragraphs, for a team whose story does
//                not fit in one description (CHARGED)
//   tagline      optional one-line description, used where the short
//                name and the full title would otherwise repeat
//   org          optional credit for an outside organisation that ran
//                the competition, with their mark. Shown as a credit,
//                never as AEE's own branding
//   source       optional link to somebody else's write-up of the
//                result, which is worth more than the same claim made
//                here
//   onHomepage   whether the homepage accordion shows this one. Every
//                team gets a subpage and a line on the About page
//                regardless; this only controls the four-card grid on
//                the homepage, whose cards are built around a
//                full-bleed photograph and look broken without one.

export const TEAMS = [
  {
    key: 'marine',
    slug: 'marine-energy',
    short: 'MECC',
    title: 'Marine Energy Collegiate Competition Team',
    meta: 'U.S. DEPT. OF ENERGY · NATIONAL COMPETITION',
    img: '/images/marine.jpg',
    desc: 'We are currently prototyping our Oscillating Water Column (OWC), which utilizes incoming waves to pressurize a column of air, spinning a turbine and generating electricity for battery storage. We are currently exploring the technologies behind underwater data centers, desalination facilities, and remote coastal communities.',
    competition: 'Portland, Oregon · May 2026',
    onHomepage: true,
    national: true,
    awards: [
      { name: 'First place overall', note: 'National champions' },
      { name: 'Best Quick Pitch' },
    ],
  },
  {
    key: 'wind',
    slug: 'wind',
    short: 'CWC',
    title: 'Collegiate Wind Competition Team',
    meta: 'U.S. DEPT. OF ENERGY · NATIONAL COMPETITION',
    img: '/images/wind.webp',
    desc: "Our Collegiate Wind Competition Team designs and builds small-scale wind turbines to compete in the U.S. Department of Energy's national competition. Students gain hands-on experience in aerodynamic design, structural analysis, and energy systems engineering.",
    competition: 'Boulder, Colorado',
    onHomepage: true,
    national: true,
    awards: [
      { name: 'Second place, Project Development' },
      { name: 'Best Poster' },
      { name: 'Best Social Media' },
    ],
  },
  {
    key: 'hydro',
    slug: 'hydropower',
    short: 'HCC',
    title: 'Hydropower Collegiate Competition Team',
    meta: 'U.S. DEPT. OF ENERGY · NATIONAL COMPETITION',
    img: '/images/hydro.jpg',
    desc: 'HCC is a design competition aimed at creating low impact hydropower energy source using existing infrastructure. We are looking to use a Pumped Storage Hydropower system that could serve regions of California typically excluded from renewable energy initiatives.',
    competition: 'Green Bay, Wisconsin',
    onHomepage: true,
    national: true,
    awards: [
      { name: 'Best Quick Pitch' },
      { name: 'Best Poster' },
    ],
  },
  {
    key: 'solar',
    slug: 'charged',
    short: 'CHARGED',
    title: 'CHARGED',
    // Only CHARGED needs this. The other-teams cards show the short name
    // as a badge and the full name underneath, which for this one
    // produced a card reading "CHARGED / CHARGED".
    tagline: 'Solar tables for the USC campus',
    // "Solar tables" leads, because it is the two words that tell you
    // what this is. It used to be said in a paragraph that repeated the
    // description underneath it; a label says the same thing without
    // spending a sentence on it.
    meta: 'SOLAR TABLES · CAMPUS INITIATIVE · INDUSTRY-MENTORED',
    img: '/images/solar.jpg',
    desc: 'CHARGED is working hard to bring 100% student designed outdoor tables with solar-powered charging capabilities to the USC community. We are designing our tables from the ground up with industry and manufacturer mentorship.',
    competition: 'USC campus · Installing 2026-27',
    onHomepage: true,
    national: false,
    awards: [
      { name: 'Audience Choice Award', note: 'Das Family Startup Incubator, final pitch' },
    ],
    // The survey is the single most persuasive number the club has about
    // this project, and it was not anywhere on the site. It answers the
    // question a facilities committee actually asks.
    facts: [
      { value: '1,000+', label: 'USC students surveyed' },
      { value: '99.6%', label: 'said they would use a shaded outdoor workspace with outlets' },
      { value: '2026-27', label: 'Target installation, academic year' },
    ],
    // These continue the description above rather than restating it. The
    // first draft opened with "CHARGED is AEE's solar tables initiative,"
    // which is what the sentence directly above it already said, and two
    // paragraphs saying the same thing is how a page starts feeling like
    // filler.
    detail: [
      'The work runs from design and CAD through manufacturer coordination, campus siting and facilities approval, and funding. It is a full build rather than a concept: the tables are meant to be standing on campus and in use.',
      'The case for them came from the people they are for. AEE surveyed more than a thousand USC students, and almost all of them said they would use a shaded outdoor workspace with power.',
    ],
  },
  {
    key: 'shade',
    slug: 'shade-zones',
    short: 'ShadeLA',
    title: 'Shade Zones Design Competition',
    tagline: 'Modular shade for LA transit stops',
    meta: 'SHADELA WITH LA METRO \u00b7 INAUGURAL COMPETITION',
    // No photograph of the team's own work yet. The hero falls back to
    // the typographic treatment and credits the competition's mark
    // instead; see `org` below.
    img: '/images/shadela.jpg',
    desc: 'AEE entered the inaugural Shade Zones Design Competition, run by ShadeLA with LA Metro, which asked student teams to design modular shade for the places Angelenos wait for transit.',
    detail: [
      'ShadeLA is a Los Angeles heat campaign co-led by USC Dornsife Public Exchange and the UCLA Luskin Center for Innovation, working with LA Metro, the City and County of Los Angeles, the Southern California Association of Governments, and the LA28 organising committee. Shade Zones is the part of it aimed at transit stops, where people wait in the sun with nowhere else to stand.',
      "The problem is not abstract. ShadeLA puts the cooling effect of good shade at up to 70 degrees off the feels-like temperature, and its own pilot at LA Metro's Downtown Inglewood station measured surface temperatures 30 degrees lower.",
    ],
    competition: 'Los Angeles, California \u00b7 Results announced February 2026',
    // The competition's own mark, shown on the team page as a credit
    // rather than as AEE branding: bg is the flat field the wordmark
    // sits on, so the CSS plate extends it with no visible seam.
    org: {
      name: 'ShadeLA',
      logo: '/images/shadela-wordmark.png',
      bg: '#E5FC54',
      href: 'https://shade-la.com/',
      label: 'Competition run by',
    },
    onHomepage: false,
    national: false,
    awards: [
      {
        name: 'Second place, Award for Excellence',
        note: 'For "Bright Idea", the competition\'s main track',
      },
    ],
    // The field size lives here and not in the prose as well. It was in
    // both, and on a page this short the reader met the same three
    // numbers twice in four lines.
    facts: [
      { value: '100+', label: 'Teams registered' },
      { value: '50', label: 'Teams that submitted a design' },
      { value: '12', label: 'Colleges represented in the final field' },
    ],
    // Cited because it is somebody else's announcement of our result,
    // which is worth more to a reader than the same claim made here.
    source: {
      label: 'USC and LA Metro announce the winners',
      href: 'https://today.usc.edu/usc-and-l-a-metro-announce-winners-of-the-inaugural-shade-zone-design-competition/',
    },
  },
];

export function teamBySlug(slug) {
  return TEAMS.find((t) => t.slug === slug) || null;
}

// Every award across the teams that compete nationally. This is the
// number on the About page's stat tile, computed rather than typed, so
// it cannot go stale the way "6 National Awards Won" did the moment the
// results below it changed.
//
// Counts the national championship as one of the awards it counts, which
// is how the club states it: seven national awards, one of which is a
// first place overall.
export const NATIONAL_AWARD_COUNT = TEAMS
  .filter((t) => t.national)
  .reduce((total, t) => total + t.awards.length, 0);

export const NATIONAL_TEAM_COUNT = TEAMS.filter((t) => t.national).length;
