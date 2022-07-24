import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { Post } from 'types/post'

type Props = {
  post: Post
}

export const PostItem: FC<Props> = ({ post }) => {
  return (
    <div className='bg-white rounded-xl my-2 max-w-460px p-4 w-90vw sm:h-350px sm:w-291px'>
      <div className='font-bold text-20px'>{post.user.username}</div>
      <div className='h-50px mt-1 overflow-hidden whitespace-pre-wrap'>
        {post.comment}
      </div>

      <div className='duration-300 hover:opacity-70'>
        <Link href={post.url}>
          <a target='_blank'>
            <div className='flex text-blue-600 justify-end'>ページを開く🔗</div>
            <div className='flex rounded-10px h-42vw max-h-225px overflow-hidden items-center sm:h-135px'>
              {post.metaInfo && typeof post.metaInfo.image === 'string' ? (
                <Image
                  src={
                    post.metaInfo.image.substring(8, 18) === 'qiita-user' ||
                    post.metaInfo.image.substring(8, 22) === 'res.cloudinary' ||
                    post.metaInfo.image.substring(0, 21) ===
                      'data:image/png;base64'
                      ? post.metaInfo.image
                      : `https://res.cloudinary.com/demo/image/fetch/${post.metaInfo.image}`
                  }
                  alt=''
                  className='rounded-10px transform duration-300 hover:scale-110'
                  width={430}
                  height={2260}
                  objectFit='contain'
                />
              ) : (
                <div className='flex h-full bg-gray-300 rounded-10px text-mono w-full max-h-225px transform text-30px duration-300 overflow-hidden items-center justify-center hover:scale-110'>
                  No image
                </div>
              )}
            </div>
          </a>
        </Link>
      </div>

      <div className='flex'>
        {[...Array(post.evaluation)].map((v, i) => (
          <div key={i}>☆</div>
        ))}
      </div>
      <div className='flex justify-end'>{post.createdAt.substring(0, 10)}</div>
    </div>
  )
}
