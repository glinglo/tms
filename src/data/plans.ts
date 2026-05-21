export interface Plan {
  id: string
  name: string
  price: string
  credits: number
  creditsLabel: string
  priceId: string
  perCredit: string
  featured?: boolean
}

export const PLANS: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: '€9',
    credits: 500,
    creditsLabel: '500 leads',
    priceId: 'price_1TZZGmRgzkWTYE9PbeIfkFEp',
    perCredit: '€0.018 / lead',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: '€29',
    credits: 2000,
    creditsLabel: '2,000 leads',
    priceId: 'price_1TZZGmRgzkWTYE9PyJvrXVRE',
    perCredit: '€0.0145 / lead',
    featured: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '€69',
    credits: 6000,
    creditsLabel: '6,000 leads',
    priceId: 'price_1TZZGnRgzkWTYE9Pl81u2Qug',
    perCredit: '€0.0115 / lead',
  },
]
