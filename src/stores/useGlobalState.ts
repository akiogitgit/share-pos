import useSWR, { KeyedMutator } from 'swr'
import { AuthInfo } from 'types/user/authInfo'

type GlobalState = { '/authInfo': AuthInfo }

export const useGlobalState = <
  Path extends keyof GlobalState,
  Data extends GlobalState[Path],
>(
  path: Path,
  fallbackData?: Data,
): [Data | undefined, KeyedMutator<Data | undefined>] => {
  const { data, mutate } = useSWR<Data | undefined>(path, null, {
    fallbackData,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })
  return [data, mutate]
}
