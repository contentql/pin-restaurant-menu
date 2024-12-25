import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { headers } from 'next/headers'
import { getPayload } from 'payload'

import Branding from '@/components/Branding'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import { getCurrentUser } from '@/utils/getCurrentUser'
import { MetadataProvider } from '@/utils/metadataContext'

const getCachedSiteSettings = unstable_cache(
  async () => {
    const payload = await getPayload({
      config: configPromise,
    })

    const data = await payload.findGlobal({
      slug: 'site-settings',
      draft: false,
    })

    return data
  },
  ['site-settings'],
  { tags: ['site-settings'] },
)

const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
  const metadata = await getCachedSiteSettings()

  const headersList = await headers()
  const user = await getCurrentUser(headersList)

  return (
    <MetadataProvider metadata={metadata}>
      <div className='grid min-h-screen w-full grid-rows-[1fr_auto]'>
        <Navbar metadata={metadata} user={user} />
        <main className='container my-20'>{children}</main>
        <Footer metadata={metadata} />
        <Branding />
      </div>
    </MetadataProvider>
  )
}

export default MarketingLayout
