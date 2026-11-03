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
// WHERE THE WORDS COME FROM (updated 2026-11-02)
//
// Every team except CHARGED answered the "Design Team Descriptions for
// Website" Google Form in late October 2026. `desc`, `detail` and
// `working` below are those answers, in the teams' own first-person
// words. The only edits are three typo fixes ("teram" -> "team", "focus
// son" -> "focuses on", "the make" -> "to make") and one dropped stray
// "the"; wording, spelling conventions (one team writes "recognising")
// and claims are left exactly as the team made them. The
// next-competition dates and the press links are also from the form,
// plus the organisers' own announcements where they name USC.
//
// FIELDS
//
//   key          stable id, used for React keys and the accordion state
//   slug         the URL at /teams/<slug>. Do not change one once it has
//                shipped: it is in the sitemap and in links people have
//                shared. The wind team is still /teams/wind after the
//                CWC+ rename for exactly that reason.
//   short        how the team is referred to in a list or a badge
//   title        the full name, used as a page heading
//   meta         the small all-caps line under the title
//   img          hero image, or null — Team.jsx renders a typographic
//                hero instead when there is no artwork yet, rather than
//                showing a broken image
//   cardImg      optional stand-in picture for the homepage card only,
//                for a team that has no photograph yet (added 2026-11-02
//                so STEP and T-ReX could join the accordion). The card
//                is built around a full-bleed picture; the team page is
//                not, so `img` stays null and the page keeps its
//                typographic hero. When the real photo arrives, set
//                `img` to it and delete `cardImg` and the placeholder
//                file. Home.jsx reads `cardImg || img`.
//   desc         what the team does and is for, VERBATIM from what the
//                team wrote. Not paraphrased here.
//   blurb        optional SHORT version for the homepage accordion,
//                which has room for roughly fifty words before the open
//                card overflows on a phone. Always one or two complete
//                sentences lifted from the team's own text, never a
//                rewrite. Teams without one show `desc` there.
//   working      what the team is building this season, in their words.
//                This is the part that goes stale fastest; re-ask every
//                autumn.
//   competition  where and when they last competed, if they competed
//   next         the next competition: { name, where, when, note }.
//                Rendered on the subpage. `where` or `note` may be
//                missing when the organisers have not said yet.
//   national     whether this is a national competition team, which is
//                what lets the About page count "five of seven" honestly
//                rather than calling a campus build a national team
//   awards       what they came away with, strongest first
//   press        outside write-ups: [{ outlet, label, href }]. A club
//                page saying it won something is a claim; the
//                organiser's own announcement saying so is evidence.
//   facts        optional stat tiles for the subpage
//   detail       optional extra paragraphs, for a team whose story does
//                not fit in one description
//   tagline      optional one-line description, used where the short
//                name and the full title would otherwise repeat
//   org          optional credit for an outside organisation that ran
//                the competition, with their mark. Shown as a credit,
//                never as AEE's own branding
//   onHomepage   whether the homepage accordion shows this one. Every
//                team gets a subpage and a line on the About page
//                regardless; this only controls the card grid on the
//                homepage, whose cards are built around a full-bleed
//                picture (`img` or `cardImg`) and look broken without
//                one.

