import { FC, ReactNode } from 'react'
import { Footer } from './Footer'
import { Header } from './Header'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className='min-h-screen grid grid-rows-[auto,1fr]'>
        <Header />
        {/* <main className='bg-base min-h-100vh'> */}
        <main className='bg-base'>
          {/* <div className='mx-auto w-screen max-w-1150px px-4 pt-100px pb-70px sm:pt-130px'> */}
          <div className='mx-auto max-w-1150px px-4 pt-100px pb-70px w-100vw sm:pt-130px'>
            {children}
          </div>
        </main>
      </div>

      <Footer />
    </>
  )
}
