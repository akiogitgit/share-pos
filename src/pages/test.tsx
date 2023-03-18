import { NextPage } from 'next'
import React, { FC, useCallback, useMemo, useState } from 'react'

import { Layout } from 'components/layout/Layout'
import { Button } from 'components/shares/base/Button'
import { DropDownMenu } from 'components/shares/base/DropDownMenu'
import { useBoolean } from 'hooks/useBoolean'

type Props = {
  func?: () => void
  text: string
}
const ComponentA: FC<Props> = ({ text }) => {
  const [count, setCount] = useState(0)
  const message = count + ' ' + text
  console.log(text, '再レンダリング')
  return (
    <div>
      コンポーネント{message}
      <div>
        <Button color='danger' onClick={() => setCount(s => s + 1)}>
          {message}
        </Button>
      </div>
    </div>
  )
}

const MyComponent = React.memo(function MyComponent({
  text,
}: {
  text: string
  func?: () => void
  val?: any
}) {
  const [count, setCount] = useState(0)
  const message = count + ' ' + text
  console.log(text, '再レンダリングmemo')
  return (
    <div>
      コンポーネント{message}
      <div>
        <Button color='danger' onClick={() => setCount(s => s + 1)}>
          {message}
        </Button>
      </div>
    </div>
  )
})

const Test: NextPage = () => {
  const colors: ('primary' | 'accent' | 'danger' | 'secondary')[] = [
    'primary',
    'accent',
    'danger',
    'secondary',
  ]

  const open = useBoolean(false)
  const bool = useBoolean(false)
  const val = 1

  const funcMemo = useCallback(() => 1, [])
  const valMemo = useMemo(() => [val], [])

  return (
    <Layout>
      <div className='flex flex-col gap-5'>
        {colors.map(color => (
          <div key={color}>
            <div className='flex gap-2 items-start'>
              <Button color={color} size='xs'>
                シェアする
              </Button>
              <Button color={color} size='sm'>
                シェアする
              </Button>
              <Button color={color} size='md'>
                シェアする
              </Button>
              <Button color={color} size='lg'>
                シェアする
              </Button>
              <Button color={color} size='xl' radius='sm'>
                シェアする
              </Button>
            </div>
            <div className='flex mt-2 gap-2 items-start'>
              <Button color={color} size='xs' compact>
                Settings
              </Button>
              <Button color={color} size='sm' compact>
                Settings
              </Button>
              <Button color={color} size='md' compact>
                Settings
              </Button>
              <Button color={color} size='lg' compact>
                Settings
              </Button>
              <Button color={color} size='xl' compact radius='sm'>
                Settings
              </Button>
            </div>

            <div className='flex gap-2 items-start'>
              <Button color={color}>filled</Button>
              <Button color={color} variant='light'>
                light
              </Button>
              <Button color={color} variant='outline'>
                outline
              </Button>
            </div>
            <div className='flex mt-4 gap-2 items-start'>
              <Button color={color} animate>
                filled
              </Button>
              <Button color={color} animate variant='light'>
                light
              </Button>
              <Button color={color} animate variant='outline'>
                outline
              </Button>
            </div>
          </div>
        ))}
        {/* <ComponentA func={() => console.log('a')} /> */}
        <ComponentA text='A1' />
        <ComponentA key={String(open.v)} text={'A2'} />
        <MyComponent text='B1' />
        {/* memoでも、関数(値)をuseCallback(useMemo)しないから、再レンダリングする */}
        {/* 関数、配列、オブジェクト型は同じ判定されない */}
        <MyComponent text='B2' func={() => 1} />
        {/* openはstateでPropsの値が変わるから再レンダリング */}
        <MyComponent text='B3' val={[val]} />
        <MyComponent text='B4' val={open.v} />
        {/* 再レンダリングしない */}
        <MyComponent text='B5' val={val} />
        <MyComponent text='B6' val={bool.v} />
        <MyComponent text='B7' func={funcMemo} />
        <MyComponent text='B8' val={valMemo} />

        <div className='relative'>
          <Button onClick={open.toggle}>メニューボタン</Button>
          <DropDownMenu
            open={open.v}
            onClose={open.setFalse}
            className='left-0'
          >
            <button className='py-2 hover:bg-primary-light'>1</button>
            <button className='w-full py-2 hover:bg-primary-light'>2</button>
            <button className='text-left w-full py-2 hover:bg-primary-light'>
              2
            </button>
            <button
              className=' py-2 hover:bg-primary-light'
              onClick={() => alert('22')}
            >
              記事リンクをコピー
            </button>
            <button
              className='text-left w-full py-2 hover:bg-primary-light'
              onClick={() => alert('22')}
            >
              記事リンクをコピー
            </button>
          </DropDownMenu>
        </div>

        <div className='bg-white text-sm w-100px'>aaaaa ffff aaa aa</div>
        <div className='bg-white text-md w-100px'>aaaaa ffff aaa aa</div>
        <div className='bg-white text-lg w-100px'>aaaaa ffff aaa aa</div>
        <div className='bg-white text-xl w-100px'>aaaaa ffff aaa aa</div>
        <div className='bg-white text-2xl w-100px'>aaaaa ffff aaa aa</div>
      </div>
    </Layout>
  )
}

export default Test
