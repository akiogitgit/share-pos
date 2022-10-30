import Link from 'next/link'
import { FC } from 'react'

import {
  AiOutlineSearch as AiOutlineSearchIcon,
  AiOutlineUser as AiOutlineUserIcon,
} from 'react-icons/ai'
import { BsPencilSquare as BsPencilSquareIcon } from 'react-icons/bs'
import { HiOutlineBookOpen as HiOutlineBookOpenIcon } from 'react-icons/hi'

import { useLogOut } from 'hooks/login/useAuth'
import { useIsLoggedIn } from 'hooks/login/useIsLoggedIn'
import { useGetApi } from 'hooks/useApi'
import { User } from 'types/user/user'

export const Header: FC = () => {
  const isLoggedIn = useIsLoggedIn()
  const { data: user } = useGetApi<User>('/users/me')
  const { logOut } = useLogOut()

  return (
    <>
      {/* <header className='bg-white w-full py-2 top-0 z-10 sm:fixed'> */}
      <header className='bg-white w-full py-2 top-0 z-100 sm:sticky'>
        <nav className='flex mx-4 items-center justify-between'>
          <Link href='/'>
            <h1 className='cursor-pointer mt-0 text-primary  mb-1 text-4xl sm:text-6xl'>
              SharePos
            </h1>
          </Link>

          <div className='flex gap-3 justify-end items-center'>
            {/* <div className='gap-3 hidden justify-end items-center sm:flex'> */}
            <AiOutlineSearchIcon className='cursor-pointer mt-1' />
            <div className='hidden'>
              <input
                type='text'
                className='rounded-full ring-primary ring-1 focus:(ring-2 outline-none) '
              />
            </div>
            {isLoggedIn ? (
              <div className='flex gap-3 justify-end items-center'>
                <Link href='/create'>
                  <div className='cursor-pointer flex gap-0.5 items-center'>
                    {/* <div className='duration-300 hover:(underline) '> */}
                    <div className='duration-300 hidden sm:block hover:(underline) '>
                      投稿する
                    </div>
                    <BsPencilSquareIcon />
                  </div>
                </Link>
                <Link href='/bookmark'>
                  <div className='cursor-pointer flex gap-0.5 items-center'>
                    <div className='duration-300 hidden sm:block hover:(underline) '>
                      ブックマーク
                    </div>
                    <HiOutlineBookOpenIcon />
                  </div>
                </Link>
                <Link href={`/users/${user?.id}`}>
                  <div className='cursor-pointer flex gap-0.5 items-center'>
                    {/* <div className='duration-300 hover:(underline) '> */}
                    <div className='duration-300 hidden sm:block hover:(underline) '>
                      マイページ
                    </div>
                    <AiOutlineUserIcon />
                  </div>
                </Link>
                <div
                  onClick={logOut}
                  className='cursor-pointer duration-300 hover:(underline) '
                >
                  ログアウト
                </div>
              </div>
            ) : (
              <div className='flex gap-2'>
                <Link href='/login'>
                  <div className='cursor-pointer duration-300 hover:(underline) '>
                    ログイン
                  </div>
                </Link>
                <Link href='/signup'>
                  <div className='cursor-pointer duration-300 hover:(underline) '>
                    新規登録
                  </div>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  )
}
