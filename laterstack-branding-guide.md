# LaterStack Branding & Copy Guide

**Last Updated:** January 12, 2026  
**Domain:** laterstack.io  
**Version:** 1.0

---

## Table of Contents

1. [Brand Identity](#brand-identity)
2. [Design System](#design-system)
3. [Page-by-Page Updates](#page-by-page-updates)
4. [Component Copy](#component-copy)
5. [Copy Guidelines](#copy-guidelines)
6. [Technical Updates](#technical-updates)
7. [Testing Checklist](#testing-checklist)

---

## Brand Identity

### Core Details

- **Name:** LaterStack (one word, capitalize L and S)
- **Domain:** laterstack.io
- **Tagline:** "Your smart reading queue"
- **Positioning:** AI-powered article prioritization for busy readers

### Brand Voice

- **Professional but approachable** - Not overly corporate
- **Tech-savvy** - Comfortable with developer audience
- **Productivity-focused** - Help people read intentionally
- **Honest** - No hype, realistic promises

### Key Messaging

- Stack articles for later, read what matters most
- AI-powered prioritization based on your goals
- Time-aware reading recommendations
- Stop drowning in saved articles
- Never wonder what to read next
- Your reading stack, ranked by AI

### What We Are

✅ A smart reading queue  
✅ An AI-powered article prioritization tool  
✅ A productivity tool for intentional reading  
✅ A personal reading assistant

### What We're Not

❌ Just another "read later" app  
❌ A social bookmarking platform  
❌ A content discovery engine  
❌ A news aggregator

---

## "Stack" Usage Guidelines

### Philosophy

Use "stack" strategically to reinforce the brand while maintaining clarity. The word "stack" should feel natural, not forced.

### When TO Use "Stack"

**✅ Primary Actions:**
- "Stack Article" (button to save)
- "Add to Stack"
- "Start stacking articles"

**✅ Referring to the Collection:**
- "Your reading stack"
- "Your stack is empty"
- "12 articles in your stack"
- "Articles stacked this week"

**✅ Marketing/Landing Page:**
- "Stack articles for later"
- "Build your reading stack"
- "Your stack, ranked by AI"

**✅ Empty States & Onboarding:**
- "Stack your first article to get started"
- "No articles stacked yet"

### When NOT to Use "Stack"

**❌ Navigation Items:**
- Use "Dashboard" (not "Stack" or "My Stack")
- Use "Settings" (not "Stack Settings")

**❌ Article Actions:**
- Use "Mark as read" (not "Unstack")
- Use "Archive" (not "Remove from stack")
- Use "Read Article" (not "Read from stack")

**❌ Filter Labels:**
- Use "All", "Unread", "Read" (not "All Stacked", "Unread Stack")

**❌ When It's Unclear:**
- Avoid creating confusing compound terms
- If "stack" doesn't add clarity, don't use it

### Examples

**Good Usage:**
```
✅ "Stack articles you want to read later"
✅ "Your stack · 12 articles"
✅ "Stack it, read it when it matters"
✅ "Build your reading stack with AI"
```

**Avoid:**
```
❌ "Stackify your reading" (too forced)
❌ "Unstack this article" (confusing)
❌ "Stack management dashboard" (unnecessary)
❌ "Your stacked items" (awkward)
```

### Think of It As:

- **Stack** = verb (to add articles)
- **Your stack** = noun (the collection of articles)
- **Not everything needs to be "stackified"**

---

## Design System

### Typography Rules

**Brand Name Usage:**
- ✅ **Correct:** LaterStack
- ❌ **Wrong:** laterstack, Later Stack, Laterstack, LATERSTACK

**In sentences:**
- "Save articles to LaterStack"
- "Welcome to LaterStack"
- "LaterStack helps you prioritize"

**In code/technical contexts:**
- Package name: `laterstack`
- Repository: `laterstack`
- URLs: `laterstack.io`

### Color Palette

Keep the existing color scheme, which appears to be:

**Primary Colors:**
- Navy/Dark Blue: `#1e3a8a` (buttons, primary actions)
- White: `#ffffff` (backgrounds)
- Light Gray: `#f3f4f6` (secondary backgrounds)

**Text Colors:**
- Primary text: `#111827`
- Secondary text: `#6b7280`
- Muted text: `#9ca3af`

**Accent Colors:**
- Keep existing badge/tag colors
- Orange for "Quick Read" indicators
- Blue for informational elements

### Icon Style

- Use existing icon set (appears to be Lucide or similar)
- Keep consistent stroke width
- Maintain minimalist, clean appearance

---

## Page-by-Page Updates

### 1. Landing Page (`src/app/page.tsx`)

#### Hero Section

```
Headline: "Your smart reading queue"

Subheadline: "Stack articles, get AI-powered recommendations on what to read next based on your interests and available time."

Primary CTA: "Get Started"
Secondary CTA: "Sign In"
```

#### Features Section

Three feature cards with icons:

**Feature 1: AI-Powered Curation**
```
Icon: Sparkles/Stars icon
Title: "AI-Powered Curation"
Description: "Smart relevance scoring helps you focus on articles that matter most to you."
```

**Feature 2: Time-Aware Reading**
```
Icon: Clock icon
Title: "Time-Aware Reading"
Description: "Automatic reading time estimates help you choose articles that fit your schedule."
```

**Feature 3: Personal Goals**
```
Icon: Target icon
Title: "Personal Goals"
Description: "Set reading goals and interests to get tailored article recommendations."
```

#### How It Works Section (Optional)

```
Headline: "Stack. Rank. Read."

Step 1: Stack Articles
"Paste any article URL to add it to your stack"

Step 2: AI Ranks Them
"Our AI scores articles based on your interests and goals"

Step 3: Read What Matters
"Focus on the most relevant articles for you right now"
```

#### Social Proof Section (Optional)

```
Headline: "Join readers who are finally reading the right articles"

[Placeholder for stats or testimonials]

Example stats:
- "10,000+ articles saved"
- "500+ active readers"
- "Average 15 minutes saved daily"
```

#### Footer

```
Left side:
© 2025 LaterStack. All rights reserved.

Center (links):
- About
- Privacy Policy
- Terms of Service
- Contact

Right side:
Built by Davi Giroux
[Link to devgiroux.com]
```

---

### 2. Dashboard Page (`src/app/dashboard/page.tsx`)

#### Header

```
Page Title: "Dashboard"
Subtitle: "Your reading stack · 12 articles"

Settings button (top right): "Settings" with gear icon
```

#### Save Article Section

```
Section Heading: "Stack New Article"

Input:
- Placeholder: "https://example.com/article"
- Icon: Link icon

Helper text: "Paste any article URL to add it to your stack"

Button: "Stack Article"
```

#### Filter Tabs

```
Tab Labels:
- All (12)
- Unread (9)
- Read (1)
- Archived (2)
- Quick Read (3)
```

#### Article List Section

```
Section Heading: "Up Next"
Article count badge: "9"

When filtered:
"Showing 9 unread articles"
```

#### Empty States

**All Empty:**
```
Icon: Empty box or file icon
Heading: "Your stack is empty"
Description: "Stack your first article above to get started"
```

**Unread Empty:**
```
Icon: Checkmark or celebration icon
Heading: "All caught up! 🎉"
Description: "You've read everything in your queue"
```

**Read Empty:**
```
Icon: Book icon
Heading: "No read articles yet"
Description: "Articles you finish will appear here"
```

**Archived Empty:**
```
Icon: Archive box icon
Heading: "No archived articles"
Description: "Archive articles you want to save for reference"
```

**Quick Read Empty:**
```
Icon: Clock icon
Heading: "No quick reads available"
Description: "Quick reads (under 5 min) will appear here"
```

---

### 3. Settings Page (`src/app/dashboard/settings/page.tsx`)

#### Page Header

```
Title: "Settings"
Subtitle: "Customize your reading preferences to get better recommendations for your stack"

Back button: "← Back to Dashboard"
```

#### Section: Profile & Preferences

```
Section Heading: "Profile & Preferences"

Field 1: Your Interests
Label: "Your Interests"
Placeholder: "Finance, personal growth, investments"
Helper text: "Comma-separated list of topics you're interested in"

Field 2: Reading Goals
Label: "Reading Goals"
Placeholder: "Be a better version of myself and learn things that can make me richer."
Helper text: "71/500 characters"
Input type: Textarea

Field 3: Reading Speed
Label: "Reading Speed (words per minute)"
Default value: 250
Helper text: "Average: 250 WPM. This helps calculate estimated reading times."
Input type: Number

Save button: "Save Changes"
```

#### Section: How AI Uses Your Preferences

```
Section Heading: "How AI uses your preferences"

Bullet points:
• Interests: Articles matching your interests get higher relevance scores
• Goals: Helps the AI understand what you want to learn
• Reading Speed: Used to calculate estimated reading times
```

---

### 4. Article Cards Component

#### Card Structure

```
Card Header:
- Article title (truncated if too long)

Card Description:
- Source domain · Relative time
  Example: "ycombinator.com · Today"

Card Content:
- Reading time badge: "7 min read"
- Topic badges: "Startups", "Finance", "Growth", "Investment"
- AI summary/reasoning (italic, muted text)

Card Footer:
- Primary button: "Read Article" (opens in new tab)
- Icon button: Checkmark (mark as read)
- Icon button: Trash (archive)
```

#### Button Tooltips

```
Checkmark icon: "Mark as read"
Trash icon: "Archive article"
Menu dots (if present): "More options"
```

---

## Component Copy

### Loading States

```
General loading: "Loading your articles..."
Saving article: "Analyzing article..."
Updating settings: "Updating preferences..."
Initial page load: "Loading dashboard..."
```

### Success Messages

```
Article saved: "Article stacked!"
Settings updated: "Preferences updated successfully"
Marked as read: "Article marked as read"
Archived: "Article archived"
Unarchived: "Article restored to your stack"
```

### Error Messages

```
Generic error: "Something went wrong. Please try again."
Load failed: "Failed to load articles. Please refresh the page."
Save failed: "Failed to stack article. Please check the URL and try again."
Duplicate article: "This article is already in your stack."
Extraction failed: "Unable to extract article content. The site may be blocking access or require JavaScript."
Invalid URL: "Please enter a valid article URL."
Network error: "Connection error. Please check your internet and try again."
Auth error: "Please sign in to continue."
```

### Confirmation Dialogs

```
Delete/Archive confirmation:
Title: "Archive this article?"
Description: "You can always restore it to your stack later from archived items."
Confirm button: "Archive"
Cancel button: "Cancel"

Clear all read:
Title: "Clear all read articles?"
Description: "This will permanently remove all read articles from your stack."
Confirm button: "Clear all"
Cancel button: "Cancel"
```

---

## Copy Guidelines

### Writing Style

**Do:**
- Use active voice: "Save articles" not "Articles can be saved"
- Be concise: shorter is better
- Use "you/your" to address the user
- Focus on benefits, not features
- Use action verbs: Save, Read, Prioritize, Focus
- Keep it scannable with short paragraphs

**Don't:**
- Don't use passive voice
- Don't be overly technical or jargon-heavy
- Don't make unrealistic promises
- Don't use corporate speak
- Don't use buzzwords: "synergy", "paradigm shift", "game-changer"

### Terminology

**Preferred terms:**
- ✅ "your stack" or "reading stack" (primary term for the collection)
- ✅ "stack" as a verb (e.g., "stack this article")
- ✅ "AI-powered" (not "AI-driven" or "smart AI")
- ✅ "article" (general term for any saved link)
- ✅ "archive" (not "delete" for hiding articles)

**Use contextually:**
- "your reading queue" (acceptable in some contexts)
- "save" (acceptable in technical/generic contexts)
- "add to stack" (when "stack" alone isn't clear)

**Avoid:**
- ❌ "read later app" (too generic)
- ❌ "our AI" (say "AI" or "smart recommendations")
- ❌ "bookmarks" (not our mental model)
- ❌ "saved items" (too generic)
- ❌ "stackify", "unstack", "stacked items" (forced/awkward)

### Tone Examples

**Good copy:**
```
✅ "Never wonder what to read next"
✅ "Your reading stack, finally organized"
✅ "Stack articles, read what matters"
✅ "Focus on articles that align with your goals"
✅ "Stop drowning in saved articles"
✅ "Your stack, ranked by AI"
✅ "Stack it, read it when it matters"
```

**Avoid:**
```
❌ "Revolutionary AI-powered reading solution"
❌ "10x your reading productivity"
❌ "Never miss an important article again"
❌ "The ultimate reading companion"
❌ "Transform your reading habits overnight"
❌ "Stackify your reading" (too forced)
```

---

## Technical Updates

### 1. Metadata & SEO (`src/app/layout.tsx`)

```typescript
export const metadata: Metadata = {
  title: 'LaterStack - Your smart reading queue',
  description: 'Save articles and get AI-powered recommendations on what to read next based on your interests and available time.',
  keywords: ['reading queue', 'article manager', 'AI recommendations', 'read later', 'productivity', 'smart reading'],
  authors: [{ name: 'Davi Giroux', url: 'https://devgiroux.com' }],
  creator: 'Davi Giroux',
  metadataBase: new URL('https://laterstack.io'),
  
  openGraph: {
    title: 'LaterStack - Your smart reading queue',
    description: 'Save articles and get AI-powered recommendations on what to read next based on your interests and available time.',
    url: 'https://laterstack.io',
    siteName: 'LaterStack',
    locale: 'en_US',
    type: 'website',
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'LaterStack - Your smart reading queue',
    description: 'Save articles and get AI-powered recommendations on what to read next.',
    creator: '@devgiroux',
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}
```

### 2. Package.json

```json
{
  "name": "laterstack",
  "version": "0.1.0",
  "description": "Your smart reading queue - AI-powered article prioritization",
  "author": "Davi Giroux <davigiroux@gmail.com>",
  "homepage": "https://laterstack.io",
  "repository": {
    "type": "git",
    "url": "https://github.com/davigiroux/read-later"
  },
  "keywords": [
    "reading",
    "articles",
    "ai",
    "productivity",
    "recommendations"
  ]
}
```

### 3. README.md

```markdown
# LaterStack

Your smart reading queue. Save articles and get AI-powered recommendations on what to read next based on your interests and available time.

🔗 **[laterstack.io](https://laterstack.io)**

## Features

- 🤖 **AI-Powered Ranking** - Articles scored by relevance to your interests
- ⏱️ **Reading Time Estimates** - Know how long each article takes
- 🎯 **Personal Goals** - Get recommendations aligned with what you want to learn
- 📱 **Clean Interface** - Distraction-free reading experience
- 🔖 **Stack from Anywhere** - Simple URL paste to add articles to your stack

## How It Works

1. **Stack** - Paste any article URL
2. **AI Ranks** - Articles scored based on your interests and goals
3. **Read** - Focus on what matters most to you right now

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Authentication:** Clerk
- **AI Analysis:** Google Gemini
- **Content Extraction:** Jina AI Reader
- **Database:** Vercel Postgres (Prisma ORM)
- **Styling:** Tailwind CSS + shadcn/ui
- **Deployment:** Vercel
- **DNS/CDN:** Cloudflare

## Local Development

```bash
# Clone the repository
git clone https://github.com/davigiroux/read-later
cd read-later

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in your API keys

# Run database migrations
npx prisma generate
npx prisma db push

# Start development server
npm run dev
```

Visit `http://localhost:3000`

## Environment Variables

See `.env.example` for required variables:
- `DATABASE_URL` - Postgres connection string
- `CLERK_SECRET_KEY` - Clerk authentication
- `GOOGLE_GENERATIVE_AI_API_KEY` - Gemini API
- Plus other Clerk/Next.js variables

## Deployment

Deployed on Vercel with Cloudflare DNS.

## License

MIT

## Author

Built by [Davi Giroux](https://devgiroux.com)

---

**Live Site:** [laterstack.io](https://laterstack.io)
```

### 4. Environment Variables (.env.example)

```bash
# LaterStack - Environment Variables
# Copy this file to .env.local and fill in your values

# Database (Vercel Postgres)
DATABASE_URL="postgresql://..."

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_..."
CLERK_SECRET_KEY="sk_test_..."
CLERK_WEBHOOK_SECRET="whsec_..."

# Google AI (Gemini)
GOOGLE_GENERATIVE_AI_API_KEY="..."

# Optional: Jina AI (for higher rate limits)
# JINA_API_KEY="..."

# Next.js
NEXT_PUBLIC_APP_URL="https://laterstack.io"
```

### 5. Clerk Configuration

**Update in Clerk Dashboard:**

**Application URLs:**
- Homepage: `https://laterstack.io`
- Sign-in URL: `https://laterstack.io/sign-in`
- Sign-up URL: `https://laterstack.io/sign-up`
- After sign-in: `https://laterstack.io/dashboard`
- After sign-up: `https://laterstack.io/dashboard`

**Allowed redirect URLs:**
- `https://laterstack.io/*`
- `http://localhost:3000/*` (for development)

---

## Testing Checklist

### Pre-Launch Checks

**Branding:**
- [ ] All instances of "read later" replaced with appropriate LaterStack branding
- [ ] "LaterStack" spelled consistently (capital L and S)
- [ ] No references to devgiroux.com as the main product URL
- [ ] Footer shows correct copyright and attribution

**Metadata:**
- [ ] Page title is "LaterStack - Your smart reading queue"
- [ ] Meta description is accurate
- [ ] OpenGraph tags point to laterstack.io
- [ ] Favicon is set (if you have one)

**URLs:**
- [ ] All internal links use relative paths or laterstack.io
- [ ] External links open in new tabs
- [ ] Clerk redirect URLs updated
- [ ] No hardcoded localhost URLs

**Copy:**
- [ ] Landing page copy updated
- [ ] Dashboard copy updated
- [ ] Settings copy updated
- [ ] Error messages are clear and helpful
- [ ] Success messages are concise
- [ ] Empty states are friendly

**Functionality:**
- [ ] Sign in/sign up works
- [ ] Saving articles works
- [ ] AI ranking is functional
- [ ] Settings save correctly
- [ ] Filters work (All, Unread, Read, etc.)
- [ ] Mark as read works
- [ ] Archive works

### Post-Launch Monitoring

**Week 1:**
- [ ] Monitor error logs
- [ ] Check user feedback
- [ ] Verify analytics tracking
- [ ] Test on mobile devices
- [ ] Test on different browsers

**Week 2:**
- [ ] Review user behavior patterns
- [ ] Identify drop-off points
- [ ] Collect user feedback
- [ ] Plan iteration based on data

---

## Implementation Priority

### Phase 1: Critical (Do First)

1. **Landing page hero section** - First impression matters
2. **Metadata/SEO updates** - Important for discovery
3. **Dashboard main copy** - Most-used screen
4. **Settings page copy** - User configuration

### Phase 2: Important (Do Next)

1. **Error messages** - Better UX during failures
2. **Empty states** - Guide users when content is missing
3. **Loading states** - Feedback during async operations
4. **Success messages** - Positive reinforcement

### Phase 3: Polish (If Time)

1. **README.md** - For GitHub/developers
2. **Footer details** - Final touches
3. **Micro-interactions** - Smooth transitions
4. **Additional landing page sections** - Social proof, etc.

---

## Future Considerations

### V1.1 Improvements

- Add animated logo/icon
- Improve visual hierarchy on landing page
- Add more detailed "How it works" section
- Create comparison table vs competitors
- Add FAQ section
- Improve mobile responsiveness

### Content Additions

- Blog/changelog at laterstack.io/blog
- Help documentation
- Video demo or walkthrough
- Case studies or testimonials
- Press kit

### Marketing Copy

For social media, emails, etc.:

**Twitter/X Bio:**
```
Your smart reading queue. AI ranks articles based on your interests. Never wonder what to read next. 🤖📚
```

**LinkedIn Description:**
```
LaterStack helps busy professionals prioritize their reading queue using AI. Save articles, get personalized recommendations, and focus on content that matters most to your goals.
```

**Email Signature:**
```
Check out LaterStack - Your smart reading queue
https://laterstack.io
```

---

## Quick Reference

### Brand Checklist

✅ Name: LaterStack (one word)  
✅ Domain: laterstack.io  
✅ Tagline: "Your smart reading queue"  
✅ Voice: Professional, approachable, productivity-focused  
✅ Colors: Navy blue primary, clean neutrals  
✅ Typography: Clean, modern sans-serif  

### Key Messages

1. "Stack articles, read what matters"
2. "AI-powered prioritization"
3. "Never wonder what to read next"
4. "Your stack, ranked by AI"

### "Stack" Usage Quick Guide

✅ **DO use "stack":**
- "Stack Article" (button)
- "Your stack" (the collection)
- "Add to your stack"
- "Your stack is empty"

❌ **DON'T use "stack":**
- Navigation items (use "Dashboard")
- Article actions (use "Mark as read", not "Unstack")
- When it doesn't add clarity

### Don't Say

❌ "Read later app"  
❌ "Revolutionary" or "game-changing"  
❌ "10x your productivity"  
❌ "Stackify" or "unstack"  

---

**Document Version:** 1.0  
**Last Updated:** January 12, 2026  
**Maintainer:** Davi Giroux  
**Contact:** [your@email.com]

For questions or updates, please contact the maintainer or submit an issue.
