import Head from 'next/head'
import Link from 'next/link'
import { FC } from 'react'

type Props = {
  title: string
}

export const Header: FC<Props> = ({ title }) => {
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
          <div className='gap-2 hidden justify-end sm:flex'>
            <Link href='/create'>
              <div className='cursor-pointer duration-300 hover:(underline) '>
                create
              </div>
            </Link>
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
        </nav>
      </header>
    </>
  )
}
