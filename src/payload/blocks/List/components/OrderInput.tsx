import NumberFlow from '@number-flow/react'
import { Minus, Plus } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'

import Button from '@/components/common/Button'

type OrderInputType = {
  count: number
  setCount: Dispatch<SetStateAction<number>>
  size?: 'small' | 'default'
}

const OrderInput = ({ count, setCount, size = 'default' }: OrderInputType) => {
  return (
    <div
      className={`flex items-center gap-2 rounded border ${size === 'small' ? 'h-8' : ''}`}>
      <Button
        variant='outline'
        size='icon'
        className='border-none'
        onClick={() =>
          setCount(current => {
            if (current === 1) {
              return current
            }

            return current - 1
          })
        }>
        <Minus size={16} />
      </Button>

      <div className="relative grid items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]">
        <NumberFlow value={count} className='pointer-events-none' />
      </div>

      <Button
        variant='outline'
        size='icon'
        className='border-none'
        onClick={() => setCount(current => current + 1)}>
        <Plus size={16} />
      </Button>
    </div>
  )
}

export default OrderInput
