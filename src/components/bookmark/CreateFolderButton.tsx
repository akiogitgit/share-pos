import { FC, useCallback, useState } from 'react'
import { Modal } from 'components/shares/Modal'
import { useCreateFolder } from 'hooks/useFolder'

type Props = {
  className?: string
}

export const CreateFolderButton: FC<Props> = ({ className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')

  const { createFolder } = useCreateFolder()

  const onClose = useCallback(() => {
    setIsOpen(false)
    setName('')
  }, [])

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={className}>
        新規フォルダ作成
      </button>

      <Modal open={isOpen} onClose={onClose} title='新規フォルダ作成'>
        <form
          className='pt-2'
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
              className='border outline-none rounded-3px w-full p-1 ring-gray-300 duration-300 focus:ring-1'
            />
          </div>
          <button
            type='submit'
            className='font-bold border-t-2 border-gray-200 mt-4 text-secondary w-full py-2 duration-150 hover:bg-black/10 '
          >
            作成
          </button>
        </form>
      </Modal>
    </>
  )
}
