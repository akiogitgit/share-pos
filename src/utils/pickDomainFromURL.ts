import { useCallback } from 'react'

export const AAA = () => {
  const pickDomainFromURL = useCallback((url: string) => {
    return url.split('//')[1].split('/')[0]
  }, [])

  // ドメインによって、表示するURLを変える
  const determineUrlByDomain = useCallback((imageURL: string) => {
    return ['qiita-user', 'res.cloudinary', 'data:image/png;base64'].some((v) =>
      imageURL.includes(v),
    )
      ? imageURL
      : `https://res.cloudinary.com/demo/image/fetch/${imageURL}`
  }, [])

  return { pickDomainFromURL, determineUrlByDomain }
}
