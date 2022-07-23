import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import { SWRConfig } from 'swr'
import { useObserveAuthInfoExpired } from 'hooks/login/useIsLoggedIn'
// eslint-disable-next-line import/no-unresolved
import 'windi.css'

function MyApp({ Component, pageProps }: AppProps) {
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
