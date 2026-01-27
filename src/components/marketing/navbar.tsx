'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';

export function MarketingNavbar() {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');

  const navLinks = [
    { href: '/features', labelKey: 'features' },
    { href: '/pricing', labelKey: 'pricing' },
    { href: '/about', labelKey: 'about' },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Logo size="md" />
          </Link>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {t(link.labelKey)}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/sign-in">{tCommon('signIn')}</Link>
            </Button>
            <Button asChild variant="primary-blue" size="sm">
              <Link href="/dashboard">{tCommon('getStarted')}</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
