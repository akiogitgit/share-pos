import { FC, useMemo, useState } from 'react'
import { useElementSize } from 'utils/useElementSize'

type Props = {
  comment: string
}

export const PostItemComment: FC<Props> = ({ comment }) => {
  const { ref, height } = useElementSize()
  const [isOpenComment, setIsOpenComment] = useState(false)

  // 要素の高さを取得
  const hasElementMoreThan3Lines = useMemo(() => height > 80, [height])

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
          !isOpenComment && 'h-70px'
        } overflow-hidden whitespace-pre-wrap group relative`}
      >
        <div ref={ref} className='h-auto'>
          {comment}
        </div>
        <div
          className={`bg-red-300 bg-opacity-70 text-center w-full py-2 top-30px absolute ${
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
