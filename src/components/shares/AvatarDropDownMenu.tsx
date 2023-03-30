import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineUser as AiOutlineUserIcon } from 'react-icons/ai'
import { FaUserCircle as FaUserCircleIcon } from 'react-icons/fa'
import {
  FiLogOut as FiLogOutIcon,
  FiSettings as FiSettingsIcon,
} from 'react-icons/fi'
import { HiOutlineBookOpen as HiOutlineBookOpenIcon } from 'react-icons/hi'

import { Avatar } from 'components/shares/base/Avatar'
import { DropDownMenu } from 'components/shares/base/DropDownMenu'
import { useLogOut } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { useBoolean } from 'hooks/useBoolean'
import { User } from 'types/user'

export const HeaderDropDownMenu: FC = () => {
  const { logOut } = useLogOut()
  const { data: user } = useGetApi<User>('/users/me')
  const open = useBoolean(false)

  return (
    <div>
      {/* アバターアイコン */}
      <button
        className='cursor-pointer flex'
        onClick={open.toggle}
        aria-label='メニューを開く'
        aria-pressed={open.v}
      >
        {user ? (
          <Avatar id={user.id} />
        ) : (
          <FaUserCircleIcon className='h-9 w-9' />
        )}
      </button>

      <div className='relative'>
        <DropDownMenu
          open={open.v}
          onClose={open.setFalse}
          className='top-10px right-[-15px]'
        >
          <li className='hidden sm:block'>
            <Link
              href='/bookmark'
              className='flex py-2 pl-4 gap-2 items-center hover:bg-primary-light'
            >
              <HiOutlineBookOpenIcon />
              ブックマーク
            </Link>
          </li>
          <li className='hidden sm:block'>
            <Link
              href={`/users/${user?.id}`}
              className='flex py-2 pl-4 gap-2 items-center hover:bg-primary-light'
            >
              <AiOutlineUserIcon />
              マイページ
            </Link>
          </li>
          <li>
            <div className='flex text-left w-full py-2 pl-4 gap-2 items-center hover:bg-primary-light'>
              <FiSettingsIcon />
              ユーザー情報
            </div>
          </li>
          <li>
            <button
              className='flex text-left w-full py-2 pl-4 gap-2 items-center hover:bg-primary-light'
              onClick={logOut}
            >
              <FiLogOutIcon />
              ログアウト
            </button>
          </li>
        </DropDownMenu>
      </div>
    </div>
  )
}
