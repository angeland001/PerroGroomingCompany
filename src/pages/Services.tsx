import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import CTABanner from '../components/CTABanner'
import ServiceIcon from '../components/ServiceIcon'
import Button from '../components/Button'
import { services } from '../data/services'
import { SQUARE_GO_URL } from '../lib/constants'
import './Services.css'

const SERVICE_COLOR: Record<string, string> = {
  rose: 'var(--color-rose-600)',
  orange: 'var(--color-orange-500)',
  amber: 'var(--color-amber-400)',
  gold: 'var(--color-gold-300)',
}
const ICON_STROKE: Record<string, string> = {
  rose: '#fff',
  orange: '#fff',
  amber: '#fff',
  gold: '#8a4a1f',
}

export default function Services() {
  return (
    <div className="page">
      <div className="grain-overlay" />
      <Header />

      <section className="page-hero page-hero--services">
        <div className="page-hero__wash" style={{ background: 'var(--color-gold-300)', opacity: 0.22 }} />
        <div className="page-hero__content container-narrow">
          <div className="services-head">
            <div className="services-head__copy">
              <span className="section-eyebrow">Services &amp; Pricing</span>
              <h1>
                From nose to <i>tail</i>
              </h1>
              <p>
                Every service happens at your home — inside or in the backyard. Prices start from small breeds; final
                quote depends on size, coat and condition.
              </p>
            </div>
            <Button href={SQUARE_GO_URL} external variant="primary" size="md">
              Book on Square Go
            </Button>
          </div>

          <div className="service-rows">
            {services.map((s) => (
              <div key={s.slug} className="service-row">
                <span className="icon-circle service-row__icon" style={{ background: SERVICE_COLOR[s.color] }}>
                  <ServiceIcon icon={s.icon} stroke={ICON_STROKE[s.color]} />
                </span>
                <div className="service-row__body">
                  <span className="service-row__name">{s.name}</span>
                  <span className="service-row__desc">{s.description}</span>
                </div>
                <span className="service-row__duration">{s.duration}</span>
                <span className="service-row__price">{s.price}</span>
              </div>
            ))}
          </div>

          <div className="notes-grid">
            <div className="note-card">
              <span className="icon-circle note-card__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a4a1f" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </span>
              <p>
                <b>Travel:</b> visits in Chattanooga, Hixson and Red Bank are included. Hamilton adds a flat{' '}
                <b>$15 travel fee</b>, and trips outside Chattanooga are assessed a travel fee based on distance.{' '}
                <Link to="/contact">See the coverage map →</Link>
              </p>
            </div>
            <div className="note-card">
              <span className="icon-circle note-card__icon">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a4a1f" strokeWidth={1.8} strokeLinecap="round">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 3" />
                </svg>
              </span>
              <p>
                <b>Hours:</b> Mon–Fri 8:00 am – 6:00 pm · Sat 9:00 am – 4:00 pm · Sun closed. Book online anytime via
                Square Go.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container-narrow">
          <CTABanner
            layout="split"
            heading="Not sure which service fits?"
            body="Call us — we'll recommend the right groom for your dog's coat."
            callLabel="Call Us"
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
