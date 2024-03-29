import React, { FC } from 'react'

type Props = {
  children: React.ReactNode
  open: boolean
  onClose: () => void
  className?: string
}

export const DropDownMenu: FC<Props> = ({
  children,
  open,
  onClose,
  className,
}) => {
  return (
    <>
      {open && (
        <>
          <div
            className='h-screen w-screen top-0 left-0 z-1 fixed'
            aria-hidden='true'
            onClick={onClose}
          />

          {/* メニュー */}
          <ul
            className={`z-1 absolute ${className}
                        bg-white cursor-pointer rounded-sm shadow-outline w-160px overflow-hidden`}
          >
            {children}
          </ul>
        </>
      )}
    </>
  )
}
