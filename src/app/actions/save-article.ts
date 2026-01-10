'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';
import { extractArticleContent } from '@/lib/scraper';
import { analyzeArticle } from '@/lib/ai-analyzer';

// Validation schema for URL input
const SaveArticleSchema = z.object({
  url: z.string().url('Please enter a valid URL').startsWith('http', {
    message: 'URL must start with http:// or https://',
  }),
});

export interface SaveArticleResult {
  success: boolean;
  itemId?: string;
  error?: string;
}

/**
 * Server action to save an article from a URL
 * Extracts content, calculates reading time, and stores in database
 */
export async function saveArticle(
  formData: FormData
): Promise<SaveArticleResult> {
  try {
    // 1. Authenticate user
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'You must be signed in to save articles' };
    }

    // 2. Validate URL input
    const url = formData.get('url') as string;
    const parsed = SaveArticleSchema.safeParse({ url });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || 'Invalid URL';
      return { success: false, error };
    }

    const validatedUrl = parsed.data.url;

    // 3. Find or create user in database (handles webhook race condition)
    let user = await db.user.findUnique({
      where: { clerkId: userId },
    });

    if (!user) {
      // User not synced yet via webhook, create now
      try {
        const client = await clerkClient();
        const clerkUser = await client.users.getUser(userId);

        user = await db.user.create({
          data: {
            clerkId: userId,
            email: clerkUser.emailAddresses[0]?.emailAddress || '',
            name: `${clerkUser.firstName || ''} ${clerkUser.lastName || ''}`.trim() || null,
            interests: [],
            goals: '',
            readingSpeed: 250,
          },
        });
      } catch (error: any) {
        // User was created by webhook between our check and create attempt
        if (error.code === 'P2002') {
          user = await db.user.findUnique({
            where: { clerkId: userId },
          });
        } else {
          throw error;
        }
      }
    }

    // Ensure user exists
    if (!user) {
      return {
        success: false,
        error: 'Failed to create or find user account. Please try again.',
      };
    }

    // 4. Check if URL already saved
    const existing = await db.savedItem.findFirst({
      where: {
        userId: user.id,
        url: validatedUrl,
      },
    });

    if (existing) {
      return {
        success: false,
        error: "You've already saved this article!",
      };
    }

    // 5. Extract article content using Jina AI Reader
    const article = await extractArticleContent(validatedUrl);

    // 6. Calculate estimated reading time
    const estimatedTime = Math.max(
      1,
      Math.ceil(article.wordCount / user.readingSpeed)
    );

    // 7. Analyze article with AI (Phase 2)
    const analysis = await analyzeArticle(
      article.content,
      user.interests,
      user.goals
    );

    // 8. Save to database
    const savedItem = await db.savedItem.create({
      data: {
        userId: user.id,
        url: validatedUrl,
        title: article.title,
        content: article.content,
        estimatedTime,
        topics: analysis.topics,
        relevanceScore: analysis.relevanceScore,
        reasoning: analysis.reasoning,
      },
    });

    // 9. Revalidate dashboard to show new article
    revalidatePath('/dashboard');

    return {
      success: true,
      itemId: savedItem.id,
    };
  } catch (error) {
    // Log error for debugging
    console.error('Error saving article:', error);

    // Return user-friendly error message
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
      };
    }

    return {
      success: false,
      error: 'Something went wrong. Please try again.',
    };
  }
}
