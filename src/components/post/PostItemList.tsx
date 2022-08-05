import { FC, ReactNode } from 'react'

type Props = {
  children: ReactNode[]
}

export const PostItemList: FC<Props> = ({ children }) => {
  return (
    <ul className='flex flex-wrap gap-3 justify-center'>
      {children.map((post, i) => (
        <li className='w-100%' key={i}>
          {post}
        </li>
      ))}
    </ul>
  )
}
