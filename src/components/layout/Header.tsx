import { useScrollPosition } from '@n8tb1t/use-scroll-position'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC, useState } from 'react'
import { AiOutlineSearch as AiOutlineSearchIcon } from 'react-icons/ai'
import { HiPaperAirplane as HiPaperAirplaneIcon } from 'react-icons/hi'

import { Button } from 'components/shares/base/Button'
import { useIsLoggedIn } from 'hooks/login/useIsLoggedIn'

import { HeaderDropDownMenu } from '../shares/AvatarDropDownMenu'

export const Header: FC = () => {
  const isLoggedIn = useIsLoggedIn()
  const pathname = usePathname()

  const [isVisible, setVisible] = useState(true)

  useScrollPosition(({ prevPos, currPos }) => {
    setVisible(currPos.y > prevPos.y || currPos.y > -200)
  }, [])

  return (
    <header
      className={`bg-white w-full py-2 top-0 z-2 transform ${
        !isVisible && 'translate-y-[-100%]'
      } sm:translate-y-0 sticky duration-300`}
    >
      <nav className='flex mx-auto max-w-1150px px-4 items-center justify-between'>
        <Link
          href='/'
          aria-label='シェアポス、読んで良かった記事をシェアするサービス'
        >
          <h1 className='cursor-pointer font-cantoreOne text-primary-dark mb-1 text-2xl'>
            SharePos
          </h1>
        </Link>

        <div className='flex gap-3 justify-end items-center'>
          <AiOutlineSearchIcon
            className='cursor-pointer h-6 mt-1 w-6'
            role='search'
            tabIndex={0}
          />

          {isLoggedIn ? (
            <div className='flex gap-3 items-center'>
              <HeaderDropDownMenu />

              {pathname !== '/create' && (
                <Link href='/create' aria-label='記事をシェアする'>
                  <Button
                    className='hidden sm:block'
                    radius='md'
                    size='lg'
                    color='accent'
                    compact
                    animate
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
              <Link href='/login'>ログイン</Link>
              <Link href='/signup'>
                <Button>新規登録</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
