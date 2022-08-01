import Image from 'next/image'
import Link from 'next/link'
import { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useCookies } from 'stores/useCookies'
import { Post } from 'types/post'

type Props = {
  post: Post
}

export const PostItem: FC<Props> = ({ post }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenComment, setIsOpenComment] = useState(false)
  // 投稿の編集 commentだけでなく、オブジェクトでやるかも
  const [isEdit, setIsEdit] = useState(false)
  const [comment, setComment] = useState(post.comment)
  const commentRef = useRef<HTMLDivElement>(null!)
  const [commentElm, setCommentElm] = useState<HTMLDivElement>(null!)
  const { cookies } = useCookies('authInfo')

  // params は postParams でまとめるかも urlは変える予定ない
  // const updatePost = useCallback(async (id: number, comment: string) => {
  //   try {
  //     const res = await postApi(`/posts/${id}`)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }, [])

  // const deletePost = useCallback(
  //   async (id: number) => {
  //     try {
  //       const res = await deleteApi(`posts/${id}`, {}, cookies.authInfo)
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   },
  //   [cookies.authInfo],
  // )

  const pickDomainFromURL = useCallback((url: string) => {
    return url.split('//')[1].split('/')[0]
  }, [])

  // ドメインによって、表示するURLを変える
  const supportedDomains = useCallback((imageURL: string) => {
    return ['qiita-user', 'res.cloudinary', 'data:image/png;base64'].some((v) =>
      imageURL.includes(v),
    )
      ? imageURL
      : `https://res.cloudinary.com/demo/image/fetch/${imageURL}`
  }, [])

  useEffect(() => {
    setCommentElm(commentRef.current)
  }, [commentRef])

  const showSeeMore =
    commentElm &&
    commentElm.getBoundingClientRect().height > 80 &&
    !isOpenComment

  return (
    <div className='bg-white rounded-xl my-2 max-w-460px p-4 w-90vw sm:w-291px'>
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
        <div>
          <div
            onClick={() => setIsOpenMenu(false)}
            className='h-100vh opacity-25 top-0 left-0 w-100vw z-10 fixed'
          ></div>
          <div className='border cursor-pointer bg-red-100 border-red-600 rounded-10px transform w-150px z-11 translate-x-230px translate-y-[-20px] absolute sm:(translate-x-60px translate-y-[-20px]) '>
            <div
              className='rounded-t-10px px-4 pt-2 hover:bg-red-300'
              onClick={() => {
                setIsEdit(true)
                setIsOpenMenu(false)
              }}
            >
              投稿を編集する
            </div>
            <div className='px-4 pt-2 hover:bg-red-300'>
              投稿を
              <span className='font-bold text-red-500 text-18px'>削除</span>
              する
            </div>
            <div className='rounded-b-10px py-2 px-4 hover:bg-red-300'>
              フォルダに追加
            </div>
          </div>
        </div>
      )}

      {/* 編集中ならtextarea それ以外は コメント表示 */}
      {/* コメントは、overflow-scrollで、クリックで全文表示 */}
      {isEdit ? (
        <form>
          <div className='leading-1.4rem relative'>
            <div className='py-4 px-2 invisible whitespace-pre-wrap break-words'>
              {comment}
            </div>
            <textarea
              className='border h-full outline-none border-red-500 rounded-10px w-full p-2 top-0 left-0 scroll-bar absolute'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div className='flex mt-4 gap-3 justify-end'>
            <button
              className='border border-gray-500 py-1 px-2 text-gray-500 duration-300 hover:(bg-gray-500 text-white rounded-10px) '
              onClick={() => setIsEdit(false)}
            >
              キャンセル
            </button>
            <button className='border bg-red-500 border-red-500 text-white py-1 px-2 duration-300 hover:(bg-white text-red-500 rounded-10px) '>
              更新
            </button>
          </div>
        </form>
      ) : (
        <div
          onClick={() => setIsOpenComment(!isOpenComment)}
          className={`${
            !isOpenComment && 'h-70px'
          } mt-3 overflow-hidden whitespace-pre-wrap group relative`}
        >
          {/* <span ref={ref} className='h-auto'> */}
          <div ref={commentRef} className='h-auto'>
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
      )}

      {/* スクロールバーを消す */}
      <style jsx>{`
        .scroll-bar::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      {/* 画像ないなら No image */}
      {/* 画像がQiita, Zenn, Instagram ならそのまま表示 */}
      {/* 上が違うなら、res.cloudinaryのfetchで表示 */}
      {/* <article className='border-2 rounded-10px mt-2 p-2 duration-300 group hover:bg-gray-100 '>
        <Link href={post.url}>
          <a target='_blank'>
            <div className='h-45px overflow-hidden group-hover:underline'>
              {typeof post.metaInfo.image === 'string' ? (
                post.metaInfo.title
              ) : (
                <div className='flex justify-end'>ページを開く🔗</div>
              )}
            </div>
            // <div className='flex rounded-10px h-42vw max-h-225px overflow-hidden items-center sm:h-135px'>
            <div className='flex rounded-10px h-42vw mt-3.5 max-h-215px overflow-hidden items-center sm:h-126px'>
              {typeof post.metaInfo.image === 'string' ? (
                <Image
                  src={supportedDomains(post.metaInfo.image)}
                  alt=''
                  className='rounded-10px transform duration-300 group-hover:scale-105'
                  width={430}
                  height={2260}
                  objectFit='contain'
                />
              ) : (
                <div className='flex h-full bg-gray-300 rounded-10px text-mono w-full max-h-225px transform text-30px duration-300 overflow-hidden items-center justify-center group-hover:scale-110'>
                  No image
                </div>
              )}
            </div>

            <p className='text-13px text-gray-600'>
              {pickDomainFromURL(post.url)}
            </p>
          </a>
        </Link>
      </article>  */}

      <article className='border-2 rounded-10px mt-2 duration-300 group hover:bg-gray-100 '>
        <Link href={post.url}>
          <a target='_blank'>
            {/* // <div className='flex rounded-10px h-42vw max-h-225px overflow-hidden items-center sm:h-135px'> */}
            <div className='flex rounded-t-10px h-42vw max-h-215px overflow-hidden items-center sm:h-133px'>
              {typeof post.metaInfo.image === 'string' ? (
                <Image
                  src={supportedDomains(post.metaInfo.image)}
                  alt=''
                  className='bg-gray-100 rounded-10px transform duration-300 group-hover:scale-105'
                  width={430}
                  height={2000}
                  objectFit='contain'
                />
              ) : (
                <div className='flex h-full bg-gray-300 rounded-t-10px text-mono w-full max-h-225px transform text-30px duration-300 overflow-hidden items-center justify-center group-hover:scale-110'>
                  No image
                </div>
              )}
            </div>
            <div className='p-2'>
              <p className='text-13px text-gray-500'>
                {pickDomainFromURL(post.url)}
              </p>
              <div className='h-37px mt-2 text-sm overflow-hidden group-hover:underline'>
                {typeof post.metaInfo.image === 'string' ? (
                  post.metaInfo.title
                ) : (
                  <div className='flex justify-end'>ページを開く🔗</div>
                )}
              </div>
            </div>
          </a>
        </Link>
      </article>

      <div className='flex mt-1 items-center justify-between'>
        <div className='flex'>
          {[...Array(post.evaluation)].map((v, i) => (
            <div key={i}>☆</div>
          ))}
        </div>
        <div className='text-13px'>{post.createdAt.substring(0, 10)}</div>
      </div>
    </div>
  )
}
