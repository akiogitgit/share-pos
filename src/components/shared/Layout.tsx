import { FC, ReactNode } from 'react'
import { Header } from './Header'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className='bg-red-100 min-h-100vh pt-25 overflow-hidden '>
        <div className='mx-auto max-w-1000px px-2 break-words'>{children}</div>
      </main>
    </>
  )
}
