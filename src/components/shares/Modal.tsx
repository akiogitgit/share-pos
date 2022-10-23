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
      <div
        className={`bg-black/30 h-screen w-screen top-0 left-0 z-100 fixed`}
      ></div>
      <Dialog
        open={open}
        onClose={onClose}
        className='m-auto transform top-[50%] left-[50%] z-100 translate-x-[-50%] translate-y-[-50%] fixed'
      >
        <Dialog.Panel className='bg-white bg-opacity-90 rounded-10px shadow-2xl w-300px'>
          <Dialog.Title className='text-center px-2 pt-4'>{title}</Dialog.Title>
          <Dialog.Description>{children}</Dialog.Description>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
