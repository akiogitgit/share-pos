import { Lora, Inter, Kenia, Dancing_Script } from '@next/font/google'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie'
import { SWRConfig } from 'swr'
// eslint-disable-next-line import/no-unresolved
import 'windi.css'
// const lora = Lora({
//   subsets: ['latin'], // 全てのfont-familyに適応
// })
// const lora = Lora()
// const inter = Inter()
// const dancing = Dancing_Script()
// const kenia = Kenia({ weight: '400' })

const lora = Lora({
  variable: '--font-lora',
})
const inter = Inter({
  variable: '--font-inter',
})
const dancing = Dancing_Script({
  variable: '--font-dancing',
})
const kenia = Kenia({
  weight: '400',
  variable: '--font-kenia',
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig>
      <CookiesProvider>
        <div
          className={`${inter.className} ${lora.className} ${dancing.className} ${kenia.className}`}
        >
          <Component {...pageProps} />
        </div>

        <style jsx global>
          {`
            :root {
              --font-lora: ${lora.style.fontFamily};
              --font-kenia: ${kenia.style.fontFamily};
              --font-dancing: ${dancing.style.fontFamily};
            }
             {
              /* html {
              font-family: ${dancing.style.fontFamily};
            } */
            }
          `}
        </style>
      </CookiesProvider>
    </SWRConfig>
  )
}

export default MyApp
