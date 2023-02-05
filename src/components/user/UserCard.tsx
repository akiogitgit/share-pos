import Link from 'next/link'
import { FC, useState } from 'react'
import { Avatar } from 'components/shares/base/Avatar'
import { Button } from 'components/shares/base/Button'
import { useFollow } from 'hooks/useFollow'

type Props = {
  id: number
  username: string
  isFollowing: boolean
  currentUserId: number | undefined
  onClickUser?: () => void
}

export const UserCard: FC<Props> = ({
  id,
  username,
  isFollowing: isFollowingProps,
  currentUserId,
  onClickUser,
}) => {
  const { follow, unFollow } = useFollow(id)
  const [isFollowing, setIsFollowed] = useState(isFollowingProps) // ボタン押した瞬間変える

  return (
    <div className='flex justify-between items-center'>
      <Link
        href={`/users/${id}`}
        onClick={() => {
          onClickUser?.()
        }}
      >
        <div className='flex gap-2 items-center '>
          <Avatar id={Number(id)} size='md' />
          <p className='font-bold text-lg'>{username}</p>
        </div>
      </Link>
      {currentUserId && currentUserId !== id ? (
        isFollowing ? (
          <Button
            color='primary'
            size='sm'
            radius='xl'
            variant='outline'
            onClick={() => {
              setIsFollowed(false)
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
              setIsFollowed(true)
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
