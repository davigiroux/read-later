import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import {
  Sparkles,
  Clock,
  Target,
  Brain,
  Zap,
  Shield,
  BarChart3,
  Bookmark,
  ArrowRight,
} from 'lucide-react';

export default async function FeaturesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('features');

  const features = [
    {
      icon: Sparkles,
      titleKey: 'aiScoring.title',
      descriptionKey: 'aiScoring.description',
    },
    {
      icon: Clock,
      titleKey: 'readingTime.title',
      descriptionKey: 'readingTime.description',
    },
    {
      icon: Target,
      titleKey: 'personalGoals.title',
      descriptionKey: 'personalGoals.description',
    },
    {
      icon: Brain,
      titleKey: 'smartRecommendations.title',
      descriptionKey: 'smartRecommendations.description',
    },
    {
      icon: Zap,
      titleKey: 'quickSave.title',
      descriptionKey: 'quickSave.description',
    },
    {
      icon: Shield,
      titleKey: 'privacyFirst.title',
      descriptionKey: 'privacyFirst.description',
    },
    {
      icon: BarChart3,
      titleKey: 'analytics.title',
      descriptionKey: 'analytics.description',
    },
    {
      icon: Bookmark,
      titleKey: 'organize.title',
      descriptionKey: 'organize.description',
    },
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            {t('headline')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('subheadline')}
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature) => (
            <div
              key={feature.titleKey}
              className="p-6 rounded-xl bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{t(feature.titleKey)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
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
