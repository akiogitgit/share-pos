import { FC, ReactNode } from 'react'
import { useCookies } from 'stores/useCookies'
import { deleteApi } from 'utils/api'

type Props = {
  children: ReactNode[]
}

export const PostItemList: FC<Props> = ({ children }) => {
  const { cookies } = useCookies('authInfo')
  const Click = async () => {
    try {
      const res = await deleteApi('/posts/103', undefined, cookies.authInfo)
      console.log(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    // <ul className='flex flex-col sm:(flex flex-wrap) '>
    <ul className='flex flex-wrap gap-6 justify-center'>
      {children.map((post, i) => (
        <li className='w-100%' key={i}>
          {post}
        </li>
      ))}
    </ul>
  )
}
