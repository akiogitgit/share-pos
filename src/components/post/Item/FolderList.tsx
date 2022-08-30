import { Dispatch, FC, SetStateAction, useState } from 'react'
import { BsFolder } from 'react-icons/bs'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { useAddBookmark } from 'hooks/useBookmark'
import { Folder } from 'types/bookmark'
import { Post } from 'types/post'

type Props = {
  post: Post
  setIsOpenMenu: Dispatch<SetStateAction<boolean>>
}

export const FolderList: FC<Props> = ({ post, setIsOpenMenu }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { addBookmark } = useAddBookmark()

  const authHeaderParams = useAuthHeaderParams()
  const { data: folders, mutate } = useGetApi<Folder[]>(
    '/folders',
    undefined,
    authHeaderParams,
  )

  return (
    <>
      {/* 
      画面全体のスクロール無くしたかった
      <style jsx>{`
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
          {folders?.length &&
            folders.map((folder) => (
              <div
                key={folder.id}
                className='flex px-2 gap-1 items-center hover:bg-red-300'
              >
                <BsFolder />
                <div
                  onClick={() => {
                    addBookmark(folder.id, post)
                    setIsOpenMenu(false)
                  }}
                >
                  {folder.name}
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
          <div className='bg-red-500 top-0 left-0 z-11 fixed'>
            ここで新しいフォルダの作成したい
          </div>
        </>
      )}
    </>
  )
}
