import { FC, ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='bg-red-100 min-h-100vh overflow-hidden'>
        <div className='mx-auto mt-100px max-w-1110px px-2 break-words sm:mt-130px'>
          {children}
        </div>
      </main>

      <Footer />
    </>
  )
}
