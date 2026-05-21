import type { Lead } from '../types/lead'

export function generateCSV(leads: Lead[]): string {
  const headers = ['Name', 'Phone', 'Address', 'Rating', 'Reviews', 'Website', 'Email']
  const rows = leads.map(l => [
    l.title ?? '',
    l.phone ?? '',
    l.address ?? '',
    l.totalScore?.toString() ?? '',
    l.reviewsCount?.toString() ?? '',
    l.website ?? '',
    l.email ?? '',
  ])
  const escape = (val: string) => `"${val.replace(/"/g, '""')}"`
  return [headers.map(escape), ...rows.map(row => row.map(escape))].join('\n')
}

export function downloadCSV(content: string, filename: string) {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}
