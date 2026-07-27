import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Button from './Button'
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL, SQUARE_GO_URL } from '../lib/constants'
import './Header.css'

export default function Header({ slim = false }: { slim?: boolean }) {
  const [open, setOpen] = useState(false)

  return (
    <header className={`site-header${slim ? ' site-header-slim' : ''}`}>
      <Link to="/" className="site-header__logo" onClick={() => setOpen(false)}>
        <img src="/assets/perro-logo-horizontal.png" alt="Perro Grooming Co. — home" />
      </Link>

      {!slim && (
        <nav className={`site-header__nav${open ? ' is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={({ isActive }) => `site-header__nav-link${isActive ? ' is-active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      )}

      <div className="site-header__actions">
        <a href={PHONE_TEL} className="site-header__phone">
          {PHONE_DISPLAY}
        </a>
        <Button href={SQUARE_GO_URL} external variant="primary" size="md" className="site-header__book">
          Book Now
        </Button>
        {!slim && (
          <button
            type="button"
            className={`site-header__burger${open ? ' is-open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        )}
      </div>
    </header>
  )
}
