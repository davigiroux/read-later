import { generateObject } from 'ai';
import { model } from './ai';
import { z } from 'zod';

// Define Zod schema for AI response
const ArticleAnalysisSchema = z.object({
  topics: z.array(
    z.string().refine(
      (topic) => topic.trim().split(/\s+/).length <= 2,
      { message: 'Each topic must be 1-2 words maximum' }
    )
  ).max(5).describe('3-5 concise topics (1-2 words each) from the article'),
  relevanceScore: z.number().min(0).max(1).describe('Relevance score between 0 and 1'),
  reasoning: z.string().max(500).describe('Brief explanation of relevance (1-2 sentences)'),
});

export type ArticleAnalysis = z.infer<typeof ArticleAnalysisSchema>;

/**
 * Analyze article content using AI to extract topics and calculate relevance
 * @param content - The article content (markdown)
 * @param userInterests - User's stated interests (empty array if none)
 * @param userGoals - User's reading goals (empty string if none)
 * @returns Analysis with topics, relevance score, and reasoning
 */
export async function analyzeArticle(
  content: string,
  userInterests: string[],
  userGoals: string
): Promise<ArticleAnalysis> {
  // Truncate content if too long (Gemini has token limits)
  const truncatedContent = content.slice(0, 15000);

  // Build the prompt
  const hasInterests = userInterests.length > 0 || userGoals;

  const prompt = hasInterests
    ? `Analyze this article and extract 3-5 key topics. Each topic MUST be concise, using only 1-2 words maximum.
Calculate how relevant this article is to the user based on their interests and goals.

User's Interests: ${userInterests.join(', ') || 'None'}
User's Goals: ${userGoals || 'None'}

Article Content:
${truncatedContent}

Topic Guidelines:
- Use ONLY 1-2 words per topic (e.g., "React", "Machine Learning", "TypeScript", "API Design")
- Be objective and specific
- Avoid lengthy phrases or full sentences

Relevance Score Guidelines:
- 0.8-1.0: Highly relevant, directly related to interests
- 0.5-0.79: Moderately relevant, tangentially related
- 0.0-0.49: Less relevant, little connection`
    : `Analyze this article and extract 3-5 key topics. Each topic MUST be concise, using only 1-2 words maximum.
Set relevance score to 0 since user hasn't specified interests yet.

Article Content:
${truncatedContent}

Topic Guidelines:
- Use ONLY 1-2 words per topic (e.g., "React", "Machine Learning", "TypeScript", "API Design")
- Be objective and specific
- Avoid lengthy phrases or full sentences`;

  try {
    const { object } = await generateObject({
      model,
      schema: ArticleAnalysisSchema,
      prompt,
      temperature: 0.3,
    });

    // Response is already validated by Zod, just return it
    return object;
  } catch (error) {
    console.error('AI analysis error:', error);

    // Fallback: basic topic extraction without AI
    const words = content
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 4); // Shorter minimum for better topic extraction

    const wordFreq: Record<string, number> = {};
    words.forEach((w) => {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    });

    // Extract top 5 most frequent words as concise single-word topics
    const topWords = Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word.charAt(0).toUpperCase() + word.slice(1)); // Capitalize first letter

    return {
      topics: topWords,
      relevanceScore: 0,
      reasoning: 'AI analysis unavailable. Topics extracted from word frequency.',
    };
  }
}
