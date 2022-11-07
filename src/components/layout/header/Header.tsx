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
                  <Link href='/create'>
                    <Button
                      radius='md'
                      size='lg'
                      compact
                      animate
                      component='a'
                      rightIcon={
                        <HiPaperAirplaneIcon className='transform rotate-90' />
                      }
                    >
                      シェアする
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <div className='flex gap-2 items-center'>
                <Link href='/login'>
                  <a className='cursor-pointer'>ログイン</a>
                </Link>
                <Link href='/signup'>
                  <Button radius='md' component='a'>
                    新規登録
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      </header>
    </>
  )
}
