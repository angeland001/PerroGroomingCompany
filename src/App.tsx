import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Services from './pages/Services'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import PupWidget from './components/PupWidget'

export default function App() {
  const location = useLocation()

  // Client-side route changes don't reset scroll position the way a real
  // page load would — land on top for a normal nav click, but let a link
  // to a specific in-page feature (e.g. "/services#pricing") scroll there
  // instead. Same behavior on desktop and mobile since it's viewport-agnostic.
  useEffect(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1))
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Keyed by path so it fully remounts (fresh spawn beside the new
          page's header) instead of carrying position/state across routes. */}
      <PupWidget key={location.pathname} />
    </>
  )
}
