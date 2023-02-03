import { FC, useState } from 'react'
import { PostItem } from 'components/post/PostItem'
import { Post } from 'types/post'

type Props = {
  isMyPage: boolean
  posts: Post[]
}

export const UserPosts: FC<Props> = ({ isMyPage, posts }) => {
  const [selectedPublished, setSelectedPublished] = useState(true)

  return (
    <section className='mt-10'>
      <div className='ml-4'>
        {isMyPage && (
          <div className='border-b flex border-gray-300 mt-5 w-full gap-3'>
            {[
              { label: '公開', published: true },
              { label: '非公開', published: false },
            ].map(tab => (
              <button
                key={tab.label}
                onClick={() => setSelectedPublished(tab.published)}
                className={`text-xl pb-1 w-50vw sm:w-100px ${
                  selectedPublished === tab.published &&
                  'font-bold border-b-3 border-primary-dark text-primary-dark'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {posts.length ? (
        <div className='flex flex-wrap mt-10 gap-4 justify-center items-start sm:justify-start'>
          {/* <div className='mt-4 grid gap-4 grid-cols-[repeat(auto-fill,minmax(291px,auto))] justify-center items-start'> */}
          {posts.map(
            post =>
              selectedPublished === post.published && (
                <PostItem post={post} key={post.id} />
              ),
          )}
        </div>
      ) : (
        ''
      )}
    </section>
  )
}
