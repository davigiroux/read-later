'use client';

import { Search, Bell, Link } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface TopNavProps {
  onAddLinkClick: () => void;
  className?: string;
}

export function TopNav({ onAddLinkClick, className }: TopNavProps) {
  return (
    <header
      className={cn(
        'h-20 px-8 flex items-center justify-between',
        'border-b border-slate-200 bg-white/80 backdrop-blur-md',
        'sticky top-0 z-10',
        className
      )}
    >
      {/* Search input */}
      <div className="flex-1 max-w-xl">
        <label className="relative flex items-center w-full group">
          <Search className="absolute left-4 size-5 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search your library..."
            className={cn(
              'w-full h-11 bg-slate-100 hover:bg-white focus:bg-white',
              'border border-transparent hover:border-slate-200 focus:border-primary/30',
              'rounded-xl pl-12 pr-4 text-slate-900 placeholder-slate-400',
              'focus:ring-4 focus:ring-primary/5 focus:outline-none',
              'transition-all text-sm shadow-sm'
            )}
          />
          <div className="absolute right-3 px-2 py-1 bg-white rounded text-[10px] text-slate-400 font-mono border border-slate-200 shadow-sm">
            ⌘K
          </div>
        </label>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 ml-8">
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors">
          <Bell className="size-5" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Add Link button */}
        <Button
          onClick={onAddLinkClick}
          className="h-11 px-5 bg-primary hover:bg-blue-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Link className="size-5" />
          <span>Add Link</span>
        </Button>
      </div>
    </header>
  );
}
