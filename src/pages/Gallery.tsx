import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button'
import PlaceholderImage from '../components/PlaceholderImage'
import { SQUARE_GO_URL } from '../lib/constants'
import './Gallery.css'

const GRADIENTS = ['rose-coral', 'coral-orange', 'orange-amber', 'amber-gold'] as const

const photos = [
  { id: 'gal-1', name: 'Biscuit', service: 'full groom', ratio: '3/4', src: '/assets/gallery/biscuit.jpg' },
  { id: 'gal-2', name: 'Luna', service: 'de-shed', ratio: '3/4.4', src: '/assets/gallery/luna.jpg' },
  { id: 'gal-3', name: 'Moose', service: 'bath & brush', ratio: '3/4', src: '/assets/gallery/moose.jpg' },
  { id: 'gal-4', name: 'Pepper', service: 'puppy groom', ratio: '3/4.4', src: '/assets/gallery/pepper.jpg' },
  { id: 'gal-5', name: 'Winston', service: 'full groom', ratio: '3/4.4', src: '/assets/gallery/winston.jpg' },
  { id: 'gal-6', name: 'Daisy', service: 'de-shed', ratio: '3/4', src: '/assets/gallery/daisy.jpg' },
  { id: 'gal-7', name: 'Rufus', service: 'puppy groom', ratio: '3/4.4', src: '/assets/gallery/rufus.jpg' },
  { id: 'gal-8', name: 'Olive', service: 'teeth & nails', ratio: '3/4', src: '/assets/gallery/olive.jpg' },
]

export default function Gallery() {
  return (
    <div className="page">
      <div className="grain-overlay" />
      <Header />

      <section className="page-hero">
        <div className="page-hero__wash" style={{ background: 'var(--color-rose-600)', opacity: 0.07 }} />
        <div className="page-hero__content container-narrow">
          <div className="gallery-head">
            <span className="section-eyebrow">Fresh Cuts</span>
            <h1>
              Recent <i>good boys &amp; girls</i>
            </h1>
            <p>Every pup below was groomed at their own home — porch, backyard or living room. Your dog could be next.</p>
          </div>

          <div className="gallery-grid">
            {photos.map((photo, i) => (
              <div key={photo.id} className="gallery-card">
                <div className="gallery-card__frame" style={{ aspectRatio: photo.ratio }}>
                  <PlaceholderImage
                    gradient={GRADIENTS[i % GRADIENTS.length]}
                    alt={`${photo.name} — ${photo.service}`}
                    label={`${photo.name} — ${photo.service}`}
                    src={photo.src}
                  />
                </div>
                <span className="gallery-card__label">
                  {photo.name} · <i>{photo.service}</i>
                </span>
              </div>
            ))}
          </div>

          <div className="gallery-footer">
            <p>Want your pup featured here?</p>
            <Button href={SQUARE_GO_URL} external variant="primary" size="lg">
              Book a Groom
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
