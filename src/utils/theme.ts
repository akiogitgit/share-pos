const base = {
  green: '#0b7e7f',
  lightGreen: '#dfecee',
  red: '#ef4444',
  lightRed: '#fee2e2',
  yellow: '#F6C445',
  lightYellow: '#fce9b9',
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
