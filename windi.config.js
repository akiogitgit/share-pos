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
      fontFamily: {
        anpan0: 'monospace',
        anpan1: ['Fira Code'],
        anpan2: ['Dancing Script'],
        anpan: ['Lora'],
        lora: ['var(--font-lora)'],
        kenia: ['var(--font-kenia)'],
        dancing: ['var(--font-dancing)'],
      },
    },
  },
})

// fontFamily: {
//   primary: ['var(--lora-font)', ...fontFamily.sans],
//   serif: ['var(--lora-font)', ...fontFamily.serif],
//   anpan:
//     'ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"',
//   anpan2: '"Fira Code", monospace',
// },
