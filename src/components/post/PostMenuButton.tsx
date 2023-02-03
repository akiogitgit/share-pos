import { FC, useCallback, useMemo, useState } from 'react'

import { BsThreeDots as BsThreeDotsIcon } from 'react-icons/bs'

import { FolderList } from './PostFolderList'
import { DropDownMenu } from 'components/shares/base/DropDownMenu'
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
        className='cursor-pointer text-2xl duration-100 hover:opacity-50'
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
              onClick={() => setIsClickedAddBookmark(!isClickedAddBookmark)}
              onMouseEnter={() => setIsMouseEnteredAddBookmark(true)}
              onMouseLeave={() => setIsMouseEnteredAddBookmark(false)}
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
    </div>
  )
}
