import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'

import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'stores/useCookies'
import { Post } from 'types/post'
import { deleteApi } from 'utils/api'
import { console_cookie, create_cookie } from 'utils/encryptedCookie'

const Home: NextPage = () => {
  const { data: posts, error } = useGetApi<Post[]>('/posts')
  const { cookies, set } = useCookies('token')
  if (false) {
    deleteApi('/posts/delete_all')
  }
  const [stars, setStars] = useState(1)

  const login = () => {
    set('token', create_cookie(String(process.env.NEXT_PUBLIC_USER1_TOKEN)))
    console.log(
      'set',
      create_cookie(String(process.env.NEXT_PUBLIC_USER1_TOKEN)),
    )
  }

  // const userAgent = navigator.userAgent
  // let device = ''

  // if (
  //   userAgent.indexOf('iPhone') > 0 ||
  //   userAgent.indexOf('iPod') > 0 ||
  //   (userAgent.indexOf('Android') > 0 && userAgent.indexOf('Mobile') > 0)
  // ) {
  //   device = 'SmartPhon'
  // } else if (
  //   userAgent.indexOf('iPad') > 0 ||
  //   userAgent.indexOf('Android') > 0
  // ) {
  //   device = 'Tablet'
  // } else {
  //   device = 'Personal Computer'
  // }
  // console.log(userAgent, device)

  useEffect(() => {
    console_cookie(create_cookie('HELLO WORLD'))
  }, [])
  return (
    <>
      <Head>
        <title>SharePos 投稿一覧ページ</title>
      </Head>
      <Layout>
        <button onClick={login}>login</button>
        {/* <p>{JSON.stringify(userAgent)}</p> */}
        {/* <PostStars
          evaluation={stars}
          onClick={(newStar) => setStars(newStar)}
        /> */}
        {posts?.length && (
          <div className='mt-4'>
            <div className='grid gap-6 justify-center items-start sm:(grid-cols-[repeat(auto-fill,minmax(291px,auto))])'>
              {posts.map((post) => (
                <div key={post.id} className='mb-1'>
                  <PostItem post={post} />
                </div>
              ))}
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}

export default Home
