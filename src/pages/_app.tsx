import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import { SWRConfig } from 'swr'
// eslint-disable-next-line import/no-unresolved
import 'windi.css'

// const cantoreOne = Cantora_One({ weight: '400' })

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig>
      <CookiesProvider>
        <Component {...pageProps} />

        {/* <style jsx global>
          {`
            :root {
              --font-cantoreOne: ${cantoreOne.style.fontFamily};
            }
          `}
        </style> */}
      </CookiesProvider>
    </SWRConfig>
  )
}

export default MyApp
