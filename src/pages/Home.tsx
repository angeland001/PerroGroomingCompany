import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import CTABanner from '../components/CTABanner'
import ServiceIcon from '../components/ServiceIcon'
import PlaceholderImage from '../components/PlaceholderImage'
import { services } from '../data/services'
import { SQUARE_GO_URL } from '../lib/constants'
import './Home.css'

const SERVICE_COLOR: Record<string, string> = {
  rose: 'var(--color-rose-600)',
  orange: 'var(--color-orange-500)',
  amber: 'var(--color-amber-400)',
  gold: 'var(--color-gold-300)',
}

const galleryTeaser = [
  { id: 'g1', name: 'Biscuit', label: 'Biscuit — full groom', gradient: 'rose-coral', ratio: '3/4', src: '/assets/gallery/biscuit.jpg' },
  { id: 'g2', name: 'Luna', label: 'Luna — de-shed', gradient: 'coral-orange', ratio: '3/4.4', src: '/assets/gallery/luna.jpg' },
  { id: 'g3', name: 'Moose', label: 'Moose — bath & brush', gradient: 'orange-amber', ratio: '3/4', src: '/assets/gallery/moose.jpg' },
  { id: 'g4', name: 'Pepper', label: 'Pepper — puppy groom', gradient: 'amber-gold', ratio: '3/4.4', src: '/assets/gallery/pepper.jpg' },
] as const

const testimonials = [
  {
    name: 'Winston',
    meta: 'Doodle · Hixson',
    quote: '“Winston used to shake at the shop. Now he waits at the window for the Perro van. The backyard setup is genius.”',
    attribution: '— Maria T. ★★★★★',
    src: '/assets/gallery/winston-avatar.jpg',
  },
  {
    name: 'Daisy',
    meta: 'Husky mix · Chattanooga',
    quote: '“The de-shed treatment is life-changing. Our couch has never been this fur-free, and Daisy loved every minute.”',
    attribution: '— James & Priya K. ★★★★★',
    src: '/assets/gallery/daisy-avatar.jpg',
  },
  {
    name: 'Rufus',
    meta: 'Shih Tzu · Hamilton',
    quote: "“Rufus's first groom ever and not a single whimper. Patient, gentle, and he came out looking like a teddy bear.”",
    attribution: '— Anthony B. ★★★★★',
    src: '/assets/gallery/rufus-avatar.jpg',
  },
]

export default function Home() {
  return (
    <div className="page">
      <div className="grain-overlay" />
      <Header />

      <section className="hero">
        <div className="hero__wash" />
        <div className="hero__grid">
          <div className="hero__copy">
            <h1>
              Spa-day grooming,
              <br />
              <em>at your home</em>
            </h1>
            <p>
              We come to you — inside or in the backyard — serving <i>Chattanooga, Hixson, Red Bank &amp; Hamilton</i>.
            </p>
            <div className="hero__actions">
              <Button href={SQUARE_GO_URL} external variant="primary" size="lg">
                Book with Square Go
              </Button>
              <Button to="/services" variant="secondary" size="lg">
                See Services
              </Button>
            </div>
            <div className="hero__quote">
              <div className="hero__quote-avatar">
                <PlaceholderImage gradient="rose-coral" alt="Biscuit" shape="circle" src="/assets/gallery/biscuit-avatar.jpg" />
              </div>
              <div>
                <p>“Biscuit gets nervous in cars — having Perro come to our porch changed everything.”</p>
                <span>Kristin R., Red Bank ★★★★★</span>
              </div>
            </div>
          </div>
          <div className="hero__image-wrap">
            <div className="hero__image">
              <img src="/assets/puppy-hero.png" alt="Freshly groomed puppy" />
            </div>
            <span className="hero__badge">4.9 ★ · 120 reviews</span>
          </div>
        </div>
      </section>

      <section className="why-strip">
        <div className="why-strip__grid">
          <div className="why-item">
            <span className="icon-circle why-item__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8a4a1f" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 11l9-8 9 8M5 9.5V21h14V9.5" />
              </svg>
            </span>
            <div>
              <h3>No car rides, no cages</h3>
              <p>Your dog stays right where they feel happiest — indoors or in the backyard.</p>
            </div>
          </div>
          <div className="why-item">
            <span className="icon-circle why-item__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8a4a1f" strokeWidth={1.6} strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 3" />
              </svg>
            </span>
            <div>
              <h3>One-on-one, start to finish</h3>
              <p>One groomer, one dog, full attention — no waiting in a queue of kennels.</p>
            </div>
          </div>
          <div className="why-item">
            <span className="icon-circle why-item__icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8a4a1f" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 0 1 16 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div>
              <h3>All over greater Chattanooga</h3>
              <p>Chattanooga, Hixson &amp; Red Bank included; Hamilton for a small travel fee.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--card">
        <div className="container">
          <div className="section__head">
            <span className="section-eyebrow">Our Services</span>
            <h2>
              Everything your dog needs, <i>delivered</i>
            </h2>
            <p>Six services, one doorstep — yours.</p>
          </div>
          <div className="services-grid">
            {services.slice(0, 3).map((s) => (
              <Link key={s.slug} to="/services" className="service-card">
                <span className="icon-circle service-card__icon" style={{ background: SERVICE_COLOR[s.color] }}>
                  <ServiceIcon icon={s.icon} />
                </span>
                <h3>{s.name}</h3>
                <p>{s.shortDescription}</p>
                <span className="service-card__price">{s.price} →</span>
              </Link>
            ))}
          </div>
          <div className="section__footer">
            <Button to="/services" variant="secondary" size="md">
              All Services &amp; Pricing
            </Button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section__head">
            <span className="section-eyebrow">Fresh Cuts</span>
            <h2>
              Recent <i>good boys &amp; girls</i>
            </h2>
          </div>
          <div className="gallery-teaser-grid">
            {galleryTeaser.map((g) => (
              <div key={g.id} className="gallery-teaser-item">
                <div className="gallery-teaser-item__frame" style={{ aspectRatio: g.ratio }}>
                  <PlaceholderImage gradient={g.gradient} alt={g.label} label={g.label} src={g.src} />
                </div>
                <span className="gallery-teaser-item__label">{g.name}</span>
              </div>
            ))}
          </div>
          <div className="section__footer">
            <Button to="/gallery" variant="secondary" size="md">
              See Full Gallery
            </Button>
          </div>
        </div>
      </section>

      <section className="section section--card">
        <div className="container">
          <div className="section__head">
            <span className="section-eyebrow">Testimonials</span>
            <h2>
              Tails are <i>wagging</i>
            </h2>
            <p>Real notes from dog parents across Chattanooga.</p>
          </div>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <article key={t.name} className="testimonial-card">
                <div className="testimonial-card__head">
                  <div className="testimonial-card__avatar">
                    <PlaceholderImage gradient="coral-orange" alt={t.name} shape="circle" src={t.src} />
                  </div>
                  <div>
                    <p className="testimonial-card__name">{t.name}</p>
                    <p className="testimonial-card__meta">{t.meta}</p>
                  </div>
                </div>
                <p className="testimonial-card__quote">{t.quote}</p>
                <p className="testimonial-card__attribution">{t.attribution}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <CTABanner
            heading="Ready for a fresh cut — without leaving home?"
            body="Mon–Fri 8am–6pm · Sat 9am–4pm · Book online or give us a call."
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
