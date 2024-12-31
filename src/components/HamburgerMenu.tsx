import { AnimatePresence, MotionConfig, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/common/Accordion'
import { GenerateMenuLinksType } from '@/utils/generateMenuLinks'

const variants = {
  visible: { opacity: 1, scale: 1 },
  hidden: { opacity: 0, scale: 0.5 },
}

type HamburgerMenuType = {
  navLinks: GenerateMenuLinksType[]
}

const HamburgerMenu = ({ navLinks }: HamburgerMenuType) => {
  const [open, setOpen] = useState(false)

  const resizeListener = () => {
    if (window.innerWidth >= 1024) {
      setOpen(false)
    }
  }

  // on-resize if the menu is open closing it on laptop view
  useEffect(() => {
    window.addEventListener('resize', resizeListener)

    return () => {
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return (
    <>
      <button
        className='z-[70] lg:hidden'
        aria-label='Menu'
        onClick={() => setOpen(current => !current)}>
        <MotionConfig transition={{ duration: 0.15 }}>
          <AnimatePresence initial={false} mode='wait'>
            {open ? (
              <motion.div
                animate='visible'
                exit='hidden'
                initial='hidden'
                key='close'
                variants={variants}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                animate='visible'
                exit='hidden'
                initial='hidden'
                key='open'
                variants={variants}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </MotionConfig>
      </button>

      <aside
        className={`fixed right-0 top-0 h-screen w-full max-w-md border-l bg-background px-4 pb-4 pt-16 transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
        {navLinks?.length > 0 && (
          <ul className='space-y-4'>
            {navLinks.map(({ label, children, href = '', newTab }) => {
              return (
                <li className='flex list-none items-center gap-1' key={label}>
                  {children ? (
                    <Accordion type='single' collapsible className='w-full'>
                      <AccordionItem value='item-1' className='border-none'>
                        <AccordionTrigger className='px-3 py-2 hover:no-underline'>
                          {label}
                        </AccordionTrigger>
                        <AccordionContent className='p-0'>
                          {children
                            ? children.map(details => (
                                <li
                                  className='flex list-none items-center gap-1'
                                  key={details.label}>
                                  <Link
                                    key={details.label}
                                    href={details.href}
                                    onClick={() => setOpen(false)}
                                    className='hover:bg-secondary/10 w-full rounded px-3 py-2 transition-colors'
                                    target={
                                      details.newTab ? '_blank' : '_self'
                                    }>
                                    {details.label}
                                  </Link>
                                </li>
                              ))
                            : null}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  ) : (
                    <Link
                      href={href}
                      onClick={() => setOpen(false)}
                      className='hover:bg-secondary/10 w-full rounded px-3 py-2 transition-colors'
                      target={newTab ? '_blank' : '_self'}>
                      {label}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </aside>
    </>
  )
}

export default HamburgerMenu
