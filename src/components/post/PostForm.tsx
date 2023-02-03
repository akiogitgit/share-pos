import { FC, useCallback, useState } from 'react'

import { BiCommentDetail as BiCommentDetailIcon } from 'react-icons/bi'
import { RiArticleLine as RiArticleLineIcon } from 'react-icons/ri'
import { Button } from 'components/shares/base/Button'

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
    published: true,
  },
  submitButtonText = 'シェアする',
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
          <label>
            記事のURL
            <input
              type='text'
              value={formParams.url}
              placeholder='https://example.com'
              required
              name='url'
              onChange={onChange}
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
            />
          </label>

          <div className='flex justify-end'>
            <RiArticleLineIcon className='top-33px right-10px absolute' />
          </div>
        </div>

        <div className='mt-2 relative'>
          <label>
            コメント
            <div className='min-h-[50px] leading-1.4rem relative'>
              <div
                className='py-3 invisible whitespace-pre-wrap'
                aria-hidden='true'
              >
                この文字で　編集時の　PostItemの横幅を　最大に　保っている
                {formParams.comment}
              </div>
              <textarea
                name='comment'
                className='border h-full outline-none ring-primary-dark w-full p-2 pr-9 top-0 left-0 duration-300 scroll-bar-none absolute focus:rounded-md focus:ring-1'
                value={formParams.comment}
                placeholder='この記事オススメ！'
                onChange={onChange}
              />
            </div>
          </label>
          <div className='flex justify-end'>
            <BiCommentDetailIcon className='top-33px right-10px absolute' />
          </div>
        </div>

        <div className='mt-2 relative'>
          <label>
            公開設定
            <div>
              <div
                className={`rounded-full cursor-pointer ${
                  formParams.published ? 'bg-accent-dark' : 'bg-primary-dark'
                } h-28px text-white w-90px relative inline-block`}
                onClick={() =>
                  setFormParams(state => {
                    return {
                      ...state,
                      published: !formParams.published,
                    }
                  })
                }
              >
                <div className='font-bold text-white transform top-[2px] left-[5px] absolute'>
                  公開
                  <span className='ml-3px transform scale-x-80 inline-block'>
                    非公開
                  </span>
                </div>
                <div
                  className={`bg-white h-20px rounded-full top-4px ${
                    formParams.published
                      ? 'left-40px w-46px'
                      : 'left-3px w-38px'
                  } duration-150 absolute`}
                >
                  <input type='radio' name='a' className='opacity-0' />
                  <input type='radio' name='a' className='opacity-0' />
                </div>
              </div>
            </div>
          </label>
        </div>
        <Button type='submit' fullWidth animate className='mt-4'>
          {submitButtonText}
        </Button>
      </form>
    </div>
  )
}
