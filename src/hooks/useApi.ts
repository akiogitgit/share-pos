import { useCallback } from 'react'
import useSWR, { SWRResponse } from 'swr'
import useSWRInfinite from 'swr/infinite'
import { fetchApi, HttpError } from '../utils/api'

export const useGetApi = <Data = any>(
  url: string,
  props?: {
    params?: Record<string, any>
    headers?: Record<string, string>
    fallbackData?: Data
    options: {
      revalidateIfStale?: boolean
    }
  },
): SWRResponse<Data, HttpError> => {
  const fetcher = useCallback(
    async () => await fetchApi<Data>(url, 'GET', props?.params, props?.headers),
    [props?.headers, props?.params, url],
  )

  return useSWR<Data, HttpError>(
    `${url}${JSON.stringify(props?.params)}`,
    fetcher,
    {
      revalidateOnReconnect: false,
      revalidateIfStale: props?.options?.revalidateIfStale,
      revalidateOnFocus: false,
      fallbackData: props?.fallbackData,
    },
  )
}

export const useGetInfinite = <Data = any>(
  url: string,
  props?: {
    body: Record<string, any>
    header: Record<string, string>
  },
  limit = 24,
) => {
  const getKey = (pageIndex: number, previousPageData: Data[][]) => {
    if (previousPageData && !previousPageData.length) return null // 最後に到達した
    return `${url}?page=${pageIndex + 1}` // SWR キー
  }

  const fetcher = useCallback(
    async (url: string) =>
      await fetchApi<Data[]>(url, 'GET', props?.body, props?.header),
    [props?.header, props?.body],
  )

  const SWRInfiniteResponse = useSWRInfinite<Data[], HttpError>(
    getKey,
    fetcher,
    {
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      revalidateOnFocus: false,
    },
  )

  const { data, size, setSize } = SWRInfiniteResponse

  // 最後に到達した
  const isEmpty = data?.[0].length === 0
  const isReachingEnd =
    isEmpty || (data && data?.[data?.length - 1]?.length < limit)

  // もっと読み込む
  const fetchMore = useCallback(() => {
    setSize(size + 1)
  }, [setSize, size])

  return { ...SWRInfiniteResponse, isReachingEnd, fetchMore }
}
