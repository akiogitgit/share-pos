import Image from 'next/image'
import Link from 'next/link'
import { FC, useCallback, useState } from 'react'
import { useCookies } from 'stores/useCookies'
import { Post } from 'types/post'
import { deleteApi } from 'utils/api'

type Props = {
  post: Post
}

export const PostItem: FC<Props> = ({ post }) => {
  // ・・・のボタン
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  // コメント全表示ボタン
  const [isOpenComment, setIsOpenComment] = useState(false)
  const [isEdit, setIsEdit] = useState(false)
  const [comment, setComment] = useState(post.comment)

  const { cookies } = useCookies('authInfo')

  const deletePost = useCallback(
    async (id: number) => {
      try {
        const res = await deleteApi(`posts/${id}`, {}, cookies.authInfo)
      } catch (e) {
        console.error(e)
      }
    },
    [cookies.authInfo],
  )

  return (
    <div className='bg-white rounded-xl my-2 max-w-460px p-4 w-90vw sm:w-291px'>
      <div className='flex justify-between'>
        <div className='font-bold text-20px'>{post.user.username}</div>
        {/* ・・・のボタン */}
        <div
          className='cursor-pointer text-23px duration-100 hover:opacity-50'
          onClick={() => setIsOpenMenu(!isOpenMenu)}
        >
          ・・・
        </div>
      </div>
      {isOpenMenu && (
        <div>
          <div
            onClick={() => setIsOpenMenu(false)}
            className='h-100vh opacity-25 top-0 left-0 w-100vw z-10 fixed'
          ></div>
          <div className='border cursor-pointer bg-red-100 border-red-600 rounded-10px transform w-150px z-11 translate-x-230px translate-y-[-20px] absolute sm:(translate-x-60px translate-y-[-20px]) '>
            <div
              className='px-4 pt-2 hover:bg-red-500'
              onClick={() => {
                setIsEdit(true)
                setIsOpenMenu(false)
              }}
            >
              投稿を編集する
            </div>
            <div className='px-4 pt-2 hover:bg-red-500'>
              投稿を
              <span className='font-bold text-red-500 text-18px'>削除</span>
              する
            </div>
            <div className='py-2 px-4 hover:bg-red-500'>フォルダに追加</div>
          </div>
        </div>
      )}
      {/* <details className='relative'>
          <summary className='cursor-pointer list-none text-23px duration-100 hover:opacity-50'>
            ・・・
          </summary>
          <div className='border bg-red-100 border-red-600 transform w-150px translate-x-[-160px] translate-y-[-20px] absolute'>
            <div className='px-4 pt-2 hover:bg-red-500'>投稿を編集する</div>
            <div className='px-4 pt-2 hover:bg-red-500'>
              投稿を
              <span className='font-bold text-red-500 text-18px'>削除</span>する
            </div>
            <div className='py-2 px-4 hover:bg-red-500'>フォルダに追加</div>
          </div>
        </details> */}

      {isEdit ? (
        <form>
          <div className='leading-1.4rem relative'>
            <div className='py-4 px-2 invisible whitespace-pre-wrap break-words'>
              {comment}
            </div>
            <textarea
              className='h-full outline-none border-2 border-red-500 rounded-10px w-full p-2 top-0 left-0 scroll-bar absolute'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className='flex mt-4 gap-3 justify-end'>
            <button
              className='border border-red-500'
              onClick={() => setIsEdit(false)}
            >
              キャンセル
            </button>
            <button className='border border-red-500'>更新</button>
          </div>
        </form>
      ) : (
        <div
          onClick={() => setIsOpenComment(!isOpenComment)}
          className={`${
            !isOpenComment && 'h-70px'
          } min-h-70px mt-3 scroll-bar overflow-y-scroll whitespace-pre-wrap`}
        >
          {post.comment}
        </div>
      )}

      {/* スクロールバーを消す */}
      <style jsx>{`
        .scroll-bar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* <div className='h-70px mt-3 scroll-bar overflow-y-scroll whitespace-pre-wrap'>
        <style jsx>{`
          .scroll-bar::-webkit-scrollbar {
            display: none;
          }
        `}</style>
        {post.comment}
      </div> */}

      <div>
        <Link href={post.url}>
          <a target='_blank'>
            <div className='flex text-blue-600 justify-end'>ページを開く🔗</div>
            <div className='flex rounded-10px h-42vw max-h-225px overflow-hidden items-center sm:h-135px'>
              {post.metaInfo && typeof post.metaInfo.image === 'string' ? (
                <Image
                  src={
                    post.metaInfo.image.substring(8, 18) === 'qiita-user' ||
                    post.metaInfo.image.substring(8, 22) === 'res.cloudinary' ||
                    post.metaInfo.image.substring(0, 21) ===
                      'data:image/png;base64'
                      ? post.metaInfo.image
                      : `https://res.cloudinary.com/demo/image/fetch/${post.metaInfo.image}`
                  }
                  alt=''
                  className='rounded-10px transform duration-300 hover:scale-105'
                  width={430}
                  height={2260}
                  objectFit='contain'
                />
              ) : (
                <div className='flex h-full bg-gray-300 rounded-10px text-mono w-full max-h-225px transform text-30px duration-300 overflow-hidden items-center justify-center hover:scale-110'>
                  No image
                </div>
              )}
            </div>
          </a>
        </Link>
      </div>

      <div className='flex'>
        {[...Array(post.evaluation)].map((v, i) => (
          <div key={i}>☆</div>
        ))}
      </div>
      <div className='flex justify-end'>{post.createdAt.substring(0, 10)}</div>
    </div>
  )
}
