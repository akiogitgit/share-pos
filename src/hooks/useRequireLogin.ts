import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useCookies } from './useCookies'
import { useIsLoggedIn } from './useIsLoggedIn'

export const useAutoLogin = () => {
  const { cookies, remove } = useCookies('authInfo')
  const isLoggedin = useIsLoggedIn()

  if (!cookies.authInfo || isLoggedin) {
    return
  }
  // cookieのtokenが期限切れなら消す
  if (Number(cookies?.authInfo?.expiry) < Date.now() / 1000) {
    remove('authInfo')
    return
  }
  console.log('Cookieから自動ログイン！')
}

// ログインしていないとloginページに飛ばす
export const useRequireLogin = () => {
  const { cookies } = useCookies('authInfo')
  const router = useRouter()

  const moveToLogin = useCallback(() => {
    if (!cookies.authInfo) {
      router.push('/login')
      console.log('ログインして下さい')
      return
    }
  }, [cookies, router])

  useEffect(() => {
    if (router.isReady) {
      moveToLogin()
    }
  }, [moveToLogin, router.isReady])
}
