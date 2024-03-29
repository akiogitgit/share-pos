import { defineConfig } from 'windicss/helpers'
import {
  accent,
  danger,
  primary,
  rounded,
  secondary,
  fontSize,
  lineHeight,
} from './src/utils/theme'

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
        sm: [fontSize.sm, lineHeight.sm],
        md: [fontSize.md, lineHeight.md],
        lg: [fontSize.lg, lineHeight.lg],
        xl: [fontSize.xl, lineHeight.xl],
        '2xl': [fontSize['2xl'], lineHeight['2xl']],
      },
      lineHeight: {
        sm: fontSize.sm,
        md: fontSize.md,
        lg: fontSize.lg,
        xl: fontSize.xl,
        '2xl': fontSize['2xl'],
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
      width: {
        fit: 'fit-content',
      },
    },
  },
})
