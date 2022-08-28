import { Dispatch, FC, SetStateAction, useCallback, useState } from 'react'
import { BsFolder } from 'react-icons/bs'
import { useAuthHeaderParams } from 'hooks/login/useAuth'
import { useGetApi } from 'hooks/useApi'
import { Folder } from 'types/bookmark'
import { deleteApi, putApi } from 'utils/api'

type Props = {
  selectedFolder: number
  setSelectedFolder: Dispatch<SetStateAction<number>>
}

export const FolderList: FC<Props> = ({
  selectedFolder,
  setSelectedFolder,
}) => {
  const [editFolderId, setEditFolderId] = useState(0)
  const [editFolderName, setEditFolderName] = useState('')
  const authHeaderParams = useAuthHeaderParams()

  const { data: folders, mutate } = useGetApi<Folder[]>(
    '/folders',
    undefined,
    authHeaderParams,
  )

  const updateFolder = useCallback(
    async (id: number, name: string) => {
      try {
        const res = await putApi(
          `/folders/${id}`,
          { name: name },
          authHeaderParams,
        )
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    },
    [authHeaderParams],
  )

  const deleteFolder = useCallback(
    async (id: number) => {
      try {
        const res = await deleteApi(`/folders/${id}`, {}, authHeaderParams)
        console.log(res)
      } catch (e) {
        console.error(e)
      }
    },
    [authHeaderParams],
  )

  const onUpdateFolder = useCallback((id: number) => {
    console.log('form!!')
  }, [])

  const onClickFolder = useCallback(
    (folderId: number, folderName: string) => {
      if (selectedFolder === folderId) {
        setEditFolderId(folderId)
        setEditFolderName(folderName)
      } else {
        setEditFolderId(0)
      }
      setSelectedFolder(folderId)
    },
    [selectedFolder, setSelectedFolder],
  )

  return (
    <>
      {folders?.length ? (
        // ブックマーク名一覧
        <div className='flex h-50px mt-5 gap-2 overflow-x-scroll scroll-bar sm:w-70vw md:w-full'>
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`whitespace-nowrap h-40px  ${
                selectedFolder === folder.id
                  ? 'border-b-3 border-red-500 text-red-500'
                  : 'text-gray-500 border-b-2'
              }`}
            >
              <button
                onClick={() => onClickFolder(folder.id, folder.name)}
                className={`flex items-center mt-2 ${
                  selectedFolder === folder.id && 'font-bold'
                }`}
              >
                <BsFolder className='mr-1' />

                {/* {folder.name} */}
                {editFolderId === folder.id ? (
                  <form
                    className='flex'
                    onSubmit={(e) => {
                      e.preventDefault()
                      onUpdateFolder(folder.id)
                    }}
                  >
                    <input
                      type='text'
                      className='text-black'
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
                      className='font-bold bg-red-500 text-white py-0.5 px-1'
                      onClick={() => deleteFolder(folder.id)}
                    >
                      削除
                    </div>
                  </form>
                ) : (
                  folder.name
                )}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className='mx-auto mt-20 w-300px'>
          <p className='overflow-hidden'>
            右の
            <span className='font-bold bg-red-500 rounded-10px text-white px-1 text-30px'>
              +
            </span>
            を押してブックマークを作成
          </p>
          <p>ブックマークを作成して記事を追加しよう！</p>
          <p>画像を貼って手順を分かりやすく表示</p>
        </div>
      )}

      <style jsx>{`
        .scroll-bar::-webkit-scrollbar {
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
          transform: scale(0.5);
        }
        .scroll-bar::-webkit-scrollbar-thumb {
          border-radius: 100px;
          background-color: rgba(239, 68, 68, var(--tw-bg-opacity));
        }
      `}</style>
    </>
  )
}
