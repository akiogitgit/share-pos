import useSWR from 'swr'

type GlobalState = {
  // path: ステート管理する型
  'auth-info': { 'access-token': string; client: string; uid: string }
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
