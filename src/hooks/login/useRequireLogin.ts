import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useIsLoggedIn } from './useIsLoggedIn'

// ログインしていないとloginページに飛ばす
export const useRequireLogin = () => {
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()

  function sleep(waitTime: number, callbackFunc: any) {
    let spendTime = 0
    let id = setInterval(function () {
      spendTime++
      if (spendTime >= waitTime) {
        clearInterval(id)
        if (callbackFunc) callbackFunc()
      }
    }, waitTime)
  }

  const moveToLogin = useCallback(() => {
    sleep(100, function () {
      if (!isLoggedIn) {
        router.push('/login')
        return
      }
    })
  }, [isLoggedIn, router])

  useEffect(() => {
    if (router.isReady) {
      moveToLogin()
    }
  }, [moveToLogin, router.isReady])
}
