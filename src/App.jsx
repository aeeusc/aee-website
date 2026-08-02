import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
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
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App