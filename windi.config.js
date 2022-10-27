import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  theme: {
    extend: {
      colors: {
        base: 'rgb(254 226 226)',
        primary: {
          light: 'rgb(252 165 165)',
          DEFAULT: 'rgb(239 68 68)',
        },
        secondary: 'rgb(59 130 246)',
      },
    },
  },
})
