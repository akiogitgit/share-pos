import { defineConfig } from 'windicss/helpers'
import { accent, danger, primary, secondary } from './src/utils/theme'

export default defineConfig({
  extract: {
    include: ['**/*.{jsx,tsx,css}'],
    exclude: ['node_modules', '.git', '.next'],
  },
  theme: {
    extend: {
      // screens: {
      //   sm: '640px',
      //   md: '768px',
      //   lg: '1024px',
      //   xl: '1280px',
      //   '2xl': '1536px',
      // },
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
      boxShadow: {
        outline: '0 3px 12px -1px #04253f40',
      },
    },
  },
})
