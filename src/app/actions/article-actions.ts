'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { db } from '@/lib/db';

export interface ArticleActionResult {
  success: boolean;
  error?: string;
}

/**
 * Mark a saved article as read
 */
export async function markAsRead(itemId: string): Promise<ArticleActionResult> {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return { success: false, error: 'You must be signed in' };
    }

    // Find the database user by Clerk ID
    const user = await db.user.findUnique({
      where: { clerkId: clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Verify ownership
    const item = await db.savedItem.findUnique({
      where: { id: itemId },
      select: { userId: true },
    });

    if (!item) {
      return { success: false, error: 'Article not found' };
    }

    if (item.userId !== user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Mark as read
    await db.savedItem.update({
      where: { id: itemId },
      data: { readAt: new Date() },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error marking article as read:', error);
    return { success: false, error: 'Failed to mark article as read' };
  }
}

/**
 * Mark a saved article as unread
 */
export async function markAsUnread(itemId: string): Promise<ArticleActionResult> {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return { success: false, error: 'You must be signed in' };
    }

    // Find the database user by Clerk ID
    const user = await db.user.findUnique({
      where: { clerkId: clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Verify ownership
    const item = await db.savedItem.findUnique({
      where: { id: itemId },
      select: { userId: true },
    });

    if (!item) {
      return { success: false, error: 'Article not found' };
    }

    if (item.userId !== user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Mark as unread
    await db.savedItem.update({
      where: { id: itemId },
      data: { readAt: null },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error marking article as unread:', error);
    return { success: false, error: 'Failed to mark article as unread' };
  }
}

/**
 * Archive a saved article
 */
export async function archiveItem(itemId: string): Promise<ArticleActionResult> {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return { success: false, error: 'You must be signed in' };
    }

    // Find the database user by Clerk ID
    const user = await db.user.findUnique({
      where: { clerkId: clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Verify ownership
    const item = await db.savedItem.findUnique({
      where: { id: itemId },
      select: { userId: true },
    });

    if (!item) {
      return { success: false, error: 'Article not found' };
    }

    if (item.userId !== user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Archive the article
    await db.savedItem.update({
      where: { id: itemId },
      data: { archivedAt: new Date() },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error archiving article:', error);
    return { success: false, error: 'Failed to archive article' };
  }
}

/**
 * Unarchive a saved article
 */
export async function unarchiveItem(itemId: string): Promise<ArticleActionResult> {
  try {
    const { userId: clerkUserId } = await auth();
    if (!clerkUserId) {
      return { success: false, error: 'You must be signed in' };
    }

    // Find the database user by Clerk ID
    const user = await db.user.findUnique({
      where: { clerkId: clerkUserId },
      select: { id: true },
    });

    if (!user) {
      return { success: false, error: 'User not found' };
    }

    // Verify ownership
    const item = await db.savedItem.findUnique({
      where: { id: itemId },
      select: { userId: true },
    });

    if (!item) {
      return { success: false, error: 'Article not found' };
    }

    if (item.userId !== user.id) {
      return { success: false, error: 'Unauthorized' };
    }

    // Unarchive the article
    await db.savedItem.update({
      where: { id: itemId },
      data: { archivedAt: null },
    });

    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Error unarchiving article:', error);
    return { success: false, error: 'Failed to unarchive article' };
  }
}
