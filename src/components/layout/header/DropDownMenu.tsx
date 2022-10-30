import { FC, useState } from 'react'
import { FaUserCircle as FaUserCircleIcon } from 'react-icons/fa'
import { useLogOut } from 'hooks/login/useAuth'

export const DropDownMenu: FC = () => {
  const { logOut } = useLogOut()
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  return (
    <div>
      {/* <div
        onClick={logOut}
        className='cursor-pointer duration-300 hover:(underline) '
      >
        <FaUserCircleIcon className='h-10 w-10' />
      </div> */}
      <div
        onClick={() => setIsOpenMenu(s => !s)}
        className='cursor-pointer duration-300 hover:(underline) '
      >
        <FaUserCircleIcon className='h-10 w-10' />
      </div>
      {isOpenMenu && (
        <div className='bg-white shadow-lg top-70px right-20px absolute'>
          <div className='flex text-left w-full py-1 px-4 gap-1 items-center hover:bg-base'>
            ユーザー情報を編集
          </div>

          <div
            className='flex text-left w-full py-1 px-4 gap-1 items-center hover:bg-base'
            onClick={logOut}
          >
            ログアウト
          </div>
        </div>
      )}
    </div>
  )
}
