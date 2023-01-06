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

// rounded
export const rounded = {
  xs: '0x',
  sm: '3px',
  md: '7px',
  lg: '15px',
  xl: '100%',
}
