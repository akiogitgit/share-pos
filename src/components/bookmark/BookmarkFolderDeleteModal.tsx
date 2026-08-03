import { FC } from 'react'

import { Alert } from 'components/shares/base/Alert'
import { Modal } from 'components/shares/base/Modal'
import { useFormErrorHandling } from 'hooks/useFormErrorHandling'

type Props = {
  name: string
  open: boolean
  onClose: () => void
  onDeleteFolder?: () => void
}

export const BookmarkFolderDeleteModal: FC<Props> = ({
  name,
  open,
  onClose,
  onDeleteFolder,
}) => {
  const {
    onSubmit: onClick,
    errorMessage,
    clearErrorMessage,
  } = useFormErrorHandling(async () => {
    await onDeleteFolder?.()
    onClose?.()
  })

  return (
    <div>
      <Modal
        open={open}
        onClose={onClose}
        title={`\"${name}\" を削除しますか？`}
      >
        {errorMessage && (
          <Alert className='mx-4 mt-4' onClose={clearErrorMessage}>
            {errorMessage}
          </Alert>
        )}
        <p className='mt-4 text-center px-2'>
          フォルダ内の記事は全て削除されます。
          <br /> この操作は取り消せません
        </p>

        <div className='flex justify-between'>
          <button
            onClick={onClose}
            type='button'
            className='border-r-2 border-t-2 mt-4 text-primary-dark w-full py-2 duration-150 hover:bg-black/10'
          >
            閉じる
          </button>
          <button
            type='submit'
            onClick={onClick}
            className='font-bold border-t-2 mt-4 text-danger-dark w-full py-2  duration-150 hover:bg-black/10'
          >
            削除
          </button>
        </div>
      </Modal>
    </div>
  )
}
