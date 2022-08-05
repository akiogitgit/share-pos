import Link from 'next/link'
import { FC } from 'react'
import { useLogOut } from 'hooks/login/useAuth'
import { useIsLoggedIn } from 'hooks/login/useIsLoggedIn'

export const Header: FC = () => {
  const isLoggedIn = useIsLoggedIn()
  const { logOut } = useLogOut()

  return (
    <>
      <header className='bg-white w-full py-2 top-0 z-10 fixed'>
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
                  onClick={logOut}
                  className='cursor-pointer duration-300 hover:(underline) '
                >
                  LogOut
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
