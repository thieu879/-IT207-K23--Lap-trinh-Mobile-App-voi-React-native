export type Product = {
  id: string
  name: string
  price: number
  image: string
  description: string
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Modern Chair',
    price: 150,
    image:
      'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1887&auto=format&fit=crop',
    description:
      'A very comfortable and modern chair for your living room. Made with high-quality materials and designed for both style and comfort.',
  },
  {
    id: '2',
    name: 'Minimalist Lamp',
    price: 80,
    image:
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1887&auto=format&fit=crop',
    description:
      'Minimalist lamp that brings warm light to your space. Perfect for working, reading and relaxing.',
  },
  {
    id: '3',
    name: 'Wooden Table',
    price: 240,
    image:
      'https://images.unsplash.com/photo-1582582429416-2a7f7bba1b40?q=80&w=1887&auto=format&fit=crop',
    description:
      'Solid wooden table with natural finish. Durable and elegant for any room.',
  },
]



