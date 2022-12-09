const base = {
  green: '#0b7e7f',
  lightGreen: '#dfecee',
  red: '#ef4444',
  yellow: '#F6C445',
  lightYellow: '#fce9b9',
} as const

export const primary = {
  light: base.lightGreen,
  dark: base.green,
} as const

export const accent = {
  light: base.lightGreen,
  dark: base.yellow,
} as const
