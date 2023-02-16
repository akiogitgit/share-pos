import { FC, useMemo, useState } from 'react'
import { useElementSize } from 'utils/useElementSize'

type Props = {
  comment: string
}

export const PostItemComment: FC<Props> = ({ comment }) => {
  const { ref, height } = useElementSize()
  const [open, setOpen] = useState(false)

  // コメントが3行以上
  const isLongComment = useMemo(() => height > 60, [height])

  // 「もっと見る」が見えている状態
  const isVisibleShowMore = useMemo(
    () => isLongComment && !open,
    [isLongComment, open],
  )

  return (
    <>
      <div
        onClick={() => isLongComment && setOpen(!open)}
        className={`${
          !open && 'h-50px'
        } overflow-hidden whitespace-pre-wrap group relative`}
      >
        <div ref={ref} className='h-auto'>
          {comment}
        </div>
        <div
          className={`bg-primary-light bg-opacity-80 text-center w-full py-1 top-20px absolute ${
            isVisibleShowMore
              ? 'visible sm:invisible sm:group-hover:visible'
              : 'invisible'
          }`}
        >
          もっとみる
        </div>
      </div>
    </>
  )
}
