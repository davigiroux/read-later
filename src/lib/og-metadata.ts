/**
 * OG Metadata extraction utilities
 * Fetches Open Graph metadata from URLs for link previews
 */

export interface OGMetadata {
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  domain: string;
}

/**
 * Extract domain from URL (e.g., "https://vercel.com/blog/..." -> "vercel.com")
 */
export function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch {
    return '';
  }
}

/**
 * Fetch OG metadata from a URL
 * Uses regex parsing to extract meta tags (lightweight, no DOM parsing needed)
 */
export async function fetchOGMetadata(url: string): Promise<OGMetadata> {
  const domain = extractDomain(url);

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; LaterStack/1.0; +https://laterstack.com)',
        'Accept': 'text/html',
      },
      signal: AbortSignal.timeout(10000), // 10s timeout
    });

    if (!response.ok) {
      return { title: null, description: null, image: null, siteName: null, domain };
    }

    const html = await response.text();

    // Extract OG tags using regex (faster than DOM parsing)
    const getMetaContent = (property: string): string | null => {
      // Try og:property first
      const ogMatch = html.match(
        new RegExp(`<meta[^>]*property=["']og:${property}["'][^>]*content=["']([^"']*)["']`, 'i')
      ) || html.match(
        new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']og:${property}["']`, 'i')
      );
      if (ogMatch) return ogMatch[1];

      // Fallback to twitter:property
      const twitterMatch = html.match(
        new RegExp(`<meta[^>]*name=["']twitter:${property}["'][^>]*content=["']([^"']*)["']`, 'i')
      ) || html.match(
        new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']twitter:${property}["']`, 'i')
      );
      if (twitterMatch) return twitterMatch[1];

      // Fallback to standard meta for description
      if (property === 'description') {
        const descMatch = html.match(
          /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i
        ) || html.match(
          /<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i
        );
        if (descMatch) return descMatch[1];
      }

      return null;
    };

    // Extract title from og:title or <title> tag
    let title = getMetaContent('title');
    if (!title) {
      const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
      title = titleMatch ? titleMatch[1].trim() : null;
    }

    // Resolve relative image URLs to absolute
    let image = getMetaContent('image');
    if (image && !image.startsWith('http')) {
      try {
        image = new URL(image, url).href;
      } catch {
        image = null;
      }
    }

    return {
      title: title ? decodeHTMLEntities(title) : null,
      description: getMetaContent('description') ? decodeHTMLEntities(getMetaContent('description')!) : null,
      image,
      siteName: getMetaContent('site_name') ? decodeHTMLEntities(getMetaContent('site_name')!) : null,
      domain,
    };
  } catch (error) {
    console.error('Error fetching OG metadata:', error);
    return { title: null, description: null, image: null, siteName: null, domain };
  }
}

/**
 * Decode common HTML entities
 */
function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x27;/g, "'")
    .replace(/&#x2F;/g, '/');
}
