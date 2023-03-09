import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { IoTrashOutline as IoTrashOutlineIcon } from 'react-icons/io5'
import { BookmarkFolderDeleteModal } from './BookmarkFolderDeleteModal'
import { Alert } from 'components/shares/base/Alert'
import { Modal } from 'components/shares/base/Modal'
import { useBoolean } from 'hooks/useBoolean'
import { useFormErrorHandling } from 'hooks/useFormErrorHandling'
import { Folder } from 'types/bookmark'

type Props = {
  folder: Folder
  onClose: () => void
  onUpdateFolder?: (folderName: string) => void
  onDeleteFolder?: () => void
}

type FormData = { name: string }

export const BookmarkFolderEditModal: FC<Props> = ({
  folder,
  onClose,
  onUpdateFolder,
  onDeleteFolder,
}) => {
  const isVisibleDeleteModal = useBoolean(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ defaultValues: { name: folder.name } })

  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<FormData>(async (e: FormData) => {
      await onUpdateFolder?.(e.name)
      onClose()
    })

  return (
    <div>
      {/* フォルダ編集モーダル */}
      <Modal
        open={!isVisibleDeleteModal.v}
        onClose={onClose}
        title='フォルダを編集'
      >
        {errorMessage && (
          <Alert className='mx-4 mt-4' onClose={clearErrorMessage}>
            {errorMessage}
          </Alert>
        )}
        <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='px-4'>
            <div className='flex gap-2 justify-center items-center'>
              <input
                type='text'
                className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
                placeholder='フォルダ名'
                {...register('name', {
                  required: { value: true, message: '入力は必須です' },
                  maxLength: {
                    value: 15,
                    message: '15文字以下で入力して下さい',
                  },
                })}
              />

              <IoTrashOutlineIcon
                onClick={isVisibleDeleteModal.setTrue}
                className='bg-danger-dark border-danger-dark rounded-md cursor-pointer border-2 h-10 text-white p-1.5 w-12'
              />
            </div>
            {errors?.name && (
              <div className='text-danger-dark'>{errors.name.message}</div>
            )}
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
      <BookmarkFolderDeleteModal
        name={folder.name}
        open={isVisibleDeleteModal.v}
        onClose={onClose}
        onDeleteFolder={onDeleteFolder}
      />
    </div>
  )
}
