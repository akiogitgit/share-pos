import { FC, useMemo } from 'react'
import { useBoolean } from 'hooks/useBoolean'
import { useElementSize } from 'utils/useElementSize'

type Props = {
  comment: string
}

export const PostItemComment: FC<Props> = ({ comment }) => {
  const { ref, height } = useElementSize()
  const open = useBoolean(false)

  // コメントが3行以上
  const isLongComment = useMemo(() => height > 60, [height])

  // 「もっと見る」が見えている状態
  const isVisibleShowMore = useMemo(
    () => isLongComment && !open.v,
    [isLongComment, open],
  )

  return (
    <>
      <div
        onClick={() => isLongComment && open.toggle()}
        className={`${
          !open.v && 'h-50px'
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