export const TEAMS = [
  {
    key: 'marine',
    slug: 'marine-energy',
    short: 'MECC',
    title: 'Marine Energy Collegiate Competition Team',
    meta: 'U.S. DEPT. OF ENERGY · NATIONAL COMPETITION',
    img: '/images/marine.jpg',
    blurb: 'We’re designing a modular Oscillating Water Column (OWC) that retrofits onto breakwater structures to provide clean, reliable electricity to ports for cold-ironing ships and reducing diesel emissions.',
    desc: 'Upon recognising that many marine energy solutions are based offshore, often require costly repairs, and take many years to be built, we’re prioritising accessibility, simplicity, and scalability in our solution. In the near future, we want to establish a strong product-market fit, design detailed CAD models and COMSOL simulations, and build and test different prototypes of our product. We’re operating as a start up, and our end goal is to take our idea to market. One day, we see our modular retrofittable OWCs powering ports and other near-shore and remote applications.',
    working: 'We’re designing a modular Oscillating Water Column (OWC) that retrofits onto breakwater structures to provide clean, reliable electricity to ports for cold-ironing ships and reducing diesel emissions. Currently, we’re targeting the Port of LA and Port of Long Beach, but we’re exploring different markets and applications for our modular, retrofittable OWC solution.',
    competition: 'Portland, Oregon · May 2026',
    next: {
      name: 'MECC 2027',
      where: 'Portland, Oregon',
      when: 'May 2027',
    },
    onHomepage: true,
    national: true,
    awards: [
      { name: 'First place overall', note: 'National champions' },
      { name: 'Best Quick Pitch' },
    ],
    press: [
      {
        outlet: 'U.S. Department of Energy',
        label: 'DOE announces the winners of the 2026 Marine Energy Collegiate Competition',
        href: 'https://www.energy.gov/cmei/water/articles/does-hydropower-and-hydrokinetic-office-announces-winners-2026-marine-energy',
      },
      {
        outlet: 'National Laboratory of the Rockies',
        label: 'Water power winners emerge as collegiate competitions surge',
        href: 'https://www.nlr.gov/news/detail/program/2026/water-power-winners-emerge-as-collegiate-competitions-surge',
      },
    ],
  },
  {
    key: 'wind',
    slug: 'wind',
    short: 'CWC+',
    // Renamed from "Collegiate Wind Competition Team" 2026-11-02, using
    // the name the team itself gave on the form. The slug and the
    // portal's stored team code both stay "CWC"/"wind"; see `slug` above.
    title: 'Clean Energy Workforce Competition Team',
    meta: 'U.S. DEPT. OF ENERGY · NATIONAL COMPETITION',
    img: '/images/wind.webp',
    blurb: 'Our goal is to design, build, and test a small-scale wind turbine prototype that demonstrates our skills in mechanical design, power electronics, and system controls. We will also apply project development principles to design a power system for a grid-edge data center.',
    desc: 'Through our participation in the Clean Energy Workforce Competition (CWC+), we aim to gain practical experience in clean energy technology, project development, finance, and community outreach while preparing for careers in the clean energy workforce. Our goal is to design, build, and test a small-scale wind turbine prototype that demonstrates our skills in mechanical design, power electronics, and system controls. We will also apply project development principles to design a power system for a grid-edge data center. By presenting our year-long work at a May 2027 competition event, we aim to demonstrate our technical knowledge, strengthen our teamwork, and develop practical solutions to clean energy challenges.',
    working: 'We are currently working on recruiting members from every major that has an interest in wind energy. We are in the preliminary planning stages of the competition.',
    competition: 'Boulder, Colorado · 2026',
    next: {
      name: 'CWC+ 2027',
      where: 'Cal Poly, San Luis Obispo, California',
      when: 'May 11-13, 2027',
    },
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
    blurb: 'As data centers become more commonplace and infrastructure struggles to keep up with the new demand, we found that working on a solution to aid the grid and its supply to these large data centers is our best course of action.',
    desc: 'We are aiming to create infrastructure that can be applied to a variety of small to medium sized data centers to ease power and water requirements from these data centers, allowing us to generate power that would otherwise be wasted. We will be using municipal water and/or existing reservoirs to supply water which we will generate power from as well as hold water from in an attempt to maintain an ecosystem friendly temperature while still using water for cooling.',
    detail: [
      'We go to a lot of hydropower conferences when invited and are really excited to go to more.',
    ],
    working: 'As data centers become more commonplace and infrastructure struggles to keep up with the new demand, we found that working on a solution to aid the grid and its supply to these large data centers is our best course of action. We are looking either at pumped storage as a means to lessen strain on transmission lines and local power during peak hours or into technology to capture, generate from, and cool waste water from these data centers.',
    competition: 'Green Bay, Wisconsin · April 2026',
    next: {
      name: 'HCC 2027',
      when: 'Late April 2027, expected',
      note: 'The organisers have not yet announced the exact dates or the location.',
    },
    onHomepage: true,
    national: true,
    awards: [
      { name: 'Best Quick Pitch' },
      { name: 'Best Poster' },
    ],
    press: [
      {
        outlet: 'U.S. Department of Energy',
        label: 'DOE announces the winners of the 2026 Hydropower Collegiate Competition',
        href: 'https://www.energy.gov/cmei/water/articles/does-hydropower-and-hydrokinetic-office-announces-winners-2026-hydropower',
      },
      {
        outlet: 'National Laboratory of the Rockies',
        label: 'Water power winners emerge as collegiate competitions surge',
        href: 'https://www.nlr.gov/news/detail/program/2026/water-power-winners-emerge-as-collegiate-competitions-surge',
      },
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
      'The work runs from design and CAD through manufacturer coordination, campus siting and facilities approval, and funding. It is a full build rather than a concept: the tables will be standing on campus and in use this school year.',
      'The case for them came from the people they are for. AEE surveyed more than a thousand USC students, and almost all of them said they would use a shaded outdoor workspace with power.',
    ],
  },
  {
    key: 'step',
    slug: 'step',
    short: 'STEP',
    title: 'STEP Energy Storage Team',
    tagline: 'Thermal energy storage for the grid',
    // The Storage Design Strategies to Ease Production (STEP) Prize is run
    // by DOE's Office of Electricity: two phases, judged online.
    meta: 'U.S. DEPT. OF ENERGY · STORAGE DESIGN STEP PRIZE',
    // No photograph yet; the hero falls back to the typographic treatment.
    img: null,
    // Placeholder art in the brand palette (a storage unit charging up) so
    // the homepage card can exist before the team has a photo. Kev's call,
    // 2026-11-02. Replace: set `img`, delete this line and the file.
    cardImg: '/images/step-placeholder.jpg',
    // Two sentences lifted from `working`, verbatim, because `desc` at
    // 68 words overflows an open card on a phone.
    blurb: 'Our team is currently developing a grid-integrable thermal battery storage unit called Calcarion. Calcarion utilizes calcium looping to store energy during periods of excess electricity production while relieving the grid during periods of high use.',
    desc: 'The Energy Storage Team focuses on developing and scaling novel energy technology solutions for an ever-expanding demand. Though our team originally formed behind Calcarion and the STEP competition, we aim to expand our operations into new innovations and contexts in which they can be applied. Even now, our team is thinking of other, non-grid-related, applications for our calcium looping product, including private industrial ventures.',
    detail: [
      'The overarching goal of the team in the context of AEE is to create an environment where engineers interested in energy and storage solutions can gain practical experience in cross-functional design. Calcarion specifically was chosen as our first project because it allowed for both process and product design work. Many teams design products, but few design processes, which is why our team focuses on filling this important skillset niche.',
    ],
    working: 'Our team is currently developing a grid-integrable thermal battery storage unit called Calcarion. Calcarion utilizes calcium looping to store energy during periods of excess electricity production while relieving the grid during periods of high use. Calcarion aims to integrate into existing industrial facilities (such as cement kilns) to recycle their carbon dioxide and heat waste streams.',
    competition: 'Online · Phase 1 submitted October 2026',
    next: {
      name: 'Storage Design STEP Prize, Phase 1 results',
      where: 'Online',
      when: 'December 2026',
      note: 'Phase 1 was submitted on October 7, 2026. Phase 1 winners advance to a second, final round, also judged online.',
    },
    onHomepage: true,
    national: true,
    awards: [],
  },
  {
    key: 'trex',
    slug: 't-rex',
    short: 'T-ReX',
    title: 'Technology Recycling and Repurposing Competition Team',
    tagline: 'Recycling retired wind turbine blades',
    // T-ReX is a DOE-funded collegiate competition hosted by the National
    // Laboratory of the Rockies, in two phases across the school year.
    meta: 'U.S. DEPT. OF ENERGY · COLLEGIATE COMPETITION · FIRST SEASON',
    img: null,
    // Placeholder art (a three-blade rotor) for the homepage card; see the
    // note on STEP above. Replace: set `img`, delete this line and the file.
    cardImg: '/images/trex-placeholder.jpg',
    // Two sentences lifted from `working`, verbatim; `desc` is 103 words.
    blurb: 'We are working on finding ways to recycle old wind turbine blades. Our plan is to investigate shredding the blades into fiberglass shards while reducing the amount of dust and other byproducts released from the shredding process.',
    desc: 'Instead of looking at new energy sources and devices, our goal is to figure out what to do when old energy technology needs to be retired. Currently, most wind turbine blades go straight to landfills, but a lot of the material is still in good condition to be reused, so we are looking at how to make the recycling process cheap enough that the industry will favor recycling over landfills. We will be achieving this goal primarily by looking into research papers already written to make sure our concept is feasible and by reaching out to energy companies for consultation to make sure our solution is actually meeting industry needs.',
    working: 'We are working on finding ways to recycle old wind turbine blades. Our plan is to investigate shredding the blades into fiberglass shards while reducing the amount of dust and other byproducts released from the shredding process. Then, the fiberglass shards can be used to improve the mechanical properties of concrete. Our priority is to make the process efficient and cheap.',
    competition: 'Competing for the first time in 2026-27',
    next: {
      name: 'T-ReX Phase 1 submission',
      where: 'Virtual',
      when: 'December 3, 2026',
    },
    onHomepage: true,
    national: true,
    awards: [],
  },
  {
    key: 'shade',
    slug: 'shade-zones',
    short: 'ShadeLA',
    title: 'Shade Zones Design Competition',
    tagline: 'Solar-powered shade on the LA River',
    meta: 'SHADELA \u00b7 LOS ANGELES \u00b7 DESIGN COMPETITION',
    img: '/images/shadela.jpg',
    // The team's own words, from the form (replacing a description that
    // had been written from ShadeLA's site because none existed).
    desc: 'We are developing two shade structures along the LA River to provide quality shade to users of the trails along the riverfront. This project will provide equitable access to recreational and green space to the communities along the river.',
    detail: [
      'We are implementing solar collection to provide amenities to and improve the safety of these shade structures. We are powering water fountains, irrigation pumps, lighting, phone chargers, and emergency call boxes with this system. To increase efficiency we are also optimizing passive energy saving strategies like siting and material choices.',
      // One paragraph of context on the competition itself, kept because
      // nothing in the team's text says what ShadeLA is.
      'ShadeLA is a Los Angeles heat campaign co-led by USC Dornsife Public Exchange and the UCLA Luskin Center for Innovation, working with LA Metro, the City and County of Los Angeles, the Southern California Association of Governments, and the LA28 organising committee. Its Shade Zones Design Competition asks student teams to design shade for the places Angelenos wait, walk and gather outdoors.',
    ],
    competition: 'Los Angeles, California \u00b7 Results announced February 2026',
    next: {
      name: 'Shade Zones Design Competition',
      where: 'Los Angeles, California',
      when: 'January 2027',
    },
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
    // Wording is the team's own (2026-11-02). The organiser's announcement
    // linked under Press calls the same result the Award for Excellence.
    awards: [
      {
        name: '2025 Design Excellence Award, 2nd Place Overall',
        note: 'Entered as "Bright Idea"',
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
    press: [
      {
        outlet: 'USC Today',
        label: 'USC and LA Metro announce winners of the inaugural Shade Zone Design Competition',
        href: 'https://today.usc.edu/usc-and-l-a-metro-announce-winners-of-the-inaugural-shade-zone-design-competition/',
      },
      {
        outlet: 'Bustler',
        label: 'ShadeLA design contest winners envision a cooler Los Angeles',
        href: 'https://bustler.net/news/10841/shadela-design-contest-winners-envision-a-cooler-los-angeles-literally',
      },
    ],
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

// National teams that have placed, and national teams in their first
// season with nothing to report yet. About.jsx uses both so its lead
// paragraph can say "three of them brought home..." without a hand-typed
// three sitting above a list that no longer adds up to it.
export const AWARDED_NATIONAL_TEAM_COUNT = TEAMS
  .filter((t) => t.national && t.awards.length > 0).length;
export const NEW_NATIONAL_TEAM_COUNT = NATIONAL_TEAM_COUNT - AWARDED_NATIONAL_TEAM_COUNT;
export const LOCAL_TEAM_COUNT = TEAMS.length - NATIONAL_TEAM_COUNT;
