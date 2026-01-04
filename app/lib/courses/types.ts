export type CourseCategory =
  | "math"
  | "programming"
  | "systems"
  | "data-science"

export type Course = {
  slug: string
  category: CourseCategory

  level: "Beginner" | "Intermediate" | "Advanced"

  catalog: {
    title: string
    author: string
    coverUrl: string
    rating?: number
    reviewsCount?: number
    durationHours?: number
  }

  hero: {
    title: string
    tagline: string
    description: string
    format: string
    bundle?: string
  }

  pricing: {
    price: number
    currency: "USD" | "EUR" | "RUB"
  }

  learningOutcomes: string[]

  about: {
    paragraphs: string[]
  }

  whyStudy?: {
    intro: string
    benefits: string[]
  }

  targetAudience?: string[]
  prerequisites?: string[]
  howItWorks?: string[]

  curriculum: {
    title: string
    focus?: string
    topics: string[]
  }[]
}
