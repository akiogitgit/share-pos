import { NextPage } from 'next'
import { Layout } from 'components/layout/Layout'
import { Button } from 'components/shares/Button'

const Test: NextPage = () => {
  return (
    <Layout>
      <div className='flex gap-2 items-start'>
        <Button size='xs'>Settings</Button>
        <div className='w-200px'>
          <Button size='sm' fullWidth onClick={() => alert('a')}>
            Settings Settings
          </Button>
        </div>
        <Button size='md'>Settings</Button>
        <Button size='lg'>Settings</Button>
        <Button size='xl' radius='sm'>
          Settings
        </Button>
      </div>

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
        <Button color='blue' type='button'>
          作成
        </Button>
      </form>
    </Layout>
  )
}

export default Test
