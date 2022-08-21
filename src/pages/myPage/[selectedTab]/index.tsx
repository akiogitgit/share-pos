import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Layout } from 'components/shared/Layout'
import { MyPosts } from 'components/user/MyPosts'
import { MyBookmark } from 'components/user/myPage/Bookmark'
import { MyInfo } from 'components/user/myPage/MyInfo'
import { useRequireLogin } from 'hooks/login/useRequireLogin'

const MyPage: NextPage = () => {
  useRequireLogin()
  const router = useRouter()
  const { selectedTab } = router.query
  const tabs = [
    { label: 'ユーザー情報', name: 'userInfo' },
    { label: '投稿した記事', name: 'myPosts' },
    { label: 'ブックマーク', name: 'bookmark' },
  ]

  return (
    <Layout>
      <div className='sm:(flex gap-10) '>
        <nav className='flex text-center justify-center sm:gap-2 sm:(justify-start flex-col) '>
          {tabs.map((tab, i) => (
            <Link href={`/myPage/${tab.name}`} key={i}>
              <button
                className={`sm:p-4 font-bold w-30vw max-w-130px h-60px ${
                  tab.name === selectedTab
                    ? 'bg-red-500 rounded-10px text-white'
                    : ' cursor-pointer'
                }`}
              >
                {tab.label}
              </button>
            </Link>
          ))}
        </nav>

        <div className='mt-4 w-full'>
          {selectedTab === 'userInfo' && <MyInfo />}
          {selectedTab === 'myPosts' && <MyPosts />}
          {selectedTab === 'bookmark' && <MyBookmark />}
        </div>
      </div>
    </Layout>
  )
}
export default MyPage
