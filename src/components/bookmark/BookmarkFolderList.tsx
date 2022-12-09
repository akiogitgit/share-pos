import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { FC, useCallback, useMemo, useState } from 'react'

import { AiFillFolder as AiFillFolderIcon } from 'react-icons/ai'
import { primary, accent } from '../../utils/theme'
import { FolderEditModal } from './FolderEditModal'
import { useUpdateFolder, useDeleteFolder } from 'hooks/useFolder'
import { Folder } from 'types/bookmark'

type Props = {
  folders: Folder[]
}

export const BookmarkFolderList: FC<Props> = ({ folders }) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const router = useRouter()
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
        setIsOpenModal(true)
      }
    },
    [routerFolderIndex],
  )

  return (
    <div>
      {/* ブックマーク名一覧 */}
      <div className='h-50px overflow-x-scroll scroll-bar sm:(h-auto min-w-190px max-w-190px max-h-[calc(100vh-250px)] overflow-x-hidden overflow-y-scroll) '>
        <div className='flex gap-2 sm:(flex-col-reverse gap-1) '>
          {folders.map((folder, index) => (
            <div
              key={folder.id}
              className={`whitespace-nowrap h-40px ${
                routerFolderIndex == index
                  ? 'border-b-3 border-primary-dark text-primary-dark font-bold'
                  : 'text-gray-500 border-b-2'
              }`}
            >
              <Link href={{ pathname: 'bookmark', query: { id: index } }}>
                <div
                  className={`flex items-center mt-2 w-full text-left  ${
                    searchParams.get('id') == folder.id && 'font-bold'
                  }`}
                  onClick={() => onClickFolder(index)}
                >
                  <AiFillFolderIcon className='h-6 mr-1 text-accent-dark min-w-6 w-6' />
                  {folder.name}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* フォルダ編集・削除モーダル */}
      {isOpenModal && (
        <FolderEditModal
          onClose={() => setIsOpenModal(false)}
          folder={folders[routerFolderIndex]}
          onUpdateFolder={async (folderName: string) =>
            await updateFolder(folders[routerFolderIndex].id, folderName)
          }
          onDeleteFolder={async () => {
            await deleteFolder(folders[routerFolderIndex].id)
            router.push('bookmark')
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
