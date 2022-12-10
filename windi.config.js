import { defineConfig } from 'windicss/helpers'
import { accent, danger, primary, secondary } from './src/utils/theme'

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
        },
        accent: {
          light: accent.light,
          dark: accent.dark,
        },
        danger: {
          light: danger.light,
          dark: danger.dark,
        },
        secondary: {
          light: secondary.light,
          dark: secondary.dark,
        },
      },
      fontFamily: {
        cantoreOne: ['var(--font-cantoreOne)'],
      },
    },
  },
})
