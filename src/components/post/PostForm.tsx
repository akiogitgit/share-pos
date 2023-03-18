import { zodResolver } from '@hookform/resolvers/zod'
import { FC } from 'react'
import { useForm } from 'react-hook-form'
import { BiCommentDetail as BiCommentDetailIcon } from 'react-icons/bi'
import { RiArticleLine as RiArticleLineIcon } from 'react-icons/ri'
import { z } from 'zod'

import { Button } from 'components/shares/base/Button'

type Props = {
  onSubmit: (params: PostRequestParams) => void
  formParamsProps?: PostRequestParams
  submitButtonText?: string
}

const regex = new RegExp('^https?://.+$')

const schema = z.object({
  comment: z.string(),
  url: z.string().regex(regex, { message: 'URLの形式で入力して下さい' }),
  published: z.boolean(),
  evaluation: z.number(),
})

export type PostRequestParams = z.infer<typeof schema>

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
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    watch,
  } = useForm<PostRequestParams>({
    resolver: zodResolver(schema),
    defaultValues: formParamsProps,
  })

  const watchComment = watch('comment')

  return (
    <div className='flex flex-col items-center justify-center'>
      <style jsx>{`
        .scroll-bar-none::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-full max-w-420px relative'
      >
        <div className='relative'>
          <label>
            記事のURL
            <input
              type='text'
              placeholder='https://example.com'
              className='border outline-none ring-primary-dark w-full p-2 pr-9 duration-300 focus:rounded-md focus:ring-1'
              {...register('url')}
            />
          </label>
          <RiArticleLineIcon className='top-33px right-10px absolute' />
          {errors?.url && (
            <div className='text-danger-dark'>{errors.url.message}</div>
          )}
        </div>

        <div className='mt-2 relative'>
          <label>
            コメント
            <div className='min-h-[50px] relative'>
              <div
                className='py-3 w-80vw break-words invisible sm:w-full'
                aria-hidden='true'
              >
                {watchComment}
              </div>
              <textarea
                className='border h-full outline-none ring-primary-dark w-full p-2 pr-9 top-0 left-0 duration-300 scroll-bar-none absolute focus:rounded-md focus:ring-1'
                placeholder='この記事オススメ！'
                {...register('comment')}
              />
            </div>
          </label>
          <BiCommentDetailIcon className='top-33px right-10px absolute' />
        </div>

        <div className='mt-2 relative'>
          <label>
            公開設定
            <div>
              <button
                type='button'
                className={`rounded-full cursor-pointer ${
                  getValues('published') ? 'bg-accent-dark' : 'bg-primary-dark'
                } h-28px text-white w-90px relative inline-block`}
                onClick={() =>
                  setValue('published', !getValues('published'), {
                    shouldValidate: true,
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
                    getValues('published')
                      ? 'left-40px w-46px'
                      : 'left-3px w-38px'
                  } duration-150 absolute`}
                ></div>
              </button>
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
