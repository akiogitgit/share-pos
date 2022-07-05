import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import { SWRConfig } from 'swr'
import 'windi.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig>
      <CookiesProvider>
        <Component {...pageProps} />
      </CookiesProvider>
    </SWRConfig>
  )
}

export default MyApp
