import { NextPage } from 'next'
import { useSearchParams } from 'next/navigation'
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
  const searchParams = useSearchParams()
  const { data: folders } = useGetApi<Folder[]>('/folders')

  // 選択したフォルダをURLパラメータから取得
  const selectedFolderIndex = useMemo(
    () => Number(searchParams.get('id')) || 0,
    [searchParams],
  )

  const { data: bookmarkPosts } = useGetApi<BookmarkPosts>(
    `/folders/${folders && folders[selectedFolderIndex]?.id}`,
  )
  console.log(bookmarkPosts)
  // フォルダが無い
  if (!folders?.length) {
    return (
      <Layout>
        <div className='flex ml-4 justify-between'>
          <h1 className='font-bold text-2xl'>ブックマーク</h1>
          <div>
            <CreateFolderButton />
          </div>
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
          <CreateFolderButton />
        </div>
      </div>

      <div className='sm:(flex items-start) '>
        {/* 自分のフォルダ一覧 */}
        <div className='bg-primary-light mx-[-16px] pb-[10px] pl-4 top-0px z-2 sticky sm:(z-1 mx-0 top-100px) '>
          <div className='mt-4 hidden sm:block'>
            <CreateFolderButton />
          </div>
          <div className='mt-5'>
            <BookmarkFolderList folders={folders} />
          </div>
        </div>

        {/* 選択しているフォルダの記事一覧 */}
        {bookmarkPosts?.posts.length && folders ? (
          <div className='mt-10 w-full sm:(mr-4 ml-8) '>
            {/* <div className='grid gap-6 justify-center items-start sm:(grid-cols-[repeat(auto-fill,minmax(280px,auto))]) '> */}
            <div className='grid gap-6 items-start justify-center lg:grid-cols-2'>
              {bookmarkPosts.posts.map((post, index) => (
                <PostItem
                  key={index}
                  post={post}
                  // Postはどのフォルダに居るか知らない
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
