import { useCallback } from 'react'
import { useGetApi } from './useApi'
import { BookmarkPosts } from 'types/bookmark'
import { Post } from 'types/post'
import { postApi, HttpError, deleteApi } from 'utils/api'

export const useAddBookmark = () => {
  const addBookmark = useCallback(async (folderId: string, post: Post) => {
    try {
      const res = await postApi('/folders/bookmarks', {
        folderId,
        postId: post.id,
      })
      console.log(res)
    } catch (e) {
      if (e instanceof HttpError) {
        console.error(e.message)
      }
    }
  }, [])

  return { addBookmark }
}

export const useRemoveBookmark = (folderId: string, post: Post) => {
  const { data: bookmarkPosts, mutate: postsMutate } = useGetApi<BookmarkPosts>(
    `/folders/${folderId}`,
  )

  const removeBookmark = useCallback(async () => {
    try {
      const res = await deleteApi(`/folders/bookmarks/${post.bookmark?.id}`, {})
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
  }, [bookmarkPosts, post.bookmark?.id, postsMutate])

  return { removeBookmark }
}
