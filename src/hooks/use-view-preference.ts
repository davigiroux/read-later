'use client';

import { useLocalStorage } from './use-local-storage';

/**
 * View mode for article display
 */
export type ViewMode = 'card' | 'list';

/**
 * Hook to manage user's view preference (card vs list)
 * Persists preference to localStorage
 *
 * @returns Object with viewMode and setViewMode
 *
 * @example
 * const { viewMode, setViewMode } = useViewPreference();
 * // viewMode is 'card' or 'list'
 * // setViewMode('list') to switch to list view
 */
export function useViewPreference() {
  const [viewMode, setViewMode] = useLocalStorage<ViewMode>(
    'read-later:view-preference',
    'card' // Default to card view
  );

  return { viewMode, setViewMode };
}
