import { FC, useMemo, useState } from 'react'
import { PostForm } from './PostForm'
import { PostLinkCard } from './PostLinkCard'
import { useUpdatePost, useDeletePost } from 'hooks/usePost'
import { useCookies } from 'stores/useCookies'
import { Post } from 'types/post'
import { useElementSize } from 'utils/useElementSize'

type Props = {
  post: Post
}

export const PostItem: FC<Props> = ({ post }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenComment, setIsOpenComment] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const { cookies } = useCookies('userInfo')

  const { updatePost } = useUpdatePost(post)
  const { deletePost } = useDeletePost(post)
  const { ref, height, width } = useElementSize()

  // 要素の高さを取得
  const hasElement3MoreThanLines = useMemo(() => height > 80, [height])

  const showSeeMore = useMemo(
    () => hasElement3MoreThanLines && !isOpenComment,
    [hasElement3MoreThanLines, isOpenComment],
  )

  return (
    <article className='bg-white rounded-xl my-2 max-w-460px p-4 w-90vw sm:w-291px'>
      <div className='flex justify-between'>
        <div className='font-bold text-20px'>{post.user.username}</div>
        {/* 投稿メニューボタン */}
        <button
          className='cursor-pointer text-23px duration-100 hover:opacity-50'
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          ・・・
        </button>
      </div>
      {isOpenMenu && (
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
              リンクをコピー
            </div>
            <div className='rounded-b-10px py-2 px-4 hover:bg-red-300'>
              フォルダに追加
            </div>
          </div>
        </div>
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
                hasElement3MoreThanLines && setIsOpenComment(!isOpenComment)
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
