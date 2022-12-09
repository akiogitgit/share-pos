const base = {
  green: '#0b7e7f',
  lightGreen: '#dfecee',
  yellow: '#F6C445',
  lightYellow: '#fce9b9',
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
  light: base.lightYellow,
  dark: base.yellow,
} as const

export const danger = {
  light: base.lightRed,
  dark: base.red,
} as const

export const secondary = {
  light: base.lightGray,
  dark: base.gray,
} as const
