import { FC, useState } from 'react'

import { BsFolder as BsFolderIcon } from 'react-icons/bs'

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

  const { data: folders } = useGetApi<Folder[]>('/folders')

  return (
    <div>
      <style jsx>{`
        .scroll-bar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <div className='border bg-red-100 border-red-500 rounded-10px w-160px'>
        {/* <div
          onClick={() => setIsOpenModal(true)}
          className='rounded-t-10px px-2 pt-2 hover:bg-red-300'
        >
          ブックマークを作成+ モーダル出す
        </div> */}
        <div className='max-h-250px overflow-y-scroll scroll-bar-none sm:max-h-450px'>
          {folders?.length &&
            folders.map((folder, index) => (
              <button
                key={index}
                className='flex text-left w-full py-1 px-4 gap-1 items-center hover:bg-red-300'
                onClick={async () => {
                  console.log('click! : ')
                  onClickFolderName?.()
                  await addBookmark(folder.id, post)
                }}
              >
                <BsFolderIcon />
                <p>{folder.name}</p>
              </button>
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
