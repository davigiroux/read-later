/**
 * Article content extraction using Jina AI Reader API
 * Jina provides clean markdown output that works well with AI analysis
 */

export interface ScrapedArticle {
  title: string;
  content: string;
  wordCount: number;
}

/**
 * Extract article content from a URL using Jina AI Reader
 * @param url - The URL to scrape
 * @returns Scraped article with title, content (markdown), and word count
 * @throws Error with user-friendly message if extraction fails
 */
export async function extractArticleContent(
  url: string
): Promise<ScrapedArticle> {
  try {
    // Use Jina AI Reader API - provides clean markdown output
    const response = await fetch(`https://r.jina.ai/${url}`, {
      headers: {
        Accept: 'application/json',
      },
      signal: AbortSignal.timeout(10000), // 10 second timeout
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch content: ${response.statusText}`);
    }

    const data = await response.json();

    // Validate response has required fields
    if (!data.data?.content) {
      console.error('Jina API response missing content:', data);
      throw new Error(
        'Could not extract article content. The page might be dynamic or behind authentication.'
      );
    }

    // Calculate word count from markdown content
    const content = data.data.content;
    const wordCount = content.split(/\s+/).filter(Boolean).length;

    // Validate minimum content (detect paywalls/error pages)
    if (wordCount < 100) {
      throw new Error(
        'Article content too short. This might be a paywall or error page.'
      );
    }

    return {
      title: data.data.title || 'Untitled Article',
      content, // Clean markdown from Jina
      wordCount,
    };
  } catch (error) {
    // Handle timeout errors specifically
    if (error instanceof Error && error.name === 'TimeoutError') {
      throw new Error(
        'Request timed out. The site might be slow or unreachable.'
      );
    }

    // Re-throw if already a user-friendly error
    if (error instanceof Error) {
      throw error;
    }

    // Generic fallback
    throw new Error('Failed to extract article content. Please try again.');
  }
}
