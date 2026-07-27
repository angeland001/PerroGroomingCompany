import type { AnchorHTMLAttributes } from 'react'
import { Link } from 'react-router-dom'
import './Button.css'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  size?: 'md' | 'lg'
  to?: string
  href?: string
  external?: boolean
} & AnchorHTMLAttributes<HTMLAnchorElement>

export default function Button({
  variant = 'primary',
  size = 'md',
  to,
  href,
  external,
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = ['btn', `btn-${variant}`, `btn-${size}`, className].filter(Boolean).join(' ')

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      className={classes}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      {...rest}
    >
      {children}
    </a>
  )
}
