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
    // <form
    //   onSubmit={async (e) => {
    //     e.preventDefault()
    //     await createFolder(name)
    //     setName('')
    //   }}
    //   className='flex gap-3 items-center'
    // >
    //   <input
    //     type='text'
    //     // className='border outline-none border-red-500 rounded-10px h-40px max-w-170px px-2 w-40vw duration-150 sm:w-200px'
    //     className='border outline-none border-red-500 rounded-10px h-40px px-2 w-[calc(100%-40px)] duration-150'
    //     placeholder='新規フォルダの作成'
    //     value={name}
    //     required
    //     maxLength={15}
    //     onChange={(e) => setName(e.target.value)}
    //     style={{
    //       clipPath: `${isOpenInputField ? 'inset(0)' : 'inset(0 0 0 100%)'}`,
    //     }}
    //   />
    //   <button
    //     type={name ? 'submit' : 'button'}
    //     className='font-bold bg-red-500 rounded-10px h-40px text-white min-w-40px text-4xl w-40px relative'
    //     onClick={() => setIsOpenInputField(!isOpenInputField)}
    //   >
    //     <div
    //       className={`top-0px left-8px h-40px absolute transform duration-400 ${
    //         !name && isOpenInputField && 'rotate-360'
    //       } ${
    //         name &&
    //         'rotate-45 scale-x-50 translate-x-[-10px] translate-y-3px'
    //       }`}
    //     >
    //       <div className='bg-white rounded-full h-4px mt-18px w-24px'></div>
    //     </div>
    //     <div
    //       className={`top-0px left-8px h-40px absolute transform rotate-90 duration-400 ${
    //         !name && isOpenInputField && 'rotate-[-180deg]'
    //       } ${name && 'rotate-135 scale-x-110 translate-x-3px'}`}
    //     >
    //       <div className='bg-white rounded-full h-4px mt-18px w-24px'></div>
    //     </div>
    //   </button>
    // </form>
  )
}
