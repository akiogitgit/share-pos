import { FC } from 'react'

type Props = {
  children: React.ReactNode
  className?: string
  type?: 'button' | 'reset' | 'submit'
  color?: 'red' | 'blue' | 'gray'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  animate?: boolean
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
  animate,
  fullWidth,
  rightIcon,
  leftIcon,
  onClick,
}) => {
  const defaultClass =
    'font-bold flex items-center justify-center gap-1 hover:bg-opacity-80'

  const colorClass = (() => {
    switch (color) {
      case 'red':
        return 'bg-red-500 text-white'
      case 'blue':
        return 'bg-blue-500 text-white'
      case 'gray':
        return 'bg-gray-500 text-white'
    }
  })()

  const sizeClass = (() => {
    switch (size) {
      case 'xs':
        return 'text-12px py-9px px-15px'
      case 'sm':
        return 'text-14px py-11px px-19px'
      case 'md':
        return 'text-16px py-13px px-23px'
      case 'lg':
        return 'text-18px py-16px px-27px'
      case 'xl':
        return 'text-20px py-20px px-33px'
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

  const allClass = `${defaultClass} ${className} ${colorClass} ${sizeClass} ${RadiusClass} ${fullWidthClass}`

  return (
    // <button className='bg-primary border border-primary flex rounded-7px text-white py-1 px-2 gap-1 duration-300 items-center hover:(bg-white text-primary) '>
    // <button className={`${[colorClass, sizeClass]}`}>
    <button className={allClass} onClick={onClick} type={type}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
