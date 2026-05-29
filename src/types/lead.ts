export interface Lead {
  title: string | null
  phone: string | null
  address: string | null
  totalScore: number | null
  reviewsCount: number | null
  website: string | null
  email: string | null
  instagram: string | null
  facebook: string | null
  linkedin: string | null
}

export interface ScrapeResponse {
  results: Lead[]
  total: number
}
