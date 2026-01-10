import { generateText } from 'ai';
import { model } from './ai';

export interface ArticleAnalysis {
  topics: string[];
  relevanceScore: number;
  reasoning: string;
}

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
    ? `Analyze this article and extract 3-5 key topics (as short phrases or single words).
Then, calculate how relevant this article is to the user based on their interests and goals.

User's Interests: ${userInterests.join(', ') || 'None specified'}
User's Goals: ${userGoals || 'None specified'}

Article Content:
${truncatedContent}

Respond in this exact JSON format:
{
  "topics": ["topic1", "topic2", "topic3"],
  "relevanceScore": 0.85,
  "reasoning": "Brief explanation of why this article matches or doesn't match the user's interests"
}

The relevanceScore should be between 0 and 1, where:
- 0.8-1.0: Highly relevant, directly related to user's interests
- 0.5-0.79: Moderately relevant, tangentially related
- 0.0-0.49: Less relevant, little connection to interests

Keep the reasoning concise (1-2 sentences).`
    : `Analyze this article and extract 3-5 key topics (as short phrases or single words).

Article Content:
${truncatedContent}

Respond in this exact JSON format:
{
  "topics": ["topic1", "topic2", "topic3"],
  "relevanceScore": 0,
  "reasoning": "User hasn't set interests yet, so relevance cannot be determined."
}`;

  try {
    const { text } = await generateText({
      model,
      prompt,
      temperature: 0.3, // Lower temperature for more consistent JSON output
    });

    // Parse the JSON response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('AI response did not contain valid JSON');
    }

    const analysis = JSON.parse(jsonMatch[0]) as ArticleAnalysis;

    // Validate and sanitize the response
    return {
      topics: Array.isArray(analysis.topics)
        ? analysis.topics.slice(0, 5).map((t) => String(t).slice(0, 50))
        : [],
      relevanceScore: Math.max(
        0,
        Math.min(1, Number(analysis.relevanceScore) || 0)
      ),
      reasoning: String(analysis.reasoning || '').slice(0, 500),
    };
  } catch (error) {
    console.error('AI analysis error:', error);

    // Fallback: basic topic extraction without AI
    const words = content
      .toLowerCase()
      .replace(/[^\w\s]/g, ' ')
      .split(/\s+/)
      .filter((w) => w.length > 5);

    const wordFreq: Record<string, number> = {};
    words.forEach((w) => {
      wordFreq[w] = (wordFreq[w] || 0) + 1;
    });

    const topWords = Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([word]) => word);

    return {
      topics: topWords,
      relevanceScore: 0,
      reasoning: 'AI analysis unavailable. Topics extracted from word frequency.',
    };
  }
}
