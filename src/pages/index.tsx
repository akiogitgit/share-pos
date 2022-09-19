import { NextPage } from 'next'
import Head from 'next/head'
import { useState } from 'react'

import { Layout } from 'components/layout/Layout'
import { PostItem } from 'components/post/Item/PostItem'
import { useGetApi } from 'hooks/useApi'
import { useCookies } from 'stores/useCookies'
import { Post } from 'types/post'
import { deleteApi } from 'utils/api'
import { decrypted, encrypted } from 'utils/encrypt'

const Home: NextPage = () => {
  const { data: posts, error } = useGetApi<Post[]>('/posts')
  const { cookies, set } = useCookies('token')
  if (false) {
    deleteApi('/posts/delete_all')
  }
  const [stars, setStars] = useState(1)

  const enc = encrypted('anpan')
  console.log('enc', enc)
  const dec = decrypted(enc)
  console.log('dec', dec)

  // const encrypted = crypto.AES.encrypt('hogehoge', 'key')
  // console.log('暗号', encrypted.toString())
  // const decrypted = crypto.AES.decrypt(encrypted, 'key').toString(
  //   crypto.enc.Utf8,
  // )
  // console.log('複合', decrypted.toString())

  // var src = '12345ABCDE'
  // var des = ''
  // //暗号化キー:"testkey"を用いて暗号化
  // des = crypto.AES.encrypt(src, 'testkey')
  // console.log('-----------------\nSource :' + src)
  // console.log('Crypto :' + des)

  // //暗号化キー:"testkey"を用いて復号化
  // var decrypted2 = crypto.AES.decrypt(des, 'testkey').toString(crypto.enc.Utf8)
  // console.log('Decrypt:' + decrypted2)

  return (
    <>
      <Head>
        <title>SharePos 投稿一覧ページ</title>
      </Head>
      <Layout>
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
