import { FC, useMemo, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { TbBookmarkOff } from 'react-icons/tb'

import { PostLinkCard } from 'components/post/Item/PostLinkCard'
import { PostMenu } from 'components/post/Item/PostMenu'
import { PostForm } from 'components/post/PostForm'
import { useRemoveBookmark } from 'hooks/useBookmark'
import { useUpdatePost } from 'hooks/usePost'
import { Post } from 'types/post'
import { useElementSize } from 'utils/useElementSize'

type Props = {
  post: Post
  className?: string
  selectedFolder: number
}

export const BookmarkPostItem: FC<Props> = ({
  post,
  className,
  selectedFolder,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenComment, setIsOpenComment] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { updatePost } = useUpdatePost(post)
  const { removeBookmark } = useRemoveBookmark(selectedFolder, post)
  const { ref, height } = useElementSize()

  // 要素の高さを取得
  const hasElementMoreThan3Lines = useMemo(() => height > 80, [height])

  const showSeeMore = useMemo(
    () => hasElementMoreThan3Lines && !isOpenComment,
    [hasElementMoreThan3Lines, isOpenComment],
  )

  return (
    <article
      className={`${className} bg-white rounded-xl max-w-460px p-4 w-90vw sm:w-291px`}
    >
      <div className='flex justify-between'>
        <div className='font-bold text-20px'>{post.user.username}</div>
        <div className='flex gap-2'>
          {/* ブックマーク解除 */}
          {post.bookmark && (
            <TbBookmarkOff
              className='cursor-pointer text-40px sm:text-30px'
              onClick={removeBookmark}
            />
          )}
          {/* 投稿メニューボタン */}
          {!isEdit && (
            <button
              className='cursor-pointer text-30px duration-100 hover:opacity-50'
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              <BsThreeDots />
            </button>
          )}
        </div>
      </div>

      {/* 。。。を押して表示されるメニュー */}
      {isOpenMenu && (
        <PostMenu
          setIsEdit={setIsEdit}
          setIsOpenMenu={setIsOpenMenu}
          post={post}
        />
      )}

      {/* 編集中ならtextarea それ以外は コメント表示 */}
      <div className='mt-3'>
        {isEdit ? (
          <div>
            <PostForm
              key={post.id}
              onSubmit={async (params) => {
                await updatePost(params)
                setIsEdit(false)
              }}
              // className='max-w-429px w-83vw sm:w-259px'
              className='w-full'
              formParamsProps={post}
              submitButtonText='更新'
            />
            <button
              className='border bg-gray-500 border-gray-500 mt-2 text-white w-full py-1 duration-300 hover:(opacity-60) '
              onClick={() => setIsEdit(false)}
            >
              キャンセル
            </button>
          </div>
        ) : (
          <>
            <div
              onClick={() =>
                hasElementMoreThan3Lines && setIsOpenComment(!isOpenComment)
              }
              className={`${
                !isOpenComment && 'h-70px'
              } overflow-hidden whitespace-pre-wrap group relative`}
            >
              <div ref={ref} className='h-auto'>
                {post.comment}
              </div>
              <div
                className={`bg-red-200 bg-opacity-70 text-center w-full py-2 top-30px absolute ${
                  showSeeMore
                    ? 'visible sm:invisible sm:group-hover:visible'
                    : 'invisible'
                }`}
              >
                もっとみる
              </div>
            </div>

            <PostLinkCard post={post} />

            <div className='flex mt-1 items-center justify-between'>
              <div className='flex'>
                {[...Array(post.evaluation)].map((v, i) => (
                  <div key={i}>☆</div>
                ))}
              </div>
              <div className='text-13px'>{post.createdAt.substring(0, 10)}</div>
            </div>
          </>
        )}
      </div>
    </article>
  )
}
