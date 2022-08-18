import { FC, useCallback, useEffect, useState } from 'react'
import { BsFolder } from 'react-icons/bs'
import { PostItem } from 'components/post/PostItem'
import { PostItemList } from 'components/post/PostItemList'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { Bookmark, BookmarkPosts } from 'types/bookmark'
import { deleteApi, postApi } from 'utils/api'

export const MyBookmark: FC = () => {
  const [isOpenInputField, setIsOpenInputField] = useState(false)
  const [bookmarkName, setBookmarkName] = useState('')
  // 一番左のブックマークidを初期値で入れたい
  const [selectedBookmark, setSelectedBookmark] = useState(0)

  const authHeaderParams = useAuthHeaderParams()
  const { data: bookmarks, mutate } = useGetApi<Bookmark[]>(
    '/folders',
    undefined,
    authHeaderParams,
  )
  const { data: bookmarkPosts, mutate: postsMutate } = useGetApi<BookmarkPosts>(
    `/folders/${selectedBookmark}`,
    undefined,
    authHeaderParams,
  )
  console.log(bookmarkPosts)

  // あんま使いたくない
  useEffect(() => {
    if (bookmarks?.length) {
      setSelectedBookmark(bookmarks[0].id)
    }
  }, [bookmarks])

  const createBookmark = useCallback(async () => {
    try {
      const res = await postApi<Bookmark>(
        '/folders',
        { name: bookmarkName },
        authHeaderParams,
      )
      if (res && bookmarks) {
        console.log('フォルダの作成に成功 ', res)
        mutate([...bookmarks, res], false)
      }

      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }, [authHeaderParams, bookmarkName, bookmarks, mutate])

  const deleteBookmark = useCallback(async () => {
    try {
      const res = await deleteApi('/folders/3', {}, authHeaderParams)
      console.log(res)
    } catch (e) {
      console.error(e)
    }
  }, [authHeaderParams])

  return (
    <div>
      <div className='ml-4 sm:ml-0'>
        <div className='flex justify-between'>
          <h1 className='font-bold text-2xl'>ブックマーク</h1>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                createBookmark()
                setBookmarkName('')
              }}
              className='flex gap-3 items-center'
            >
              <input
                type='text'
                className='border outline-none border-red-500 rounded-10px h-40px px-2 w-170px duration-150 sm:w-200px'
                placeholder='ブックマーク名'
                value={bookmarkName}
                required
                onChange={(e) => setBookmarkName(e.target.value)}
                style={{
                  clipPath: `${
                    isOpenInputField ? 'inset(0)' : 'inset(0 0 0 100%)'
                  }`,
                }}
              />

              <button
                type={bookmarkName ? 'submit' : 'button'}
                className='font-bold bg-red-500 rounded-10px h-40px text-white text-4xl w-40px relative'
                onClick={() => setIsOpenInputField(!isOpenInputField)}
              >
                <div
                  className={`top-1px left-9px h-42px absolute transform duration-400 ${
                    !bookmarkName && isOpenInputField && 'rotate-360'
                  } ${
                    bookmarkName &&
                    'rotate-45 scale-x-70 translate-x-[-10px] translate-y-6px'
                  }`}
                >
                  ー
                </div>
                <div
                  className={`top-1px left-9px h-42px absolute transform rotate-90 duration-400 ${
                    !bookmarkName && isOpenInputField && 'rotate-[-180deg]'
                  } ${
                    bookmarkName &&
                    'rotate-137 scale-x-140 translate-x-3px translate-y-px'
                  }`}
                >
                  ー
                </div>
              </button>
            </form>
          </div>
        </div>

        <style jsx>{`
          .scroll-bar::-webkit-scrollbar {
            height: 0;
          }

          .scroll-bar:hover::-webkit-scrollbar {
            width: 10px;
            height: 10px;
          }
          .scroll-bar::-webkit-scrollbar-track {
            border-radius: 100px;
            background-color: rgba(254, 226, 226, var(--tw-bg-opacity));
            height: 100px;
            transform: scale(0.5);
          }
          .scroll-bar::-webkit-scrollbar-thumb {
            border-radius: 100px;
            background-color: rgba(239, 68, 68, var(--tw-bg-opacity));
          }
        `}</style>

        {bookmarks?.length ? (
          // ブックマーク名一覧
          <div className='flex h-50px mt-5 gap-2 overflow-x-scroll scroll-bar sm:w-70vw md:w-full'>
            {bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className={`whitespace-nowrap h-40px flex gap-1 ${
                  selectedBookmark === bookmark.id
                    ? 'border-b-3 border-red-500 text-red-500'
                    : 'text-gray-500 border-b-2'
                }`}
              >
                <BsFolder className='mt-3.5' />

                <button
                  onClick={() => setSelectedBookmark(bookmark.id)}
                  className={`${
                    selectedBookmark === bookmark.id && 'font-bold'
                  }`}
                >
                  {bookmark.name}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className='mx-auto mt-20 w-300px'>
            <p className='overflow-hidden'>
              右の
              <span className='font-bold bg-red-500 rounded-10px text-white px-1 text-30px'>
                +
              </span>
              を押してブックマークを作成
            </p>
            <p>ブックマークを作成して記事を追加しよう！</p>
            <p>画像を貼って手順を分かりやすく表示</p>
          </div>
        )}
      </div>

      <ul className='mt-4'>
        {bookmarkPosts?.posts.length ? (
          <PostItemList className='flex flex-wrap justify-center sm:justify-start'>
            {bookmarkPosts.posts.map((post, i) => (
              <PostItem post={post} key={i} className='m-2' />
            ))}
          </PostItemList>
        ) : (
          <h2 className='mt-20 text-center'>記事がありません</h2>
        )}
      </ul>
    </div>
  )
}

{
  /* <button
              className='font-bold bg-red-500 rounded-10px h-50px text-white text-4xl w-50px relative'
              onClick={() => {
                setIsOpenInputField(!isOpenInputField)
                setBookmarkName('')
              }}
            >
              <div
                className={`top-4px left-13px h-42px absolute transform duration-400 ${
                  !bookmarkName && isOpenInputField && 'rotate-360'
                } ${
                  bookmarkName &&
                  'rotate-45 scale-x-70 translate-x-[-13px] translate-y-6px'
                }`}
              >
                ー
              </div>
              <div
                className={`top-4px left-13px h-42px absolute transform rotate-90 duration-400 ${
                  !bookmarkName && isOpenInputField && 'rotate-[-180deg]'
                } ${
                  bookmarkName &&
                  'rotate-137 scale-x-150 translate-x-3px translate-y-px'
                }`}
              >
                ー
              </div>
            </button> */
}
{
  /* <button
              className='font-bold bg-red-500 rounded-10px h-50px text-white text-4xl w-50px relative'
              onClick={() => setIsOpenInputField(!isOpenInputField)}
            >
              <div
                className={`top-4px left-13px h-42px absolute transform ${
                  isOpenInputField && 'rotate-360'
                } duration-400`}
              >
                ー
              </div>
              <div
                className={`top-4px left-13px h-42px absolute transform rotate-90 ${
                  isOpenInputField && 'rotate-[-180deg]'
                } duration-400`}
              >
                ー
              </div>
            </button> */
}
