// REPLACES src/App.jsx in the aee-website repo.
//
// The original was just:
//   import Home from './pages/Home'
//   import './App.css'
//   function App() { return <Home /> }
//   export default App
//
// This adds react-router-dom so /login and /signup are real pages,
// while / still renders your existing Home exactly as before.
// basename="/aee-website" matches vite.config.js's base: '/aee-website/'
// (confirmed by reading your repo directly) — without this, routes
// would be off by one folder once deployed to GitHub Pages.

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import './App.css'

function App() {
  return (
    <BrowserRouter basename="/aee-website">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
