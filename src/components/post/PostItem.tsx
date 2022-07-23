import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Post } from 'types/post'

type Props = {
  post: Post
}

export const PostItem: FC<Props> = ({ post }) => {
  return (
    <ul className='bg-white rounded-xl my-2 p-4'>
      <li>{post.id}</li>
      <li>{post.comment}</li>
      <Link href={post.url}>
        <a target='_blank' className='text-blue-500'>
          {post.url}
        </a>
      </Link>

      <br></br>
      {post.metaInfo.image.substring(8, 18) === 'qiita-user' ||
      post.metaInfo.image.substring(8, 22) === 'res.cloudinary' ? (
        // {/* next.config.js で増やしていく */}
        <Image
          src={post.metaInfo.image}
          alt=''
          width={300}
          height={100}
          objectFit='contain'
        />
      ) : (
        // {/* Qiita, Zenn以外はこれで表示出来る */}
        <Image
          src={`https://res.cloudinary.com/demo/image/fetch/${post.metaInfo.image}`}
          alt=''
          width={300}
          height={100}
          objectFit='contain'
        />
      )}
      <div className='flex'>
        {[...Array(post.evaluation)].map((v, i) => (
          <div key={i}>☆</div>
        ))}
      </div>
      <li>{post.createdAt}</li>
      <li>{post.user.username}</li>
    </ul>
  )
}
