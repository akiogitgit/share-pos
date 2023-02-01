import { defineConfig } from 'windicss/helpers'
import { accent, danger, primary, rounded, secondary } from './src/utils/theme'

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
      fontSize: {
        sm: '14px',
        md: '16px',
        lg: '20px',
        xl: '24px',
        '2xl': '30px',
      },
      fontFamily: {
        cantoreOne: ['var(--font-cantoreOne)'],
      },
      boxShadow: {
        outline: '0 3px 12px -1px #04253f40',
      },
      borderRadius: {
        sm: rounded.sm,
        md: rounded.md,
        lg: rounded.lg,
      },
    },
  },
})
