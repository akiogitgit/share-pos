import Link from 'next/link'
import { FC, useState } from 'react'
import { Avatar } from 'components/shares/base/Avatar'
import { Button } from 'components/shares/base/Button'
import { useGetApi } from 'hooks/useApi'
import { useFollow, useUnFollow } from 'hooks/useFollow'
import { User, UserInfo } from 'types/user'

type Props = {
  user: UserInfo
  onClickUser?: () => void
}

export const UserCard: FC<Props> = ({ user, onClickUser }) => {
  const { follow } = useFollow(user.id)
  const { unFollow } = useUnFollow(user.id)
  // フォロー状態の楽観的な挙動に使う
  const [isFollowing, setFollowing] = useState(user.isFollowing) // ボタン押した瞬間変える
  const { data: currentUser } = useGetApi<User>('/users/me')

  return (
    <div className='flex justify-between items-center'>
      <Link
        href={`/users/${user.id}`}
        onClick={() => {
          onClickUser?.()
        }}
      >
        <div className='flex gap-2 items-center '>
          <Avatar id={Number(user.id)} size='md' />
          <p className='font-bold text-lg'>{user.username}</p>
        </div>
      </Link>
      {currentUser && currentUser.id !== user.id ? (
        isFollowing ? (
          <Button
            color='primary'
            size='sm'
            radius='xl'
            variant='outline'
            onClick={() => {
              setFollowing(false)
              unFollow()
            }}
          >
            フォロー解除
          </Button>
        ) : (
          <Button
            color='primary'
            size='sm'
            radius='xl'
            animate
            onClick={() => {
              setFollowing(true)
              follow()
            }}
          >
            フォローする
          </Button>
        )
      ) : (
        ''
      )}
    </div>
  )
}
