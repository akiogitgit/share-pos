import { FC, useCallback, useMemo, useState } from 'react'

import { BsThreeDots as BsThreeDotsIcon } from 'react-icons/bs'

import { FolderList } from './PostFolderList'
import { DropDownMenu } from 'components/shares/base/DropDownMenu'
import { useGetApi } from 'hooks/useApi'
import { Post } from 'types/post'
import { User } from 'types/user'

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

  const [isMenuOpened, setMenuOpened] = useState(false) // menu自体
  const [isAddBookmarkClicked, setAddBookmarkClicked] = useState(false) //
  const [isHoveringAddBookmark, setHoveringAddBookmark] = useState(false)

  const isFolderOpened = useMemo(() => {
    return isAddBookmarkClicked || isHoveringAddBookmark
  }, [isAddBookmarkClicked, isHoveringAddBookmark])

  const onCloseMenu = useCallback(() => {
    setMenuOpened(false)
    setAddBookmarkClicked(false)
    setHoveringAddBookmark(false)
  }, [])

  return (
    <div className='flex relative'>
      <BsThreeDotsIcon
        className='cursor-pointer text-2xl duration-100 hover:opacity-50'
        onClick={() => setMenuOpened(v => !v)}
      />

      <DropDownMenu
        open={isMenuOpened}
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
              <span className='font-bold text-danger-dark'>削除</span>
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
            <div
              className='text-left w-full py-2 px-4 hover:bg-primary-light'
              onClick={() => setAddBookmarkClicked(!isAddBookmarkClicked)}
              onMouseEnter={() => setHoveringAddBookmark(true)}
              onMouseLeave={() => setHoveringAddBookmark(false)}
            >
              ブックマークに追加
            </div>

            {post.bookmark && (
              <button
                className='text-left w-full py-2 px-4 hover:bg-primary-light'
                onClick={() => {
                  onRemoveBookmark?.()
                  onCloseMenu()
                }}
              >
                ブックマークを
                <span className='font-bold text-danger-dark'>削除</span>
              </button>
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
          onMouseEnter={() => setHoveringAddBookmark(true)}
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
