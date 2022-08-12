import Image from 'next/image'
import Link from 'next/link'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PostForm } from './PostForm'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'stores/useCookies'
import { Post, PostCreateParams } from 'types/post'
import { deleteApi, putApi } from 'utils/api'

type Props = {
  post: Post
}

export const PostItem: FC<Props> = ({ post }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false)
  const [isOpenComment, setIsOpenComment] = useState(false)
  // 投稿の編集 commentだけでなく、オブジェクトでやるかも
  const [isEdit, setIsEdit] = useState(false)
  const [comment, setComment] = useState(post.comment)

  const [formParams, setFormParams] = useState<PostCreateParams>({
    comment: '',
    url: '',
    evaluation: 1,
    published: false,
  })
  const [commentElment, setCommentElment] = useState<HTMLDivElement>(null!)
  const commentRef = useRef<HTMLDivElement>(null!)

  const { data: posts, mutate } = useGetApi<Post[]>('/posts')
  const authHeaderParams = useAuthHeaderParams()
  const { cookies } = useCookies('userInfo')

  // params は postParams でまとめるかも urlは変える予定ない
  const updatePost = useCallback(
    async (id: number, comment: string) => {
      try {
        const params = { post: { comment } }
        const res = await putApi<Post>(`/posts/${id}`, params, authHeaderParams)
        if (!res || !posts) {
          return
        }
        const newPosts = posts.map((post) => {
          if (post.id === res.id) {
            return res
          }
          return post
        })
        mutate(newPosts, false)
        setIsEdit(false)
      } catch (e) {
        console.error(e)
      }
    },
    [authHeaderParams, mutate, posts],
  )
  const updatePost2 = (params: PostCreateParams) => {}

  const deletePost = useCallback(
    async (id: number) => {
      try {
        const res = await deleteApi(`/posts/${id}`, undefined, authHeaderParams)
        if (!posts) {
          return
        }
        const newPosts = posts.filter((v) => v.id !== post.id)
        mutate(newPosts, false)

        console.log(res)
      } catch (e) {
        console.error(e)
      }
    },
    [authHeaderParams, mutate, post.id, posts],
  )

  const pickDomainFromURL = useCallback((url: string) => {
    return url.split('//')[1].split('/')[0]
  }, [])

  // ドメインによって、表示するURLを変える
  const determineUrlByDomain = useCallback((imageURL: string) => {
    return ['qiita-user', 'res.cloudinary', 'data:image/png;base64'].some((v) =>
      imageURL.includes(v),
    )
      ? imageURL
      : `https://res.cloudinary.com/demo/image/fetch/${imageURL}`
  }, [])

  // 要素の高さを取得
  useEffect(() => {
    setCommentElment(commentRef.current)
  }, [commentRef])

  const hasElment3MoreThanLines = useMemo(
    () => commentElment && commentElment.getBoundingClientRect().height > 80,
    [commentElment],
  )

  const showSeeMore = useMemo(
    () => hasElment3MoreThanLines && !isOpenComment,
    [hasElment3MoreThanLines, isOpenComment],
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
                  onClick={() => deletePost(post.id)}
                >
                  投稿を
                  <span className='font-bold text-red-500 text-18px'>削除</span>
                  する
                </div>
              </>
            )}
            <div className='rounded-b-10px py-2 px-4 hover:bg-red-300'>
              フォルダに追加
            </div>
          </div>
        </div>
      )}

      {/* 編集中ならtextarea それ以外は コメント表示 */}
      <div className='mt-3'>
        {isEdit ? (
          <PostForm
            onSubmit={updatePost2}
            className='max-w-420px w-80vw sm:w-255px'
          />
        ) : (
          <div
            onClick={() =>
              hasElment3MoreThanLines && setIsOpenComment(!isOpenComment)
            }
            className={`${
              !isOpenComment && 'h-70px'
            } overflow-hidden whitespace-pre-wrap group relative`}
          >
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
      </div>

      <figure className='border-2 rounded-10px mt-2 duration-300 group hover:bg-gray-100 '>
        <Link href={post.url}>
          <a target='_blank'>
            <div className='flex rounded-t-10px h-42vw max-h-215px overflow-hidden items-center sm:h-133px'>
              {post.metaInfo.image ? (
                <Image
                  src={determineUrlByDomain(post.metaInfo.image)}
                  alt=''
                  className='bg-gray-100 rounded-10px transform duration-300 group-hover:scale-110'
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
            <figcaption className='p-2'>
              <p className='text-13px text-gray-500'>
                {pickDomainFromURL(post.url)}
              </p>
              <div className='h-37px mt-2 text-sm overflow-hidden'>
                {post.metaInfo.title}
              </div>
            </figcaption>
          </a>
        </Link>
      </figure>

      <div className='flex mt-1 items-center justify-between'>
        <div className='flex'>
          {[...Array(post.evaluation)].map((v, i) => (
            <div key={i}>☆</div>
          ))}
        </div>
        <div className='text-13px'>{post.createdAt.substring(0, 10)}</div>
      </div>
    </article>
  )
}
