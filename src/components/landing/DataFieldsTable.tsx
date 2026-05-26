const FIELDS = [
  { key: 'business-name', label: 'Business Name',   icon: '🏢', example: "Joe's Pizza" },
  { key: 'phone',         label: 'Phone Number',    icon: '📞', example: '+1 212-555-0123' },
  { key: 'email',         label: 'Email',           icon: '✉️',  example: 'info@joespizza.com' },
  { key: 'address',       label: 'Address',         icon: '📍', example: '123 Main St, New York, NY 10001' },
  { key: 'website',       label: 'Website',         icon: '🌐', example: 'joespizza.com' },
  { key: 'rating',        label: 'Google Rating',   icon: '⭐', example: '4.5 / 5.0' },
  { key: 'reviews',       label: 'Review Count',    icon: '💬', example: '234 reviews' },
  { key: 'category',      label: 'Category',        icon: '🏷️', example: 'Pizza Restaurant' },
  { key: 'hours',         label: 'Opening Hours',   icon: '🕐', example: 'Mon-Fri 11am-10pm' },
  { key: 'maps-url',      label: 'Google Maps URL', icon: '🗺️', example: 'maps.google.com/place/...' },
]

function isMatch(fieldKey: string, fieldLabel: string, highlight?: string): boolean {
  if (!highlight) return false
  const h = highlight.toLowerCase()
  return fieldKey.includes(h) || fieldLabel.toLowerCase().includes(h)
}

export default function DataFieldsTable({ highlightField }: { highlightField?: string }) {
  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block overflow-hidden rounded-[10px] border border-border-subtle">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-cream-dark">
              <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5 w-[40%]">
                Field
              </th>
              <th className="font-sans text-[11px] font-semibold text-ink-faint uppercase tracking-[0.05em] text-left py-[10px] px-5">
                Example value
              </th>
            </tr>
          </thead>
          <tbody>
            {FIELDS.map((field, i) => {
              const hi = isMatch(field.key, field.label, highlightField)
              return (
                <tr
                  key={field.key}
                  className={`border-t border-[rgba(32,32,32,0.07)] ${hi ? 'bg-[rgba(234,40,4,0.04)]' : i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}
                >
                  <td className="py-3 px-5">
                    <span className="flex items-center gap-3">
                      <span className="text-base leading-none" aria-hidden="true">{field.icon}</span>
                      <span className={`font-sans text-sm font-semibold ${hi ? 'text-brand' : 'text-ink'}`}>
                        {field.label}
                      </span>
                      {hi && (
                        <span className="font-sans text-[10px] font-bold text-brand bg-[rgba(234,40,4,0.12)] rounded-pill px-[8px] py-[2px] uppercase tracking-[0.05em]">
                          Extracted
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="py-3 px-5">
                    <span className="font-mono text-xs text-ink-muted">{field.example}</span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-2">
        {FIELDS.map((field) => {
          const hi = isMatch(field.key, field.label, highlightField)
          return (
            <div
              key={field.key}
              className={`rounded-[10px] border px-4 py-3 flex items-start gap-3 ${hi ? 'border-brand bg-[rgba(234,40,4,0.04)]' : 'border-border-subtle bg-white'}`}
            >
              <span className="text-xl leading-none mt-[2px] shrink-0" aria-hidden="true">{field.icon}</span>
              <div className="min-w-0">
                <p className={`font-sans text-sm font-semibold m-0 ${hi ? 'text-brand' : 'text-ink'}`}>
                  {field.label}
                  {hi && <span className="ml-2 font-sans text-[10px] font-bold text-brand bg-[rgba(234,40,4,0.12)] rounded-pill px-[8px] py-[2px] uppercase tracking-[0.05em] align-middle">Extracted</span>}
                </p>
                <p className="font-mono text-xs text-ink-faint m-0 mt-[2px] truncate">{field.example}</p>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
