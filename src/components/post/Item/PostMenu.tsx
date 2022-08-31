import { Dispatch, FC, SetStateAction } from 'react'
import { FolderList } from './FolderList'
import { useDeletePost } from 'hooks/usePost'
import { useCookies } from 'stores/useCookies'
import { Post } from 'types/post'

type Props = {
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>
  setIsEdit: Dispatch<SetStateAction<boolean>>
  post: Post
}

export const PostMenu: FC<Props> = ({ setIsOpenMenu, post, setIsEdit }) => {
  const { cookies } = useCookies('userInfo')
  const { deletePost } = useDeletePost(post)

  return (
    <div className='flex relative justify-end'>
      <div
        onClick={() => setIsOpenMenu(false)}
        className='h-100vh top-0 left-0 w-100vw z-10 fixed'
      ></div>
      <div className='border cursor-pointer bg-red-100 border-red-600 rounded-10px shadow-lg transform top-[-20px] right-50px shadow-red-200 w-150px z-11 absolute'>
        {cookies.userInfo?.id === post.userId && (
          <>
            <div
              className='rounded-t-10px px-4 pt-2 hover:bg-red-300'
              onClick={() => {
                setIsEdit(true)
                setIsOpenMenu(false)
              }}
            >
              投稿を編集する
            </div>
            <div
              className='px-4 pt-2 hover:bg-red-300'
              onClick={() => {
                deletePost()
                setIsOpenMenu(false)
              }}
            >
              投稿を
              <span className='font-bold text-red-500 text-18px'>削除</span>
              する
            </div>
          </>
        )}
        <div
          className='rounded-b-10px px-4 pt-2 hover:bg-red-300'
          onClick={() => {
            navigator.clipboard.writeText(post.url)
            alert('リンクをコピーしました')
            setIsOpenMenu(false)
          }}
        >
          記事リンクをコピー
        </div>
        {cookies.userInfo && (
          <div className='rounded-b-10px group relative'>
            <div className=' py-2 px-4 hover:bg-red-300'>
              ブックマークに追加
            </div>
            <div className='hidden group-hover:block'>
              {/* 自分のフォルダ一覧 */}
              <FolderList post={post} setIsOpenMenu={setIsOpenMenu} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
