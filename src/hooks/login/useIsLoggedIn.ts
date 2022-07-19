import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useLogOut } from './useAuth'
import { useCookies } from 'hooks/useCookies'
import { useGlobalSWR } from 'stores/useGlobalSWR'

export const useObserveAuthInfoExpired = () => {
  const { cookies } = useCookies('authInfo')
  const { logOut } = useLogOut()
  const router = useRouter()

  useEffect(() => {
    if (Number(cookies?.authInfo?.expiry) < Date.now() / 1000) {
      logOut()
    }
  }, [cookies?.authInfo?.expiry, logOut, router.pathname])
}

export const useIsLoggedIn = (): boolean => {
  const { cookies } = useCookies('authInfo')
  const { data, mutate } = useGlobalSWR('isLoggedIn')

  useEffect(() => {
    if (cookies.authInfo) {
      mutate(true)
    } else {
      mutate(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.authInfo])

  return data ?? false
}
