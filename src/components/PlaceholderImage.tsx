import type { CSSProperties } from 'react'

type Gradient = 'rose-coral' | 'coral-orange' | 'orange-amber' | 'amber-gold'

/**
 * Stand-in for a real photo. Renders the brand gradient wash used across the
 * design handoff's placeholder image slots; pass `src` once real photography
 * is available and it renders a normal <img> instead.
 */
export default function PlaceholderImage({
  gradient,
  src,
  alt,
  label,
  shape = 'rect',
  style,
  className,
}: {
  gradient: Gradient
  src?: string
  alt: string
  label?: string
  shape?: 'rect' | 'circle'
  style?: CSSProperties
  className?: string
}) {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        style={{ width: '100%', height: '100%', objectFit: 'cover', ...style }}
      />
    )
  }

  return (
    <div
      className={className}
      role="img"
      aria-label={alt}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: shape === 'circle' ? 0 : '10px',
        background: `var(--gradient-${gradient})`,
        borderRadius: shape === 'circle' ? '50%' : undefined,
        ...style,
      }}
    >
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '11px',
            fontWeight: 600,
            color: 'rgba(255,255,255,.85)',
            textAlign: 'center',
            lineHeight: 1.3,
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
