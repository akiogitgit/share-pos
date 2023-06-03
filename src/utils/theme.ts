// color
const base = {
  green: '#0b7e7f',
  lightGreen: '#dfecee',
  orange: '#f68745',
  lightOrange: '#fde1d1',
  red: '#ef4444',
  lightRed: '#fee2e2',
  gray: '#6b7280',
  lightGray: '#f3f4f6',
} as const

export const primary = {
  light: base.lightGreen,
  dark: base.green,
} as const

export const accent = {
  light: base.lightOrange,
  dark: base.orange,
} as const

export const danger = {
  light: base.lightRed,
  dark: base.red,
} as const

export const secondary = {
  light: base.lightGray,
  dark: base.gray,
} as const

export const rounded = {
  xs: '0x',
  sm: '3px',
  md: '7px',
  lg: '15px',
  xl: '100%',
} as const

export const fontSize = {
  sm: '14px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '30px',
} as const

export const lineHeight = {
  sm: '20px',
  md: '24px',
  lg: '28px',
  xl: '32px',
  '2xl': '43px',
} as const
