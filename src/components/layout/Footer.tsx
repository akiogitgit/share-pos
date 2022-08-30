import Link from 'next/link'
import { FC } from 'react'
import { AiTwotoneHome, AiOutlineSearch, AiOutlineUser } from 'react-icons/ai'

export const Footer: FC = () => {
  return (
    <footer className='sm:hidden'>
      <button className='border rounded-full font-bold bg-red-500 border-red-500 text-white p-2 right-20px bottom-50px text-30px fixed'>
        <Link href='/create'>＋</Link>
      </button>

      <nav className='bg-white flex w-full py-1.5 bottom-0 left-0 text-25px justify-around fixed'>
        <Link href='/'>
          <div>
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
          <div>
            <AiOutlineUser className='cursor-pointer' />
          </div>
        </Link>
      </nav>
    </footer>
  )
}
