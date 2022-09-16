import { useGetApi } from 'hooks/useApi'

// user_idがCookieにあるとログイン。でも、そのまま確認できない。
// /users/me にアクセスしてresがあるなら、ログイン
// resからuser_info{user_id,username}をCookieに格納
export const useIsLoggedIn = (): boolean => {
  const { data, error } = useGetApi('/users/me')
  console.log(data)
  // const { cookies } = useCookies('token')
  // const [isLoggedIn, setIsLoggedIn] = useGlobalState('isLoggedIn')

  // useEffect(() => {
  //   if (cookies.token) {
  //     setIsLoggedIn(true)
  //   } else {
  //     setIsLoggedIn(false)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [cookies.token])
  if (error) {
    return false
  }
  return data ?? true
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
