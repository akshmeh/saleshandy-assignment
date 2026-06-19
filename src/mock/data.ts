import { Product, Category, Coupon, UserProfile, Order } from '../types';

export const CATEGORIES: Category[] = [
  {
    id: 'cat-1',
    name: 'Smart Audio',
    slug: 'smart-audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
    description: 'High-fidelity acoustic nodes, professional studio gear, and noise-canceling headphones.'
  },
  {
    id: 'cat-2',
    name: 'Aesthetic Tech',
    slug: 'aesthetic-tech',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=600&q=80',
    description: 'Beautifully integrated peripherals, mechanical keyboards, charging docks, and workstations.'
  },
  {
    id: 'cat-3',
    name: 'Minimalist Apparel',
    slug: 'minimalist-apparel',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80',
    description: 'Heavyweight organic textile silhouettes, unisex fit garments, and functional tailoring.'
  },
  {
    id: 'cat-4',
    name: 'Curated Wellness',
    slug: 'curated-wellness',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    description: 'Quiet-mist room atomizers, custom-blended aromatics, and intentional daily recovery nodes.'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Aether Over-Ear Headphones',
    slug: 'aether-headphones',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, sunt, perspiciatis illum rem excepturi voluptatum porro quos eos, tempore',
    price: 349,
    compareAtPrice: 399,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'smart-audio',
    brand: 'AetherLabs',
    rating: 4.85,
    reviewsCount: 142,
    stock: 24,
    variants: {
      colors: [
        { name: 'Alabaster White', hex: '#faf9f6' },
        { name: 'Space Charcoal', hex: '#1e1e24' },
        { name: 'Nordic Sage', hex: '#879b8a' }
      ],
      sizes: ['Standard']
    },
    specifications: {
      'Driver Size': '40mm Dynamic',
      'Battery Life': 'Up to 48 Hours',
      'Noise Cancelling': 'Hybrid ANC (36dB depth)',
      'Connectivity': 'Bluetooth 5.3 / USB-C Audio / 3.5mm Aux',
      'Weight': '255g'
    },
    isNew: true,
    isTrending: true
  },
  {
    id: 'prod-2',
    name: 'Grid-84 Mechanical Workstation Keyboard',
    slug: 'grid-84-keyboard',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, sunt, perspiciatis illum rem excepturi voluptatum porro quos eos, tempore',
    price: 189,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1626958011299-6b223000dfb5?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'aesthetic-tech',
    brand: 'GridSystems',
    rating: 4.92,
    reviewsCount: 88,
    stock: 12,
    variants: {
      colors: [
        { name: 'Stealth Silver', hex: '#c5c5c7' },
        { name: 'Obsidian Black', hex: '#111112' }
      ],
      sizes: ['Linear (Quiet)', 'Tactile (Clicky)']
    },
    specifications: {
      'Layout': '75% (84-Key)',
      'Material': '6063 Aluminum Alloy Body',
      'Switches': 'Custom Cream Linear Pre-lubed',
      'Backlight': 'Subtle White Ambient Underglow',
      'Interface': 'Detachable coiled USB-C'
    },
    isTrending: true
  },
  {
    id: 'prod-3',
    name: 'Ohm Ultrasonic Aroma Atomizer',
    slug: 'ohm-atomizer',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, sunt, perspiciatis illum rem excepturi voluptatum porro quos eos, tempore',
    price: 79,
    compareAtPrice: 95,
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1602928321679-560bb453f190?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'curated-wellness',
    brand: 'OhmLife',
    rating: 4.76,
    reviewsCount: 204,
    stock: 45,
    variants: {
      colors: [
        { name: 'Volcanic Gray', hex: '#5e5e60' },
        { name: 'Sand White', hex: '#dedbd2' }
      ],
      sizes: ['150ml (Compact)', '300ml (Standard)']
    },
    specifications: {
      'Mist output': '25-35ml/hour',
      'Coverage Area': 'Up to 350 sq ft',
      'Power Source': 'Type-C USB Adapter',
      'Auto-Off': 'Automatic safety cutoff when dry',
      'Quiet Depth': '<20dB (Silent Whisper)'
    },
    isNew: true
  },
  {
    id: 'prod-4',
    name: 'Shift Raw Denim Work Jacket',
    slug: 'shift-work-jacket',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, sunt, perspiciatis illum rem excepturi voluptatum porro quos eos, tempore',
    price: 210,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'minimalist-apparel',
    brand: 'ShiftTextiles',
    rating: 4.8,
    reviewsCount: 71,
    stock: 18,
    variants: {
      colors: [
        { name: 'Indigo Selvedge', hex: '#1a2b4c' },
        { name: 'Off-Black Canvas', hex: '#212121' }
      ],
      sizes: ['S', 'M', 'L', 'XL']
    },
    specifications: {
      'Material': '100% Selvedge Heavyweight Cotton Denim',
      'Hardware': 'Oxidized Brass buttons',
      'Fit': 'Relatively Slim Utilitarian Boxy Cut',
      'Origin': 'Sourced & Tailored in Okayama, Japan',
      'Care': 'Cold wash inside out, drip dry'
    },
    isTrending: false
  },
  {
    id: 'prod-5',
    name: 'Core Lumina Magnetic Charging Block',
    slug: 'core-lumina-dock',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, sunt, perspiciatis illum rem excepturi voluptatum porro quos eos, tempore',
    price: 129,
    images: [
      'https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'aesthetic-tech',
    brand: 'GridSystems',
    rating: 4.69,
    reviewsCount: 52,
    stock: 15,
    variants: {
      colors: [
        { name: 'Carrara Marble', hex: '#efefe8' },
        { name: 'Nero Marquina', hex: '#19191d' }
      ],
      sizes: ['Single Stand', 'Dual Charging Base']
    },
    specifications: {
      'Input power': '9V/3A, 12V/2A',
      'Output strength': 'Up to 15W MagSafe + 5W Audio Node Slot',
      'Cabinet Dimensions': '110mm x 110mm x 85mm',
      'Net Weight': '1180g (Solid Marble Block)',
      'Cable Include': '1.5m Braided USB-C to USB-C cable'
    },
    isNew: true
  },
  {
    id: 'prod-6',
    name: 'Aether Pods Active Noice Buds',
    slug: 'aether-pods',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, sunt, perspiciatis illum rem excepturi voluptatum porro quos eos, tempore',
    price: 199,
    compareAtPrice: 229,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608156639585-b3a032ef9689?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'smart-audio',
    brand: 'AetherLabs',
    rating: 4.79,
    reviewsCount: 312,
    stock: 40,
    variants: {
      colors: [
        { name: 'Ceramic White', hex: '#f6f6f6' },
        { name: 'Obsidian Sheen', hex: '#111215' }
      ],
      sizes: ['Standard']
    },
    specifications: {
      'Ambient ANC': 'Up to 40dB Reduction',
      'Waterproof': 'IPX5 Sweat & Moisture Resistant',
      'Chassis Capacity': '6 Hours Buds + 24 Hours Charging Capsule',
      'Proximity Hook': 'Fast Bluetooth Pairing with Smart Assist'
    },
    isTrending: true
  },
  {
    id: 'prod-7',
    name: 'Chronos Heavy Merino Desk Pad',
    slug: 'chronosdesk-pad',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, sunt, perspiciatis illum rem excepturi voluptatum porro quos eos, tempore',
    price: 65,
    images: [
      'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'aesthetic-tech',
    brand: 'OhmLife',
    rating: 4.88,
    reviewsCount: 95,
    stock: 32,
    variants: {
      colors: [
        { name: 'Merino Oatmeal', hex: '#dbd7ce' },
        { name: 'Merino Deep Slate', hex: '#404146' }
      ],
      sizes: ['Medium (600x300mm)', 'Large (850x400mm)']
    },
    specifications: {
      'Density thickness': '4mm structural compression',
      'Material': '85% Australian Merino, 15% Latex Anti-slip Back',
      'Thermal Shield': 'Effective barrier keeping desk surfaces safe',
      'Antistatic': 'Natural static absorption surface'
    }
  },
  {
    id: 'prod-8',
    name: 'Tempo Minimal organic Cotton Crew',
    slug: 'tempo-crew-sweat',
    description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti, sunt, perspiciatis illum rem excepturi voluptatum porro quos eos, tempore',
    price: 95,
    compareAtPrice: 110,
    images: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=800&q=80'
    ],
    category: 'minimalist-apparel',
    brand: 'ShiftTextiles',
    rating: 4.71,
    reviewsCount: 110,
    stock: 20,
    variants: {
      colors: [
        { name: 'Desert Pebble', hex: '#cac2b5' },
        { name: 'Forest Moss', hex: '#4e5647' },
        { name: 'Steel Ash', hex: '#6f727a' }
      ],
      sizes: ['S', 'M', 'L', 'XL']
    },
    specifications: {
      'Weight density': '420 GSM heavyweight knit',
      'Fabric Composition': '100% GOTS Certified Organic Cotton',
      'Seaming Grid': 'Anti-stretch custom reinforced bias neckline',
      'Colors dye': 'Natural non-toxic mineral pigment dye baths'
    },
    isNew: true
  }
];

export const COUPONS: Coupon[] = [
  { code: 'STUDIODEMO', discountType: 'percentage', value: 15 },
  { code: 'MINIMALST', discountType: 'fixed', value: 25, minSpend: 150 },
  { code: 'AIPURPLE', discountType: 'percentage', value: 20 }
];

export const DEFAULT_USER: UserProfile = {
  firstName: 'Akshat',
  lastName: 'Mehta',
  email: 'rishimehta257428@gmail.com',
  phone: '+91 8879908493',
  avatar:"",
  addresses: [
    {
      id: 'addr-1',
      name: 'Primary Work Space',
      street: '502,503 Dwarkesh Business Hub, Opp. Visamo Society, Visat Gandhinagar Highway, Motera, Chandkheda',
      city: 'Ahmedabad',
      state: 'Gujarat',
      postalCode: '382424',
      country: 'India',
      phone: '+91 8879908493',
      isDefault: true
    },
    {
      id: 'addr-2',
      name: 'Home',
      street: 'Malad',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400097',
      country: 'India',
      phone: '+91 8879908493',
      isDefault: false
    }
  ],
  paymentMethods: [
    {
      id: 'pay-1',
      type: 'card',
      last4: '4242',
      expiry: '12/28'
    },
    {
      id: 'pay-2',
      type: 'paypal',
      email: 'rishimehta257428@gamil.com'
    }
  ]
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-1002',
    orderNumber: 'PROD-5982',
    date: '2026-06-10T14:32:00Z',
    items: [
      {
        id: 'prod-2_Tactile (Clicky)_#c5c5c7',
        product: PRODUCTS[1], // Keyboard
        selectedSize: 'Tactile (Clicky)',
        selectedColor: { name: 'Stealth Silver', hex: '#c5c5c7' },
        quantity: 1
      },
      {
        id: 'prod-7_Medium (600x300mm)_#404146',
        product: PRODUCTS[6], // Desk Pad
        selectedSize: 'Medium (600x300mm)',
        selectedColor: { name: 'Merino Deep Slate', hex: '#404146' },
        quantity: 1
      }
    ],
    shippingAddress: DEFAULT_USER.addresses[0],
    billingAddress: DEFAULT_USER.addresses[0],
    paymentMethod: 'Visa ending in 4242',
    subtotal: 254,
    shippingCost: 0,
    discount: 38.1,
    total: 215.9,
    status: 'delivered',
    trackingNumber: 'USPS-PROD-9482902',
    timeline: [
      {
        status: 'pending',
        title: 'Order Placed',
        description: 'Your purchase has been recorded successfully. Authorized payment capture.',
        timestamp: '2026-06-10T14:32:00Z'
      },
      {
        status: 'processing',
        title: 'Prepared for Dispatch',
        description: 'Carefully packaged and sealed in customized eco-conscious containers at our Mountain View node.',
        timestamp: '2026-06-10T18:15:00Z'
      },
      {
        status: 'shipped',
        title: 'Dispatched from Hub',
        description: 'Tendered to USPS distribution hub in San Jose, CA.',
        timestamp: '2026-06-11T09:30:00Z'
      },
      {
        status: 'delivered',
        title: 'Delivered',
        description: 'Package secured at front entry path. Enjoy your workstation refresh.',
        timestamp: '2026-06-12T15:40:00Z'
      }
    ]
  },
  {
    id: 'ord-1003',
    orderNumber: 'PROD-8839',
    date: '2026-06-17T09:12:00Z',
    items: [
      {
        id: 'prod-1_Standard_#faf9f6',
        product: PRODUCTS[0], // Over-ear Headphones
        selectedSize: 'Standard',
        selectedColor: { name: 'Alabaster White', hex: '#faf9f6' },
        quantity: 1
      }
    ],
    shippingAddress: DEFAULT_USER.addresses[1],
    billingAddress: DEFAULT_USER.addresses[1],
    paymentMethod: 'PayPal (rishimehta257428@example.com)',
    subtotal: 349,
    shippingCost: 8,
    discount: 0,
    total: 357,
    status: 'shipped',
    trackingNumber: 'FedEx-STUDIO-88129031',
    timeline: [
      {
        status: 'pending',
        title: 'Order Completed',
        description: 'Secure authorization capture successful.',
        timestamp: '2026-06-17T09:12:00Z'
      },
      {
        status: 'processing',
        title: 'Precision Calibration Checked',
        description: 'Verified battery load balance and audio firmware version alignment before sealing.',
        timestamp: '2026-06-17T14:22:00Z'
      },
      {
        status: 'shipped',
        title: 'Handover to Logistics',
        description: 'Transit parcel routing scan at logistics portal. Destination: Mumbai.',
        timestamp: '2026-06-18T06:45:00Z'
      }
    ]
  }
];
