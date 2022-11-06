import { FC } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'reset' | 'submit'
  color?: 'red' | 'blue' | 'gray'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
  variant?: 'outline' | 'light' | 'filled'
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
  fullWidth,
  rightIcon,
  leftIcon,
  onClick,
}) => {
  const defaultClass =
    'duration-300 font-bold flex items-center justify-center gap-1 '

  // const bg50 = useMemo(() => {
  //   if (color === 'red') return 'bg-red-50'
  //   if (color === 'blue') return 'bg-blue-50'
  //   if (color === 'gray') return 'bg-gray-50'
  // }, [color])
  // const bg100 = useMemo(() => {
  //   if (color === 'red') return 'bg-red-100'
  //   if (color === 'blue') return 'bg-blue-100'
  //   if (color === 'gray') return 'bg-gray-100'
  // }, [color])
  // const bg500 = useMemo(() => {
  //   if (color === 'red') return 'bg-red-500'
  //   if (color === 'blue') return 'bg-blue-500'
  //   if (color === 'gray') return 'bg-gray-500'
  // }, [color])
  // const text500 = useMemo(() => {
  //   if (color === 'red') return 'text-red-500'
  //   if (color === 'blue') return 'text-blue-500'
  //   if (color === 'gray') return 'text-gray-500'
  // }, [color])
  // const border500 = useMemo(() => {
  //   if (color === 'red') return 'border-red-500'
  //   if (color === 'blue') return 'border-blue-500'
  //   if (color === 'gray') return 'border-gray-500'
  // }, [color])

  // const hoverbg50 = useMemo(() => {
  //   if (color === 'red') return 'hover:bg-red-50'
  //   if (color === 'blue') return 'hover:bg-blue-50'
  //   if (color === 'gray') return 'hover:bg-gray-50'
  // }, [color])
  // const hoverbg100 = useMemo(() => {
  //   if (color === 'red') return 'hover:bg-red-100'
  //   if (color === 'blue') return 'hover:bg-blue-100'
  //   if (color === 'gray') return 'hover:bg-gray-100'
  // }, [color])
  // const hoverbg500 = useMemo(() => {
  //   if (color === 'red') return 'hover:bg-red-500'
  //   if (color === 'blue') return 'hover:bg-blue-500'
  //   if (color === 'gray') return 'hover:bg-gray-500'
  // }, [color])
  // const hovertext500 = useMemo(() => {
  //   if (color === 'red') return 'hover:text-red-500'
  //   if (color === 'blue') return 'hover:text-blue-500'
  //   if (color === 'gray') return 'hover:text-gray-500'
  // }, [color])
  // const hoverborder500 = useMemo(() => {
  //   if (color === 'red') return 'hover:border-red-500'
  //   if (color === 'blue') return 'hover:border-blue-500'
  //   if (color === 'gray') return 'hover:border-gray-500'
  // }, [color])

  const colorFilled = `bg-${color}-500 text-white border-1 border-${color}-500`
  const colorLight = `bg-${color}-50 text-${color}-500 border-1 border-${color}-50`
  const colorOutline = `bg-white text-${color}-500 border-1 border-${color}-500`
  // const colorFilled = `${bg500} text-white border-1 border-${color}-500`
  // const colorLight = `${bg50} text-${color}-500 border-1 border-${color}-50`
  // const colorOutline = `bg-white text-${color}-500 border-1 border-${color}-500`

  // const colorFilled = useMemo(() => {
  //   const common = 'text-white border-1'
  //   switch (color) {
  //     case 'red':
  //       return `${common} bg-red-500 border-red-500`
  //     case 'blue':
  //       return `${common} bg-blue-500 border-blue-500`
  //     case 'gray':
  //       return `${common} bg-gray-500 border-gray-500`
  //   }
  // }, [color])

  // const colorLight = `bg-${color}-50 text-${color}-500 border-1 border-${color}-50`
  // const colorOutline = `bg-white text-${color}-500 border-1 border-${color}-500`

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
