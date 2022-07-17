import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import { SWRConfig } from 'swr'
import { useObserveAuthInfoExpired } from 'hooks/useIsLoggedIn'
import 'windi.css'

function MyApp({ Component, pageProps }: AppProps) {
  // ここでcookie切れたら消す
  useObserveAuthInfoExpired()
  return (
    <SWRConfig>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </SWRConfig>
  )
}

export default MyApp
