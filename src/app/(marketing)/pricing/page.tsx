import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for getting started',
    features: [
      'Save up to 50 articles',
      'Basic AI scoring',
      'Reading time estimates',
      'Browser extension',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$9',
    period: '/month',
    description: 'For serious readers',
    features: [
      'Unlimited articles',
      'Advanced AI curation',
      'Personal goals & interests',
      'Reading analytics',
      'Priority support',
      'API access',
    ],
    cta: 'Start Pro Trial',
    popular: true,
  },
  {
    name: 'Team',
    price: '$29',
    period: '/month',
    description: 'For teams and organizations',
    features: [
      'Everything in Pro',
      'Up to 10 team members',
      'Shared collections',
      'Team analytics',
      'Admin controls',
      'SSO integration',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Simple, transparent pricing
          </h1>
          <p className="text-lg text-muted-foreground">
            Start for free, upgrade when you need more. No hidden fees, no surprises.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'p-8 rounded-2xl border bg-card relative',
                plan.popular && 'border-primary shadow-lg scale-105'
              )}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                  Most Popular
                </Badge>
              )}
              <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-display font-bold">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                {plan.description}
              </p>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="size-4 text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                asChild
                variant={plan.popular ? 'primary-blue' : 'outline'}
                className="w-full"
              >
                <Link href="/dashboard">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ teaser */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4">
            Questions? We&apos;re here to help.
          </p>
          <Button asChild variant="ghost" className="gap-2">
            <Link href="/about">
              Contact us
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
