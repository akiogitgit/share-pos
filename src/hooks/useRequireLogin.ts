import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useCookies } from './useCookies'
import { useGlobalSWR } from 'stores/useGlobalSWR'

export const useRequireLogin = () => {
  const { cookies, remove } = useCookies('authInfo')
  const { data: authInfo, mutate } = useGlobalSWR('authInfo')
  const router = useRouter()

  // index, login, signup ページ以外で発動させる
  const isLoggedIn = useCallback(() => {
    if (!(authInfo || ['/', '/login', '/signup'].includes(router.pathname))) {
      router.push('/login')
      console.log('ログインして下さい')
      return
    }
  }, [authInfo, router])

  useEffect(() => {
    if (router.isReady) {
      isLoggedIn()
    }
  }, [isLoggedIn, router.isReady])

  // cookieのtokenが期限切れなら、cookieを消す
  if (Number(cookies?.authInfo?.expiry) < Date.now() / 1000) {
    remove('authInfo')
    return
  }

  if (cookies.authInfo && !authInfo) {
    console.log('Cookieから自動ログイン！')
    mutate(cookies.authInfo)
  }
}
