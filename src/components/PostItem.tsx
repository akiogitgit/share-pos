import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Post } from 'types/post'

type Props = {
  post: Post
}

export const PostItem: FC<Props> = ({ post }) => {
  console.log(post)
  return (
    <ul className='bg-white rounded-xl my-2 p-4'>
      <li>{post.id}</li>
      <li>{post.comment}</li>
      <Link href={post.url}>
        <a target='_blank' className='text-blue-500'>
          {post.url}
        </a>
      </Link>
      <img src={post.metaInfo.image} alt='' />
      <Image src={post.metaInfo.image} alt='' width={100} height={100} />
      <li>{post.evaluation}</li>
      <li>{post.createdAt}</li>
    </ul>
  )
}
