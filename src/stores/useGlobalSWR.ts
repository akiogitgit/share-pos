import useSWR from 'swr'
import { AuthInfo } from 'types/authInfo'

type GlobalState = { authInfo: AuthInfo }

export const useGlobalSWR = <
  Path extends keyof GlobalState,
  Data extends GlobalState[Path],
>(
  path: Path,
) => {
  return useSWR<Data | undefined>(path, null, {
    fallbackData: undefined,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
}
