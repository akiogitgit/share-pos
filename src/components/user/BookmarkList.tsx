import { FC, useCallback, useState } from 'react'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { Bookmark } from 'types/bookmark'
import { Post } from 'types/post'
import { HttpError, postApi } from 'utils/api'

type Props = {
  post: Post
}

export const BookmarkList: FC<Props> = ({ post }) => {
  const authHeaderParams = useAuthHeaderParams()
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { data: bookmarks, mutate } = useGetApi<Bookmark[]>(
    '/folders',
    undefined,
    authHeaderParams,
  )

  const addBookmark = useCallback(
    async (folderId: number) => {
      try {
        const res = await postApi(
          '/folders/bookmarks',
          { folder_id: folderId, post_id: post.id },
          authHeaderParams,
        )

        console.log(res)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [authHeaderParams, post.id],
  )

  return (
    <>
      <style jsx>{`
        html,
        body {
          overflow: hidden;
        }
      `}</style>
      <div className='border bg-red-100 border-red-500 rounded-10px p-2 top-0 left-40px w-145px absolute hidden! group-hover:block'>
        <div onClick={() => setIsOpenModal(true)}>
          ブックマークを作成+ モーダル出す
        </div>
        {bookmarks?.length &&
          bookmarks.map((bookmark) => (
            <div key={bookmark.id} onClick={() => addBookmark(bookmark.id)}>
              {bookmark.name}
            </div>
          ))}
      </div>
      {isOpenModal && (
        <>
          <div
            onClick={() => setIsOpenModal(false)}
            className='bg-black h-3000vh opacity-20 top-[-500vh] left-[-100vw] w-300vw z-10 fixed'
          ></div>
          <div className='bg-red-500 top-0 left-0 z-11 fixed'>aaa</div>
        </>
      )}
    </>
  )
}
