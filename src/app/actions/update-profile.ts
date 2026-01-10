'use server';

import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { db } from '@/lib/db';

// Validation schema
const UpdateProfileSchema = z.object({
  interests: z.string().transform((val) =>
    val.split(',').map((i) => i.trim()).filter(Boolean)
  ),
  goals: z.string().max(500, 'Goals must be 500 characters or less'),
  readingSpeed: z.coerce.number().min(50).max(1000),
});

export interface UpdateProfileResult {
  success: boolean;
  error?: string;
}

export async function updateProfile(
  formData: FormData
): Promise<UpdateProfileResult> {
  try {
    const { userId } = await auth();
    if (!userId) {
      return { success: false, error: 'Unauthorized' };
    }

    const parsed = UpdateProfileSchema.safeParse({
      interests: formData.get('interests'),
      goals: formData.get('goals'),
      readingSpeed: formData.get('readingSpeed'),
    });

    if (!parsed.success) {
      const error = parsed.error.issues[0]?.message || 'Invalid input';
      return { success: false, error };
    }

    const { interests, goals, readingSpeed } = parsed.data;

    // Update user profile
    await db.user.update({
      where: { clerkId: userId },
      data: {
        interests,
        goals,
        readingSpeed,
      },
    });

    revalidatePath('/settings');
    revalidatePath('/dashboard');

    return { success: true };
  } catch (error) {
    console.error('Error updating profile:', error);
    return {
      success: false,
      error: 'Failed to update profile. Please try again.',
    };
  }
}
