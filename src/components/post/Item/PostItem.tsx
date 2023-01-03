import Link from 'next/link'
import { FC, useState } from 'react'

import { PostForm } from '../PostForm'
import { PostItemComment } from './PostComment'
import { PostLinkCaption } from './PostLinkCaption'
import { PostLinkImage } from './PostLinkImage'
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

  if (isEditing) {
    return (
      <article className='bg-white rounded-lg shadow-xl max-w-460px p-4 w-100%'>
        <div className='flex justify-between items-center'>
          <Link href={`/users/${post.user.id}`}>
            <div className='cursor-pointer flex font-bold text-20px gap-2 items-center'>
              <Avatar id={post.userId} />
              {post.user.username}
            </div>
          </Link>
        </div>

        <div className='mt-3'>
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
        </div>
      </article>
    )
  }

  return (
    <article className='bg-white rounded-lg shadow-xl max-w-460px p-4 w-100%'>
      <div className='flex justify-between items-center'>
        <Link href={`/users/${post.user.id}`}>
          <div className='cursor-pointer flex font-bold text-20px gap-2 items-center'>
            <Avatar id={post.userId} />
            {post.user.username}
          </div>
        </Link>
        {/* 右上の・・・ボタン */}
        <PostMenuButton
          post={post}
          onEdit={() => setIsEditing(true)}
          onDelete={deletePost}
          onAddBookmark={(folderId, post) => addBookmark(folderId, post)}
          onRemoveBookmark={removeBookmark}
        />
      </div>

      <div className='mt-3'>
        <PostItemComment comment={post.comment} />
        {/* LinkCard */}
        <div className='mt-2'>
          <figure className='border-2 rounded-10px mt-2 duration-300 overflow-hidden group hover:bg-gray-100 '>
            <a href={post.url} target='_blank' rel='noreferrer'>
              <div
                className={`flex h-40vw max-h-220px overflow-hidden items-center ${
                  post.bookmark?.id
                    ? 'sm:h-26vw md:(h-26vw) lg:(max-h-155px)'
                    : 'sm:h-19.5vw md:h-20vw lg:(h-13vw max-h-135px)'
                }`}
              >
                <PostLinkImage post={post} />
              </div>

              <PostLinkCaption post={post} />
            </a>
          </figure>
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
          <p className='text-13px'>{calcHowManyDaysAgo(post.createdAt)}</p>
        </div>
      </div>
    </article>
  )
}
