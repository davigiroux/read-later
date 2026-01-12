// Define types based on Prisma schema since client may not be generated
export interface User {
  id: string
  clerkId: string
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
  interests: string[]
  goals: string
  readingSpeed: number
}

export interface SavedItem {
  id: string
  userId: string
  url: string
  title: string
  content: string
  estimatedTime: number
  topics: string[]
  relevanceScore: number
  reasoning: string
  savedAt: Date
  readAt: Date | null
  archivedAt: Date | null
}

export interface SaveItemInput {
  url: string
  userId: string
}

export interface AIAnalysis {
  topics: string[]
  relevanceScore: number
  reasoning: string
  estimatedTime: number
}
