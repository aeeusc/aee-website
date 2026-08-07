import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Login from './pages/Login'
import CreateUser from './pages/CreateUser'
import Dashboard from './pages/Dashboard'
import NewsletterAdmin from './pages/NewsletterAdmin'
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