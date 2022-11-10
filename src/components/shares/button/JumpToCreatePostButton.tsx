import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Link from 'next/link'
import { FC, useState } from 'react'
import { HiPaperAirplane as HiPaperAirplaneIcon } from 'react-icons/hi'

export const JumpToCreatePostButton: FC = () => {
  const [isShowText, setIsShowText] = useState(true)

  useScrollPosition(({ prevPos, currPos }) => {
    const isVisible = currPos.y > prevPos.y
    setIsShowText(isVisible)
  }, [])

  // return (
  //   <Link href='/create'>
  //     <a className='bg-primary rounded-full flex font-bold text-white py-10px px-11.5px right-20px bottom-50px text-30px z-2 fixed'>
  //       <div
  //         className={`${
  //           isShowText ? 'translate-x-[-100%]' : 'w-0'
  //         } bg-primary rounded-full h-10 overflow-hidden whitespace-nowrap transform duration-500 absolute top-0 left-0`}
  //       >
  //         シェアする
  //       </div>
  //       <HiPaperAirplaneIcon className='h-7 transform w-7 rotate-90' />
  //     </a>
  //   </Link>
  // )

  return (
    <Link href='/create'>
      <a className='bg-primary rounded-full flex font-bold text-white py-10px px-11.5px right-20px bottom-50px text-30px z-2 fixed'>
        <div className='my-auto'>
          <div
            className={`${
              isShowText ? 'w-20' : 'translate-x-100% w-0'
            } h-5 transform text-20px overflow-hidden duration-500`}
          >
            シェアする
          </div>
        </div>
        <HiPaperAirplaneIcon className='h-7 transform w-7 rotate-90' />
      </a>
    </Link>
  )

  // return (
  //   <Link href='/create'>
  //     <a className='bg-primary rounded-full flex font-bold text-white py-10px px-11.5px right-20px bottom-50px text-30px z-2 fixed'>
  //       <div
  //         className={`${
  //           isShowText ? 'w-full' : 'w-0'
  //         }  h-7 overflow-hidden duration-500`}
  //       >
  //         シェアする
  //       </div>
  //       {/* <HiPaperAirplaneIcon className='h-7 transform w-7 rotate-90' /> */}
  //     </a>
  //   </Link>
  // )
}
