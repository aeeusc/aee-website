import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
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
import NotFound from './pages/NotFound'
import './App.css'

// Derived from Vite's own base setting (vite.config.js) rather than
// hardcoded, so this can never silently drift out of sync with it again —
// that mismatch is exactly what broke image loading earlier. BASE_URL is
// always '/' or ends with a trailing slash (e.g. '/aee-website/');
// react-router's basename wants no trailing slash, and '' isn't valid, so
// this normalizes both cases.
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

function App() {
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/newsletter-admin" element={<NewsletterAdmin />} />
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
        {/* Catch-all — anything that doesn't match a route above (like
            the now-removed /signup) gets a real 404 page instead of
            silently rendering blank. Must stay LAST; React Router
            matches routes in order. */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
