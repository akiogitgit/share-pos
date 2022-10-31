import Link from 'next/link'
import { FC } from 'react'

import { AiOutlineSearch as AiOutlineSearchIcon } from 'react-icons/ai'
import { BsPencilSquare as BsPencilSquareIcon } from 'react-icons/bs'

import { DropDownMenu } from './DropDownMenu'
import { useIsLoggedIn } from 'hooks/login/useIsLoggedIn'

export const Header: FC = () => {
  const isLoggedIn = useIsLoggedIn()

  return (
    <>
      <header className='bg-white w-full py-2 top-0 z-100 sm:sticky'>
        <nav className='flex px-4 items-center justify-between'>
          <Link href='/'>
            <h1 className='cursor-pointer mt-0 text-primary  mb-1 text-4xl'>
              SharePos
            </h1>
          </Link>

          <div className='flex gap-3 justify-end items-center'>
            <AiOutlineSearchIcon className='cursor-pointer h-6 mt-1 w-6' />

            {isLoggedIn ? (
              <div className='flex gap-3 items-center'>
                <DropDownMenu />

                <div className='flex gap-3 items-center'>
                  <Link href='/create'>
                    <div className='cursor-pointer flex gap-0.5 items-center'>
                      <div className='duration-300 hover:(underline) '>
                        投稿する
                      </div>
                      <BsPencilSquareIcon />
                    </div>
                  </Link>
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
