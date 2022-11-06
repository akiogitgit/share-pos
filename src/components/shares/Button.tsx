import { FC } from 'react'

type Props = {
  children: React.ReactNode
  color?: 'red' | 'blue' | 'gray'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  rightIcon?: React.ReactElement
  leftIcon?: React.ReactElement
}

export const Button: FC<Props> = ({
  children,
  rightIcon,
  leftIcon,
  color = 'red',
  size = 'sm',
  radius = 'sm',
}) => {
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
        return 'text-12px py-9px px-16px'
      case 'sm':
        return 'text-14px py-11px px-20px'
      case 'md':
        return 'text-16px py-13px px-24px'
      case 'lg':
        return 'text-18px py-16px px-28px'
      case 'xl':
        return 'text-20px py-20px px-35px'
    }
  })()

  const RadiusClass = (() => {
    switch (size) {
      case 'sm':
        return 'text-sm py-0.5 px-1'
      case 'md':
        return 'text-md py-1 px-2'
      case 'lg':
        return 'bg-gray-500 text-white'
    }
  })()

  return (
    // <button className='bg-primary border border-primary flex rounded-7px text-white py-1 px-2 gap-1 duration-300 items-center hover:(bg-white text-primary) '>
    // <button className={`${[colorClass, sizeClass]}`}>
    <button className={`${colorClass} ${sizeClass} ${RadiusClass}`}>
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
