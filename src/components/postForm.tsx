import { FC, useState } from 'react'
import { PostCreateParams } from '../types/post'

type Props = {
  onSubmit: (params: PostCreateParams) => void
}

export const PostForm: FC<Props> = ({ onSubmit }) => {
  const [comment, setComment] = useState('')
  const [url, setUrl] = useState('')
  const [evaluation, setEvaluation] = useState(1)
  const [published, setPublished] = useState(false)

  return (
    <form
      onSubmit={(e) => {
        onSubmit({ comment, url, evaluation, published })
        e.preventDefault()
      }}
    >
      <div>
        <input
          type='text'
          value={comment}
          placeholder='comment'
          required
          onChange={(v) => setComment(v.target.value)}
          className='border-black outline-none border-b-2 p-2'
        />
      </div>
      <div>
        <input
          type='text'
          value={url}
          placeholder='url'
          required
          onChange={(v) => setUrl(v.target.value)}
          className='border-black outline-none border-b-2 p-2'
        />
      </div>
      <div className='mt-10 sm:w-[220px]'>
        <label>オススメ度</label>
        <input
          type='range'
          id='volume'
          name='volume'
          min='1'
          max='5'
          value={evaluation}
          className='bg-black h-0.5 appearance-none'
          onChange={(e) => setEvaluation(Number(e.target.value))}
        />
        <div className='rotate-[200deg] translate-y-[-100px] block'>
          {evaluation}
        </div>
      </div>

      <div className='sm:w-[220px]'>
        <div>
          <label htmlFor='true' className='cursor-pointer'>
            <input
              type='radio'
              id='true'
              name='published'
              className='mt-4'
              checked={published}
              onChange={() => setPublished(true)}
            />
            公開
          </label>
          <label htmlFor='false' className='cursor-pointer'>
            <input
              type='radio'
              id='false'
              name='publish'
              checked={!published}
              onChange={() => setPublished(false)}
            />
            非公開
          </label>
        </div>
      </div>
      <button
        type='submit'
        className='font-serif bg-blue-500 border-2 border-blue-500 mt-3 text-white p-5 py-1 px-3 scale-50 duration-300 hover:(bg-white text-blue-500) '
      >
        作成
      </button>
    </form>
  )
}
