import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import {
  AiFillHome as AiFillHomeIcon,
  AiOutlineHome as AiOutlineHomeIcon,
  AiOutlineUser as AiOutlineUserIcon,
} from 'react-icons/ai'
import { FaUser as FaUserIcon } from 'react-icons/fa'
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
    return <></>
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
        <button className='border rounded-full font-bold bg-red-500 border-red-500 text-white text-right p-2 right-20px bottom-50px text-30px z-100 fixed'>
          <Link href='/create'>＋</Link>
        </button>
      )}
      <nav className='bg-white flex w-full bottom-0 text-25px z-100 justify-around fixed'>
        {menuIcons.map((menuIcon) => (
          <Link href={menuIcon.href} key={menuIcon.href}>
            <div
              className={`cursor-pointer py-2 px-3 ${
                router.pathname === menuIcon.href && 'text-red-500'
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
