import { FC, useMemo } from 'react'
import { RiLoader4Fill as RiLoader4FillIcon } from 'react-icons/ri'

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export const Loader: FC<Props> = ({ size = 'md' }) => {
  const sizeClass = useMemo(() => {
    switch (size) {
      case 'xs':
        return 'h-18px w-18px'
      case 'sm':
        return 'h-22px w-22px'
      case 'md':
        return 'h-36px w-36px'
      case 'lg':
        return 'h-44px w-44px'
      case 'xl':
        return 'h-58px w-58px'
    }
  }, [size])

  return (
    <RiLoader4FillIcon
      className={`animate-spin ${sizeClass}`}
      aria-label='ローディングちゅう'
    />
  )
}
