import { FC, useCallback, useMemo, useState } from 'react'

import { BsThreeDots as BsThreeDotsIcon } from 'react-icons/bs'

import { FolderList } from './FolderList'
import { DropDownMenu } from 'components/shares/DropDownMenu'
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

  const [isOpenedMenu, setIsOpenedMenu] = useState(false) // menu自体
  const [isClickedAddBookmark, setIsClickedAddBookmark] = useState(false) //
  const [isMouseEnteredAddBookmark, setIsMouseEnteredAddBookmark] =
    useState(false)

  const isOpenedFolder = useMemo(() => {
    return isClickedAddBookmark || isMouseEnteredAddBookmark
  }, [isClickedAddBookmark, isMouseEnteredAddBookmark])

  const onCloseMenu = useCallback(() => {
    setIsOpenedMenu(false)
    setIsClickedAddBookmark(false)
    setIsMouseEnteredAddBookmark(false)
  }, [])

  return (
    <div className='flex relative'>
      <BsThreeDotsIcon
        className='cursor-pointer text-30px duration-100 hover:opacity-50'
        onClick={() => setIsOpenedMenu(!isOpenedMenu)}
      />

      <DropDownMenu
        open={isOpenedMenu}
        onClose={onCloseMenu}
        className='top-0 right-40px'
      >
        {user?.id === post.userId && (
          <>
            <button
              className='text-left w-full py-2 px-4  hover:bg-primary-light'
              onClick={() => {
                onEdit?.()
                onCloseMenu()
              }}
            >
              投稿を編集する
            </button>
            <button
              className='text-left w-full py-2 px-4 hover:bg-primary-light'
              onClick={async () => {
                onCloseMenu()
                await onDelete?.()
              }}
            >
              投稿を
              <span className='font-bold text-danger-dark text-18px'>削除</span>
              する
            </button>
          </>
        )}

        <button
          className='text-left w-full py-2 px-4 hover:bg-primary-light'
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
            <button
              className='text-left w-full py-2 px-4 hover:bg-primary-light'
              onClick={() => setIsClickedAddBookmark(!isClickedAddBookmark)}
              onMouseEnter={() => setIsMouseEnteredAddBookmark(true)}
              onMouseLeave={() => setIsMouseEnteredAddBookmark(false)}
            >
              ブックマークに追加
            </button>

            {post.bookmark && (
              <button
                className='text-left w-full py-2 px-4 hover:bg-primary-light'
                onClick={() => {
                  onRemoveBookmark?.()
                  onCloseMenu()
                }}
              >
                ブックマークを
                <span className='font-bold text-danger-dark text-18px'>
                  削除
                </span>
              </button>
            )}
          </>
        )}

        {/* 自分のフォルダ一覧  */}
        {/* {(isClickedAddBookmark || isMouseEnteredAddBookmark) && (
          <div
            className={`shadow-md shadow-primary-light right-80px absolute sm:right-80px  ${
              user?.id !== post.userId ? 'top-44px' : 'top-124px'
            }`}
            onMouseEnter={() => setIsMouseEnteredAddBookmark(true)}
            onMouseLeave={() => setIsMouseEnteredAddBookmark(false)}
          >
            <FolderList
              post={post}
              onClickFolderName={onCloseMenu}
              onAddBookmark={onAddBookmark}
            />
          </div>
        )} */}
      </DropDownMenu>
      {/* 自分のフォルダ一覧  */}
      {isOpenedFolder && (
        <div
          className={`right-120px absolute z-1 ${
            user?.id !== post.userId ? 'top-44px' : 'top-124px'
          }`}
          onMouseEnter={() => setIsMouseEnteredAddBookmark(true)}
          // onMouseLeave={() => setIsMouseEnteredAddBookmark(false)}
        >
          <FolderList
            post={post}
            onClickFolderName={onCloseMenu}
            onAddBookmark={onAddBookmark}
          />
        </div>
      )}

      {isOpenedMenu && (
        <div className='h-0 w-0 relative hidden'>
          {/* モーダルの周り押したら消えるやつ */}
          <div
            onClick={onCloseMenu}
            className='h-100vh top-0 left-0 w-100vw z-1 fixed'
            aria-hidden='true'
          />

          {/* モーダル */}
          <div className='top-0 right-40px z-1 absolute'>
            <div className='bg-white cursor-pointer rounded-3px shadow-outline w-170px overflow-hidden sm:w-150px'>
              {user?.id === post.userId && (
                <>
                  <button
                    className='text-left w-full py-2 px-4  hover:bg-primary-light'
                    onClick={() => {
                      onEdit?.()
                      setIsOpenedMenu(false)
                    }}
                  >
                    投稿を編集する
                  </button>
                  <button
                    className='text-left w-full py-2 px-4 hover:bg-primary-light'
                    onClick={async () => {
                      onCloseMenu()
                      await onDelete?.()
                    }}
                  >
                    投稿を
                    <span className='font-bold text-danger-dark text-18px'>
                      削除
                    </span>
                    する
                  </button>
                </>
              )}

              <button
                className='text-left w-full py-2 px-4 hover:bg-primary-light'
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
                  <button
                    className='text-left w-full py-2 px-4 hover:bg-primary-light'
                    onClick={() =>
                      setIsClickedAddBookmark(!isClickedAddBookmark)
                    }
                    onMouseEnter={() => setIsMouseEnteredAddBookmark(true)}
                    onMouseLeave={() => setIsMouseEnteredAddBookmark(false)}
                  >
                    ブックマークに追加
                  </button>

                  {post.bookmark && (
                    <button
                      className='text-left w-full py-2 px-4 hover:bg-primary-light'
                      onClick={() => {
                        onRemoveBookmark?.()
                        onCloseMenu()
                      }}
                    >
                      ブックマークを
                      <span className='font-bold text-danger-dark text-18px'>
                        削除
                      </span>
                    </button>
                  )}
                </>
              )}
            </div>

            {/* 自分のフォルダ一覧  */}
            {(isClickedAddBookmark || isMouseEnteredAddBookmark) && (
              <div
                className={`shadow-md shadow-primary-light right-80px absolute sm:right-80px  ${
                  user?.id !== post.userId ? 'top-44px' : 'top-124px'
                }`}
                onMouseEnter={() => setIsMouseEnteredAddBookmark(true)}
                // onMouseLeave={() => setIsMouseEnteredAddBookmark(false)}
              >
                <FolderList
                  post={post}
                  onClickFolderName={onCloseMenu}
                  onAddBookmark={onAddBookmark}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
