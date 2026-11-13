import type { Config } from 'tailwindcss'
export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { cream: '#FAF7F0', cream2: '#F3EFE6', forest: '#1E3F20', char: '#2C302E', sage: '#4A7C59', gold: '#C89B3C' },
    fontFamily: { head: ['var(--font-head)', 'sans-serif'], body: ['var(--font-body)', 'sans-serif'] }
  } },
  plugins: []
} satisfies Config
