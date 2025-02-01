import NumberFlow from '@number-flow/react'
import { Minus, Plus } from 'lucide-react'

import Button from '@/components/common/Button'

type OrderInputType = {
  value: number
  size?: 'small' | 'default'
  onChange?: (value: 'inc' | 'dec') => void
}

const OrderInput = ({
  value = 0,
  size = 'default',
  onChange = () => {},
}: OrderInputType) => {
  return (
    <div
      className={`flex items-center gap-2 rounded border border-primary bg-background ${size === 'small' ? 'h-8' : ''}`}>
      <Button
        variant='outline'
        size='icon'
        aria-label='Remove Item'
        className='border-none'
        onClick={e => {
          e.stopPropagation()
          onChange('dec')
        }}>
        <Minus size={16} />
      </Button>

      <div className="relative grid items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]">
        <NumberFlow value={value} className='pointer-events-none' />
      </div>

      <Button
        variant='outline'
        size='icon'
        aria-label='Add Item'
        className='border-none'
        onClick={e => {
          e.stopPropagation()
          onChange('inc')
        }}>
        <Plus size={16} />
      </Button>
    </div>
  )
}

export default OrderInput
