import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useLogOut } from './useAuth'
import { useCookies } from 'stores/useCookies'
import { useGlobalState } from 'stores/useGlobalState'

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
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')

  useEffect(() => {
    if (cookies.authInfo) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.authInfo])

  return isLoggedIn ?? false
}
