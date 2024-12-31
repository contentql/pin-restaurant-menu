'use client'

import { User } from '@payload-types'

import { GenerateMenuLinksType } from '@/utils/generateMenuLinks'

import HamburgerMenu from './HamburgerMenu'

const ProfileDropdown = ({
  user,
  navLinks,
}: {
  user: User | null
  navLinks: GenerateMenuLinksType[]
}) => {
  return <HamburgerMenu navLinks={navLinks} />
}

export default ProfileDropdown
