import { Dialog } from '@headlessui/react'
import { FC, useState } from 'react'
import { useUpdateFolder, useDeleteFolder } from 'hooks/useFolder'

type Props = {
  onClose: () => void
  selectedFolderId: number
  folderName: string
}

export const FolderEditModal: FC<Props> = ({
  onClose,
  selectedFolderId,
  folderName,
}) => {
  const [editFolderName, setEditFolderName] = useState(folderName)
  const [isShowDeleteMessage, setIsShowDeleteMessage] = useState(false)

  const { updateFolder } = useUpdateFolder()
  const { deleteFolder } = useDeleteFolder()

  return (
    <div>
      <div
        className={`bg-black h-screen w-screen opacity-50 top-0 left-0 z-100 fixed`}
      ></div>

      <Dialog
        open={!isShowDeleteMessage}
        onClose={onClose}
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
              onClose()
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
              <div
                className='cursor-pointer font-bold bg-red-500 rounded-10px text-white ml-1 py-0.5 px-2'
                onClick={async () => {
                  // onClose()
                  setIsShowDeleteMessage(true)
                }}
              >
                ✕
              </div>
            </div>

            <div className='flex justify-between'>
              <div
                onClick={onClose}
                className='cursor-pointer border-r-2 border-t-2 mt-4 text-center w-full py-2 text-blue-500'
              >
                閉じる
              </div>
              <button
                type='submit'
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
            &quot;{editFolderName}&quot;を削除しますか？
          </Dialog.Title>
          <p className='text-center px-2'>
            このフォルダの記事が全て削除されます。
            <br /> この操作は取り消せません
          </p>

          <div className='flex justify-between'>
            <button
              onClick={onClose}
              className='border-r-2 border-t-2 mt-4 w-full py-2 text-blue-500'
            >
              閉じる
            </button>
            <button
              type='submit'
              onClick={async () => {
                onClose()
                await deleteFolder(selectedFolderId)
              }}
              className='font-bold border-t-2 mt-4 w-full py-2 text-red-500'
            >
              削除
            </button>
          </div>
        </Dialog.Panel>
      </Dialog>
    </div>
  )
}
