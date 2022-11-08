import Link from 'next/link'
import { FC } from 'react'
import { HiPaperAirplane as HiPaperAirplaneIcon } from 'react-icons/hi'

export const JumpToCreatePostButton: FC = () => {
  return (
    <Link href='/create'>
      <a className='bg-primary rounded-full font-bold text-white py-10px px-11.5px right-20px bottom-50px text-30px z-2 fixed'>
        <HiPaperAirplaneIcon className='h-7 transform w-7 rotate-90' />
      </a>
    </Link>
  )
}
