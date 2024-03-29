import { FC, useMemo } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'reset' | 'submit'
  color?: 'primary' | 'accent' | 'danger' | 'secondary'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'outline' | 'light' | 'filled' | 'neumorphism'
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
  // bg-primary-dark border-primary-dark text-primary-dark bg-primary-light
  // hover:text-primary-dark hover:bg-primary-light hover:bg-primary-dark

  // bg-accent-dark border-accent-dark text-accent-dark bg-accent-light
  // hover:text-accent-dark hover:bg-accent-light hover:bg-accent-dark

  // bg-danger-dark border-danger-dark text-danger-dark bg-danger-light
  // hover:text-danger-dark hover:bg-danger-light hover:bg-danger-dark

  // bg-secondary-dark border-secondary-dark text-secondary-dark bg-secondary-light
  // hover:text-secondary-dark hover:bg-secondary-light hover:bg-secondary-dark

  // shadow-primary-dark/30 shadow-accent-dark/20 shadow-danger-dark/20 shadow-secondary-dark/20
  // ring-primary-light/40 ring-accent-light/40 ring-danger-light/40 ring-secondary-light/40

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
      case 'neumorphism':
        return `shadow-md shadow-${color}-dark/20 border-t border-white text-${color}-dark`
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
          return 'text-sm leading-sm py-4px px-7px'
        case 'sm':
          return 'text-md leading-md py-5px px-8px'
        case 'md':
          return 'text-md leading-md py-6px px-10px'
        case 'lg':
          return 'text-lg leading-lg py-7px px-12px'
        case 'xl':
          return 'text-lg leading-lg py-9px px-14px'
      }
    }
    switch (size) {
      case 'xs':
        return 'text-sm leading-sm py-8px px-14px'
      case 'sm':
        return 'text-md leading-md py-10px px-18px'
      case 'md':
        return 'text-md leading-md py-12px px-22px'
      case 'lg':
        return 'text-lg leading-lg py-15px px-26px'
      case 'xl':
        return 'text-lg leading-lg py-19px px-32px'
    }
  }, [compact, size])

  const fullWidthClass = useMemo(() => (fullWidth ? 'w-full' : ''), [fullWidth])

  const RadiusClass = useMemo(() => {
    switch (radius) {
      case 'sm':
        return 'rounded-sm'
      case 'md':
        return 'rounded-md'
      case 'lg':
        return 'rounded-lg'
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
