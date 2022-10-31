import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import {
  AiFillHome as AiFillHomeIcon,
  AiOutlineHome as AiOutlineHomeIcon,
  AiOutlineUser as AiOutlineUserIcon,
} from 'react-icons/ai'
import { FaUser as FaUserIcon } from 'react-icons/fa'
import { HiPaperAirplane as HiPaperAirplaneIcon } from 'react-icons/hi'
import {
  IoBook as IoBookIcon,
  IoBookOutline as IoBookOutlineIcon,
} from 'react-icons/io5'

import { useGetApi } from 'hooks/useApi'
import { User } from 'types/user/user'

export const Footer: FC = () => {
  const router = useRouter()
  const { data: user, error } = useGetApi<User>('/users/me')

  // ログインしてる時だけ表示
  if (error) {
    return (
      <footer className=' bg-primary w-full py-2 bottom-0 z-2 fixed'>
        <div className='flex pr-4 gap-3 justify-end sm:justify-center'>
          <Link href='/login'>
            <a className='border-white border rounded-full font-bold text-white py-1 px-2 duration-300'>
              ログイン
            </a>
          </Link>
          <Link href='/signup'>
            <a className='bg-white border-primary border rounded-full font-bold text-primary py-1 px-2 duration-300'>
              新規登録
            </a>
          </Link>
        </div>
      </footer>
    )
  }

  const menuIcons: {
    href: string
    default: JSX.Element
    selected: JSX.Element
  }[] = [
    {
      href: '/',
      default: <AiOutlineHomeIcon />,
      selected: <AiFillHomeIcon />,
    },
    {
      href: '/bookmark',
      default: <IoBookOutlineIcon />,
      selected: <IoBookIcon />,
    },
    {
      // href: 'myPage',
      href: `/users/${user?.id}`,
      default: <AiOutlineUserIcon />,
      selected: <FaUserIcon />,
    },
  ]

  return (
    <footer className='sm:hidden'>
      {router.pathname !== '/create' && (
        <button className='bg-primary border border-primary rounded-full font-bold text-white text-right p-2 right-20px bottom-50px text-30px z-2 fixed'>
          <Link href='/create'>
            <HiPaperAirplaneIcon className='h-7 transform w-7 rotate-90' />
          </Link>
        </button>
      )}
      <nav className='bg-white flex w-full bottom-0 text-25px z-2 justify-around fixed'>
        {menuIcons.map(menuIcon => (
          <Link href={menuIcon.href} key={menuIcon.href}>
            <div
              className={`cursor-pointer py-2 px-3 ${
                router.pathname === menuIcon.href && 'text-primary'
              }`}
            >
              {router.pathname === menuIcon.href
                ? menuIcon.selected
                : menuIcon.default}
            </div>
          </Link>
        ))}
      </nav>
    </footer>
  )
}
