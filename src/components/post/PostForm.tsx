import { FC, useCallback, useState } from 'react'

import { BiCommentDetail as BiCommentDetailIcon } from 'react-icons/bi'
import { RiArticleLine as RiArticleLineIcon } from 'react-icons/ri'
import { Button } from 'components/shares/button'

import { PostRequestParams } from 'types/post'

// Props多すぎ？
type Props = {
  onSubmit: (params: PostRequestParams) => void
  formParamsProps?: PostRequestParams
  submitButtonText?: string
}

export const PostForm: FC<Props> = ({
  onSubmit,
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
      setFormParams(state => {
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
        onSubmit={e => {
          onSubmit(formParams)
          e.preventDefault()
        }}
        className='w-full max-w-420px relative'
      >
        <div className='relative'>
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
            className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-10px focus:ring-1'
          />

          <div className='flex justify-end'>
            <RiArticleLineIcon className='top-33px right-10px absolute' />
          </div>
        </div>

        <div className='mt-2 relative'>
          <label htmlFor='username' className='font-bold text-sm block '>
            コメント
          </label>

          <div className='min-h-[50px] leading-1.4rem relative'>
            <div className='py-3 px-2 invisible whitespace-pre-wrap break-words'>
              {formParams.comment}
            </div>
            <textarea
              name='comment'
              className='border h-full outline-none ring-primary-dark w-full p-2 pr-9 top-0 left-0 duration-300 scroll-bar-none absolute focus:rounded-10px focus:ring-1'
              value={formParams.comment}
              placeholder='この記事オススメ！'
              onChange={onChange}
            />
          </div>
          <div className='flex justify-end'>
            <BiCommentDetailIcon className='top-33px right-10px absolute' />
          </div>
        </div>

        <div className='mt-2 relative'>
          <label htmlFor='username' className='font-bold text-sm block '>
            公開設定
          </label>
          <div>
            <div
              className={`rounded-full cursor-pointer ${
                formParams.published ? 'bg-accent-dark' : 'bg-primary-dark'
              } h-28px mt-2 text-white w-90px relative inline-block`}
              onClick={() =>
                setFormParams(state => {
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
        <Button type='submit' fullWidth animate className='mt-4'>
          {submitButtonText}
        </Button>
      </form>
    </div>
  )
}
