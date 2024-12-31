import process from 'process'

export const foodItemsData = [
  // Biryani
  {
    name: 'Chiranjeevi Biryani',
    description: 'Biryani served with Two pieces of Chicken, Salan, Raita',
    type: 'nonVeg',
    price: 320,
    special: true,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/biryani/chicken-biryani.webp',
        alt: 'Chiranjeevi Biryani',
      },
    ],
    category: ['biryani'],
  },
  {
    name: 'Mutton Dum Biryani',
    description: 'Biryani served with Two pieces of Mutton, Salan, Raita',
    type: 'nonVeg',
    price: 350,
    special: true,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/biryani/mutton-biryani.webp',
        alt: 'Mutton Dum Biryani',
      },
    ],
    category: ['biryani'],
  },
  {
    name: 'Prawn Biryani',
    description: 'Biryani served with spicy south-indian prawns',
    type: 'nonVeg',
    price: 380,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/biryani/prawn-biryani.webp',
        alt: 'Prawn Biryani',
      },
    ],
    category: ['biryani'],
  },
  {
    name: 'Mandi',
    description: 'Mandi Biryani served with Chicken curry & fry pieces',
    type: 'nonVeg',
    price: 420,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/biryani/mandi.webp',
        alt: 'Mandi',
      },
    ],
    category: ['biryani'],
  },
  // Chinese
  {
    name: 'Fried Rice',
    description:
      'Flavorful fried rice cooked with chicken, egg, vegetables and spices.',
    type: 'nonVeg',
    price: 180,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/chinese/fried-rice.webp',
        alt: 'Fried Rice',
      },
    ],
    category: ['chinese'],
  },
  {
    name: 'Momos',
    description: 'Steamed dumplings stuffed with flavorful chicken filling.',
    type: 'nonVeg',
    price: 240,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/chinese/momos.webp',
        alt: 'Momos',
      },
    ],
    category: ['chinese'],
  },
  {
    name: 'Noodles',
    description:
      'Classic noodles stir-fried with chicken, egg, vegetables & sauces.',
    type: 'nonVeg',
    price: 140,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/chinese/noodles.webp',
        alt: 'Noodles',
      },
    ],
    category: ['chinese'],
  },
  {
    name: 'Pasta',
    description: 'Creamy pasta cooked with a rich blend of sauces.',
    type: 'veg',
    price: 140,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/chinese/pasta.webp',
        alt: 'Pasta',
      },
    ],
    category: ['chinese'],
  },
  // Roti
  {
    name: 'Butter Naan',
    description: 'Soft naan bread glazed with butter.',
    type: 'veg',
    price: 80,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/roti/butter-naan.webp',
        alt: 'Butter naan',
      },
    ],
    category: ['roti'],
  },
  {
    name: 'Romali Roti',
    description: 'Thin and soft flatbread.',
    type: 'veg',
    price: 40,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/roti/romali-roti.webp',
        alt: 'Romali Roti',
      },
    ],
    category: ['roti'],
  },
  // Curries
  {
    name: 'Aloo Masala',
    description: 'Masala curry made with spiced potatoes.',
    type: 'veg',
    price: 100,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/curries/aloo-masala.webp',
        alt: 'Aloo masala',
      },
    ],
    category: ['curries'],
  },
  {
    name: 'Paneer Tikka Masala',
    description: 'Paneer cubes cooked in a rich and creamy tikka masala sauce.',
    type: 'veg',
    price: 140,
    special: true,
    imageURL: [
      {
        url:
          process.cwd() +
          '/public/images/seed/curries/panner-tikka-masala.webp',
        alt: 'Paneer Tikka masala',
      },
    ],
    category: ['curries'],
  },
  {
    name: 'Butter Chicken',
    description: 'Chicken cooked in a creamy tomato-based gravy.',
    type: 'nonVeg',
    price: 140,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/curries/butter-chicken.webp',
        alt: 'Butter Chicken',
      },
    ],
    category: ['curries'],
  },
  {
    name: 'Koramenu',
    description: 'Traditional fish curry with authentic spices.',
    type: 'nonVeg',
    price: 200,
    special: true,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/curries/koramenu.webp',
        alt: 'Koramenu',
      },
    ],
    category: ['curries'],
  },
  {
    name: 'Mogalai Mutton',
    description: 'Rich and flavorful Mogalai mutton curry.',
    type: 'nonVeg',
    price: 180,
    special: true,
    imageURL: [
      {
        url:
          process.cwd() +
          '/public/images/seed/curries/mogalai-mutton-curry.webp',
        alt: 'Mogalai Mutton',
      },
    ],
    category: ['curries'],
  },
  {
    name: 'Rayalaseema Kodi Kurra',
    description: 'Authentic chicken curry with Rayalaseema spices.',
    type: 'nonVeg',
    price: 160,
    special: true,
    imageURL: [
      {
        url:
          process.cwd() +
          '/public/images/seed/curries/rayalaseema-kodi-kurra.webp',
        alt: 'Rayalaseema Kodi Kurra',
      },
    ],
    category: ['curries'],
  },
  // Desserts
  {
    name: 'Gulab Jamun',
    description: 'Soft and juicy Gulab Jamun soaked in sugar syrup.',
    type: 'veg',
    price: 100,
    special: true,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/desserts/gulab-jamun.webp',
        alt: 'Gulab Jamun',
      },
    ],
    category: ['desserts'],
  },
  {
    name: 'Jelebi',
    description: 'Crispy and sweet Jelebi made fresh.',
    type: 'veg',
    price: 80,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/desserts/jelebi.webp',
        alt: 'Jelebi',
      },
    ],
    category: ['desserts'],
  },
  {
    name: 'Nuts Overloaded',
    description: 'Rich dessert loaded with assorted nuts.',
    type: 'veg',
    price: 160,
    special: false,
    imageURL: [
      {
        url:
          process.cwd() + '/public/images/seed/desserts/nuts-overloaded.webp',
        alt: 'Nuts Overloaded',
      },
    ],
    category: ['desserts'],
  },
  {
    name: 'Willy Wonka',
    description: 'Decadent chocolate dessert for sweet cravings.',
    type: 'veg',
    price: 150,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/desserts/willy-wonka.webp',
        alt: 'Willy Wonka',
      },
    ],
    category: ['desserts'],
  },
  // Mocktails
  {
    name: 'Fresh Lime Soda',
    description: 'Refreshing soda with fresh lime flavor.',
    type: 'veg',
    price: 100,
    special: false,
    imageURL: [
      {
        url:
          process.cwd() + '/public/images/seed/mocktails/fresh-lime-soda.webp',
        alt: 'Fresh Lime Soda',
      },
    ],
    category: ['mocktails'],
  },
  {
    name: 'Pineapple Punch',
    description: 'Tropical pineapple punch with a zesty twist.',
    type: 'veg',
    price: 130,
    special: false,
    imageURL: [
      {
        url:
          process.cwd() + '/public/images/seed/mocktails/pineapple-punch.webp',
        alt: 'Pineapple Punch',
      },
    ],
    category: ['mocktails'],
  },
  {
    name: 'Red Lady',
    description: 'Signature mocktail with a fruity red blend.',
    type: 'veg',
    price: 170,
    special: true,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/mocktails/red-lady.webp',
        alt: 'Red Lady',
      },
    ],
    category: ['mocktails'],
  },
  {
    name: 'Virgin Mojito',
    description: 'Classic mojito with fresh mint and lime.',
    type: 'veg',
    price: 170,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/mocktails/virgin-mojito.webp',
        alt: 'Virtual Mojito',
      },
    ],
    category: ['mocktails'],
  },
  // Soup
  {
    name: 'Chicken Hot & Sour Soup',
    description: 'Spicy and tangy thick chicken soup.',
    type: 'nonVeg',
    price: 120,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/soup/chicken-soup.webp',
        alt: 'Chicken Hot & Sour Soup',
      },
    ],
    category: ['soups'],
  },
  {
    name: 'Veg Soup',
    description: 'Light and healthy vegetable soup.',
    type: 'veg',
    price: 80,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/soup/veg-soup.webp',
        alt: 'Veg Soup',
      },
    ],
    category: ['soups'],
  },
  // Starters
  {
    name: 'Gobi Fry',
    description: 'Crispy fried cauliflower with spices.',
    type: 'veg',
    price: 80,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/starters/gobi-fry.webp',
        alt: 'Gobi Fry',
      },
    ],
    category: ['starters'],
  },
  {
    name: 'Veg Cutlet',
    description: 'Crispy vegetable cutlets seasoned with spices.',
    type: 'veg',
    price: 140,
    special: true,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/starters/veg-cutlet.webp',
        alt: 'Veg Cutlet',
      },
    ],
    category: ['starters'],
  },
  {
    name: 'Chicken Lollipop',
    description: 'Spicy and tangy chicken drumsticks fried to perfection.',
    type: 'nonVeg',
    price: 140,
    special: false,
    imageURL: [
      {
        url:
          process.cwd() + '/public/images/seed/starters/chicken-lollipop.webp',
        alt: 'Chicken Lollipop',
      },
    ],
    category: ['starters'],
  },
  {
    name: 'Chicken Tandoori',
    description: 'Char-grilled chicken marinated with spices.',
    type: 'nonVeg',
    price: 180,
    special: true,
    imageURL: [
      {
        url:
          process.cwd() + '/public/images/seed/starters/chicken-tandoori.webp',
        alt: 'Chicken Tandoori',
      },
    ],
    category: ['starters'],
  },
  {
    name: 'French Fries',
    description: 'Crispy fries seasoned with salt.',
    type: 'veg',
    price: 100,
    special: false,
    imageURL: [
      {
        url: process.cwd() + '/public/images/seed/starters/french-fries.webp',
        alt: 'French Fries',
      },
    ],
    category: ['starters'],
  },
  {
    name: 'Peri Peri Chicken',
    description: 'Spicy grilled chicken with peri-peri seasoning.',
    type: 'nonVeg',
    price: 160,
    special: false,
    imageURL: [
      {
        url:
          process.cwd() + '/public/images/seed/starters/peri-peri-chicken.webp',
        alt: 'Peri Peri Chicken',
      },
    ],
    category: ['starters'],
  },
] as const
