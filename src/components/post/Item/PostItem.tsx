import Link from 'next/link'
import { FC, useState } from 'react'

import { PostForm } from '../PostForm'
import { PostItemComment } from './PostItemComment'
import { PostLinkCard } from './PostLinkCard'
import { PostMenuButton } from './PostMenuButton'
import { Button } from 'components/shares/button'
import { useAddBookmark, useRemoveBookmark } from 'hooks/useBookmark'
import { useDeletePost, useUpdatePost } from 'hooks/usePost'

import { Post } from 'types/post'

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
    <article className='bg-white rounded-xl max-w-460px p-4 w-90vw sm:w-291px'>
      <div className='flex justify-between items-center'>
        <Link href={`/users/${post.user.id}`}>
          <a className='cursor-pointer font-bold text-20px'>
            {post.user.username}
          </a>
        </Link>
        <div className='flex gap-2'>
          {/* {post.bookmark && (
            <TbBookmarkOffIcon
              className='cursor-pointer text-40px sm:text-30px'
              onClick={removeBookmark}
            />
          )} */}

          {/* 右上の・・・ボタン */}
          <PostMenuButton
            post={post}
            onEdit={() => setIsEditing(true)}
            onDelete={() => deletePost()}
            onAddBookmark={(folderId, post) => addBookmark(folderId, post)}
            onRemoveBookmark={() => removeBookmark()}
          />
        </div>
      </div>

      {/* 編集中ならtextarea それ以外は コメント表示 */}
      <div className='mt-3'>
        {isEditing ? (
          <div>
            <PostForm
              onSubmit={async params => {
                await updatePost(params)
                setIsEditing(false)
              }}
              formParamsProps={post}
              submitButtonText='更新'
            />
            <Button
              color='gray'
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

            {/* urlのサムネイル画像等 */}
            <PostLinkCard post={post} />

            <div className='flex mt-1 items-center justify-between'>
              <div className='flex'>
                {[...Array(post.evaluation)].map(v => (
                  <div key={v}>☆</div>
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
