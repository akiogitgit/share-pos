import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useIsLoggedIn } from './useIsLoggedIn'

// ログインしていないとloginページに飛ばす
export const useRequireLogin = () => {
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()

  const moveToLogin = useCallback(() => {
    setTimeout(() => {
      if (!isLoggedIn) {
        router.push('/login')
        return
      }
    }, 300)
  }, [isLoggedIn, router])

  useEffect(() => {
    if (router.isReady) {
      moveToLogin()
    }
  }, [moveToLogin, router.isReady])
}
