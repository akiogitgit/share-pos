import useSWR from 'swr'

type GlobalState = {
  // path: ステート管理する型
  '/auth/token': string
}

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
