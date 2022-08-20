import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'
import { BsPencilSquare } from 'react-icons/bs'
import { useLogOut } from 'hooks/login/useAuth'
import { useIsLoggedIn } from 'hooks/login/useIsLoggedIn'

export const Header: FC = () => {
  const isLoggedIn = useIsLoggedIn()
  const { logOut } = useLogOut()

  return (
    <>
      <header className='bg-white w-full py-2 top-0 z-10000 fixed'>
        <nav className='flex mx-4 items-center justify-between'>
          <Link href='/'>
            <h1 className='cursor-pointer mt-0 mb-1  text-6xl text-red-500'>
              SharePos
            </h1>
          </Link>

          <div className='flex gap-3 justify-end items-center'>
            <AiOutlineSearch className='cursor-pointer mt-1' />
            <div className='hidden'>
              <input
                type='text'
                className='rounded-full ring-1 ring-red-500 focus:(ring-2 outline-none) '
              />
            </div>
            {isLoggedIn ? (
              <div className='flex gap-3 justify-end items-center'>
                <Link href='/create'>
                  <div className='flex gap-0.5 items-center'>
                    <div className='cursor-pointer duration-300 hover:(underline) '>
                      投稿する
                    </div>
                    <BsPencilSquare />
                  </div>
                </Link>
                <Link href='/myPage2'>
                  <div className='flex gap-0.5 items-center'>
                    <div className='cursor-pointer duration-300 hover:(underline) '>
                      マイページ
                    </div>
                    <AiOutlineUser />
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
              // <div className='flex gap-2 justify-end items-center'>
              //   <Link href='/create'>
              //     <div className='text-center'>
              //       <BsPencilSquare />
              //       <div className='cursor-pointer duration-300 hover:(underline) '>
              //         投稿する
              //       </div>
              //     </div>
              //   </Link>
              //   <Link href='/myPage'>
              //     <div className='text-center'>
              //       <AiOutlineUser />
              //       <div className='cursor-pointer duration-300 hover:(underline) '>
              //         マイページ
              //       </div>
              //     </div>
              //   </Link>
              //   <div
              //     onClick={logOut}
              //     className='cursor-pointer duration-300 hover:(underline) '
              //   >
              //     ログアウト
              //   </div>
              // </div>
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
