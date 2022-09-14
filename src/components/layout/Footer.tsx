import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import {
  AiFillHome as AiFillHomeIcon,
  AiOutlineHome as AiOutlineHomeIcon,
  AiOutlineUser as AiOutlineUserIcon,
} from 'react-icons/ai'
import { FaUser } from 'react-icons/fa'
import {
  IoBook as IoBookIcon,
  IoBookOutline as IoBookOutlineIcon,
} from 'react-icons/io5'

const menus = [
  { path: '/', icon: <AiOutlineHomeIcon />, selectedIcon: <AiFillHomeIcon /> },
  {
    path: '/bookmark',
    icon: <IoBookOutlineIcon />,
    selectedIcon: <IoBookIcon />,
  },
  {
    path: '/myPage',
    icon: <AiOutlineUserIcon />,
    selectedIcon: <FaUser />,
  },
]

export const Footer: FC = () => {
  const router = useRouter()

  return (
    <footer className='sm:hidden'>
      {router.pathname !== '/create' && (
        <button className='border rounded-full font-bold bg-red-500 border-red-500 text-white text-right p-2 right-20px bottom-50px text-30px z-100 fixed'>
          <Link href='/create'>＋</Link>
        </button>
      )}
      <nav className='bg-white flex w-full bottom-0 text-25px z-100 justify-around fixed'>
        {menus.map((menu) => (
          <Link href={menu.path} key={menu.path}>
            <div
              className={`cursor-pointer py-2 px-3 ${
                router.pathname === menu.path && 'text-red-500'
              }`}
            >
              {router.pathname === menu.path ? menu.selectedIcon : menu.icon}
            </div>
          </Link>
        ))}
      </nav>
    </footer>
  )
}
