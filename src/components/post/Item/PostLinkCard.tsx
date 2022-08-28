import Image from 'next/image'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { Post } from 'types/post'

type Props = {
  post: Post
}

export const PostLinkCard: FC<Props> = ({ post }) => {
  // ドメインによって、表示するURLを変える
  const displayURL = useMemo(() => {
    return ['qiita-user', 'res.cloudinary', 'data:image/png;base64'].some((v) =>
      post.metaInfo.image?.includes(v),
    )
      ? post.metaInfo.image
      : `https://res.cloudinary.com/demo/image/fetch/${post.metaInfo.image}`
  }, [post.metaInfo.image])

  return (
    <>
      <figure className='border-2 rounded-10px mt-2 duration-300 group hover:bg-gray-100 '>
        <Link href={post.url}>
          <a target='_blank'>
            <div className='flex rounded-t-10px h-42vw max-h-215px overflow-hidden items-center sm:h-133px'>
              {post.metaInfo.image ? (
                <Image
                  src={displayURL || ''}
                  alt=''
                  className='bg-gray-100 rounded-10px transform duration-300 group-hover:scale-110'
                  width={430}
                  height={2000}
                  objectFit='contain'
                />
              ) : (
                <div className='flex h-full bg-gray-300 rounded-t-10px text-mono w-full max-h-225px transform text-30px duration-300 overflow-hidden items-center justify-center group-hover:scale-110'>
                  No image
                </div>
              )}
            </div>
            <figcaption className='p-2'>
              <p className='text-13px text-gray-500'>
                {post.url.split('//')[1].split('/')[0]}
              </p>
              <div className='h-37px mt-2 text-sm overflow-hidden'>
                {post.metaInfo.title}
              </div>
            </figcaption>
          </a>
        </Link>
      </figure>
    </>
  )
}