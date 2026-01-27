import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Github, Twitter } from 'lucide-react';

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('about');

  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            {t('headline')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('subheadline')}
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-lg dark:prose-invert mx-auto mb-16">
          <p>{t('story.p1')}</p>
          <p>{t('story.p2')}</p>
          <p>{t('story.p3')}</p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-xl font-semibold mb-3">{t('values.privacy.title')}</h3>
            <p className="text-muted-foreground">
              {t('values.privacy.description')}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-xl font-semibold mb-3">{t('values.openSource.title')}</h3>
            <p className="text-muted-foreground">
              {t('values.openSource.description')}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-xl font-semibold mb-3">{t('values.userFocused.title')}</h3>
            <p className="text-muted-foreground">
              {t('values.userFocused.description')}
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-xl font-semibold mb-3">{t('values.quality.title')}</h3>
            <p className="text-muted-foreground">
              {t('values.quality.description')}
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center p-8 rounded-2xl bg-muted/30 border">
          <h2 className="text-2xl font-display font-bold mb-4">
            {t('contact.headline')}
          </h2>
          <p className="text-muted-foreground mb-6">
            {t('contact.description')}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="outline" className="gap-2">
              <a href="mailto:hello@laterstack.io">
                <Mail className="size-4" />
                {t('contact.email')}
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a
                href="https://twitter.com/devgiroux"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="size-4" />
                {t('contact.twitter')}
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a
                href="https://github.com/davigiroux"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" />
                {t('contact.github')}
              </a>
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-display font-bold mb-4">
            {t('cta.headline')}
          </h2>
          <Button asChild variant="primary-blue" size="lg" className="gap-2">
            <Link href="/dashboard">
              {t('cta.button')}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
