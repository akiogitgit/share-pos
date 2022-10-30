import { FC, ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className='bg-base min-h-screen'>
        <Header />
        <main>
          {/* <div className='mx-auto max-w-1150px px-4 pt-100px pb-70px sm:pt-130px'> */}
          <div className='mx-auto max-w-1150px px-4 pt-50px pb-70px'>
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </>
  )
}
