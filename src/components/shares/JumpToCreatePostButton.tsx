import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Link from 'next/link'
import { FC, useState } from 'react'
import { HiPaperAirplane as HiPaperAirplaneIcon } from 'react-icons/hi'

export const JumpToCreatePostButton: FC = () => {
  const [isShowText, setIsShowText] = useState(true)

  useScrollPosition(({ prevPos, currPos }) => {
    const isVisible = currPos.y > prevPos.y || currPos.y > -200
    setIsShowText(isVisible)
  }, [])

  return (
    <Link href='/create'>
      <div className='bg-accent-dark rounded-full flex font-bold text-white py-10px px-11.5px right-20px text-lg leading-1.1rem bottom-50px z-2 fixed'>
        <div className='my-auto'>
          <div
            className={`${
              isShowText ? 'w-25' : 'translate-x-100% w-0'
            } h-5 transform overflow-hidden duration-500`}
          >
            シェアする
          </div>
        </div>
        <HiPaperAirplaneIcon className='h-7 transform w-7 rotate-90' />
      </div>
    </Link>
  )
}
