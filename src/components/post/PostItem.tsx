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
      <div className='h-50px mt-1 overflow-hidden'>{post.comment}</div>
      {/* <div className='w-80vw sm:w-full'> */}
      <div className='duration-300 hover:opacity-70'>
        {post.metaInfo && post.metaInfo.image && (
          <Link href={post.url}>
            <a target='_blank'>
              <div className='flex text-blue-600 justify-end'>
                ページを開く🔗
              </div>
              {/* <div className='w-80vw sm:w-full'> */}
              {/* <div className='w-80vw w-max-80vw  sm:w-full'> */}
              <div>
                <div className='flex rounded-10px h-42vw max-h-225px overflow-hidden items-center sm:h-135px'>
                  {/* <div className='flex rounded-10px h-43vw w-80vw overflow-hidden items-center sm:h-135px sm:w-256px'> */}
                  {/* <div className='flex rounded-10px h-43vw overflow-hidden items-center sm:h-135px'> */}

                  <Image
                    src={
                      post.metaInfo.image.substring(8, 18) === 'qiita-user' ||
                      post.metaInfo.image.substring(8, 22) ===
                        'res.cloudinary' ||
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
                </div>
              </div>
            </a>
          </Link>
        )}
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
