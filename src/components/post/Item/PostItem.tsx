import { FC, useState } from 'react'
import { TbBookmarkOff } from 'react-icons/tb'
import { PostForm } from '../PostForm'
import { PostItemComment } from './PostItemComment'
import { PostLinkCard } from './PostLinkCard'
import { PostMenuButton } from './PostMenuButton'
import { useRemoveBookmark } from 'hooks/useBookmark'
import { useUpdatePost } from 'hooks/usePost'
import { Post } from 'types/post'

type Props = {
  post: Post
  selectedFolderId?: number
}

export const PostItem: FC<Props> = ({ post, selectedFolderId = 0 }) => {
  const [isEditing, setIsEditing] = useState(false)

  const { removeBookmark } = useRemoveBookmark(selectedFolderId, post)
  const { updatePost } = useUpdatePost(post)

  return (
    <article className='bg-white rounded-xl max-w-460px p-4 w-90vw sm:w-291px'>
      <div className='flex justify-between'>
        <div className='font-bold text-20px'>{post.user.username}</div>
        <div className='flex gap-2'>
          {/* ブックマーク解除 (マイページ/ブックマークで表示) */}
          {post.bookmark && (
            <TbBookmarkOff
              className='cursor-pointer text-40px sm:text-30px'
              onClick={removeBookmark}
            />
          )}
          {/* 投稿メニューボタン */}
          <PostMenuButton post={post} onEdit={() => setIsEditing(true)} />
        </div>
      </div>

      {/* 編集中ならtextarea それ以外は コメント表示 */}
      <div className='mt-3'>
        {isEditing ? (
          <div className=''>
            <PostForm
              key={post.id}
              onSubmit={async (params) => {
                await updatePost(params)
                setIsEditing(false)
              }}
              formParamsProps={post}
              submitButtonText='更新'
            />
            <button
              className='border bg-gray-500 border-gray-500 mt-2 text-white w-full py-1 duration-300 hover:(opacity-60) '
              onClick={() => setIsEditing(false)}
            >
              キャンセル
            </button>
          </div>
        ) : (
          <>
            <PostItemComment comment={post.comment} />

            {/* urlのサムネイル画像等 */}
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
