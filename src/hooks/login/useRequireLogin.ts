import { useRouter } from 'next/navigation'
import { useCallback, useEffect } from 'react'
import { useIsLoggedIn } from './useIsLoggedIn'

// ログインしていないとloginページに飛ばす
export const useRequireLogin = () => {
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()

  const moveToLogin = useCallback(() => {
    if (!isLoggedIn) {
      router.push('/login')
      return
    }
  }, [isLoggedIn, router])

  useEffect(() => {
    moveToLogin()
  }, [moveToLogin])
}
