import { FC } from 'react'
import { RxCross2 as RxCross2Icon } from 'react-icons/rx'

type Props = {
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

export const Alert: FC<Props> = ({ children, onClose, className = '' }) => {
  return (
    <div className={className}>
      <div className='bg-danger-light flex text-danger-dark w-full py-3 px-3 justify-between items-center'>
        <div>{children}</div>
        <RxCross2Icon
          className='cursor-pointer text-danger-dark ml-2 min-h-5 min-w-5'
          onClick={onClose}
        />
      </div>
    </div>
  )
}
