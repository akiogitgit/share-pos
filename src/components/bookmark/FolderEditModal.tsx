import { FC, useState } from 'react'
import { IoTrashOutline as IoTrashOutlineIcon } from 'react-icons/io5'
import { Modal } from 'components/shares/Modal'
import { Folder } from 'types/bookmark'

type Props = {
  folder: Folder
  onClose: () => void
  onUpdateFolder: (folderName: string) => void
  onDeleteFolder: () => void
}

export const FolderEditModal: FC<Props> = ({
  folder,
  onClose,
  onUpdateFolder,
  onDeleteFolder,
}) => {
  const [editFolderName, setEditFolderName] = useState(folder.name)
  const [isShowDeleteMessage, setIsShowDeleteMessage] = useState(false)

  return (
    <div>
      {/* フォルダ編集モーダル */}
      <Modal
        open={!isShowDeleteMessage}
        onClose={onClose}
        title='フォルダを編集'
      >
        <form
          onSubmit={async e => {
            e.preventDefault()
            console.log(`update: `, folder.id, editFolderName)
            onClose()
            await onUpdateFolder(editFolderName)
          }}
        >
          <div className='flex px-4 gap-2 justify-center items-center'>
            <input
              type='text'
              // className='border outline-none rounded-3px w-full p-1 ring-gray-300 duration-300 focus:ring-1'
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
              maxLength={15}
              required
              value={editFolderName}
              onChange={e => setEditFolderName(e.target.value)}
            />

            <IoTrashOutlineIcon
              onClick={() => setIsShowDeleteMessage(true)}
              className='bg-danger-dark border-danger-dark rounded-md cursor-pointer border-2 h-10 text-white p-1.5 w-12'
            />
          </div>

          <div className='flex justify-between'>
            <button
              type='button'
              onClick={onClose}
              className='cursor-pointer border-t-2 border-gray-200 mt-4 text-center text-primary-dark w-full py-2 duration-150 hover:bg-black/10 '
            >
              閉じる
            </button>
            <button
              type='submit'
              className='font-bold border-t-2 border-gray-200 mt-4 text-primary-dark w-full py-2 duration-150 hover:bg-black/10 '
            >
              更新
            </button>
          </div>
        </form>
      </Modal>

      {/* フォルダ削除モーダル */}
      <Modal
        open={isShowDeleteMessage}
        onClose={onClose}
        title={`\"${editFolderName}\" を削除しますか？`}
      >
        <p className='text-center px-2'>
          フォルダ内の記事は全て削除されます。
          <br /> この操作は取り消せません
        </p>

        <div className='flex justify-between'>
          <button
            onClick={onClose}
            className='border-r-2 border-t-2 mt-4 text-primary-dark w-full py-2 duration-150 hover:bg-black/10'
          >
            閉じる
          </button>
          <button
            type='submit'
            onClick={async () => {
              onClose()
              await onDeleteFolder()
            }}
            className='font-bold border-t-2 mt-4 text-danger-dark w-full py-2  duration-150 hover:bg-black/10'
          >
            削除
          </button>
        </div>
      </Modal>
    </div>
  )
}
