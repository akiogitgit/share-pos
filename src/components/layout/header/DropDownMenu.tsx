import { FC, useState } from 'react'
import { FaUserCircle as FaUserCircleIcon } from 'react-icons/fa'
import { useLogOut } from 'hooks/login/useAuth'

export const DropDownMenu: FC = () => {
  const { logOut } = useLogOut()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  return (
    <div>
      <div className='flex' onClick={() => setIsOpenMenu(s => !s)}>
        <FaUserCircleIcon className='cursor-pointer h-10 w-10' />
      </div>

      {isOpenMenu && (
        <div className='relative'>
          <div
            onClick={() => setIsOpenMenu(false)}
            className='h-100vh top-0 left-0 w-100vw z-1 fixed'
            aria-hidden='true'
          />

          <div className='bg-white shadow-lg top-5px right-0 w-40 z-2 absolute'>
            <button className='flex text-left py-1 px-4 gap-1 items-center hover:bg-base'>
              ユーザー情報を編集
            </button>

            <button
              className='flex text-left w-full py-1 px-4 gap-1 items-center hover:bg-base'
              onClick={logOut}
            >
              ログアウト
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
