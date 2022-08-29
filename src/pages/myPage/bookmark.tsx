import { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { PostItemList } from 'components/post/PostItemList'
import { MyPageLayout } from 'components/user/MyPageLayout'
import { BookmarkPostItem } from 'components/user/myPage/BookmarkPostItem'
import { FolderList } from 'components/user/myPage/FolderList'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { useFolder } from 'hooks/useFolder'
import { Folder, BookmarkPosts } from 'types/bookmark'

const Bookmark: NextPage = () => {
  const [isOpenInputField, setIsOpenInputField] = useState(false)
  const [bookmarkName, setBookmarkName] = useState('')
  const [selectedFolder, setSelectedFolder] = useState(0)

  const { createFolder } = useFolder()

  const authHeaderParams = useAuthHeaderParams()

  const { data: folders } = useGetApi<Folder[]>(
    '/folders',
    undefined,
    authHeaderParams,
  )

  const { data: bookmarkPosts } = useGetApi<BookmarkPosts>(
    `/folders/${selectedFolder}`,
    undefined,
    authHeaderParams,
  )
  console.log(bookmarkPosts)

  // 自分の一番左のフォルダのPostsを取得   useEffect使いたくない
  useEffect(() => {
    if (folders?.length) {
      setSelectedFolder(folders[0].id)
    }
  }, [folders])

  return (
    <MyPageLayout tabName='bookmark'>
      <div className='ml-4 sm:ml-0'>
        <div className='flex justify-between'>
          <h1 className='font-bold text-2xl'>ブックマーク</h1>
          <div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                createFolder(bookmarkName)
                setBookmarkName('')
              }}
              className='flex gap-3 items-center'
            >
              <input
                type='text'
                className='border outline-none border-red-500 rounded-10px h-40px px-2 w-170px duration-150 sm:w-200px'
                placeholder='新規フォルダの作成'
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

        {/* 自分のフォルダ一覧 */}
        <FolderList
          selectedFolder={selectedFolder}
          setSelectedFolder={setSelectedFolder}
        />
      </div>

      {/* 選択しているフォルダの記事一覧 */}
      <ul className='mt-4'>
        {bookmarkPosts?.posts.length ? (
          <PostItemList className='flex flex-wrap justify-center sm:justify-start'>
            {bookmarkPosts.posts.map((post, i) => (
              <BookmarkPostItem
                key={i}
                className='m-2'
                post={post}
                selectedFolder={selectedFolder}
              />
            ))}
          </PostItemList>
        ) : (
          <h2 className='mt-20 text-center'>記事がありません</h2>
        )}
      </ul>
    </MyPageLayout>
  )
}

export default Bookmark

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
