import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
import { JumpToCreatePostButton } from 'components/shares/JumpToCreatePostButton'

import { Button } from 'components/shares/base/Button'
import { useGetApi } from 'hooks/useApi'
import { User } from 'types/user/user'

export const Footer: FC = () => {
  const pathname = usePathname()
  const { data: user, error } = useGetApi<User>('/users/me')

  // ログインしていない時だけ表示
  if (error) {
    return (
      <footer className=' bg-primary-dark w-full py-2 bottom-0 z-2 fixed'>
        <div className='flex pr-4 gap-3 justify-end sm:justify-center'>
          <Link href='/login'>
            <Button
              radius='xl'
              compact
              className='border border-white rounded-full'
            >
              ログイン
            </Button>
          </Link>
          <Link href='/signup'>
            <Button variant='outline' radius='xl' compact>
              新規登録
            </Button>
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
      default: <AiOutlineHomeIcon className='h-6 w-6' />,
      selected: <AiFillHomeIcon className='h-6 w-6' />,
    },
    {
      href: '/bookmark',
      default: <IoBookOutlineIcon className='h-6 w-6' />,
      selected: <IoBookIcon className='h-6 w-6' />,
    },
    {
      // href: 'myPage',
      href: `/users/${user?.id}`,
      default: <AiOutlineUserIcon className='h-6 w-6' />,
      selected: <FaUserIcon className='h-6 w-6' />,
    },
  ]

  return (
    <footer className='sm:hidden'>
      {pathname !== '/create' && <JumpToCreatePostButton />}

      <nav className='bg-white flex w-full bottom-0 z-2 justify-around fixed'>
        {menuIcons.map(menuIcon => (
          <Link href={menuIcon.href} key={menuIcon.href}>
            <div
              className={`cursor-pointer pt-2 py-1 px-3 ${
                pathname === menuIcon.href && 'text-primary-dark'
              }`}
            >
              {pathname === menuIcon.href
                ? menuIcon.selected
                : menuIcon.default}
            </div>
          </Link>
        ))}
      </nav>
    </footer>
  )
}
