import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Button from '../components/Button'
import { SQUARE_GO_URL } from '../lib/constants'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="page">
      <div className="grain-overlay" />
      <Header slim />

      <div className="not-found__body">
        <div className="not-found__wash" />
        <div className="not-found__content">
          <span className="not-found__medallion">
            <img src="/assets/logo-medallion.png" alt="Perro medallion" />
          </span>
          <p className="not-found__eyebrow">404 — Page not found</p>
          <h1>
            Uh oh — this page <i>slipped its leash</i>
          </h1>
          <p>We sniffed everywhere, but the page you're looking for isn't here. Let's get you back to somewhere cozy.</p>
          <div className="not-found__actions">
            <Button to="/" variant="primary" size="lg">
              Back Home
            </Button>
            <Button href={SQUARE_GO_URL} external variant="secondary" size="lg">
              Book a Groom
            </Button>
          </div>
          <p className="not-found__links">
            Or try <Link to="/services">Services</Link> · <Link to="/gallery">Gallery</Link> ·{' '}
            <Link to="/contact">Contact</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
