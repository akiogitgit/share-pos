import { FC } from 'react'

import { Post } from 'types/post'

type Props = {
  post: Post
}

export const PostLinkCard: FC<Props> = ({ post }) => {
  return (
    <figure>
      <a
        href={post.url}
        target='_blank'
        rel='noreferrer'
        aria-label={`${post.metaInfo?.title}へ移動する`}
      >
        <div className='rounded-md border-2 duration-300 overflow-hidden group hover:bg-gray-100 '>
          <div className='flex h-42vw max-h-215px overflow-hidden items-center sm:h-133px'>
            {post.metaInfo.image
              ? (
                // eslint-disable-next-line
                <img
                  src={post.metaInfo.image}
                  alt='記事のサムネイル'
                  title={`${post.metaInfo?.title}へ移動します`}
                  className='bg-gray-100 transform duration-300 group-hover:scale-110'
                />
              )
              : (
                <div className='flex h-full bg-gray-300 text-mono w-full max-h-225px transform text-2xl duration-300 overflow-hidden items-center justify-center group-hover:scale-110'>
                  No image
                </div>
              )}
          </div>

          <figcaption className='text-sm p-2'>
            <p className='leading-sm text-gray-500'>
              {post.url.split('//')[1].split('/')[0]}
            </p>
            <div className='h-38px mt-2 overflow-hidden'>
              {post.metaInfo?.title}
            </div>
          </figcaption>
        </div>
      </a>
    </figure>
  )
}
