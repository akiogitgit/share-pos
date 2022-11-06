import { FC } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'reset' | 'submit'
  color?: 'red' | 'blue' | 'gray'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'light' | 'filled'
  animate?: boolean
  compact?: boolean
  fullWidth?: boolean
  rightIcon?: React.ReactElement
  leftIcon?: React.ReactElement
  onClick?: () => void
}

export const Button: FC<Props> = ({
  children,
  className,
  type,
  color = 'red',
  size = 'sm',
  radius = 'sm',
  variant = 'filled',
  animate,
  compact,
  fullWidth,
  rightIcon,
  leftIcon,
  onClick,
}) => {
  const defaultClass =
    'duration-300 font-bold flex items-center justify-center gap-1 '

  // tailwindで使うためコメントで書く
  // bg-red-50 bg-blue-50 bg-gray-50 bg-red-100 bg-blue-100 bg-gray-100 bg-red-500 bg-blue-500 bg-gray-500 text-red-500 text-blue-500 text-gray-500 border-red-500 border-blue-500 border-gray-500 hover:bg-red-50 hover:bg-blue-50 hover:bg-gray-50 hover:bg-red-100 hover:bg-blue-100 hover:bg-gray-100 hover:bg-red-500 hover:bg-blue-500 hover:bg-gray-500 hover:text-red-500 hover:text-blue-500 hover:text-gray-500 hover:border-red-500 hover:border-blue-500 hover:border-gray-500

  const colorFilled = `bg-${color}-500 text-white border-1 border-${color}-500`
  const colorLight = `bg-${color}-50 text-${color}-500 border-1 border-${color}-50`
  const colorOutline = `bg-white text-${color}-500 border-1 border-${color}-500`

  const colorClass = (() => {
    switch (variant) {
      case 'filled':
        return colorFilled
      case 'light':
        return colorLight
      case 'outline':
        return colorOutline
    }
  })()

  const animateClass = (() => {
    if (!animate) {
      switch (variant) {
        case 'filled':
          return `hover:bg-opacity-80`
        case 'light':
          return `hover:bg-${color}-100`
        case 'outline':
          return `hover:bg-${color}-50`
      }
    }

    switch (variant) {
      case 'filled':
        return `hover:text-${color}-500 hover:bg-white`
      case 'light':
        return `hover:bg-${color}-500 hover:text-white`
      case 'outline':
        return `hover:bg-${color}-500 hover:text-white`
    }
  })()

  const sizeClass = (() => {
    if (compact) {
      switch (size) {
        case 'xs':
          return 'text-12px py-4px px-7px'
        case 'sm':
          return 'text-14px py-5px px-8px'
        case 'md':
          return 'text-16px py-6px px-10px'
        case 'lg':
          return 'text-18px py-7px px-12px'
        case 'xl':
          return 'text-20px py-9px px-14px'
      }
    }
    switch (size) {
      case 'xs':
        return 'text-12px py-8px px-14px'
      case 'sm':
        return 'text-14px py-10px px-18px'
      case 'md':
        return 'text-16px py-12px px-22px'
      case 'lg':
        return 'text-18px py-15px px-26px'
      case 'xl':
        return 'text-20px py-19px px-32px'
    }
  })()

  const fullWidthClass = fullWidth ? 'w-full' : ''

  const RadiusClass = (() => {
    switch (radius) {
      case 'sm':
        return 'rounded-3px'
      case 'md':
        return 'rounded-7px'
      case 'lg':
        return 'rounded-15px'
      case 'xl':
        return 'rounded-full'
    }
  })()

  const allClass = `${defaultClass} ${className} ${colorClass} ${animateClass} ${sizeClass} ${RadiusClass} ${fullWidthClass}`

  return (
    <button className={allClass} onClick={onClick} type={type}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
