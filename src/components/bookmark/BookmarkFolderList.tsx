import { FC, useCallback, useState } from 'react'

import { BsFolder as BsFolderIcon } from 'react-icons/bs'

import { FolderEditModal } from './FolderEditModal'
import { useUpdateFolder, useDeleteFolder } from 'hooks/useFolder'
import { Folder } from 'types/bookmark'

type Props = {
  folders: Folder[]
  selectedFolderId: number
  setSelectedFolderId: (index: number) => void
}

export const BookmarkFolderList: FC<Props> = ({
  folders,
  selectedFolderId,
  setSelectedFolderId,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [editingFolderName, setEditingFolderName] = useState('')

  const { updateFolder } = useUpdateFolder()
  const { deleteFolder } = useDeleteFolder()

  const onClickFolder = useCallback(
    (index: number, folderName: string) => {
      // 2連続で同じフォルダを押したときに、編集モードにする
      if (selectedFolderId === index) {
        setIsOpenModal(true)
      }

      // 選択しているフォルダを設定
      setSelectedFolderId(index)
      setEditingFolderName(folderName)
    },
    [setSelectedFolderId, selectedFolderId],
  )

  return (
    <div>
      {/* ブックマーク名一覧 */}
      <div className='h-50px overflow-x-scroll scroll-bar sm:(h-auto min-w-190px max-w-190px max-h-[calc(100vh-250px)] overflow-x-hidden overflow-y-scroll) '>
        <div className='flex gap-2 sm:(flex-col-reverse gap-1) '>
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`whitespace-nowrap h-40px ${
                selectedFolderId === folder.id
                  ? 'border-b-3 border-red-500 text-red-500'
                  : 'text-gray-500 border-b-2'
              }`}
            >
              <button
                className={`mt-2 w-full text-left ${
                  selectedFolderId === folder.id && 'font-bold'
                }`}
                onClick={() => onClickFolder(folder.id, folder.name)}
              >
                <BsFolderIcon className='mr-1' />
                {folder.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* フォルダ編集・削除モーダル */}
      {isOpenModal && (
        <FolderEditModal
          onClose={() => setIsOpenModal(false)}
          selectedFolderId={selectedFolderId}
          folderName={editingFolderName}
          onUpdateFolder={async (folderName: string) =>
            updateFolder(selectedFolderId, folderName)
          }
          onDeleteFolder={async () => deleteFolder(selectedFolderId)}
        />
      )}

      <style jsx>{`
        .scroll-bar::-webkit-scrollbar {
          width: 0;
          height: 0;
        }

        .scroll-bar:hover::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        .scroll-bar::-webkit-scrollbar-track {
          border-radius: 100px;
          background-color: rgba(254, 226, 226, var(--tw-bg-opacity));
          height: 100px;
        }
        .scroll-bar::-webkit-scrollbar-thumb {
          border-radius: 100px;
          background-color: rgba(239, 68, 68, var(--tw-bg-opacity));
        }
      `}</style>
    </div>
  )
}
