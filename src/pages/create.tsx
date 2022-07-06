import { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import PostForm from 'components/postForm'
import { useGetApi } from 'hooks/useApi'
import { useGlobalSWR } from 'stores/useGlobalSWR'
import { Posts } from 'types/post'
import { postApi } from 'utils/api'

type Response = {
  data: Posts
  message: string
}

const Create: NextPage = () => {
  const { data: authInfo } = useGlobalSWR('authInfo')
  const { data: posts, mutate } = useGetApi('/posts')
  const router = useRouter()

  // 型ガードのつもり
  const hasData = (value: any): value is { data: Posts } => {
    if (!value) {
      return false
    }
    if (typeof value.data === 'object' && typeof value.data !== 'undefined') {
      return true
    }
    return false
  }

  const onSubmit = useCallback(
    (
      e: React.FormEvent<HTMLFormElement>,
      comment: string,
      url: string,
      evaluation: number,
      published: boolean,
    ) => {
      postApi('/posts', { comment, url, evaluation, published }, authInfo).then(
        (res: Response | unknown) => {
          // if (!res) {
          //   return
          // }
          // if (typeof res != 'object') {
          //   return
          // }
          // if (typeof res.data != 'object') {
          //   return
          // }
          if (hasData(res)) {
            console.log('res: ', res.data)
            const newPost = res.data
            mutate({ ...posts, newPost }, false)
            router.push('/')
          }
        },
      )
      e.preventDefault()
    },
    [authInfo, mutate, posts, router],
  )
  return (
    <>
      <div>
        <Link href='/'>index</Link>
        <PostForm onSubmit={onSubmit} />
        <div>
          {posts &&
            posts.data
              .map((_, i, a) => a[a.length - 1 - i])
              .map((v, i) => (
                <ul key={i} className='mt-3'>
                  <li>{v.comment}</li>
                  <li>{v.url}</li>
                  <li>{v.comment}</li>
                </ul>
              ))}
        </div>
        <div>{JSON.stringify(posts)}</div>
      </div>
    </>
  )
}

export default Create
