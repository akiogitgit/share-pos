import Image from 'next/legacy/image'
// import Image from 'next/image'
import { FC, useMemo } from 'react'
import { Post } from 'types/post'

type Props = {
  post: Post
}

export const PostLinkCard: FC<Props> = ({ post }) => {
  // ドメインによって、表示するURLを変える
  const displayURL = useMemo(() => {
    if (!post.metaInfo.image) return ''
    return ['qiita-user', 'res.cloudinary', 'data:image/png;base64'].some(v =>
      post.metaInfo.image?.includes(v),
    )
      ? post.metaInfo.image
      : `https://res.cloudinary.com/demo/image/fetch/${post.metaInfo.image}`
  }, [post.metaInfo.image])

  return (
    <>
      <figure className='border-2 rounded-10px mt-2 duration-300 overflow-hidden group hover:bg-gray-100 '>
        <a href={post.url} target='_blank' rel='noreferrer'>
          {/* <div className='flex h-40vw max-h-220px overflow-hidden items-center sm:h-19.5vw md:h-[20vw] lg:(h-13vw max-h-135px) '> */}
          {/* <div className={`${post.bookmark?.id? 'sm:h-[20vw] md:(h-26vw) lg:(max-h-155px)': 'sm:h-19.6vw md:h-21vw lg:h-136px'} w-full relative h-42vw max-h-225px`}> */}
          <div
            className={`flex h-40vw max-h-220px overflow-hidden items-center ${
              post.bookmark?.id
                ? 'sm:h-26vw md:(h-26vw) lg:(max-h-155px)'
                : 'sm:h-19.5vw md:h-20vw lg:(h-13vw max-h-135px)'
            }`}
          >
            {displayURL ? (
              <Image
                src={displayURL}
                alt=''
                className='bg-gray-100 rounded-10px transform duration-300 group-hover:scale-110'
                width={430}
                height={20000}
                // fill
                objectFit='contain'
              />
            ) : (
              <div
                className='flex h-full bg-gray-300 text-mono
                          w-full max-h-225px transform text-30px duration-300 overflow-hidden
                          items-center justify-center group-hover:scale-110
                          '
              >
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
      </figure>
    </>
  )
}
