import { FC, useState } from 'react'
import { BsFolder } from 'react-icons/bs'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { useAddBookmark } from 'hooks/useBookmark'
import { Folder } from 'types/bookmark'
import { Post } from 'types/post'

type Props = {
  post: Post
  onClickFolderName?: () => void
}

export const FolderList: FC<Props> = ({ post, onClickFolderName }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const { addBookmark } = useAddBookmark()

  const authHeaderParams = useAuthHeaderParams()
  const { data: folders, mutate } = useGetApi<Folder[]>(
    '/folders',
    undefined,
    authHeaderParams,
  )

  return (
    <div>
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
      <div className='border bg-red-100 border-red-500 rounded-10px w-145px'>
        {/* <div
          onClick={() => setIsOpenModal(true)}
          className='rounded-t-10px px-2 pt-2 hover:bg-red-300'
        >
          ブックマークを作成+ モーダル出す
        </div> */}
        <div className='max-h-180px overflow-y-scroll scroll-bar-none sm:max-h-303px'>
          {folders?.length &&
            folders.map((folder) => (
              <div
                key={folder.id}
                className='flex px-2 gap-1 items-center hover:bg-red-300'
              >
                <BsFolder />
                <div
                  onClick={async () => {
                    onClickFolderName?.()
                    await addBookmark(folder.id, post)
                  }}
                >
                  {folder.name}
                </div>
              </div>
            ))}
        </div>
      </div>
      {isOpenModal && (
        <div>
          <div
            onClick={() => setIsOpenModal(false)}
            className='bg-black h-3000vh opacity-20 top-[-500vh] left-[-100vw] w-300vw z-10 fixed'
          ></div>
          <div className='bg-red-500 top-50vh left-0 z-1100 fixed'>
            ここで新しいフォルダの作成したい
          </div>
        </div>
      )}
    </div>
  )
}
