// import { useGetApi } from 'hooks/useApi'
import { useEffect } from 'react'
import { useCookies } from 'stores/useCookies'
import { useGlobalState } from 'stores/useGlobalState'

// user_idがCookieにあるとログイン。でも、そのまま確認できない。
// /users/me にアクセスしてresがあるなら、ログイン
// resからuser_info{user_id,username}をCookieに格納
export const useIsLoggedIn = (): boolean => {
  const { cookies } = useCookies('user_info')
  const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')

  useEffect(() => {
    if (cookies.user_info) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.user_info])
  return isLoggedIn ?? true

  // グローバルステートで管理
  // const { data, error } = useGetApi('/users/me')
  // if (error) {
  //   return false
  // }
  // return data ?? true
}

// export const useIsLoggedIn = (): boolean => {
//   const { cookies } = useCookies('token')
//   const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')

//   useEffect(() => {
//     if (cookies.token) {
//       setIsLoggedIn(true)
//     } else {
//       setIsLoggedIn(false)
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [cookies.token])
//   return isLoggedIn ?? true
// }
