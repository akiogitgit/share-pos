import { useCallback } from 'react'
import useSWR, { SWRResponse } from 'swr'
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
