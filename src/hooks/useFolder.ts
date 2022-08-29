import { useCallback } from 'react'
import { useAuthHeaderParams } from './login/useAuth'
import { useGetApi } from './useApi'
import { Folder } from 'types/bookmark'
import { postApi, HttpError, putApi, deleteApi } from 'utils/api'

export const useFolder = () => {
  const authHeaderParams = useAuthHeaderParams()

  const { data: folders, mutate: mutateFolders } = useGetApi<Folder[]>(
    '/folders',
    undefined,
    authHeaderParams,
  )

  const createFolder = useCallback(
    async (bookmarkName: string) => {
      try {
        const res = await postApi<Folder>(
          '/folders',
          { name: bookmarkName },
          authHeaderParams,
        )
        if (res && folders) {
          console.log('フォルダの作成に成功 ', res)
          mutateFolders([...folders, res], false)
        }

        console.log(res)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [authHeaderParams, folders, mutateFolders],
  )

  const updateFolder = useCallback(
    async (id: number, editFolderName: string) => {
      try {
        const res = await putApi<Folder>(
          `/folders/${id}`,
          { name: editFolderName },
          authHeaderParams,
        )
        if (!res || !folders) {
          return
        }

        const newFolders = folders.map((folder) => {
          if (folder.id === id) {
            return res
          }
          return folder
        })

        mutateFolders(newFolders)
        console.log(res)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [authHeaderParams, folders, mutateFolders],
  )

  const deleteFolder = useCallback(
    async (id: number) => {
      try {
        const res = await deleteApi(`/folders/${id}`, {}, authHeaderParams)
        const newFolders = folders?.filter((folder) => folder.id !== id)
        mutateFolders(newFolders)

        console.log(res)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [authHeaderParams, folders, mutateFolders],
  )

  return { createFolder, updateFolder, deleteFolder }
}
