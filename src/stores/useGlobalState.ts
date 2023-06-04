import useSWR, { type KeyedMutator } from 'swr'

type GlobalState = {}

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
