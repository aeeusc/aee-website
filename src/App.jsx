import { useLayoutEffect } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigationType,
} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Team from './pages/Team'
import Login from './pages/Login'
import CreateUser from './pages/CreateUser'
import Dashboard from './pages/Dashboard'
import NewsletterAdmin from './pages/NewsletterAdmin'
import Legal from './pages/Legal'
import Portal from './pages/Portal'
import Profile from './pages/Profile'
import Members from './pages/Members'
import OrgChart from './pages/OrgChart'
import CalendarPage from './pages/Calendar'
import TasksPage from './pages/Tasks'
import NewsletterPage from './pages/Newsletter'
import NewsletterDetailPage from './pages/NewsletterDetail'
import AdminUsers from './pages/AdminUsers'
import NewsletterBuilder from './pages/NewsletterBuilder'
import Unsubscribe from './pages/Unsubscribe'
import Interest from './pages/Interest'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import { ConfirmProvider } from './components/ConfirmDialog'
import './App.css'

// Derived from Vite's own base setting (vite.config.js) rather than
// hardcoded, so this can never silently drift out of sync with it again —
// that mismatch is exactly what broke image loading earlier. BASE_URL is
// always '/' or ends with a trailing slash (e.g. '/aee-website/');
// react-router's basename wants no trailing slash, and '' isn't valid, so
// this normalizes both cases.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

// Start a new page at the top of it.
//
// Added 2026-08-29, while building the team subpages, but this was never
// specific to them: React Router does not touch the scroll position on
// navigation, and nothing here did either. Clicking "About" from the
// footer of a long homepage landed you in the footer of the About page,
// looking at whatever happened to be at that scroll offset.
//
// Three details, each of which the obvious version gets wrong:
//
//   behavior: 'instant' — src/index.css sets `scroll-behavior: smooth`
//   on the whole document for the in-page anchor links, and a plain
//   window.scrollTo(0, 0) inherits it. So the reset ANIMATED: measured
//   at roughly two seconds gliding up through the new page's content
//   before settling, which reads as the page moving on its own rather
//   than as a page that opened at the top. 'instant' overrides the CSS
//   for this one call and leaves the anchors alone.
//
//   Skipped on POP — the back button should return you to where you
//   were, which is the one time the browser's own restoration is right.
//
//   Skipped when there is a hash, because a link to /#teams is asking
//   for a specific place on the page and scrolling to the top would
//   cancel exactly what was clicked.
//
//   useLayoutEffect, not useEffect: it runs before the browser paints,
//   so the new page is never shown at the old offset first.
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useLayoutEffect(() => {
    if (navigationType === 'POP') return
    if (hash) return
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, hash, navigationType])

  return null
}

function App() {
  return (
    <BrowserRouter basename={basename}>
      {/* ConfirmProvider added 2026-08-16 — wraps the whole app so
          useConfirm() (see components/ConfirmDialog.jsx) works from any
          page without each one setting up its own modal. Replaces
          window.confirm(), which showed the browser's own generic
          "aeeusc.com says..." popup instead of something styled to match
          the site. */}
      <ConfirmProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* One page per design team, added 2026-08-29. The slug is
            matched against src/data/teams.js, which is also what the
            homepage accordion and the About page's results list read —
            so a team exists in one place and shows up in three.
            An unknown slug renders Team.jsx's own "no team by that name"
            branch with links to the real ones, rather than falling
            through to the site-wide 404, because a stale team link is
            almost always someone looking for a team that still exists
            under a different name. */}
        <Route path="/teams/:slug" element={<Team />} />
        {/* The two public forms, added 2026-08-24 — these replaced a
            Google Form and a mailto: link, and unlike everything below
            they work without a session. */}
        <Route path="/interest" element={<Interest />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newsletter-admin" element={<NewsletterAdmin />} />
        {/* Newsletter template builder (admin) — added 2026-08-23.
            The block editor + template library; /newsletter-admin
            above stays as the quick plain-text blast. */}
        <Route path="/newsletter-builder" element={<NewsletterBuilder />} />
        <Route path="/privacy" element={<Legal kind="privacy" />} />
        <Route path="/terms" element={<Legal kind="terms" />} />
        <Route path="/portal" element={<Portal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/members" element={<Members />} />
        <Route path="/org-chart" element={<OrgChart />} />
        <Route path="/calendar" element={<CalendarPage />} />
        {/* Tasks became its own standalone page 2026-08-12 (see
            src/pages/Tasks.jsx) — reached via Portal.jsx's Tasks tile
            (to: '/tasks'). Was missing from this route table even though
            the page itself was built, which is why it 404'd. */}
        <Route path="/tasks" element={<TasksPage />} />
        {/* Newsletter subpage (list + detail) — reached via Portal.jsx's
            Newsletter tile (to: '/newsletter'). Detail route takes an
            :id param for NewsletterDetailPage to look up a single past
            send. Same "was built, missing from this table" gap as
            /tasks above. */}
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/newsletter/:id" element={<NewsletterDetailPage />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        {/* Where the unsubscribe link in every newsletter email lands
            (added 2026-08-16). Public — no login, since most newsletter
            subscribers don't have portal accounts. Reads ?token=... and
            calls the API itself; see Unsubscribe.jsx. */}
        <Route path="/unsubscribe" element={<Unsubscribe />} />
        {/* Catch-all — anything that doesn't match a route above (like
            the now-removed /signup) gets a real 404 page instead of
            silently rendering blank. Must stay LAST; React Router
            matches routes in order. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </ConfirmProvider>
    </BrowserRouter>
  )
}

export default App
