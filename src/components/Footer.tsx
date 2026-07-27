import { Link } from 'react-router-dom'
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, NAV_LINKS, PHONE_DISPLAY, PHONE_TEL } from '../lib/constants'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid container">
        <div className="site-footer__col">
          <p className="site-footer__brand">
            Perro
            <br />
            <span>Grooming Co.</span>
          </p>
          <p className="site-footer__blurb">
            Mobile dog grooming across greater Chattanooga — right where your dog feels happiest.
          </p>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="site-footer__instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
            </svg>
            {INSTAGRAM_HANDLE}
          </a>
        </div>

        <div className="site-footer__col">
          <p className="site-footer__heading">Explore</p>
          {NAV_LINKS.map((link) => (
            <Link key={link.to} to={link.to} className="site-footer__link">
              {link.label === 'Contact' ? 'Contact & Areas' : link.label === 'Services' ? 'Services & Pricing' : link.label}
            </Link>
          ))}
        </div>

        <div className="site-footer__col">
          <p className="site-footer__heading">Hours</p>
          <div className="site-footer__hours">
            <span>Mon – Fri</span>
            <span>8:00 am – 6:00 pm</span>
            <span>Saturday</span>
            <span>9:00 am – 4:00 pm</span>
            <span>Sunday</span>
            <span style={{ fontStyle: 'italic' }}>Closed</span>
          </div>
        </div>

        <div className="site-footer__col">
          <p className="site-footer__heading">Service Area</p>
          <p className="site-footer__area">
            Chattanooga · Hixson · Red Bank
            <br />
            Hamilton (+$15 travel fee)
            <br />
            <i>Outside these areas? A travel fee applies — call us.</i>
          </p>
          <a href={PHONE_TEL} className="site-footer__link">
            {PHONE_DISPLAY}
          </a>
          <a href={`mailto:${EMAIL}`} className="site-footer__link">
            {EMAIL}
          </a>
        </div>
      </div>
      <p className="site-footer__bottom container">
        <span>© 2026 Perro Grooming Co. · Chattanooga, TN</span>
        <span>Booking powered by Square Go</span>
      </p>
    </footer>
  )
}
