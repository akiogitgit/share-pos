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
      <main className='bg-red-100 min-h-100vh'>
        <div className='mx-auto max-w-1150px px-4 pt-100px pb-70px break-words sm:pt-130px'>
          {children}
        </div>
      </main>

      <Footer />
    </>
  )
}
