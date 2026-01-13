'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from 'react';

export type ViewMode = 'card' | 'list';

interface ViewPreferenceContextValue {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewPreferenceContext = createContext<ViewPreferenceContextValue | null>(null);

interface ViewPreferenceProviderProps {
  children: ReactNode;
}

export function ViewPreferenceProvider({ children }: ViewPreferenceProviderProps) {
  const [viewMode, setViewModeState] = useState<ViewMode>('card');
  const [isHydrated, setIsHydrated] = useState(false);

  // Read from localStorage on mount
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem('read-later:view-preference');
      if (stored) {
        setViewModeState(JSON.parse(stored) as ViewMode);
      }
    } catch (error) {
      console.warn('Error reading view preference:', error);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Write to localStorage when state changes (after hydration)
  useEffect(() => {
    if (!isHydrated) return;

    try {
      window.localStorage.setItem('read-later:view-preference', JSON.stringify(viewMode));
    } catch (error) {
      console.warn('Error saving view preference:', error);
    }
  }, [viewMode, isHydrated]);

  const setViewMode = (mode: ViewMode) => {
    setViewModeState(mode);
  };

  return (
    <ViewPreferenceContext.Provider value={{ viewMode, setViewMode }}>
      {children}
    </ViewPreferenceContext.Provider>
  );
}

export function useViewPreference() {
  const context = useContext(ViewPreferenceContext);
  if (!context) {
    throw new Error('useViewPreference must be used within ViewPreferenceProvider');
  }
  return context;
}
