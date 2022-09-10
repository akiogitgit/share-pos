import { FC, useCallback, useState } from 'react'
import { BiCommentDetail } from 'react-icons/bi'
import { RiArticleLine } from 'react-icons/ri'
import { PostRequestParams } from 'types/post'

// Props多すぎ？
type Props = {
  onSubmit: (params: PostRequestParams) => void
  className?: string // widthを fullにするかどうか
  formParamsProps?: PostRequestParams
  submitButtonText?: string
}

export const PostForm: FC<Props> = ({
  onSubmit,
  // className = 'max-w-300px w-80vw',
  // className = '',
  formParamsProps = {
    comment: '',
    url: '',
    evaluation: 1,
    published: false,
  },
  submitButtonText = '作成',
}) => {
  const [formParams, setFormParams] =
    useState<PostRequestParams>(formParamsProps)

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormParams((state) => {
        return {
          ...state,
          [e.target.name]: e.target.value,
        }
      })
    },
    [],
  )

  return (
    <div className='flex flex-col items-center justify-center'>
      <style jsx>{`
        .scroll-bar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <form
        onSubmit={(e) => {
          onSubmit(formParams)
          e.preventDefault()
        }}
        className='w-full max-w-430px relative'
      >
        <div>
          <label htmlFor='username' className='font-bold text-sm block '>
            コメント
          </label>

          <div className='min-h-[50px] leading-1.4rem relative'>
            <div className='py-3 px-2 invisible whitespace-pre-wrap break-words'>
              {formParams.comment}
            </div>
            <textarea
              name='comment'
              className='border h-full outline-none w-full p-2 pr-9 top-0 left-0 ring-blue-500 duration-300 scroll-bar-none absolute focus:rounded-10px focus:ring-1'
              value={formParams.comment}
              placeholder='この記事オススメ！'
              onChange={onChange}
            />
          </div>
          <div className='flex justify-end'>
            <BiCommentDetail className='top-33px right-10px absolute' />
          </div>
        </div>
        <div className='mt-2 relative'>
          <label htmlFor='username' className='font-bold text-sm block '>
            記事のURL
          </label>
          <input
            type='text'
            value={formParams.url}
            placeholder='https://example.com'
            required
            name='url'
            onChange={onChange}
            className='border outline-none w-full p-2 pr-9 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
          />

          <div className='flex justify-end'>
            <RiArticleLine className='top-33px right-10px absolute' />
          </div>
        </div>
        <div className='h-80px mt-2 relative'>
          <label htmlFor='username' className='font-bold text-sm block '>
            オススメ度
          </label>
          <input
            type='range'
            id='evaluation'
            min='1'
            max='5'
            value={formParams.evaluation}
            className='bg-black h-0.5 mt-10 w-full appearance-none'
            name='evaluation'
            onChange={(e) => onChange(e)}
          />
          <div className='transform translate-y-[-40px] translate-x-150px block'>
            {formParams.evaluation}
          </div>
        </div>

        <div className='mt-2 relative'>
          <label htmlFor='username' className='font-bold text-sm block '>
            公開設定
          </label>
          <div>
            <div
              className={`rounded-full cursor-pointer ${
                formParams.published ? 'bg-red-600' : 'bg-blue-600'
              } h-28px mt-2 text-white w-90px relative inline-block`}
              onClick={() =>
                setFormParams((state) => {
                  return {
                    ...state,
                    published: !formParams.published,
                  }
                })
              }
            >
              <div className=' font-bold text-white text-md transform top-[2px] left-[5px] absolute'>
                公開
                <span className='transform scale-x-80 inline-block'>
                  非公開
                </span>
              </div>
              <div
                className={`bg-white h-20px rounded-full top-4px ${
                  formParams.published ? 'left-40px w-46px' : 'left-3px w-38px'
                } duration-150 absolute`}
              ></div>
            </div>
          </div>
        </div>
        <button
          type='submit'
          className='border bg-blue-500 border-blue-500 mt-4 text-white w-full py-1 duration-300 hover:(bg-white text-blue-500) '
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  )
}
