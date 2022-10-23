import { useCallback, useState } from 'react'
import { Modal } from 'components/shares/Modal'
import { useCreateFolder } from 'hooks/useFolder'

export const CreateFolderField = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState('')

  const { createFolder } = useCreateFolder()

  const onClose = useCallback(() => {
    setIsOpen(false)
    setName('')
  }, [])

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className='font-bold bg-red-500 rounded-10px text-white py-1 px-2'
      >
        新規フォルダ作成
      </button>
      <Modal open={isOpen} onClose={onClose} title='新規フォルダ作成'>
        <form
          className='pt-2'
          onSubmit={async (e) => {
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
              onChange={(e) => setName(e.target.value)}
              className='border outline-none rounded-3px w-full p-1 ring-gray-300 duration-300 focus:ring-1'
            />
          </div>
          <button
            type='submit'
            className='font-bold border-t-2 border-gray-200 mt-4 w-full py-2 text-blue-500 duration-150 hover:bg-black/10 '
          >
            作成
          </button>
        </form>
      </Modal>
    </>
  )
}
