import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('pricing');

  const plans = [
    {
      nameKey: 'free.name',
      price: '$0',
      period: 'forever',
      descriptionKey: 'free.description',
      features: [
        'free.features.articles',
        'free.features.scoring',
        'free.features.readingTime',
        'free.features.extension',
      ],
      ctaKey: 'free.cta',
      popular: false,
    },
    {
      nameKey: 'pro.name',
      priceKey: 'pro.price',
      periodKey: 'pro.period',
      descriptionKey: 'pro.description',
      features: [
        'pro.features.articles',
        'pro.features.aiCuration',
        'pro.features.goals',
        'pro.features.analytics',
        'pro.features.support',
        'pro.features.api',
      ],
      ctaKey: 'pro.cta',
      popular: true,
    },
    {
      nameKey: 'team.name',
      priceKey: 'team.price',
      periodKey: 'team.period',
      descriptionKey: 'team.description',
      features: [
        'team.features.everything',
        'team.features.members',
        'team.features.collections',
        'team.features.teamAnalytics',
        'team.features.admin',
        'team.features.sso',
      ],
      ctaKey: 'team.cta',
      popular: false,
    },
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            {t('headline')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('subheadline')}
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.nameKey}
              className={cn(
                'p-8 rounded-2xl border bg-card relative',
                plan.popular && 'border-primary shadow-lg scale-105'
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  {t('mostPopular')}
                </Badge>
              )}
              <h3 className="text-xl font-semibold mb-2">{t(plan.nameKey)}</h3>
              <div className="mb-4">
                <span className="text-4xl font-display font-bold">
                  {plan.priceKey ? t(plan.priceKey) : plan.price}
                </span>
                <span className="text-muted-foreground">
                  {plan.periodKey ? t(plan.periodKey) : plan.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                {t(plan.descriptionKey)}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((featureKey) => (
                  <li key={featureKey} className="flex items-start gap-2 text-sm">
                    <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
                    {t(featureKey)}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={plan.popular ? 'primary-blue' : 'outline'}
                className="w-full"
              >
                <Link href="/dashboard">{t(plan.ctaKey)}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            {t('help.headline')}
          </p>
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/about">
              {t('help.cta')}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
