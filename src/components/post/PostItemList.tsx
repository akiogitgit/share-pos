import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode[]
  className?: string
}

export const PostItemList: FC<Props> = ({ children, className }) => {
  return (
    // <ul className='flex flex-wrap gap-3 justify-center'>
    <ul className={className}>
      {children.map((post, i) => (
        <li className='w-100%' key={i}>
          {post}
        </li>
      ))}
    </ul>
  )
}
