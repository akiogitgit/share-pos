import { NextPage } from 'next'
import Link from 'next/link'
import { Layout } from 'components/shared/Layout'
import { MyInfo } from 'components/user/myPage/MyInfo'
import { useRequireLogin } from 'hooks/login/useRequireLogin'

const MyPage: NextPage = () => {
  useRequireLogin()
  // const tabs = ['userInfo', 'myPosts', 'bookmark']
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
            <Link href={`myPage/${tab.name}`} key={i}>
              <button
                className={`sm:p-4 font-bold w-30vw max-w-130px h-60px ${
                  tab.name === 'userInfo'
                    ? 'bg-red-500 rounded-10px text-white'
                    : ' cursor-pointer'
                }`}
              >
                {tab.label}
              </button>
            </Link>
          ))}
        </nav>

        {/* ブックマーク、右はみ出る */}
        <div className='mt-4 w-full'>
          <MyInfo />
        </div>
      </div>
    </Layout>
  )
}
export default MyPage
