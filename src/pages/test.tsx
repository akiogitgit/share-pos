import { NextPage } from 'next'
import { Layout } from 'components/layout/Layout'
import { Button } from 'components/shares/button'

const Test: NextPage = () => {
  const colors: ('primary' | 'accent' | 'danger' | 'secondary')[] = [
    'primary',
    'accent',
    'danger',
    'secondary',
  ]
  return (
    <Layout>
      <button className='bg-primary-dark border border-primary-dark text-white py-1 px-2 duration-300 hover:(bg-white text-primary-dark) '>
        aa
      </button>
      <button className='bg-primary-light border border-primary-light text-white py-1 px-2 duration-300 hover:(bg-white text-primary-light) '>
        aa
      </button>

      {colors.map(color => (
        <div className='mb-10' key={color}>
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
    </Layout>
  )
}

export default Test
