import type { ReactNode } from 'react'
import { PHONE_DISPLAY, PHONE_TEL, SQUARE_GO_URL } from '../lib/constants'
import './CTABanner.css'

export default function CTABanner({
  heading,
  body,
  bookLabel = 'Book on Square Go',
  callLabel = `Call ${PHONE_DISPLAY}`,
  showCall = true,
  layout = 'center',
}: {
  heading: ReactNode
  body: ReactNode
  bookLabel?: string
  callLabel?: string
  showCall?: boolean
  layout?: 'center' | 'split'
}) {
  return (
    <div className={`cta-banner cta-banner--${layout}`}>
      <div className="cta-banner__copy">
        <h2>{heading}</h2>
        <p>{body}</p>
      </div>
      <div className="cta-banner__actions">
        <a href={SQUARE_GO_URL} target="_blank" rel="noopener" className="cta-banner__book">
          {bookLabel}
        </a>
        {showCall && (
          <a href={PHONE_TEL} className="cta-banner__call">
            {callLabel}
          </a>
        )}
      </div>
    </div>
  )
}
