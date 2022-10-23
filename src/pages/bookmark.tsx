import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { BookmarkFolderList } from 'components/bookmark/BookmarkFolderList'
import { CreateFolderButton } from 'components/bookmark/CreateFolderButton'
import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { useRequireLogin } from 'hooks/login/useRequireLogin'
import { useGetApi } from 'hooks/useApi'
import { Folder, BookmarkPosts } from 'types/bookmark'

const Bookmark: NextPage = () => {
  useRequireLogin()
  const router = useRouter()
  const { data: folders } = useGetApi<Folder[]>('/folders')

  const selectedFolderIndex = useMemo(
    () => Number(router.query.id) || 0,
    [router.query.id],
  )

  const { data: bookmarkPosts } = useGetApi<BookmarkPosts>(
    `/folders/${folders && folders[selectedFolderIndex]?.id}`,
  )

  // フォルダが無い
  if (!folders?.length) {
    return (
      <Layout>
        <div className='flex ml-4 justify-between'>
          <h1 className='font-bold text-2xl'>ブックマーク</h1>
          <CreateFolderButton className='font-bold bg-red-500 rounded-10px text-white py-1 px-2' />
        </div>
        <div className='mx-auto mt-20 w-300px'>
          <p>1. フォルダを作成してみよう！</p>
          <p>2. 記事をブックマークしよう！</p>
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
          <CreateFolderButton className='font-bold bg-red-500 rounded-10px text-white py-1 px-2' />
        </div>
      </div>

      <div className='sm:(flex gap-3 items-start) '>
        {/* 自分のフォルダ一覧 */}
        <div className='bg-red-100 pl-4 top-60px z-10 sticky sm:top-100px'>
          <div className='mt-4 w-190px hidden sm:block'>
            <CreateFolderButton className='font-bold bg-red-500 rounded-10px text-white py-1 px-2' />
          </div>
          <div className='mt-5'>
            <BookmarkFolderList folders={folders} />
          </div>
        </div>

        {/* 選択しているフォルダの記事一覧 */}
        {bookmarkPosts?.posts.length && folders ? (
          <div className='mt-4 w-full'>
            <div className='grid gap-6 justify-center items-start sm:(gap-x-3 grid-cols-[repeat(auto-fill,minmax(291px,auto))]) '>
              {bookmarkPosts.posts.map((post, index) => (
                <PostItem
                  key={index}
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
