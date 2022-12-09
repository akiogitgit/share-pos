import { defineConfig } from 'windicss/helpers'
import { accent, danger, primary } from './src/utils/theme'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  theme: {
    extend: {
      colors: {
        primary: {
          light: primary.light,
          dark: primary.dark,
          DEFAULT: primary.dark,
        },
        accent: {
          light: accent.light,
          dark: accent.dark,
          DEFAULT: accent.dark,
        },
        danger: {
          light: danger.light,
          dark: danger.dark,
          DEFAULT: danger.dark,
        },
      },
      fontFamily: {
        cantoreOne: ['var(--font-cantoreOne)'],
      },
    },
  },
})

// base: 'rgb(254 226 226)',  92%, コントラスト 17.19, 1.19 #fee2e2
// primary: {
//   light: 'rgb(252 165 165)',
//   DEFAULT: 'rgb(239 68 68)',
// },
// secondary: 'rgb(59 130 246)',
// base: '#d1fae5',
// base: '#e6f2f2', // zennと同じ明るさ95%
// base: '#c6dce0', // 見やすい 86%
//
// base: '#dfecee', // 93%, 1.18
// primary: {
//   light: '#a4cfcf',
//   DEFAULT: '#0b7e7f',
// },
// secondary: 'rgb(59 130 246)',
