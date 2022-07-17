import Link from 'next/link'
import { FC } from 'react'
import { useCookies } from 'hooks/useCookies'
import { useIsLoggedIn } from 'hooks/useIsLoggedIn'

export const Header: FC = () => {
  const isLoggedIn = useIsLoggedIn()
  const { remove } = useCookies('authInfo')

  return (
    <>
      <header className='bg-red-100 shadow-md w-full top-0 shadow-red-100 fixed'>
        <nav className='flex mx-4 items-center justify-between'>
          <Link href='/'>
            <div className='cursor-pointer mt-0 mb-1  text-6xl text-red-500'>
              SharePos
            </div>
          </Link>
          <div className='flex gap-2 justify-end'>
            <Link href='/create'>
              <div className='cursor-pointer duration-300 hover:(underline) '>
                create
              </div>
            </Link>

            {isLoggedIn ? (
              <div>
                <div
                  onClick={() => remove('authInfo')}
                  className='cursor-pointer duration-300 hover:(underline) '
                >
                  Logout
                </div>
              </div>
            ) : (
              <div className='flex gap-2'>
                <Link href='/login'>
                  <div className='cursor-pointer duration-300 hover:(underline) '>
                    Login
                  </div>
                </Link>
                <Link href='/signup'>
                  <div className='cursor-pointer duration-300 hover:(underline) '>
                    signup
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
