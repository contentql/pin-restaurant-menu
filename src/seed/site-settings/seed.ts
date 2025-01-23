import { collectionSlug } from '@contentql/core'
import configPromise from '@payload-config'
import { Ora } from 'ora'
import path from 'path'
import { getPayload } from 'payload'

const payload = await getPayload({ config: configPromise })

export const seedSiteSettings = async ({ spinner }: { spinner: Ora }) => {
  spinner.start('Started creating site-settings...')

  try {
    const ogImageUrl = await payload.create({
      collection: 'media',
      data: {
        alt: 'og-image',
      },
      filePath: path.join(process.cwd(), '/public/images/og-image.webp'),
    })

    const faviconUrl = await payload.create({
      collection: 'media',
      data: {
        alt: 'og-image',
      },
      filePath: path.join(
        process.cwd(),
        '/public/images/hotel-chiranjeevi-logo.svg',
      ),
    })

    const result = await payload.updateGlobal({
      slug: collectionSlug['site-settings'],
      data: {
        general: {
          title: 'Hotel Chiranjeevi',
          description: 'Welcome to Hotel Chiranjeevi!',
          keywords: ['ContentQL', 'Payload CMS', 'NextJS'],
          faviconUrl: faviconUrl.id,
          ogImageUrl: ogImageUrl.id,
          currency: 'inr',
          discount: 10,
          taxes: [
            {
              name: 'CGST',
              percentage: 8,
            },
            {
              name: 'SGST',
              percentage: 8,
            },
            {
              name: 'Service Tax',
              percentage: 5,
            },
          ],
        },
        navbar: {
          logo: {
            imageUrl: faviconUrl.id,
            description: 'Hotel Chiranjeevi Logo',
            height: 24,
            width: 24,
          },
        },
        footer: {
          logo: {
            height: 24,
            width: 24,
            description: 'Hotel Chirangeevi',
            imageUrl: faviconUrl.id,
          },
          copyright: '© 2024 all rights reserved',
          socialLinks: [
            {
              platform: 'youtube',
              value: 'https://youtube.com',
            },
            {
              platform: 'github',
              value: 'https://github.com/contentql',
            },
            {
              platform: 'twitter',
              value: 'https://x.com',
            },
            {
              platform: 'instagram',
              value: 'https://instagram.com',
            },
          ],
        },
        themeSettings: {
          lightMode: {
            primary: '#C62E2E',
            background: '#FEF3E2',
            text: '#1A1A19',
            foreground: '#FBD288',
            popover: '#000000',
            border: '#CDC2A5',
          },

          darkMode: {
            primary: '#F15A59',
            background: '#191919',
            text: '#FFFAFA',
            foreground: '#F8C4B4',
            popover: '#000000',
            border: '#323232',
          },

          fonts: {
            display: {
              type: 'googleFont',
              customFont: null,
              remoteFont:
                'https://fonts.googleapis.com/css2?family=Finger+Paint&display=swap',
              fontName: 'Finger Paint',
            },

            body: {
              type: 'googleFont',
              customFont: null,
              remoteFont:
                'https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,100..900;1,100..900&display=swap',
              fontName: 'Work Sans',
            },
          },

          radius: 'medium',
        },
      },
    })

    spinner.succeed('Successfully creating site-settings...')
    return result
  } catch (error) {
    spinner.fail('Failed creating site-settings...')
    throw error
  }
}
