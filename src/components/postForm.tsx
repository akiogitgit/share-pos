import { FC, useState } from 'react'
import { Posts } from '../types/post'

type Props = {
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    // id: number, // update で使う
    comment: string,
    url: string,
    evaluation: number,
    published: boolean,
  ) => void
  post?: Posts // ?で、必須でなくなる!,  createだと要らないから
}

// default props
const posts: Posts = {
  id: 0,
  comment: '',
  url: '',
  published: false,
  evaluation: 1,
  user_id: 0,
  created_at: '',
  updated_at: '',
}

// create の時は、post無いから default であげる
const PostForm: FC<Props> = ({ onSubmit, post = posts }) => {
  const [comment, setComment] = useState(post.comment)
  const [url, setUrl] = useState(post.url)
  const [evaluation, setEvaluation] = useState(post.evaluation)
  const [published, setPublished] = useState(post.published)

  return (
    <form
      className='bg-white p-4'
      onSubmit={(e) => onSubmit(e, comment, url, evaluation, published)}
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
        <label>重要度　</label>
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

export default PostForm
