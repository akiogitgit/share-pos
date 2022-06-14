import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import 'windi.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig>
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
