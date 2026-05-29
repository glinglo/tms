import type { Lead } from '../types/lead'

export const DEFAULT_QUERY = { business: 'Restaurants', location: 'New York' }

export const defaultResults: Lead[] = [
  { title: "Kimo's", phone: '(347) 926-4384', address: '92-16 Rockaway Beach Blvd, Queens, NY 11693', totalScore: 4.8, website: 'kimoskitchen.com', reviewsCount: null, email: null, instagram: null, facebook: null, linkedin: null },
  { title: "Uma's", phone: '(718) 318-9100', address: '92-07 Rockaway Beach Blvd, Rockaway Park, NY 11694', totalScore: 4.6, website: 'umasrockaway.com', reviewsCount: null, email: null, instagram: null, facebook: null, linkedin: null },
  { title: "Adrienne's NYC", phone: '(718) 945-2525', address: '25 Van Brunt Rd, Queens, NY 11693', totalScore: 4.7, website: 'adriennes-nyc.com', reviewsCount: null, email: null, instagram: null, facebook: null, linkedin: null },
  { title: "Carmine's Italian Kitchen", phone: '(212) 541-4100', address: '200 W 44th St, New York, NY 10036', totalScore: 4.5, website: 'carminesnyc.com', reviewsCount: null, email: null, instagram: null, facebook: null, linkedin: null },
  { title: "Joe's Shanghai", phone: '(212) 233-8888', address: '9 Pell St, New York, NY 10013', totalScore: 4.4, website: 'joeshanghairestaurants.com', reviewsCount: null, email: null, instagram: null, facebook: null, linkedin: null },
  { title: 'Lucali', phone: '(718) 858-4086', address: '575 Henry St, Brooklyn, NY 11231', totalScore: 4.9, website: 'lucali.com', reviewsCount: null, email: null, instagram: null, facebook: null, linkedin: null },
  { title: 'The Halal Guys', phone: '(347) 527-1505', address: '307 W 53rd St, New York, NY 10019', totalScore: 4.6, website: 'thehalalguys.com', reviewsCount: null, email: null, instagram: null, facebook: null, linkedin: null },
  { title: "Grimaldi's Pizzeria", phone: '(718) 858-4300', address: '1 Front St, Brooklyn, NY 11201', totalScore: 4.5, website: 'grimaldis-pizza.com', reviewsCount: null, email: null, instagram: null, facebook: null, linkedin: null },
  { title: 'Russ & Daughters', phone: '(212) 475-4880', address: '179 E Houston St, New York, NY 10002', totalScore: 4.7, website: 'russanddaughters.com', reviewsCount: null, email: null, instagram: null, facebook: null, linkedin: null },
  { title: 'Peter Luger Steak House', phone: '(718) 387-7400', address: '178 Broadway, Brooklyn, NY 11211', totalScore: 4.8, website: 'peterluger.com', reviewsCount: null, email: null, instagram: null, facebook: null, linkedin: null },
]
