import { FC, useCallback, useMemo } from 'react'
import { BsThreeDots as BsThreeDotsIcon } from 'react-icons/bs'

import { DropDownMenu } from 'components/shares/base/DropDownMenu'
import { useGetApi } from 'hooks/useApi'
import { useBoolean } from 'hooks/useBoolean'
import { Post } from 'types/post'
import { User } from 'types/user'

import { FolderList } from './PostFolderList'

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

  const isMenuOpened = useBoolean(false) // menu自体
  const isAddBookmarkClicked = useBoolean(false)
  const isHoveringAddBookmark = useBoolean(false)

  const isFolderOpened = useMemo(() => {
    return isAddBookmarkClicked.v || isHoveringAddBookmark.v
  }, [isAddBookmarkClicked, isHoveringAddBookmark])

  const onCloseMenu = useCallback(() => {
    isMenuOpened.setFalse()
    isAddBookmarkClicked.setFalse()
    isHoveringAddBookmark.setFalse()
  }, [isAddBookmarkClicked, isHoveringAddBookmark, isMenuOpened])

  return (
    <div className='flex relative'>
      <button
        className='cursor-pointer flex'
        onClick={isMenuOpened.toggle}
        aria-label='メニューを開く'
        aria-pressed={isMenuOpened.v}
      >
        <BsThreeDotsIcon className='text-2xl duration-100 hover:opacity-50' />
      </button>

      <DropDownMenu
        open={isMenuOpened.v}
        onClose={onCloseMenu}
        className='top-0 right-40px'
      >
        {user?.id === post.userId && (
          <>
            <li>
              <button
                className='text-left w-full py-2 px-4  hover:bg-primary-light'
                onClick={() => {
                  onEdit?.()
                  onCloseMenu()
                }}
              >
                投稿を編集する
              </button>
            </li>
            <li>
              <button
                className='text-left w-full py-2 px-4 hover:bg-primary-light'
                onClick={async () => {
                  onCloseMenu()
                  await onDelete?.()
                }}
              >
                投稿を
                <span className='font-bold text-danger-dark'>削除</span>
                する
              </button>
            </li>
          </>
        )}

        <li>
          <button
            className='text-left w-full py-2 px-4 hover:bg-primary-light'
            onClick={() => {
              navigator.clipboard.writeText(post.url)
              alert('リンクをコピーしました')
              onCloseMenu()
            }}
            aria-label='記事のリンクをコピーする'
          >
            記事リンクをコピー
          </button>
        </li>

        {user && (
          <>
            <li>
              <button
                className='text-left w-full py-2 px-4 hover:bg-primary-light'
                onClick={isAddBookmarkClicked.toggle}
                onMouseEnter={isHoveringAddBookmark.setTrue}
                onMouseLeave={isHoveringAddBookmark.setFalse}
                aria-label='記事をブックマークに追加する'
              >
                ブックマークに追加
              </button>
            </li>

            {post.bookmark && (
              <li>
                <button
                  className='text-left w-full py-2 px-4 hover:bg-primary-light'
                  onClick={() => {
                    onRemoveBookmark?.()
                    onCloseMenu()
                  }}
                  aria-label='記事をブックマークから削除する'
                >
                  ブックマークを
                  <span className='font-bold text-danger-dark'>削除</span>
                </button>
              </li>
            )}
          </>
        )}
      </DropDownMenu>

      {/* 自分のフォルダ一覧  */}
      {isFolderOpened && (
        <div
          className={`right-120px absolute z-1 ${
            user?.id !== post.userId ? 'top-44px' : 'top-124px'
          }`}
          onMouseEnter={isHoveringAddBookmark.setTrue}
        >
          <FolderList
            post={post}
            onClickFolderName={onCloseMenu}
            onAddBookmark={onAddBookmark}
          />
        </div>
      )}
    </div>
  )
}
