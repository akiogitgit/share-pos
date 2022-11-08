import { FC, useMemo } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'reset' | 'submit'
  color?: 'red' | 'blue' | 'gray'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'light' | 'filled' | 'default'
  animate?: boolean
  compact?: boolean
  fullWidth?: boolean
  component?: 'button' | 'a' // ここやる-------------
  href?: string
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
  radius = 'md',
  variant = 'filled',
  animate,
  compact,
  fullWidth,
  component = 'button',
  href,
  rightIcon,
  leftIcon,
  onClick,
}) => {
  // tailwindで使うためコメントで書く
  // bg-red-50 bg-blue-50 bg-gray-50 bg-red-100 bg-blue-100 bg-gray-100 bg-red-500 bg-blue-500 bg-gray-500 text-red-500 text-blue-500 text-gray-500 border-red-500 border-blue-500 border-gray-500 hover:bg-red-50 hover:bg-blue-50 hover:bg-gray-50 hover:bg-red-100 hover:bg-blue-100 hover:bg-gray-100 hover:bg-red-500 hover:bg-blue-500 hover:bg-gray-500 hover:text-red-500 hover:text-blue-500 hover:text-gray-500 hover:border-red-500 hover:border-blue-500 hover:border-gray-500

  const defaultClass =
    'font-bold flex items-center justify-center gap-1 cursor-pointer'

  const colorClass = useMemo(() => {
    switch (variant) {
      case 'filled':
        return `bg-${color}-500 text-white border-1 border-${color}-500`
      case 'light':
        return `bg-${color}-50 text-${color}-500 border-1 border-${color}-50`
      case 'outline':
        return `bg-white text-${color}-500 border-1 border-${color}-500`
    }
  }, [color, variant])

  const animateClass = useMemo(() => {
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
        return `duration-300 hover:text-${color}-500 hover:bg-white`
      case 'light':
        return `duration-300 hover:bg-${color}-500 hover:text-white`
      case 'outline':
        return `duration-300 hover:bg-${color}-500 hover:text-white`
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

  // border border-white出来る
  // padding margin 出来ない
  if (component === 'a') {
    return (
      <a className={buttonClass} href={href} onClick={onClick} type={type}>
        <span className={spanClass}>
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      </a>
    )
  }
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
