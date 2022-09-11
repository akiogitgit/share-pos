import { FC, useCallback, useState } from 'react'
import { BsFolder } from 'react-icons/bs'
import { useDeleteFolder, useUpdateFolder } from 'hooks/useFolder'
import { Folder } from 'types/bookmark'

type Props = {
  folders: Folder[]
  selectedFolderIndex: number
  onSelect: (index: number) => void
}

export const BookmarkFolderList: FC<Props> = ({
  folders,
  selectedFolderIndex,
  onSelect,
}) => {
  const [editingFolderIndex, setEditingFolderIndex] = useState<number>()
  const [editFolderName, setEditFolderName] = useState('')

  const { updateFolder } = useUpdateFolder()
  const { deleteFolder } = useDeleteFolder()

  const onClickFolder = useCallback(
    (index: number, folderName: string) => {
      // 連続で同じフォルダを押したときに、編集モードにする
      if (selectedFolderIndex === index) {
        setEditingFolderIndex(index)
        setEditFolderName(folderName)
      } else {
        setEditingFolderIndex(undefined)
      }
      onSelect(index)
    },
    [selectedFolderIndex, onSelect],
  )

  return (
    <>
      {/* // ブックマーク名一覧
        // TODO: 掴め！！！！, 編集・削除をモーダルで
        // <div className='flex h-50px mt-5 gap-2 overflow-x-scroll scroll-bar sm:(flex-col h-auto min-w-20 ) '> */}
      <div className='mt-5'>
        <div className='h-50px overflow-x-scroll scroll-bar sm:(h-auto min-w-190px max-w-190px max-h-[calc(100vh-250px)] overflow-x-hidden overflow-y-scroll) '>
          <div className='flex gap-2 sm:(flex-col gap-1) '>
            {folders.map((folder, index) => (
              <div
                key={folder.id}
                className={`whitespace-nowrap h-40px ${
                  selectedFolderIndex === index
                    ? 'border-b-3 border-red-500 text-red-500'
                    : 'text-gray-500 border-b-2'
                }`}
              >
                <div
                  className={`flex items-center mt-2 ${
                    selectedFolderIndex === index && 'font-bold'
                  }`}
                >
                  {/* {folder.name} */}
                  {editingFolderIndex === index ? (
                    <form
                      className='flex'
                      onSubmit={async (e) => {
                        setEditingFolderIndex(undefined)
                        e.preventDefault()
                        await updateFolder(folder.id, editFolderName)
                      }}
                    >
                      <input
                        type='text'
                        className='border outline-none text-black ring-blue-500 w-100px duration-300 focus:rounded-10px focus:ring-1'
                        value={editFolderName}
                        onChange={(e) => setEditFolderName(e.target.value)}
                      />
                      <button
                        className='font-bold bg-blue-500 text-white py-0.5 px-1'
                        type='submit'
                      >
                        更新
                      </button>
                      <div
                        className='cursor-pointer font-bold bg-red-500 text-white ml-1 py-0.5 px-1'
                        onClick={async () => {
                          setEditingFolderIndex(undefined)
                          await deleteFolder(folder.id)
                        }}
                      >
                        削除
                      </div>
                    </form>
                  ) : (
                    <button
                      className='text-left w-full'
                      onClick={() => onClickFolder(index, folder.name)}
                    >
                      <BsFolder className='mr-1' />
                      {folder.name}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scroll-bar::-webkit-scrollbar {
          width: 0;
          height: 0;
        }

        .scroll-bar:hover::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        .scroll-bar::-webkit-scrollbar-track {
          border-radius: 100px;
          background-color: rgba(254, 226, 226, var(--tw-bg-opacity));
          height: 100px;
        }
        .scroll-bar::-webkit-scrollbar-thumb {
          border-radius: 100px;
          background-color: rgba(239, 68, 68, var(--tw-bg-opacity));
        }
      `}</style>
    </>
  )
}
