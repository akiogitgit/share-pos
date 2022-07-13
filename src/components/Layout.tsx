import { FC, ReactNode } from 'react'
import { Header } from './Header'

type Props = {
  children: ReactNode
  title: string
}

export const Layout: FC<Props> = ({ children, title }) => {
  return (
    <div className='min-h-full'>
      <Header title={title} />
      <div className='mx-4 mt-25 overflow-hidden'>
        <div className='mx-auto bg-red-100 max-w-600px p-4 break-words'>
          {children}
        </div>
      </div>
    </div>
  )
}
