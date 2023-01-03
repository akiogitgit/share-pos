import { FC } from 'react'
import { Post } from 'types/post'

type Props = {
  post: Post
}

export const PostLinkCaption: FC<Props> = ({ post }) => {
  return (
    <figcaption className='p-2'>
      <p className='text-13px text-gray-500'>
        {post.url.split('//')[1].split('/')[0]}
      </p>
      <div className='h-37px mt-2 text-sm overflow-hidden'>
        {post.metaInfo.title}
      </div>
    </figcaption>
  )
}
