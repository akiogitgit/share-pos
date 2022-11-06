import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'

import { AiOutlineSearch as AiOutlineSearchIcon } from 'react-icons/ai'
import { HiPaperAirplane as HiPaperAirplaneIcon } from 'react-icons/hi'

import { DropDownMenu } from './DropDownMenu'
import { Button } from 'components/shares/Button'
import { useIsLoggedIn } from 'hooks/login/useIsLoggedIn'

export const Header: FC = () => {
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()

  return (
    <>
      <header className='bg-white w-full py-2 top-0 z-100 sm:sticky'>
        <nav className='flex mx-auto max-w-1150px px-4 items-center justify-between'>
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

                {router.pathname !== '/create' && (
                  <div className='flex gap-3 items-center'>
                    <Link href='/create'>
                      {/* <a className='bg-primary border border-primary flex rounded-7px text-white py-1 px-2 gap-1 duration-300 items-center hover:(bg-white text-primary) '>
                        <div className='font-bold'>シェアする</div>
                        <HiPaperAirplaneIcon className='transform rotate-90' />
                      </a> */}
                      {/* <Button>
                        <a className='bg-primary border border-primary flex rounded-7px text-white py-1 px-2 gap-1 duration-300 items-center hover:(bg-white text-primary) '>
                          <div className='font-bold'>シェアする</div>
                          <HiPaperAirplaneIcon className='transform rotate-90' />
                        </a>
                      </Button> */}
                      <Button
                        rightIcon={
                          <HiPaperAirplaneIcon className='transform rotate-90' />
                        }
                      >
                        シェアする
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <div className='flex gap-2 items-center'>
                <Link href='/login'>
                  <a className='cursor-pointer'>ログイン</a>
                </Link>
                <Link href='/signup'>
                  <button className='bg-primary border border-primary rounded-7px text-white py-1 px-2 duration-300 hover:(bg-white text-primary) '>
                    新規登録
                  </button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  )
}
