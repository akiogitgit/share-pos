import { FC, useState } from 'react'
import { PostItem } from 'components/post/PostItem'
import { Post } from 'types/post'

type Props = {
  isMyPage: boolean
  posts: Post[]
}

const tabs = ['公開', '非公開'] as const

export const UserPosts: FC<Props> = ({ isMyPage, posts }) => {
  const [selected, setSelected] = useState<'公開' | '非公開'>('公開')

  return (
    <section className='mt-10'>
      <div className='ml-4'>
        {isMyPage && (
          <div className='border-b flex border-gray-300 mt-5 w-full gap-3'>
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setSelected(tab)}
                className={`text-xl pb-1 w-50vw sm:w-100px ${
                  selected === tab &&
                  'font-bold border-b-3 border-primary-dark text-primary-dark'
                }`}
              >
                {tab}
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
              (selected === '公開') === post.published && (
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
