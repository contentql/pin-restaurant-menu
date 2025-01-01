import { cqlConfig } from '@contentql/core/restaurant'
import { env } from '@env'
import { slateEditor } from '@payloadcms/richtext-slate'
import path from 'path'
import { fileURLToPath } from 'url'

import { ResetPassword } from '@/emails/reset-password'
import { UserAccountVerification } from '@/emails/verify-email'
import { blocksConfig } from '@/payload/blocks/blockConfig'
import { revalidateCategories } from '@/payload/hooks/revalidateCategories'
import { revalidateFoodItems } from '@/payload/hooks/revalidateFoodItems'
import { revalidatePages } from '@/payload/hooks/revalidatePages'
import { revalidateSiteSettings } from '@/payload/hooks/revalidateSiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default cqlConfig({
  admin: {
    components: {
      graphics: {
        Logo: '/src/payload/style/icons/Logo.tsx',
        Icon: '/src/payload/style/icons/Icon.tsx',
      },
      beforeDashboard: ['@/components/RestaurantQRCode'],
    },
  },
  cors: [env.PAYLOAD_URL],
  csrf: [env.PAYLOAD_URL],

  baseURL: env.PAYLOAD_URL,

  secret: env.PAYLOAD_SECRET,

  dbURI: env.DATABASE_URI,
  dbSecret: env.DATABASE_SECRET,

  s3: {
    accessKeyId: env.S3_ACCESS_KEY_ID,
    bucket: env.S3_BUCKET,
    endpoint: env.S3_ENDPOINT,
    region: env.S3_REGION,
    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
  },

  resend: {
    apiKey: env.RESEND_API_KEY,
    defaultFromAddress: env.RESEND_SENDER_EMAIL,
    defaultFromName: env.RESEND_SENDER_NAME,
  },

  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  blocks: blocksConfig,

  collections: [
    {
      slug: 'users',
      fields: [],
      auth: {
        verify: {
          generateEmailHTML: ({ token, user }) => {
            return UserAccountVerification({
              actionLabel: 'verify your account',
              buttonText: 'Verify Account',
              userName: user.username,
              image: user.avatar,
              href: `${env.PAYLOAD_URL}/verify-email?token=${token}&id=${user.id}`,
            })
          },
        },
        forgotPassword: {
          generateEmailHTML: args => {
            return ResetPassword({
              resetPasswordLink: `${env.PAYLOAD_URL}/reset-password?token=${args?.token}`,
              userFirstName: args?.user.username,
            })
          },
        },
      },
    },
    {
      slug: 'pages',
      fields: [],
      hooks: {
        afterChange: [revalidatePages],
      },
    },
    {
      slug: 'foodItems',
      fields: [],
      hooks: {
        afterChange: [revalidateFoodItems],
      },
    },
    {
      slug: 'categories',
      fields: [],
      hooks: {
        afterChange: [revalidateCategories],
      },
    },
  ],

  globals: [
    {
      slug: 'site-settings',
      fields: [],
      hooks: {
        afterChange: [revalidateSiteSettings],
      },
    },
  ],

  editor: slateEditor({
    admin: {
      leaves: [
        {
          Button: 'src/payload/slate/strong/Button',
          Leaf: 'src/payload/slate/strong/Leaf',
          name: 'strong',
        },
        {
          Button: 'src/payload/slate/pre/Button',
          Leaf: 'src/payload/slate/pre/Leaf',
          name: 'pre',
        },
        {
          Button: 'src/payload/slate/mark/Button',
          Leaf: 'src/payload/slate/mark/Leaf',
          name: 'mark',
        },
        {
          Button: 'src/payload/slate/kbd/Button',
          Leaf: 'src/payload/slate/kbd/Leaf',
          name: 'kbd',
        },
        {
          Button: 'src/payload/slate/custom-iframe/Button',
          Leaf: 'src/payload/slate/custom-iframe/Leaf',
          name: 'custom-iframe',
        },
        {
          Button: 'src/payload/slate/italic/Button',
          Leaf: 'src/payload/slate/italic/Leaf',
          name: 'italic',
        },
        {
          Button: 'src/payload/slate/Strikethrough/Button',
          Leaf: 'src/payload/slate/Strikethrough/Leaf',
          name: 'strikethrough',
        },
        {
          Button: 'src/payload/slate/underline/Button',
          Leaf: 'src/payload/slate/underline/Leaf',
          name: 'underline',
        },
      ],
    },
  }),
})
