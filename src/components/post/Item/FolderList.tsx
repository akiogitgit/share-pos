import { FC } from 'react'

import { AiFillFolder as AiFillFolderIcon } from 'react-icons/ai'

import { CreateFolderButton } from 'components/bookmark/CreateFolderButton'
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
      <style jsx>{`
        .scroll-bar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className='bg-white rounded-10px shadow-outline w-160px overflow-hidden'>
        <CreateFolderButton radius='xs' />

        <div className='max-h-250px overflow-y-scroll scroll-bar-none'>
          {folders?.map((folder, index) => (
            <button
              key={index}
              className='flex text-left w-full py-1 px-2 gap-1 items-center hover:bg-primary-light'
              onClick={async () => {
                console.log('click! : ')
                onClickFolderName?.()
                await onAddBookmark?.(folder.id, post)
              }}
            >
              <AiFillFolderIcon className='h-6 mr-1 text-accent-dark min-w-6 w-6' />
              <p>{folder.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
