import { FC, useMemo, useState } from 'react'
import { useElementSize } from 'utils/useElementSize'

type Props = {
  comment: string
}

export const PostItemComment: FC<Props> = ({ comment }) => {
  const { ref, height } = useElementSize()
  const [isOpenComment, setIsOpenComment] = useState(false)

  // 要素の高さを取得
  const hasElementMoreThan3Lines = useMemo(() => height > 60, [height])

  const showSeeMore = useMemo(
    () => hasElementMoreThan3Lines && !isOpenComment,
    [hasElementMoreThan3Lines, isOpenComment],
  )
  return (
    <>
      <div
        onClick={() =>
          hasElementMoreThan3Lines && setIsOpenComment(!isOpenComment)
        }
        className={`${
          !isOpenComment && 'h-50px'
        } overflow-hidden whitespace-pre-wrap group relative`}
      >
        <div ref={ref} className='h-auto'>
          {comment}
        </div>
        <div
          className={`bg-primary-light bg-opacity-80 text-center w-full py-1 top-20px absolute ${
            showSeeMore
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
