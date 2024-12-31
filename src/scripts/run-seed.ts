#!/usr/bin/env node
import chalk from 'chalk'
import 'dotenv/config'
import ora from 'ora'

import { seedCategories } from '@/seed/categories/seed'
import { seedFoodItems } from '@/seed/foodItems/seed'
import { seedHomePage } from '@/seed/home-page/seed'
import { seedSiteSettings } from '@/seed/site-settings/seed'
import { seedUsers } from '@/seed/users/seed'

// Function to execute the seeding process
const executeSeeding = async () => {
  const spinner = ora({
    text: 'Starting the seeding process...',
    color: 'cyan',
    spinner: 'dots',
  }).start()

  try {
    // creating admin-user
    await seedUsers({ spinner })
    // creating home-page
    await seedHomePage({ spinner })
    // creating categories
    const categories = await seedCategories({ spinner })
    // creating categories
    await seedFoodItems({ spinner, categories })
    await seedSiteSettings({ spinner })
  } catch (error) {
    console.error(chalk.red('Error running seeds:'), error)
  } finally {
    spinner.stop()
    console.log(chalk.green('Seeding completed.'))
    process.exit(0)
  }
}

await executeSeeding()
