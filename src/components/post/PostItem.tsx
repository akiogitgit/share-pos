import Link from 'next/link'
import { FC } from 'react'

import { Avatar } from 'components/shares/base/Avatar'
import { Button } from 'components/shares/base/Button'
import { useAddBookmark, useRemoveBookmark } from 'hooks/useBookmark'
import { useBoolean } from 'hooks/useBoolean'
import { useDeletePost, useUpdatePost } from 'hooks/usePost'
import { Post } from 'types/post'
import { calcHowManyDaysAgo } from 'utils/calcHowManyDaysAgo'

import { PostItemComment } from './PostComment'
import { PostForm } from './PostForm'
import { PostLinkCard } from './PostLinkCard'
import { PostMenuButton } from './PostMenuButton'

// bookmarkページの時、folderIdを受け取る
type Props = {
  post: Post
  folderId?: string
}

export const PostItem: FC<Props> = ({ post, folderId = '' }) => {
  const isEditing = useBoolean(false)

  const { updatePost } = useUpdatePost(post)
  const { deletePost } = useDeletePost(post)
  const { addBookmark } = useAddBookmark()
  const { removeBookmark } = useRemoveBookmark(folderId, post)

  return (
    <article className='bg-white rounded-md shadow-xl max-w-460px p-4 w-100% sm:w-291px'>
      <div className='flex justify-between items-center'>
        <Link href={`/users/${post.user.id}`}>
          <div className='cursor-pointer flex font-bold text-lg gap-2 items-center'>
            <Avatar id={post.userId} />
            {post.user.username}
          </div>
        </Link>
        {/* 右上の・・・ボタン */}
        <PostMenuButton
          post={post}
          onEdit={isEditing.setTrue}
          onDelete={deletePost}
          onAddBookmark={(folderId, post) => addBookmark(folderId, post)}
          onRemoveBookmark={removeBookmark}
        />
      </div>

      {/* 編集中ならtextarea それ以外は コメント表示 */}
      <div className='mt-3'>
        {isEditing.v ? (
          <div className='mx-1'>
            <PostForm
              onSubmit={async params => {
                await updatePost(params)
                isEditing.setFalse()
              }}
              formParamsProps={post}
              submitButtonText='更新'
            />
            <Button
              color='secondary'
              fullWidth
              className='mt-2'
              onClick={isEditing.setFalse}
            >
              キャンセル
            </Button>
          </div>
        ) : (
          <>
            <PostItemComment comment={post.comment} />

            <div className='mt-2'>
              <PostLinkCard post={post} />
            </div>

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
              <p className='text-sm'>{calcHowManyDaysAgo(post.createdAt)}</p>
            </div>
          </>
        )}
      </div>
    </article>
  )
}
