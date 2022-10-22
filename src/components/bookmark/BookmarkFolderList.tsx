import { Dialog } from '@headlessui/react'
import { FC, useCallback, useState } from 'react'

import { BsFolder as BsFolderIcon } from 'react-icons/bs'

import { useDeleteFolder, useUpdateFolder } from 'hooks/useFolder'
import { Folder } from 'types/bookmark'

type Props = {
  folders: Folder[]
  selectedFolderId: number
  onSelect: (index: number) => void
}

export const BookmarkFolderList: FC<Props> = ({
  folders,
  selectedFolderId, // idに変えよう。これを updateFolderで使うから
  onSelect,
}) => {
  // これいらない
  // const [editingFolderIndex, setEditingFolderIndex] = useState(-1)
  const [editFolderName, setEditFolderName] = useState('')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isShowDeleteMessage, setIsShowDeleteMessage] = useState(false)

  const { updateFolder } = useUpdateFolder()
  const { deleteFolder } = useDeleteFolder()

  const onClickFolder = useCallback(
    (index: number, folderName: string) => {
      // 連続で同じフォルダを押したときに、編集モードにする
      if (selectedFolderId === index) {
        // setEditingFolderIndex(index)
        setEditFolderName(folderName)
        setIsOpenModal((s) => !s)
      }

      onSelect(index) // selectedFolderIndexを更新
    },
    [onSelect, selectedFolderId],
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
                className={`mt-2 w-full flex items-center ${
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
      <div
        className={`${
          !isOpenModal && !isShowDeleteMessage && 'hidden'
        } bg-black h-screen w-screen opacity-50 top-0 left-0 z-100 fixed`}
      ></div>

      <Dialog
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        className='m-auto transform top-[50%] left-[50%] z-100 translate-x-[-50%] translate-y-[-50%] fixed'
      >
        <Dialog.Panel className='bg-white bg-opacity-90 rounded-10px shadow-2xl w-300px'>
          <Dialog.Title className='text-center pt-4'>
            フォルダを編集
          </Dialog.Title>
          <form
            onSubmit={async (e) => {
              e.preventDefault()
              console.log(`update: `, selectedFolderId, editFolderName)
              setIsOpenModal(false)
              await updateFolder(selectedFolderId, editFolderName)
            }}
          >
            <div className='flex justify-center'>
              <input
                type='text'
                className='border outline-none rounded-10px text-black ring-gray-300 w-170px duration-150 focus:ring-1'
                maxLength={15}
                value={editFolderName}
                onChange={(e) => setEditFolderName(e.target.value)}
              />
              {/* <button
                className='font-bold bg-blue-500 text-white py-0.5 px-1'
                type='submit'
              >
                更新
              </button> */}
              <div
                className='cursor-pointer font-bold bg-red-500 rounded-10px text-white ml-1 py-0.5 px-2 px-1'
                onClick={async () => {
                  setIsOpenModal(false)
                  setIsShowDeleteMessage(true)
                  // await deleteFolder(selectedFolderId)
                }}
              >
                ✕
              </div>
            </div>

            <div className='flex justify-between'>
              <button
                onClick={() => setIsOpenModal(false)}
                className='border-r-2 border-t-2 mt-4 w-full py-2 text-blue-500'
              >
                閉じる
              </button>
              <button
                type='submit'
                // onClick={() => setIsOpenModal(false)}
                className='font-bold border-t-2 mt-4 w-full py-2 text-blue-500'
              >
                更新
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </Dialog>

      <Dialog
        open={isShowDeleteMessage}
        onClose={() => setIsShowDeleteMessage(false)}
        className='m-auto transform top-[50%] left-[50%] z-100 translate-x-[-50%] translate-y-[-50%] fixed'
      >
        <Dialog.Panel className='bg-white bg-opacity-90 rounded-10px shadow-2xl w-300px'>
          <Dialog.Title className='text-center px-2 pt-4'>
            {editFolderName}を削除しますか？
          </Dialog.Title>
          <p className='text-center px-2'>
            このフォルダの記事が全て削除されます。
            <br /> この操作は取り消せません
          </p>

          <div className='flex justify-between'>
            <button
              onClick={() => setIsShowDeleteMessage(false)}
              className='border-r-2 border-t-2 mt-4 w-full py-2 text-blue-500'
            >
              閉じる
            </button>
            <button
              type='submit'
              onClick={async () => {
                setIsShowDeleteMessage(false)
                await deleteFolder(selectedFolderId)
              }}
              className='font-bold border-t-2 mt-4 w-full py-2 text-red-500'
            >
              削除
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>

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
