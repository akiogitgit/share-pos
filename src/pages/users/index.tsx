import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: NextPage = () => {
  const router = useRouter()

  useEffect(() => {
    if (router.isReady) {
      router.push('/')
    }
  }, [router])

  return <></>
}
export default Home
