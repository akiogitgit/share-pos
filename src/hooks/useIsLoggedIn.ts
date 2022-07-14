import { useEffect, useState } from 'react'
import { useGlobalSWR } from 'stores/useGlobalSWR'

export const useIsLoggedIn = (): boolean => {
  const { data: authInfo } = useGlobalSWR('authInfo')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    if (authInfo) {
      setIsLoggedIn(true)
    }
  }, [authInfo])

  return isLoggedIn
}
