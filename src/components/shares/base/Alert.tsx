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
        <p role='alert'>{children}</p>
        <button
          className='flex ml-2'
          aria-label='エラーメッセージを消す'
          onClick={onClose}
        >
          <RxCross2Icon className='text-danger-dark min-h-5 min-w-5' />
        </button>
      </div>
    </div>
  )
}
