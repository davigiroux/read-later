import Link from 'next/link';
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

const features = [
  {
    icon: Sparkles,
    title: 'AI-Powered Scoring',
    description: 'Every article gets a relevance score based on your interests, goals, and reading patterns. Focus on what matters most.',
  },
  {
    icon: Clock,
    title: 'Reading Time Estimates',
    description: 'Know exactly how long each article takes before you start. Perfect for fitting reading into your busy schedule.',
  },
  {
    icon: Target,
    title: 'Personal Goals',
    description: 'Set your reading goals and watch the AI prioritize content that helps you achieve them.',
  },
  {
    icon: Brain,
    title: 'Smart Recommendations',
    description: 'The more you read, the smarter it gets. Discover new content that aligns with your evolving interests.',
  },
  {
    icon: Zap,
    title: 'Quick Save',
    description: 'Save articles instantly from any browser or device. We handle the rest - extracting content and metadata automatically.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your reading habits are private. We never sell your data or share your activity with third parties.',
  },
  {
    icon: BarChart3,
    title: 'Reading Analytics',
    description: 'Track your reading progress over time. Understand your habits and optimize your learning.',
  },
  {
    icon: Bookmark,
    title: 'Organize Everything',
    description: 'Archive read articles, create collections, and keep your queue organized without effort.',
  },
];

export default function FeaturesPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Features built for
            <span className="gradient-text"> serious readers</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Everything you need to transform your reading experience. Save time, read smarter, and never miss important content again.
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-xl bg-card border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="size-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-display font-bold mb-4">
            Ready to get started?
          </h2>
          <Button asChild variant="primary-blue" size="lg" className="gap-2">
            <Link href="/dashboard">
              Try LaterStack free
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
