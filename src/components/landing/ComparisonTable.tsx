interface ComparisonRow {
  feature: string
  us: string
  them: string
}

interface ComparisonTableProps {
  competitor: string
  rows: ComparisonRow[]
  usLabel?: string
  themLabel?: string
}

function CellValue({ value }: { value: string }) {
  const lower = value.toLowerCase().trim()
  const isYes = lower === 'yes' || lower === 'yes.' || lower === 'yes,' || lower.startsWith('yes ')
  const isNo = lower === 'no' || lower === 'no.' || lower === 'no,' || lower.startsWith('no ')

  if (isYes) {
    return (
      <span className="inline-flex items-center gap-1.5 font-sans text-sm text-[#1d7a4a] font-medium">
        <span className="text-[#2b9a66] font-bold" aria-hidden="true">✓</span>
        {value}
      </span>
    )
  }
  if (isNo) {
    return (
      <span className="inline-flex items-center gap-1.5 font-sans text-sm text-ink-faint font-medium">
        <span className="text-[rgba(32,32,32,0.3)] font-bold" aria-hidden="true">✗</span>
        {value}
      </span>
    )
  }
  return <span className="font-sans text-sm text-ink leading-relaxed">{value}</span>
}

export default function ComparisonTable({
  competitor,
  rows,
  usLabel = 'TheMapScraper',
  themLabel,
}: ComparisonTableProps) {
  const competitorLabel = themLabel ?? competitor

  return (
    <div className="w-full">
      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-xl border border-border-subtle">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-border-subtle">
              <th className="font-display font-semibold text-sm text-ink-muted px-6 py-4 w-[30%] bg-[#f3f0e8]">
                Feature
              </th>
              <th className="font-display font-semibold text-sm text-[#1d7a4a] px-6 py-4 w-[35%] bg-[#f0faf4]">
                {usLabel}
              </th>
              <th className="font-display font-semibold text-sm text-ink-muted px-6 py-4 w-[35%] bg-[#f3f0e8]">
                {competitorLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.feature}
                className={`border-b border-border-subtle last:border-0 ${i % 2 === 0 ? 'bg-white' : 'bg-[#fafaf8]'}`}
              >
                <td className="px-6 py-4 font-sans text-sm font-semibold text-ink align-top">
                  {row.feature}
                </td>
                <td className="px-6 py-4 align-top bg-[#f7fbf8]">
                  <CellValue value={row.us} />
                </td>
                <td className="px-6 py-4 align-top">
                  <CellValue value={row.them} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-4">
        {rows.map((row) => (
          <div
            key={row.feature}
            className="rounded-xl border border-border-subtle overflow-hidden bg-white"
          >
            <div className="px-4 py-3 bg-[#f3f0e8] border-b border-border-subtle">
              <span className="font-sans text-sm font-semibold text-ink">{row.feature}</span>
            </div>
            <div className="grid grid-cols-2">
              <div className="px-4 py-3 bg-[#f7fbf8] border-r border-border-subtle">
                <p className="font-sans text-[10px] font-semibold text-[#1d7a4a] uppercase tracking-wide mb-1.5">
                  {usLabel}
                </p>
                <CellValue value={row.us} />
              </div>
              <div className="px-4 py-3">
                <p className="font-sans text-[10px] font-semibold text-ink-muted uppercase tracking-wide mb-1.5">
                  {competitorLabel}
                </p>
                <CellValue value={row.them} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
