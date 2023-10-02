import { useCallback, useState } from 'react'

export const useFormErrorHandling = <T = any>(
  func: (args: T) => Promise<void>,
): {
  onSubmit: (params: T) => Promise<void>
  errorMessage: string | null
  clearErrorMessage: () => void
} => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const onSubmit = useCallback(
    async (params: T) => {
      try {
        await func(params)
      } catch (error) {
        if (typeof error === 'string') {
          setErrorMessage(error)
          return
        }
        if (error instanceof Error) {
          setErrorMessage(error.message)
          return
        }
        setErrorMessage(String(error))
      }
    },
    [func],
  )

  const clearErrorMessage = useCallback(() => {
    setErrorMessage(null)
  }, [])

  return { onSubmit, errorMessage, clearErrorMessage }
}
