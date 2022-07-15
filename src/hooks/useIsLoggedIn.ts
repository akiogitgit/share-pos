import { useEffect } from 'react'
import { useCookies } from './useCookies'
import { useGlobalSWR } from 'stores/useGlobalSWR'

export const useIsLoggedIn = (): boolean => {
  const { cookies } = useCookies('authInfo')
  const { data, mutate } = useGlobalSWR('isLoggedIn')

  useEffect(() => {
    if (cookies.authInfo && !data) {
      mutate(true)
      console.log('isLoggedIn!')
    }
  }, [cookies.authInfo, data, mutate])

  return data ?? false
}
