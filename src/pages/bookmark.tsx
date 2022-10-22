import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { BookmarkFolderList } from 'components/bookmark/BookmarkFolderList'
import { CreateFolderField } from 'components/bookmark/CreateFolderField'
import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { useRequireLogin } from 'hooks/login/useRequireLogin'
import { useGetApi } from 'hooks/useApi'
import { Folder, BookmarkPosts } from 'types/bookmark'

const Bookmark: NextPage = () => {
  useRequireLogin()

  const router = useRouter()
  const bookmarkFolerId = useMemo(() => router.query['id'] as string, [])

  const { data: folders } = useGetApi<Folder[]>('/folders')
  const [selectedFolderIndex, setSelectedFolderIndex] = useState(0)

  const { data: bookmarkPosts } = useGetApi<BookmarkPosts>(
    `/folders/${folders && folders[selectedFolderIndex]?.id}`,
  )

  // フォルダが無い
  if (!folders?.length) {
    return (
      <Layout>
        <div className='flex ml-4 justify-between'>
          <h1 className='font-bold text-2xl'>ブックマーク</h1>
          <div className='min-w-100px max-w-210px w-53vw'>
            <CreateFolderField />
          </div>
        </div>
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
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='flex ml-4 justify-between'>
        <h1 className='font-bold text-2xl'>ブックマーク</h1>
        <div className='sm:hidden'>
          <div className='min-w-100px max-w-210px w-53vw'>
            <CreateFolderField />
          </div>
        </div>
      </div>

      <div className='sm:(flex gap-3 items-start) '>
        {/* 自分のフォルダ一覧 */}
        <div className='bg-red-100 pl-4 top-60px z-10 sticky sm:top-100px'>
          <div className='mt-4 w-190px hidden sm:block'>
            <CreateFolderField />
          </div>
          <div className='mt-5'>
            <BookmarkFolderList
              folders={folders}
              // selectedFolderId={folderId}
              // setSelectedFolderId={setSelectedFolderId}
              selectedFolderIndex={selectedFolderIndex}
              setSelectedFolderIndex={setSelectedFolderIndex}
            />
          </div>
        </div>

        {/* 選択しているフォルダの記事一覧 */}
        {bookmarkPosts?.posts.length && folders ? (
          <div className='mt-4 w-full'>
            <div className='grid gap-6 justify-center items-start sm:(gap-x-3 grid-cols-[repeat(auto-fill,minmax(291px,auto))]) '>
              {bookmarkPosts.posts.map((post, i) => (
                <PostItem
                  key={i}
                  post={post}
                  bookmarkFolderId={folders[selectedFolderIndex].id}
                />
              ))}
            </div>
          </div>
        ) : (
          // 記事が無い
          <div className='mt-20 text-center w-full'>記事がありません</div>
        )}
      </div>
    </Layout>
  )
}

export default Bookmark
