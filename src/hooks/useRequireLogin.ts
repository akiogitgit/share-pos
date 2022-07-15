import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useCookies } from './useCookies'
import { useGlobalSWR } from 'stores/useGlobalSWR'

// CookieのTokenが有効の時に、authInfoをセットする
export const useAutoLogin = () => {
  const { cookies, remove } = useCookies('authInfo')
  const { data: authInfo, mutate } = useGlobalSWR('authInfo')

  if (authInfo) {
    return
  }
  // cookieのtokenが期限切れなら消す
  if (Number(cookies?.authInfo?.expiry) < Date.now() / 1000) {
    remove('authInfo')
    return
  }
  if (cookies.authInfo && !authInfo) {
    console.log('Cookieから自動ログイン！')
    mutate(cookies.authInfo)
  }
}

// ログインしていないとloginページに飛ばす
export const useRequireLogin = () => {
  const { data: authInfo } = useGlobalSWR('authInfo')
  const router = useRouter()

  const moveToLogin = useCallback(() => {
    if (!authInfo) {
      router.push('/login')
      console.log('ログインして下さい')
      return
    }
  }, [authInfo, router])

  useEffect(() => {
    if (router.isReady) {
      moveToLogin()
    }
  }, [moveToLogin, router.isReady])
}
