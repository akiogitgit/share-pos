import Head from 'next/head'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import { useRequireLogin } from 'hooks/useRequireLogin'
import { useGlobalSWR } from 'stores/useGlobalSWR'

type Props = {
  title: string
}

export const Header: FC<Props> = ({ title }) => {
  const { data: authInfo } = useGlobalSWR('authInfo')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // 自動ログインや、ログインしていない時の画面遷移の処理
  useRequireLogin()

  useEffect(() => {
    if (authInfo) {
      setIsLoggedIn(true)
    }
  }, [authInfo])
  console.log({ isLoggedIn })

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
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

            {!isLoggedIn && (
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
