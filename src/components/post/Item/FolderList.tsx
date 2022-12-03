import { FC } from 'react'

import { BsFolder as BsFolderIcon } from 'react-icons/bs'

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

      <div className='bg-base border border-primary rounded-10px w-160px overflow-hidden'>
        <div className='max-h-250px overflow-y-scroll scroll-bar-none sm:max-h-450px'>
          <CreateFolderButton radius='xs' />

          {folders?.map((folder, index) => (
            <button
              key={index}
              className='flex text-left w-full py-1 px-4 gap-1 items-center hover:bg-primary-light'
              onClick={async () => {
                console.log('click! : ')
                onClickFolderName?.()
                await onAddBookmark?.(folder.id, post)
              }}
            >
              <BsFolderIcon />
              <p>{folder.name}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
