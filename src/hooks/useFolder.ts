import { useCallback } from 'react'
import { useGetApi } from './useApi'
import { Folder } from 'types/bookmark'
import { postApi, HttpError, putApi, deleteApi } from 'utils/api'

export const useCreateFolder = () => {
  const { data: folders, mutate: mutateFolders } =
    useGetApi<Folder[]>('/folders')

  const createFolder = useCallback(
    async (bookmarkName: string) => {
      try {
        const res = await postApi<Folder>('/folders', { name: bookmarkName })
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
    [folders, mutateFolders],
  )

  return { createFolder }
}

export const useUpdateFolder = () => {
  const { data: folders, mutate: mutateFolders } =
    useGetApi<Folder[]>('/folders')

  const updateFolder = useCallback(
    async (id: number, editFolderName: string) => {
      try {
        const res = await putApi<Folder>(`/folders/${id}`, {
          name: editFolderName,
        })
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
    [folders, mutateFolders],
  )
  return { updateFolder }
}

export const useDeleteFolder = () => {
  const { data: folders, mutate: mutateFolders } =
    useGetApi<Folder[]>('/folders')

  const deleteFolder = useCallback(
    async (id: number) => {
      try {
        const res = await deleteApi(`/folders/${id}`)
        const newFolders = folders?.filter((folder) => folder.id !== id)
        mutateFolders(newFolders)

        console.log(res)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [folders, mutateFolders],
  )

  return { deleteFolder }
}
