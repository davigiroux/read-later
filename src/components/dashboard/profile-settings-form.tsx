'use client';

import { useState, useTransition } from 'react';
import { Loader2, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { updateProfile } from '@/app/actions/update-profile';

interface ProfileSettingsFormProps {
  interests: string[];
  goals: string;
  readingSpeed: number;
}

export function ProfileSettingsForm({
  interests,
  goals,
  readingSpeed,
}: ProfileSettingsFormProps) {
  const [interestsInput, setInterestsInput] = useState(interests.join(', '));
  const [goalsInput, setGoalsInput] = useState(goals);
  const [speedInput, setSpeedInput] = useState(readingSpeed.toString());
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('interests', interestsInput);
    formData.append('goals', goalsInput);
    formData.append('readingSpeed', speedInput);

    startTransition(async () => {
      const result = await updateProfile(formData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.error || 'Failed to update profile');
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="interests"
          className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2"
        >
          Your Interests
        </label>
        <Input
          id="interests"
          type="text"
          placeholder="e.g., JavaScript, AI, Web Development, React"
          value={interestsInput}
          onChange={(e) => setInterestsInput(e.target.value)}
          disabled={isPending}
        />
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Comma-separated list of topics you're interested in
        </p>
      </div>

      <div>
        <label
          htmlFor="goals"
          className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2"
        >
          Reading Goals
        </label>
        <textarea
          id="goals"
          rows={3}
          placeholder="What do you want to learn or achieve through reading?"
          value={goalsInput}
          onChange={(e) => setGoalsInput(e.target.value)}
          disabled={isPending}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          maxLength={500}
        />
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          {goalsInput.length}/500 characters
        </p>
      </div>

      <div>
        <label
          htmlFor="readingSpeed"
          className="block text-sm font-medium text-zinc-900 dark:text-zinc-50 mb-2"
        >
          Reading Speed (words per minute)
        </label>
        <Input
          id="readingSpeed"
          type="number"
          min="50"
          max="1000"
          value={speedInput}
          onChange={(e) => setSpeedInput(e.target.value)}
          disabled={isPending}
        />
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Average: 250 WPM. This helps calculate estimated reading times.
        </p>
      </div>

      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-3 py-2 rounded-md">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-3 py-2 rounded-md">
          Profile updated successfully!
        </div>
      )}

      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-2" />
            Saving...
          </>
        ) : (
          <>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </>
        )}
      </Button>
    </form>
  );
}
