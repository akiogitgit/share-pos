import { FC, useState } from 'react'
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
          onSubmit={async (e) => {
            e.preventDefault()
            console.log(`update: `, folder.id, editFolderName)
            onClose()
            await onUpdateFolder(editFolderName)
          }}
        >
          <div className='flex px-4 justify-center items-center'>
            <input
              type='text'
              className='border outline-none rounded-3px w-full p-1 ring-gray-300 duration-300 focus:ring-1'
              maxLength={15}
              required
              value={editFolderName}
              onChange={(e) => setEditFolderName(e.target.value)}
            />
            <div
              className='cursor-pointer font-bold bg-red-500 rounded-3px text-white ml-1 py-1 px-2.5'
              onClick={() => setIsShowDeleteMessage(true)}
            >
              ✕
            </div>
          </div>

          <div className='flex justify-between'>
            <div
              onClick={onClose}
              className='cursor-pointer font-bold border-t-2 border-gray-200 mt-4 text-center w-full py-2 text-blue-500 duration-150 hover:bg-black/10 '
            >
              閉じる
            </div>
            <button
              type='submit'
              className='font-bold border-t-2 border-gray-200 mt-4 w-full py-2 text-blue-500 duration-150 hover:bg-black/10 '
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
            className='border-r-2 border-t-2 mt-4 w-full py-2 text-blue-500 duration-150 hover:bg-black/10'
          >
            閉じる
          </button>
          <button
            type='submit'
            onClick={async () => {
              onClose()
              await onDeleteFolder()
            }}
            className='font-bold border-t-2 mt-4 w-full py-2 text-red-500  duration-150 hover:bg-black/10'
          >
            削除
          </button>
        </div>
      </Modal>
    </div>
  )
}
