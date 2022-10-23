import { FC, useState } from 'react'

import { BsFolder as BsFolderIcon } from 'react-icons/bs'

import { Modal } from 'components/shares/Modal'
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
        <div className='max-h-250px overflow-y-scroll scroll-bar-none sm:max-h-450px'>
          <button
            className='bg-red-300 w-full py-2 px-4'
            onClick={() => setIsOpenModal(true)}
          >
            ＋新規フォルダ
          </button>
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
      <Modal open={isOpenModal} onClose={() => setIsOpenModal(false)}>
        a
      </Modal>
    </div>
  )
}
