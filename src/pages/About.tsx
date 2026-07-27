import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import CTABanner from '../components/CTABanner'
import PlaceholderImage from '../components/PlaceholderImage'
import { INSTAGRAM_URL, SQUARE_GO_URL } from '../lib/constants'
import './About.css'

const steps = [
  {
    n: 1,
    title: 'Book online or call',
    body: "Pick a service and time on Square Go, or call and we'll match the right groom to your dog's coat.",
  },
  {
    n: 2,
    title: 'We arrive, fully equipped',
    body: 'Tub, warm water, dryer, table and tools all come with us. We set up indoors or in the backyard — your call.',
  },
  {
    n: 3,
    title: 'One-on-one groom',
    body: 'Your dog gets undivided attention at their own pace — breaks, treats and gentle handling throughout.',
  },
  {
    n: 4,
    title: 'Photos & report card',
    body: 'You get glamour shots, notes on coat and nails, and we tidy up before we go. Tail wags guaranteed.',
  },
]

const stats = [
  { value: '120+', label: 'five-star reviews' },
  { value: '4', label: 'neighborhoods served' },
  { value: '1:1', label: 'groomer to dog, always' },
  { value: '0', label: 'cages or kennels' },
]

export default function About() {
  return (
    <div className="page">
      <div className="grain-overlay" />
      <Header />

      <section className="page-hero">
        <div className="page-hero__wash" style={{ background: 'var(--color-amber-400)', opacity: 0.16 }} />
        <div className="page-hero__content container-narrow about-hero__grid">
          <div className="about-hero__copy">
            <span className="section-eyebrow">About Perro</span>
            <h1>
              Grooming that comes <i>wagging to your door</i>
            </h1>
            <p>
              Perro Grooming Co. was started with one simple belief: dogs are calmer, happier and easier to groom in
              the place they know best — home. So instead of a shop full of kennels and dryers, we bring professional
              tools, warm water and a whole lot of patience to your porch, backyard or living room, anywhere in
              greater Chattanooga.
            </p>
            <p>
              Every visit is one-on-one from hello to final fluff. No cages, no waiting rooms, no car-ride anxiety —
              just your dog, their groomer, and a fresh cut.
            </p>
            <div className="about-hero__actions">
              <Button href={SQUARE_GO_URL} external variant="primary" size="lg">
                Book a Visit
              </Button>
              <Button to="/gallery" variant="secondary" size="lg">
                See Our Work
              </Button>
            </div>
          </div>
          <div className="about-hero__image-wrap">
            <div className="about-hero__image">
              <PlaceholderImage
                gradient="amber-gold"
                alt="Groomer at work"
                label="Photo of your groomer at work"
                src="/assets/gallery/groomer-at-work.jpg"
              />
            </div>
            <span className="about-hero__badge">Certified · Insured · Dog-obsessed</span>
          </div>
        </div>
      </section>

      <section className="section section--card">
        <div className="container-narrow">
          <div className="section__head">
            <span className="section-eyebrow">What to Expect</span>
            <h2>
              A visit in <i>four easy steps</i>
            </h2>
          </div>
          <div className="steps-grid">
            {steps.map((s) => (
              <div key={s.n} className="step-card">
                <span className="step-card__number">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-narrow promise-grid">
          <div className="promise-copy">
            <span className="section-eyebrow">Our Promise</span>
            <h2>
              Treated like <i>family</i>, every time
            </h2>
            <p>
              We use gentle, dog-safe products, never rush a nervous pup, and always leave your space as clean as we
              found it. If anything about the groom isn't right, tell us within 48 hours and we'll come back and fix
              it — free.
            </p>
            <p className="promise-note">
              Read what dog parents say on the <a href="/">home page</a>, or follow the fresh cuts on{' '}
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener">
                Instagram
              </a>
              .
            </p>
          </div>
          <div className="stats-grid">
            {stats.map((s) => (
              <div key={s.label} className="stat-card">
                <span className="stat-card__value">{s.value}</span>
                <span className="stat-card__label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container-narrow">
          <CTABanner
            layout="split"
            heading="Let's meet your dog"
            body="Book a first visit — puppy grooms are our specialty."
            showCall={false}
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}
