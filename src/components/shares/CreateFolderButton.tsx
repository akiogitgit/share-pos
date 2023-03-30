import { zodResolver } from '@hookform/resolvers/zod'
import { ComponentProps, FC, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Alert } from './base/Alert'
import { Button } from './base/Button'
import { Modal } from 'components/shares/base/Modal'
import { useBoolean } from 'hooks/useBoolean'
import { useCreateFolder } from 'hooks/useFolder'
import { useFormErrorHandling } from 'hooks/useFormErrorHandling'

// bookmark, FolderListで使うときradiusを変える
type Props = {
  radius?: ComponentProps<typeof Button>['radius']
}

const schema = z.object({
  name: z
    .string()
    .min(1, { message: '入力は必須です' })
    .max(15, { message: '15文字以下で入力して下さい' }),
})

type FormData = z.infer<typeof schema>

export const CreateFolderButton: FC<Props> = ({ radius = 'md' }) => {
  const open = useBoolean(false)
  const { createFolder } = useCreateFolder()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const { onSubmit, errorMessage, clearErrorMessage } =
    useFormErrorHandling<FormData>(async (e: FormData) => {
      await createFolder(e.name)
      onClose()
    })

  const onClose = useCallback(() => {
    open.setFalse()
    clearErrorMessage()
    reset()
  }, [clearErrorMessage, open, reset])

  return (
    <>
      <Button onClick={open.setTrue} radius={radius} fullWidth>
        新規フォルダ作成
      </Button>

      <Modal open={open.v} onClose={onClose} title='新規フォルダ作成'>
        {errorMessage && (
          <Alert className='mx-4 mt-4' onClose={clearErrorMessage}>
            {errorMessage}
          </Alert>
        )}
        <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
          <div className='px-4'>
            <input
              type='text'
              placeholder='フォルダ名'
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
              {...register('name')}
              aria-required='true'
              aria-invalid={!!errors?.name}
            />
            {errors?.name && (
              <p role='alert' className='text-danger-dark'>
                {errors?.name.message}
              </p>
            )}
          </div>
          <button
            type='submit'
            className='font-bold border-t-2 border-gray-200 mt-4 text-primary-dark w-full py-2 duration-150 hover:bg-black/10 '
          >
            作成
          </button>
        </form>
      </Modal>
    </>
  )
}
