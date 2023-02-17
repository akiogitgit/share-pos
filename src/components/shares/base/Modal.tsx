import { Dialog } from '@headlessui/react'
import { FC, ReactNode, useMemo } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children?: ReactNode
  size?: 'sm' | 'md'
}

const baseClass =
  'bg-white rounded-md bg-opacity-97 transform top-[50%] left-[50%] shadow-black/50 shadow-2xl z-2 translate-y-[-50%] translate-x-[-50%] fixed'

export const Modal: FC<Props> = ({
  open,
  onClose,
  title,
  children,
  size = 'sm',
}) => {
  const sizeClass = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'w-full sm:w-80vw max-w-300px'
      case 'md':
        return 'w-full sm:w-80vw max-w-360px'
    }
  }, [size])

  return (
    <>
      {open && (
        <>
          <Dialog open={open} onClose={onClose}>
            <div
              className='h-screen bg-black/30 w-screen top-0 left-0 z-2 fixed'
              aria-hidden='true'
            />

            <Dialog.Panel className={`${baseClass} ${sizeClass}`}>
              <Dialog.Title className='font-bold m-0 text-center text-lg px-2 pt-4'>
                {title}
              </Dialog.Title>

              <div className='max-h-360px overflow-y-auto'>{children}</div>
            </Dialog.Panel>
          </Dialog>
        </>
      )}
    </>
  )
}
