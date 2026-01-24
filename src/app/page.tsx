import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sparkles, Clock, Target, ArrowRight, Check, Plus } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { MarketingNavbar } from '@/components/marketing/navbar';
import { MarketingFooter } from '@/components/marketing/footer';

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Curation',
    description: 'Smart relevance scoring helps you focus on articles that matter most to you.',
  },
  {
    icon: Clock,
    title: 'Time-Aware Reading',
    description: 'Automatic reading time estimates help you choose articles that fit your schedule.',
  },
  {
    icon: Target,
    title: 'Personal Goals',
    description: 'Set reading goals and interests to get tailored article recommendations.',
  },
];

// Mock avatar URLs for social proof
const avatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=64&h=64&fit=crop&crop=face',
];

export default async function Home() {
  const { userId } = await auth();

  if (userId) {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Gradient blobs */}
      <div className="gradient-blob gradient-blob-blue w-[600px] h-[600px] -top-64 -right-64 absolute" />
      <div className="gradient-blob gradient-blob-purple w-[500px] h-[500px] top-1/2 -left-48 absolute" />

      <MarketingNavbar />

      {/* Hero section - 2 column grid */}
      <section className="flex-1 flex items-center pt-12 pb-20 md:py-24 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Text content */}
            <div className="space-y-8 text-center lg:text-left animate-[fade-in_0.6s_ease-out]">
              {/* Animated badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase border border-blue-200 dark:border-blue-800">
                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                AI-Powered Curation v2.0
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight">
                Stop hoarding links.
                <br />
                <span className="gradient-text">Start reading</span>
                <br />
                what matters.
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Your &ldquo;Save for Later&rdquo; list is a graveyard of good intentions. LaterStack is an AI engine that filters the noise, scores relevance based on your goals, and tells you exactly what to read next.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button asChild variant="primary-blue" size="lg" className="text-base gap-2 group">
                  <Link href="/dashboard">
                    Try the MVP for Free
                    <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-base gap-2">
                  <Link href="#features">
                    See how it works
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
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
                <p>Early adopters welcome</p>
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
                      <h3 className="text-xl font-bold font-display">Your Smart Queue</h3>
                      <p className="text-sm text-muted-foreground">
                        Sorted by <span className="text-primary font-medium">Relevance & Impact</span>
                      </p>
                    </div>
                    <div className="text-center px-3 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-xs text-muted-foreground mb-0.5">Focus Time</div>
                      <div className="font-bold text-primary">45m left</div>
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
                              High Impact
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="size-3" /> 8 min read
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
                          <span className="text-xs font-bold text-muted-foreground">Score</span>
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
                              Career
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="size-3" /> 12 min read
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
                          <span className="text-xs font-bold text-muted-foreground">Score</span>
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
                              Tech
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                              <Clock className="size-3" /> 5 min read
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
                          <span className="text-xs font-bold text-muted-foreground">Score</span>
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

      {/* Features section */}
      <section id="features" className="py-24 px-4 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Everything you need to read smarter
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features to help you save, organize, and discover content that matters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="group p-8 rounded-2xl bg-card border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="size-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="size-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Your reading list won&apos;t fix itself.
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Stop saving. Start reading.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="primary-blue" size="lg" className="text-base gap-2">
              <Link href="/dashboard">
                Try the MVP for Free
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-4 flex items-center justify-center gap-2">
            <Check className="size-4 text-green-500" />
            No credit card required
          </p>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
