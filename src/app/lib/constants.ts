import { Product } from './types'

export const trendingProducts: Product[] = [
  {
    id: 1,
    name: "Time Management Mastery",
    ageGroup: "12-14",
    price: 17.99,
    originalPrice: 34.99,
    discountPercentage: 49,
    previewUrl: "/previews/planner.jpg",
    slug: "time-management",
    shortDescription: "Daily schedule templates & productivity guides"
  },
  {
    id: 2,
    name: "Space Math Adventure",
    ageGroup: "9-11",
    price: 14.99,
    originalPrice: 24.99,
    discountPercentage: 40,
    previewUrl: "/previews/space-math.jpg",
    slug: "space-math",
    shortDescription: "Interactive math problems with space theme"
  },
  {
    id: 3,
    name: "Creative Writing Kit",
    ageGroup: "12-14",
    price: 19.99,
    originalPrice: 29.99,
    discountPercentage: 33,
    previewUrl: "/previews/writing-kit.jpg",
    slug: "creative-writing",
    shortDescription: "Story starters & creative writing prompts"
  },
  {
    id: 4,
    name: "Science Experiment Pack",
    ageGroup: "10-12",
    price: 22.99,
    originalPrice: 32.99,
    discountPercentage: 30,
    previewUrl: "/previews/science-kit.jpg",
    slug: "science-experiments",
    shortDescription: "10 safe home science experiments"
  }
]