import Link from 'next/link';
import { Github, Twitter } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { navLinks, socialLinks } from './nav-links';

export function MarketingFooter() {
  return (
    <footer className="border-t py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="sm" textClassName="text-muted-foreground" iconClassName="text-muted-foreground" />
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <a
              href={socialLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Twitter className="size-5" />
            </a>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="size-5" />
            </a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} LaterStack. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
