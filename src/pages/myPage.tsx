import { NextPage } from 'next'
import { useState } from 'react'
import { Layout } from 'components/shared/Layout'
import { MyBookmark } from 'components/user/Bookmark'
import { MyInfo } from 'components/user/MyInfo'
import { MyPosts } from 'components/user/MyPosts'
import { useRequireLogin } from 'hooks/login/useRequireLogin'

const MyPage: NextPage = () => {
  useRequireLogin()

  // const [selectedMenu, setSelectedMenu] = useState<SelectedMenu>('myPosts')
  const [selectedMenu, setSelectedMenu] = useState('ユーザー情報')
  const tabs = ['ユーザー情報', '投稿した記事', 'ブックマーク']

  return (
    <Layout>
      <div className='sm:(flex gap-10) '>
        <nav className='flex text-center justify-center sm:gap-2 sm:(justify-start flex-col) '>
          {tabs.map((tab, i) => (
            <button
              key={i}
              onClick={() => setSelectedMenu(tab)}
              className={`sm:p-4 font-bold w-30vw max-w-130px h-60px ${
                selectedMenu === tab
                  ? 'bg-red-500 rounded-10px text-white'
                  : ' cursor-pointer'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* ブックマーク、右はみ出る */}
        <div className='mt-4 w-full'>
          {selectedMenu === 'ユーザー情報' && <MyInfo />}
          {selectedMenu === '投稿した記事' && <MyPosts />}
          {selectedMenu === 'ブックマーク' && <MyBookmark />}
        </div>
      </div>
    </Layout>
  )
}
export default MyPage
