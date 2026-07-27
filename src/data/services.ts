export type Service = {
  slug: string
  name: string
  description: string
  shortDescription: string
  duration: string
  price: string
  color: 'rose' | 'orange' | 'amber' | 'gold'
  icon: 'scissors' | 'droplet' | 'lightning' | 'paw' | 'nail' | 'tooth'
}

export const services: Service[] = [
  {
    slug: 'full-groom',
    name: 'Full Groom',
    shortDescription: 'Bath, blow-dry, haircut styled to breed, nails, ears & cologne.',
    description:
      'Warm bath, blow-dry, full haircut styled to breed or your preference, nail trim, ear cleaning & finishing cologne.',
    duration: '~2 hrs',
    price: 'from $85',
    color: 'rose',
    icon: 'scissors',
  },
  {
    slug: 'bath-and-brush',
    name: 'Bath & Brush',
    shortDescription: 'Warm bath, conditioner, blow-dry and a thorough brush-out.',
    description:
      'Warm bath with gentle shampoo, conditioner, blow-dry, thorough brush-out and a nail check.',
    duration: '~1 hr',
    price: 'from $55',
    color: 'orange',
    icon: 'droplet',
  },
  {
    slug: 'de-shedding-treatment',
    name: 'De-shedding Treatment',
    shortDescription: 'Undercoat rake, de-shed shampoo, high-velocity dry.',
    description:
      'Undercoat rake, de-shed shampoo and high-velocity dry that dramatically cuts loose hair around your home.',
    duration: '~90 min',
    price: 'from $65',
    color: 'amber',
    icon: 'lightning',
  },
  {
    slug: 'puppy-first-groom',
    name: 'Puppy First Groom',
    shortDescription: 'A gentle, treat-filled introduction for pups under 6 months.',
    description:
      'A gentle, patient introduction: mini bath, light trim, nails, treats and short breaks. For pups under 6 months.',
    duration: '~45 min',
    price: 'from $50',
    color: 'gold',
    icon: 'paw',
  },
  {
    slug: 'nail-trim',
    name: 'Nail Trim',
    shortDescription: 'Trim + file, paw-pad tidy.',
    description:
      'Trim and smooth file with paw-pad tidy. A quick standalone visit, or add it to any groom.',
    duration: '~20 min',
    price: '$20',
    color: 'rose',
    icon: 'nail',
  },
  {
    slug: 'teeth-cleaning',
    name: 'Teeth Cleaning',
    shortDescription: 'Enzymatic paste, breath finish.',
    description:
      'Gentle brushing with dog-safe enzymatic paste plus a breath-freshening finish. A great add-on to any visit.',
    duration: '~15 min',
    price: '$15',
    color: 'orange',
    icon: 'tooth',
  },
]
