import { useGetApi } from 'hooks/useApi'

export const useIsLoggedIn = (): boolean => {
  const { error } = useGetApi('/users/me')
  if (error) return false
  return true
}
