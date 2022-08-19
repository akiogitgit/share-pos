import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { BsFolder } from 'react-icons/bs'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { Bookmark } from 'types/bookmark'
import { Post } from 'types/post'
import { HttpError, postApi } from 'utils/api'

type Props = {
  post: Post
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>
}

export const BookmarkList: FC<Props> = ({ post, setIsOpenMenu }) => {
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
        setIsOpenMenu(false)
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
      {/* <style jsx>{`
        html,
        body {
          overflow: hidden;
        }
      `}</style> */}
      <style jsx>{`
        .scroll-bar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className='border bg-red-100 border-red-500 rounded-10px top-10px left-40px w-145px absolute group-hover:block'>
        <div
          onClick={() => setIsOpenModal(true)}
          className='rounded-t-10px px-2 pt-2 hover:bg-red-300'
        >
          ブックマークを作成+ モーダル出す
        </div>
        <div className='max-h-303px overflow-y-scroll scroll-bar-none'>
          {bookmarks?.length &&
            bookmarks.map((bookmark) => (
              <div
                key={bookmark.id}
                className='flex px-2 gap-1 items-center hover:bg-red-300'
              >
                <BsFolder />
                <div
                  onClick={() => addBookmark(bookmark.id)}
                  // className='px-2 hover:bg-red-300'
                >
                  {bookmark.name}
                </div>
              </div>
            ))}
        </div>
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
