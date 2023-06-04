import Link from 'next/link'
import { FC } from 'react'

import { Avatar } from 'components/shares/base/Avatar'
import { Button } from 'components/shares/base/Button'
import { useGetApi } from 'hooks/useApi'
import { useBoolean } from 'hooks/useBoolean'
import { useFollow, useUnFollow } from 'hooks/useFollow'
import { User, UserInfo } from 'types/user'

type Props = {
  user: UserInfo
  onClickUser?: () => void
}

export const UserCard: FC<Props> = ({ user, onClickUser }) => {
  const { follow } = useFollow(user.id)
  const { unFollow } = useUnFollow(user.id)

  // フォロー状態の楽観的更新に使う
  const isFollowing = useBoolean(user.isFollowing)
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
          <p className='font-bold text-md text-overflow max-w-170px w-[calc(100vw-185px)]'>
            {user.username}
          </p>
        </div>
      </Link>
      {currentUser && currentUser.id !== user.id ? (
        isFollowing.v ? (
          <Button
            color='primary'
            size='xs'
            radius='xl'
            variant='outline'
            onClick={async () => {
              isFollowing.setFalse()
              await unFollow()
            }}
            className='whitespace-nowrap'
          >
            フォロー中
          </Button>
        ) : (
          <Button
            color='primary'
            size='xs'
            radius='xl'
            animate
            onClick={async () => {
              isFollowing.setTrue()
              await follow()
            }}
            className='whitespace-nowrap'
          >
            フォロー
          </Button>
        )
      ) : (
        ''
      )}

      {/* 長い文字を...にする */}
      <style jsx>{`
        .text-overflow {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      `}</style>
    </div>
  )
}
