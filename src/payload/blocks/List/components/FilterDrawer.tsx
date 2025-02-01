import { Category } from '@payload-types'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, SlidersHorizontal, X } from 'lucide-react'

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

const MotionButton = motion(Button)

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
        <Button
          variant='outline'
          aria-label='Filters'
          className='border-border bg-background px-2.5'>
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

            <motion.div
              layout
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
                mass: 0.5,
              }}
              className='flex w-full flex-wrap gap-2'>
              {categories
                ? categories.map(({ id, name, slug }) => (
                    <MotionButton
                      layout
                      initial={false}
                      variant='outline'
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 30,
                        mass: 0.5,
                        backgroundColor: { duration: 0.1 },
                      }}
                      key={id}
                      data-active-category={selectedCategories.includes(slug)}
                      className='data-[active-category=true]:bg-primary/10'
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
                      <motion.div
                        className='relative flex items-center'
                        animate={{
                          width: selectedCategories.includes(slug)
                            ? 'auto'
                            : '100%',
                          paddingRight: selectedCategories.includes(slug)
                            ? '1.5rem'
                            : '0',
                        }}
                        transition={{
                          ease: [0.175, 0.885, 0.32, 1.275],
                          duration: 0.3,
                        }}>
                        <span>{name}</span>
                        <AnimatePresence>
                          {selectedCategories.includes(slug) && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              transition={{
                                type: 'spring',
                                stiffness: 500,
                                damping: 30,
                                mass: 0.5,
                              }}
                              className='absolute right-0'>
                              <div className='flex h-4 w-4 items-center justify-center rounded-full bg-primary'>
                                <Check
                                  className='h-3 w-3 text-foreground'
                                  strokeWidth={1.5}
                                />
                              </div>
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </MotionButton>
                  ))
                : null}
            </motion.div>
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
