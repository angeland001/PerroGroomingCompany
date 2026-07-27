import type { Service } from '../data/services'

const PATHS: Record<Service['icon'], JSX.Element> = {
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M8.5 8.5L20 20M8.5 15.5L20 4" />
    </>
  ),
  droplet: <path d="M12 3c-3 4.5-6 7.5-6 11a6 6 0 0 0 12 0c0-3.5-3-6.5-6-11z" />,
  lightning: <path d="M4 20L20 4M7 4v6M4 7h6" />,
  paw: (
    <>
      <circle cx="12" cy="13" r="4" />
      <circle cx="5.5" cy="8" r="2" />
      <circle cx="10" cy="4.5" r="2" />
      <circle cx="14.5" cy="4.5" r="2" />
      <circle cx="19" cy="8" r="2" />
    </>
  ),
  nail: <path d="M8 3v10a4 4 0 0 0 8 0V3M8 6h8" />,
  tooth: <path d="M6 4c2 0 3 1.5 6 1.5S16 4 18 4c1.5 0 2 1.5 1.5 4l-1 5c-.4 2-1 7-2.5 7s-1.5-4-4-4-2.5 4-4 4S6.9 15 6.5 13l-1-5C5 5.5 5.5 4 6 4z" />,
}

export default function ServiceIcon({
  icon,
  stroke = '#fff',
  size = 22,
}: {
  icon: Service['icon']
  stroke?: string
  size?: number
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={stroke}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[icon]}
    </svg>
  )
}
