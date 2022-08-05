import { FC, useState } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { RiArticleLine } from 'react-icons/ri'
import { PostCreateParams } from 'types/post'

type Props = {
  onSubmit: (params: PostCreateParams) => void
}

export const PostForm: FC<Props> = ({ onSubmit }) => {
  const [comment, setComment] = useState('')
  const [url, setUrl] = useState('')
  const [evaluation, setEvaluation] = useState(1)
  const [published, setPublished] = useState(false)

  return (
    <div className='flex flex-col items-center justify-center'>
      <style jsx>{`
        .scroll-bar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <form
        onSubmit={(e) => {
          onSubmit({ comment, url, evaluation, published })
          e.preventDefault()
        }}
      >
        <div className='relative'>
          <label htmlFor='username' className='font-bold text-sm block '>
            コメント
          </label>

          <div className='min-h-[50px] leading-1.4rem relative'>
            <div className='py-3 px-2 invisible whitespace-pre-wrap break-words'>
              {comment}
            </div>
            <textarea
              className='border h-full outline-none w-full p-2 top-0 left-0 ring-blue-500 duration-300 scroll-bar-none absolute focus:rounded-10px focus:ring-1'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <BiCommentDetail className='top-33px left-165px absolute' />
        </div>
        <div className='mt-2 relative'>
          <label htmlFor='username' className='font-bold text-sm block '>
            記事のURL
          </label>
          <input
            type='text'
            value={url}
            placeholder='https://example.com'
            required
            onChange={(v) => setUrl(v.target.value)}
            className='border outline-none p-2 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />
          <RiArticleLine className='top-33px left-165px absolute' />
        </div>
        <div className='h-80px mt-2 relative'>
          <label htmlFor='username' className='font-bold text-sm block '>
            オススメ度
          </label>
          <input
            type='range'
            id='volume'
            name='volume'
            min='1'
            max='5'
            value={evaluation}
            className='bg-black h-0.5 mt-10 appearance-none'
            onChange={(e) => setEvaluation(Number(e.target.value))}
          />
          <div className='transform translate-y-[-40px] translate-x-65px block'>
            {evaluation}
          </div>
        </div>

        <div className='mt-2 relative'>
          <label htmlFor='username' className='font-bold text-sm block '>
            公開設定
          </label>
          <div>
            <div
              className='rounded-full cursor-pointer bg-blue-600 h-28px mt-2 text-white w-90px relative inline-block'
              onClick={() => setPublished(!published)}
            >
              <div className=' font-bold text-white text-md transform top-[2px] left-[5px] absolute'>
                公開
                <span className='transform scale-x-80 inline-block'>
                  非公開
                </span>
              </div>
              <div
                className={`bg-white h-20px rounded-full top-4px ${
                  published ? 'left-3px w-38px' : 'left-40px w-46px'
                } duration-150 absolute`}
              ></div>
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='border bg-blue-500 border-blue-500 mt-4 text-white w-full p-5 py-1 px-3 scale-50 duration-300 hover:(bg-white text-blue-500) '
        >
          作成
        </button>
      </form>
    </div>
  )
}
