import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'

import Button from '@/components/common/Button'

import Cart from './Cart'
import Collection from './Collections'

const FloatButton = () => {
  const [open, setOpen] = useState<boolean>(false)

  const variants = {
    initial: {
      y: 200,
      opacity: 0,
      scale: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
      scale: 1,
    },
  }

  return (
    <div className='fixed bottom-4 left-4 grid w-max gap-2'>
      <motion.div
        variants={variants}
        initial='initial'
        transition={{
          ease: [0.33, 1, 0.68, 1],
          delay: open ? 0 : 0.2,
          duration: 0.5,
        }}
        animate={open ? 'animate' : 'initial'}>
        <Collection />
      </motion.div>

      <motion.div
        variants={variants}
        initial='initial'
        transition={{
          ease: [0.33, 1, 0.68, 1],
          delay: open ? 0.2 : 0,
          duration: 0.5,
        }}
        animate={open ? 'animate' : 'initial'}>
        <Cart />
      </motion.div>

      <Button
        className='group w-max px-2.5'
        onClick={() => setOpen(prevState => !prevState)}
        aria-expanded={open}
        aria-label={open ? 'Close menu' : 'Open menu'}>
        <Plus
          className='transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]'
          size={20}
          aria-hidden='true'
        />
      </Button>
    </div>
  )
}

export default FloatButton
