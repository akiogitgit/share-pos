import Image from 'next/image'
import { FC, useMemo } from 'react'

type Props = {
  id: number
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  radius?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  keyword?:
    | '404'
    | 'mp'
    | 'identicon'
    | 'monsterid'
    | 'wavatar'
    | 'retro'
    | 'robohash'
    | 'blank'
}

export const Avatar: FC<Props> = ({
  id,
  size = 'md',
  radius = 'xl',
  keyword = 'retro',
}) => {
  const sizePx = useMemo(() => {
    switch (size) {
      case 'xs':
        return 16
      case 'sm':
        return 26
      case 'md':
        return 38
      case 'lg':
        return 56
      case 'xl':
        return 84
    }
  }, [size])

  const radiusClass = useMemo(() => {
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

  return (
    <Image
      src={`https://www.gravatar.com/avatar/${id}/?d=${keyword}`}
      width={sizePx}
      height={sizePx}
      alt=''
      className={`${radiusClass}`}
    />
  )
}
