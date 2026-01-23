import { NextResponse } from 'next/server';
import { fetchOGMetadata } from '@/lib/og-metadata';
import { z } from 'zod';

const PreviewSchema = z.object({
  url: z.string().url('Invalid URL'),
});

/**
 * GET /api/url-preview?url=<encoded-url>
 * Returns OG metadata for URL preview (no auth required)
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json({ error: 'URL parameter required' }, { status: 400 });
  }

  const parsed = PreviewSchema.safeParse({ url });
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 });
  }

  try {
    const metadata = await fetchOGMetadata(parsed.data.url);
    return NextResponse.json(metadata);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch URL preview' }, { status: 500 });
  }
}
