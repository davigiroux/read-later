'use client';

import { useState, useTransition } from 'react';
import { Loader2, Save, Moon, Sun, Monitor } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GoalsList, type Goal } from '@/components/settings/goals-list';
import { InterestsTags } from '@/components/settings/interests-tags';
import { updateProfile } from '@/app/actions/update-profile';
import { cn } from '@/lib/utils';

interface EnhancedSettingsFormProps {
  interests: string[];
  goals: string;
  readingSpeed: number;
}

const defaultGoals: Goal[] = [
  { id: '1', name: 'Learn new technologies', description: 'Stay up to date with latest tech' },
  { id: '2', name: 'Improve coding skills', description: 'Best practices and patterns' },
  { id: '3', name: 'Career growth', description: 'Leadership and professional development' },
];

type Theme = 'light' | 'dark' | 'system';

export function EnhancedSettingsForm({
  interests: initialInterests,
  goals: initialGoals,
  readingSpeed: initialSpeed,
}: EnhancedSettingsFormProps) {
  const [interests, setInterests] = useState<string[]>(initialInterests);
  const [goals, setGoals] = useState<Goal[]>(() => {
    if (initialGoals) {
      // Parse goals from string if available
      const goalNames = initialGoals.split(',').map(g => g.trim()).filter(Boolean);
      return goalNames.map((name, i) => ({
        id: String(i + 1),
        name,
      }));
    }
    return defaultGoals;
  });
  const [speedInput, setSpeedInput] = useState(initialSpeed.toString());
  const [theme, setTheme] = useState<Theme>(() => {
    // Initialize from localStorage on client only
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      if (savedTheme) return savedTheme;
      const isDark = document.documentElement.classList.contains('dark');
      return isDark ? 'dark' : 'light';
    }
    return 'system';
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);

    if (newTheme === 'system') {
      localStorage.removeItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    } else {
      localStorage.setItem('theme', newTheme);
      document.documentElement.classList.toggle('dark', newTheme === 'dark');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('interests', interests.join(', '));
    formData.append('goals', goals.map(g => g.name).join(', '));
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Goals Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Reading Goals</CardTitle>
          <CardDescription>
            Drag to reorder your goals. The AI will prioritize articles matching your top goals.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoalsList goals={goals} onChange={setGoals} />
          <p className="text-xs text-muted-foreground mt-4">
            Tip: Your #1 goal gets a +20% relevance boost for matching articles.
          </p>
        </CardContent>
      </Card>

      {/* Interests Section */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Interests</CardTitle>
          <CardDescription>
            Add topics you&apos;re interested in. Articles matching these get higher scores.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <InterestsTags interests={interests} onChange={setInterests} />
        </CardContent>
      </Card>

      {/* Reading Speed */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Reading Speed</CardTitle>
          <CardDescription>
            Your reading speed helps calculate accurate time estimates.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Input
              id="readingSpeed"
              type="number"
              min="50"
              max="1000"
              value={speedInput}
              onChange={(e) => setSpeedInput(e.target.value)}
              disabled={isPending}
              className="w-32"
            />
            <span className="text-sm text-muted-foreground">words per minute</span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Average reading speed is 250 WPM. Fast readers: 400+ WPM.
          </p>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card>
        <CardHeader>
          <CardTitle className="font-display">Appearance</CardTitle>
          <CardDescription>
            Choose your preferred color scheme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {[
              { value: 'light' as Theme, icon: Sun, label: 'Light' },
              { value: 'dark' as Theme, icon: Moon, label: 'Dark' },
              { value: 'system' as Theme, icon: Monitor, label: 'System' },
            ].map(({ value, icon: Icon, label }) => (
              <button
                key={value}
                type="button"
                onClick={() => handleThemeChange(value)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all",
                  theme === value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card hover:bg-accent border-border"
                )}
              >
                <Icon className="size-4" />
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Status messages */}
      {error && (
        <div className="text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/20 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="text-sm text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-4 py-3 rounded-lg">
          Profile updated successfully!
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" variant="primary-blue" disabled={isPending}>
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
      </div>
    </form>
  );
}
