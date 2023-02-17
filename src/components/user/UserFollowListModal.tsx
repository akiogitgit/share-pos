import { FC } from 'react'
import { UserCard } from './UserCard'
import { Modal } from 'components/shares/base/Modal'
import { useGetApi } from 'hooks/useApi'
import { UserInfo } from 'types/user'

const modalTabs = ['フォロー一覧', 'フォロワー一覧'] as const

type Props = {
  userId: number | undefined
  open: boolean
  onClose: () => void
  selected: 'フォロー一覧' | 'フォロワー一覧'
  setSelected: (selected: 'フォロー一覧' | 'フォロワー一覧') => void
}

export const UserFollowListModal: FC<Props> = ({
  userId,
  open,
  onClose,
  selected,
  setSelected,
}) => {
  const { data: followers, mutate: mutateFollowers } = useGetApi<UserInfo[]>(
    `/users/${userId}/followers`,
    {
      options: { revalidateIfStale: true },
    },
  )
  const { data: followings, mutate: mutateFollowings } = useGetApi<UserInfo[]>(
    `/users/${userId}/followings`,
    {
      options: { revalidateIfStale: true },
    },
  )

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={
        <div className='border-b flex border-gray-300 w-full gap-3'>
          {modalTabs.map(tab => (
            <div
              key={tab}
              className={`cursor-pointer text-lg text-center pb-1 w-50vw ${
                tab === selected &&
                'border-primary-dark border-b-3 text-primary-dark'
              }`}
              onClick={() => {
                setSelected(tab)
                // タブを移動する毎に再検証
                if (selected === tab) return
                if (tab === 'フォロー一覧') mutateFollowings(followings)
                if (tab === 'フォロワー一覧') mutateFollowers(followers)
              }}
            >
              {tab}
            </div>
          ))}
        </div>
      }
    >
      <div className='bg-white rounded-lg flex flex-col p-8 gap-8'>
        {selected === 'フォロワー一覧'
          ? followers?.length
            ? followers.map(user => (
                <UserCard
                  key={`${user.id} ${user.isFollowing}`}
                  user={user}
                  onClickUser={onClose}
                />
              ))
            : 'フォロワーはいません'
          : followings?.length
          ? followings.map(user => (
              <UserCard
                key={`${user.id} ${user.isFollowing}`}
                user={user}
                onClickUser={onClose}
              />
            ))
          : 'フォローしているユーザーはいません'}
      </div>
    </Modal>
  )
}
