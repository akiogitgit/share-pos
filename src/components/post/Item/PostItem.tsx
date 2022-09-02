import { FC, useState } from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { TbBookmarkOff } from 'react-icons/tb'
import { PostForm } from '../PostForm'
import { PostItemComment } from './PostItemComment'
import { PostLinkCard } from './PostLinkCard'
import { PostMenu } from './PostMenu'
import { useRemoveBookmark } from 'hooks/useBookmark'
import { useUpdatePost } from 'hooks/usePost'
import { Post } from 'types/post'

type Props = {
  post: Post
  className?: string
  selectedFolder?: number
}

export const PostItem: FC<Props> = ({
  post,
  className,
  selectedFolder = 0,
}) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const { removeBookmark } = useRemoveBookmark(selectedFolder, post)
  const { updatePost } = useUpdatePost(post)

  return (
    <article
      className={`${className} bg-white rounded-xl max-w-460px p-4 w-90vw sm:w-291px`}
    >
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
