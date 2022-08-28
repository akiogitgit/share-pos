import { FC, useCallback, useMemo, useState } from 'react'
import { TbBookmarkOff } from 'react-icons/tb'

import { FolderList } from 'components/post/Item/FolderList'
import { PostLinkCard } from 'components/post/Item/PostLinkCard'
import { PostForm } from 'components/post/PostForm'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { useUpdatePost, useDeletePost } from 'hooks/usePost'
import { useCookies } from 'stores/useCookies'
import { BookmarkPosts } from 'types/bookmark'
import { Post } from 'types/post'
import { deleteApi, HttpError } from 'utils/api'
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
  const { cookies } = useCookies('userInfo')

  const { updatePost } = useUpdatePost(post)
  const { deletePost } = useDeletePost(post)
  const { ref, height } = useElementSize()

  const authHeaderParams = useAuthHeaderParams()
  const { data: bookmarkPosts, mutate: postsMutate } = useGetApi<BookmarkPosts>(
    `/folders/${selectedFolder}`,
    undefined,
    authHeaderParams,
  )

  // 要素の高さを取得
  const hasElementMoreThan3Lines = useMemo(() => height > 80, [height])

  const showSeeMore = useMemo(
    () => hasElementMoreThan3Lines && !isOpenComment,
    [hasElementMoreThan3Lines, isOpenComment],
  )

  const removeBookmark = useCallback(async () => {
    try {
      const res = await deleteApi(
        `/folders/bookmarks/${post.bookmark?.id}`,
        {},
        authHeaderParams,
      )
      if (!bookmarkPosts) {
        return
      }

      const newBookmarkPosts = {
        id: bookmarkPosts?.id,
        name: bookmarkPosts?.name,
        posts: bookmarkPosts?.posts.filter(
          (v) => v.bookmark?.id !== post.bookmark?.id,
        ),
      }
      postsMutate(newBookmarkPosts, false)
      console.log('ブックマークを削除しました', res)
    } catch (e) {
      if (e instanceof HttpError) {
        console.error(e.message)
      }
    }
  }, [authHeaderParams, bookmarkPosts, post.bookmark?.id, postsMutate])

  return (
    <article
      className={`${className} bg-white rounded-xl max-w-460px p-4 w-90vw sm:w-291px`}
    >
      <div className='flex justify-between'>
        <div className='font-bold text-20px'>{post.user.username}</div>
        <div className='flex'>
          {post.bookmark && (
            <TbBookmarkOff
              className='cursor-pointer h-7 w-7'
              onClick={removeBookmark}
            />
          )}
          {/* 投稿メニューボタン */}
          {!isEdit && (
            <button
              className='cursor-pointer text-23px duration-100 hover:opacity-50'
              onClick={() => setIsOpenMenu(!isOpenMenu)}
            >
              ・・・
            </button>
          )}
        </div>
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
              記事リンクをコピー
            </div>
            {cookies.userInfo && (
              <div className='rounded-b-10px group relative'>
                <div className=' py-2 px-4 hover:bg-red-300'>
                  ブックマークに追加
                </div>
                <div className='hidden group-hover:block'>
                  <FolderList post={post} setIsOpenMenu={setIsOpenMenu} />
                </div>
              </div>
            )}
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
                hasElementMoreThan3Lines && setIsOpenComment(!isOpenComment)
              }
              className={`${
                !isOpenComment && 'h-70px'
              } overflow-hidden whitespace-pre-wrap group relative`}
            >
              {/* <textarea className='m-2 ring w-100%' ref={ref}></textarea> */}
              {/* <div className='h-auto'> */}
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
