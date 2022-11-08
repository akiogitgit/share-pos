import { FC, useCallback, useState } from 'react'

import { BsThreeDots as BsThreeDotsIcon } from 'react-icons/bs'

import { FolderList } from './FolderList'
import { useGetApi } from 'hooks/useApi'
import { Post } from 'types/post'
import { User } from 'types/user/user'

type Props = {
  post: Post
  onEdit?: () => void
  onDelete?: () => void
  onAddBookmark?: (folderId: string, post: Post) => void
  onRemoveBookmark?: () => void
}

export const PostMenuButton: FC<Props> = ({
  post,
  onEdit,
  onDelete,
  onAddBookmark,
  onRemoveBookmark,
}) => {
  const { data: user } = useGetApi<User>('/users/me')
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenFolder, setIsOpenFolder] = useState(false)

  const onCloseMenu = useCallback(() => {
    setIsOpenMenu(false)
    setIsOpenFolder(false)
  }, [])

  return (
    <div className='flex'>
      <BsThreeDotsIcon
        className='cursor-pointer text-30px duration-100 hover:opacity-50'
        onClick={() => setIsOpenMenu(!isOpenMenu)}
      />

      {isOpenMenu && (
        <div className='h-0 w-0 relative'>
          {/* モーダルの周り押したら消えるやつ */}
          <div
            onClick={onCloseMenu}
            className='h-100vh top-0 left-0 w-100vw z-1 fixed'
            aria-hidden='true'
          />

          {/* モーダル */}
          <div className='top-0 right-40px z-2 absolute sm:top-0 '>
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
                      onCloseMenu()
                      await onDelete?.()
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
                }
                  ${!user && 'pb-2 rounded-b-10px'}`}
                onClick={() => {
                  navigator.clipboard.writeText(post.url)
                  alert('リンクをコピーしました')
                  onCloseMenu()
                }}
              >
                記事リンクをコピー
              </button>

              {user && (
                <>
                  <div className='group relative'>
                    <button
                      className={`text-left w-full py-1 px-4 hover:bg-primary-light ${
                        !post.bookmark && 'rounded-b-10px pb-2'
                      }`}
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
                        <FolderList
                          post={post}
                          onClickFolderName={onCloseMenu}
                          onAddBookmark={onAddBookmark}
                        />
                      </div>
                    </div>
                  </div>

                  {post.bookmark && (
                    <button
                      className='rounded-b-10px text-left w-full px-4 pt-1 pb-2 hover:bg-primary-light'
                      onClick={() => {
                        onRemoveBookmark?.()
                        onCloseMenu()
                      }}
                    >
                      ブックマークを
                      <span className='font-bold text-primary text-18px'>
                        削除
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
