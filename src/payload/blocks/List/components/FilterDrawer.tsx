import { SlidersHorizontal, X } from 'lucide-react'

import Button from '@/components/common/Button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/common/Drawer'

const FilterDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline' className='border-text/30 px-2.5'>
          <SlidersHorizontal size={20} />
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <div className='mx-auto w-full max-w-md'>
          <DrawerHeader className='relative mb-4'>
            <DrawerTitle>Filters</DrawerTitle>

            <DrawerClose asChild>
              <Button
                variant='outline'
                size='icon'
                className='absolute right-3 top-2'>
                <X size={20} />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className='flex w-full flex-wrap gap-2 px-4'>
            <Button variant='outline'>Veg</Button>
            <Button variant='outline'>Non-Veg</Button>
            <Button variant='outline'>Special</Button>
            <Button variant='outline'>Biryani</Button>
            <Button variant='outline'>Desert</Button>
            <Button variant='outline'>Soups</Button>
          </div>

          <DrawerFooter>
            <Button>Reset</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default FilterDrawer
