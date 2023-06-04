import { useRouter } from 'next/router'
import { useCallback } from 'react'

import { Folder } from 'types/bookmark'
import { postApi, HttpError, putApi, deleteApi } from 'utils/api'
import { getStatusErrorMessage } from 'utils/getStatusErrorMessage'

import { useGetApi } from './useApi'

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
          throw getStatusErrorMessage(e.status)
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
    async (id: string, editFolderName: string) => {
      try {
        const res = await putApi<Folder>(`/folders/${id}`, {
          name: editFolderName,
        })
        if (!folders) {
          return
        }

        const newFolders = folders.map(folder => {
          if (folder.id === id) {
            return res
          }
          return folder
        })

        mutateFolders(newFolders, false)
        console.log(res)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
          throw getStatusErrorMessage(e.status)
        }
      }
    },
    [folders, mutateFolders],
  )
  return { updateFolder }
}

export const useDeleteFolder = () => {
  const router = useRouter()
  const { data: folders, mutate: mutateFolders } =
    useGetApi<Folder[]>('/folders')

  const deleteFolder = useCallback(
    async (id: string) => {
      try {
        const res = await deleteApi(`/folders/${id}`)
        const newFolders = folders?.filter(folder => folder.id !== id)
        // 一番新しいfolder.idだと folders[id]が配列からはみ出てエラーが出るから待機する
        await router.push('bookmark')
        mutateFolders(newFolders, false)

        console.log(res)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
          throw getStatusErrorMessage(e.status)
        }
      }
    },
    [folders, mutateFolders, router],
  )

  return { deleteFolder }
}
