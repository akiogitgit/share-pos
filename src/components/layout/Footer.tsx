import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { AiTwotoneHome, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'

export const Footer: FC = () => {
  const router = useRouter()

  return (
    <footer className='sm:hidden'>
      {router.pathname !== '/create' && (
        <button className='border rounded-full font-bold bg-red-500 border-red-500 text-white p-2 right-20px bottom-50px text-30px fixed'>
          <Link href='/create'>＋</Link>
        </button>
      )}

      <nav className='bg-white flex w-full py-1.5 bottom-0 left-0 text-25px justify-around fixed'>
        <Link href='/'>
          <div className={`${router.pathname === '/' && 'text-red-500'}`}>
            <AiTwotoneHome className='cursor-pointer' />
          </div>
        </Link>
        <Link href='/'>
          {/* 記事検索 */}
          <div>
            <AiOutlineSearch className='cursor-pointer' />
          </div>
        </Link>
        <Link href='/myPage'>
          <div
            className={`${
              router.pathname.includes('/myPage') && 'text-red-500'
            }`}
          >
            <AiOutlineUser className='cursor-pointer' />
          </div>
        </Link>
      </nav>
    </footer>
  )
}
