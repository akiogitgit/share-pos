import { ComponentProps, FC, useCallback, useState } from 'react'
import { Button } from './base/Button'
import { Modal } from 'components/shares/base/Modal'
import { useCreateFolder } from 'hooks/useFolder'

// bookmark, FolderListで使うときradiusを変える
type Props = {
  radius?: ComponentProps<typeof Button>['radius']
}

export const CreateFolderButton: FC<Props> = ({ radius = 'md' }) => {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')

  const { createFolder } = useCreateFolder()

  const onClose = useCallback(() => {
    setOpen(false)
    setName('')
  }, [])

  return (
    <>
      <Button onClick={() => setOpen(true)} radius={radius} fullWidth>
        新規フォルダ作成
      </Button>

      <Modal open={open} onClose={onClose} title='新規フォルダ作成'>
        <form
          className='mt-4'
          onSubmit={async e => {
            e.preventDefault()
            onClose()
            await createFolder(name)
          }}
        >
          <div className='px-4'>
            <input
              type='text'
              placeholder='フォルダ名'
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
            />
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
