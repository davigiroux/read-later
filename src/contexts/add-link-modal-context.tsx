'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AddLinkModalContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const AddLinkModalContext = createContext<AddLinkModalContextValue | null>(null);

export function AddLinkModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <AddLinkModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </AddLinkModalContext.Provider>
  );
}

export function useAddLinkModal() {
  const context = useContext(AddLinkModalContext);
  if (!context) {
    throw new Error('useAddLinkModal must be used within AddLinkModalProvider');
  }
  return context;
}
