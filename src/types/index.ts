import { SavedItem, User } from '@prisma/client'

export type { SavedItem, User }

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
