import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Brand faces, self-hosted. Only the weights the guide actually calls
// for: League Spartan Bold/ExtraBold/Black for titles, Libre Franklin
// Regular/SemiBold/ExtraBold for body, labels and emphasis.
import '@fontsource/league-spartan/700.css'
import '@fontsource/league-spartan/800.css'
import '@fontsource/league-spartan/900.css'
import '@fontsource/libre-franklin/400.css'
import '@fontsource/libre-franklin/600.css'
import '@fontsource/libre-franklin/800.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
