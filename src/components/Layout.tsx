import { FC, ReactNode } from 'react'
import { Header } from './Header'

type Props = {
  children: ReactNode
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className='min-h-full'>
      <Header />
      <div className='mx-4 mt-25 overflow-hidden'>
        <div className='mx-auto bg-red-100 max-w-600px p-4 break-words'>
          {children}
        </div>
      </div>
    </div>
  )
}
