import NumberFlow from '@number-flow/react'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

import Button from '@/components/common/Button'

type OrderInputType = {
  defaultValue?: number
  size?: 'small' | 'default'
  onChange?: (value: number) => void
}

const OrderInput = ({
  defaultValue = 0,
  size = 'default',
  onChange = () => {},
}: OrderInputType) => {
  const [count, setCount] = useState(defaultValue)

  const handleChange = (type: 'inc' | 'dec') => {
    if (count === 0 && type === 'dec') {
      return
    }

    const newCount = type === 'inc' ? count + 1 : count - 1

    setCount(newCount)
    onChange(newCount)
  }

  return (
    <div
      className={`flex items-center gap-2 rounded border border-primary bg-background ${size === 'small' ? 'h-8' : ''}`}>
      <Button
        variant='outline'
        size='icon'
        className='border-none'
        onClick={e => {
          e.stopPropagation()
          handleChange('dec')
        }}>
        <Minus size={16} />
      </Button>

      <div className="relative grid items-center justify-items-center text-center [grid-template-areas:'overlap'] *:[grid-area:overlap]">
        <NumberFlow value={count} className='pointer-events-none' />
      </div>

      <Button
        variant='outline'
        size='icon'
        className='border-none'
        onClick={e => {
          e.stopPropagation()
          handleChange('inc')
        }}>
        <Plus size={16} />
      </Button>
    </div>
  )
}

export default OrderInput
