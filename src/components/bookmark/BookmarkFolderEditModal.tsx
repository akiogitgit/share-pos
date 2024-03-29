import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { IoTrashOutline as IoTrashOutlineIcon } from 'react-icons/io5'
import { z } from 'zod'

import { Alert } from 'components/shares/base/Alert'
import { Modal } from 'components/shares/base/Modal'
import { useBoolean } from 'hooks/useBoolean'
import { useFormErrorHandling } from 'hooks/useFormErrorHandling'
import { Folder } from 'types/bookmark'

import { BookmarkFolderDeleteModal } from './BookmarkFolderDeleteModal'

type Props = {
  folder: Folder
  onClose: () => void
  onUpdateFolder?: (folderName: string) => void
  onDeleteFolder?: () => void
}

const schema = z.object({
  name: z
    .string()
    .min(1, { message: '入力は必須です' })
    .max(15, { message: '15文字以下で入力して下さい' }),
})

type FormData = z.infer<typeof schema>

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
  } = useForm<FormData>({
    defaultValues: { name: folder.name },
    resolver: zodResolver(schema),
  })

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
                {...register('name')}
                aria-invalid={!!errors?.name}
              />

              <button
                className='flex'
                aria-label='フォルダ削除'
                type='button'
                role='link'
                onClick={isVisibleDeleteModal.setTrue}
              >
                <IoTrashOutlineIcon className='bg-danger-dark border-danger-dark rounded-md cursor-pointer border-2 h-10 text-white p-1.5 w-10' />
              </button>
            </div>
            {errors?.name && (
              <p role='alert' className='text-danger-dark'>
                {errors?.name.message}
              </p>
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
