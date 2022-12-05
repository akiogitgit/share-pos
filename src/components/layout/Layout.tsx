import { Lora, Inter, Kenia, Dancing_Script } from '@next/font/google'
import { FC, ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './header/Header'

type Props = {
  children: ReactNode
}
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

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div
      className={`${inter.className} ${lora.className} ${dancing.className} ${kenia.className}`}
    >
      <div className='bg-base min-h-screen'>
        <Header />
        <main>
          <div className='mx-auto max-w-1150px px-4 pt-50px pb-150px'>
            {children}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}
