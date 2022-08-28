import { NextPage } from 'next'
import { MyPageLayout } from 'components/user/MyPageLayout'
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
    <MyPageLayout>
      {/* ブックマーク、右はみ出る */}
      <div className='mt-4 w-full'>
        <MyInfo />
      </div>
    </MyPageLayout>
  )
}
export default MyPage
