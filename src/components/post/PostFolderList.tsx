import { FC } from 'react'
import { AiFillFolder as AiFillFolderIcon } from 'react-icons/ai'

import { CreateFolderButton } from 'components/shares/CreateFolderButton'
import { useGetApi } from 'hooks/useApi'
import { Folder } from 'types/bookmark'
import { Post } from 'types/post'

type Props = {
  post: Post
  onClickFolderName?: () => void
  onAddBookmark?: (folderId: string, post: Post) => void
}

export const FolderList: FC<Props> = ({
  post,
  onClickFolderName,
  onAddBookmark,
}) => {
  const { data: folders } = useGetApi<Folder[]>('/folders')

  return (
    <div>
      <style jsx>
        {`
          .scroll-bar-none::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>

      <div className='bg-white rounded-md shadow-outline w-160px overflow-hidden'>
        <CreateFolderButton radius='xs' />

        <ul className='max-h-250px overflow-y-scroll scroll-bar-none'>
          {folders?.map((folder, index) => (
            <li key={index}>
              <button
                className='flex text-left w-full py-1 px-2 gap-1 items-center hover:bg-primary-light'
                onClick={async () => {
                  onClickFolderName?.()
                  await onAddBookmark?.(folder.id, post)
                }}
                aria-label={`${folder.name}フォルダ`}
              >
                <AiFillFolderIcon className='h-6 mr-1 text-accent-dark min-w-6 w-6' />
                <p>{folder.name}</p>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
