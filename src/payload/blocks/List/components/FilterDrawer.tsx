import { Category } from '@payload-types'
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
import { RadioGroup, RadioGroupItem } from '@/components/common/Radio'
import { Switch } from '@/components/common/Switch'
import { foodType, useFiltersContext } from '@/utils/filtersContext'

const FilterDrawer = ({ categories }: { categories: Category[] }) => {
  const {
    type,
    setType,
    selectedCategories,
    setSelectedCategories,
    specialItems,
    setSpecialItems,
    resetFilters,
  } = useFiltersContext()

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant='outline' className='border-border px-2.5'>
          <SlidersHorizontal size={20} className='text-text/70' />
        </Button>
      </DrawerTrigger>

      <DrawerContent aria-describedby={undefined}>
        <div className='mx-auto w-full max-w-md space-y-6 px-4'>
          <DrawerHeader className='relative px-0'>
            <DrawerTitle>Filters</DrawerTitle>

            <DrawerClose asChild>
              <Button
                variant='outline'
                size='icon'
                className='absolute right-0 top-2'>
                <X size={20} />
              </Button>
            </DrawerClose>
          </DrawerHeader>

          <div className='space-y-1'>
            <p className='font-semibold'>Special Items</p>

            <Switch
              checked={specialItems ?? false}
              onCheckedChange={checked =>
                setSpecialItems(checked ? checked : null)
              }
            />
          </div>

          <div>
            <p className='font-semibold'>Veg/Non-Veg</p>

            <RadioGroup
              className='flex items-center gap-4'
              value={type ?? ''}
              onValueChange={(value: (typeof foodType)[number]) => {
                setType(value)
              }}>
              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='veg' id='veg' />
                <label htmlFor='veg'>Pure Veg</label>
              </div>

              <div className='flex items-center space-x-2'>
                <RadioGroupItem value='nonVeg' id='nonVeg' />
                <label htmlFor='nonVeg'>Non Veg</label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <p className='mb-1 font-semibold'>Categories</p>

            <div className='flex w-full flex-wrap gap-2'>
              {categories
                ? categories.map(({ id, name, slug }) => (
                    <Button
                      variant='outline'
                      key={id}
                      data-active-category={selectedCategories.includes(slug)}
                      className='data-[active-category=true]:bg-foreground'
                      onClick={() => {
                        setSelectedCategories(oldCategories => {
                          const alreadySelected = oldCategories.includes(slug)

                          if (alreadySelected) {
                            return oldCategories.filter(
                              category => category !== slug,
                            )
                          }

                          return [...oldCategories, slug]
                        })
                      }}>
                      {name}
                    </Button>
                  ))
                : null}
            </div>
          </div>

          <DrawerFooter className='px-0'>
            <Button onClick={() => resetFilters()}>Reset</Button>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default FilterDrawer
