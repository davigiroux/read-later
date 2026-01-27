import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Bookmark, Sparkles, Target, ArrowRight, Check, Plus, Clock, ChevronRight } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { MarketingFooter } from '@/components/marketing/footer';
import { Logo } from '@/components/ui/logo';

// Mock avatar URLs for social proof
const avatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face',
];

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  const t = await getTranslations('home');
  const tCommon = await getTranslations('common');

  const journeySteps = [
    {
      step: 1,
      icon: Bookmark,
      title: t('step1Title'),
      description: t('step1Description'),
    },
    {
      step: 2,
      icon: Sparkles,
      title: t('step2Title'),
      description: t('step2Description'),
    },
    {
      step: 3,
      icon: Target,
      title: t('step3Title'),
      description: t('step3Description'),
    },
  ];

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Gradient blobs */}
      <div className="gradient-blob gradient-blob-blue w-[600px] h-[600px] -top-64 -right-64 absolute" />
      <div className="gradient-blob gradient-blob-purple w-[500px] h-[500px] top-1/2 -left-48 absolute" />

      {/* Minimal header */}
      <header className="w-full py-4 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" size="sm">
              <Link href="/sign-in">{tCommon('signIn')}</Link>
            </Button>
            <Button asChild variant="primary-blue" size="sm">
              <Link href="/dashboard">{tCommon('getStarted')}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero section - 2 column grid */}
      <section className="flex-1 flex items-center pt-12 pb-20 md:py-24 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text content */}
            <div className="space-y-8 text-center lg:text-left animate-[fade-in_0.6s_ease-out]">
              {/* Animated badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase border border-blue-200 dark:border-blue-800">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                {t('badge')}
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
                {t.rich('headline', {
                  br: () => <br />,
                  gradient: (chunks) => <span className="gradient-text">{chunks}</span>,
                })}
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t('subheadline')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild variant="primary-blue" size="lg" className="text-base gap-2 group">
                  <Link href="/dashboard">
                    {t('ctaPrimary')}
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base gap-2">
                  <a href="#features">
                    {t('ctaSecondary')}
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </a>
                </Button>
              </div>

              {/* Social proof with avatar stack */}
              <div className="pt-6 flex items-center gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
                <div className="flex -space-x-2">
                  {avatars.map((avatar, i) => (
                    <img
                      key={i}
                      src={avatar}
                      alt="User"
                      className="w-8 h-8 rounded-full border-2 border-background object-cover"
                    />
                  ))}
                </div>
                <p>{t('earlyAdopters')}</p>
              </div>
            </div>

            {/* Right: App preview */}
            <div className="relative animate-[slide-up_0.8s_ease-out_0.3s_both]">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-2xl opacity-20" />

              {/* Browser chrome */}
              <div className="relative bg-card border rounded-2xl shadow-2xl overflow-hidden">
                <div className="h-12 border-b bg-muted/50 flex items-center px-4 justify-between">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="text-xs text-muted-foreground font-mono bg-background/50 px-3 py-1 rounded-md border">
                    laterstack.com/dashboard
                  </div>
                </div>

                {/* Mock queue content */}
                <div className="p-6">
                  {/* Queue header */}
                  <div className="flex justify-between items-center mb-8">
                    <div>
                      <h3 className="text-xl font-bold font-display">{t('mockQueue.title')}</h3>
                      <p className="text-sm text-muted-foreground">
                        {t('mockQueue.subtitle')}
                      </p>
                    </div>
                    <div className="text-center px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-0.5">{t('mockQueue.focusTime')}</div>
                      <div className="font-bold text-primary">{t('mockQueue.timeLeft', { time: '45m' })}</div>
                    </div>
                  </div>

                  {/* Article cards */}
                  <div className="space-y-4">
                    {/* Card 1 - High impact */}
                    <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10 relative overflow-hidden">
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                              {t('mockQueue.highImpact')}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="size-3" /> 8 {tCommon('minRead')}
                            </span>
                          </div>
                          <h4 className="font-semibold leading-snug mb-1">
                            The Future of Generative AI in Design Systems
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            An in-depth look at how large language models are reshaping the way we build UI components...
                          </p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-background border rounded-lg p-2 w-12 h-12 shadow-sm">
                          <span className="text-xs font-bold text-muted-foreground">{tCommon('score')}</span>
                          <span className="text-sm font-bold text-primary">98</span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2 - Career */}
                    <div className="p-4 rounded-xl border bg-card">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-muted text-muted-foreground text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                              {t('topics.career')}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="size-3" /> 12 {tCommon('minRead')}
                            </span>
                          </div>
                          <h4 className="font-semibold leading-snug mb-1">
                            Leadership Principles for Engineering Managers
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            Key takeaways from top tech leaders on managing distributed teams effectively...
                          </p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-muted/50 border rounded-lg p-2 w-12 h-12">
                          <span className="text-xs font-bold text-muted-foreground">{tCommon('score')}</span>
                          <span className="text-sm font-bold text-muted-foreground">85</span>
                        </div>
                      </div>
                    </div>

                    {/* Card 3 - Tech (faded) */}
                    <div className="p-4 rounded-xl border bg-card opacity-75">
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-muted text-muted-foreground text-[10px] uppercase font-bold px-2 py-0.5 rounded">
                              {t('topics.tech')}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="size-3" /> 5 {tCommon('minRead')}
                            </span>
                          </div>
                          <h4 className="font-semibold leading-snug mb-1">
                            Rust vs Go: 2024 Benchmark
                          </h4>
                          <p className="text-xs text-muted-foreground line-clamp-1">
                            Performance comparison across various server workloads...
                          </p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-muted/50 border rounded-lg p-2 w-12 h-12">
                          <span className="text-xs font-bold text-muted-foreground">{tCommon('score')}</span>
                          <span className="text-sm font-bold text-muted-foreground">72</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* FAB */}
                  <div className="absolute bottom-6 right-6">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg shadow-blue-500/40 flex items-center justify-center">
                      <Plus className="size-5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works - User Journey */}
      <section id="features" className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('howItWorks')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('howItWorksSubtitle')}
            </p>
          </div>

          {/* Journey Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-4">
            {journeySteps.map((step, index) => (
              <div key={step.step} className="relative">
                {/* Connector arrow (desktop only) */}
                {index < journeySteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 z-10 text-muted-foreground/50">
                    <ChevronRight className="size-8" />
                  </div>
                )}

                <div className="group p-6 rounded-2xl bg-card border shadow-sm hover:shadow-lg transition-all duration-300">
                  {/* Step number badge */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                      {step.step}
                    </div>
                    <step.icon className="size-5 text-muted-foreground" />
                  </div>

                  {/* Mini mockup */}
                  <div className="mb-4 rounded-xl border bg-muted/30 overflow-hidden">
                    {step.step === 1 && (
                      /* Save mockup - Browser extension popup */
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="size-6 rounded bg-primary/20 flex items-center justify-center">
                            <Bookmark className="size-3 text-primary" />
                          </div>
                          <span className="text-xs font-medium">{t('mockSave.title')}</span>
                        </div>
                        <div className="space-y-2">
                          <div className="h-2 bg-muted rounded w-full" />
                          <div className="h-2 bg-muted rounded w-3/4" />
                        </div>
                        <div className="mt-3 flex gap-2">
                          <div className="flex-1 h-7 bg-primary rounded text-[10px] text-primary-foreground font-medium flex items-center justify-center">
                            {tCommon('save')}
                          </div>
                          <div className="h-7 px-3 border rounded text-[10px] font-medium flex items-center justify-center text-muted-foreground">
                            {tCommon('cancel')}
                          </div>
                        </div>
                      </div>
                    )}

                    {step.step === 2 && (
                      /* AI mockup - Scoring animation */
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="text-xs font-medium">{t('mockQueue.analyzing')}</div>
                          <Sparkles className="size-4 text-primary animate-pulse" />
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-2 rounded-lg bg-background border">
                            <span className="text-[10px] text-muted-foreground">{t('mockQueue.relevance')}</span>
                            <span className="text-xs font-bold text-primary">98</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-background border">
                            <span className="text-[10px] text-muted-foreground">{t('mockQueue.goalMatch')}</span>
                            <span className="text-xs font-bold text-green-600">{t('mockQueue.high')}</span>
                          </div>
                          <div className="flex items-center justify-between p-2 rounded-lg bg-background border">
                            <span className="text-[10px] text-muted-foreground">{t('mockQueue.readTime')}</span>
                            <span className="text-xs font-bold">8 {tCommon('min')}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {step.step === 3 && (
                      /* Queue mockup - Prioritized list */
                      <div className="p-4">
                        <div className="text-xs font-medium mb-3">{t('mockQueue.title')}</div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                            <div className="w-1 h-6 bg-primary rounded-full" />
                            <div className="flex-1">
                              <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded w-full mb-1" />
                              <div className="h-1.5 bg-blue-100 dark:bg-blue-800 rounded w-2/3" />
                            </div>
                            <span className="text-[10px] font-bold text-primary">98</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-background border opacity-70">
                            <div className="w-1 h-6 bg-muted rounded-full" />
                            <div className="flex-1">
                              <div className="h-2 bg-muted rounded w-full mb-1" />
                              <div className="h-1.5 bg-muted/50 rounded w-2/3" />
                            </div>
                            <span className="text-[10px] font-bold text-muted-foreground">85</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-background border opacity-50">
                            <div className="w-1 h-6 bg-muted rounded-full" />
                            <div className="flex-1">
                              <div className="h-2 bg-muted rounded w-full mb-1" />
                              <div className="h-1.5 bg-muted/50 rounded w-2/3" />
                            </div>
                            <span className="text-[10px] font-bold text-muted-foreground">72</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {t('finalCta.headline')}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {t('finalCta.subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="primary-blue" size="lg" className="text-base gap-2">
              <Link href="/dashboard">
                {t('ctaPrimary')}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
            <Check className="size-4 text-green-500" />
            {t('finalCta.noCreditCard')}
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
