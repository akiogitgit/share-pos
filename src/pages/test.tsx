import { NextPage } from 'next'
import { Layout } from 'components/layout/Layout'
import { Button } from 'components/shares/Button'

const Test: NextPage = () => {
  return (
    <Layout>
      <div className='flex gap-2 items-start'>
        <Button size='xs'>Settings</Button>
        <Button size='sm'>Settings</Button>
        <Button size='md' color='gray'>
          Settings
        </Button>
        <Button size='lg' color='blue'>
          Settings
        </Button>
        <Button size='xl' radius='sm'>
          Settings
        </Button>
      </div>

      <div className='flex gap-2 items-start'>
        <Button color='blue'>filled</Button>
        <Button color='blue' variant='light'>
          light
        </Button>
        <Button color='blue' variant='outline'>
          outline
        </Button>
      </div>
      <div className='flex mt-4 gap-2 items-start'>
        <Button color='blue' animate>
          filled
        </Button>
        <Button color='blue' animate variant='light'>
          light
        </Button>
        <Button color='blue' animate variant='outline'>
          outline
        </Button>
      </div>
      <div className='flex mt-4 gap-2 items-start'>
        <Button color='red' animate>
          filled
        </Button>
        <Button color='red' animate variant='light'>
          light
        </Button>
        <Button color='red' animate variant='outline'>
          outline
        </Button>
      </div>
      <div className='flex mt-4 gap-2 items-start'>
        <Button color='gray' animate>
          filled
        </Button>
        <Button color='gray' animate variant='light'>
          light
        </Button>
        <Button color='gray' animate variant='outline'>
          outline
        </Button>
      </div>

      <div className='flex mt-4 gap-2 items-start'>
        <Button color='gray' size='xs'>
          Settings
        </Button>
        <Button color='gray' size='sm'>
          Settings
        </Button>
        <Button color='gray' size='md'>
          Settings
        </Button>
        <Button color='gray' size='lg'>
          Settings
        </Button>
        <Button color='gray' size='xl' borderWhite>
          Settings
        </Button>
      </div>
      <div className='flex mt-4 gap-2 items-start'>
        <Button color='gray' compact size='xs'>
          Settings
        </Button>
        <Button color='gray' compact size='sm'>
          Settings
        </Button>
        <Button color='gray' compact size='md'>
          Settings
        </Button>
        <Button color='gray' compact size='lg'>
          Settings
        </Button>
        <Button color='gray' compact size='xl'>
          Settings
        </Button>
      </div>

      <button className='border-white border-2'>
        <Button color='gray' compact size='xl'>
          Settings
        </Button>
      </button>

      <Button
        color='blue'
        compact
        size='xl'
        animate
        className='border-white border-4'
      >
        Settia
      </Button>

      <form
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
        <Button color='blue' type='button' animate>
          作成
        </Button>
        <Button color='red' type='button' animate>
          作成
        </Button>
      </form>
    </Layout>
  )
}

export default Test
