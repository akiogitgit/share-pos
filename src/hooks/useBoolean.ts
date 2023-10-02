import { useMemo, useState } from 'react'

export const useBoolean = (
  init = false,
): {
  v: boolean
  setTrue: () => void
  setFalse: () => void
  toggle: () => void
} => {
  const [boolean, setBoolean] = useState(init)

  const res = useMemo(
    () => ({
      v: boolean,
      setTrue: () => setBoolean(true),
      setFalse: () => setBoolean(false),
      toggle: () => setBoolean(v => !v),
    }),
    [boolean],
  )

  return res
}
