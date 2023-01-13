import Link from 'next/link'
import { FC, useState } from 'react'

import { PostForm } from '../PostForm'
import { PostItemComment } from './PostComment'
import { PostLinkCard } from './PostLinkCard'
import { PostMenuButton } from './PostMenuButton'
import { Avatar } from 'components/shares/Avatar'
import { Button } from 'components/shares/button'
import { useAddBookmark, useRemoveBookmark } from 'hooks/useBookmark'
import { useDeletePost, useUpdatePost } from 'hooks/usePost'

import { Post } from 'types/post'
import { calcHowManyDaysAgo } from 'utils/calcHowManyDaysAgo'

// bookmarkページの時、bookmarkFolderIdを受け取る
type Props = {
  post: Post
  bookmarkFolderId?: string
}

export const PostItem: FC<Props> = ({ post, bookmarkFolderId = '' }) => {
  const [isEditing, setIsEditing] = useState(false)

  const { updatePost } = useUpdatePost(post)
  const { deletePost } = useDeletePost(post)
  const { addBookmark } = useAddBookmark()
  const { removeBookmark } = useRemoveBookmark(bookmarkFolderId, post)

  return (
    <article className='bg-white rounded-md shadow-xl max-w-460px p-4 w-100% sm:w-291px'>
      <div className='flex justify-between items-center'>
        <Link href={`/users/${post.user.id}`}>
          <div className='cursor-pointer flex font-bold text-20px gap-2 items-center'>
            <Avatar id={post.userId} />
            {post.user.username}
          </div>
        </Link>
        <div className='flex gap-2'>
          {/* 右上の・・・ボタン */}
          <PostMenuButton
            post={post}
            onEdit={() => setIsEditing(true)}
            onDelete={deletePost}
            onAddBookmark={(folderId, post) => addBookmark(folderId, post)}
            onRemoveBookmark={removeBookmark}
          />
        </div>
      </div>

      {/* 編集中ならtextarea それ以外は コメント表示 */}
      <div className='mt-3'>
        {isEditing ? (
          <div className='mx-1'>
            <PostForm
              onSubmit={async params => {
                await updatePost(params)
                setIsEditing(false)
              }}
              formParamsProps={post}
              submitButtonText='更新'
            />
            <Button
              color='secondary'
              fullWidth
              className='mt-2'
              onClick={() => setIsEditing(false)}
            >
              キャンセル
            </Button>
          </div>
        ) : (
          <>
            <PostItemComment comment={post.comment} />

            <PostLinkCard post={post} />

            {/* 返信 */}
            <div className='flex h-6 mt-2 items-center justify-between'>
              {post.replyComments.length ? (
                <Link href=''>
                  <p className='cursor-pointer text-primary-dark'>
                    {post.replyComments?.length}件の返信
                  </p>
                </Link>
              ) : (
                <p />
              )}
              <p className='text-13px'>{calcHowManyDaysAgo(post.createdAt)}</p>
            </div>
          </>
        )}
      </div>
    </article>
  )
}
