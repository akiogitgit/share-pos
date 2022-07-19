import { useCookies } from 'hooks/useCookies'

export const useLogOut = () => {
  const { remove } = useCookies('authInfo')
  return () => remove('authInfo')
}
