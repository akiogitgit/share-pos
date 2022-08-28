import { NextPage } from 'next'
import { AiOutlineUser } from 'react-icons/ai'
import { MyPageLayout } from 'components/user/MyPageLayout'

const MyInfo: NextPage = () => {
  return (
    <MyPageLayout>
      <div className='mx-4'>
        <h1 className='font-bold text-2xl'>ユーザー情報</h1>
        <div className='flex justify-end'>
          <button className='bg-red-500 rounded-10px text-white py-1 px-2'>
            登録情報を編集
          </button>
        </div>
        <div>
          <AiOutlineUser className='transform scale-200' />
        </div>
        <ul className='mt-4'>
          <li>ユーザー名： あきお</li>
          <li>Eメール　 ： あきお</li>
          <li>投稿数　： あきお</li>
          <li>フォルダ数： あきお</li>
          <li>フォルダ数： あきお</li>
        </ul>
      </div>
    </MyPageLayout>
  )
}

export default MyInfo
