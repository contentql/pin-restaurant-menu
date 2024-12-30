'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import Button from './common/Button'

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <Button
        variant='outline'
        className='group size-9'
        data-state={theme === 'dark' ? 'off' : 'on'}
        onClick={() => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'))}
        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
        {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
        <Moon
          size={16}
          strokeWidth={2}
          className='shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100'
          aria-hidden='true'
        />

        <Sun
          size={16}
          strokeWidth={2}
          className='absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0'
          aria-hidden='true'
        />
      </Button>
    </div>
  )
}
