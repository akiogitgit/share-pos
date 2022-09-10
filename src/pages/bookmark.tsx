import { NextPage } from 'next'
import { useState } from 'react'
import { Layout } from 'components/layout/Layout'
import { BookmarkFolderList } from 'components/myPage/BookmarkFolderList'
import { PostItem } from 'components/post/Item/PostItem'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useRequireLogin } from 'hooks/login/useRequireLogin'
import { useGetApi } from 'hooks/useApi'
import { useCreateFolder } from 'hooks/useFolder'
import { Folder, BookmarkPosts } from 'types/bookmark'

const Bookmark: NextPage = () => {
  useRequireLogin()
  const authHeaderParams = useAuthHeaderParams()
  const [isOpenInputField, setIsOpenInputField] = useState(false)
  const [bookmarkName, setBookmarkName] = useState('')
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(0)

  const { createFolder } = useCreateFolder()

  const { data: folders } = useGetApi<Folder[]>(
    '/folders',
    undefined,
    authHeaderParams,
  )

  const { data: bookmarkPosts } = useGetApi<BookmarkPosts>(
    `/folders/${folders && folders[selectedFolderIndex]?.id}`,
    undefined,
    authHeaderParams,
  )

  return (
    <Layout>
      <div className='ml-4'>
        <div className='flex justify-between'>
          <h1 className='font-bold text-2xl'>ブックマーク</h1>
          <div>
            <form
              onSubmit={async (e) => {
                e.preventDefault()
                await createFolder(bookmarkName)
                setBookmarkName('')
              }}
              className='flex gap-3 items-center'
            >
              <input
                type='text'
                className='border outline-none border-red-500 rounded-10px h-40px max-w-170px px-2 w-40vw duration-150 sm:w-200px'
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
                  className={`top-0px left-8px h-40px absolute transform duration-400 ${
                    !bookmarkName && isOpenInputField && 'rotate-360'
                  } ${
                    bookmarkName &&
                    'rotate-45 scale-x-50 translate-x-[-10px] translate-y-3px'
                  }`}
                >
                  <div className='bg-white rounded-full h-4px mt-18px w-24px'></div>
                </div>
                <div
                  className={`top-0px left-8px h-40px absolute transform rotate-90 duration-400 ${
                    !bookmarkName && isOpenInputField && 'rotate-[-180deg]'
                  } ${
                    bookmarkName && 'rotate-135 scale-x-110 translate-x-3px'
                  }`}
                >
                  <div className='bg-white rounded-full h-4px mt-18px w-24px'></div>
                </div>
              </button>
            </form>
          </div>
        </div>

        {folders?.length ? (
          <div className='sm:(flex gap-3 items-start) '>
            {/* 自分のフォルダ一覧 */}
            {folders && (
              <div className='top-100px sm:sticky'>
                <BookmarkFolderList
                  folders={folders}
                  selectedFolderIndex={selectedFolderIndex}
                  onSelect={setSelectedFolderIndex}
                />
              </div>
            )}

            {/* 選択しているフォルダの記事一覧 */}
            {bookmarkPosts?.posts.length && folders ? (
              // <div className='flex flex-wrap mt-4 justify-center items-start sm:justify-start'>
              <div className='mt-4 w-full grid gap-3 grid-cols-[repeat(auto-fill,minmax(290px,auto))] justify-center items-start'>
                {bookmarkPosts.posts.map((post, i) => (
                  <PostItem
                    key={i}
                    className='m-2'
                    post={post}
                    selectedFolderId={folders[selectedFolderIndex].id}
                  />
                ))}
              </div>
            ) : (
              <div className='mt-20 text-center w-full'>記事がありません</div>
            )}
          </div>
        ) : (
          <div className='mx-auto mt-20 w-300px'>
            <p className='overflow-hidden'>
              右の
              <span className='font-bold bg-red-500 rounded-10px text-white px-0.3 text-30px'>
                ＋
              </span>
              を押してブックマークを作成
            </p>
            <p>ブックマークを作成して記事を追加しよう！</p>
            <p>画像を貼って手順を分かりやすく表示</p>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default Bookmark
