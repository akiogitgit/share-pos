import { NextPage } from 'next'
import { Layout } from 'components/layout/Layout'
import { Button } from 'components/shares/button'

const Test: NextPage = () => {
  return (
    <Layout>
      <button className='bg-primary-dark border border-primary-dark text-white py-1 px-2 duration-300 hover:(bg-white text-primary-dark) '>
        aa
      </button>
      <button className='bg-primary-light border border-primary-light text-white py-1 px-2 duration-300 hover:(bg-white text-primary-light) '>
        aa
      </button>
      <div className='flex gap-2 items-start'>
        <Button size='xs'>Settings</Button>
        <Button size='sm'>Settings</Button>
        <Button size='md'>Settings</Button>
        <Button size='lg'>Settings</Button>
        <Button size='xl' radius='sm'>
          Settings
        </Button>
      </div>

      <div className='flex gap-2 items-start'>
        <Button>filled</Button>
        <Button variant='light'>light</Button>
        <Button variant='outline'>outline</Button>
      </div>
      <div className='flex mt-4 gap-2 items-start'>
        <Button animate>filled</Button>
        <Button animate variant='light'>
          light
        </Button>
        <Button animate variant='outline'>
          outline
        </Button>
      </div>

      <div className='flex mt-10 gap-2 items-start'>
        <Button size='xs' color='accent'>
          Settings
        </Button>
        <Button size='sm' color='accent'>
          Settings
        </Button>
        <Button size='md' color='accent'>
          Settings
        </Button>
        <Button size='lg' color='accent'>
          Settings
        </Button>
        <Button size='xl' color='accent' radius='sm'>
          Settings
        </Button>
      </div>

      <div className='flex gap-2 items-start'>
        <Button color='accent'>filled</Button>
        <Button color='accent' variant='light'>
          light
        </Button>
        <Button color='accent' variant='outline'>
          outline
        </Button>
      </div>
      <div className='flex mt-4 gap-2 items-start'>
        <Button color='accent' animate>
          filled
        </Button>
        <Button color='accent' animate variant='light'>
          light
        </Button>
        <Button color='accent' animate variant='outline'>
          outline
        </Button>
      </div>

      {/* <form
        onSubmit={e => {
          e.preventDefault()
          console.log('anpan')
        }}
        className='flex flex-col min-w-300px max-w-500px gap-3'
      >
        <label htmlFor='email' className='font-bold text-sm block '>
          Eメール
        </label>
        <input
          id='email'
          type='text'
          placeholder='example@example.com'
          required
          className='border outline-none w-full p-2 pr-9 ring-blue-500 duration-300 focus:rounded-10px focus:ring-1'
        />
        <Button  type='button' animate>
          作成
        </Button>
        <Button type='button' animate>
          作成
        </Button>
      </form> */}
    </Layout>
  )
}

export default Test
