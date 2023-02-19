import { FC, useState } from 'react'
import { IoTrashOutline as IoTrashOutlineIcon } from 'react-icons/io5'
import { Modal } from 'components/shares/base/Modal'
import { useBoolean } from 'hooks/useBoolean'
import { Folder } from 'types/bookmark'

type Props = {
  folder: Folder
  open: boolean
  onClose: () => void
  onUpdateFolder?: (folderName: string) => void
  onDeleteFolder?: () => void
}

export const FolderEditModal: FC<Props> = ({
  folder,
  open,
  onClose,
  onUpdateFolder,
  onDeleteFolder,
}) => {
  const [folderName, setFolderName] = useState(folder.name)
  const isVisibleDeleteModal = useBoolean(false)

  return (
    <div>
      {/* フォルダ編集モーダル */}
      <Modal
        open={open && !isVisibleDeleteModal.v}
        onClose={() => {
          isVisibleDeleteModal.setFalse()
          onClose?.()
        }}
        title='フォルダを編集'
      >
        <form
          className='mt-4'
          onSubmit={async e => {
            e.preventDefault()
            console.log(`update: `, folder.id, folderName)
            onClose?.()
            await onUpdateFolder?.(folderName)
          }}
        >
          <div className='flex px-4 gap-2 justify-center items-center'>
            <input
              type='text'
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
              maxLength={15}
              required
              value={folderName}
              onChange={e => setFolderName(e.target.value)}
            />

            <IoTrashOutlineIcon
              onClick={isVisibleDeleteModal.setTrue}
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
        open={open && isVisibleDeleteModal.v}
        onClose={() => {
          isVisibleDeleteModal.setFalse()
          onClose?.()
        }}
        title={`\"${folderName}\" を削除しますか？`}
      >
        <p className='mt-4 text-center px-2'>
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
              onClose?.()
              await onDeleteFolder?.()
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
