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
          <div
            className={`z-1 absolute ${className}
                        bg-white cursor-pointer rounded-3px shadow-outline w-160px overflow-hidden`}
          >
            {children}
            {/* {React.Children.map(children, (value, index) => (
              <div
                key={index}
                // className='cursor-pointer text-left w-full py-2 px-4 hover:bg-primary-light'
                className='text-left w-full'
              >
                {value}
              </div>
            ))} */}
          </div>
        </>
      )}
    </>
  )
}
