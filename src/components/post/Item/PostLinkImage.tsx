import Image from 'next/legacy/image'
import { FC, useMemo } from 'react'
import { Post } from 'types/post'

type Props = {
  post: Post
}

export const PostLinkImage: FC<Props> = ({ post }) => {
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
      {displayURL ? (
        <Image
          src={displayURL}
          alt=''
          className='bg-gray-100 rounded-10px transform duration-300 group-hover:scale-110'
          width={430}
          height={2000}
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
    </>
  )
}
