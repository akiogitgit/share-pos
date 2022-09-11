import { useState } from 'react'
import { useCreateFolder } from 'hooks/useFolder'

export const CreateFolderField = () => {
  const [isOpenInputField, setIsOpenInputField] = useState(false)
  const [bookmarkName, setBookmarkName] = useState('')

  const { createFolder } = useCreateFolder()

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await createFolder(bookmarkName)
        setBookmarkName('')
      }}
      className='flex gap-3 items-center'
    >
      <input
        type='text'
        // className='border outline-none border-red-500 rounded-10px h-40px max-w-170px px-2 w-40vw duration-150 sm:w-200px'
        className='border outline-none border-red-500 rounded-10px h-40px px-2 w-[calc(100%-40px)] duration-150'
        placeholder='新規フォルダの作成'
        value={bookmarkName}
        required
        maxLength={15}
        onChange={(e) => setBookmarkName(e.target.value)}
        style={{
          clipPath: `${isOpenInputField ? 'inset(0)' : 'inset(0 0 0 100%)'}`,
        }}
      />
      <button
        type={bookmarkName ? 'submit' : 'button'}
        className='font-bold bg-red-500 rounded-10px h-40px text-white min-w-40px text-4xl w-40px relative'
        onClick={() => setIsOpenInputField(!isOpenInputField)}
      >
        <div
          className={`top-0px left-8px h-40px absolute transform duration-400 ${
            !bookmarkName && isOpenInputField && 'rotate-360'
          } ${
            bookmarkName &&
            'rotate-45 scale-x-50 translate-x-[-10px] translate-y-3px'
          }`}
        >
          <div className='bg-white rounded-full h-4px mt-18px w-24px'></div>
        </div>
        <div
          className={`top-0px left-8px h-40px absolute transform rotate-90 duration-400 ${
            !bookmarkName && isOpenInputField && 'rotate-[-180deg]'
          } ${bookmarkName && 'rotate-135 scale-x-110 translate-x-3px'}`}
        >
          <div className='bg-white rounded-full h-4px mt-18px w-24px'></div>
        </div>
      </button>
    </form>
  )
}
