import { FC, useMemo } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'reset' | 'submit'
  color?: 'primary' | 'accent'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'light' | 'filled' | 'default'
  animate?: boolean
  compact?: boolean
  fullWidth?: boolean
  component?: 'button'
  href?: string
  rightIcon?: React.ReactElement
  leftIcon?: React.ReactElement
  onClick?: () => void
}

export const Button: FC<Props> = ({
  children,
  className,
  type,
  color = 'primary',
  size = 'sm',
  radius = 'md',
  variant = 'filled',
  animate,
  compact,
  fullWidth,
  rightIcon,
  leftIcon,
  onClick,
}) => {
  // tailwindで使うためコメントで書く
  // bg-red-50 bg-blue-50 bg-gray-50 bg-red-100 bg-blue-100 bg-gray-100 bg-red-500 bg-blue-500 bg-gray-500 text-red-500 text-blue-500 text-gray-500 border-red-500 border-blue-500 border-gray-500 hover:bg-red-50 hover:bg-blue-50 hover:bg-gray-50 hover:bg-red-100 hover:bg-blue-100 hover:bg-gray-100 hover:bg-red-500 hover:bg-blue-500 hover:bg-gray-500 hover:text-red-500 hover:text-blue-500 hover:text-gray-500 hover:border-red-500 hover:border-blue-500 hover:border-gray-500 shadow-red-500/20 shadow-blue-500/20 shadow-gray-500/20 ring-red-300/40 ring-blue-300/40 ring-gray-300/40

  // bg-primary-dark border-primary-dark text-primary-dark bg-primary-light
  // hover:text-primary-dark hover:bg-primary-light hover:bg-primary-dark

  // bg-accent-dark border-accent-dark text-accent-dark bg-accent-light
  // hover:text-accent-dark hover:bg-accent-light hover:bg-accent-dark

  const defaultClass =
    'font-bold flex items-center justify-center gap-1 cursor-pointer'

  const colorClass = useMemo(() => {
    switch (variant) {
      case 'filled':
        return `bg-${color}-dark text-white border-1 border-${color}-dark`
      case 'light':
        return `bg-${color}-light text-${color}-dark border-1 border-${color}-light`
      case 'outline':
        return `bg-white text-${color}-dark border-1 border-${color}-dark`
      case 'default':
        return `shadow-md shadow-${color}-dark/20 ring-1 ring-${color}-light/40 text-${color}-dark`
    }
  }, [color, variant])

  const animateClass = useMemo(() => {
    if (!animate) {
      switch (variant) {
        case 'filled':
          return `hover:bg-opacity-80`
        case 'light':
          return `hover:bg-${color}-light`
        case 'outline':
          return `hover:bg-${color}-light`
      }
    }
    switch (variant) {
      case 'filled':
        return `duration-300 hover:text-${color}-dark hover:bg-white`
      case 'light':
        return `duration-300 hover:bg-${color}-dark hover:text-white`
      case 'outline':
        return `duration-300 hover:bg-${color}-dark hover:text-white`
    }
  }, [animate, color, variant])

  const sizeClass = useMemo(() => {
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
  }, [compact, size])

  const fullWidthClass = useMemo(() => (fullWidth ? 'w-full' : ''), [fullWidth])

  const RadiusClass = useMemo(() => {
    switch (radius) {
      case 'xs':
        return ''
      case 'sm':
        return 'rounded-3px'
      case 'md':
        return 'rounded-7px'
      case 'lg':
        return 'rounded-15px'
      case 'xl':
        return 'rounded-full'
    }
  }, [radius])

  const buttonClass = `${className} ${fullWidthClass}`
  const spanClass = `${defaultClass} ${colorClass} ${animateClass} ${sizeClass} ${RadiusClass} ${fullWidthClass} `

  return (
    <button className={buttonClass} onClick={onClick} type={type}>
      <span className={spanClass}>
        {leftIcon}
        {children}
        {rightIcon}
      </span>
    </button>
  )
}

// const allClass = `${defaultClass} ${colorClass} ${animateClass} ${sizeClass} ${RadiusClass} ${fullWidthClass} ${borderWhiteClass}`

// // border border-white出来る
// // padding margin 出来ない
// return (
//   <button className={className} onClick={onClick} type={type}>
//     <span className={allClass}>
//       {leftIcon}
//       {children}
//       {rightIcon}
//     </span>
//   </button>
// )
