import { FC, ReactNode } from 'react'

import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className='bg-primary-light min-h-screen'>
      <Header />
      <main>
        <div className='mx-auto max-w-1150px px-4 pt-12 pb-36'>{children}</div>
      </main>
      <Footer />
    </div>
  )
}
