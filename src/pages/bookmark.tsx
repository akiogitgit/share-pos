import { NextPage } from 'next'
import { useState } from 'react'
import { BookmarkFolderList } from 'components/bookmark/BookmarkFolderList'
import { CreateFolderField } from 'components/bookmark/CreateFolderField'
import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useRequireLogin } from 'hooks/login/useRequireLogin'
import { useGetApi } from 'hooks/useApi'
import { Folder, BookmarkPosts } from 'types/bookmark'

const Bookmark: NextPage = () => {
  useRequireLogin()
  const authHeaderParams = useAuthHeaderParams()
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(0)

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
      <div className=''>
        <div className='flex ml-4 justify-between'>
          <h1 className='font-bold text-2xl'>ブックマーク</h1>
          <div className={`${folders?.length && 'sm:hidden'}`}>
            <div className='min-w-100px max-w-210px w-53vw'>
              <CreateFolderField />
            </div>
          </div>
        </div>

        {folders?.length ? (
          <div className='sm:(flex gap-3 items-start) '>
            {/* 自分のフォルダ一覧 */}
            {folders && (
              <div className='bg-red-100 pl-4 top-60px z-10 sticky sm:top-100px'>
                {/* <div className='ml-4 top-100px sm:sticky'> */}
                <BookmarkFolderList
                  folders={folders}
                  selectedFolderIndex={selectedFolderIndex}
                  onSelect={setSelectedFolderIndex}
                />
                <div className='mt-4 w-190px hidden sm:block'>
                  <CreateFolderField />
                </div>
              </div>
            )}
            {/* 選択しているフォルダの記事一覧 */}
            {bookmarkPosts?.posts.length && folders ? (
              // <div className='flex flex-wrap mt-4 justify-center items-start sm:justify-start'>
              <div className='mt-4 w-full'>
                {/* TODO: スマホサイズのレイアウト修正 */}
                <div className='grid gap-6 justify-center items-start sm:(gap-3 grid-cols-[repeat(auto-fill,minmax(291px,auto))]) '>
                  {bookmarkPosts.posts.map((post, i) => (
                    <PostItem
                      key={i}
                      post={post}
                      selectedFolderId={folders[selectedFolderIndex].id}
                    />
                  ))}
                </div>
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
