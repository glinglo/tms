const HEADERS = ['Business Name', 'Phone', 'Email', 'Address', 'Website', 'Rating', 'Reviews', 'Category']

const ROWS = [
  ['Mario\'s Italian Kitchen', '+1 212-555-0147', 'info@marioskitchen.com',  '234 Mulberry St, New York, NY 10012', 'marioskitchen.com',   '4.6', '312', 'Italian Restaurant'],
  ['Sakura Sushi Bar',         '+1 212-555-0283', 'contact@sakurasushi.nyc', '89 St Marks Pl, New York, NY 10003',  'sakurasushi.nyc',     '4.4', '187', 'Sushi Restaurant'],
  ['The Burger Joint',         '+1 212-555-0391', 'hello@theburgerjoint.co', '512 W 38th St, New York, NY 10018',   'theburgerjoint.co',   '4.2', '429', 'Hamburger Restaurant'],
  ['Casa Oaxaca',              '+1 212-555-0455', 'reservas@casaoaxaca.com', '156 E Houston St, New York, NY 10002','casaoaxaca.com',      '4.7', '256', 'Mexican Restaurant'],
  ['Golden Dragon Palace',     '+1 212-555-0519', '',                        '78 Mott St, New York, NY 10013',      'goldendragonnyc.com', '4.3', '541', 'Chinese Restaurant'],
]

export default function CSVPreview() {
  return (
    <div>
      <div className="overflow-x-auto rounded-[10px] border border-[rgba(32,32,32,0.12)] shadow-sm bg-white">
        {/* Spreadsheet toolbar chrome */}
        <div className="flex items-center gap-2 px-4 py-[9px] border-b border-[rgba(32,32,32,0.08)] bg-[#f5f5f3]">
          <div className="flex gap-[6px]">
            <span className="w-[11px] h-[11px] rounded-full bg-[#ff5f57] inline-block" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#febc2e] inline-block" />
            <span className="w-[11px] h-[11px] rounded-full bg-[#28c840] inline-block" />
          </div>
          <span className="font-mono text-[11px] text-[rgba(32,32,32,0.4)] ml-2">restaurants_new_york.csv</span>
        </div>

        <table className="w-full border-collapse" style={{ minWidth: '900px' }}>
          <thead>
            <tr className="bg-[#eef2ff]">
              {/* Row number column */}
              <th className="font-mono text-[10px] text-[rgba(32,32,32,0.3)] py-[8px] px-3 w-8 border-r border-[rgba(32,32,32,0.08)] text-right select-none" />
              {HEADERS.map((h) => (
                <th
                  key={h}
                  className="font-mono text-[11px] font-semibold text-[#3730a3] text-left py-[8px] px-3 border-r border-[rgba(32,32,32,0.08)] last:border-r-0 whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, ri) => (
              <tr
                key={ri}
                className={`border-t border-[rgba(32,32,32,0.06)] ${ri % 2 === 0 ? 'bg-white' : 'bg-[#fafaf9]'} hover:bg-[#f0f4ff] transition-colors duration-75`}
              >
                <td className="font-mono text-[10px] text-[rgba(32,32,32,0.25)] py-[7px] px-3 border-r border-[rgba(32,32,32,0.06)] text-right select-none">
                  {ri + 2}
                </td>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className="font-mono text-[11.5px] text-[#1e293b] py-[7px] px-3 border-r border-[rgba(32,32,32,0.06)] last:border-r-0 whitespace-nowrap"
                  >
                    {cell === '' ? (
                      <span className="text-[rgba(32,32,32,0.25)] italic text-[11px]">empty</span>
                    ) : ci === 5 ? (
                      <span className="inline-flex items-center gap-1">
                        <span className="text-[#f59e0b]">★</span>
                        {cell}
                      </span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer indicator */}
      <div className="flex items-center justify-between mt-3 px-1">
        <p className="font-mono text-[11px] text-[rgba(32,32,32,0.4)] m-0">
          Showing rows 2 — 6 of <strong className="text-[rgba(32,32,32,0.6)]">348</strong>
        </p>
        <span className="font-mono text-[10px] text-[rgba(32,32,32,0.3)] bg-[rgba(32,32,32,0.05)] rounded px-2 py-[2px]">
          UTF-8 · comma-separated
        </span>
      </div>
    </div>
  )
}
