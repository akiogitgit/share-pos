import { ComponentProps, FC, useState } from 'react'

type StarProps = {
  color: 'bg-yellow-200' | 'bg-yellow-100' | ''
} & ComponentProps<'div'>
const Star: FC<StarProps> = ({ className, color, ...rest }) => {
  return (
    <div
      className={`${color} rounded-full h-8 w-8 border-1 border-black ${className}`}
      {...rest}
    />
  )
}

type PostStarProps = {
  evaluation: number
  onClick: (evaluation: number) => void
}
export const PostStars: FC<PostStarProps> = ({ evaluation, onClick }) => {
  const [stars, setStars] = useState(evaluation)
  const [isHovering, setIsHovering] = useState(false)
  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map(v => (
        <div
          key={v}
          className='p-2 group'
          onClick={() => onClick(v)}
          onMouseEnter={() => {
            setIsHovering(true)
            setStars(v)
          }}
          onMouseLeave={() => {
            setIsHovering(false)
            setStars(evaluation)
          }}
        >
          <Star
            className='group-hover:(transform scale-125) '
            color={v <= stars
              ? (isHovering ? 'bg-yellow-100' : 'bg-yellow-200')
              : ''}
          />
        </div>
      ))}
    </div>
  )
}
