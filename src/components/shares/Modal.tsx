import { Dialog } from '@headlessui/react'
import { FC, ReactNode } from 'react'

type Props = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  children?: ReactNode
}

export const Modal: FC<Props> = ({ open, onClose, title, children }) => {
  return (
    <>
      {open && (
        <>
          <Dialog open={open} onClose={onClose}>
            <div
              className='h-screen bg-black/30 w-screen top-0 left-0 z-2 fixed'
              aria-hidden='true'
            />

            <Dialog.Panel className='transform top-[50%] left-[50%] z-2 translate-x-[-50%] translate-y-[-50%] fixed'>
              <div className='bg-white bg-opacity-90 rounded-10px shadow-2xl w-300px '>
                <Dialog.Title className='font-bold text-center text-xl px-2 pt-4'>
                  {title}
                </Dialog.Title>
                <Dialog.Description className='mt-2'>
                  {children}
                </Dialog.Description>
              </div>
            </Dialog.Panel>
          </Dialog>
        </>
      )}
    </>
  )
}
