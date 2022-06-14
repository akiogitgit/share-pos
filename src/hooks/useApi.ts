import { useCallback } from 'react'
import useSWR, { SWRResponse } from 'swr'
import { fetchApi, HttpError } from '../utils/api'

export const useGetApi = <Data = any>(
  url: string,
  params?: Record<string, any>,
  fallbackData?: Data,
): SWRResponse<Data, HttpError> => {
  const fetcher = useCallback(
    async () => await fetchApi<Data>(url, 'GET', params),
    [url, params],
  )

  return useSWR<Data, HttpError>(`${url}${JSON.stringify(params)}`, fetcher, {
    revalidateOnReconnect: false,
    fallbackData,
  })
}
