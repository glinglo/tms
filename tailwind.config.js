/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#f9f7f3',
        'cream-dark': '#f3f0e8',
        brand: '#ea2804',
        'brand-dark': '#c01f00',
        ink: '#202020',
        'ink-muted': '#575757',
        'ink-faint': '#6a6a6a',
        'border-subtle': 'rgba(32,32,32,0.12)',
      },
      fontFamily: {
        display: ["'Bricolage Grotesque'", 'sans-serif'],
        sans: ["'Geist'", "'Inter'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      borderRadius: {
        pill: '9999px',
      },
    },
  },
  plugins: [],
}
