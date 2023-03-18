import Image from 'next/legacy/image'
import { FC, useMemo } from 'react'

import { Post } from 'types/post'

type Props = {
  post: Post
}

export const PostLinkCard: FC<Props> = ({ post }) => {
  // ドメインによって、表示するURLを変える
  const displayURL = useMemo(() => {
    if (!post.metaInfo?.image) return ''
    return [
      'qiita-user',
      'res.cloudinary',
      'data:image/png;base64',
      'gossamer-tarsier-64a.notion.site',
    ].some(v => post.metaInfo.image?.includes(v))
      ? post.metaInfo.image
      : `https://res.cloudinary.com/demo/image/fetch/${post.metaInfo.image}`
  }, [post.metaInfo?.image])

  return (
    <>
      <figure className='rounded-md border-2 duration-300 overflow-hidden group hover:bg-gray-100 '>
        <a href={post.url} target='_blank' rel='noreferrer'>
          <div className='flex h-42vw max-h-215px overflow-hidden items-center sm:h-133px'>
            {displayURL ? (
              <Image
                src={displayURL}
                alt=''
                className='bg-gray-100 transform duration-300 group-hover:scale-110'
                width={430}
                height={2000}
                objectFit='contain'
              />
            ) : (
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
        </a>
      </figure>
    </>
  )
}
