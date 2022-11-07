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

import { Button } from 'components/shares/Button'
import { useGetApi } from 'hooks/useApi'
import { User } from 'types/user/user'

export const Footer: FC = () => {
  const router = useRouter()
  const { data: user, error } = useGetApi<User>('/users/me')

  // ログインしていない時だけ表示
  if (error) {
    return (
      <footer className=' bg-primary w-full py-2 bottom-0 z-2 fixed'>
        <div className='flex pr-4 gap-3 justify-end sm:justify-center'>
          <Link href='/login'>
            <Button
              radius='xl'
              size='md'
              compact
              component='a'
              className='border border-white rounded-full'
            >
              ログイン
            </Button>
          </Link>
          <Link href='/signup'>
            <Button
              variant='outline'
              radius='xl'
              size='md'
              compact
              component='a'
            >
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
        <Link href='/create'>
          <a className='bg-primary rounded-full font-bold text-white py-10px px-11.5px right-20px bottom-50px text-30px z-2 fixed'>
            <HiPaperAirplaneIcon className='h-7 transform w-7 rotate-90' />
          </a>
        </Link>
      )}
      <nav className='bg-white flex w-full bottom-0 text-25px z-2 justify-around fixed'>
        {menuIcons.map(menuIcon => (
          <Link href={menuIcon.href} key={menuIcon.href}>
            <a
              className={`cursor-pointer py-2 px-3 ${
                router.asPath === menuIcon.href && 'text-primary'
              }`}
            >
              {router.asPath === menuIcon.href
                ? menuIcon.selected
                : menuIcon.default}
            </a>
          </Link>
        ))}
      </nav>
    </footer>
  )
}
