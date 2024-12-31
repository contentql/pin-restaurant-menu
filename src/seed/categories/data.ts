import { RequiredDataFromCollectionSlug } from 'payload'

export type CategoryDataType = RequiredDataFromCollectionSlug<'categories'>

export const categoriesData: CategoryDataType[] = [
  {
    name: 'Biryani',
    description:
      'Fragrant rice cooked in the traditional Hyderabadi dum style, layered with aromatic spices and tender meats or vegetables.',
    _status: 'published',
    slug: 'biryani',
  },
  {
    name: 'Chinese',
    description:
      'Desi-Chinese delicacies packed with bold flavors, featuring favorites like chow mein, fried rice, and manchurian.',
    _status: 'published',
    slug: 'chinese',
  },
  {
    name: 'Curries',
    description:
      'Rich and creamy Indian curries simmered with a blend of traditional spices, perfect with rice or naan.',
    _status: 'published',
    slug: 'curries',
  },
  {
    name: 'Desserts',
    description:
      'Classic Indian sweets like gulab jamun and rasmalai, along with delightful international treats.',
    _status: 'published',
    slug: 'desserts',
  },
  {
    name: 'Mocktails',
    description:
      'Refreshing Indian-inspired drinks, bursting with flavors of fresh fruits, herbs, and spices.',
    _status: 'published',
    slug: 'mocktails',
  },
  {
    name: 'Roti',
    description:
      'Soft, fluffy Indian breads like butter naan, tandoori roti, and roomali roti, baked to perfection.',
    _status: 'published',
    slug: 'roti',
  },
  {
    name: 'Soups',
    description:
      'Heartwarming soups with an Indian twist, from spicy tomato shorba to creamy lentil soups.',
    _status: 'published',
    slug: 'soups',
  },
  {
    name: 'Starters',
    description:
      'Tasty appetizers like crispy pakoras, spicy kebabs, and tangy chaats to kickstart your meal.',
    _status: 'published',
    slug: 'starters',
  },
]
