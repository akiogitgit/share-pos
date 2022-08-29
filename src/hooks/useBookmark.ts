import { useCallback } from 'react'
import { useAuthHeaderParams } from './login/useAuth'
import { useGetApi } from './useApi'
import { BookmarkPosts } from 'types/bookmark'
import { Post } from 'types/post'
import { postApi, HttpError, deleteApi } from 'utils/api'

export const useAddBookmark = () => {
  const authHeaderParams = useAuthHeaderParams()

  const addBookmark = useCallback(
    async (folderId: number, post: Post) => {
      try {
        const res = await postApi(
          '/folders/bookmarks',
          { folder_id: folderId, post_id: post.id },
          authHeaderParams,
        )
        console.log(res)
      } catch (e) {
        if (e instanceof HttpError) {
          console.error(e.message)
        }
      }
    },
    [authHeaderParams],
  )

  return { addBookmark }
}

export const useRemoveBookmark = (selectedFolder: number, post: Post) => {
  const authHeaderParams = useAuthHeaderParams()

  const { data: bookmarkPosts, mutate: postsMutate } = useGetApi<BookmarkPosts>(
    `/folders/${selectedFolder}`,
    undefined,
    authHeaderParams,
  )

  const removeBookmark = useCallback(async () => {
    try {
      const res = await deleteApi(
        `/folders/bookmarks/${post.bookmark?.id}`,
        {},
        authHeaderParams,
      )
      if (!bookmarkPosts) {
        return
      }

      const newBookmarkPosts = {
        id: bookmarkPosts?.id,
        name: bookmarkPosts?.name,
        posts: bookmarkPosts?.posts.filter(
          (v) => v.bookmark?.id !== post.bookmark?.id,
        ),
      }
      postsMutate(newBookmarkPosts, false)
      console.log('ブックマークを削除しました', res)
    } catch (e) {
      if (e instanceof HttpError) {
        console.error(e.message)
      }
    }
  }, [authHeaderParams, bookmarkPosts, post.bookmark?.id, postsMutate])

  return { removeBookmark }
}
