import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'
import { AiFillFolder as AiFillFolderIcon } from 'react-icons/ai'

import { useBoolean } from 'hooks/useBoolean'
import { useDeleteFolder, useUpdateFolder } from 'hooks/useFolder'
import { Folder } from 'types/bookmark'

import { accent, primary } from '../../utils/theme'
import { BookmarkFolderEditModal } from './BookmarkFolderEditModal'

type Props = {
  folders: Folder[]
}

export const BookmarkFolderList: FC<Props> = ({ folders }) => {
  const isModalOpened = useBoolean(false)
  const searchParams = useSearchParams()
  const routerFolderIndex = useMemo(
    () => Number(searchParams.get('id')) || 0,
    [searchParams],
  )

  const { updateFolder } = useUpdateFolder()
  const { deleteFolder } = useDeleteFolder()

  const onClickFolder = useCallback(
    (folderIndex: number) => {
      // 2連続で同じフォルダを押したときに、編集モードにする
      if (routerFolderIndex === folderIndex) {
        isModalOpened.setTrue()
      }
    },
    [isModalOpened, routerFolderIndex],
  )

  return (
    <div>
      {/* ブックマーク名一覧 */}
      <ul
        className='bg-primary-light flex h-50px gap-2 overflow-x-scroll scroll-bar
                  sm:(flex-col gap-1 h-auto min-w-190px max-w-190px max-h-[calc(100vh-250px)] overflow-x-hidden overflow-y-scroll) '
      >
        {/* スマホ横スクロールで左右に余分を空けている */}
        <div className='ml-2 sm:hidden' />

        {folders.map((folder, index) => (
          <li
            key={folder.id}
            className={`whitespace-nowrap h-40px ${
              routerFolderIndex === index
                ? 'border-b-3 border-primary-dark text-primary-dark font-bold'
                : 'text-gray-500 border-b-2'
            }`}
          >
            <Link
              href={{ pathname: 'bookmark', query: { id: index } }}
              className='flex mt-2'
              onClick={() => onClickFolder(index)}
              aria-label={`${folder.name}フォルダ`}
            >
              <AiFillFolderIcon className='h-6 mr-1 text-accent-dark min-w-6 w-6' />
              {folder.name}
            </Link>
          </li>
        ))}

        {/* スマホ横スクロールで左右に余分を空けている */}
        <div className='invisible sm:hidden' alia-hidden='true'>
          a
        </div>
      </ul>
      {/* フォルダ編集・削除モーダル */}
      {/* Stateを毎回リセットする */}
      {isModalOpened.v && (
        <BookmarkFolderEditModal
          onClose={isModalOpened.setFalse}
          folder={folders[routerFolderIndex]}
          onUpdateFolder={async (folderName: string) =>
            await updateFolder(folders[routerFolderIndex].id, folderName)
          }
          onDeleteFolder={async () => {
            await deleteFolder(folders[routerFolderIndex].id)
          }}
        />
      )}
      <style jsx>{`
        .scroll-bar::-webkit-scrollbar {
          width: 0;
          height: 0;
        }
        .scroll-bar:hover::-webkit-scrollbar {
          width: 10px;
          height: 10px;
        }
        .scroll-bar::-webkit-scrollbar-track {
          border-radius: 100px;
          background-color: ${accent.dark};
          height: 100px;
        }
        .scroll-bar::-webkit-scrollbar-thumb {
          border-radius: 100px;
          background-color: ${primary.dark};
        }
      `}</style>
    </div>
  )
}
