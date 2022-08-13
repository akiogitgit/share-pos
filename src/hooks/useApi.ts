import { useCallback } from 'react'
import useSWR, { SWRResponse } from 'swr'
import { fetchApi, HttpError } from '../utils/api'

export const useGetApi = <Data = any>(
  url: string,
  params?: Record<string, any>,
  headers?: Record<string, string>,
  fallbackData?: Data,
): SWRResponse<Data, HttpError> => {
  const fetcher = useCallback(
    async () => await fetchApi<Data>(url, 'GET', params, headers),
    [url, params, headers],
  )

  return useSWR<Data, HttpError>(`${url}${JSON.stringify(params)}`, fetcher, {
    revalidateOnReconnect: false,
    fallbackData,
  })
}
