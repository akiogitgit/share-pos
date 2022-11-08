import { FC, useCallback, useState } from 'react'

import { BsThreeDots as BsThreeDotsIcon } from 'react-icons/bs'

import { FolderList } from './FolderList'
import { useGetApi } from 'hooks/useApi'
import { useDeletePost } from 'hooks/usePost'
import { Post } from 'types/post'
import { User } from 'types/user/user'

type MenuProps = {
  onEdit?: () => void
  onDelete?: () => void
  onAddBookmark?: () => void
}

type Props = {
  post: Post
} & MenuProps

export const PostMenuButton: FC<Props> = ({
  post,
  onEdit,
  onDelete,
  onAddBookmark,
}) => {
  const { data: user } = useGetApi<User>('/users/me')
  const { deletePost } = useDeletePost(post)
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenFolder, setIsOpenFolder] = useState(false)

  const closeMenu = useCallback(() => {
    setIsOpenMenu(false)
    setIsOpenFolder(false)
  }, [])

  return (
    <>
      <BsThreeDotsIcon
        className='cursor-pointer text-30px duration-100 hover:opacity-50'
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      />

      {/* モーダル */}
      {isOpenMenu && (
        <div className='h-0 w-0 relative'>
          {/* モーダルの周り押したら消えるやつ */}
          <div
            onClick={closeMenu}
            className='h-100vh top-0 left-0 w-100vw z-1 fixed'
          ></div>

          <div className='top-[-35px] right-5px z-2 absolute sm:top-[-35px] '>
            <div className='bg-base border border-primary cursor-pointer rounded-10px shadow-lg shadow-primary-light transform w-170px sm:w-150px'>
              {user?.id === post.userId && (
                <>
                  <button
                    className='rounded-t-10px text-left w-full px-4 pt-2 pb-1 hover:bg-primary-light'
                    onClick={() => {
                      onEdit?.()
                      setIsOpenMenu(false)
                    }}
                  >
                    投稿を編集する
                  </button>
                  <button
                    className='text-left w-full py-1 px-4 hover:bg-primary-light'
                    onClick={async () => {
                      closeMenu()
                      await deletePost()
                    }}
                  >
                    投稿を
                    <span className='font-bold text-primary text-18px'>
                      削除
                    </span>
                    する
                  </button>
                </>
              )}
              <button
                className={`text-left w-full py-1 px-4 hover:bg-primary-light ${
                  user?.id !== post.userId && 'pt-2 rounded-t-10px'
                }`}
                onClick={() => {
                  navigator.clipboard.writeText(post.url)
                  alert('リンクをコピーしました')
                  closeMenu()
                }}
              >
                記事リンクをコピー
              </button>
              {user && (
                <div className='rounded-b-10px text-left w-full group relative'>
                  <button
                    className='text-left w-full px-4 pt-1 pb-2 hover:bg-primary-light'
                    onClick={() => setIsOpenFolder(!isOpenFolder)}
                  >
                    ブックマークに追加
                  </button>

                  {/* 自分のフォルダ一覧  */}
                  <div
                    className={`${
                      !isOpenFolder && 'hidden'
                    } sm:group-hover:block`}
                  >
                    <div className='rounded-10px shadow-md shadow-primary-light top-0px right-80px absolute sm:right-80px'>
                      <FolderList post={post} onClickFolderName={closeMenu} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
