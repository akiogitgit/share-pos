import { NextPage } from 'next'
import { useState } from 'react'
import { Layout } from 'components/layout/Layout'
import { Button } from 'components/shares/base/Button'
import { DropDownMenu } from 'components/shares/base/DropDownMenu'

const Test: NextPage = () => {
  const colors: ('primary' | 'accent' | 'danger' | 'secondary')[] = [
    'primary',
    'accent',
    'danger',
    'secondary',
  ]

  const [open, setOpen] = useState(false)

  return (
    <Layout>
      <div className='flex flex-col gap-5'>
        <div className='relative'>
          <Button onClick={() => setOpen(s => !s)}>メニューボタン</Button>
          <DropDownMenu
            open={open}
            onClose={() => setOpen(false)}
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

        {colors.map(color => (
          <div key={color}>
            <div className='flex gap-2 items-start'>
              <Button color={color} size='xs'>
                Settings
              </Button>
              <Button color={color} size='sm'>
                Settings
              </Button>
              <Button color={color} size='md'>
                Settings
              </Button>
              <Button color={color} size='lg'>
                Settings
              </Button>
              <Button color={color} size='xl' radius='sm'>
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
      </div>
    </Layout>
  )
}

export default Test
