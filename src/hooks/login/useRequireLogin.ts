import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useIsLoggedIn } from './useIsLoggedIn'

// ログインしていないとloginページに飛ばす
export const useRequireLogin = () => {
  const isLoggedIn = useIsLoggedIn()
  const router = useRouter()

  function sleep(waitTime: number, callbackFunc: any) {
    let spenedTime = 0
    let id = setInterval(function () {
      spenedTime++
      if (spenedTime >= waitTime) {
        clearInterval(id)
        if (callbackFunc) callbackFunc()
      }
    }, waitTime)
  }

  const moveToLogin = useCallback(() => {
    // 初回アクセス時、必ず loginに飛ばされる
    // if (!isLoggedIn) {
    //   // router.push('/login')
    //   return
    // }

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
