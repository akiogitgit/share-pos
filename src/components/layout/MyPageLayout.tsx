import Link from 'next/link'
import { FC, ReactNode } from 'react'
import { Layout } from 'components/layout/Layout'
import { useRequireLogin } from 'hooks/login/useRequireLogin'

const tabs = [
  { label: '投稿した記事', name: 'myPosts' },
  { label: 'ブックマーク', name: 'bookmark' },
  { label: 'ユーザー情報', name: 'userInfo' },
]

type Props = {
  children: ReactNode
  tabName?: string
}

// 最初に表示するタブ何にしよう
export const MyPageLayout: FC<Props> = ({ children, tabName = 'userInfo' }) => {
  useRequireLogin()

  return (
    <Layout>
      <div className='sm:(flex gap-10) '>
        <nav className='flex text-center justify-center sm:gap-2 sm:(justify-start flex-col) '>
          {tabs.map((tab, i) => (
            <Link href={`/myPage/${tab.name}`} key={i}>
              <button
                className={`sm:p-4 font-bold w-30vw max-w-130px h-60px ${
                  tab.name === tabName
                    ? 'bg-red-500 rounded-10px text-white'
                    : ' cursor-pointer'
                }`}
              >
                {tab.label}
              </button>
            </Link>
          ))}
        </nav>

        <div className='mt-8 w-full sm:mt-0'>{children}</div>
      </div>
    </Layout>
  )
}
