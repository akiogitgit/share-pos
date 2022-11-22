import Link from 'next/link'
import { FC, useState } from 'react'
import { AiOutlineUser as AiOutlineUserIcon } from 'react-icons/ai'
import { FaUserCircle as FaUserCircleIcon } from 'react-icons/fa'
import {
  FiLogOut as FiLogOutIcon,
  FiSettings as FiSettingsIcon,
} from 'react-icons/fi'
import { HiOutlineBookOpen as HiOutlineBookOpenIcon } from 'react-icons/hi'

import { Avatar } from 'components/shares/Avatar'
import { useLogOut } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { User } from 'types/user/user'

export const DropDownMenu: FC = () => {
  const { logOut } = useLogOut()
  const { data: user } = useGetApi<User>('/users/me')

  const [isOpenMenu, setIsOpenMenu] = useState(false)

  return (
    <div>
      <div
        className='cursor-pointer flex'
        onClick={() => setIsOpenMenu(s => !s)}
      >
        {user ? (
          <Avatar id={user.id} />
        ) : (
          <FaUserCircleIcon className='h-9 w-9' />
        )}
      </div>

      {isOpenMenu && (
        <div className='relative'>
          <div
            onClick={() => setIsOpenMenu(false)}
            className='h-100vh top-0 left-0 w-100vw z-1 fixed'
            aria-hidden='true'
          />

          <div className='bg-white shadow-xl top-10px right-[-15px] w-40 z-200 absolute'>
            <Link href='/bookmark'>
              <a className='cursor-pointer py-2 pl-4 gap-2 hidden items-center sm:flex hover:bg-base'>
                <HiOutlineBookOpenIcon />
                ブックマーク
              </a>
            </Link>
            <Link href={`/users/${user?.id}`}>
              <a className='cursor-pointer py-2 pl-4 gap-2 hidden items-center sm:flex hover:bg-base'>
                <AiOutlineUserIcon />
                マイページ
              </a>
            </Link>
            <a className='cursor-pointer flex text-left w-full py-2 pl-4 gap-2 items-center hover:bg-base'>
              <FiSettingsIcon />
              ユーザー情報
            </a>
            <button
              className='cursor-pointer flex text-left w-full py-2 pl-4 gap-2 items-center hover:bg-base'
              onClick={logOut}
            >
              <FiLogOutIcon />
              ログアウト
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
