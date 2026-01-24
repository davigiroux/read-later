import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Mail, Github, Twitter } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
            About LaterStack
          </h1>
          <p className="text-lg text-muted-foreground">
            Built by readers, for readers.
          </p>
        </div>

        {/* Story */}
        <div className="prose prose-lg dark:prose-invert mx-auto mb-16">
          <p>
            LaterStack was born from a simple frustration: too many articles saved, too little time to read them. We believe that what you read shapes who you become, and life&apos;s too short to waste on content that doesn&apos;t matter.
          </p>
          <p>
            Traditional read-later apps treat all articles the same. But not all articles are created equal. Some will change your perspective. Others will teach you something new. And many... well, they&apos;ll just sit there, forgotten.
          </p>
          <p>
            We built LaterStack to help you focus on what matters. Using AI, we analyze your interests, goals, and reading patterns to surface the content that&apos;s most relevant to you. It&apos;s like having a personal librarian who knows exactly what you need to read next.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-xl font-semibold mb-3">Privacy First</h3>
            <p className="text-muted-foreground">
              Your reading habits are personal. We never sell your data or share your activity with third parties.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-xl font-semibold mb-3">Open Source</h3>
            <p className="text-muted-foreground">
              We believe in transparency. Parts of LaterStack are open source, and we actively contribute to the community.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-xl font-semibold mb-3">User Focused</h3>
            <p className="text-muted-foreground">
              Every feature we build starts with a real user need. We listen, iterate, and improve constantly.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-card border">
            <h3 className="text-xl font-semibold mb-3">Quality Over Quantity</h3>
            <p className="text-muted-foreground">
              We&apos;d rather help you read 10 great articles than 100 mediocre ones. Depth over breadth.
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="text-center p-8 rounded-2xl bg-muted/30 border">
          <h2 className="text-2xl font-display font-bold mb-4">
            Get in touch
          </h2>
          <p className="text-muted-foreground mb-6">
            Have questions, feedback, or just want to say hi? We&apos;d love to hear from you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="outline" className="gap-2">
              <a href="mailto:hello@laterstack.io">
                <Mail className="size-4" />
                Email us
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a
                href="https://twitter.com/devgiroux"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="size-4" />
                Twitter
              </a>
            </Button>
            <Button asChild variant="outline" className="gap-2">
              <a
                href="https://github.com/davigiroux"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="size-4" />
                GitHub
              </a>
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h2 className="text-2xl font-display font-bold mb-4">
            Ready to read smarter?
          </h2>
          <Button asChild variant="primary-blue" size="lg" className="gap-2">
            <Link href="/dashboard">
              Get started for free
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
