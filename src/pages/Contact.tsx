import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import PerroMap from '../components/PerroMap'
import { EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, PHONE_DISPLAY, PHONE_TEL, SQUARE_GO_URL } from '../lib/constants'
import './Contact.css'

export default function Contact() {
  return (
    <div className="page">
      <div className="grain-overlay" />
      <Header />

      <section className="page-hero">
        <div className="page-hero__wash" style={{ background: 'var(--color-gold-300)', opacity: 0.2 }} />
        <div className="page-hero__content container-narrow">
          <div className="contact-head">
            <span className="section-eyebrow">Contact &amp; Service Area</span>
            <h1>
              We're probably <i>already nearby</i>
            </h1>
            <p>
              Perro is fully mobile — there's no shop to visit. Check the map to see if your neighborhood is covered,
              then book or call.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-map-card">
              <PerroMap />
            </div>

            <div className="contact-cards">
              <div className="contact-card">
                <h2>Where we go</h2>
                <div className="areas-list">
                  <div className="areas-list__row">
                    <span>Chattanooga</span>
                    <span>no travel fee</span>
                  </div>
                  <div className="areas-list__row">
                    <span>Red Bank</span>
                    <span>no travel fee</span>
                  </div>
                  <div className="areas-list__row">
                    <span>Hixson</span>
                    <span>no travel fee</span>
                  </div>
                  <div className="areas-list__row areas-list__row--fee">
                    <span>Hamilton</span>
                    <span>+$15 travel fee</span>
                  </div>
                </div>
                <p className="contact-card__note">
                  Outside these areas — or outside Chattanooga entirely? We can often still make it work: a travel fee
                  is assessed based on distance. Call us for a quote.
                </p>
              </div>

              <div className="contact-card">
                <h2>Get in touch</h2>
                <a href={PHONE_TEL} className="contact-touch-link">
                  <span className="icon-circle contact-touch-link__icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8a4a1f" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .8 2.9a2 2 0 0 1-.5 2.1L8.1 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.9.7 2.9.8a2 2 0 0 1 1.6 2z" />
                    </svg>
                  </span>
                  {PHONE_DISPLAY}
                </a>
                <a href={`mailto:${EMAIL}`} className="contact-touch-link">
                  <span className="icon-circle contact-touch-link__icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8a4a1f" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="3" />
                      <path d="M2 7l10 6 10-6" />
                    </svg>
                  </span>
                  {EMAIL}
                </a>
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className="contact-touch-link">
                  <span className="icon-circle contact-touch-link__icon">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#8a4a1f" strokeWidth={1.8} strokeLinecap="round">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.2" cy="6.8" r="1" fill="#8a4a1f" stroke="none" />
                    </svg>
                  </span>
                  {INSTAGRAM_HANDLE}
                </a>
              </div>

              <div className="contact-card">
                <h2>Hours</h2>
                <div className="contact-hours-grid">
                  <span>Mon – Fri</span>
                  <span>8:00 am – 6:00 pm</span>
                  <span>Saturday</span>
                  <span>9:00 am – 4:00 pm</span>
                  <span>Sunday</span>
                  <span style={{ fontStyle: 'italic' }}>Closed</span>
                </div>
                <Button href={SQUARE_GO_URL} external variant="primary" size="md" style={{ marginTop: 4 }}>
                  Book on Square Go
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
