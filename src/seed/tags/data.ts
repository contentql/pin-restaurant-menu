import path from 'path'
import { RequiredDataFromCollectionSlug } from 'payload'

export type TagDataType = RequiredDataFromCollectionSlug<'tags'>

export const tagsData: TagDataType[] = [
  {
    title: 'AI Insights',
    color: 'blue',
    description: 'Stuff related to latest tech news🤯',
    tagImage: 0,
    _status: 'published',
    slug: 'ai-insights',
  },

  {
    title: 'Javascript',
    color: 'yellow',
    description: 'Best programming trips & tricks related to javascript🔥',
    tagImage: 0,
    _status: 'published',
    slug: 'javascript',
  },
  {
    title: 'Coding',
    color: 'green',
    description: 'All tips and tricks related to coding🧑‍💻',
    tagImage: 0,
    _status: 'published',
    slug: 'coding',
  },
  {
    title: 'Productivity',
    color: 'purple',
    description:
      'This tag will help you find the productivity tools🛠️ i use everyday',
    tagImage: 0,
    _status: 'published',
    slug: 'productivity',
  },
  {
    title: 'Youtube',
    color: 'purple',
    description: 'All the 💻tech tools to grow your youtube channel',
    tagImage: 0,
    _status: 'published',
    slug: 'youtube',
  },
]

export const tagsImagesData = [
  {
    alt: 'AI insights tag image',
    imageURL: path.join(process.cwd(), '/public/images/seed/ai-tag.png'),
    name: 'ai-insights',
  },
  {
    alt: 'Javascript tag image',
    imageURL: path.join(
      process.cwd(),
      '/public/images/seed/javascript-tag.png',
    ),
    name: 'javascript',
  },
  {
    alt: 'Coding tag image',
    imageURL: path.join(process.cwd(), '/public/images/seed/coding-tag.png'),
    name: 'coding',
  },
  {
    alt: 'Productivity tag image',
    imageURL: path.join(
      process.cwd(),
      '/public/images/seed/productivity-tag.png',
    ),
    name: 'productivity',
  },
  {
    alt: 'Youtube tag image',
    imageURL: path.join(process.cwd(), '/public/images/seed/youtube-tag.png'),
    name: 'youtube',
  },
]
